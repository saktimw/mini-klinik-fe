import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '~/assets/styles/base.css';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Mini Klinik Application',
    template: 'Mini Klinik',
  },
  applicationName: 'mini-klinik',
  authors: [
    { name: 'Mini Klinik Programmer' },
  ],
  category: "medical",
  description: 'Electronic Clinic Management',
  creator: 'Sakti Mundra W, Noor Qomaruddin',
  viewport: 'width=device-width, initial-scale=1', 
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-base-background`}>
        <main className="lg:max-h-screen lg:h-screen lg:w-full flex flex-nowrap items-start">
          {children}
        </main>
      </body>
    </html>
  )
}
