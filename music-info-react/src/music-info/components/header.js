import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";

export default function Header() {
    return (
        <>
            {/* <!-- Header with hamburger menu on small screens --> */}
            <header>
                <Navbar bg="dark" variant="dark" expand="lg">
                    <Container>
                        <Navbar.Brand href="#">Music info</Navbar.Brand>
                        <Navbar.Toggle aria-controls="navbarHead" />
                        <Navbar.Collapse id="navbarHead">
                            <Nav className="me-auto">
                                <Nav.Link href="./index.html" active>
                                    Home
                                </Nav.Link>
                                <Nav.Link href="./musicgroups.html">
                                    Music groups
                                </Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </header>
        </>
    );
}
