import Layout from "../layouts/Layout";

function Pagina_inicial() {
    const aniversariantes = [
        { nome: "João Damasceno", data: "03/01" },
        { nome: "Maria de Souza", data: "07/01" },
        { nome: "Beatriz Monteiro", data: "09/01" },
        { nome: "Pedro Henrique", data: "14/01" },
    ];

    return (
        <Layout>
            <div className="flex justify-center w-full">
                <section className="max-w-[90%] px-5 my-[115px] w-[1280px] h-[720px] bg-gradient-to-t from-[#EDE8DD] to-[#FFFFFF]">
                    <h1 className="text-[#C9942B] text-center text-[4rem] font-[Tangerine] mt-[30px]">Aniversariantes</h1>

                    {/* Filtros */}
                    <div className="flex flex-col items-start gap-4 my-[58px] md:flex md:flex-row md:justify-around md:flex-wrap">
                        <h2 className="font-bold text-[#C9942B] text-[1.375rem]">FILTRAR:</h2>
                        <div className="flex items-center justify-center flex-wrap gap-4">
                            <input className="rounded-sm border border-[#C9942B] p-1" type="date" />
                            <input className="rounded-sm border border-[#C9942B] p-1" type="date" />
                        </div>
                        <button className="flex items-center gap-4 cursor-pointer text-[#C9942B] font-bold text-[1.375rem]">
                            <img src="./src/assets/printer.svg" alt="Imprimir" /> IMPRIMIR
                        </button>
                    </div>

                    {/* Tabela */}
                    <div className="">
                        <table className="w-full border-collapse border border-[#C9942B]">
                            <thead>
                                <tr className="bg-[#C9942B] text-white">
                                    <th className="px-4 py-2">Nome</th>
                                    <th className="px-4 py-2">Data</th>
                                </tr>
                            </thead>
                            <tbody>
                                {aniversariantes.map((pessoa, index) => (
                                    <tr key={index} className={`${index % 2 === 0 ? "bg-[#EDDBB8]" : "bg-white"} border-b`}>
                                        <td className="px-4 py-2 text-center font-bold">{pessoa.nome}</td>
                                        <td className="px-4 py-2 text-center">{pessoa.data}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </Layout>
    );
}

export default Pagina_inicial;
