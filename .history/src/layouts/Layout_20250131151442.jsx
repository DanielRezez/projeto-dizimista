import Header from "../components/Header";
import Footer from "../components/Footer";
import '@/css/Layout.css'

function Layout() {
    return(
        <>
            <body className="h-[1300px]">
                <Header />

                <Footer />
            </body>
        </>
    )
}

export default Layout;