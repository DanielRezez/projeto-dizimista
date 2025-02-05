import LiComponent from "../components/LiComponent";
import Layout from "../layouts/Layout";

function Pagina_inicial() {
    return(
        <>
            <Layout>
                <section className="@container max-w-[90%] px-5 my-[115px] w-[1280px] h-[720px] bg-linear-to-t from-[#EDE8DD] to-[#FFFFFF]">
                    <h1 className="text-[#C9942B] text-center text-[4rem] font-[Tangerine] mt-[30px]">Aniversariantes</h1>
                    <div className="mt-[58px] md:flex md:justify-around md:flex-wrap">
                        <h2 className="font-bold text-[#C9942B] text-[1.375rem]">FILTRAR:</h2>
                        <div className="flex items-center justify-center flex-wrap  gap-4 ">
                            <input className="rounded-sm border-1 border-[#C9942B] p-1" type="date" />
                            <input className="" type="date" />
                        </div>
                        <div className="flex items-center gap-4">
                            <img src="./src/assets/printer.svg" />
                            <h2 className="text-[#C9942B] font-bold text-[1.375rem]">IMPRIMIR</h2>
                        </div>
                    </div>

                    <ul className="flex flex-col ">
                        <LiComponent>
                            <h3 className="font-bold">João Damasceno</h3>
                            <h3 classNme="font-medium">03/01</h3>
                        </LiComponent>
                        <LiComponent>
                            <h3 className="font-bold">Maria de Souza</h3>
                            <h3 className="font-medium">07/01</h3>
                        </LiComponent>
                        <LiComponent>
                            <h3 className="font-bold">Beatriz Monteiro</h3>
                            <h3 className="font-medium">09/01</h3>
                        </LiComponent>
                        <LiComponent>
                            <h3 className="font-bold">Pedro Henrique</h3>
                            <h3 className="font-medium">14/01</h3>
                        </LiComponent>
                    </ul>
                </section>
            </Layout>
        </>
    )
}

export default Pagina_inicial;