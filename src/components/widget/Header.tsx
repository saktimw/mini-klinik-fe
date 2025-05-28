"use client"
import { getCookie } from "cookies-next"
import { Calendar, User } from "lucide-react"
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { headerMap } from "~/shared/data/header-map";

export default function Header() {
   const pathname = usePathname().split('/').at(1)?.toLowerCase() ?? "home";
   const headerMeta = headerMap[pathname];
   const [ profile, setProfile ]: any = useState({
      nama: "",
      role: "",
   })
   const profileName = getCookie('xnama');
   const profileRole = getCookie('xrole');

   useEffect(() => {
      setProfile({...profile,  nama: profileName, role: profileRole });
   }, [])

   return (
      <div className="sticky top-0 z-50 lg:w-full bg-white-card p-2 px-2.5 flex justify-between shadow-xs">
         <p className="font-semibold text-main text-xl mx-3 capitalize">{ headerMeta.title }
         { headerMeta.subtitle !== null && (
            <span className="text-sm text-secondary-typo font-light"> / { headerMeta.subtitle }</span>
         ) } 
         </p>
         <div className="flex mx-2">
            <div className="flex items-center mx-1.5">
               <Calendar className="w-[1.15rem] h-[1.15rem] mx-2.5 text-main"/>
               <span className="text-secondary-typo">{ new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }) }</span>
            </div>
            <div className="flex items-center mx-1.5">
               <User className="w-[1.15rem] h-[1.15rem] mx-2.5 text-main"/>
               <span className="text-secondary-typo font-light">{ profile?.nama } ( { profile?.role } )</span>
            </div>
         </div>
      </div>
   )
}