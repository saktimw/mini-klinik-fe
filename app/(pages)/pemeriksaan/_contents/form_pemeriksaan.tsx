"use client"
import { Save, ClipboardEdit } from 'lucide-react';
import { FormProvider, useForm } from 'react-hook-form';
import { Input, TextareaInput } from '~/components/common/Form';
import ButtonLoading from '~/components/atoms/ButtonLoading';
import { usePemeriksaanStore } from '~/stores/pemeriksaan_store';
import { Suspense, useEffect } from 'react';
import { onSubmitPemeriksaan } from '~/controllers/pemeriksaan';
import FormResume from './form_resume';
import FormTTV from './form_ttv';
import FormBilling from './form_billing';
import PasienHistory from './pasien_history';

export default function FormPemeriksaan({ role = "" }: { role: string }) {
   
   const pemeriksaanStore = usePemeriksaanStore();
   const methods = useForm();
   const saveState = [
      pemeriksaanStore.billing_id?.id,
      pemeriksaanStore.resume_id?.id,
      pemeriksaanStore.ttv_id?.id,
   ];

   useEffect(() => {
      pemeriksaanStore.reset()
   }, [])

   useEffect(() => {
      if (pemeriksaanStore.ttv_id?.id) {
         methods.setValue('idTtv', pemeriksaanStore.ttv_id?.id)
      }
   }, [pemeriksaanStore.ttv_id])

   useEffect(() => {
      if (pemeriksaanStore.ttv_id?.id) {
         methods.setValue('idResume', pemeriksaanStore.resume_id?.id)
      }
   }, [pemeriksaanStore.resume_id])

   useEffect(() => {
      if (pemeriksaanStore.billing_id?.id) {
         methods.setValue('idBilling', pemeriksaanStore.billing_id?.id)
      }
   }, [pemeriksaanStore.billing_id])

   useEffect(() => {
      if (pemeriksaanStore.alergi_id) {
         methods.setValue('alergi', pemeriksaanStore.alergi_id.alergi);
      }
   }, [pemeriksaanStore.alergi_id])

   useEffect(() => {
      if (pemeriksaanStore.pemeriksaan_id) {
         methods.reset();
         methods.setValue('id', pemeriksaanStore.pemeriksaan_id?.kunjungan.id)
         methods.setValue('idPasien', pemeriksaanStore.pemeriksaan_id?.kunjungan.id_pasien)
         
      }
   }, [pemeriksaanStore.pemeriksaan_id])

   return (
      <FormProvider { ...methods }>
         <form onSubmit={ methods.handleSubmit((data) => onSubmitPemeriksaan(data, String(role))) } className="lg:flex items-start">
            <Input type="hidden" name="id" />
            <Input type="hidden" name="idPasien" />
            <Input type="hidden" name="idBilling" />
            <Input type="hidden" name="idResume" />
            <Input type="hidden" name="idTtv" />
            {/* form pemeriksaan */}
            <div className="w-full lg:w-7/12 lg:flex flex-col gap-y-2 mr-2">
               <div className="w-full base-card">
                  <div className="relative px-2.5 py-1.5">
                     <p className="pl-5 pr-10 py-1 absolute -left-2 -top-2 bg-white-stroke z-12 font-medium text-slate-500 rounded-br-full">TTV dan Anamnesis</p>
                        <FormTTV {...methods}/>
                        <div className="my-1.5">
                           <TextareaInput title="Alergi"
                              id="alergi" name="alergi"
                              rows={ 2 }
                           />
                        </div>
                        { (role && role === "dokter") && (
                           <Suspense>
                              <FormResume { ...methods }/>
                           </Suspense>
                        ) 
                        }
                        <div className="h-2"></div>
                        <ButtonLoading
                           submit={ true }
                           loading={ pemeriksaanStore.save_loading }
                           title={ saveState.some((v) => !!v === true) ? 'Ubah Data' : 'Simpan' }
                           Icon={ saveState.some((v) => !!v === true) ? ClipboardEdit : Save  }
                        />
                  </div>
               </div>
            </div>
            {/* form billing */}
            <div className="w-full lg:flex flex-col gap-y-2 lg:w-4/12">
            { role === "dokter" && (
               <>
                  <FormBilling { ...methods }/>
                  <PasienHistory />
               </>
            ) }
            </div>
         </form>
      </FormProvider>
   )
}
