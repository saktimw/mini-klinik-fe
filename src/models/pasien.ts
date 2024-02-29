import { Pasien } from "~/shared/types/pasien";
import { fetcher } from "~/utils/fetch_api";

const hostname = process.env.apiUrl! + '/pasien';

// list semua pasien
export async function pasien_all(filter = "") {
   const options: RequestInit = {
      method: 'GET',
   };
   try {
      const list = await fetcher(`${hostname}${filter}`, options)
      return list.json();
   } catch (error) {
      return error;
   }
}

// pasien per id
export async function pasien_id(id: number) {
   const options: RequestInit = {
      method: 'GET',
   };

   try {
      const data = await fetcher(`${hostname}/${id}`, options);
      return data.json();
   } catch (error) {
      return error;
   }
}

// input pasien
export async function post_pasien(data: Pasien & { kunjungan: boolean }) {
   const options: RequestInit = {
      method: 'POST',
      body: JSON.stringify(data)
   };

   try {
      const insert = await fetcher(`${hostname}`, options);

      return insert.json();
   } catch (error) {
      return error;
   }

}

export async function put_pasien(data: Pasien) {

   const options: RequestInit = {
      method: 'PUT',
      body: JSON.stringify({
         nama_lengkap: data.nama_lengkap,
         alamat: data.alamat,
         telp: data.telp,
         jns_kelamin: data.jns_kelamin,
         tempat_lahir: data.tempat_lahir,
         tanggal_lahir: data.tanggal_lahir,
      })
   }

   try {
      const update = await fetcher(`${hostname}/${data.id}`, options);
      return update.json();
   } catch (error) {
      return error;
   }

}