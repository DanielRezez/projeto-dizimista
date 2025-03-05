import { useState, useEffect } from "react";
import Layout from "../layouts/Layout";
import { useNavigate } from "react-router-dom"

function Perfil() {
    const navigate = useNavigate();
    const [imagem, setImagem] = useState(localStorage.getItem("fotoPerfil") || "./src/assets/Logo.png");

    /*
    // Obtém os dados do usuário autenticado
    const userInfo = await api.get("http://localhost:8000/me/");

    // Extrai os dados do usuário
    const { first_name, username } = userInfo.data;

    if (userInfo.data.first_name && userInfo.data.username) {
        localStorage.setItem("nomeUsuario", userInfo.data.first_name);
        localStorage.setItem("username", userInfo.data.username);
    } else {
        console.error("Erro: Dados do usuário não encontrados!");
    }
    */
    // Atualiza a imagem ao escolher um arquivo
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImagem(imageUrl);
            localStorage.setItem("fotoPerfil", imageUrl); // Salva no navegador
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("nomeUsuario");
        localStorage.setItem("username");
        navigate("/");

    }

    return (
        <Layout>
            <section className="w-full max-w-[90%] border-[#C9942B] border-3 rounded-md mx-auto flex flex-col relative p-20 bg-slate-500 mt-10 mb-30">
                {/* Avatar redondo e clicável */}
                <div className="absolute -top-15 left-1/2 -translate-x-1/2 w-[120px] h-[120px] bg-white border-[#F2EDE2] border-10 rounded-full overflow-hidden sm:-top-30 sm:w-[180px] sm:h-[180px]  md:w-[260px] md:h-[260px]">
                    <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        id="fileInput" 
                        onChange={handleImageChange} disabled
                    />
                    <label title="Recurso indisponível no momento" htmlFor="fileInput" className="w-full h-full flex items-center justify-center hover:cursor-not-allowed">
                    </label>
                </div>

                <form className="flex flex-col mx-auto text-left gap-4 mt-40 text-[#F2EDE2] max-w-[90%]">
                    <label htmlFor="input-usuario" className="font-bold text-xl">Nome:</label>
                    <input id="input-usuario" placeholder="@Usuário" type="text" className="w-[600px] max-w-[100%] border-1 border-white rounded-md p-2" value={ localStorage.getItem("username") } readOnly />
                    <label htmlFor="input-senha-atual" className="!align-start font-bold text-xl">Senha atual:</label>
                    <input title="Falar com o responsável pelo sistema" id="input-senha-atual" placeholder="********" type="password" className="w-[600px] max-w-[100%] border-1 border-white rounded-sm p-2 hover:cursor-not-allowed" disabled />
                    <label htmlFor="input-nova-senha" className="font-bold text-xl">Nova senha:</label>
                    <input title="Falar com o responsável pelo sistema" id="input-nova-senha" placeholder="********" type="password" className="w-[600px] max-w-[100%] border-1 border-white rounded-sm p-2 hover:cursor-not-allowed" disabled />
                </form>
                <button onClick={handleLogout} className="flex self-center items-center justify-center w-[130px] h-[30px] mt-25 p-5 rounded-sm bg-[#a10013] mb-[30px] hover:cursor-pointer hover:bg-stone-50 hover:text-[#a10013] transition duration-300 ease-in-out font-bold text-stone-50 hover:shadow-[4px_4px_4px_rgba(0,0,0,0.25)]">Sair</button>
            </section>
        </Layout>
    );
}

export default Perfil;
