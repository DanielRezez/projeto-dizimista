function Header() {
    return(
        <>
            <header className="relative flex justify-around bg-[#A10013] w-full h-[100px] fixed px-4">
                <div className="flex items-end justify-end gap-2 ">
                    <img src="/src/assets/church.svg"></img>
                    <h3 className="hidden lg:block lg:text-center text-white font-bold">PARÓQUIA MATRIZ SANTO ANTÔNIO DE PÁDUA</h3>
                </div>
                <img className="w-40 h-40" src="./src/assets/Logo.png" />
                <nav className="flex items-center gap-10 text-white font-bold md:gap-4">
                    <a className="hidden md:block md:text-center">PÁGINA INICIAL</a>
                    <img className="md:hidden" src="./src/assets/gestão.svg" />
                    <img className="hidden md:block md:text-center" src="./src/assets/cruz.svg" />
                    <a className="hidden md:block md:text-center">GESTÃO DOS DIZIMISTAS</a>
                    <img className="md:hidden" src="./src/assets/perfil.svg" />
                    <img className="hidden md:block md:text-center" src="./src/assets/cruz.svg" />
                    <a className="hidden md:block md:text-center">PERFIL</a>
                </nav>
            </header>
        </>
    )
}

export default Header;