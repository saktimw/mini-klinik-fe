"use client"
import { Save, ClipboardEdit, RotateCcw } from 'lucide-react'
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form'
import ButtonLoading from '~/components/atoms/ButtonLoading';
import { CheckInput, Input, InputNumber, TextareaInput } from '~/components/common/Form';
import { usePasienStore } from '~/stores/pasien_store';
import { FetchIDtoForm, onSaveData } from '~/controllers/pasien';
import ButtonIcon from '~/components/atoms/ButtonIcon';

export default function FormPasien() {
   const pasienStore = usePasienStore();
   const methods = useForm();

   useEffect(() => {
      methods.setFocus('nama_lengkap')
      pasienStore.pasien_id && FetchIDtoForm(methods);
   }, [pasienStore.pasien_id])

   return (
      <>
         <div className="px-2.5 relative">
            <p className="pl-5 pr-10 py-1 absolute -left-2 -top-2 bg-white-stroke z-12 font-medium text-slate-500 rounded-br-full">Formulir Pasien</p>
            <div className="mt-9">
               <FormProvider { ...methods }>
                  <form onSubmit={ methods.handleSubmit((data) => onSaveData(data, methods)) }>
                     <div className="flex flex-col gap-3 my-2.5">
                        { pasienStore.pasien_id && (
                           <Input type="hidden" name="id" />
                        )}
                        <Input type="text" title="NIK / No.KTP" 
                           id="nik" name="nik"
                           maxlength={ 16 }
                           minlength={ 1 }
                        />
                        <Input type="text" title="Nama Lengkap"
                           id="nama" name="nama_lengkap"
                           rules={{
                              required: true
                           }}
                        />
                        <div className="flex gap-4">
                           <CheckInput type="radio" label="Laki-Laki"
                              id="laki" name="jns_kelamin"
                              value="L"
                              rules={{
                                 required: true
                              }}
                           />
                           <CheckInput type="radio" label="Perempuan"
                              id="perempuan" name="jns_kelamin"
                              value="P"
                              rules={{
                                 required: true
                              }}
                           />
                        </div>
                        <Input type="text" title="Tempat Lahir"
                           id="tempatlahir" name="tempat_lahir"
                           rules={{
                              required: true
                           }}
                        />
                        <Input type="date" title="Tanggal Lahir"
                           id="tgllahir" name="tanggal_lahir"
                           rules={{
                              required: true
                           }}
                        />
                        <TextareaInput title="Alamat"
                           id="alamat" 
                           name="alamat"
                           rows={ 3 }
                           rules={{
                              required: true
                           }}
                        />
                        <Input type="text" title="Telp / WhatsApp"
                           id="telp" name="telp"
                        />
                        { (!pasienStore.pasien_id && pasienStore.form_action === "save" ) && (
                           <CheckInput type="checkbox" label="Daftarkan pasien kedalam kunjungan hari ini ?"
                              id="kunjungan" name="kunjungan"
                              value={ true }
                           />
                        )}
                     </div>
                     <div className="flex gap-2">
                        <ButtonLoading
                           submit={ true }
                           loading={ pasienStore.save_loading }
                           buttonStyle="w-full"
                           title={ pasienStore.form_action === 'save' ? 'Simpan' : 'Ubah Data'  }
                           Icon={ pasienStore.form_action === 'save' ? Save : ClipboardEdit }
                        />
                        <div className="tooltip" data-tip="reset">
                           <ButtonIcon 
                              Icon={ RotateCcw }
                              buttonStyle="border border-main"
                              iconStyle="text-main"
                              onClick={ (e) => {
                                 e.preventDefault();
                                 pasienStore.setFormAction('save')
                                 pasienStore.setPasienID(undefined)
                                 methods.reset() 
                              }}
                           />
                        </div>
                     </div>
                  </form>
               </FormProvider>
            </div>
         </div>
      </>
   )
}
