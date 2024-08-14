"use client"
import { UserPlus } from 'lucide-react'
import Link from 'next/link';
import { useEffect } from 'react';
import ButtonWithDate from '~/components/common/ButtonWithDate'
import { Pagination } from '~/components/common/Pagination';
import Search from '~/components/common/Search';
import { FetchAllKunjungan, FetchPemeriksaanID } from '~/controllers/pemeriksaan';
import { usePemeriksaanStore } from '~/stores/pemeriksaan_store'

export default function KunjunganList() {
   const pemeriksaanStore = usePemeriksaanStore();
   
   useEffect(() => {
      FetchAllKunjungan();
   }, [])

   return (
      <div className="grow-0 base-card">
         <div className="px-2.5">
            <div className="flex justify-between gap-3 items-center">
               <Search 
                  onEnter={ (value) => {
                     pemeriksaanStore.setFilterAll({ keyword: value });
                     FetchAllKunjungan(); 
                  }}
                  placeholder="Cari pasien [Enter]" 
               />
               <Link href="/pasien">
                  <button className="tooltip group p-1.5 border border-secondary-typo rounded-md hover:cursor-pointer hover:border-main" data-tip="tambah pasien">
                     <UserPlus className="w-[1.1rem] h-[1.1rem] text-secondary-typo group-hover:text-main" />
                  </button>
               </Link>
            </div>
            <div className="flex my-2.5 justify-between items-center">
               <div className="text-secondary-typo">
                  <p className="inline-block font-semibold text-sm">{ new Date(String(pemeriksaanStore.all_filter?.tanggal)).toLocaleDateString('id-ID', {
                     day: '2-digit',
                     month: 'long',
                     year: 'numeric'
                  }) }</p>
                  <p className="block text-xs">Jumlah kunjungan : { pemeriksaanStore.all_filter.total }</p>
               </div>
               <div className="grow-0">
                  <div className="tooltip" data-tip="tanggal kunjungan">
                     <ButtonWithDate 
                        onChange={ (v) => {
                           pemeriksaanStore.setFilterAll({ tanggal: new Date(v).toLocaleDateString('fr-CA') }) 
                           FetchAllKunjungan();
                        }}
                     />
                  </div>
               </div>
            </div>
            <ul>
               {
                  pemeriksaanStore.all_loading
                  ? (
                     <li className="text-center text-sm my-5">Memuat data...</li>
                  )
                  : pemeriksaanStore.kunjungan_all?.length === 0
                     ? (
                        <li className="text-center text-sm my-5">Data tidak ditemukan</li>
                     )
                     : pemeriksaanStore.kunjungan_all?.map((item: any) => (
                        <li 
                           key={ item.kunjungan.id } 
                           className={`${ item.kunjungan.id === pemeriksaanStore.pemeriksaan_id?.kunjungan.id ? 'bg-teal-100 border-teal-300' : 'bg-base-background border-white-stroke' } border hover:border-teal-400 rounded-md px-2 py-1.5 mb-2 hover:cursor-pointer`}
                           onClick={ () => {
                              pemeriksaanStore.setPemeriksaanID(item);
                              FetchPemeriksaanID() 
                           }}
                        >
                           <p className="text-sm font-medium text-ellipsis leading-4 mb-1">{ item.pasien.nama_lengkap }</p>
                           <p className="text-xs">{ item.pasien.alamat }</p>
                        </li>
                     )) 
               }
            </ul>
            {
               !pemeriksaanStore.all_loading && (
                  <Pagination  
                     current={ pemeriksaanStore.all_filter.page }
                     totalPage={ pemeriksaanStore.all_filter.lastPage }
                     onChangeValue={ (val) => {
                        pemeriksaanStore.setFilterAll({ page: val })
                        FetchAllKunjungan(); 
                     }}
                  />
               )
            }
         </div>
      </div>
   )
}
