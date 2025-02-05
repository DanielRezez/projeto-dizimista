import Header from "../components/Header";
import Footer from "../components/Footer";
import '@/css/Layout.css'

function Layout({ children }) {
    return(
        <>
            <div className="flex flex-col">
                <Header />
                <main className="flex-1">
                    {children}
                </main>
                <Footer />
            </div>
        </>
    )
}

export default Layout;