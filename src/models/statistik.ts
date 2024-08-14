import { fetcher } from "~/utils/fetch_api";

const hostname = process.env.apiUrl! + '/statistik';

export async function pasien_statistik() {
   const options: RequestInit = {
      method: 'GET'
   }

   try {
      const data = await fetcher(`${hostname}/pasien`, options);
      
      return data.json();
   } catch (error) {
      return error;
   }
}

export async function kunjungan_statistik() {
   const options: RequestInit = {
      method: 'GET'
   }

   try {
      const data = await fetcher(`${hostname}/kunjungan`, options);
      
      return data.json();
   } catch (error) {
      return error;
   }
}