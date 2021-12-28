import React, { useState } from 'react'
import { ThemeContext } from './ThemeContext'

export const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false)

    const toggleDarkMode = () => {
      setIsDarkMode(!isDarkMode)
    }

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode}}>
            {children}
        </ThemeContext.Provider>
    )
}