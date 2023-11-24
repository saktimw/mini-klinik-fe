import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

// temp
import { BookPlus, LayoutGrid, LogOut, UserSquare, Users2, Wallet2 } from 'lucide-react';
import Image from 'next/image';
import mklogo from '@/assets/img/mk.png';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Mini Klinik',
  applicationName: 'simrs-fastmu',
  authors: [
    { name: 'Sakti Mundra W' },
  ],
  category: "medical",
  description: 'Electronic Clinic Management',
  creator: 'Sakti Mundra W',
  viewport: 'width=device-width, initial-scale=1"', 
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
        {/* sidebar */}
        <div className="lg:h-full sm:w-[3.4rem] md:w-[4.4rem] lg:w-[5.4rem] flex flex-col flex-none py-4 border-r border-r-white-stroke bg-white-card overflow-y-auto overflow-x-hidden scrollbar">
          <div className="flex-none">
            <Image 
              src={ mklogo }
              className="w-[40%] mx-auto"
              alt="logo"
            />
          </div>
          <hr className="flex-none w-1/2 mx-auto my-4 border-white-stroke"/>
          <ul className="grow flex flex-col justify-start">
            <li key="resume" className="my-[0.3rem] py-4 hover:bg-main-lighter border-r-2 border-r-main">
              <Link href="/">
                <BookPlus className="w-[1.3rem] h-[1.3rem] mx-auto text-main"/>
              </Link>
            </li>
            <li key="pasien" className="my-[0.3rem] py-4 hover:bg-main-lighter">
              <Link href="/pasien">
                <Users2 className="w-[1.3rem] h-[1.3rem] mx-auto text-main-typo"/>
              </Link>
            </li>
            <li key="billing" className="my-[0.3rem] py-4 hover:bg-main-lighter">
              <Wallet2 className="w-[1.3rem] h-[1.3rem] mx-auto text-main-typo"/>
            </li>
          </ul>
          {/* menu */}
          <div className="flex-none my-2 mx-auto">
            <div className="p-3 bg-main-lighter rounded-md border border-white-stroke">
              <LayoutGrid className="w-[1.3rem] h-[1.3rem] text-main-typo" />
            </div>
          </div>
          {/* users & settings */}
          <ul className="grow flex flex-col justify-end">
            <li className="my-[0.3rem] py-4 hover:bg-main-lighter">
              <UserSquare className="w-[1.3rem] h-[1.3rem] mx-auto text-main-typo"/>
            </li>
            <li className="my-[0.3rem] py-4 hover:bg-main-lighter">
              <LogOut className="w-[1.3rem] h-[1.3rem] mx-auto text-main-typo"/>
            </li>
          </ul>
        </div>

        {/* content */}
        <div className="lg:max-h-screen lg:h-full sm:w-full lg:w-full lg:flex justify-start p-2 overflow-x-hidden overflow-y-auto scrollbar">
          {children}
            </div>
        </main>
      </body>
    </html>
  )
}
