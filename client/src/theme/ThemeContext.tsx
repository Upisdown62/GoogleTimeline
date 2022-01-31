import { createContext  } from "react"
import { MTheme } from 'model/index'


const defaultTheme: MTheme = {
    isDarkMode: true,
    toggleDarkMode: () => {}
}
export const ThemeContext = createContext<MTheme>(defaultTheme)
