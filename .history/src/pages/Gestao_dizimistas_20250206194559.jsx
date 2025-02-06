import Tabela_dizimistas from "../components/Tabela_dizimistas";
import Layout from "../layouts/Layout";

function Gestao_dizimistas() {
    return (
        <Layout>
            {/* Wrapper principal pra centralizar tudo */}
            <div className="flex flex-col items-center justify-center min-h-screen w-full bg-blue-500">
                
                {/* Container que alinha o input e a section */}
                <div className="relative w-[1280px]">
                    {/* Input alinhado ao topo da section */}
                    <input 
                        type="text" 
                        placeholder="Buscar..." 
                        className="absolute top-0 left-0 w-[400px] px-4 py-2 border border-gray-300 rounded-md"
                    />

                    {/* Section centralizada */}
                    <section className="mt-12 max-w-[90%] px-5 w-[1280px] h-[720px] bg-gradient-to-t from-[#EDE8DD] to-[#FFFFFF] shadow-lg rounded-lg">
                        <div className="flex justify-center overflow-x-auto w-full">
                            <Tabela_dizimistas />
                        </div>
                    </section>
                </div>
            </div>
        </Layout>
    );
}

export default Gestao_dizimistas;
