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
                    <div className="h-[1px] max-w-4/5 w-[300px] bg-[#FCFEFF]/50 mb-5"></div>
                    <input type="text" className="max-w-4/5 w-[300px] bg-transparent placeholder:text-[#959595] text-white text-sm px-3 py-2 border-white border-b-1 duration-300 ease focus:outline-none focus:bg-white focus:text-black focus:border-white focus:border-1 focus:rounded-sm focus:w-3/5 focus:shadow" placeholder="Digite seu usuário..." />
                    <input type="password" className="max-w-4/5 w-[300px] bg-transparent placeholder:text-[#959595] text-white text-sm px-3 py-2 border-white border-b-1 duration-300 ease focus:outline-none focus:bg-white focus:text-black focus:border-white focus:border-1 focus:rounded-sm focus:w-3/5 focus:shadow" placeholder="Digite seu usuário..." />
                    <p className="my-[12px] text-white text-[12px] font-light">Esqueceu a senha?</p>
                    <button type="submit" className="flex items-center justify-center w-[130px] h-[30px] rounded-sm bg-[#27AE60] mb-[30px]"><img src="./src/assets/confirm.svg" /></button>
                </section>
            </section>

        </>
    );
}

export default Login;