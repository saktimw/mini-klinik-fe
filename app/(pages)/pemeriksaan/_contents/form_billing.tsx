"use client"
import { Save, ClipboardEdit } from 'lucide-react';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import ButtonLoading from '~/components/atoms/ButtonLoading';
import { CheckInput, Input } from '~/components/common/Form';
import { onSubmitBilling, setDatatoForm } from '~/controllers/pemeriksaan';
import { usePemeriksaanStore } from '~/stores/pemeriksaan_store';

export default function FormBilling() {

   const pemeriksaanStore = usePemeriksaanStore();
   const methods = useForm();

   useEffect(() => {
      if (pemeriksaanStore.billing_id) {
         methods.setValue('act', 'edit')
         setDatatoForm(methods, pemeriksaanStore.billing_id);
      } else {
         methods.setValue('act', 'save')
      }
   }, [pemeriksaanStore.billing_id])
   
   useEffect(() => {
      if (pemeriksaanStore.pemeriksaan_id) {
         methods.setValue('id', pemeriksaanStore.pemeriksaan_id?.kunjungan.id)
         methods.reset();
      }
   }, [pemeriksaanStore.pemeriksaan_id])

   return (
      <div className="w-full base-card">
         <div className="relative px-2.5 py-1.5">
            <p className="pl-5 pr-10 py-1 absolute -left-2 -top-2 bg-white-stroke z-12 font-medium text-slate-500 rounded-br-full">Pembayaran</p>
            <FormProvider { ...methods }>
               <form onSubmit={ methods.handleSubmit((data) => onSubmitBilling(data) ) }>
                  <div className="mt-7">
                     <Input type="hidden" name="id" />
                     <Input type="hidden" name="act" />
                     <Input type="number"
                        id="biaya" 
                        name="biaya"
                        placeholder="Biaya (Rp.)"
                        rules={{
                           required: true
                        }}
                     />
                     <div className="my-2.5">
                        <CheckInput type="checkbox" label="Sudah terbayar ?"
                           id="terbayar" name="terbayar"
                           value={ true }
                        />
                     </div>
                  </div>
                  <div className="mt-2 mx-auto">
                     <ButtonLoading
                        submit={ true }
                        title={ !pemeriksaanStore.billing_id ? 'Simpan' : 'Ubah Data' }
                        Icon={ !pemeriksaanStore.billing_id ? Save : ClipboardEdit }
                     />
                  </div>
               </form>
            </FormProvider>
         </div>
      </div>
   )
}
