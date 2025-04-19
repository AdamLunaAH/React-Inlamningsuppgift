import Header from "../music-info/components/header";
import Footer from "../music-info/components/footer";
import AppRouter from "../music-info/routes/approuter";

export function Main() {
    return (
        <>
            {/* Page header */}
            <Header />
            {/* Switches main page content/page depending on current route*/}
            <AppRouter />
            {/* Page footer */}
            <Footer />
        </>
    );
}
