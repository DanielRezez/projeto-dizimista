import Layout from "../layouts/Layout";

function Perfil() {
    return (
        <Layout>
            <section className="w-full max-w-[90%] mx-auto flex flex-col relative p-20 bg-gray-500">
                <div className="absolute -top-15 left-1/2 -translate-x-1/2 w-[100px] h-[100px] bg-blue-500 rounded-sm" >
                    <img src="./src/assets/Logo.png" />
                </div>
                <form>
                    <label for="input-usuario">Nome:</label>
                    <input id="input-usuario" placeholder="@Usuário" type="text" />
                    <label for="input-usuario">Senha atual:</label>
                    <input id="input-usuario" placeholder="********" type="password" />
                    <label for="input-usuario">Nova senha:</label>
                    <input id="input-usuario" placeholder="********" type="password" />
                </form>
            </section>
        </Layout>
    )
};

export default Perfil;