"use client"
import { Save, ClipboardEdit } from 'lucide-react';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import ButtonLoading from '~/components/atoms/ButtonLoading';
import { Input, TextareaInput } from '~/components/common/Form';
import { onSubmitObat, setDatatoForm } from '~/controllers/pemeriksaan';
import { usePemeriksaanStore } from '~/stores/pemeriksaan_store';

export default function FormResep() {

   const pemeriksaanStore = usePemeriksaanStore();
   const methods = useForm();

   useEffect(() => {
      if (pemeriksaanStore.obat_id) {
         setDatatoForm(methods, pemeriksaanStore.obat_id);
         methods.setValue('id', pemeriksaanStore.pemeriksaan_id?.kunjungan.id)
      } else {
         methods.reset();
      }
   }, [pemeriksaanStore.obat_id])

   return (
      <div className="w-full base-card">
         <div className="relative px-2.5 py-1.5">
            <p className="pl-5 pr-10 py-1 absolute -left-2 -top-2 bg-white-stroke z-12 font-medium text-slate-500 rounded-br-full">Obat</p>
            <FormProvider { ...methods }>
               <form onSubmit={ methods.handleSubmit((data) => onSubmitObat(data) ) }>
                  <div className="mt-9">
                     { pemeriksaanStore.obat_id && (
                        <Input type="hidden" name="id" />
                     )}
                     <TextareaInput title="Resep Obat"
                        id="resep" 
                        name="obat"
                        rows={ 10 }
                        rules={{
                           required: true
                        }}
                     />
                  </div>
                  <div className="h-1"></div>
                  <ButtonLoading 
                     title={ !pemeriksaanStore.obat_id ? 'Simpan' : 'Ubah Data' }
                     Icon={ !pemeriksaanStore.obat_id ? Save : ClipboardEdit }
                  />
               </form>
            </FormProvider>
         </div>
      </div>
   )
}
