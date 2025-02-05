import '@/css/Login.css'

function Login() {
    return (
        <>
            <section className="@container bg-[url('src/assets/Background-login.jpg')] bg-cover h-screen flex flex-col items-center justify-start md:items-center md:justify-between md:bg-contain lg:flex-row">
                <section className="flex flex-col items-center md:gap-5 md:flex-row md:items-start">
                    <div className="">
                        <div className="lg:h-[728px] lg:w-[2px] lg:bg-white lg:absolute lg:top-[50%] translate-y-[-50%] lg:left-20"></div>
                        <img className="w-60 md:w-[553px] md:min-w-[350px] lg:relative" src="./src/assets/Logo.png"/>
                    </div>
                    {/*image-space*/}
                    <div className="">
                        <h1 className="text-white text-center text-[38px] uppercase font-medium md:text-left">Portal do</h1>
                        <h1 className="text-[#C9942B] text-center font-bold text-[68px] leading-20 uppercase md:text-left md:max-w-60">Dizimista</h1>
                        <p className="text-base hidden md:block md:text-white md:font-light md:text-justify md:mt-[38px] md:mr-[50px] md:max-w-[550px]">Sistema desenvolvido para a fácil gestão de aniversariantes da Paróquia Matriz Santo Antônio de Pádua - Natal RN e comunidade.</p>
                    </div>
                </section>

                <section className="flex flex-col items-center gap-5 bg-black/35 rounded-[15px] w-[480px] h-[728px] md:mr-[111px]">
                    <h2 className="text-white text-[38px] font-bold">Login</h2>
                    <hr className="h-[1px] w-[300px] bg-white"></hr>
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