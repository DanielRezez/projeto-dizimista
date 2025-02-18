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
            <section className="w-full max-w-[90%] mx-auto flex flex-col relative p-20 bg-gray-500 mt-10">
                {/* Avatar redondo e clicável */}
                <div className="absolute -top-15 left-1/2 -translate-x-1/2 w-[120px] h-[120px] border-10 border-[#F2EDE2] rounded-full overflow-hidden  outline-[#F2EDE2] cursor-pointer sm:-top-30 sm:w-[180px] sm:h-[180px]  md:w-[260px] md:h-[260px]">
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

                <form className="flex flex-col gap-4 mt-16">
                    <label htmlFor="input-usuario">Nome:</label>
                    <input id="input-usuario" placeholder="@Usuário" type="text" />
                    <label htmlFor="input-senha-atual">Senha atual:</label>
                    <input id="input-senha-atual" placeholder="********" type="password" />
                    <label htmlFor="input-nova-senha">Nova senha:</label>
                    <input id="input-nova-senha" placeholder="********" type="password" />
                </form>
            </section>
        </Layout>
    );
}

export default Perfil;
