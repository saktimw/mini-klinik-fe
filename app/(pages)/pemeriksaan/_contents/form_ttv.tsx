"use client"
import { useEffect } from 'react';
import { FormProvider, UseFormReturn } from 'react-hook-form';
import { Input, InputNumber} from '~/components/common/Form';
import { setDatatoForm } from '~/controllers/pemeriksaan';
import { usePemeriksaanStore } from '~/stores/pemeriksaan_store';

export default function FormTTV(methods: UseFormReturn) {
   const pemeriksaanStore = usePemeriksaanStore();

   useEffect(() => {
      if (pemeriksaanStore.ttv_id && pemeriksaanStore.ttv_id.id !== null) {
         setDatatoForm(methods, pemeriksaanStore.ttv_id);}
   }, [pemeriksaanStore.ttv_id])

   return (
      <FormProvider { ...methods }>
         <div className="mt-9 grid grid-cols-3 grid-rows-2 gap-2">
            <div className="flex items-end">
               <Input type="number" title="Tensi"
                  id="sistole"
                  name="tensi_sistole"
                  rules={{
                     required: true,
                  }}
               />
               <p className="text-xl items-center mx-1 mb-1.5 text-slate-400">/</p>
               <Input type="number"
                  id="diastole" name="tensi_diastole"
                  rules={{
                     required: true,
                  }}
               />
            </div>
            <div>
               <InputNumber title="Suhu (&#8451;)"
                  id="suhu" name="suhu"
                  step="any"
                  rules={{
                     required: true,
                  }}
               />
            </div>
            <div>
               <InputNumber title="Tinggi (Cm)"
                  id="tinggi" name="tinggi"
                  step="any"
                  rules={{
                     required: true,
                  }}
               />
            </div>
            <div>
               <InputNumber title="Berat (Kg)"
                  id="berat" name="berat"
                  step="any"
                  rules={{
                     required: true,
                  }}
               />
            </div>
            <div>
               <InputNumber title="SPO2"
                  id="spo2" name="spo2"
               />
            </div>
         </div>
      </FormProvider>
   )
}
