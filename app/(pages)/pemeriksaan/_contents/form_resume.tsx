"use client"
import { Save, ClipboardEdit } from 'lucide-react';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import ButtonLoading from '~/components/atoms/ButtonLoading';
import { Input, TextareaInput } from '~/components/common/Form';
import { onSubmitResume, setDatatoForm } from '~/controllers/pemeriksaan';
import { usePemeriksaanStore } from '~/stores/pemeriksaan_store';

export default function FormResume() {
   
   const pemeriksaanStore = usePemeriksaanStore();
   const methods = useForm();

   useEffect(() => {
      
      if (pemeriksaanStore.resume_id) {
         methods.setValue('act', 'edit')
         setDatatoForm(methods, pemeriksaanStore.resume_id);
      } else {
         methods.setValue('act', 'save')
      }
   }, [pemeriksaanStore.resume_id])

   useEffect(() => {
      if (pemeriksaanStore.pemeriksaan_id) {
         methods.reset();
         methods.setValue('id', pemeriksaanStore.pemeriksaan_id?.kunjungan.id)
      }
   }, [pemeriksaanStore.pemeriksaan_id])

   return (
      <div className="w-full base-card">
         <div className="relative px-2.5 py-1.5">
            <p className="pl-5 pr-10 py-1 absolute -left-2 -top-2 bg-white-stroke z-12 font-medium text-slate-500 rounded-br-full">Anamnesis</p>
            <FormProvider { ...methods }>
               <form onSubmit={ methods.handleSubmit((data) => onSubmitResume(data)) }>
                  <Input type="hidden" name="id" />
                  <Input type="hidden" name="act" />
                  <div className="mt-9 grid grid-cols-2 grid-rows-2 gap-2">
                     <TextareaInput title="Anamnesis"
                        id="anamnesis" name="anamnesis"
                        rows={ 3 }
                        rules={{
                           required: true
                        }}
                     />
                     <TextareaInput title="Pemeriksaan Fisik"
                        id="pemeriksaanfisik" name="pemeriksaan_fisik"
                        rows={ 3 }
                        rules={{
                           required: true
                        }}
                     />
                     <TextareaInput title="Tata Laksana"
                        id="tata_laksana" name="tata_laksana"
                        rows={ 3 }
                        rules={{
                           required: true
                        }}
                     />
                     <TextareaInput title="Edukasi"
                        id="edukasi" name="edukasi"
                        rows={ 3 }
                        rules={{
                           required: true
                        }}
                     />
                  </div>
                  <div className="h-1"></div>
                  <ButtonLoading 
                     submit={ true }
                     title={ !pemeriksaanStore.resume_id ? 'Simpan' : 'Ubah Data' }
                     Icon={ !pemeriksaanStore.resume_id ? Save : ClipboardEdit }
                  />
               </form>
            </FormProvider>
         </div>
      </div>
   )
}
