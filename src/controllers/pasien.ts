"use client"

import { UseFormReturn } from "react-hook-form";
import { toast } from "react-toastify";
import { post_kunjungan } from "~/models/kunjungan";
import { pasien_all, post_pasien, put_pasien } from "~/models/pasien";
import { BaseFilter } from "~/shared/types/pasien_page";
import { usePasienStore } from "~/stores/pasien_store";
import { trimData } from "~/utils/helpers";
import { QueryString, generateQueryString } from "~/utils/query_string";

export const FetchAllPasien = async () => { 

   try {
      // loading fetch
      usePasienStore.getState().setLoading(true);

      // url query string
      const allFilterObj = usePasienStore.getState().all_filter;
      
      const mapqs = Object.keys(allFilterObj).map((key) => {       
         const map: QueryString = { name: String(key), value: String(allFilterObj[key as keyof BaseFilter]) }
         return map;
      })
      const filter = generateQueryString(mapqs);
      
      // fetch data
      const data = await pasien_all(filter);
      
      if (data.data) {
         usePasienStore.getState().setPasienAll(data.data)
         usePasienStore.getState().setFilterAll({
            page: Number(data.page.page),
            perPage: Number(data.page.perPage),
            total: Number(data.page.total),
            lastPage: Number(data.page.lastPage),
            keyword: ""
         })
      } else {
         switch (data.status) {
            case 'Not Found':
               usePasienStore.getState().resetFilter();
               usePasienStore.getState().setPasienAll([]);
               break;
         }
      }
      // loading fetch
      usePasienStore.getState().setLoading(false);
      
   } catch (error: any) {
      usePasienStore.getState().resetFilter();
      usePasienStore.getState().setPasienAll([]);
   }
}

export const FetchIDtoForm = (methods: UseFormReturn) => {
   try {
      methods.clearErrors();
      const data: any = usePasienStore.getState().pasien_id;
      
      for (const k in data) {  
         data['tanggal_lahir'] = new Date(data['tanggal_lahir']).toLocaleDateString('fr-CA')
         methods.setValue(k, data[k])
      }
      
   } catch (error: any) {
      console.log(error);
   }
}

export const onSaveData = async (data: any, methods: UseFormReturn) => {
   const formAct: any = usePasienStore.getState().form_action;
   const newdata: any = trimData(data);
   let message;
   
   try {
      switch (formAct) {
         case "save": {
            const created = await post_pasien({
               nama_lengkap: newdata.nama_lengkap,
               jns_kelamin: newdata.jns_kelamin,
               alamat: newdata.alamat,
               tempat_lahir: newdata.tempat_lahir,
               tanggal_lahir: newdata.tanggal_lahir,
               telp: newdata.telp,
               kunjungan: newdata.kunjungan
            });

            if (created.status === "Created" && (!!newdata.kunjungan === true)) {
               message = "Pasien baru ditambahkan kedalam kunjungan"
            } else {
               message = "Pasien berhasil didaftarkan"
            }
         }
            break;
         case "update": {
            const update = await put_pasien({
               id: newdata.id,
               nama_lengkap: newdata.nama_lengkap,
               jns_kelamin: newdata.jns_kelamin,
               alamat: newdata.alamat,
               tempat_lahir: newdata.tempat_lahir,
               tanggal_lahir: newdata.tanggal_lahir,
               telp: newdata.telp,
            });
            if (update.status === "Updated") {
               usePasienStore.getState().setPasienID(undefined);
               usePasienStore.getState().setFormAction('save');
               message = 'Data berhasil diperbarui'
            }
         }
         break;
      }
      // reset form & refresh
      methods.reset();
      await FetchAllPasien();
      toast.success(message, { position: 'top-center' });
      
   } catch (error) {
      toast.error('Terjadi kesalahan saat pemrosesan data !', { position: 'top-center' });
   }
   
}

export const addKunjungan = async () => {
   try {
      const created = await post_kunjungan(usePasienStore.getState().id)
      if (created.status === "Created") toast.success('Pasien masuk ke dalam kunjungan', {
         position: 'top-center'
      })
   } catch (error) {
      console.log(error);
   }

   usePasienStore.getState().setID(0);
}