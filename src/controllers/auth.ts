"use client"

import { deleteCookie, setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { post_login } from "~/models/auth";
import { useAuthStore } from "~/stores/auth_store";
import { trimData } from "~/utils/helpers";

export const LoginAction = async (data: any, router: any) => {
   const newdata = trimData(data);
   try {
      useAuthStore.getState().setLoading(true);
      const login = await post_login(newdata);
      
      switch(login.status) {
         case "Not Found": 
            toast.warning(login.message, { position: 'top-center' });
            break;
         case "Ok": {
            let currdate = new Date();
            currdate.setDate(currdate.getDate() + 8);
            setCookie('xtoken', login.data.token, {
               expires: currdate
            });
            router.push('/home');
            break;
         }
      }
      useAuthStore.getState().setLoading(false);
   } catch (error) {
      toast.error("Terjadi kesalahan saat pemrosesan data !", { position: 'top-center' })
      useAuthStore.getState().setLoading(false);
   }
}

export const LogoutAction = (router: any ) => {

   deleteCookie('xtoken');
   router.push('/login');
}