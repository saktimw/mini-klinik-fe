import { BarChartBig, CalendarDaysIcon, ClipboardEdit, FileSpreadsheet, Filter, Save, Search, Stethoscope, Syringe, Users2 } from "lucide-react";

const getData = async () => {
   const res = await fetch('https://jsonplaceholder.typicode.com/users');
   const data = await res.json();
   
   return data;
}

export default async function Billing() {
   const data = await getData();
   return(
      <>
         <div className="w-full flex gap-2 flex-nowrap">
            <div className="lg:w-2/12">
               <div className="base-card">
                  {/* filter */}
                  <div className="px-1.5 py-1">
                     <div className="flex gap-3 items-center text-main">
                        <Filter className="w-[1.2rem]"/>
                        <p className="capitalize font-semibold">Filter</p>
                     </div>
                     <div className="border-b border-b-white-stroke py-1.5"></div>
                     <div className="flex flex-col gap-4 mt-2.5 mb-3.5">
                        {/* tanggal */}
                        <div>
                           <p className="text-sm text-secondary-typo">Rentang Waktu</p>
                           <div className="mx-3 mt-1">
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
                           <div className="mx-3 mt-3">
                              <div className="base-checkbox-wrap">
                                 <input type="checkbox" className="base-input-checkbox"/>
                                 <label htmlFor="a" className="base-label-checkbox" >Belum bayar</label>
                              </div>
                              <div className="base-checkbox-wrap">
                                 <input type="checkbox" className="base-input-checkbox" defaultChecked/>
                                 <label htmlFor="a" className="base-label-checkbox">Lunas</label>
                              </div>
                              <div className="base-checkbox-wrap">
                                 <input type="checkbox" className="base-input-checkbox" />
                                 <label htmlFor="a" className="base-label-checkbox">Hutang</label>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div className="lg:w-10/12 base-card">
               <div className="lg:w-9/12 mx-auto">
                  <div className="flex py-3 border-b border-white-stroke mb-3">
                     <Search className="w-[1.2rem] h-[1.2rem]"/>
                     <input type="text" className="ml-3 w-full outline-none text-md placeholder:text-md focus:outline-none rounded-md" placeholder="Ketik nama pasien..."/>
                  </div>
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
                           data.map((items: any) => (
                              <tr key={ items.id } className="hover">
                                 <td className="text-center">
                                    <p className="font-normal">10 November 2023</p>
                                 </td>
                                 <td className={`font-semibold -tracking-[-0.015rem] ${Number(items.id) % 3 === 0 ? 'text-pink-500' : 'text-main' }`}>{ items.name }</td>
                                 <td>{` ${items.address.street}, ${items.address.city}`}</td>
                                 <td className="text-center">
                                    <p className="text-right">
                                       <span className="text-[0.950rem] font-medium">
                                          { (Math.round(Math.random() * 10) * 2300).toLocaleString('id-ID', { 
                                             style: 'currency',
                                             currency: 'IDR'
                                           }) }
                                       </span>
                                    </p>
                                 </td>
                                 <td className="text-left">
                                    <div className={`inline-block rounded-full px-2.5 ${items.id === 3 ? 'bg-slate-200' : 'bg-green-300'} text-green-700 font-medium`}>{ items.id === 3 ? 'Belum bayar' : 'Lunas' }</div>
                                 </td>
                              </tr>
                           ))
                        }
                     </tbody>
                  </table>
               </div>
            </div>
         </div>
      </>
   )
}