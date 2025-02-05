function Header() {
    return(
        <>
            <header className="relative flex justify-around bg-[#A10013] w-full h-[100px] fixed">
                <div className="flex items-center gap-2 ">
                    <img src="/src/assets/church.svg"></img>
                    <h3 className="hidden lg:block">PARÓQUIA MATRIZ SANTO ANTÔNIO DE PÁDUA</h3>
                </div>
                <img className="absolute left-1/2 transform -translate-x-1/2" src="./src/assets/Logo.png" />
                <nav>
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