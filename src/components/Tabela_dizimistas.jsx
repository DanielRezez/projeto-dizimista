function Tabela_dizimistas({ pagina, itensPorPagina, dados }) {
    const inicio = (pagina - 1) * itensPorPagina;
    const fim = inicio + itensPorPagina;
    const dadosPaginados = dados.slice(inicio, fim);


    return (
        <>
            <table className="w-full">
                <thead>
                    <tr className="text-black text-center">
                        <th className="px-4 py-2 w-20">Sistema</th>
                        <th className="px-4 py-2 w-20">Ficha</th>
                        <th className="px-4 py-2 text-left text-[#A10013] underline w-70">Nome</th>
                        <th className="px-4 py-2 text-left underline">Situação</th>
                        <th className="flex px-4 py-2 justify-end">Editar</th>
                    </tr>
                </thead>
                <tbody>
                    {dadosPaginados.length > 0 ? (
                        dadosPaginados.map((dizimista, index) => (
                            <tr key={index} className={`${index % 2 === 0 ? "bg-[#EDDBB8]" : "bg-white"} border-b border-[#A10013] first:border-t-2`} >
                                <td className="px-4 py-2 text-center font-bold">{dizimista.sistema}</td>
                                <td className="px-4 py-2 text-center">{dizimista.ficha}</td>
                                <td className="px-4 py-2 text-[#A10013] underline text-left font-bold">{dizimista.nome}</td>
                                <td className="px-4 py-2 text-left">{dizimista.situacao === 'A' ? "Ativo" : "Inativo"}</td>
                                <td className="px-4 py-2 text-right" h-full>
                                    <div className="flex justify-end items-center h-full">
                                        <img src="./src/assets/pencil.svg" className="h-5 w-5 cursor-pointer" />
                                    </div>
                                </td>
                            </tr>
                        ))

                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center py-10 text-gray-500">Nenhum registro encontrado.</td>
                        </tr>
                    )}

                </tbody>
            </table>
        </>
    );
}

export default Tabela_dizimistas;