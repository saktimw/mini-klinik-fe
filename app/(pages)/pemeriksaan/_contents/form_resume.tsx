"use client"
import { useEffect } from 'react';
import { FormProvider, UseFormReturn } from 'react-hook-form';
import { Input, TextareaInput } from '~/components/common/Form';
import { setDatatoForm } from '~/controllers/pemeriksaan';
import { usePemeriksaanStore } from '~/stores/pemeriksaan_store';

export default function FormResume(methods: UseFormReturn) {

   const pemeriksaanStore = usePemeriksaanStore();

   useEffect(() => {
      if (pemeriksaanStore.resume_id) {
         setDatatoForm(methods, pemeriksaanStore.resume_id);}
   }, [pemeriksaanStore.resume_id])

   return (
      <FormProvider { ...methods }>
         <div className="grid grid-cols-2 grid-rows-3 gap-2">
            <div className="col-span-full self-end">
               <TextareaInput title="Keluhan Pasien"
                  id="keluhan" name="keluhan"
                  rows={ 2 }
                  rules={{
                     required: true
                  }}
               />
            </div>
            <TextareaInput title="Diagnosis"
               id="diagnosis" name="diagnosis"
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
            <TextareaInput title="Resep Obat"
               id="resep_obat" name="resep_obat"
               rows={ 3 }
               rules={{
                  required: true
               }}
            />
            <TextareaInput title="Edukasi"
               id="edukasi" name="edukasi"
               rows={ 3 }
            />
         </div>
      </FormProvider>
   )
}
