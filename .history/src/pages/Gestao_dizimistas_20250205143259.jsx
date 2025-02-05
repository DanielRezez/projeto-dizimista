import Layout from "../layouts/Layout";
import { useState } from "react";



function Gestao_dizimistas() {
    const [tabAtivo, setTabAtivo] = useState("dizimistas");

    const dizimistas = ["João", "Maria", "Carlos"];
    const novosDizimistas = ["Pedro", "Ana", "Fernanda"];

    return (
        <>
            <Layout>
                <div className="w-full max-w-md mx-auto">
                    {/* Cabeçalho das abas */}
                    <div className="flex border-b-2 border-gray-300">
                        <button
                            className={`px-4 py-2 flex-1 text-center font-bold ${tabAtivo === "dizimistas" ? "bg-red-500 text-white" : "bg-gray-200 text-gray-500"}`}
                            onClick={() => setTabAtivo("dizimistas")}
                        >
                            Dizimistas
                        </button>
                        <button
                            className={`px-4 py-2 flex-1 text-center font-bold ${tabAtivo === "novosDizimistas" ? "bg-red-500 text-white" : "bg-gray-200 text-gray-500"}`}
                            onClick={() => setTabAtivo("novosDizimistas")}
                        >
                            Novos Dizimistas
                        </button>
                    </div>

                    {/* Lista dinâmica conforme o estado da aba */}
                    <ul className="p-4 bg-white shadow-md">
                        {tabAtivo === "dizimistas"
                            ? dizimistas.map((nome, index) => <li key={index} className="p-2 border-b">{nome}</li>)
                            : novosDizimistas.map((nome, index) => <li key={index} className="p-2 border-b">{nome}</li>)
                        }
                    </ul>
                </div>
            </Layout>
        </>
    );
}

export default Gestao_dizimistas;