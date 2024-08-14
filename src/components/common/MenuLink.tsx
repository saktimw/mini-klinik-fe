"use client"
import { MenuLinkProps } from "~/shared/types/types"
import { usePathname } from "next/navigation"
import LinkIcon from "../atoms/LinkIcon";

const MenuLink = ({ keyID, Icon , href, onClick, title }: MenuLinkProps) => {
   const pathname = usePathname();
   const active = pathname === href;
   return (
      <li key={ keyID } className={`my-[0.3rem] py-4 hover:bg-main-lighter hover:cursor-pointer ${active && 'border-r-2 border-r-main'}`} onClick={ onClick }>
         <LinkIcon 
            Icon={ Icon }
            href={ href }
            iconStyle={ active ? 'text-main' : '' }
         />
         <p className={`text-center text-[0.65rem] tracking-wide font-medium pt-1 hover:bg-main-lighter ${ active && "text-main" }`}>{ title }</p>
      </li>
   )
}

export default MenuLink;