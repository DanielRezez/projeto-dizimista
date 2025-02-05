import Layout from "../layouts/Layout";

function Pagina_inicial() {
    return(
        <>
            <Layout>
                <section className="max-w-[90%] px-5 min-[1450px]:w-[1280px] h-[720px] bg-blue-500">
                    <h1 className="text-[#C9942B] text-center text-[4rem] font-[Tangerine]">Aniversariantes</h1>
                    <div className="flex flex-wrap">
                        <h2>FILTRAR:</h2>
                        <input type="date" />
                        <input type="date" />
                        <h2 className="relative right-0">IMPRIMIR</h2>
                    </div>
                </section>
            </Layout>
        </>
    )
}

export default Pagina_inicial;