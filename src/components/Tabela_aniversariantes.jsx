function Tabela_aniversariantes({ dados }) {
    console.log("Dados recebidos para a tabela:", dados);

    return (
        <>
            <table className="w-full border-collapse border-[#A10013]">
                <thead>
                    <tr className="bg-[#A10013] text-white">
                        <th className="px-4 py-2">Nome</th>
                        <th className="px-4 py-2">Data</th>
                    </tr>
                </thead>
                <tbody>
                    {dados.aniversariantes && dados.novos_aniversariantes ? (
                        [...dados.aniversariantes, ...dados.novos_aniversariantes].map((aniversariante, index) => {
                            const [ano, mes, dia] = aniversariante.data_nascimento.split("-");
                            const dataFormatada = `${ dia }/${ mes }`;
                    
                            return (
                                <tr key={ index } className={`${ index % 2 === 0 ? "bg-[#EDDBB8]" : "bg-white"} border-b border-[#A10013]`}>
                                    <td className="px-4 py-2 text-center font-bold">{ aniversariante.nome }</td>
                                    <td className="px-4 py-2 text-center">{ dataFormatada }</td>
                                </tr>
                            );
                        })
                    
                    ) : (
                        <tr>
                            <td colSpan="3" className="px-4 py-5 text-center font-bold">Nenhum aniversariante encontrado.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    );
}
export default Tabela_aniversariantes;
