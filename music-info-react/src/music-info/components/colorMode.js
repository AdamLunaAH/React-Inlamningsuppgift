import React, { useContext } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { ThemeContext } from "../../utils/themeContext";

import { ReactComponent as SunIcon } from "../assets/icons/sun-fill.svg";
import { ReactComponent as MoonIcon } from "../assets/icons/moon-stars-fill.svg";
import { ReactComponent as AutoIcon } from "../assets/icons/circle-half.svg";
import { ReactComponent as CheckIcon } from "../assets/icons/check2.svg";

export default function ColorMode() {
    const { theme, setTheme } = useContext(ThemeContext);

    const iconMap = {
        light: <SunIcon className="me-2" width="1em" height="1em" />,
        dark: <MoonIcon className="me-2" width="1em" height="1em" />,
        auto: <AutoIcon className="me-2" width="1em" height="1em" />,

    };

    return (
        <Dropdown className="position-fixed bottom-0 end-0 mb-3 me-3 bd-mode-toggle">
            <Dropdown.Toggle
                id="bd-theme"
                variant={theme === "light" ? "light" : "dark"}
                className={`btn-bd-primary py-2 d-flex align-items-center`}
                aria-label={`Toggle theme (${theme})`}
            >
                <span className="theme-icon-active me-2">{iconMap[theme]}</span>
                <span className="visually-hidden" id="bd-theme-text">
                    Toggle theme
                </span>
            </Dropdown.Toggle>

            <Dropdown.Menu
                className="dropdown-menu-end shadow"
                aria-labelledby="bd-theme-text"
            >
                {["light", "dark", "auto"].map((value) => (
                    <Dropdown.Item
                        key={value}
                        onClick={() => setTheme(value)}
                        active={theme === value}
                        aria-pressed={theme === value}
                        className="d-flex align-items-center"
                    >
                        {iconMap[value]}
                        {value.charAt(0).toUpperCase() + value.slice(1)}
                        {theme === value && (
                            <CheckIcon
                                className="bi my-1"
                                width="1em"
                                height="1em"
                            />
                        )}
                    </Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    );
}
