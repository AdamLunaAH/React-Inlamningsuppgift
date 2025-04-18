import Footer from "../music-info/components/footer";

import Header from "../music-info/components/header";
import Home from "../music-info/pages/home";
import MusicGroups from "../music-info/pages/musicgroups";

export function Main() {
    return (
        <>
            <Header />
            {/* <Home /> */}
            <MusicGroups />
            <Footer />
        </>
    );
}
