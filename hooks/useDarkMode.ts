'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export const useDarkMode = () => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDarkMode = mounted ? theme === 'dark' : false
  const toggleDarkMode = () => setTheme(isDarkMode ? 'light' : 'dark')

  return { isDarkMode, toggleDarkMode }
}
