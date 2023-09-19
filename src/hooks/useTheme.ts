import React, {useState} from "react";

export function useTheme(): [string, React.Dispatch<string>] {
    const selectedTheme = document.documentElement.classList.value = localStorage.getItem('theme') || 'light';
    const [theme, setTheme] = useState(selectedTheme);

    document.documentElement.classList.value = theme;

    if (selectedTheme !== theme) {
        localStorage.setItem('theme', theme);
    }

    return [theme, setTheme];
        
 }