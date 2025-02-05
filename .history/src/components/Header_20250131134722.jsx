function Header() {
    return(
        <>
            <header className="relative flex justify-around bg-[#A10013] w-full h-[100px] fixed">
                <div className="flex items-center gap-2 ">
                    <img src="/src/assets/church.svg"></img>
                    <h3 className="hidden lg:block">PARÓQUIA MATRIZ SANTO ANTÔNIO DE PÁDUA</h3>
                </div>
                <img className="xl:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2 w-[258px]" src="./src/assets/Logo.png" />
                <nav className="flex items-center">
                    <a>PÁGINA INICIAL</a>
                    <img src="./src/assets/cruz.svg" />
                    <a>GESTÃO DOS DIZIMISTAS</a>
                    <img src="./src/assets/cruz.svg" />
                    <a>PERFIL</a>
                </nav>
            </header>
        </>
    )
}

export default Header;