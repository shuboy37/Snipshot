'use client'

import CodeEditor from '@/components/CodeEditor'
import Dock from '@/components/Dock'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start px-2 pb-24 sm:px-4">
      <CodeEditor />
      <Dock />
    </main>
  )
}
