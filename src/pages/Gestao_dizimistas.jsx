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

    const itensPorPagina = 12;

    const totalItens = categoriaAtiva === "dizimistas" ? dizimistas.length : novosDizimistas.length;
    const totalPaginas = Math.max(1, Math.ceil(totalItens / itensPorPagina));
    const paginas = Array.from({ length: totalPaginas }, (_, i) => i + 1);

    const dizimistasFiltrados = useMemo(() => {
        return (categoriaAtiva === "dizimistas" ? dizimistas : novosDizimistas).filter(dizimista =>
            dizimista.nome.toLowerCase().includes(termoBusca.toLowerCase())
        );
    }, [termoBusca, categoriaAtiva, dizimistas, novosDizimistas]);

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

    const atualizarDizimista = async () => {
        setLoading(true);
        setError(null);
        setSucesso(null);
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

            const response = await api.put(`/dizimistas/${dizimistaSelecionado.id}/`, dadosParaEnviar);

            if (!response.data) {
                throw new Error('Resposta da API não contém dados');
            }

            // Atualiza o dizimista na lista local
            setDizimistas(prevDizimistas => 
                prevDizimistas.map(d => 
                    d.id === dizimistaSelecionado.id ? response.data : d
                )
            );

            setSucesso("Dizimista atualizado com sucesso!");
            fecharEdicao();
        } catch (error) {
            console.error("Erro ao atualizar dizimista:", error);
            setError(error.response?.data?.message || "Erro ao atualizar o dizimista. Tente novamente mais tarde.");
        } finally {
            setLoading(false);
        }
    };

    const criarDizimista = async () => {
        setLoading(true);
        setError(null);
        setSucesso(null);
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

            const response = await api.post("/dizimistas/", dadosParaEnviar);

            if (!response.data) {
                throw new Error('Resposta da API não contém dados');
            }

            // Adiciona o novo dizimista à lista local
            setDizimistas(prevDizimistas => [...prevDizimistas, response.data]);

            setSucesso("Dizimista cadastrado com sucesso!");
            fecharEdicao();
        } catch (error) {
            console.error("Erro ao criar dizimista:", error);
            setError(error.response?.data?.message || "Erro ao cadastrar o dizimista. Tente novamente mais tarde.");
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

    return (
        <Layout>
            <div className="flex flex-col items-start justify-start min-h-screen w-full px-[5%]">
                {error && <div className="text-red-500 mb-4">{error}</div>}
                {sucesso && (
                    <div className="fixed top-5 right-5 bg-green-500 text-white px-4 py-2 rounded shadow-lg">
                        {sucesso}
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

                    <div name="tabela" className="overflow-x-auto mt-6 px-20">
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