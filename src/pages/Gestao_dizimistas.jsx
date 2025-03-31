import { useEffect, useState, useMemo, useCallback } from "react";
import api from "../services/api";
import Tabela_dizimistas from "../components/Tabela_dizimistas";
import Layout from "../layouts/Layout";

function Gestao_dizimistas() {
    const [paginaAtual, setPaginaAtual] = useState(1);
    const [categoriaAtiva, setCategoriaAtiva] = useState("dizimistas");
    const [dizimistas, setDizimistas] = useState([]);
    const [novosDizimistas, setNovosDizimistas] = useState([]);
    const [comunidade, setComunidade] = useState("");
    const [paroquias, setParoquias] = useState([]);
    const [termoBusca, setTermoBusca] = useState("");
    const [situacaoFiltro, setSituacaoFiltro] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [sucesso, setSucesso] = useState(null);
    const [dizimistaSelecionado, setDizimistaSelecionado] = useState(null);
    const [erros, setErros] = useState({});
    const [exibirConfirmacao, setExibirConfirmacao] = useState(false);
    const [modoReadOnly, setModoReadOnly] = useState(false);
    const [exibirConfirmacaoDelete, setExibirConfirmacaoDelete] = useState(false);
    const [dizimistaSelecionadoParaExclusao, setDizimistaSelecionadoParaExclusao] = useState(null);

    const itensPorPagina = 12;

    const totalItens = categoriaAtiva === "dizimistas" ? dizimistas.length : novosDizimistas.length;
    const totalPaginas = Math.max(1, Math.ceil(totalItens / itensPorPagina));
    const paginas = Array.from({ length: totalPaginas }, (_, i) => i + 1);

    const dizimistasFiltrados = useMemo(() => {
        return (categoriaAtiva === "dizimistas" ? dizimistas : novosDizimistas).filter(dizimista =>
            dizimista.nome.toLowerCase().includes(termoBusca.toLowerCase())
        );
    }, [termoBusca, categoriaAtiva, dizimistas, novosDizimistas]);

    const getEndpoint = () => {
        return categoriaAtiva === "dizimistas" ? "/dizimistas/" : "/novos-dizimistas/";
    };

    const fetchDizimistas = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const responseDizimistas = await api.get("/dizimistas/", {
                params: {
                    id_paroquia: comunidade,
                    status: situacaoFiltro || undefined
                }
            });

            const responseNovosDizimistas = await api.get("/novos-dizimistas/", {
                params: {
                    id_paroquia: comunidade,
                    status: situacaoFiltro || undefined
                }
            });

            setDizimistas(responseDizimistas.data);
            setNovosDizimistas(responseNovosDizimistas.data);
            setPaginaAtual(1);
        } catch (error) {
            setError("Erro ao buscar dizimistas. Tente novamente mais tarde.");
            console.error("Erro ao buscar dizimistas: ", error);
        } finally {
            setLoading(false);
        }
    }, [comunidade, situacaoFiltro]);

    const tratarErroAPI = (error) => {
        if (error.response?.data) {
            const dados = error.response.data;
            
            // Trata erros do tipo ValidationError com HTML
            if (typeof dados === 'string' && dados.includes('ValidationError')) {
                try {
                    // Extrai a mensagem do erro do HTML
                    const match = dados.match(/\{.*\}/);
                    if (match) {
                        const errorObj = JSON.parse(match[0].replace(/&#x27;/g, '"'));
                        if (errorObj.__all__) {
                            return errorObj.__all__[0];
                        }
                    }
                } catch (e) {
                    console.error('Erro ao parsear mensagem de erro:', e);
                }
            }
            
            // Trata erros do tipo {'__all__': ['Mensagem de erro']}
            if (dados.__all__ && Array.isArray(dados.__all__)) {
                return dados.__all__[0];
            }
            
            // Trata erros do tipo {campo: ['Mensagem de erro']}
            if (typeof dados === 'object' && !Array.isArray(dados)) {
                const errosTemp = {};
                Object.keys(dados).forEach(campo => {
                    if (Array.isArray(dados[campo])) {
                        // Não inclui '__all__' nos erros de campo
                        if (campo !== '__all__') {
                            errosTemp[campo] = dados[campo][0];
                        }
                    } else if (typeof dados[campo] === 'string') {
                        errosTemp[campo] = dados[campo];
                    }
                });
                
                if (Object.keys(errosTemp).length > 0) {
                    setErros(errosTemp);
                    return "Verifique os campos destacados.";
                }
            }
            
            // Se for uma string simples
            if (typeof dados === 'string') {
                return dados;
            }
        }
        
        return "Ocorreu um erro. Tente novamente mais tarde.";
    };

    const validarDizimista = (dados) => {
        const errosTemp = {};
        
        // Filtra apenas dizimistas ativos para validação
        const dizimistasAtivos = dizimistas.filter(d => d.situacao === 'A');
        
        // Validação de ficha existente
        const fichaExistente = dizimistasAtivos.find(d => 
            d.ficha === Number(dados.ficha) && 
            d.id_paroquia === Number(comunidade) &&
            (!dados.id || d.id !== dados.id)  // Ignora o próprio registro ao editar
        );
        
        if (fichaExistente) {
            errosTemp.ficha = "Já existe um dizimista ativo com esse número nesta paróquia!";
        }

        // Validação de email existente
        if (dados.email) {
            const emailExistente = dizimistasAtivos.find(d => 
                d.email === dados.email && 
                (!dados.id || d.id !== dados.id)  // Ignora o próprio registro ao editar
            );
            
            if (emailExistente) {
                errosTemp.email = "Este e-mail já está cadastrado para outro dizimista ativo!";
            }
        }

        return errosTemp;
    };

    const criarDizimista = async () => {
        setLoading(true);
        setError(null);
        setSucesso(null);
        setErros({});
        
        try {
            const dadosParaEnviar = {
                ...dizimistaSelecionado,
                id_paroquia: Number(comunidade),
                ficha: Number(dizimistaSelecionado.ficha),
                sistema: Number(dizimistaSelecionado.sistema),
                situacao: dizimistaSelecionado.situacao || 'A',
                data_nascimento: dizimistaSelecionado.data_nascimento || null,
                email_permission: dizimistaSelecionado.email_permission || false,
                phone_permission: dizimistaSelecionado.phone_permission || false
            };

            // Validação frontend
            const errosValidacao = validarDizimista(dadosParaEnviar);
            if (Object.keys(errosValidacao).length > 0) {
                setErros(errosValidacao);
                setError("Por favor, preencha os campos corretamente");
                return;
            }

            const endpoint = getEndpoint();
            const response = await api.post(endpoint, dadosParaEnviar);

            if (!response.data) {
                throw new Error('Resposta da API não contém dados');
            }

            if (categoriaAtiva === "dizimistas") {
                setDizimistas(prevDizimistas => [...prevDizimistas, response.data]);
            } else {
                setNovosDizimistas(prevDizimistas => [...prevDizimistas, response.data]);
            }
            
            setSucesso("Dizimista cadastrado com sucesso!");
            fecharEdicao();
        } catch (error) {
            console.error("Erro ao criar dizimista:", error);
            setError(tratarErroAPI(error));
        } finally {
            setLoading(false);
        }
    };

    const atualizarDizimista = async () => {
        setLoading(true);
        setError(null);
        setSucesso(null);
        setErros({});
        
        try {
            const dadosParaEnviar = {
                ...dizimistaSelecionado,
                id_paroquia: Number(comunidade),
                ficha: Number(dizimistaSelecionado.ficha),
                sistema: Number(dizimistaSelecionado.sistema),
                data_nascimento: dizimistaSelecionado.data_nascimento || null,
                email_permission: dizimistaSelecionado.email_permission || false,
                phone_permission: dizimistaSelecionado.phone_permission || false
            };

            // Validação frontend
            const errosValidacao = validarDizimista(dadosParaEnviar);
            if (Object.keys(errosValidacao).length > 0) {
                setErros(errosValidacao);
                setError("Por favor, preencha os campos corretamente");
                return;
            }

            const endpoint = getEndpoint();
            const response = await api.put(`${endpoint}${dizimistaSelecionado.id}/`, dadosParaEnviar);

            if (!response.data) {
                throw new Error('Resposta da API não contém dados');
            }

            if (categoriaAtiva === "dizimistas") {
                setDizimistas(prevDizimistas => 
                    prevDizimistas.map(d => 
                        d.id === dizimistaSelecionado.id ? response.data : d
                    )
                );
            } else {
                setNovosDizimistas(prevDizimistas => 
                    prevDizimistas.map(d => 
                        d.id === dizimistaSelecionado.id ? response.data : d
                    )
                );
            }
            
            setSucesso("Dizimista atualizado com sucesso!");
            fecharEdicao();
        } catch (error) {
            console.error("Erro ao atualizar dizimista:", error);
            setError(tratarErroAPI(error));
        } finally {
            setLoading(false);
        }
    };

    const abrirModalReadOnly = (dizimista) => {
        setDizimistaSelecionado(dizimista);
        setModoReadOnly(true);
        document.body.style.overflow = 'hidden';
    };

    const abrirEdicao = (dizimista) => {
        setDizimistaSelecionado(dizimista);
        setModoReadOnly(false);
        document.body.style.overflow = 'hidden';
    };

    const fecharEdicao = () => {
        setDizimistaSelecionado(null);
        setErros({});
        document.body.style.overflow = 'auto';
    };

    const handleInputChange = (e) => {
        const { name, type, value, checked } = e.target;
        let valorAtualizado = value;

        if (name === "telefone" && !value.startsWith("+")) {
            valorAtualizado = `+${value.replace(/\D/g, "")}`;
        }

        setDizimistaSelecionado((prevState) => ({
            ...prevState,
            [name]: type === "checkbox" ? checked : valorAtualizado,
        }));
    };

    const validarDados = () => {
        if (!dizimistaSelecionado) return false;

        let errosTemp = {};

        if (!dizimistaSelecionado.ficha) errosTemp.ficha = "O número da ficha é obrigatório.";
        if (!dizimistaSelecionado.sistema) errosTemp.sistema = "O número do sistema é obrigatório.";
        if (!dizimistaSelecionado.nome) errosTemp.nome = "O nome é obrigatório.";
        
        if (dizimistaSelecionado.email && !dizimistaSelecionado.email.includes("@")) {
            errosTemp.email = "Email inválido.";
        }

        const telefone = dizimistaSelecionado.telefone || "";
        if (telefone) {
            if (!telefone.startsWith("+")) {
                errosTemp.telefone = "O telefone deve começar com '+'.";
            } else if (!telefone.match(/^\+\d{10,14}$/)) {
                errosTemp.telefone = "Telefone inválido. Use o formato +5511999999999.";
            }
        }

        setErros(errosTemp);
        return Object.keys(errosTemp).length === 0;
    };

    const tentarSalvar = () => {
        if (validarDados()) {
            setExibirConfirmacao(true);
        }
    };

    const salvarDizimista = () => {
        if (dizimistaSelecionado.id) {
            atualizarDizimista();
        } else {
            criarDizimista();
        }
        setExibirConfirmacao(false);
    };

    const abrirModalConfirmacaoDelete = (dizimista) => {
        setDizimistaSelecionadoParaExclusao(dizimista);
        setExibirConfirmacaoDelete(true);
    };

    const fecharModalConfirmacaoDelete = () => {
        setDizimistaSelecionadoParaExclusao(null);
        setExibirConfirmacaoDelete(false);
    };

    const deletarDizimista = async () => {
        if (!dizimistaSelecionadoParaExclusao) return;

        setLoading(true);
        setError(null);
        setSucesso(null);

        try {
            const endpoint = getEndpoint();
            const response = await api.delete(`${endpoint}${dizimistaSelecionadoParaExclusao.id}/`);

            if (response.status === 204) {
                if (categoriaAtiva === "dizimistas") {
                    setDizimistas(prevDizimistas => 
                        prevDizimistas.filter(d => d.id !== dizimistaSelecionadoParaExclusao.id)
                    );
                } else {
                    setNovosDizimistas(prevDizimistas => 
                        prevDizimistas.filter(d => d.id !== dizimistaSelecionadoParaExclusao.id)
                    );
                }
                setSucesso("Dizimista excluído com sucesso!");
            } else {
                throw new Error('Erro ao excluir dizimista');
            }
        } catch (error) {
            console.error("Erro ao excluir dizimista:", error);
            setError(error.response?.data?.message || "Erro ao excluir o dizimista. Tente novamente mais tarde.");
        } finally {
            setLoading(false);
            fecharModalConfirmacaoDelete();
        }
    };

    useEffect(() => {
        if (comunidade) {
            fetchDizimistas();
        }
    }, [comunidade, situacaoFiltro, fetchDizimistas]);

    useEffect(() => {
        const fetchParoquias = async () => {
            try {
                const response = await api.get("/paroquias/");
                setParoquias(response.data);
            } catch (error) {
                setError("Erro ao buscar paróquias. Tente novamente mais tarde.");
                console.error("Erro ao buscar paróquias: ", error);
            }
        };

        fetchParoquias();
    }, []);

    useEffect(() => {
        if (error || sucesso) {
            const timer = setTimeout(() => {
                setError(null);
                setSucesso(null);
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [error, sucesso]);

    return (
        <Layout>
            <div className="flex flex-col items-start justify-start min-h-screen w-full px-[5%]">
                {error && (
                    <div className="fixed top-4 right-4 max-w-md bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded z-50 shadow-lg" role="alert">
                        <p className="text-sm">{error}</p>
                    </div>
                )}
                {sucesso && (
                    <div className="fixed top-4 right-4 max-w-md bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded z-50 shadow-lg" role="alert">
                        <p className="text-sm">{sucesso}</p>
                    </div>
                )}
                <div className="flex flex-row gap-5 w-full mb-4">
                    <input
                        name="barra-pesquisa"
                        type="text"
                        placeholder="Buscar..."
                        className="w-full max-w-[400px] bg-white px-4 py-2 border border-[#9D988D] rounded-md shadow-md"
                        value={termoBusca}
                        onChange={(e) => setTermoBusca(e.target.value)}
                    />
                    <select
                        name="filtro-comunidade"
                        className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-amber-400 focus:border-amber-400 block w-full p-2.5 max-w-100"
                        value={comunidade}
                        onChange={(e) => setComunidade(e.target.value)}
                    >
                        <option value="">Selecione a comunidade</option>
                        {paroquias.map((paroquia) => (
                            <option key={paroquia.id} value={paroquia.id}>{paroquia.nome}</option>
                        ))}
                    </select>
                    <select
                        name="filtro-situacao"
                        className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-amber-400 focus:border-amber-400 block w-full p-2.5 max-w-60"
                        value={situacaoFiltro}
                        onChange={(e) => setSituacaoFiltro(e.target.value)}
                    >
                        <option value="">Todos os dizimistas</option>
                        <option value="A">Dizimistas Ativos</option>
                        <option value="I">Dizimistas Inativos</option>
                    </select>
                </div>

                <section className="flex flex-col w-full min-h-[60%] h-auto bg-gradient-to-t from-[#EDE8DD] to-[#FFFFFF] shadow-[4px_4px_4px_rgba(0,0,0,0.25)] rounded-b-sm rounded-r-sm p-5 mt-16">
                    <div className="-mt-15 -ml-5 flex gap-2 font-bold w-full min-w-[115%]">
                        <button
                            onClick={() => setCategoriaAtiva("dizimistas")}
                            className={`px-6 py-2 rounded-t-md transition duration-200 cursor-pointer ${
                                categoriaAtiva === "dizimistas"
                                    ? "bg-[#fff] text-[#C9942B]"
                                    : "bg-[#C8C8C8] text-[#71717A]"
                            }`}
                        >
                            Dizimistas
                        </button>
                        <button
                            onClick={() => setCategoriaAtiva("novos_dizimistas")}
                            className={`px-6 py-2 rounded-t-md transition duration-200 cursor-pointer ${
                                categoriaAtiva === "novos_dizimistas"
                                    ? "bg-[#fff] text-[#C9942B]"
                                    : "bg-[#C8C8C8] text-[#71717A]"
                            }`}
                        >
                            Novos Dizimistas
                        </button>
                    </div>

                    <div className="overflow-x-auto mt-6 px-20">
                        {loading ? (
                            <div>Carregando...</div>
                        ) : (
                            <Tabela_dizimistas
                                categoria={categoriaAtiva}
                                pagina={paginaAtual}
                                itensPorPagina={itensPorPagina}
                                dados={dizimistasFiltrados}
                                comunidade={comunidade}
                                dizimistaSelecionado={dizimistaSelecionado}
                                erros={erros}
                                exibirConfirmacao={exibirConfirmacao}
                                modoReadOnly={modoReadOnly}
                                onInputChange={handleInputChange}
                                onAbrirModalReadOnly={abrirModalReadOnly}
                                onAbrirEdicao={abrirEdicao}
                                onFecharEdicao={fecharEdicao}
                                onTentarSalvar={tentarSalvar}
                                onSalvarDizimista={salvarDizimista}
                                onCancelarConfirmacao={() => setExibirConfirmacao(false)}
                                onDeletar={abrirModalConfirmacaoDelete}
                                exibirConfirmacaoDelete={exibirConfirmacaoDelete}
                                onConfirmarDelete={deletarDizimista}
                                onCancelarDelete={fecharModalConfirmacaoDelete}
                            />
                        )}
                    </div>

                    <div className="flex justify-center flex-wrap mt-6 gap-1">
                        {paginas.map((num) => (
                            <button
                                key={num}
                                onClick={() => setPaginaAtual(num)}
                                className={`mx-1 px-3 py-1 rounded-md cursor-pointer ${
                                    num === paginaAtual ? "bg-[#C9942B] text-white" : "bg-gray-200 text-gray-700"
                                } hover:bg-gray-300`}
                            >
                                {num}
                            </button>
                        ))}
                    </div>
                </section>
            </div>
        </Layout>
    );
}

export default Gestao_dizimistas;