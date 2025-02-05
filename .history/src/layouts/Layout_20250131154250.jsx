import Header from "../components/Header";
import Footer from "../components/Footer";
import '@/css/Layout.css'

function Layout({ children }) {
    return(
        <>
            <div className="flex flex-col min-h-screen">
                <Header />
                <main className="grow flex-1 flex items-center justify-center">
                    {children}
                </main>
                <Footer />
            </div>
        </>
    )
}

export default Layout;