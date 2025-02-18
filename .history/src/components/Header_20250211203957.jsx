import { Link } from "react-router-dom";

function Header() {
    return(
        <>
            <header className="flex items-center justify-around bg-[#A10013] w-full h-[100px] fixed px-4">
                <Link to="/pagina-inicial" className="flex items-center gap-2">
                    <img className="md:pb-6.5" src="/src/assets/church.svg"></img>
                    <h3 className="hidden lg:block lg:text-center text-white font-bold">PARÓQUIA MATRIZ SANTO ANTÔNIO DE PÁDUA</h3>
                </Link>
                <img className="w-40 h-40 relative top-14" src="./src/assets/Logo.png" />
                <nav className="flex items-center gap-10 text-white font-bold md:gap-4">
                    <Link to="/pagina-inicial" className="hidden md:block md:text-center">PÁGINA INICIAL</Link>
                    <img className="md:hidden" src="./src/assets/gestão.svg" />
                    <Link to="/gestao-dizimistas" className="">
                        <img className="hidden md:block md:text-center" src="./src/assets/cruz.svg" />
                    </Link>
                    <Link to="/gestao-dizimistas" className="hidden md:block md:text-center">GESTÃO DE DIZIMISTAS</Link>
                    <img className="md:hidden" src="./src/assets/perfil.svg" />
                    <img className="hidden md:block md:text-center" src="./src/assets/cruz.svg" />
                    <Link to="/perfil" className="hidden md:block md:text-center">PERFIL</Link>
                </nav>
            </header>
        </>
    )
}

export default Header;