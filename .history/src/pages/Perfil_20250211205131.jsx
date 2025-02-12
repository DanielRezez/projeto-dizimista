import Layout from "../layouts/Layout";

function Perfil() {
    return (
        <Layout>
            <section className="w-full m-20 bg-gray-500">
                <img src="./src/assets/Logo.png" />
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