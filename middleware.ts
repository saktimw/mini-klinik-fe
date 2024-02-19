import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
   let cookies = req.cookies;
   const res = NextResponse.next();
   
   const logintoken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjEsImlhdCI6MTcwNzc4OTU1MywiZXhwIjoxNzA4Mzk0MzUzfQ.QkzCrje0JtmwwQZyMOYvZZ_JmjDXuIdp2UPCLSWIy_A";
   
   /** 
    * cek url
    * - jika /login :
    *   - cek cookies -> jika ada, cek expired -> jika tidak tetap hal login
    * - jika selain /login :
    *    - cek cookies -> jika ada, cek expired -> jika ya, redirect login -> jika tidak tetap disini 
   */

   if (cookies.get('token')) {
      res.headers.set('Authorization', String(cookies.get('token')?.value));
   } else {
      res.cookies.set('token', logintoken)
      res.headers.set('Authorization', logintoken);
   }

   return res;
}