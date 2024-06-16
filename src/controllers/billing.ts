"use client"

import { billing_all } from "~/models/billing";
import { BillingAll } from "~/shared/types/billing_page";
import { BaseFilter } from "~/shared/types/pasien_page";
import { useBillingStore } from "~/stores/billing_store";
import { QueryString, generateQueryString } from "~/utils/query_string";
import xlsx, { IJsonSheet, ISettings } from "json-as-xlsx";

export const FetchAllBilling = async () => {
   try {
      // tampilkan loading
      useBillingStore.getState().setLoading(true);
      // filter data
      const allFilterObj = useBillingStore.getState().all_filter;
      const mapqs = Object.keys(allFilterObj).map((key) => {       
         const map: QueryString = { name: String(key), value: String(allFilterObj[key as keyof BaseFilter]) }
         return map;
      })
      const filter = generateQueryString(mapqs);

      // fetch data
      const data = await billing_all(filter);
      let list: BillingAll[] = []
      if (data.data) {
         data.data.map((item: any) => {
            const remap: BillingAll = {
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

         useBillingStore.getState().setBillingAll(list);
         useBillingStore.getState().setFilterAll({
            page: Number(data.page.page),
            perPage: Number(data.page.perPage),
            total: Number(data.page.total),
            lastPage: Number(data.page.lastPage),
            keyword: "",
         })
      } else {
         switch (data.status) {
            case 'Not Found': {
               useBillingStore.getState().setBillingAll([]);
            }
         }
      }

       // tampilkan loading
       useBillingStore.getState().setLoading(false);

   } catch (error: any) {
      console.log(error);
      
   }
}

export const FetchDownloadExcel = async () => {

   try {
      // tampilkan loading
      useBillingStore.getState().setExcelLoading(true);
      // filter data
      const allFilterObj = useBillingStore.getState().all_filter;
      allFilterObj.perPage = 0;
      const mapqs = Object.keys(allFilterObj).map((key) => {       
         const map: QueryString = { name: String(key), value: String(allFilterObj[key as keyof BaseFilter]) }
         return map;
      })
      const filter = generateQueryString(mapqs);

      // fetch data
      const data = await billing_all(filter);
      if (data.data) {
         // excel setting
         let excelData: IJsonSheet[] = [
            {
               sheet: "laporan",
               columns: [
                  { label: "No.RM", value: "nomer_rm" },
                  { label: "Nama Pasien", value: "nama_lengkap" },
                  { label: "Jenis Kelamin", value: "jns_kelamin" },
                  { label: "Tempat Lahir", value: (row) => (row.tempat_lahir) },
                  { label: "Tanggal Lahir", value: (row) => (new Date(String(row?.tanggal_lahir)).toLocaleDateString('fr-CA')) ?? "0000-00-00" },
                  { label: "Alamat", value: "alamat" },
                  { label: "Tanggal Periksa", value: (row) => (new Date(String(row?.tanggal_lahir)).toLocaleDateString('fr-CA')) ?? "0000-00-00" },
                  { label: "Nominal Pembayaran", value: "biaya" },
               ],
               content: data.data
            }
         ] 
         let excelSetting: ISettings = {
            fileName: `Laporan Billing ${allFilterObj?.tanggal} sampai ${allFilterObj?.sampai}`,
            writeMode: 'writeFile'
         }

         xlsx(excelData, excelSetting);
      }
      
   } catch (error: any) {
      console.log(error);
   } finally {   
      useBillingStore.getState().setExcelLoading(false);
   }
}