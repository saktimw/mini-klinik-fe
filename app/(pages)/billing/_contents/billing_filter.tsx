"use client"
import { Filter, SearchIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import ButtonLoading from '~/components/atoms/ButtonLoading';

export default function BillingFilter() {
   const methods = useForm();
   return (
      <div className="base-card">
         <div className="px-1.5 py-1">
            <div className="flex gap-3 items-center text-main">
               <Filter className="w-[1.2rem]"/>
               <p className="capitalize font-semibold">Filter</p>
            </div>
            <div className="border-b border-b-white-stroke py-1.5"></div>
            <form onSubmit={ methods.handleSubmit((v) => console.log(v)) }>
               <div className="flex flex-col gap-4 mt-2.5 mb-3.5">
                  {/* tanggal */}
                  <div>
                     <p className="text-sm text-secondary-typo">Rentang Waktu</p>
                     <div className="mx-2 mt-1">
                        <div className="py-2 border-b border-white-stroke my-1">
                           <input type="date" className="text-sm w-full outline-none text-md focus:outline-none rounded-md"/>
                        </div>
                        <div className="py-2 border-b border-white-stroke my-1">
                           <input type="date" className="text-sm w-full outline-none text-md focus:outline-none rounded-md"/>
                        </div>
                     </div>
                  </div>
                  {/* status bayar */}
                  <div>
                     <p className="text-sm text-secondary-typo">Status Bayar</p>
                     <div className="flex flex-col gap-1.5 mx-2 my-3">
                        <div className="base-check-wrap">
                           <input type="checkbox" className="base-input-check"/>
                           <label htmlFor="a" className="base-label-check" >Belum bayar</label>
                        </div>
                        <div className="base-check-wrap">
                           <input type="checkbox" className="base-input-check" defaultChecked/>
                           <label htmlFor="a" className="base-label-check">Lunas</label>
                        </div>
                        <div className="base-check-wrap">
                           <input type="checkbox" className="base-input-check" />
                           <label htmlFor="a" className="base-label-check">Hutang</label>
                        </div>
                     </div>
                  </div>
               </div>
               <ButtonLoading 
                  buttonStyle="w-full"
                  title="Filter"
                  Icon={ SearchIcon }
               />
            </form>
         </div>
      </div>  
   )
}
