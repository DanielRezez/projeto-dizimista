import jsPDF from 'jspdf';
import 'jspdf-autotable';

function Tabela_aniversariantes({ dados }) {
    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="flex flex-col gap-4">
            {/* Título */}
            <h2 className="text-[#C9942B] text-center text-[4rem] font-[Tangerine] mb-10">Aniversariantes</h2>

            {/* Nome do mês */}
            <div className="mes-nome">
                {(dados.aniversariantes && dados.aniversariantes.length > 0) || (dados.novos_aniversariantes && dados.novos_aniversariantes.length > 0)
                    ? (() => {
                        const meses = [...dados.aniversariantes || [], ...dados.novos_aniversariantes || []]
                            .map(a => new Date(a.data_nascimento).getMonth())
                            .filter((v, i, a) => a.indexOf(v) === i)
                            .sort((a, b) => a - b);

                        if (meses.length === 1) {
                            return new Date(0, meses[0]).toLocaleString('pt-BR', { month: 'long' }).toUpperCase();
                        } else if (meses.length > 1) {
                            return `${new Date(0, meses[0]).toLocaleString('pt-BR', { month: 'long' })} - ${new Date(0, meses[meses.length - 1]).toLocaleString('pt-BR', { month: 'long' })}`.toUpperCase();
                        }
                        return '';
                    })()
                    : ''}
            </div>

            <table className="w-full border-collapse border-[#A10013]">
                <thead>
                    <tr className="bg-[#A10013] text-white">
                        <th className="px-4 py-2 text-center">Nome</th>
                        <th className="px-4 py-2 text-center">Data</th>
                    </tr>
                </thead>
                <tbody>
                    {dados.aniversariantes && dados.novos_aniversariantes ? (
                        [...dados.aniversariantes, ...dados.novos_aniversariantes].map((aniversariante, index) => {
                            const [ano, mes, dia] = aniversariante.data_nascimento.split("-");
                            const dataFormatada = `${dia}/${mes}`;
                    
                            return (
                                <tr key={index} className={`${index % 2 === 0 ? "bg-[#EDDBB8]" : "bg-white"} border-b border-[#A10013]`}>
                                    <td className="px-4 py-2 text-center font-bold">{aniversariante.nome}</td>
                                    <td className="px-4 py-2 text-center">{dataFormatada}</td>
                                </tr>
                            );
                        })
                    
                    ) : (
                        <tr>
                            <td colSpan="2" className="px-4 py-5 text-center font-bold">Nenhum aniversariante encontrado.</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Botão de impressão */}
            <button
                onClick={handlePrint}
                className="flex self-center items-center justify-center w-[130px] h-[30px] mt-25 p-5 rounded-sm bg-[#C9942B] mb-[30px] hover:cursor-pointer hover:bg-stone-50 hover:text-[#C9942B] transition duration-300 ease-in-out font-bold text-stone-50 hover:shadow-[4px_4px_4px_rgba(0,0,0,0.25)]"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z" clipRule="evenodd" />
                </svg>
                Imprimir
            </button>

            <style>
                {`
                    /* Esconde o nome do mês no site */
                    .mes-nome {
                        display: none;
                    }

                    @media print {
                        @page {
                            margin: 0;
                            size: auto;
                            marks: none;
                        }
                        body * {
                            visibility: hidden;
                        }
                        .flex.flex-col.gap-4, .flex.flex-col.gap-4 * {
                            visibility: visible;
                        }
                        .flex.flex-col.gap-4 {
                            position: absolute;
                            left: 0;
                            top: 0;
                            width: 100%;
                        }
                        button {
                            display: none !important;
                        }

                        /* Mostra e formata o nome do mês na impressão */
                        .mes-nome {
                            display: block;
                            text-align: center;
                            font-size: 1.5rem;
                            font-weight: bold;
                            margin-bottom: 1rem;
                            text-transform: uppercase;
                        }
                    }
                `}
            </style>
        </div>
    );
}

export default Tabela_aniversariantes;
