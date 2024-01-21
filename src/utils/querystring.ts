import { ReadonlyURLSearchParams } from "next/navigation";

interface QueryString {
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

export const generateAPIQueryString = (url: string, qs: QueryString): string  => {
   const baseurl = new URL(url);
   const getparams = baseurl.searchParams;
   const params = new URLSearchParams(getparams.toString());

   params.set(qs.name, qs.value);

   return baseurl.toString() + '?' + params.toString(); 
}