import { Obat, PemeriksaanAlergi, PemeriksaanResume, PemeriksaanTTV } from "~/shared/types/pemeriksaan";
import { fetcher } from "~/utils/fetch_api";

const hostname = process.env.apiUrl! + '/pemeriksaan';

// input pemeriksaan ttv
export async function post_ttv(data: PemeriksaanTTV) {
   const options: RequestInit = {
      method: 'POST',
      body: JSON.stringify(data)
   }

   const insert = await fetcher(`${hostname}/ttv`, options);
   try {
      return insert.json();
   } catch (error) {
      return false;
   }
}

// update pemeriksaan ttv
export async function put_ttv(data: PemeriksaanTTV) {
   const options: RequestInit = {
      method: 'PUT',
      body: JSON.stringify({
         tensi_sistole: data.tensi_sistole,
         tensi_diastole: data.tensi_diastole,
         berat: data.berat,
         suhu: data.suhu,
         tinggi: data.tinggi,
         spo2: data.spo2,
      })
   }

   try {
      const updated = await fetcher(`${hostname}/ttv/${data.id}`, options);
      return updated.json();
   } catch (error) {
      return false;
   }
}

// input pemeriksaan resume
export async function post_resume(data: PemeriksaanResume) {
   const options: RequestInit = {
      method: 'POST',
      body: JSON.stringify(data)
   }

   try {
      const insert = await fetcher(`${hostname}/resume`, options);
      return insert.json();
   } catch (error) {
      return false;
   }
}

// update pemeriksaan resume
export async function put_resume(data: PemeriksaanResume) {
   const options: RequestInit = {
      method: 'PUT',
      body: JSON.stringify({
         diagnosis: data.diagnosis,
         keluhan: data.keluhan,
         pemeriksaan_fisik: data.pemeriksaan_fisik,
         resep_obat: data.resep_obat,
         edukasi: data.edukasi
      }),
   }

   try {
      const updated = await fetcher(`${hostname}/resume/${data.id}`, options);
      return updated.json();
   } catch (error) {
      return false;
   }
}

// input pemeriksaan Alergi
export async function post_alergi(data: PemeriksaanAlergi) {
   const options: RequestInit = {
      method: 'POST',
      body: JSON.stringify(data)
   }

   try {
      const insert = await fetcher(`${hostname}/alergi`, options);
      return insert.json();
   } catch (error) {
      return false;
   }
}
