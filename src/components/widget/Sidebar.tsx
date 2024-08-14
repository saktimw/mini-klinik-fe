"use client"
import { BookPlus, Home, LogOut, UserSquare, Users2, Wallet2 } from 'lucide-react';
import Image from 'next/image';
import mklogo from '~/assets/img/logo.png';
import MenuLink from '../common/MenuLink';
import LinkIcon from '../atoms/LinkIcon';
import { usePathname, useRouter } from 'next/navigation';
import ButtonWithConfirm from '../common/ButtonWithConfirm';
import { LogoutAction } from '~/controllers/auth';
import { getCookie } from 'cookies-next';
import { useEffect, useState } from 'react';

export default function Sidebar() {
   const pathname = usePathname();
   const router = useRouter();
   const role: any = getCookie('xrole')
   
   const [myrole, setMyrole] = useState("")

   useEffect(() => {
      setMyrole(role);
   }, [])
   
   return (
      <div className="lg:h-full sm:w-[4.6rem] md:w-[5.6rem] lg:w-[6.6rem] flex flex-col flex-none py-4 border-r border-r-white-stroke bg-white-card overflow-y-auto overflow-x-hidden scrollbar">
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
               title="pemeriksaan"
               Icon={ BookPlus }
            />
            <MenuLink keyID="pasien" href="/pasien"
               title="pasien"
               Icon={ Users2 }
            />
            { myrole === "dokter" && (
               <MenuLink keyID="billing" href="/billing"
                  title="billing"
                  Icon={ Wallet2 }
               />
            )}
         </ul>
         {/* menu */}
         <div className="flex-none my-2 mx-auto">
            <div className={`p-3 bg-main-lighter rounded-md border ${pathname === "/home" ? "border-main" : "border-white-stroke"}`}>
               <LinkIcon href="/home" Icon={ Home } />
            </div>
         </div>
         {/* users & settings */}
         <ul className="grow flex flex-col justify-end">
            <li className="my-[0.3rem] py-4 hover:bg-main-lighter hover:cursor-pointer">
               <ButtonWithConfirm
                  title="Kunjungan"
                  message={`Keluar dari aplikasi ?`}
                  action={ (act) => act && LogoutAction(router)} 
               >
                  <LogOut className="w-[1.3rem] h-[1.3rem] mx-auto text-main-typo"/>
               </ButtonWithConfirm>
            </li>
         </ul>
      </div>
   )
}