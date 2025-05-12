"use client"
import { Save, ClipboardEdit } from 'lucide-react';
import { useEffect } from 'react';
import { FormProvider, UseFormReturn } from 'react-hook-form';
import ButtonLoading from '~/components/atoms/ButtonLoading';
import { CheckInput, Input } from '~/components/common/Form';
import { onSubmitBilling, setDatatoForm } from '~/controllers/pemeriksaan';
import { usePemeriksaanStore } from '~/stores/pemeriksaan_store';

export default function FormBilling(methods: UseFormReturn) {

   const pemeriksaanStore = usePemeriksaanStore();

   useEffect(() => {
      if (pemeriksaanStore.billing_id?.id) {
         setDatatoForm(methods, pemeriksaanStore.billing_id);
      }
   }, [pemeriksaanStore.billing_id])

      // useEffect(() => {
      //    methods.reset();
      // }, [pemeriksaanStore.pemeriksaan_id])
   return (
      <div className="w-full base-card">
         <div className="relative px-2.5 py-1.5">
            <p className="pl-5 pr-10 py-1 absolute -left-2 -top-2 bg-white-stroke z-12 font-medium text-slate-500 rounded-br-full">Pembayaran</p>
            <FormProvider { ...methods }>
               <div className="mt-7">
                  <Input type="number"
                     id="biaya" 
                     name="biaya"
                     placeholder="Biaya (Rp.)"
                     rules={{
                        required: true
                     }}
                     onChange={(e)=>{
                        if(Number(e.target.value)>0){
                           methods.setValue('terbayar',true)
                        }else{
                           methods.setValue('terbayar',false)
                        }
                     }}
                  />
                  <div className="my-2.5">
                     <CheckInput type="checkbox" label="Sudah terbayar ?"
                        id="terbayar" name="terbayar"
                        value={ true }
                     />
                  </div>
               </div>
            </FormProvider>
         </div>
      </div>
   )
}
