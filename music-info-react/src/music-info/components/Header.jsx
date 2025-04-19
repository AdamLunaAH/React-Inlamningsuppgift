import React, { useContext, useEffect, useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { ThemeContext } from "../../utils/themeContext";
import { NavLink, Link } from "react-router";
import NavMenu from "../routes/NavMenu";

export default function Header() {

    return (
        <header>
            <NavMenu />
        </header>
    );
}
