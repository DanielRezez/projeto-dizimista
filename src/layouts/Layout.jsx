// Definição de um layout base para as páginas do projeto

import Header from "../components/Header";
import Footer from "../components/Footer";
import Breadcrumbs from "../components/Breadcrumbs";

// Declaração do componente Layout
function Layout({ children }) { // O parâmetro { children } permite que qualquer conteúdo dentro desse Layout seja renderizado onde o { children } estiver
    return(
        // <>...</> é um Fragment do React, uma forma de agrupar elementos sem criar <div>'s extras.
        <> 
            <div className="flex flex-col min-h-screen">
                <Header />
                <main className=" flex flex-col items-start flex-1 pt-[200px] bg-[#F2EDE2]">
                <Breadcrumbs />
                    {children}
                </main>
                <Footer />
            </div>
        </>
    )
}

export default Layout;