import Header from "../music-info/components/Header";
import Footer from "../music-info/components/Footer";
import AppRouter from "../music-info/routes/AppRouter";

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
