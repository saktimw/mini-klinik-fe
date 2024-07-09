"use client"
import { MenuLinkProps } from "~/shared/types/types"
import { usePathname } from "next/navigation"
import LinkIcon from "../atoms/LinkIcon";

const MenuLink = ({ keyID, Icon , href, onClick }: MenuLinkProps) => {
   const pathname = usePathname();
   const active = pathname === href;
   return (
      <li key={ keyID } className={`my-[0.3rem] py-4 hover:bg-main-lighter ${active && 'border-r-2 border-r-main'}`} onClick={ onClick }>
         <LinkIcon 
            Icon={ Icon }
            href={ href }
            iconStyle={ active ? 'text-main' : '' }
         />
      </li>
   )
}

export default MenuLink;