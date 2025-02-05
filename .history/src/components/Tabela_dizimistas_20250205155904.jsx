function Tabela_dizimistas() {
    const dizimistas = [
        { sistema: "1228", ficha: "001", nome: "João Damasceno", situaçao: "ativo", editar: "arroz" },
        { sistema: "1229", ficha: "002", nome: "Maria Pereira", situaçao: "ativo", editar: "arroz" },
        { sistema: "1230", ficha: "003", nome: "Pedro Castelano", situaçao: "ativo", editar: "arroz" },
        { sistema: "1231", ficha: "004", nome: "Ana Maria ", situaçao: "ativo", editar: "arroz" },
        { sistema: "1232", ficha: "005", nome: "John Connor", situaçao: "ativo", editar: "arroz" },
        { sistema: "1233", ficha: "006", nome: "Timóteo Alves Gonzales", situaçao: "ativo", editar: "arroz" },
        { sistema: "1234", ficha: "007", nome: "Louis  Pedroza", situaçao: "ativo", editar: "arroz" },
    ]
    const novosDizimistas = [
        { sistema: "1235", ficha: "008", nome: "João Damasceno", situaçao: "ativo", editar: "arroz" },
        { sistema: "1236", ficha: "009", nome: "Maria Pereira", situaçao: "ativo", editar: "arroz" },
        { sistema: "1237", ficha: "010", nome: "Pedro Castelano", situaçao: "ativo", editar: "arroz" },
        { sistema: "1238", ficha: "011", nome: "Ana Maria ", situaçao: "ativo", editar: "arroz" },
        { sistema: "1239", ficha: "012", nome: "John Connor", situaçao: "ativo", editar: "arroz" },
        { sistema: "1240", ficha: "013", nome: "Timóteo Alves Gonzales", situaçao: "ativo", editar: "arroz" },
        { sistema: "1241", ficha: "014", nome: "Louis  Pedroza", situaçao: "ativo", editar: "arroz" },
    ]

    return (
        <>
<table className="w-full">
                <thead>
                    <tr className="bg-[#A10013] text-white text-left">
                        <th className="px-4 py-2">Sistema</th>
                        <th className="px-4 py-2">Ficha</th>
                        <th className="px-4 py-2">Nome</th>
                        <th className="px-4 py-2">Situação</th>
                        <th className="px-4 py-2 text-right">Editar</th>
                    </tr>
                </thead>
                <tbody>
                {dizimistas.map((dizimista, index) => (
                        <tr key={index} className={`${index % 2 === 0 ? "bg-[#EDDBB8]" : "bg-white"} border-b border-[#A10013]`} >
                            <td className="px-4 py-2 text-left font-bold">{dizimista.sistema}</td>
                            <td className="px-4 py-2 text-left">{dizimista.ficha}</td>
                            <td className="px-4 py-2 text-left font-bold">{dizimista.nome}</td>
                            <td className="px-4 py-2 text-left">{dizimista.situaçao}</td>
                            <td className="flex justify-end px-4 py-2 text-right"><img src="./src/assets/pencil.svg" /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default Tabela_dizimistas;