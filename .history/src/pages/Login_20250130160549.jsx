import '@/css/Login.css'

function Login() {
    return (
        <>
            <section className="@container bg-[url('src/assets/Background-login.jpg')] bg-cover h-full min-h-screen flex flex-col items-center justify-start md:items-center md:justify-center md:bg-contain md:flex-row">
                <section className="flex flex-col items-center md:gap-5 md:flex-row md:items-start">
                    <div className="">
                        <div className="xl:h-[728px] lg:w-[2px] lg:bg-white lg:absolute lg:top-[50%] translate-y-[-50%] lg:left-20"></div>
                        <img className="w-60 md:w-[553px] md:min-w-[350px] lg:relative" src="./src/assets/Logo.png"/>
                    </div>
                    {/*image-space*/}
                    <div className="">
                        <h1 className="text-white text-center text-[20px] lg:text-[38px] uppercase font-medium md:text-left xl:block md:hidden">Portal do</h1>
                        <h1 className="text-[#C9942B] text-center font-bold text-[32px] lg:text-[68px] leading-20 uppercase xl:block md:hidden lg:text-left">Dizimista</h1>
                        <p className="text-base text-justify text-white font-light hidden xl:block lg:mt-[38px] lg:mr-[50px] lg:max-w-[550px]">Sistema desenvolvido para a fácil gestão de aniversariantes da Paróquia Matriz Santo Antônio de Pádua - Natal RN e comunidade.</p>
                    </div>
                </section>

                <section className="flex flex-col items-center gap-5 bg-black/35 rounded-[15px] pt-[105px] mt-10 md:h-[728px] md:w-[480px] md:mr-[111px]">
                    <h2 className="text-white text-[38px] font-bold">Login</h2>
                    <div className="h-[1px] max-w-4/5 w-[300px] bg-[#FCFEFF]/50"></div>
                    <input class="w-4/5 bg-white placeholder:text-[#959595] text-black text-sm border-white border-1 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:bg-transparent focus:border-yellow focus:shadow" placeholder="Digite seu usuário..." />
                    <input placeholder="Digite seu usuário" />
                    <p>Esqueceu a senha?</p>
                    <button type="submit"></button>
                </section>
            </section>

        </>
    );
}

export default Login;