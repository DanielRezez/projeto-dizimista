import Tabela_dizimistas from "../components/Tabela_dizimistas";
import Layout from "../layouts/Layout";

function Gestao_dizimistas() {
    return (
        <Layout>
            {/* Container principal para alinhar tudo */}
            <div className="flex flex-col items-center justify-center min-h-screen w-full px-4">
                
                {/* Input alinhado com a section */}
                <div className="w-full max-w-[1280px] mb-4">
                    <input 
                        type="text" 
                        placeholder="Buscar..." 
                        className="w-full max-w-[400px] px-4 py-2 border border-gray-300 rounded-md"
                    />
                </div>

                {/* Section centralizada */}
                <section className="w-full max-w-[1280px] h-auto bg-gradient-to-t from-[#EDE8DD] to-[#FFFFFF] shadow-lg rounded-lg p-5">
                    <div className="flex justify-center overflow-x-auto">
                        <Tabela_dizimistas />
                    </div>
                </section>
            </div>
        </Layout>
    );
}

export default Gestao_dizimistas;
