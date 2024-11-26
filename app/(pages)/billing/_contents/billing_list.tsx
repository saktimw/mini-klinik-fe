"use client"
import { useEffect, useReducer, useState } from "react"
import { Pagination } from "~/components/common/Pagination"
import Search from "~/components/common/Search"
import { FetchAllBilling, FetchDownloadExcel } from "~/controllers/billing"
import { useBillingStore } from "~/stores/billing_store"
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { ChevronDown, Download } from "lucide-react"
import ButtonIcon from "~/components/atoms/ButtonIcon"
import ButtonLoading from "~/components/atoms/ButtonLoading"

export default function BillingList() {
   
   const billingStore = useBillingStore()
   const [fromDate, setFromDate] = useState(new Date());
   const [toDate, setToDate] = useState(new Date());
   
   useEffect(() => {
      billingStore.resetFilter();
      FetchAllBilling();
   }, [])

   useEffect(() => {
      if (fromDate > toDate) setToDate(fromDate) 
   }, [fromDate])
   
   useEffect(() => {
      billingStore.setFilterAll({ 
         tanggal: new Date(fromDate).toLocaleDateString('fr-CA'),
         sampai: new Date(toDate).toLocaleDateString('fr-CA') 
      }) 
      FetchAllBilling();
   }, [fromDate, toDate])

   let no = 1;

   return (
      <div className="base-card">
         <div className="flex justify-center items-center gap-5">
            <div className="lg:w-5/12">
               <Search 
                  onEnter={(v) => {
                     billingStore.setFilterAll({ keyword: v });
                     FetchAllBilling();
                  }}
                  placeholder="Ketik untuk mencari pasien [Enter]"
               />
            </div>
            <div className="flex items-center group py-3 border-b border-white-stroke mb-3">
               <DatePicker
                  selected={ fromDate }
                  startDate={ fromDate }
                  endDate={ toDate }
                  onChange={ (d: any) => {
                     setFromDate(d);
                  }}
                  customInput= { 
                     <p className="text-sm mx-2 text-slate-400">
                        { new Date(fromDate).toLocaleDateString('id-ID', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric'
                     }) }
                     </p>
                  }
                  selectsStart
               />
               <p className="text-slate-400">-</p>
               <DatePicker
                  selected={ toDate }
                  startDate={ fromDate }
                  endDate={ toDate }
                  minDate={ fromDate }
                  onChange={ (d: any) => {
                     setToDate(d)
                  }}
                  customInput= { 
                     <p className="text-sm mx-2 text-slate-400">
                        { new Date(toDate).toLocaleDateString('id-ID', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric'
                     }) }
                     </p>
                  }
                  selectsEnd
               /> 
               <ChevronDown className="w-[1.5rem] h-[1.5rem] text-slate-400"/>
            </div>
            { billingStore.billing_all?.length > 0 && (
               <ButtonLoading 
                  title="Excel"
                  Icon={ Download }
                  buttonStyle="bg-green-500 border-green-400 hover:bg-green-400"
                  onClick={ () => FetchDownloadExcel() }
                  loading={ billingStore.excel_loading }
               />
            )}
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
                                                   }).slice(0, -3) }
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
         <div className="my-4 mx-4">
            <Pagination  
               current={ billingStore.all_filter.page }
               totalPage={ billingStore.all_filter.lastPage }
               onChangeValue={ (val) => {
                  billingStore.setFilterAll({ page: val })
                  FetchAllBilling(); 
               }}
            />
         </div>
      </div>
   )
}
