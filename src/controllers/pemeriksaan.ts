import { UseFormReturn } from "react-hook-form";
import { toast } from "react-toastify";
import { post_billing, put_billing } from "~/models/billing";
import { detail_kunjungan, kunjungan_all } from "~/models/kunjungan";
import { post_obat, post_resume, post_ttv, put_obat, put_resume, put_ttv } from "~/models/pemeriksaan";
import { BaseFilter, KunjunganAll } from "~/shared/types/pemeriksaan_page";
import { usePemeriksaanStore } from "~/stores/pemeriksaan_store";
import { trimData } from "~/utils/helpers";
import { QueryString, generateQueryString } from "~/utils/query_string";

export const FetchAllKunjungan = async () => {
   try {
      // tampilkan loading
      usePemeriksaanStore.getState().setLoading(true);
      // filter data
      const allFilterObj = usePemeriksaanStore.getState().all_filter;
      const mapqs = Object.keys(allFilterObj).map((key) => {       
         const map: QueryString = { name: String(key), value: String(allFilterObj[key as keyof BaseFilter]) }
         return map;
      })
      const filter = generateQueryString(mapqs);

      // fetch data
      const data = await kunjungan_all(filter);
      let list: KunjunganAll[] = []
      if (data.data) {
         data.data.map((item: any) => {
            const remap: KunjunganAll = {
               pasien: {
                  nama_lengkap: item.nama_lengkap,
                  alamat: item.alamat,
                  tempat_lahir: item.tempat_lahir,
                  tanggal_lahir: item.tanggal_lahir,
                  jns_kelamin: item.jns_kelamin,
                  telp: item.telp,
               },
               billing: {
                  biaya: item.biaya,
                  terbayar: item.terbayar
               },
               kunjungan: {
                  id: item.id,
                  id_pasien: item.id_pasien,
                  tgl_kunjungan: item.tgl_kunjungan
               }
            }
            list.push(remap);
         })

         usePemeriksaanStore.getState().setKunjunganAll(list);
         usePemeriksaanStore.getState().setFilterAll({
            page: Number(data.page.page),
            perPage: Number(data.page.perPage),
            total: Number(data.page.total),
            lastPage: Number(data.page.lastPage),
            keyword: "",
            tanggal: allFilterObj.tanggal
         })
      } else {
         switch (data.status) {
            case 'Not Found': {
               usePemeriksaanStore.getState().resetFilterExceptTanggal(usePemeriksaanStore.getState().all_filter.tanggal);
               usePemeriksaanStore.getState().setKunjunganAll([]);
            }
         }
      }

       // tampilkan loading
       usePemeriksaanStore.getState().setLoading(false);

   } catch (error: any) {
      console.log(error);
      
   }
}

export const FetchPemeriksaanID = async () => {
   
   usePemeriksaanStore.getState().resetPemeriksaan();

   try {
      const idkunjungan = Number(usePemeriksaanStore.getState().pemeriksaan_id?.kunjungan.id)
      const data = await detail_kunjungan(idkunjungan);
      
      if (data.data) {
         usePemeriksaanStore.getState().setResumeID(data.data.resume);
         usePemeriksaanStore.getState().setTtvID(data.data.ttv);
         usePemeriksaanStore.getState().setObatID(data.data.obat);
         usePemeriksaanStore.getState().setBillingID(data.data.billing);
      }
      
   } catch (error: any) {
      console.log(error);
   }
}

export const setDatatoForm = (methods: UseFormReturn, stateData: any) => {
   try {
      methods.clearErrors();
      if (stateData) {
         const data: any = stateData;
         
         for (const k in data) {  
            methods.setValue(k, data[k])
         }
      }
      
   } catch (error: any) {
      console.log(error);
   }
}

