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
import { useDarkMode } from '@/hooks/useDarkMode'
import { toast } from 'sonner'

export default function Dock() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [cloudLink] = useState<string>('')
  const [isCopied, setIsCopied] = useState(false)
  const { gradient, setGradient } = useGradient()
  const { setTheme } = useTheme()
  const { setLanguage } = useLanguage()
  const { fontSize, setFontSize } = useFontSize()
  const { isBackgroundHidden, setIsBackgroundHidden } = useBackground()
  const { getPreviewRef } = useCodePreview()
  const { isDarkMode, toggleDarkMode } = useDarkMode()

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
    <section className="fixed bottom-0 z-50 flex w-full justify-center max-sm:overflow-x-auto">
      <div className="flex w-fit min-w-[40vw] justify-center max-sm:w-full max-sm:min-w-full max-sm:justify-start">
        <div className="bg-opacity-90 dark:bg-opacity-95 flex h-20 items-center rounded-t-xl border border-gray-200 bg-white px-10 text-black shadow-lg backdrop-blur-lg dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:shadow-none">
          <PopupDialog
            setIsCopied={setIsCopied}
            isCopied={isCopied}
            cloudLink={cloudLink}
            isDialogOpen={isDialogOpen}
            setIsDialogOpen={setIsDialogOpen}
          />
          <div className="flex items-center gap-12 max-sm:gap-6">
            <div className="space-y-1">
              <Label className="text-xs text-gray-700 dark:text-gray-300" htmlFor="gradient">
                Gradient
              </Label>
              <Select
                onValueChange={(value: string) => {
                  console.log('Gradient changed to:', value)
                  setGradient(value)
                }}
              >
                <SelectTrigger className="flex h-6 w-16 items-center justify-center space-x-2 border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-700">
                  <div className="h-4 w-4 rounded-full" style={{ background: gradient }}></div>
                </SelectTrigger>
                <SelectContent className="z-[9999] w-48 border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
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
            <div className="space-y-1">
              <Label className="text-xs text-gray-700 dark:text-gray-300" htmlFor="theme">
                Theme
              </Label>
              <Select
                onValueChange={(value: string) => {
                  setTheme(themes[value])
                }}
              >
                <SelectTrigger className="h-6 w-28 border-gray-300 bg-white text-center text-xs dark:border-gray-600 dark:bg-gray-700">
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
            <div className="space-y-1">
              <Label className="text-xs text-gray-700 dark:text-gray-300" htmlFor="language">
                Language
              </Label>
              <Select
                onValueChange={(value: string) => {
                  setLanguage(value)
                }}
              >
                <SelectTrigger className="h-6 w-[100px] border-gray-300 bg-white text-xs dark:border-gray-600 dark:bg-gray-700">
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
                  <SelectItem value="bash">C++</SelectItem>
                  <SelectItem value="c++">Bash</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-gray-700 dark:text-gray-300" htmlFor="fontSize">
                Font Size
              </Label>
              <Input
                type="number"
                value={fontSize}
                onChange={(e) => setFontSize(parseInt(e.target.value, 10) || 16)}
                className="font-xs h-6 w-16 border-gray-300 bg-white text-center dark:border-gray-600 dark:bg-gray-700"
              />
            </div>
            <div className="flex flex-col justify-end space-y-1">
              <Label className="text-xs text-gray-700 dark:text-gray-300">Export</Label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="h-6 border-gray-300 bg-white px-3 py-1 text-xs dark:border-gray-600 dark:bg-gray-700"
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
            <div className="flex flex-col space-y-1">
              <Label className="text-xs text-gray-700 dark:text-gray-300" htmlFor="darkMode">
                Remove BG
              </Label>
              <Switch
                checked={isBackgroundHidden}
                onCheckedChange={setIsBackgroundHidden}
                className="dark:data-[state=checked]:bg-blue-500"
              />
            </div>
            <div className="flex flex-col space-y-1">
              <Label className="text-xs text-gray-700 dark:text-gray-300" htmlFor="darkMode">
                Dark Mode
              </Label>
              <Switch
                checked={isDarkMode}
                onCheckedChange={toggleDarkMode}
                className="data-[state=checked]:bg-blue-500"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
