import './global.css'
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
import { ThemeProvider } from "@/components/theme-provider"

export const metadata = {
  title: 'Tryna Auth:U',
  description: 'Tryna Auth:U',
}


export default function RootLayout({ children }) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            {children}
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}
