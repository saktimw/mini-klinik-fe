import { twMerge } from "tailwind-merge";
import { ButtonLoadingProps } from "~/shared/types/types";

const ButtonLoading = ({
   Icon, onClick,
   title = "Button",
   loading = false,
   buttonStyle = '',
   submit = false
}: ButtonLoadingProps) => {
   return (
      <>
         <button type={ submit ? 'submit' : 'button' } className={  twMerge('base-button-icon', buttonStyle) } onClick={ onClick }>
            { loading 
               ? <span className="loading loading-dots"></span>
               : <>{ Icon && <Icon className="button-icon"/> } <span>{ title }</span></>
            }
            
         </button>
      </>
   );
}

export default ButtonLoading;