import { fetcher } from "~/utils/fetch_api";

const hostname = 'http://localhost:2000/v1/auth';

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