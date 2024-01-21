import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { LinkIconProps } from "~/shared/types/types";

const LinkIcon = ({
   href, Icon,
   iconStyle = ''
}: LinkIconProps) => {
   return (
      <Link href={ href }>
         <Icon className={ twMerge('w-[1.3rem] h-[1.3rem] mx-auto text-main-typo', iconStyle) } />
      </Link>
   )
}

export default LinkIcon;