function Header() {
    return(
        <>
        <header className="flex justify-around bg-black w-full h-30">
            <div className="flex items-center gap-2 ">
                <img src="/src/assets/church.svg"></img>
                <h3 className="hidden lg:block">PARÓQUIA MATRIZ SANTO ANTÔNIO DE PÁDUA</h3>
            </div>
            <img src="./src/assets/Logo.png" />
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