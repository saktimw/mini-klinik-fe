"use client"

import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form"
import ButtonIcon from "~/components/atoms/ButtonIcon";
import ButtonLoading from "~/components/atoms/ButtonLoading";
import { Input } from "~/components/common/Form"
import { LoginAction } from "~/controllers/auth";
import { useAuthStore } from "~/stores/auth_store";

export default function LoginForm() {
   const methods = useForm();
   const router = useRouter();
   const [hidden, setHidden] = useState(true);
   const authStore = useAuthStore();
   
   return (
      <>
         <FormProvider { ...methods }>
            <form action={undefined} onSubmit={ methods.handleSubmit((data) => {
               LoginAction(data, router)
            }) }>
               <Input type="text" 
                  name="username"
                  id="user"
                  placeholder="Username"
                  rules={{
                     required: true
                  }}
               />
               <div className="h-5"></div>
               <div className="relative">
                  <Input type={ hidden ? 'password' : 'text' } 
                     name="password"
                     id="pass"
                     placeholder="Password"
                     rules={{
                        required: true
                     }}
                  />
                  <ButtonIcon
                     buttonStyle="absolute top-1 right-3 border-none"
                     iconStyle="text-slate-400"
                     Icon={ hidden ? EyeOff : Eye }
                     onClick={(e) => {
                        e.preventDefault();
                        setHidden(!hidden)
                     }}
                  />
               </div>
               <div className="h-5"></div>
               <ButtonLoading
                  loading={ authStore.loading }
                  submit={ true } 
                  title="Masuk"
                  buttonStyle="w-full"
               />
            </form>
         </FormProvider>
      </>
   )
}
