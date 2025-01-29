import '@/css/Login.css'

function Login() {
    return (
        <>
            <section class="@container bg-[url('src/assets/Background-login.jpg')] bg-cover h-screen flex flex-col items-center justify-center md:bg-contain flex-row">
                <section className="flex flex-row items-center gap-5">
                    <div className="">
                        <div className=""></div>
                        <img src="./src/assets/Logo.png" class="center"/>
                    </div>
                    {/*image-space*/}
                    <div className="">
                        <h1 className="text-white text-4xl">Portal do Dizimista</h1>
                        <p>Descrição</p>
                    </div>
                </section>

                <section>
                    <h2>Login</h2>
                    <div></div>
                    <input placeholder="Digite seu usuário" />
                    <input placeholder="Digite seu usuário" />
                    <p>Esqueceu a senha?</p>
                    <button type="submit"></button>
                </section>
            </section>

        </>
    );
}

export default Login;