import { twMerge } from "tailwind-merge";
import { ButtonIconProps } from "~/shared/types/types";

const ButtonIcon = ({
   Icon,
   buttonStyle = '',
   iconStyle = '',
   onClick
} : ButtonIconProps) => {

   return (
      <button className={ twMerge('group p-1.5 border border-secondary-typo rounded-md hover:cursor-pointer hover:border-main', buttonStyle) } onClick={ onClick }>
         <Icon className={ twMerge('w-[1.1rem] h-[1.1rem] text-secondary-typo group-hover:text-main', iconStyle) } />
      </button>
   )
}

export default ButtonIcon; 