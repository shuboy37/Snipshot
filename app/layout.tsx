import type { Metadata } from 'next'
// import { Geist, Geist_Mono } from 'next/font/google'
import { Bricolage_Grotesque } from 'next/font/google'
import Header from '@/components/Header'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from 'sonner'

import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import Providers from '@/provider/Providers'

const bricolage_grotesque_init = Bricolage_Grotesque({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Snipshot',
  description: 'Snapshot your Code Snippet',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${bricolage_grotesque_init.className} min-h-screen overflow-x-hidden bg-gray-100 dark:bg-black`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>
            <Header />
            {children}
            <Toaster />
          </Providers>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
