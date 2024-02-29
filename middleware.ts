import { getCookie } from 'cookies-next';
import { NextResponse } from 'next/server';
import type { NextFetchEvent, NextRequest } from 'next/server';

export function middleware(req: NextRequest, ev: NextFetchEvent) {
   const res = NextResponse.next();
   let cookies = getCookie('xtoken', { req, res});
   const hostname = 'http://localhost:3000/v1'
   
   if (req.nextUrl.pathname.startsWith('/login')) {
      if (cookies) {
         ev.waitUntil( fetch(`${hostname}/signin`, {
            headers: { Authorization: cookies }
         }).then((r) => {
            if (r.status === 200) 
               return NextResponse.redirect(new URL('/home', req.url))
            else 
               return res;
      }));
      } else return res;
   } else {
      if (cookies) {
         ev.waitUntil( fetch(`${hostname}/signin`, {
            headers: { Authorization: cookies }
         }).then((r) => {
            if (r.status === 200) 
               return res;
            else 
               return NextResponse.redirect(new URL('/login', req.url))
         }))
      } else return NextResponse.redirect(new URL('/login', req.url))
   }

   return res;
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