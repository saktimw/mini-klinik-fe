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
         setDatatoForm(methods, pemeriksaanStore.billing_id);
         methods.setValue('id', pemeriksaanStore.pemeriksaan_id?.kunjungan.id)
      } else {
         methods.reset();
      }
   }, [pemeriksaanStore.billing_id])

   return (
      <div className="w-full base-card">
         <div className="relative px-2.5 py-1.5">
            <p className="pl-5 pr-10 py-1 absolute -left-2 -top-2 bg-white-stroke z-12 font-medium text-slate-500 rounded-br-full">Pembayaran</p>
            <FormProvider { ...methods }>
               <form onSubmit={ methods.handleSubmit((data) => onSubmitBilling(data) ) }>
                  <div className="mt-7">
                     { pemeriksaanStore.billing_id && (
                        <Input type="hidden" name="id" />
                     )}
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
