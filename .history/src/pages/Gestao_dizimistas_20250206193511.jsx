import Tabela_dizimistas from "../components/Tabela_dizimistas";
import Layout from "../layouts/Layout";

function Gestao_dizimistas() {
    return (
        <Layout>
            <div className="flex flex-col items-center justify-center min-h-screen w-full bg-blue-500">
                <section className="flex flex-col items-center max-w-[90%] px-5 py-5 w-[1280px] h-[720px] bg-gradient-to-t from-[#EDE8DD] to-[#FFFFFF] shadow-lg rounded-lg">
                    <input 
                        type="text" 
                        placeholder="Buscar..." 
                        className="w-full max-w-[400px] px-4 py-2 border border-gray-300 rounded-md mb-4 self-start"
                    />
                    <div className="flex justify-center overflow-x-auto w-full">
                        <Tabela_dizimistas />
                    </div>
                </section>
            </div>
        </Layout>
    );
}

export default Gestao_dizimistas;
