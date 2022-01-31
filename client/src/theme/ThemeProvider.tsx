import React, { useState, useEffect } from 'react'
import { ThemeContext } from './ThemeContext'

interface IProps {
    children: React.ReactNode | React.ReactNode[]
}

export const ThemeProvider: React.FC<IProps> = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(true)

    useEffect(() => {
        const theme: string | null = window.localStorage.getItem('theme')
        if(theme === undefined){
            setIsDarkMode(true)
        } else if(theme === 'true') {
            setIsDarkMode(true)
        } else {
            setIsDarkMode(false)
        }
    }, [])

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode)
        const tobeMode: string = isDarkMode ? 'false' : 'true'
        window.localStorage.setItem('theme', tobeMode)
    }

    return (
        <ThemeContext.Provider value={{ isDarkMode: isDarkMode, toggleDarkMode: toggleDarkMode}}>
            {children}
        </ThemeContext.Provider>
    )
}