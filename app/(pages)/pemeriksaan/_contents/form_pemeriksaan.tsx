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

export default function FormPemeriksaan({ role = "" }: { role: string }) {
   
   const pemeriksaanStore = usePemeriksaanStore();
   const methods = useForm();

   useEffect(() => {
      pemeriksaanStore.reset()
   }, [])

   useEffect(() => {
      if (!!pemeriksaanStore.ttv_id?.id && !!pemeriksaanStore.resume_id?.id) {
         methods.setValue('act', 'edit')
      } else if (!!pemeriksaanStore.ttv_id?.id && !pemeriksaanStore.resume_id?.id) {
         methods.setValue('act', 'saveresume')
      } else {
         methods.setValue('act', 'save')
      }
   }, [pemeriksaanStore.ttv_id])

   useEffect(() => {
      if (pemeriksaanStore.alergi_id) {
         methods.setValue('idAlergi', pemeriksaanStore.alergi_id.id);
         methods.setValue('alergi', pemeriksaanStore.alergi_id.alergi);
      }
   }, [pemeriksaanStore.alergi_id])

   useEffect(() => {
      if (pemeriksaanStore.pemeriksaan_id) {
         methods.reset();
         methods.setValue('id', pemeriksaanStore.pemeriksaan_id?.kunjungan.id)
      }
   }, [pemeriksaanStore.pemeriksaan_id])

   return (
      <div className="w-full base-card">
         <div className="relative px-2.5 py-1.5">
            <p className="pl-5 pr-10 py-1 absolute -left-2 -top-2 bg-white-stroke z-12 font-medium text-slate-500 rounded-br-full">TTV dan Anamnesis</p>
            <FormProvider { ...methods }>
               <form onSubmit={ methods.handleSubmit((data) => onSubmitPemeriksaan(data, String(role))) }>
                  <Input type="hidden" name="id" />
                  <Input type="hidden" name="act" />
                  <Input type="hidden" name="idAlergi" />
                  <FormTTV {...methods}/>
                  <div className="my-1.5">
                     <TextareaInput title="Alergi"
                        id="alergi" name="alergi"
                        rows={ 2 }
                        onChange={()=>methods.setValue('updateAlergi',true)}
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
                     title={ !pemeriksaanStore.ttv_id?.id ? 'Simpan' : 'Ubah Data' }
                     Icon={ false ? Save : ClipboardEdit }
                  />
               </form>
            </FormProvider>
         </div>
      </div>
   )
}
