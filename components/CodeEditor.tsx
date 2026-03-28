'use client'

import React, { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { useGradient } from '@/hooks/useGradient'
import { useTheme } from '@/hooks/useTheme'
import { useLanguage } from '@/hooks/useLanguage'
import { useFontSize } from '@/hooks/useFontSize'
import { useBackground } from '@/hooks/useBackground'
import { useCodePreview } from '@/hooks/useCodePreview'
import { Textarea } from './ui/textarea'

export default function CodeEditor() {
  const [code, setCode] = useState<string>('')
  const [isMobile, setIsMobile] = useState(false)
  const { gradient } = useGradient()
  const { theme } = useTheme()
  const { language } = useLanguage()
  const { fontSize } = useFontSize()
  const { isBackgroundHidden } = useBackground()
  const { setPreviewRef } = useCodePreview()

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <div className="mt-16 mb-8 flex w-full flex-col items-center justify-center gap-4 pb-4 max-sm:px-2 sm:mt-20 sm:gap-6 dark:text-white">
      <div className="w-full max-w-lg space-y-4 px-4 sm:px-0">
        <Textarea
          className="bg-opacity-10 h-32 w-full rounded-md border bg-white p-3 text-sm text-black backdrop-blur-lg sm:h-40 sm:p-4 dark:border-white/20 dark:text-white dark:shadow-none"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Paste your code here..."
        />
      </div>

      <div
        ref={setPreviewRef}
        className={`w-fit rounded-lg min-w-[20vw] px-4 py-4 shadow-lg max-sm:w-[95vw] sm:px-10 sm:py-8 ${
          isBackgroundHidden ? 'bg-none shadow-none' : ''
        }`}
        style={{ background: isBackgroundHidden ? 'transparent' : gradient }}
      >
        <div className="relative">
          <div className="absolute top-2 left-2 z-10 mt-1 sm:left-3 sm:space-x-2">
            <span className="size-2 rounded-full bg-red-500 sm:h-2.25 sm:w-2.25"></span>
            <span className="size-2 rounded-full bg-yellow-500 sm:h-2.25 sm:w-2.25"></span>
            <span className="size-2 rounded-full bg-green-500 sm:h-2.25 sm:w-2.25"></span>
          </div>

          <SyntaxHighlighter
            language={language}
            style={typeof theme === 'string' ? coldarkDark : theme}
            customStyle={{
              fontSize: `${fontSize}px`,
              borderRadius: '8px',
              padding: isMobile ? '35px 20px 20px 10px' : '45px 35px 30px 10px',
              boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.4), 0 6px 20px 0 rgba(0, 0, 0, 0.4)',
              overflow: 'hidden',
              opacity: 0.85,
            }}
            wrapLongLines
            showLineNumbers
          >
            {code ||
              `import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}`}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  )
}
