

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '@/context/LanguageContext'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SYLWAK INVESTMENT SARL | Engineering & Mining Services',
  description: 'Civil engineering, mining services, industrial solutions in DRC.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
      <LanguageProvider>


    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
      </LanguageProvider>
  )
}