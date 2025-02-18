import Tabela_aniversariantes from "../components/Tabela_aniversariantes";
import Layout from "../layouts/Layout";
import axios from "axios";
import { useState, useEffect } from "react";
import api from "../services/api"

function Pagina_inicial() {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [comunidade, setComunidade] = useState("");
    const [paroquias, setParoquias] = useState([]);
    const [aniversariantes, setAniversariantes] = useState([]);

    const fetchAniversariantes = async () => {
        try {
            const response = await api.get("/aniversariantes/", {
                params: {
                    data_inicio: startDate,
                    data_fim: endDate,
                    id_paroquia: comunidade
                }
            });
            console.log("✅ Resposta da API:", response);
            console.log("📊 Dados recebidos:", response.data);

            setAniversariantes(response.data);
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
            <div className="flex justify-center w-full">
                <section className="max-w-[90%] px-30 my-[115px] w-[1280px] h-[720px] rounded-sm shadow-[4px_4px_4px_rgba(0,0,0,0.25)] bg-gradient-to-t from-[#EDE8DD] to-[#FFFFFF]">
                    <h1 className="text-[#C9942B] text-center text-[4rem] font-[Tangerine] mt-[30px]">Aniversariantes</h1>

                    {/* Filtros */}
                    <div className="flex flex-col items-start gap-4 my-[58px] md:flex md:flex-row md:justify-around md:flex-wrap">
                        <select className="" value={comunidade} onChange={(e) => setComunidade(e.target.value)}>
                            <option value="">Selecione a comunidade</option>
                            {paroquias.map((paroquia) => (
                               <option key={paroquia.id} value={paroquia.id}>{ paroquia.nome }</option> 
                            ))}
                        </select>
                        <h2 className="font-bold text-[#C9942B] text-[1.375rem]">FILTRAR:</h2>
                        <div className="flex items-center justify-center flex-wrap gap-4">
                            <input className="rounded-sm border border-[#C9942B] p-1" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)}/>
                            <input className="rounded-sm border border-[#C9942B] p-1" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)}/>
                        </div>
                        <button className="flex items-center gap-4 cursor-pointer text-[#C9942B] font-bold text-[1.375rem]">
                            <img src="./src/assets/printer.svg" alt="Imprimir" /> IMPRIMIR
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
