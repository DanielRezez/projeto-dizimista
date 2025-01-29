import '@/css/Login.css'

function Login() {
    return (
        <>
            <section class="@container bg-[url('src/assets/Background-login.jpg')] bg-cover h-screen flex flex-col items-center justify-center md:bg-contain md:flex-row">
                <section className="flex flex-col items-center gap-5 md:flex-row">
                    <div className="">
                        <div className=""></div>
                        <img src="./src/assets/Logo.png" class="center"/>
                    </div>
                    {/*image-space*/}
                    <div className="">
                        <h1 className="text-white text-4xl">Portal do</h1>
                        <h1 className="text-yellow-350 text-6xl">Dizimista</h1>
                        <p className="text-base">Sistema desenvolvido para a fácil gestão de aniversariantes da Paróquia Matriz Santo Antônio de Pádua - Natal RN e comunidade.</p>
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