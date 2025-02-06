import Tabela_dizimistas from "../components/Tabela_dizimistas";
import Layout from "../layouts/Layout";

function Gestao_dizimistas() {
    return (
        <Layout>
            <div className="flex flex-col items-center justify-start min-h-screen w-full">
                <div className="w-full max-w-[1280px] mb-4">
                    <input 
                        type="text" 
                        placeholder="Buscar..." 
                        className="w-full max-w-[400px] px-4 py-2 border border-gray-300 rounded-md"
                    />
                </div>

                {/* Section centralizada */}
                <section className="w-full max-w-[680px] min-h-[60%] h-auto bg-gradient-to-t from-[#EDE8DD] to-[#FFFFFF] shadow-lg rounded-lg p-5">
                    <div className="flex justify-center overflow-x-auto">
                        <Tabela_dizimistas />
                    </div>
                </section>
            </div>
        </Layout>
    );
}

export default Gestao_dizimistas;
