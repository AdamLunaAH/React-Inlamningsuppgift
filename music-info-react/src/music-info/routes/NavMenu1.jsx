import React, { useContext, useEffect, useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { ThemeContext } from "../../utils/themeContext";
import { NavLink, Link } from "react-router";

export default function NavMenu() {
    // Get current theme
    const { theme } = useContext(ThemeContext);
    // Default fallback color
    const [headerBg, setHeaderBg] = useState("dark");
    useEffect(() => {
        // Detect system preference
        const prefersDark = window.matchMedia(
            "(prefers-color-scheme: dark)"
        ).matches;

        // Chooses effective theme
        const getEffectiveTheme = () => {
            if (theme === "auto") {
                return prefersDark ? "dark" : "light";
            }
            return theme;
        };

        // Invert theme for navbar background
        const effectiveTheme = getEffectiveTheme();
        const inverseBg = effectiveTheme === "dark" ? "light" : "dark";
        setHeaderBg(inverseBg);
    }, [theme]);

    return (

            <Navbar bg={headerBg} variant={headerBg} expand="lg">
                <Container>
                    <Navbar.Brand as={Link} to="/">
                        Music info
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarHead" />
                    <Navbar.Collapse id="navbarHead">
                        <Nav className="me-auto">
                            <Nav.Link as={NavLink} to="/" end>
                                Home
                            </Nav.Link>
                            <Nav.Link as={NavLink} to="/musicgroups">
                                Music groups
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

    );
}
