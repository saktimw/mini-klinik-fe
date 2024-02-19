"use client"
import { BookPlus, Home, LogOut, UserSquare, Users2, Wallet2 } from 'lucide-react';
import Image from 'next/image';
import mklogo from '~/assets/img/logo.png';
import MenuLink from '../common/MenuLink';
import LinkIcon from '../atoms/LinkIcon';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
   const pathname = usePathname();
   return (
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
         <MenuLink keyID="resume" href="/pemeriksaan"
            Icon={ BookPlus }
         />
         <MenuLink keyID="pasien" href="/pasien"
            Icon={ Users2 }
         />
         <MenuLink keyID="billing" href="/billing"
            Icon={ Wallet2 }
         />
         </ul>
         {/* menu */}
         <div className="flex-none my-2 mx-auto">
            <div className={`p-3 bg-main-lighter rounded-md border ${pathname === "/home" ? "border-main" : "border-white-stroke"}`}>
               <LinkIcon href="/home" Icon={ Home } />
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
   )
}