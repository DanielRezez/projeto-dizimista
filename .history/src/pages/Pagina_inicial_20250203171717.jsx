import Layout from "../layouts/Layout";

function Pagina_inicial() {
    return(
        <>
            <Layout>
                <section className="@container max-w-[90%] px-5 w-[1280px] h-[720px] bg-blue-500">
                    <h1 className="text-[#C9942B] text-center text-[4rem] font-[Tangerine]">Aniversariantes</h1>
                    <div className="md:flex md:justify-around md:flex-wrap">
                        <h2>FILTRAR:</h2>
                        <div className="flex items-center justify-center">
                            <input className="block" type="date" />
                            <input className="block" type="date" />
                        </div>
                        <h2 className="">IMPRIMIR</h2>
                    </div>
                </section>
            </Layout>
        </>
    )
}

export default Pagina_inicial;