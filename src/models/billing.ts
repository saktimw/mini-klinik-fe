import { Billing } from "~/shared/types/billing";
import { fetcher } from "~/utils/fetch_api";

const hostname = process.env.apiUrl! + '/billing';

// input pemeriksaan obat
export async function post_billing(data: Billing) {
   const options: RequestInit = {
      method: 'POST',
      body: JSON.stringify(data)
   }

   try {
      const insert = await fetcher(`${hostname}`, options);
      return insert.json();
   } catch (error) {
      return false;
   }
}

// update pemeriksaan resume
export async function put_billing(data: Billing) {
   const options: RequestInit = {
      method: 'PUT',
      body: JSON.stringify({
         biaya: data.biaya,
         terbayar: data.terbayar
      })
   }

   try {
      const updated = await fetcher(`${hostname}/${data.id}`, options);
      return updated.json();
   } catch (error) {
      return false;
   }
}