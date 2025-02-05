import Header from "../components/Header";
import Footer from "../components/Footer";

function Layout({ children }) {
    return(
        <>
            <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-1 pt-[220px] bg-[blue] ">
                    {children}
                </main>
                <Footer />
            </div>
        </>
    )
}

export default Layout;