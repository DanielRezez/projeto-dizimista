function Footer() {
    return(
        <>
            <footer className="print:hidden flex flex-col items-center justify-center px-[10px] py-[30px] bg-[#222222] w-full h-auto">
                <h4 className="text-white text-center font-bold text-sm">Dízimo é amor</h4>
                <p className="text-white text-center text-sm max-w-[643px]">Dízimo é amor
                “Amarás o Senhor teu Deus, com todo o teu coração, com toda tua alma e 
                com todo o teu entendimento e amarás o teu próximo como a ti mesmo.  
                Toda a Lei e os Profetas dependem desses dois mandamentos” (Mt  22, 37;40).
                </p>
                <div className="flex justify-center items-center gap-[20px] max-[360px]:mt-[5px] min-[460px]:mt-[35px]">
                    <img className="max-w-15" src="./src/assets/heart.svg" />
                    <img className="max-w-15" src="./src/assets/Brasão.png" />
                </div>
            </footer>
        </>
    )
}

export default Footer;