'use client'

import Link from 'next/link'
import { ThemeSwitch } from './theme-switch'

export default function Header() {
  return (
    <header className="fixed top-0 z-50 w-full bg-transparent p-4 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="h-4 w-4 rounded-full bg-gradient-to-r from-purple-400 to-pink-600"></div>
          <span className="font-semibold text-black dark:text-white">Snipshot</span>
        </div>
        <div className="flex items-center space-x-4 text-sm text-black dark:text-gray-300">
          <ThemeSwitch />
          <div className="flex items-center space-x-2">
            <p>Made with ❤️ by</p>
            <Link
              href={'https://x.com/shuboi37'}
              target="_blank"
              className="text-black transition-colors hover:text-purple-400 dark:text-white"
            >
              shuboi37
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}
