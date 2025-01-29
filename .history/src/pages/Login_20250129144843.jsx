import '@/css/Login.css'

function Login() {
    return (
        <>
            <section class="@container bg-[url('src/assets/Background-login.jpg')] bg-cover h-screen flex flex-col items-center justify-start pt-8 md:bg-contain md:flex-row">
                <section className="flex flex-col items-center gap-5 md:flex-row">
                    <div className="">
                        <div className=""></div>
                        <img className="w-60 md:w-100" src="./src/assets/Logo.png" class="center"/>
                    </div>
                    {/*image-space*/}
                    <div className="flex  bg-blue-200">
                        <h1 className="text-white text-center text-4xl font-medium md:text-left">Portal do</h1>
                        <h1 className="text-yellow-500 text-center font-bold text-6xl md:text-left">Dizimista</h1>
                        <p className="text-base hidden md:block md:text-white md:font-light md:mt-10">Sistema desenvolvido para a fácil gestão de aniversariantes da Paróquia Matriz Santo Antônio de Pádua - Natal RN e comunidade.</p>
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