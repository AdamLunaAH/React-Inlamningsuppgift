import React, { createContext, useEffect, useState } from "react";

// Create a context to hold theme and updater
export const ThemeContext = createContext();

export const ThemeUtil = ({ children }) => {
    // Load theme from localStorage or use system preference
    const getStoredTheme = () => localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
    ).matches;

    // Choose initial theme
    const getInitialTheme = () => {
        const storedTheme = getStoredTheme();
        return storedTheme || (prefersDark ? "dark" : "light");
    };

    const [theme, setTheme] = useState(getInitialTheme);

    // Apply theme and update <html> attribute in public/index.html
    const applyTheme = React.useCallback((newTheme) => {
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);

        let effectiveTheme =
            newTheme === "auto" ? (prefersDark ? "dark" : "light") : newTheme;
        document.documentElement.setAttribute("data-bs-theme", effectiveTheme);
    }, [prefersDark]);

    useEffect(() => {
        // Apply the theme when it changes
        applyTheme(theme);
    }, [theme, applyTheme]);

    useEffect(() => {
        // Check for system preference changes if in auto theme selection
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
