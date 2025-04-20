import React, { useContext } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { ThemeContext } from "../../utils/themeContext";


// Imports the icons from react-bootstrap-icons
import { SunFill, MoonStarsFill, CircleHalf, Check2 } from "react-bootstrap-icons";

export default function ColorMode() {
    const { theme, setTheme } = useContext(ThemeContext);

    const iconMap = {
        light: <SunFill className="me-2" width="1em" height="1em" />,
        dark: <MoonStarsFill className="me-2" width="1em" height="1em" />,
        auto: <CircleHalf className="me-2" width="1em" height="1em" />,
    };

    return (
        <Dropdown className="position-fixed bottom-0 end-0 mb-3 me-3 bd-mode-toggle">
            <Dropdown.Toggle
                id="bd-theme"
                variant="primary"
                className="btn-bd-primary py-2 d-flex align-items-center"
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
                    <button
                        key={value}
                        type="button"
                        className={`dropdown-item d-flex align-items-center ${
                            theme === value ? "active" : ""
                        }`}
                        data-bs-theme-value={value}
                        aria-pressed={theme === value}
                        onClick={() => setTheme(value)}
                    >
                        {iconMap[value]}
                        {value.charAt(0).toUpperCase() + value.slice(1)}
                        <Check2
                            className={`bi ms-auto ${
                                theme === value ? "" : "d-none"
                            }`}
                            width="1em"
                            height="1em"
                        />
                    </button>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    );
}
