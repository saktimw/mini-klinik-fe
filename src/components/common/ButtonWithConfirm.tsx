"use client"

import { useRef } from "react";
import { ButtonConfirmProps } from "~/shared/types/types";

const ButtonWithConfirm = ({
   title = 'Confirm',
   message = `Are you sure ?`,
   action, children
}: ButtonConfirmProps) => {
   
   const modalRef: any = useRef();
   const handleConfirm = async (value: boolean) => {
      action(value);
      modalRef.current.close();
   }
   return (
      <>
         <div onClick={() => modalRef.current.showModal() }>
            { children }
         </div>
         <dialog ref={ modalRef } className="modal">
         <div className="modal-box rounded-md">
            <h3 className="font-semibold text-lg">{ title }</h3>
            <p className="py-2.5">{ message }</p>
            <div className="modal-action">
               <button className="px-3 py-1.5 rounded bg-gray-200 hover:bg-gray-300 font-semibold text-main-typo" onClick={ () => handleConfirm(true) }>Ya</button>
               <button className="px-3 py-1.5 rounded bg-gray-200 hover:bg-gray-300 font-semibold text-main-typo" onClick={ () => handleConfirm(false) }>Tidak</button>
            </div>
         </div>
         </dialog>
      </>
   )
}

export default ButtonWithConfirm;