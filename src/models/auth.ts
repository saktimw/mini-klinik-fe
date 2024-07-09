import { fetcher } from "~/utils/fetch_api";
// import {setConfig} from "next/config";
// const {  }= setConfig();
const hostname = process.env.apiUrl! + '/auth';

export async function post_login(data: any) {
   const options: RequestInit = {
      method: 'POST',
      body: JSON.stringify(data)
   }

   try {
      const check = await fetcher(hostname, options);
      return check.json();
   } catch (error) {
      return false;
   }
} 