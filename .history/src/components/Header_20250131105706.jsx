function Header() {
    return(
        <>
        <header className="bg-blue w-full h-[100px]">
            <h3 className="flex items-center gap-2"><img src="/src/assets/church.svg"></img>PARÓQUIA MATRIZ SANTO ANTÔNIO DE PÁDUA</h3>
            <img src="./src/assets/Logo.png" />
            <nav>
                <a>PÁGINA INICIAL</a>
                <a>GESTÃO DOS DIZIMISTAS</a>
                <a>PERFIL</a>
            </nav>
        </header>
    </>
    )
}

export default Header;