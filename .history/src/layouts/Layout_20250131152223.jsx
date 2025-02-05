import Header from "../components/Header";
import Footer from "../components/Footer";
import '@/css/Layout.css'

function Layout({ children }) {
    return(
        <>
            <body className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-1">
                    {children}
                </main>
                <Footer />
            </body>
        </>
    )
}

export default Layout;