import Tabela_dizimistas from "../components/Tabela_dizimistas";
import Layout from "../layouts/Layout";
import { useState } from "react";

function Gestao_dizimistas() {
    return (
        <>
            <Layout>
                <div className="flex justify-center w-full">
                    <section className="@container max-w-[90%] px-5 my-[115px] w-[1280px] h-[720px] bg-linear-to-t from-[#EDE8DD] to-[#FFFFFF]">
                        <div className="flex justify-center overflow-x-auto">
                            <Tabela_dizimistas />
                        </div>
                    </section>
                </div>
            </Layout>
        </>
    );
}

export default Gestao_dizimistas;