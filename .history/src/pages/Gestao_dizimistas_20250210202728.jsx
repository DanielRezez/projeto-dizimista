import { useState } from "react";

import Tabela_dizimistas from "../components/Tabela_dizimistas";
import Layout from "../layouts/Layout";

function Gestao_dizimistas() {
    const [paginaAtual, setPaginaAtual] = useState(1);

    const itensPorPagina = 12;

    const totalPaginas = 12;

    const paginas = Array.from({ length: totalPaginas }, (_, i) => i + 1);

    return (
        <Layout>
            <div className="flex flex-col items-center justify-start min-h-screen w-full px-4">
                <div className="w-full max-w-[2280px] mb-4">
                    <input type="text" placeholder="Buscar..." className="w-full max-w-[400px] bg-white px-4 py-2 border border-[#9D988D] rounded-md shadow-md" />
                </div>

                {/* Section centralizada */}
                <section className="flex flex-col w-full max-w-[1280px] min-h-[60%] h-auto bg-gradient-to-t from-[#EDE8DD] to-[#FFFFFF] shadow-lg rounded-lg p-5">
                    <div className=" overflow-x-auto">
                        <Tabela_dizimistas pagina={paginaAtual} itensPorPagina={itensPorPagina} />   
                    </div>

                    <div className="flex justify-center flex-wrap mt-24 gap-1">
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
