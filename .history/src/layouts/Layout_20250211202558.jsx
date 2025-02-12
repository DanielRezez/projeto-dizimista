import Header from "../components/Header";
import Footer from "../components/Footer";
import Breadcrumbs from "../components/Breadcrumbs";

function Layout({ children }) {
    return(
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