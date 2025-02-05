function Footer() {
    return(
        <>
            <footer className="flex flex-col items-center pt-[15px] px-[10px] bg-[#222222] w-full h-[230px]">
                <h4 className="text-white text-center font-bold text-sm">Dízimo é amor</h4>
                <p className="text-white text-center text-sm max-w-[643px]">Dízimo é amor
                “Amarás o Senhor teu Deus, com todo o teu coração, com toda tua alma e 
                com todo o teu entendimento e amarás o teu próximo como a ti mesmo.  
                Toda a Lei e os Profetas dependem desses dois mandamentos” (Mt  22,37;40).
                </p>
                <div className="flex gap-[40px] max-[360px]:mt-[5px] min-[420px]:mt-[35px]">
                    <img className="max-w-50" src="./src/assets/heart.svg" />
                    <img src="./src/assets/django.svg" />
                </div>
            </footer>
        </>
    )
}

export default Footer;