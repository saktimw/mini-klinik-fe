"use client"

import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css"

export default function ToastifyContainer() {
   return (
      <ToastContainer 
         autoClose={ 2000 }
         closeOnClick={ true }
      />  
   )
}
