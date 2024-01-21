"use client"

import { useRef } from "react";
import { ButtonConfirmProps } from "~/shared/types/types";

const ButtonWithConfirm = ({
   title = 'Confirm',
   message = `Are you sure ?`,
   action, children
}: ButtonConfirmProps) => {
   
   const modalRef: any = useRef();
   const handleConfirm = () => {
      action();
      modalRef.current.close();
   }
   return (
      <>
         <div onClick={() => modalRef.current.showModal() }>
            { children }
         </div>
         <dialog ref={ modalRef } className="modal">
         <div className="modal-box rounded-md">
            <h3 className="font-bold text-xl">{ title }</h3>
            <p className="py-2.5">{ message }</p>
            <div className="modal-action">
               <button className="btn bg-gray-200" onClick={ handleConfirm }>Ya</button>
               <form method="dialog">
                  <button className="btn">Tidak</button>
               </form>
            </div>
         </div>
         </dialog>
      </>
   )
}

export default ButtonWithConfirm;