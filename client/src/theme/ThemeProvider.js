import React, { useState, useEffect } from 'react'
import { ThemeContext } from './ThemeContext'

export const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState()

    useEffect(() => {
        const theme = window.localStorage.getItem('theme')
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
      window.localStorage.setItem('theme', !isDarkMode)
    }

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode}}>
            {children}
        </ThemeContext.Provider>
    )
}