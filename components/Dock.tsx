'use client'

import { useGradient } from '@/hooks/useGradient'
import { Select, SelectValue, SelectContent, SelectItem, SelectTrigger } from './ui/select'
import { gradientArray } from '@/constants/gradient'
import { themes } from '@/lib/theme'
import { useTheme } from '@/hooks/useTheme'
import { useLanguage } from '@/hooks/useLanguage'
import { Input } from './ui/input'
import { useFontSize } from '@/hooks/useFontSize'
import { Label } from './ui/label'
import { Switch } from '@/components/ui/switch'
import { useBackground } from '@/hooks/useBackground'
import exportAsImage from '@/utils/exportAsImage'
import copyAsImage from '@/utils/copyAsImage'
import { useCodePreview } from '@/hooks/useCodePreview'
import PopupDialog from './PopupDialog'
import { useState } from 'react'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { toast } from 'sonner'
import { Settings2, X } from 'lucide-react'

export default function Dock() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [cloudLink] = useState<string>('')
  const [isCopied, setIsCopied] = useState(false)
  const { gradient, setGradient } = useGradient()
  const { setTheme } = useTheme()
  const { setLanguage } = useLanguage()
  const { fontSize, setFontSize } = useFontSize()
  const { isBackgroundHidden, setIsBackgroundHidden } = useBackground()
  const { getPreviewRef } = useCodePreview()

  const handleExportImage = () => {
    const node = getPreviewRef()
    if (node) {
      exportAsImage(node)
    }
  }

  // const handleUploadToCloud = async () => {
  //     const node = getPreviewRef();
  //     if (node) {
  //         try {
  //             const url = await uploadToCloud(node);
  //             setCloudLink(url);
  //             setIsDialogOpen(true);
  //         } catch (err) {
  //             console.error("Upload failed:", err);
  //         }
  //     }
  // };

  const handleCopyImage = async () => {
    const node = getPreviewRef()
    if (node) {
      try { 
        await copyAsImage(node)
        setIsCopied(true)
        toast.success('Image copied to clipboard')
        setTimeout(() => setIsCopied(false), 1500)
      } catch {
        console.log('failed to copy image')
      }
    }
  }

  return (
    <section className="pointer-events-none fixed right-4 bottom-4 z-50 flex flex-col items-end sm:right-0 sm:bottom-6 sm:left-0 sm:items-center sm:justify-center">
      {/* Mobile Toggle Button */}
      <div className="pointer-events-auto mb-4 sm:hidden">
        <Button
          size="icon"
          className="h-12 w-12 rounded-full shadow-lg"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Settings2 className="h-6 w-6" />}
        </Button>
      </div>

      <div
        className={`pointer-events-auto max-w-full rounded-2xl border border-gray-200 bg-white/90 shadow-lg backdrop-blur-lg transition-all duration-200 ease-in-out dark:border-gray-700 dark:bg-gray-800/95 ${
          isMobileMenuOpen
            ? 'translate-y-0 scale-100 opacity-100'
            : 'pointer-events-none h-0 translate-y-4 scale-95 overflow-hidden opacity-0 sm:pointer-events-auto sm:h-auto sm:translate-y-0 sm:scale-100 sm:overflow-visible sm:opacity-100'
        }`}
      >
        <div className="flex flex-col p-4 sm:h-20 sm:flex-row sm:items-center sm:px-6 sm:py-0 md:px-10">
          <PopupDialog
            setIsCopied={setIsCopied}
            isCopied={isCopied}
            cloudLink={cloudLink}
            isDialogOpen={isDialogOpen}
            setIsDialogOpen={setIsDialogOpen}
          />
          <div className="flex flex-col items-end gap-4 sm:flex-row sm:items-center sm:gap-4 md:gap-6 lg:gap-8">
            <div className="flex items-center gap-3 sm:block sm:space-y-1">
              <Label
                className="text-xs text-gray-700 sm:text-xs sm:text-[10px] dark:text-gray-300"
                htmlFor="gradient"
              >
                Gradient
              </Label>
              <Select
                onValueChange={(value: string) => {
                  console.log('Gradient changed to:', value)
                  setGradient(value)
                }}
              >
                <SelectTrigger className="flex h-8 w-24 items-center justify-center space-x-2 border-gray-300 bg-white sm:h-6 sm:w-16 sm:space-x-2 dark:border-gray-600 dark:bg-gray-700">
                  <div
                    className="h-4 w-4 rounded-full sm:h-4 sm:w-4"
                    style={{ background: gradient }}
                  ></div>
                </SelectTrigger>
                <SelectContent className="z-9999 w-48 border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                  {gradientArray.map((item: { name: string; gradient: string }, index: number) => (
                    <SelectItem key={index} value={item.gradient}>
                      <div className="flex items-center gap-2">
                        <div
                          className="h-5 w-5 shrink-0 rounded-full"
                          style={{ background: item.gradient }}
                        ></div>
                        <span className="text-xs">{item.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-3 sm:block sm:space-y-1">
              <Label
                className="text-xs text-gray-700 sm:text-xs sm:text-[10px] dark:text-gray-300"
                htmlFor="theme"
              >
                Theme
              </Label>
              <Select
                onValueChange={(value: string) => {
                  setTheme(themes[value])
                }}
              >
                <SelectTrigger className="h-8 w-32 border-gray-300 bg-white text-center text-xs sm:h-6 sm:w-28 sm:text-xs dark:border-gray-600 dark:bg-gray-700">
                  <SelectValue placeholder="ColdarkDark" className="text-center" />
                </SelectTrigger>
                <SelectContent className="border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                  {Object.keys(themes).map((themeName) => (
                    <SelectItem key={themeName} value={themeName}>
                      {themeName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-3 sm:block sm:space-y-1">
              <Label
                className="text-xs text-gray-700 sm:text-xs sm:text-[10px] dark:text-gray-300"
                htmlFor="language"
              >
                Language
              </Label>
              <Select
                onValueChange={(value: string) => {
                  setLanguage(value)
                }}
              >
                <SelectTrigger className="h-8 w-28 border-gray-300 bg-white text-xs sm:h-6 sm:w-25 sm:text-xs dark:border-gray-600 dark:bg-gray-700">
                  <SelectValue placeholder="JavaScript" />
                </SelectTrigger>
                <SelectContent className="border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                  <SelectItem value="javascript">JavaScript</SelectItem>
                  <SelectItem value="python">Python</SelectItem>
                  <SelectItem value="html">HTML</SelectItem>
                  <SelectItem value="css">CSS</SelectItem>
                  <SelectItem value="java">Java</SelectItem>
                  <SelectItem value="rust">Rust</SelectItem>
                  <SelectItem value="go">Go</SelectItem>
                  <SelectItem value="c++">C++</SelectItem>
                  <SelectItem value="bash">Bash</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-3 sm:block sm:space-y-1">
              <Label
                className="text-xs text-gray-700 sm:text-xs sm:text-[10px] dark:text-gray-300"
                htmlFor="fontSize"
              >
                Font Size
              </Label>
              <Input
                type="number"
                value={fontSize}
                onChange={(e) => setFontSize(parseInt(e.target.value, 10) || 16)}
                className="font-xs h-8 w-16 border-gray-300 bg-white text-center text-xs sm:h-6 sm:w-16 sm:text-xs dark:border-gray-600 dark:bg-gray-700"
              />
            </div>
            <div className="flex items-center gap-3 sm:flex-col sm:justify-end sm:gap-0 sm:space-y-1">
              <Label className="text-xs text-gray-700 sm:text-xs sm:text-[10px] dark:text-gray-300">
                Export
              </Label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="h-8 border-gray-300 bg-white px-4 py-1 text-xs sm:h-6 sm:px-3 sm:text-xs dark:border-gray-600 dark:bg-gray-700"
                  >
                    Export
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                  <DropdownMenuItem onClick={handleExportImage}>Download Image</DropdownMenuItem>
                  <DropdownMenuItem onClick={handleCopyImage}>Copy Image</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="flex items-center gap-3 sm:flex-col sm:gap-0 sm:space-y-1">
              <Label
                className="text-xs text-gray-700 sm:text-xs sm:text-[10px] dark:text-gray-300"
                htmlFor="darkMode"
              >
                <span className="sm:hidden">Remove BG</span>
                <span className="hidden sm:inline">BG</span>
              </Label>
              <Switch
                checked={!isBackgroundHidden}
                onCheckedChange={(checked) => setIsBackgroundHidden(!checked)}
                className="dark:data-[state=checked]:bg-blue-500"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
