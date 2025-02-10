import Header from "../components/Header";
import Footer from "../components/Footer";
import Breadcrumbs from "../components/Breadcrumb";

function Layout({ children }) {
    return(
        <>
            <div className="flex flex-col min-h-screen">
                <Header />
                <main className=" flex flex-col items-start p-left-50 flex-1 pt-[220px] bg-[#F2EDE2]">
                <Breadcrumbs className="pt-[220px]" />
                    {children}
                </main>
                <Footer />
            </div>
        </>
    )
}

export default Layout;