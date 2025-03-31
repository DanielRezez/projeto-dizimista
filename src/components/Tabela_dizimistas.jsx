import React from "react";

function Tabela_dizimistas({ 
    pagina, 
    itensPorPagina, 
    dados, 
    comunidade,
    dizimistaSelecionado,
    erros,
    exibirConfirmacao,
    modoReadOnly,
    onInputChange,
    onAbrirModalReadOnly,
    onAbrirEdicao,
    onFecharEdicao,
    onTentarSalvar,
    onSalvarDizimista,
    onCancelarConfirmacao,
    onDeletar,
    exibirConfirmacaoDelete,
    onConfirmarDelete,
    onCancelarDelete
}) {
    const inicio = (pagina - 1) * itensPorPagina;
    const fim = inicio + itensPorPagina;
    const dadosPaginados = dados.slice(inicio, fim);

    const modoCriacao = !dizimistaSelecionado?.id;

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
                            <tr key={index} className={`${index % 2 === 0 ? "bg-[#EDDBB8]" : "bg-white"} border-b border-[#A10013] first:border-t-2`}>
                                <td className="px-4 py-2 text-center font-bold">{dizimista.sistema}</td>
                                <td className="px-4 py-2 text-center">{dizimista.ficha}</td>
                                <td className="px-4 py-2 text-[#A10013] underline text-left font-bold hover:text-red-600 hover:no-underline cursor-pointer transition duration-200" onClick={() => onAbrirModalReadOnly(dizimista)}>{dizimista.nome}</td>
                                <td className="px-4 py-2 text-left">{dizimista.situacao === 'A' ? "Ativo" : "Inativo"}</td>
                                <td className="px-4 py-2 text-right" h-full>
                                    <div className="relative group flex flex-row gap-2 justify-end items-center h-full">
                                        <svg name="editar" className="fill-current hover:fill-[#A10013] cursor-pointer h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" onClick={() => onAbrirEdicao(dizimista)}>
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                                        </svg>
                                        <svg name="excluir" className="fill-current hover:fill-[#A10013] cursor-pointer h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" onClick={() => onDeletar(dizimista)}>
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

            {/* Botão de cadastro */}
            <button
                className={`cursor-pointer max-w-200 px-5 py-3 mt-10 rounded transition duration-200 ${
                    comunidade 
                        ? "bg-[#27AE60] text-white hover:bg-[#166536]" 
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
                onClick={() => onAbrirEdicao({})}
                disabled={!comunidade}
                title={!comunidade ? "Selecione uma comunidade para cadastrar" : ""}
            >
                Cadastrar Dizimista
            </button>

            {/* Modal de edição/criação */}
            {dizimistaSelecionado && (
                <div className="fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,90%)] flex items-center justify-center overflow-auto" onClick={onFecharEdicao}>
                    <div className="bg-white text-black w-[50%] h-dvh max-h-[70vh] mt-30 p-12 rounded-sm shadow-lg overflow-auto" onClick={(e) => e.stopPropagation()}>
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
                                        className={`w-full p-2 rounded border ${erros.ficha ? 'border-red-300 focus:border-red-500' : 'border-gray-300'}`}
                                        onChange={onInputChange}
                                        readOnly={modoReadOnly}
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
                                        className={`w-full p-2 rounded border ${erros.sistema ? 'border-red-300 focus:border-red-500' : 'border-gray-300'}`}
                                        onChange={onInputChange}
                                        readOnly={modoReadOnly}
                                    />
                                    {erros.sistema && <p className="text-red-500 text-sm mt-1">{erros.sistema}</p>}
                                </div>
                            </div>

                            {/* Nome */}
                            <div className="mb-6">
                                <label className="block font-bold mb-2">Nome</label>
                                <input
                                    type="text"
                                    name="nome"
                                    value={dizimistaSelecionado.nome || ""}
                                    className={`w-full p-2 rounded border ${erros.nome ? 'border-red-300 focus:border-red-500' : 'border-gray-300'}`}
                                    onChange={onInputChange}
                                    readOnly={modoReadOnly}
                                />
                                {erros.nome && <p className="text-red-500 text-sm mt-1">{erros.nome}</p>}
                            </div>

                            {/* Email */}
                            <div className="mb-6">
                                <label className="block font-bold mb-2">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={dizimistaSelecionado.email || ""}
                                    className={`w-full p-2 rounded border ${erros.email ? 'border-red-300 focus:border-red-500' : 'border-gray-300'}`}
                                    onChange={onInputChange}
                                    readOnly={modoReadOnly}
                                />
                                {erros.email && <p className="text-red-500 text-sm mt-1">{erros.email}</p>}
                            </div>

                            {/* Telefone */}
                            <div className="mb-6">
                                <label className="block font-bold mb-2">Telefone</label>
                                <input
                                    type="tel"
                                    name="telefone"
                                    value={dizimistaSelecionado.telefone || ""}
                                    className={`w-full p-2 rounded border ${erros.telefone ? 'border-red-300 focus:border-red-500' : 'border-gray-300'}`}
                                    onChange={onInputChange}
                                    readOnly={modoReadOnly}
                                    placeholder="+5511999999999"
                                />
                                {erros.telefone && <p className="text-red-500 text-sm mt-1">{erros.telefone}</p>}
                            </div>

                            {/* Data de Nascimento */}
                            <div className="mb-6">
                                <label className="block font-bold mb-2">Data de Nascimento</label>
                                <input
                                    type="date"
                                    name="data_nascimento"
                                    value={dizimistaSelecionado.data_nascimento || ""}
                                    className={`w-full p-2 rounded border ${erros.data_nascimento ? 'border-red-300 focus:border-red-500' : 'border-gray-300'}`}
                                    onChange={onInputChange}
                                    readOnly={modoReadOnly}
                                />
                            </div>

                            {/* Situação */}
                            <div className="mb-6">
                                <label className="block font-bold mb-2">Situação</label>
                                <select
                                    name="situacao"
                                    value={dizimistaSelecionado.situacao || "A"}
                                    className="w-full p-2 rounded border border-gray-300"
                                    onChange={onInputChange}
                                    disabled={modoReadOnly}
                                >
                                    <option value="A">Ativo</option>
                                    <option value="I">Inativo</option>
                                </select>
                            </div>

                            {/* Permissões */}
                            <div className="mb-6">
                                <label className="block font-bold mb-2">Permissões</label>
                                <div className="flex items-center gap-4">
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            name="email_permission"
                                            checked={dizimistaSelecionado.email_permission || false}
                                            onChange={onInputChange}
                                            disabled={modoReadOnly}
                                        />
                                        Permissão para e-mails automáticos
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            name="phone_permission"
                                            checked={dizimistaSelecionado.phone_permission || false}
                                            onChange={onInputChange}
                                            disabled={modoReadOnly}
                                        />
                                        Permissão para mensagens de WhatsApp
                                    </label>
                                </div>
                            </div>

                            {!modoReadOnly && (
                                <div className="flex justify-end gap-4 mt-8">
                                    <button
                                        type="button"
                                        onClick={onFecharEdicao}
                                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="button"
                                        onClick={onTentarSalvar}
                                        className="px-4 py-2 bg-[#27AE60] text-white rounded hover:bg-[#166536]"
                                    >
                                        {modoCriacao ? "Cadastrar" : "Salvar"}
                                    </button>
                                </div>
                            )}

                            {modoReadOnly && (
                                <div className="flex justify-end gap-4 mt-8">
                                    <button
                                        type="button"
                                        onClick={onFecharEdicao}
                                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                                    >
                                        Fechar
                                    </button>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            )}

            {/* Modal de confirmação */}
            {exibirConfirmacao && (
                <div className="fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,90%)] flex items-center justify-center">
                    <div className="bg-white p-8 rounded-lg shadow-lg">
                        <h3 className="text-xl mb-4">Confirmar {modoCriacao ? "Cadastro" : "Atualização"}</h3>
                        <p className="mb-6">Deseja {modoCriacao ? "cadastrar" : "atualizar"} este dizimista?</p>
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={onCancelarConfirmacao}
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={onSalvarDizimista}
                                className="px-4 py-2 bg-[#27AE60] text-white rounded hover:bg-[#166536]"
                            >
                                Confirmar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal de confirmação de exclusão */}
            {exibirConfirmacaoDelete && (
                <div className="fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,90%)] flex items-center justify-center">
                    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full mx-4">
                        <h3 className="text-xl font-semibold mb-4 text-gray-800">Confirmar Exclusão</h3>
                        <p className="mb-6 text-gray-600">
                            Tem certeza que deseja excluir este dizimista? Esta ação não pode ser desfeita.
                        </p>
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={onCancelarDelete}
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition duration-200"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={onConfirmarDelete}
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
                            >
                                Excluir
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Tabela_dizimistas;