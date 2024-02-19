"use client"
import { ClipboardEdit, Stethoscope } from 'lucide-react';
import { useEffect } from 'react';
import { FetchAllPasien, addKunjungan } from '~/controllers/pasien';
import { usePasienStore } from '~/stores/pasien_store';
import Search from '~/components/common/Search';
import Pagination from '~/components/common/Pagination';
import ButtonWithConfirm from '~/components/common/ButtonWithConfirm';

export default function PasienList() {
   
   const pasienStore = usePasienStore();

   useEffect(() => {
      pasienStore.resetFilter();
      FetchAllPasien();
   }, [])
   
   return (
      <>
         <div className="w-9/12 mx-auto">
            <Search 
               onEnter={ (value) => {
                  pasienStore.setFilterAll({ keyword: value });
                  FetchAllPasien(); 
               }}
               placeholder="Ketik untuk mencari pasien [Enter]" 
            />
         </div>
         <div className="overflow-x-auto scrollbar">
            <table className="table table-sm">
               <thead>
                  <tr className="bg-base-background text-center">
                     <th></th>
                     <th>Nama Pasien</th>
                     <th> L / P</th>
                     <th>TTL</th>
                     <th>Alamat</th>
                     <th>Telpon</th>
                  </tr>
               </thead>
               <tbody>
                  {
                     pasienStore.all_loading
                     ? (
                        <tr key="loading" className="hover">
                           <td className="text-center" colSpan={ 5 }>Memuat data...</td>
                        </tr>
                     )
                     : 
                     pasienStore.pasien_all?.length === 0
                        ? (
                           <tr key="not-found" className="hover">
                              <td className="text-center" colSpan={ 5 }>Data tidak ditemukan</td>
                           </tr>
                        )
                        : pasienStore.pasien_all?.map((items: any) => (
                        <tr key={ items.id } className="hover">
                           <td className="text-center flex gap-2">
                              <button className="tooltip tooltip-right group p-1.5 border border-main rounded-md hover:cursor-pointer hover:border-main" data-tip="ubah data" onClick={() => {
                                 pasienStore.setPasienID(items);
                                 pasienStore.setFormAction('update');
                              }}>
                                 <ClipboardEdit className="w-[1.1rem] h-[1.1rem] text-secondary-typo group-hover:text-main" />
                              </button>
                              <ButtonWithConfirm
                                 title="Kunjungan"
                                 message={`Masukkan pasien ( ${items.nama_lengkap} ) ke dalam kunjungan hari ini ?`}
                                 action={ (act) => act && addKunjungan() } 
                              >
                                 <button className="tooltip tooltip-right group p-1.5 border border-green-500 rounded-md hover:cursor-pointer hover:border-green-500" data-tip="periksa" onClick={() => pasienStore.setID(items.id) }>
                                    <Stethoscope className="w-[1.1rem] h-[1.1rem] text-secondary-typo group-hover:text-green-500" />
                                 </button>
                              </ButtonWithConfirm>
                           </td>
                           <td className="font-semibold -tracking-[-0.015rem]">
                              <p>{ items.nama_lengkap }</p>
                              <p className="text-xs font-normal tracking-wide text-secondary-typo">{ items.nomer_rm }</p>
                           </td>
                           <td className={`text-center font-bold ${items.jns_kelamin === "L" ? 'text-main' : 'text-pink-500'}`}>{ items.jns_kelamin }</td>
                           <td>
                              <p className="font-medium">{ new Date(items.tanggal_lahir).toLocaleDateString('id-ID', {
                                 day: '2-digit',
                                 month: 'long',
                                 year: 'numeric'
                              }) }</p>
                              <p className="font-semibold text-sm text-neutral-400 opacity-90">{ items.tempat_lahir }</p>
                           </td>
                           <td>{ items.alamat }</td>
                           <td>{ items.telp }</td>
                        </tr>
                     ))
                  }
               </tbody>
            </table>
         </div>
         <Pagination  
            current={ pasienStore.all_filter.page }
            totalPage={ pasienStore.all_filter.lastPage }
            onChangeValue={ (val) => {
               pasienStore.setFilterAll({ page: val })
               FetchAllPasien(); 
            }}
         />
      </>  
   )
}
