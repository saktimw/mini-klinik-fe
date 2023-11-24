import { ClipboardEdit, Save, Search, Stethoscope, Syringe, Users2 } from "lucide-react";

const getData = async () => {
   const res = await fetch('https://jsonplaceholder.typicode.com/users');
   const data = await res.json();

   return data;
}

export default async function Pasien() {
   const data = await getData();
   
   return(
      <div className="w-full flex gap-2 flex-nowrap">
         <div className="lg:w-3/12 base-card lg:flex lg:flex-col gap-2 order-2">
            <div role="tablist" className="tabs">
               <a role="tab" className="tab tab-active bg-slate-100 rounded-md">Statistik</a>
               <a role="tab" className="tab">Form Pasien</a>
            </div>
            <hr className="my-0.5 border-b border-b-slate-50" />
            {/* statistik */}
            <div className="flex flex-col gap-3">
               <div className="stats shadow w-full">
                  <div className="stat">
                     <div className="stat-figure text-orange-400">
                        <Users2 className="w-10 h-10"/>
                     </div>
                     <div className="stat-title">Pasien Hari ini</div>
                     <div className="stat-value text-orange-400">7</div>
                     <div className="stat-desc">Jumlah pasien baru hari ini</div>
                  </div>
               </div>
               <div className="stats shadow w-full">
                  <div className="stat">
                     <div className="stat-figure text-teal-400">
                        <Syringe className="w-10 h-10" />
                     </div>
                     <div className="stat-title">Kunjungan Hari ini</div>
                     <div className="stat-value text-teal-500">25</div>
                     <div className="stat-desc">Jumlah kunjungan pasien hari ini</div>
                  </div>
               </div>
               <div className="stats shadow w-full">
                  <div className="stat">
                     <div className="stat-figure text-main">
                        <Users2 className="w-10 h-10"/>
                     </div>
                     <div className="stat-title">Total Pasien</div>
                     <div className="stat-value text-main">2,500</div>
                     <div className="stat-desc">Jumlah pasien yang terdaftar</div>
                  </div>
               </div>
               <div className="stats shadow w-full">
                  <div className="stat">
                     <div className="stat-figure text-pink-500">
                        <Syringe className="w-10 h-10" />
                     </div>
                     <div className="stat-title">Total Kunjungan</div>
                     <div className="stat-value text-pink-500">5,400</div>
                     <div className="stat-desc">Jumlah semua kunjungan</div>
                  </div>
               </div>
            </div>
            {/* form pasien */}
            <div className="hidden px-2.5">
               <form>
                  <div className="flex flex-col gap-3 my-2.5">
                     <div>
                        <p className="base-input-label">nama lengkap</p>
                        <input type="text" className="base-input" />
                     </div>
                     <div className="flex gap-4">
                        <div className="base-radio-wrap">
                           <input type="radio" className="base-input-radio" name="jekel" checked />
                           <span className="base-label-radio">laki-laki</span>
                        </div>
                        <div className="base-radio-wrap">
                           <input type="radio" className="base-input-radio" name="jekel" />
                           <label className="base-label-radio">perempuan</label>
                        </div>
                     </div>
                     <div>
                        <p className="base-input-label">tempat lahir</p>
                        <input type="text" className="base-input" />
                     </div>
                     <div>
                        <p className="base-input-label">tanggal lahir</p>
                        <input type="date" className="base-input" />
                     </div>
                     <div>
                        <p className="base-input-label">alamat</p>
                        <textarea className="base-input" rows={3}></textarea>
                     </div>
                  </div>
                  <button className="base-button-icon w-full">
                     <Save className="button-icon"/>
                     simpan
                  </button>
               </form>
            </div>
         </div>
         <div className="lg:w-9/12 base-card order-1">
            <div className="w-9/12 flex mx-auto py-3 border-b border-white-stroke mb-3">
               <Search className="w-[1.2rem] h-[1.2rem]"/>
               <input type="text" className="ml-3 w-full outline-none text-md placeholder:text-md focus:outline-none rounded-md" placeholder="Ketik nama pasien..."/>
            </div>
            <div className="overflow-x-auto scrollbar">
               <table className="table table-sm">
                  <thead>
                     <tr className="bg-base-background text-center">
                        <th></th>
                        <th>Nama Pasien</th>
                        <th>TTL</th>
                        <th>Alamat</th>
                        <th>Telpon</th>
                     </tr>
                  </thead>
                  <tbody>
                     {
                        data.map((items: any) => (
                           <tr key={ items.id } className="hover">
                              <td className="text-center flex gap-1.5">
                                 <button className="tooltip tooltip-right group p-1.5 border border-main rounded-md hover:cursor-pointer hover:border-main" data-tip="ubah data">
                                    <ClipboardEdit className="w-[1.1rem] h-[1.1rem] text-secondary-typo group-hover:text-main" />
                                 </button>
                                 <button className="tooltip tooltip-right group p-1.5 border border-green-500 rounded-md hover:cursor-pointer hover:border-green-500" data-tip="periksa">
                                    <Stethoscope className="w-[1.1rem] h-[1.1rem] text-secondary-typo group-hover:text-green-500" />
                                 </button>
                              </td>
                              <td className="font-semibold -tracking-[-0.015rem]">{ items.name }</td>
                              <td>
                                 <p className="font-medium">{`${items.id} November 2023`}</p>
                                 <p className="font-semibold text-sm text-neutral-400 opacity-90">Sulawesi Selatan</p>
                              </td>
                              <td>{` ${items.address.street}, ${items.address.city}`}</td>
                              <td>{ items.phone }</td>
                           </tr>
                        ))
                     }
                  </tbody>
               </table>
            </div>
         </div>
      </div>
   )
}