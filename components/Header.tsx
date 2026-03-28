'use client'

import Link from 'next/link'
import { ThemeSwitch } from './theme-switch'

export default function Header() {
  return (
    <header className="fixed top-0 z-50 w-full bg-transparent p-3 backdrop-blur-md sm:p-4">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-2 sm:px-0">
        <div className="flex items-center space-x-2">
          <div className="h-4 w-4 rounded-full bg-linear-to-r from-purple-400 to-pink-600"></div>
          <span className="text-sm font-semibold text-black sm:text-base dark:text-white">
            Snipshot
          </span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-black sm:space-x-4 dark:text-gray-300">
          <ThemeSwitch />
          <div className="hidden items-center space-x-2 sm:flex">
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
