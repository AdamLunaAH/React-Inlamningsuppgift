import React, { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

export const ThemeUtil = ({ children }) => {
    const getStoredTheme = () => localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
    ).matches;

    const getInitialTheme = () => {
        const storedTheme = getStoredTheme();
        return storedTheme || (prefersDark ? "dark" : "light");
    };

    const [theme, setTheme] = useState(getInitialTheme);

    const applyTheme = (newTheme) => {
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);

        let effectiveTheme =
            newTheme === "auto" ? (prefersDark ? "dark" : "light") : newTheme;
        document.documentElement.setAttribute("data-bs-theme", effectiveTheme);
    };

    useEffect(() => {
        applyTheme(theme);
    }, [theme]);

    useEffect(() => {
        const listener = (e) => {
            if (theme === "auto") {
                const newTheme = e.matches ? "dark" : "light";
                document.documentElement.setAttribute(
                    "data-bs-theme",
                    newTheme
                );
            }
        };

        window
            .matchMedia("(prefers-color-scheme: dark)")
            .addEventListener("change", listener);
        return () =>
            window
                .matchMedia("(prefers-color-scheme: dark)")
                .removeEventListener("change", listener);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