export const onSubmitTTV = async (data: any) => {
   const newdata: any = trimData(data);
   let message;
   console.log(data);

   if (!usePemeriksaanStore.getState().pemeriksaan_id) {
      toast.error('Silahkan Pilih Pasien !', {
         position: 'top-center'
      })
      return;
   }

   try {
      
      switch (newdata.act) {
         case "save": {
            const created = await post_ttv({
               id: Number(newdata.id),
               tensi_sistole: newdata.tensi_sistole,
               tensi_diastole: newdata.tensi_diastole,
               berat: newdata.berat,
               suhu: newdata.suhu,
               tinggi: newdata.tinggi,
               keluhan: newdata.keluhan,
            });
   
            if (created.status === "Created") {
               message = "TTV berhasil disimpan"
            }
         }
            break;
         case "edit": {
            const update = await put_ttv({
               id: newdata.id,
               tensi_sistole: newdata.tensi_sistole,
               tensi_diastole: newdata.tensi_diastole,
               berat: newdata.berat,
               suhu: newdata.suhu,
               tinggi: newdata.tinggi,
               keluhan: newdata.keluhan,
            });
   
            switch(update.status) {
               case "Updated": 
                  message = "Berhasil memperbarui data"
                  break;
               case "Not Updated": {
                  message = "Gagal memperbarui data !"
                  break;
               }
            }
         }
            break;
      }

      FetchPemeriksaanID();
      toast.success(message, { position: 'top-center' });
      
   } catch (error) {
      toast.error('Terjadi kesalahan saat pemrosesan data !', { position: 'top-center' });
   }
   
}

export const onSubmitResume = async (data: any) => {
   const newdata: any = trimData(data);
   let message;

   if (!usePemeriksaanStore.getState().pemeriksaan_id) {
      toast.error('Silahkan Pilih Pasien !', {
         position: 'top-center'
      })
      return;
   }
   
   try {
      switch (newdata.act) {
         case "save": {
            const created = await post_resume({
               id: Number(newdata.id),
               anamnesis: newdata.anamnesis,
               edukasi: newdata.edukasi,
               pemeriksaan_fisik: newdata.pemeriksaan_fisik,
               tata_laksana: newdata.tata_laksana
            });
   
            if (created.status === "Created") {
               message = "Anamnesis berhasil disimpan"
            }
         } 
            break;
         case "edit": {
            const update = await put_resume({
               id: newdata.id,
               anamnesis: newdata.anamnesis,
               edukasi: newdata.edukasi,
               pemeriksaan_fisik: newdata.pemeriksaan_fisik,
               tata_laksana: newdata.tata_laksana
            });
   
            switch(update.status) {
               case "Updated": 
                  message = "Berhasil memperbarui data"
                  break;
               case "Not Updated": {
                  message = "Gagal memperbarui data !"
                  break;
               }
            }
         }
            break;
      }

      FetchPemeriksaanID();
      toast.success(message, { position: 'top-center' });
      
   } catch (error) {
      toast.error('Terjadi kesalahan saat pemrosesan data !', { position: 'top-center' });
   }
   
}

export const onSubmitObat = async (data: any) => {
   const newdata: any = trimData(data);
   let message;

   if (!usePemeriksaanStore.getState().pemeriksaan_id) {
      toast.error('Silahkan Pilih Pasien !', {
         position: 'top-center'
      })
      return;
   }
   
   try {
      switch (newdata.act) {
         case "save": {
            const created = await post_obat({
               id: Number(newdata.id),
               obat: newdata.obat
            });
   
            if (created.status === "Created") {
               message = "Resep obat berhasil disimpan"
            }
         }
            break;
         case "edit": {
            const update = await put_obat({
               id: Number(newdata.id),
               obat: newdata.obat
            });
   
            switch(update.status) {
               case "Updated": 
                  message = "Berhasil memperbarui data"
                  break;
               case "Not Updated": {
                  message = "Gagal memperbarui data !"
                  break;
               }
            }
         }
            break;
      }

      FetchPemeriksaanID();
      toast.success(message, { position: 'top-center' });
      
   } catch (error) {
      toast.error('Terjadi kesalahan saat pemrosesan data !', { position: 'top-center' });
   }
   
}

export const onSubmitBilling = async (data: any) => {
   let message;

   if (!usePemeriksaanStore.getState().pemeriksaan_id) {
      toast.error('Silahkan Pilih Pasien !', {
         position: 'top-center'
      })
      return;
   }
   
   try {
      switch (data.act) {
         case "save": {
            const created = await post_billing({
               id: data.id,
               biaya: data.biaya,
               terbayar: data.terbayar
            });

            if (created.status === "Created") {
               message = "Billing berhasil disimpan"
            }
         }
            break;
         case "edit": {
            const update = await put_billing({
               id: data.id,
               biaya: data.biaya,
               terbayar: data.terbayar
            });

            switch(update.status) {
               case "Updated": 
                  message = "Berhasil memperbarui data"
                  break;
               case "Not Updated": {
                  message = "Gagal memperbarui data !"
                  break;
               }
            }
         }
            break;
      }
      FetchPemeriksaanID();
      toast.success(message, { position: 'top-center' });
      
   } catch (error) {
      toast.error('Terjadi kesalahan saat pemrosesan data !', { position: 'top-center' });
   }
   
}