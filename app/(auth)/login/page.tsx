import Image from 'next/image';
import mklogo from '~/assets/img/logo.png';
import bgcover from '../../../src/assets/img/clinic-bg.jpg';
import LoginForm from './login_form';

export default function LoginPage() {
   
   return (
      <div className="grid grid-cols-2 w-full h-full">
         <div className="px-10 py-6 my-auto">
            <p className="text-xs text-secondary-typo font-semibold tracking-wide uppercase text-center">welcome to</p>
            <div className="w-full flex justify-center items-center mt-1.5 mb-6">
               <Image 
                  src={ mklogo }
                  className="w-7 h-7"
                  alt="mk-logo"
               />
               <p className="tracking-wide text-lg text-main font-bold mx-2">Mini Klinik</p>
            </div>
            <div className="w-5/6 mx-auto">
               <LoginForm />
            </div>
         </div>
         <div className="bg-gradient-to-t from-main from-40% to-cyan-200 to-100% relative">
            <Image 
               src={ bgcover }
               className="opacity-[0.15] z-5"
               alt="mk-logo"
               sizes='100vh'
               fill={true}
               style={{
                  objectFit: 'cover'
               }}
            />
            <div className="z-6 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-full">
               <Image 
                  src={ mklogo }
                  className="w-[3.5rem] h-[3.5rem] brightness-0 invert mx-auto"
                  alt="mk-logo"
               />
               <p className="text-center tracking-wide text-xl text-white font-bold mt-2.5 mb-3">Mini Klinik</p>
               <p className="text-center text-white text-sm">Pelayanan CEPAT, dengan langkah TEPAT</p>
            </div>
         </div>
      </div>
   )
}