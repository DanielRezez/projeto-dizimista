import Layout from "../layouts/Layout";

function Pagina_inicial() {
    return(
        <>
            <Layout>
                <section className="max-w-[90%] px-5 min-[1450px]:w-[1280px] h-[720px] bg-blue-500">
                    <h1 className="text-[#C9942B] text-center text-[4rem] font-[Tangerine]">Aniversariantes</h1>
                    <h2>FILTRAR:</h2>
                    <input type="date" />
                </section>
            </Layout>
        </>
    )
}

export default Pagina_inicial;