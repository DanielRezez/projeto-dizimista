import Layout from "../layouts/Layout";
import { useState } from "react";



function Gestao_dizimistas() {
    const [tabAtivo, setTabAtivo] = useState("dizimistas");

    const dizimistas = ["João", "Maria", "Carlos"];
    const novosDizimistas = ["Pedro", "Ana", "Fernanda"];

    return(
        <>
            <Layout>
                <section className="px-[94px]">
                    <input type="text" placeholder="Buscar..." className="w-[678px] max-w-3/4 h-[60px] py-[20px] px-[16px] border-1 border-[#9D988D] bg-" />
                    
                </section>
            </Layout>
        </>
    )
}

export default Gestao_dizimistas;