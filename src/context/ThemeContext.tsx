import { createContext, useState } from "react";
import { extendTheme } from "@chakra-ui/react";

interface ThemeContextData {
    theme: Record<string, any>;
    handleChangeThemeProperty: (property: Record<string, any>) => void;
}

interface ThemeProviderProps {
    children: React.ReactNode;
};

export const ThemeContext = createContext<ThemeContextData>(
    {} as ThemeContextData
);

export function ThemeProvider({ children }: ThemeProviderProps) {
    const [theme, setTheme] = useState<Record<string, any>>(
        extendTheme({
            colors: {
                primary: {
                    "500": "#c6270f"
                },
                secondary: {
                    "500": "#c62e31",
                },
                yellow: {
                    "500": "#FDBD28",
                },
                warning: {
                    "500": "#FF6969"
                },
                textColor: "#FFFFFF",
                contrastTextColor: "#000000",
            },
            styles: {
                global: {
                    body: {
                        fontFamily: 'Roboto, sans-serif',
                        margin: 0,
                        padding: 0,
                        border: 0,
                        bg: '#F5F5F5'
                    },
                },
            },
        }));

    const handleChangeThemeProperty = (property: Record<string, any>) => {
        setTheme(prevTheme => {
            return {
                ...prevTheme,
                ...property,
            };
        });
    };

    return (
        <ThemeContext.Provider value={{ theme, handleChangeThemeProperty }}>
            {children}
        </ThemeContext.Provider>
    );
};