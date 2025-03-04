import { useEffect, useState, useMemo } from "react";

function Tabela_dizimistas({ pagina, itensPorPagina, dados }) {
    const inicio = (pagina - 1) * itensPorPagina;
    const fim = inicio + itensPorPagina;
    const dadosPaginados = dados.slice(inicio, fim);

    const [dizimistaSelecionado, setDizimistaSelecionado] = useState(null);
    const [erros, setErros] = useState({});
    const [exibirConfirmacao, setExibirConfirmacao] = useState(false);

    const abrirEdicao = (dizimista) => {
        setDizimistaSelecionado(dizimista);
        document.body.style.overflow='hidden';

    };

    const fecharEdicao = () => {
        setDizimistaSelecionado(null);
        setErros({});

        document.body.style.overflow='auto';

    };

    const handleInputChange = (e) => {
        const {name, type, value, checked} = e.target;

        let valorAtualizado=value;

        if(name==="telefone" && !value.startsWith("+")){
            valorAtualizado=`+${value.replace(/\D/g, "")}`;

        }

        setDizimistaSelecionado((prevState) => ({
            ...prevState,
            [name]: type === "checkbox" ? checked : valorAtualizado,
        }))

    };

    const validarDados = () => {
        if(!dizimistaSelecionado) return false;

        let errosTemp = {};
        
        if (!dizimistaSelecionado.ficha) errosTemp.ficha = "O número da ficha é obrigatório.";
        if (!dizimistaSelecionado.sistema) errosTemp.sistema = "O número do sistema é obrigatório.";
        if (!dizimistaSelecionado.nome) errosTemp.nome = "O nome é obrigatório.";
        if (!dizimistaSelecionado.email.includes("@")) errosTemp.email = "Email inválido.";

        const telefone=dizimistaSelecionado.telefone || "";

        if(!telefone.startsWith("+")){
            errosTemp.telefone="O telefone deve começar com '+'.";

        } else if(!telefone.match(/^\+\d{10,14}$/)){
            errosTemp.telefone="Telefone inválido. Use o formato +5511999999999.";

        }

    
        setErros(errosTemp);

        console.log(errosTemp);
    
        return Object.keys(errosTemp).length === 0;
    };
    

    const tentarSalvar = () => {
        console.log("Tentando salvar..."); // Depuração

        if (validarDados()) {
            console.log("Dados válidos, exibindo confirmação..."); // Depuração
            setExibirConfirmacao(true); // Exibe a confirmação
        } else {
            console.log("Dados inválidos, não exibindo confirmação."); // Depuração
        }
    };

    const salvarDizimista = () => {
        console.log("Dados salvos: ", dizimistaSelecionado);
        setExibirConfirmacao(false);
        fecharEdicao();

    };

    return (
        <>
            <table className="w-full">
                <thead>
                    <tr className="text-black text-center">
                        <th className="px-4 py-2 w-20">Sistema</th>
                        <th className="px-4 py-2 w-20">Ficha</th>
                        <th className="px-4 py-2 text-left text-[#A10013] underline w-70">Nome</th>
                        <th className="px-4 py-2 text-left underline">Situação</th>
                        <th className="flex px-4 py-2 justify-end">Ações</th>
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
                                    <div className="relative group flex flex-row gap-2 justify-end items-center h-full">
                                        <svg name="editar" className="hover:fill-[#A10013] cursor-pointer h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16" onClick={abrirEdicao}>
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                                        </svg>
                                        <svg name="excluir" className="hover:fill-[#A10013] cursor-pointer h-5 w-5" xmlns="http://www.w3.org/2000/svg"  fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
                                        </svg>
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

            {dizimistaSelecionado && (
                <div className="fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,90%)] flex items-center justify-center overflow-auto" onClick={fecharEdicao}>
                    <div className="bg-white text-black w-[50%] h-dvh max-h-[70vh] mt-30 p-12 rounded-sm shadow-lg overflow-auto">
                    <h2 className="text-[#C9942B] text-center text-[4rem] font-[Tangerine] mb-10">Informações</h2>
                        <form onSubmit={(e) => e.preventDefault()}>
                            <div className="flex w-auto flex-row gap-5">
                                {/* Ficha */}
                                <div className="mb-6 max-w-20">
                                    <label className="block font-bold mb-2">Ficha</label>
                                    <input
                                        type="text"
                                        name="ficha"
                                        value={dizimistaSelecionado.ficha || ""}
                                        className="w-full border border-gray-300 p-2 rounded"
                                        onChange={handleInputChange}
                                    />
                                    {erros.ficha && <p className="text-red-500 text-sm mt-1">{erros.ficha}</p>}
                                </div>
                                {/* Sistema */}
                                <div className="mb-6 max-w-20">
                                    <label className="block font-bold mb-2">Sistema</label>
                                    <input
                                        type="text"
                                        name="sistema"
                                        value={dizimistaSelecionado.sistema || ""}
                                        className="w-full border border-gray-300 p-2 rounded"
                                        onChange={handleInputChange}
                                    />
                                    {erros.sistema && <p className="text-red-500 text-sm mt-1">{erros.sistema}</p>}
                                </div>
                                {/* Nome */}
                                <div className="mb-6 w-screen">
                                    <label className="block font-bold mb-2">Nome</label>
                                    <input
                                        type="text"
                                        name="nome"
                                        value={dizimistaSelecionado.nome || ""}
                                        className="w-full border border-gray-300 p-2 rounded"
                                        onChange={handleInputChange}
                                    />
                                    {erros.nome && <p className="text-red-500 text-sm mt-1">{erros.nome}</p>}
                                </div>
                            </div>
            
            
                            {/* Email */}
                            <div className="mb-6">
                                <label className="block font-bold mb-2">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={dizimistaSelecionado.email || ""}
                                    className="w-full border border-gray-300 p-2 rounded"
                                    onChange={handleInputChange}
                                />
                                {erros.email && <p className="text-red-500 text-sm mt-1">{erros.email}</p>}
                            </div>
            
                            {/* Telefone */}
                            <div className="mb-6">
                                <label className="block font-bold mb-2">Telefone</label>
                                <input
                                    type="text"
                                    name="telefone"
                                    value={dizimistaSelecionado.telefone || ""}
                                    className="w-full border border-gray-300 p-2 rounded"
                                    onChange={handleInputChange}
                                    maxLength={14}
                                    placeholder="+5511999999999"
                                />
                                {erros.telefone && <p className="text-red-500 text-sm mt-1">{erros.telefone}</p>}
                            </div>
            
                            <div className="flex flex-row gap-5">
                                {/* Data de Nascimento */}
                                <div className="mb-6">
                                    <label className="block font-bold mb-2">Data de Nascimento</label>
                                    <input
                                        type="date"
                                        name="data_nascimento"
                                        value={dizimistaSelecionado.data_nascimento || ""}
                                        className="w-full border border-gray-300 p-2 rounded"
                                        onChange={handleInputChange}
                                    />
                                </div>
                                {/* Situação */}
                                <div className="mb-6">
                                    <label className="block font-bold mb-2">Situação</label>
                                    <select
                                        name="situacao"
                                        value={dizimistaSelecionado.situacao || "A"}
                                        className="w-full border border-gray-300 p-2 rounded"
                                        onChange={handleInputChange}
                                    >
                                        <option value="A">Ativo</option>
                                        <option value="I">Inativo</option>
                                    </select>
                                </div>
                            </div>
            
                            {/* Permissões */}
                            <div className="mb-6">
                                <label className="block font-bold mb-2">Permissões</label>
                                <div className="flex items-center gap-4">
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            name="permissao_email"
                                            checked={dizimistaSelecionado.email_permission || false}
                                            onChange={handleInputChange}
                                        />
                                        Permissão para e-mails automáticos
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            name="permissao_whatsapp"
                                            checked={dizimistaSelecionado.phone_permission || false}
                                            onChange={handleInputChange}
                                        />
                                        Permissão para mensagens de WhatsApp
                                    </label>
                                </div>
                                <div className="flex flex-wrap gap-4 self-end mt-15">
                                    <button className="cursor-pointer bg-red-500 text-white px-4 py-2 rounded mr-2 hover:bg-red-600 transition duration-200" onClick={fecharEdicao}>
                                        Cancelar
                                    </button>
                                    <button className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200" onClick={tentarSalvar}>
                                        Salvar
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {exibirConfirmacao && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-lg">
                        <p>Tem certeza que deseja salvar as alterações?</p>
                        <div className="flex justify-center gap-4 mt-10">
                            <button onClick={() => setExibirConfirmacao(false)} className="bg-gray-500 text-white px-4 py-2 rounded hover:cursor-pointer hover:bg-gray-600 transition duration-200">
                                Cancelar
                            </button>
                            <button onClick={salvarDizimista} className="bg-blue-500 text-white px-4 py-2 rounded hover:cursor-pointer hover:bg-blue-600 transition duration-200">
                                Confirmar
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </>
    );
}

export default Tabela_dizimistas;