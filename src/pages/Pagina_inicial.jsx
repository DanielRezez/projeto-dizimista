import Tabela_aniversariantes from "../components/Tabela_aniversariantes";
import Layout from "../layouts/Layout";
import axios from "axios";
import { useState, useEffect } from "react";
import api from "../services/api";

function Pagina_inicial() {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [comunidade, setComunidade] = useState("");
    const [paroquias, setParoquias] = useState([]);
    const [aniversariantes, setAniversariantes] = useState([]);

    const fetchAniversariantes = async () => {
        try {
            const responseAniversariantes = await api.get("/aniversariantes/", {
                params: {
                    data_inicio: startDate,
                    data_fim: endDate,
                    id_paroquia: comunidade
                }
            });

            const responseNovosAniversariantes = await api.get("/novos-aniversariantes/", {
                params: {
                    data_inicio: startDate,
                    data_fim: endDate,
                    id_paroquia: comunidade
                }
        
            });

            console.log("✅ Aniversariantes:", responseAniversariantes.data);
            console.log("✅ Novos Dizimistas Aniversariantes:", responseNovosAniversariantes.data);
            console.log("Comunidade: ", comunidade);

            const dadosCombinados = {
                aniversariantes: responseAniversariantes.data.aniversariantes || [],
                novos_aniversariantes: responseNovosAniversariantes.data.aniversariantes || []

            };

            console.log("📊 Dados combinados: ", dadosCombinados);

            setAniversariantes(dadosCombinados);

        } catch (error) {
            console.error("Erro ao buscar dizimistas: ", error);
        
        }
    }

    useEffect(() => {
        if (startDate && endDate && comunidade) {
            fetchAniversariantes();
        }
    }, [startDate, endDate, comunidade]);

    useEffect(() => {
        const fetchParoquias = async () => {
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
            <div className="print:block flex justify-center w-full -mt-[80px]">
                <section className="print:mt-10 max-w-[90%] px-30 pb-30 my-[115px] w-[1280px] min-h-[720px] h-auto rounded-sm shadow-[4px_4px_4px_rgba(0,0,0,0.25)] bg-gradient-to-t from-[#EDE8DD] to-[#FFFFFF]">
                    <h1 className="text-[#C9942B] text-center text-[4rem] font-[Tangerine] mt-[30px]">Aniversariantes</h1>

                    {/* Filtros */}
                    <div className="print:items-center flex flex-col items-start gap-4 my-[58px] md:flex md:flex-row md:justify-around md:flex-wrap">
                        <select className="print:text-center bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-amber-400 focus:border-amber-400 block w-full p-2.5 max-w-100" value={comunidade} onChange={(e) => setComunidade(e.target.value)}>
                            <option value="">Selecione a comunidade</option>
                            {paroquias.map((paroquia) => (
                               <option key={paroquia.id} value={paroquia.id}>{ paroquia.nome }</option> 
                            ))}
                        </select>
                        <h2 className="print:hidden font-bold text-[#C9942B] text-[1.375rem]">FILTRAR:</h2>
                        <div className="print:hidden flex items-center justify-center flex-wrap gap-4">
                            <input className="rounded-sm border border-black-400 p-1" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)}/>
                            <input className="rounded-sm border border-black-400 p-1" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)}/>
                        </div>
                        <button className="print:hidden flex items-center gap-4 cursor-pointer text-[#C9942B] font-bold text-[1.375rem] hover:text-[#A10013] hover:scale-105 hover:shadow-lg transition-all duration-200" onClick={() =>
                            window.print()}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M2.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1"/>
                                <path d="M5 1a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V3a2 2 0 0 0-2-2zM4 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2H4zm1 5a2 2 0 0 0-2 2v1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v-1a2 2 0 0 0-2-2zm7 2v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1"/>
                            </svg>
                            IMPRIMIR
                        </button>
                    </div>

                    {/* Tabela */}
                    <div className="overflow-x-auto">
                        <Tabela_aniversariantes dados={ aniversariantes } />
                    </div>
                </section>
            </div>
        </Layout>
    );
}

export default Pagina_inicial;
