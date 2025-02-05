function Table_aniversariantes({ children }) {
    return (
        <table className="w-full border-collapse border-[#A10013]">
        <thead>
            <tr className="bg-[#A10013] text-white">
                <th className="px-4 py-2">Nome</th>
                <th className="px-4 py-2">Data</th>
            </tr>
        </thead>
        <tbody>
            {aniversariantes.map((pessoa, index) => (
                <tr key={index} className={`${index % 2 === 0 ? "bg-[#EDDBB8]" : "bg-white"} border-b border-[#A10013]`}>
                    <td className="px-4 py-2 text-center font-bold">{pessoa.nome}</td>
                    <td className="px-4 py-2 text-center">{pessoa.data}</td>
                </tr>
            ))}
        </tbody>
    </table>
    );
}
export default LiComponent;
