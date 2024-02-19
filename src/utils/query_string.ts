import { ReadonlyURLSearchParams } from "next/navigation";

export interface QueryString {
   name: string;
   value: string;
}

export const generatePageQueryString = (
   path: string,
   urlparams: ReadonlyURLSearchParams,
   qs: QueryString
): string => {
   
   const params = new URLSearchParams(urlparams.toString()) 
   params.set(qs.name, qs.value);
   
   return path + '?' +params.toString();
}

export const generateAPIQueryString = (url: string | "", qs: QueryString): string  => {
   const baseurl = new URL(url);
   const getparams = baseurl.searchParams;
   const params = new URLSearchParams(getparams.toString());

   params.set(qs.name, qs.value);
   
   if (url === ""){
      return '?' + params.toString();
   }
   return baseurl.toString() + '?' + params.toString(); 
}

export const generateQueryString = (qs: QueryString | QueryString[]): string => {
   const params = new URLSearchParams();   

   if (Array.isArray(qs)) {
      qs.map((item: any) => {
         params.set(item.name, item.value);
      })
   } else {
      params.set(qs.name, qs.value);
   }

   return '?' + params.toString();
}