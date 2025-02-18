import Tabela_aniversariantes from "../components/Tabela_aniversariantes";
import Layout from "../layouts/Layout";
import Breadcrumbs from "../components/Breadcrumbs";

function Pagina_inicial() {
    return (
        <Layout>
            <Breadcrumbs />
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
                    <div className="overflow-x-auto">
                        <Tabela_aniversariantes />
                    </div>
                </section>
            </div>
        </Layout>
    );
}

export default Pagina_inicial;
