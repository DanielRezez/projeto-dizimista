import { useState, useEffect } from "react";
import Layout from "../layouts/Layout";

function Perfil() {
    const [imagem, setImagem] = useState(localStorage.getItem("fotoPerfil") || "./src/assets/Logo.png");

    // Atualiza a imagem ao escolher um arquivo
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImagem(imageUrl);
            localStorage.setItem("fotoPerfil", imageUrl); // Salva no navegador
        }
    };

    return (
        <Layout>
            <section className="w-full max-w-[90%] mx-auto flex flex-col relative p-20 bg-[#9D988D] mt-10 mb-30">
                {/* Avatar redondo e clicável */}
                <div className="absolute -top-15 left-1/2 -translate-x-1/2 w-[120px] h-[120px] bg-white rounded-full overflow-hidden cursor-pointer sm:-top-30 sm:w-[180px] sm:h-[180px]  md:w-[260px] md:h-[260px]">
                    <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        id="fileInput" 
                        onChange={handleImageChange}
                    />
                    <label htmlFor="fileInput" className="w-full h-full flex items-center justify-center">
                        <img src={imagem} className="w-full h-full object-cover" />
                    </label>
                </div>

                <form className="flex flex-col mx-auto text-left gap-4 mt-40 text-[#F2EDE2] max-w-[90%]">
                    <label htmlFor="input-usuario" className="font-bold text-xl">Nome:</label>
                    <input id="input-usuario" placeholder="@Usuário" type="text" className="w-[600px] max-w-[90%] border-1 border-white rounded-md p-2" />
                    <label htmlFor="input-senha-atual" className="font-bold text-xl">Senha atual:</label>
                    <input id="input-senha-atual" placeholder="********" type="password" className="w-[600px] max-w-[60%] border-1 border-white rounded-sm p-2" />
                    <label htmlFor="input-nova-senha" className="font-bold text-xl">Nova senha:</label>
                    <input id="input-nova-senha" placeholder="********" type="password" className="w-[600px] max-w-[90%] border-1 border-white rounded-sm p-2" />
                </form>
            </section>
        </Layout>
    );
}

export default Perfil;
