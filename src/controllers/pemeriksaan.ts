import { UseFormReturn } from "react-hook-form";
import { toast } from "react-toastify";
import { post_billing, put_billing } from "~/models/billing";
import { detail_kunjungan, history_all, kunjungan_all } from "~/models/kunjungan";
import { post_alergi, post_resume, post_ttv, put_resume, put_ttv } from "~/models/pemeriksaan";
import { PemeriksaanResume, PemeriksaanTTV } from "~/shared/types/pemeriksaan";
import { BaseFilter, HistoryDetail, KunjunganAll } from "~/shared/types/pemeriksaan_page";
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
                  nik: item.nik,
                  nama_lengkap: item.nama_lengkap,
                  alamat: item.alamat,
                  tempat_lahir: item.tempat_lahir,
                  tanggal_lahir: item.tanggal_lahir,
                  jns_kelamin: item.jns_kelamin,
                  telp: item.telp,
                  nomer_rm: item.nomer_rm
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
      // mengambil detail kunjungan berdasarkan id kunjungan
      const idkunjungan = Number(usePemeriksaanStore.getState().pemeriksaan_id?.kunjungan.id)
      const data = await detail_kunjungan(idkunjungan);
      
      const idpasien = Number(usePemeriksaanStore.getState().pemeriksaan_id?.kunjungan.id_pasien);
      const history = await history_all(idpasien);

      let historyList: any = [];
      if (history.data) {
         // mapping list history
         history.data.map((item: any) => {
            const opt = {
               label: new Date(item.tgl_kunjungan).toLocaleDateString('id-ID', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric'
               }),
               value: item.id
            }
            historyList.push(opt);
         })

         // ambil history terakhir
         const last = history.data[0];
         const detail = await detail_kunjungan(last.id);
         const mapdetail: HistoryDetail = {
            resume: detail.data.resume,
            ttv: detail.data.ttv
         } 
         
         usePemeriksaanStore.getState().setHistoryAll(historyList);
         usePemeriksaanStore.getState().setHistoryID({
            label: new Date(last.tgl_kunjungan).toLocaleDateString('id-ID', {
               day: '2-digit',
               month: 'long',
               year: 'numeric'
            }),
            value: last.id
         });
         usePemeriksaanStore.getState().setHistoryDetail(mapdetail);
      }
      
      if (data.data) {
         usePemeriksaanStore.getState().setResumeID(data.data.resume);
         usePemeriksaanStore.getState().setTtvID(data.data.ttv);
         usePemeriksaanStore.getState().setAlergiID(data.data.alergi);
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

export const onSubmitPemeriksaan = async (data: any, role: string) => {
   const newdata: any = trimData(data);
   let ttv: PemeriksaanTTV;
   let resume: PemeriksaanResume;
   let message;

   if (!usePemeriksaanStore.getState().pemeriksaan_id) {
      toast.error('Silahkan Pilih Pasien !', {
         position: 'top-center'
      })
      return;
   }
   
   try {
      usePemeriksaanStore.getState().setSaveLoading(true);

      ttv = {
         id: newdata.id,
         tensi_sistole: newdata.tensi_sistole,
         tensi_diastole: newdata.tensi_diastole,
         berat: newdata.berat,
         suhu: newdata.suhu,
         tinggi: newdata.tinggi,
         spo2: newdata.spo2
      }

      if(newdata.updateAlergi){
         const alergi:any = {
            id:newdata.idAlergi,
            alergi:newdata.alergi}
         await post_alergi(alergi)
      }

      switch(role) {
         case "dokter": {
            resume = {
               id: newdata.id,
               diagnosis: newdata.diagnosis,
               keluhan: newdata.keluhan,
               pemeriksaan_fisik: newdata.pemeriksaan_fisik,
               resep_obat: newdata.resep_obat,
               edukasi: newdata.edukasi,
            }
            
            switch (newdata.act) {
               case "save": {
                  const saveTTV = await post_ttv(ttv);
                  const saveResume = await post_resume(resume);

                  const save = [saveTTV.status, saveResume.status];

                  if (save.every(v => v === 'Created')) {
                     message = "Berhasil menyimpan pemeriksaan"
                  } else {
                     toast.error("Beberapa data gagal tersimpan", { position: 'top-center' });
                     return;
                  }
               }
                  break;
               case "edit": {
                  const updateTTV = await put_ttv(ttv);
                  const updateResume = await put_resume(resume);
                  const update = [updateTTV.status, updateResume.status];

                  if (update.every(v => v === 'Updated')) {
                     message = "Berhasil memperbarui data"
                  } else {
                     toast.error("Beberapa data gagal terupdate", { position: 'top-center' });
                     return;
                  }
               }
                  break;
               case "saveresume": {
                  const updateTTV = await put_ttv(ttv);
                  const saveResume = await post_resume(resume);

                  if (updateTTV.status === "Updated" && saveResume.status === "Created") {
                     message = "Berhasil memperbarui data"
                  } else {
                     toast.error("Beberapa data gagal terupdate", { position: 'top-center' });
                     return;
                  }
               }
                  break;
            }
         }
            break;
         case 'admin': {
            switch (newdata.act) {
               case "save": {
                  const saveTTV = await post_ttv(ttv);

                  if (saveTTV.status === 'Created') {
                     message = "Berhasil menyimpan pemeriksaan"
                  } else {
                     toast.error(saveTTV.message, { position: 'top-center' });
                     return;
                  }
               }
                  break;
               case "edit": {
                  const updateTTV = await put_ttv(ttv);

                  if (updateTTV.status === 'Updated') {
                     message = "Berhasil memperbarui data"
                  } else {
                     toast.error(updateTTV.message, { position: 'top-center' });
                     return;
                  }
               }
                  break;
            }
         }
            break;
      }

      FetchPemeriksaanID();
      toast.success(message, { position: 'top-center' });
      
   } catch (error) {
      toast.error('Terjadi kesalahan saat pemrosesan data !', { position: 'top-center' });
   } finally {
      usePemeriksaanStore.getState().setSaveLoading(false);
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
      usePemeriksaanStore.getState().setBillingLoading(true);
      switch (data.actbill) {
         case "save": {
            const created = await post_billing({
               id: data.idbill,
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
               id: data.idbill,
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
   } finally {
      usePemeriksaanStore.getState().setBillingLoading(false);
   }
   
}

export const onSelectHistory = async (data: any) => {
   usePemeriksaanStore.getState().setHistoryID(data);
   
   const id = data.value;
   const detail = await detail_kunjungan(id);
   const mapdetail: HistoryDetail = {
      resume: detail.data.resume,
      ttv: detail.data.ttv
   } 
   
   usePemeriksaanStore.getState().setHistoryDetail(mapdetail);
}