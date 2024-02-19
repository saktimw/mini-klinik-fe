"use client"
import { Save, ClipboardEdit } from 'lucide-react';
import { FormProvider, useForm } from 'react-hook-form';
import { Input, TextareaInput } from '~/components/common/Form';
import ButtonLoading from '~/components/atoms/ButtonLoading';
import { usePemeriksaanStore } from '~/stores/pemeriksaan_store';
import { useEffect } from 'react';
import { onSubmitTTV, setDatatoForm } from '~/controllers/pemeriksaan';

export default function FormTTV() {
   
   const pemeriksaanStore = usePemeriksaanStore();
   const methods = useForm();

   useEffect(() => {
      if (pemeriksaanStore.ttv_id) {
         setDatatoForm(methods, pemeriksaanStore.ttv_id);
         methods.setValue('id', pemeriksaanStore.pemeriksaan_id?.kunjungan.id)
      } else {
         methods.reset();
      }
   }, [pemeriksaanStore.ttv_id])

   return (
      <div className="w-full base-card">
         <div className="relative px-2.5 py-1.5">
            <p className="pl-5 pr-10 py-1 absolute -left-2 -top-2 bg-white-stroke z-12 font-medium text-slate-500 rounded-br-full">Tanda Tanda Vital (TTV)</p>
            <FormProvider { ...methods }>
               <form onSubmit={ methods.handleSubmit((data) => onSubmitTTV(data)) }>
                  <div className="mt-9 grid grid-cols-5 gap-x-2">
                     <div className="flex items-end gap-1 col-span-2">
                        { pemeriksaanStore.ttv_id && (
                           <Input type="hidden" name="id" />
                        )}
                        <Input type="number" title="Tensi"
                           id="sistole"
                           name="tensi_sistole"
                           rules={{
                              required: true,
                           }}
                        />
                        <Input type="number"
                           id="diastole" name="tensi_diastole"
                           rules={{
                              required: true,
                           }}
                        />
                     </div>
                     <div>
                        <Input type="number" title="Suhu (&#8451;)"
                           id="suhu" name="suhu"
                           rules={{
                              required: true,
                           }}
                        />
                     </div>
                     <div>
                        <Input type="number" title="Tinggi (Cm)"
                           id="tinggi" name="tinggi"
                           rules={{
                              required: true,
                           }}
                        />
                     </div>
                     <div>
                        <Input type="number" title="Berat (Kg)"
                           id="berat" name="berat"
                           rules={{
                              required: true,
                           }}
                        />
                     </div>
                     <div className="col-span-full mt-3">
                        <TextareaInput title="Keluhan Pasien"
                           id="keluhan" name="keluhan"
                           rows={ 3 }
                           rules={{
                              required: true
                           }}
                        />
                     </div>
                  </div>
                  <div className="h-1"></div>
                  <ButtonLoading 
                     title={ !pemeriksaanStore.ttv_id ? 'Simpan' : 'Ubah Data' }
                     Icon={ !pemeriksaanStore.ttv_id ? Save : ClipboardEdit }
                  />
               </form>
            </FormProvider>
         </div>
      </div>
   )
}
