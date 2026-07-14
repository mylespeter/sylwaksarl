// import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";
// import Navigation from "@/components/Navigation";
// import { AuthProvider } from "@/context/AuthContext";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export const metadata: Metadata = {
//   title: "PharmaTrace",
//   description: "Traçabilité pharmaceutique",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="fr">
//       <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
//         <AuthProvider>
//           <main>{children}</main>
//         </AuthProvider>
//       </body>
//     </html>
//   );
// }


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