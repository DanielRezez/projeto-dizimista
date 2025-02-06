import Tabela_dizimistas from "../components/Tabela_dizimistas";
import Layout from "../layouts/Layout";

function Gestao_dizimistas() {
    return (
        <Layout>
            <div className="flex flex-col items-center min-h-screen w-full bg-blue-500">
                {/* Input alinhado ao começo da section */}
                <input 
                    type="text" 
                    placeholder="Buscar..." 
                    className="w-[400px] px-4 py-2 border border-gray-300 rounded-md mb-4"
                />
                
                {/* Section centralizada */}
                <section className="flex justify-center items-center max-w-[90%] px-5 w-[1280px] h-[720px] bg-gradient-to-t from-[#EDE8DD] to-[#FFFFFF] shadow-lg rounded-lg">
                    <div className="flex justify-center overflow-x-auto w-full">
                        <Tabela_dizimistas />
                    </div>
                </section>
            </div>
        </Layout>
    );
}

export default Gestao_dizimistas;
