import React from 'react'
import { Switch } from 'antd'
import { useTheme } from 'hooks/useTheme.ts'

function Toggle() {
    const { isDarkMode, toggleDarkMode } = useTheme()
    return (
        <Switch checked={isDarkMode} onChange={toggleDarkMode} />
    )
}

export default Toggle