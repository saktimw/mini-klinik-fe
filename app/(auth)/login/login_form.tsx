"use client"

import { FormProvider, useForm } from "react-hook-form"
import ButtonLoading from "~/components/atoms/ButtonLoading";
import { Input } from "~/components/common/Form"

export default function LoginForm() {
   const methods = useForm();
   return (
      <>
         <FormProvider { ...methods }>
            <form onSubmit={ methods.handleSubmit((data) => console.log(data)) }>
               <Input type="text" 
                  name="username"
                  id="user"
                  placeholder="Username"
                  rules={{
                     required: true
                  }}
               />
               <div className="h-5"></div>
               <Input type="password" 
                  name="password"
                  id="pass"
                  placeholder="Password"
                  rules={{
                     required: true
                  }}
               />
               <div className="h-5"></div>
               <ButtonLoading 
                  title="Masuk"
                  buttonStyle="w-full"
               />
            </form>
         </FormProvider>
      </>
   )
}
