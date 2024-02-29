import { getCookie } from "cookies-next"

export async function fetcher (url: string, options: RequestInit) {
   const token = getCookie('xtoken');
   
   let init: RequestInit = {
      headers: {
         'Content-type': 'application/json',
         'Authorization': String(token)
      }
   }
   const fetcher = await fetch(url, { ...init, ...options });
   return fetcher;
}