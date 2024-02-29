"use client"
import { useEffect } from "react"
import Pagination from "~/components/common/Pagination"
import Search from "~/components/common/Search"
import { FetchAllBilling } from "~/controllers/billing"
import { useBillingStore } from "~/stores/billing_store"

export default function BillingList() {
   
   const billingStore = useBillingStore()
   
   useEffect(() => {
      billingStore.resetFilter();
      FetchAllBilling();
   }, [])

   let no = 1;

   return (
      <div className="base-card">
         <div className="lg:w-9/12 mx-auto">
            <Search 
               onEnter={(v) => {
                  billingStore.setFilterAll({ keyword: v });
                  FetchAllBilling();
               }}
               placeholder="Ketik untuk mencari pasien [Enter]"
            />
         </div>
         <div className="overflow-x-auto scrollbar">
            <table className="table table-md">
               <thead>
                  <tr className="bg-base-background text-center">
                     <th>Tanggal Periksa</th>
                     <th>Nama Pasien</th>
                     <th>Alamat</th>
                     <th colSpan={2}>Biaya</th>
                  </tr>
               </thead>
               <tbody>
               {
                  billingStore.all_loading
                  ? (
                     <tr key="loading" className="hover">
                        <td className="text-center" colSpan={ 5 }>Memuat data...</td>
                     </tr>
                  )
                  : 
                  billingStore.billing_all?.length === 0
                     ? (
                        <tr key="not-found" className="hover">
                           <td className="text-center" colSpan={ 5 }>Data tidak ditemukan</td>
                        </tr>
                     )
                     : billingStore.billing_all.map((items: any) => (
                        <tr key={ no++ } className="hover">
                           <td className="text-center">
                              <p className="font-normal">{ new Date(items.kunjungan.tgl_kunjungan).toLocaleDateString('id-ID', {
                                 day: "2-digit",
                                 month: "long",
                                 year: "numeric"
                              }) }</p>
                           </td>
                           <td className={`font-semibold -tracking-[-0.015rem] ${items?.pasien.jns_kelamin === 'P' ? 'text-pink-500' : 'text-main' }`}>{ items.pasien.nama_lengkap }</td>
                           <td>{` ${items.pasien.alamat}`}</td>
                           {
                              (!items.billing.biaya && !items.billing.terbayar) 
                                 ? (
                                    <td className="text-center" colSpan={ 2 }>
                                       <div className="inline-block rounded-full px-5 py-0.5 bg-red-200 text-red-700 font-medium">Belum Bayar</div>
                                    </td>
                                 )
                                 : (
                                    <>
                                       <td className="text-center">
                                          <p className="text-right">
                                             <span className="text-[0.950rem] font-medium">
                                                { Number(items.billing.biaya)?.toLocaleString('id-ID', { 
                                                   style: 'currency',
                                                   currency: 'IDR'
                                                   }) }
                                             </span>
                                          </p>
                                       </td>
                                       <td className="text-left">
                                          <div className={`inline-block rounded-full px-2.5 py-0.5 ${ items.billing.terbayar ? 'bg-green-300' : 'bg-slate-200'} text-green-700 font-medium`}>{ items.billing.terbayar ? 'Lunas' : 'Belum Lunas' }</div>
                                       </td>
                                    </>
                                 )
                           }
                           
                        </tr>
                     )) 
               }
               </tbody>
            </table>
         </div>
         <Pagination  
            current={ billingStore.all_filter.page }
            totalPage={ billingStore.all_filter.lastPage }
            onChangeValue={ (val) => {
               billingStore.setFilterAll({ page: val })
               FetchAllBilling(); 
            }}
         />
      </div>
   )
}
