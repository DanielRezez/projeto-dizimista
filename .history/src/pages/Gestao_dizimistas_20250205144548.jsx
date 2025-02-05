import Layout from "../layouts/Layout";
import { useState } from "react";



function Gestao_dizimistas() {
    const [tabAtivo, setTabAtivo] = useState("dizimistas");

    const dizimistas = ["João", "Maria", "Carlos"];
    const novosDizimistas = ["Pedro", "Ana", "Fernanda"];

    return (
        <>
            <Layout>
            <div className="flex justify-center w-full">
                    <section className="@container max-w-[90%] px-5 my-[115px] w-[1280px] h-[720px] bg-linear-to-t from-[#EDE8DD] to-[#FFFFFF]">
                        <h1 className="text-[#C9942B] text-center text-[4rem] font-[Tangerine] mt-[30px]">Aniversariantes</h1>  

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
                </div>
            </Layout>
        </>
    );
}

export default Gestao_dizimistas;