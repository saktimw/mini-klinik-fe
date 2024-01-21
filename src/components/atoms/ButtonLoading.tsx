import { twMerge } from "tailwind-merge";
import { ButtonLoadingProps } from "~/shared/types/types";

const ButtonLoading = ({
   Icon,
   title = "Button",
   loading = false,
   buttonStyle = ''
}: ButtonLoadingProps) => {
   return (
      <>
         <button className={  twMerge('base-button-icon', buttonStyle) }>
            { loading 
               ? <span className="loading loading-dots"></span>
               : <>{ Icon && <Icon className="button-icon"/> } <span>{ title }</span></>
            }
            
         </button>
      </>
   );
}

export default ButtonLoading;