import { useEffect, useState, useMemo } from "react";
import api from "../services/api";
import Tabela_dizimistas from "../components/Tabela_dizimistas";
import Layout from "../layouts/Layout";

function Gestao_dizimistas() {
    const [paginaAtual, setPaginaAtual] = useState(1);
    const [categoriaAtiva, setCategoriaAtiva] = useState("dizimistas");
    const [dizimistas, setDizimistas] = useState([]);
    const [novosDizimistas, setNovosDizimistas]= useState([]);
    const [comunidade, setComunidade] = useState("");
    const [paroquias, setParoquias] = useState([]);
    const [termoBusca, setTermoBusca] = useState(1);
    const [situacaoFiltro, setSituacaoFiltro] = useState("");

    const itensPorPagina = 12;

    // Calcula o número total de páginas dinamicamente
    const totalItens = categoriaAtiva === "dizimistas" ? dizimistas.length : novosDizimistas.length;
    const totalPaginas = Math.max(1, Math.ceil(totalItens / itensPorPagina));
    const paginas = Array.from({ length: totalPaginas }, (_, i) => i + 1);

    const dizimistasFiltrados = useMemo(() => {
        return (categoriaAtiva === "dizimistas" ? dizimistas : novosDizimistas).filter(dizimista =>
        dizimista.nome.toLowerCase().includes(termoBusca.toLowerCase())
    
        );
    }, [termoBusca, categoriaAtiva, dizimistas, novosDizimistas]);

    const fetchDizimistas = async () => {
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

            console.log("✅ Dizimistas: ", responseDizimistas.data);
            console.log("✅ Novos Dizimistas: ", responseNovosDizimistas.data);
            console.log("Comunidade: ", comunidade);

            setDizimistas(responseDizimistas.data);
            setNovosDizimistas(responseNovosDizimistas.data);
            setPaginaAtual(1);
        
        } catch(error) {
            console.error("Erro ao buscar dizimistas: ", error);

        }
    }

    useEffect(() => {
        if(comunidade) {
            fetchDizimistas();
        }
    }, [comunidade, situacaoFiltro]);

    useEffect(() => {
        const fetchParoquias = async() => {
            try {
                const response = await api.get("/paroquias/");
                setParoquias(response.data);
            
            } catch (error) {
                console.error("Erro ao buscar paróquias: ", error);

            }
        };

        fetchParoquias();

    }, []);

    return (
        <Layout>
            <div className="flex flex-col items-start justify-start min-h-screen w-full px-[5%]">
                <div className="flex flex=row gap-5 w-full mb-4">
                    <input name="barra-pesquisa" type="text" placeholder="Buscar..." className="w-full max-w-[400px] bg-white px-4 py-2 border border-[#9D988D] rounded-md shadow-md" value={termoBusca} onChange={(e) => setTermoBusca(e.target.value)}/>
                    <select name="filtro-comunidade" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-amber-400 focus:border-amber-400 block w-full p-2.5 max-w-100" value={comunidade} onChange={(e) => setComunidade(e.target.value)}>
                        <option value="">Selecione a comunidade</option>
                        {paroquias.map((paroquia) => (
                            <option key={paroquia.id} value={paroquia.id}>{paroquia.nome}</option>
                        ))}
                    </select>
                    <select name="filtro-situacao" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-amber-400 focus:border-amber-400 block w-full p-2.5 max-w-60" value={situacaoFiltro} onChange={(e) => setSituacaoFiltro(e.target.value)}>
                        <option value="">Todos os dizimistas</option>
                        <option value="A">Dizimistas ativos</option>
                        <option value="I">Dizimistas Inativos</option>
                    </select>
                </div>

                {/* Section centralizada */}
                <section className="flex flex-col w-full min-h-[60%] h-auto bg-gradient-to-t from-[#EDE8DD] to-[#FFFFFF] shadow-[4px_4px_4px_rgba(0,0,0,0.25)] rounded-b-sm rounded-r-sm p-5 mt-16">
                    
                    {/* Botões de seleção */}
                    <div className="-mt-15 -ml-5 flex gap-2 font-bold w-full min-w-[115%] ">
                        <button
                            onClick={() => setCategoriaAtiva("dizimistas")}
                            className={`px-6 py-2 rounded-t-md transition-all ${
                                categoriaAtiva === "dizimistas"
                                    ? "bg-[#fff] text-[#C9942B]"
                                    : "bg-[#C8C8C8] text-[#71717A]"
                            }`}
                        >
                            Dizimistas
                        </button>
                        <button
                            onClick={() => setCategoriaAtiva("novos_dizimistas")}
                            className={`px-6 py-2 rounded-t-md transition-all ${
                                categoriaAtiva === "novos_dizimistas"
                                    ? "bg-[#fff] text-[#C9942B]"
                                    : "bg-[#C8C8C8] text-[#71717A]"
                            }`}
                        >
                            Novos Dizimistas
                        </button>
                    </div>

                    <div name="tabela" className="overflow-x-auto mt-6 px-20">
                        <Tabela_dizimistas
                            categoria={categoriaAtiva}
                            pagina={paginaAtual}
                            itensPorPagina={itensPorPagina}
                            dados={dizimistasFiltrados} 
                        />
                    </div>

                    {/* Paginação */}
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