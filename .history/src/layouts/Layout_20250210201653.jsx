import Header from "../components/Header";
import Footer from "../components/Footer";
import Breadcrumbs from "../components/Breadcrumb";

function Layout({ children }) {
    return(
        <>
            <div className="flex flex-col min-h-screen">
                <Header />
                <Breadcrumbs />
                <main className=" flex justify-start flex-1 pt-[220px] bg-[#F2EDE2]">
                    {children}
                </main>
                <Footer />
            </div>
        </>
    )
}

export default Layout;