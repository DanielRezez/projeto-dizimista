function Header() {
    return(
        <>
        <header className="flex flex-betweenbg-blue w-full h-[100px]">
            <h3 className="flex items-center gap-2"><img src="/src/assets/church.svg"></img>PARÓQUIA MATRIZ SANTO ANTÔNIO DE PÁDUA</h3>
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