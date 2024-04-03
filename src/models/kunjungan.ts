import { fetcher } from "~/utils/fetch_api";

const hostname = process.env.apiUrl! + '/kunjungan';

export async function kunjungan_all(filter = "") {
   const options: RequestInit = {
      method: 'GET'
   }

   try {
      const data = await fetcher(`${hostname}${filter}`, options);
      return data.json();

   } catch (error) {
      return error;
   }
}

export async function post_kunjungan(id: Number) {
   const options: RequestInit = {
      method: 'POST',
      body: JSON.stringify({
         id_pasien: id
      })
   };

   try {
      const insert = await fetcher(`${hostname}`, options);

      return insert.json();
   } catch (error) {
      return error;
   }

}

export async function detail_kunjungan(id: Number) {
   const options: RequestInit = {
      method: 'GET'
   };

   try {
      const data = await fetcher(`${hostname}/detail/${id}`, options);

      return data.json();
   } catch (error) {
      return error;
   }

}

export async function history_all(id: number) {

   const options: RequestInit = {
      method: 'GET'
   }

   try {
      const data = await fetcher(`${hostname}/history/${id}`, options);
      
      return data.json();
   } catch (error) {
      return error;
   }

}