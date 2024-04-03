import { deleteCookie, getCookie } from 'cookies-next';
import { NextResponse } from 'next/server';
import type { NextFetchEvent, NextRequest } from 'next/server';

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
   const res = NextResponse.next();
   let token = getCookie('xtoken', {req, res});
   const hostname = 'http://localhost:2000/v1'
   
   if (req.nextUrl.pathname.startsWith('/login')) {
      if (token) {
         const check = await (await fetch(`${hostname}/signin`, {
            headers: { 
               'Content-type': 'application/json',
               Authorization: token 
            }
         })).json()
         
         if (check.status === "Ok") 
            return NextResponse.redirect(new URL('/home', req.url));
         else 
            return res;

      } else return res;
   } else {
      if (token) {
         const check = await (await fetch(`${hostname}/signin`, {
            headers: { 
               'Content-type': 'application/json',
               Authorization: token 
            }
         })).json()

         if (check.status === "Ok") 
            return res;
         else {
            deleteCookie('xtoken', { req, res });
            deleteCookie('xrole', { req, res });
            return NextResponse.redirect(new URL('/login', req.url))
         }
         
      } else return NextResponse.redirect(new URL('/login', req.url))
   }
}

export const config = {
   matcher: [{
      source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    }]
}