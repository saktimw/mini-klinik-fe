"use client"
import { Cake, FormInput, MapPinned, Phone } from "lucide-react"
import { usePemeriksaanStore } from "~/stores/pemeriksaan_store"

export default function PasienInfo() {
   
   const pemeriksaanStore = usePemeriksaanStore();
   const pasieninfo = pemeriksaanStore.pemeriksaan_id;
   
   return (
      <div className={`mb-2 base-card ${pasieninfo ? (pasieninfo.pasien.jns_kelamin === "P" ? 'border-pink-500' : 'border-main') : 'border-slate-400'}`}>
         <div className="px-2.5 py-1">
            <div className="flex-column"> 
               {/* NIK */}
               <div className="flex items-center">
                  <div className="flex-none mr-2.5">
                     <span className="w-[1.1rem] tracking-wide text-slate-400">ID</span>
                  </div>
                  <p className="flex-1 text-sm">
                     <span className="mr-2 border border-slate tracking-wide rounded px-3 py-1 font-semibold bg-slate-100 text-teal-500">
                        { pasieninfo?.pasien.nomer_rm }
                     </span>
                     <span className="text-slate-400">
                        { pasieninfo?.pasien.nik ?? '-' }
                     </span>
                  </p>
               </div>
               <hr className="border-white-stroke my-1.5"/>
               {/* Nama */}
               <div className="flex items-center">
                  <div className="flex-none mr-2.5">
                     <FormInput className="w-[1.1rem] text-slate-400"/>
                  </div>
                  <p className={`flex-1 text-sm font-semibold ${pasieninfo ? (pasieninfo.pasien.jns_kelamin === "P" ? 'text-pink-500' : 'text-main') : 'text-slate-400'}`}>
                     { pasieninfo?.pasien.nama_lengkap ?? '-' }
                  </p>
               </div>
               <hr className="border-white-stroke my-1.5"/>
               {/* Alamat */}
               <div className="flex items-center">
                  <div className="flex-none mr-2.5">
                     <MapPinned className="w-[1.1rem] text-slate-400"/>
                  </div>
                  <p className="flex-1 text-sm font-normal">
                     { pasieninfo?.pasien.alamat ?? '-' }
                  </p>
               </div>
               <hr className="border-white-stroke my-1.5"/>
               {/* TTL */}
               <div className="flex items-center">
                  <div className="flex-none mr-2.5">
                     <Cake className="w-[1.1rem] text-slate-400"/>
                  </div>
                  <p className="flex-1 text-sm">
                     { pasieninfo 
                        ? (`${pasieninfo.pasien.tempat_lahir}, ${ new Date(pasieninfo.pasien.tanggal_lahir).toLocaleDateString('id-ID', {
                           day: '2-digit',
                           month: 'long',
                           year: 'numeric' 
                        }) }`) 
                        : '-' 
                     }
                  </p>
               </div>
               <hr className="border-white-stroke my-1.5"/>
               {/* Telepon */}
               <div className="flex items-center">
                  <div className="flex-none mr-2.5">
                     <Phone className="w-[1.1rem] text-slate-400"/>
                  </div>
                  <p className="flex-1 text-sm">
                     { pasieninfo?.pasien.telp ?? '-' }
                  </p>
               </div>
            </div>
         </div>
      </div>  
   )
}
