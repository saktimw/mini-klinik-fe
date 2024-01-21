import { Cake, CalendarDays, ChevronLeft, ChevronRight, FormInput, MapPinned, Phone, Save, Search, UserPlus} from 'lucide-react';

export default function Pemeriksaan() {
  return (
    <>
        <div className="w-full lg:w-3/12 mr-2">
          <div className="mb-2 base-card border-pink-300">
            <div className="px-2.5 py-1">
              <div className="flex-column"> 
                {/* Nama */}
                <div className="flex items-center">
                  <div className="flex-none mr-2.5">
                    <FormInput className="w-[1.1rem] text-slate-400"/>
                  </div>
                  <p className="flex-1 text-sm font-semibold text-pink-500">Cintya Nada Syifa Alaina Rayanza</p>
                </div>
                <hr className="border-white-stroke my-1.5"/>
                {/* Alamat */}
                <div className="flex items-center">
                  <div className="flex-none mr-2.5">
                    <MapPinned className="w-[1.1rem] text-slate-400"/>
                  </div>
                  <p className="flex-1 text-sm font-normal">Jl. Pahlawan Diponegoro No.250, Wonosobo 167905</p>
                </div>
                <hr className="border-white-stroke my-1.5"/>
                {/* TTL */}
                <div className="flex items-center">
                  <div className="flex-none mr-2.5">
                    <Cake className="w-[1.1rem] text-slate-400"/>
                  </div>
                  <p className="flex-1 text-sm">Jakarta, 10 November 2001</p>
                </div>
                <hr className="border-white-stroke my-1.5"/>
                {/* Telepon */}
                <div className="flex items-center">
                  <div className="flex-none mr-2.5">
                    <Phone className="w-[1.1rem] text-slate-400"/>
                  </div>
                  <p className="flex-1 text-sm">+62 857-0773-100</p>
                </div>
              </div>
            </div>
          </div>
          {/* List Pasien */}
          <div className="grow-0 base-card">
            <div className="px-2.5">
              <div className="flex justify-between items-center">
                <div className="flex py-2 border-b border-white-stroke">
                  <Search className="w-[1.2rem] h-[1.2rem]"/>
                  <input type="text" className="ml-3 w-full outline-none text-sm placeholder:text-sm focus:outline-none rounded-md" placeholder="cari pasien..."/>
                </div>
                <button className="group p-1.5 border border-secondary-typo rounded-md hover:cursor-pointer hover:border-main">
                  <UserPlus className="w-[1.1rem] h-[1.1rem] text-secondary-typo group-hover:text-main" />
                </button>
              </div>
              <div className="flex my-2.5 justify-between items-center">
                <div className="text-secondary-typo">
                  <p className="inline-block font-semibold text-sm">10 November 2023</p>
                  <p className="block text-xs">Jumlah pasien : 50</p>
                </div>
                <button className="group p-1.5 border border-secondary-typo rounded-md hover:cursor-pointer hover:border-main">
                  <CalendarDays className="w-[1.1rem] h-[1.1rem] text-secondary-typo group-hover:text-main" />
                </button>
              </div>
              <ul>
                <li className="bg-base-background border border-white-stroke hover:border-teal-400 rounded-md px-2 py-1.5 mb-2 hover:cursor-pointer">
                  <p className="text-sm font-medium text-ellipsis leading-4 mb-1">Muhammad Ahmad somat</p>
                  <p className="text-xs">Jl. Kutilang Kenari No.10</p>
                </li>
                <li className="bg-teal-100 border border-teal-200 hover:border-teal-400 rounded-md px-2 py-1.5 mb-2 hover:cursor-pointer">
                  <p className="text-sm font-medium text-ellipsis leading-4 mb-1">Cintya nada Syifa Alaina Rayanza</p>
                  <p className="text-xs">Jl. Pahlawan Diponegoro No.250, Wonosobo 167905</p>
                </li>
                <li className="bg-base-background border border-white-stroke hover:border-teal-400 rounded-md px-2 py-2 mb-2 hover:cursor-pointer">
                  <p className="text-sm font-medium text-ellipsis leading-4 mb-1">Muhammad Ahmad somat</p>
                  <p className="text-xs">Jl. Matahari Kenari No.104</p>
                </li>
                <li className="bg-base-background border border-white-stroke hover:border-teal-400 rounded-md px-2 py-2 mb-2 hover:cursor-pointer">
                  <p className="text-sm font-medium text-ellipsis leading-4 mb-1">Sujono Paryono Subono</p>
                  <p className="text-xs">Jl. Kemanapun Asik No.78</p>
                </li>
                <li className="bg-base-background border border-white-stroke hover:border-teal-400 rounded-md px-2 py-2 mb-2 hover:cursor-pointer">
                  <p className="text-sm font-medium text-ellipsis leading-4 mb-1">Kirana Sutina Anana</p>
                  <p className="text-xs">Jl. Penuh Kenangan Dengan No.300</p>
                </li>
              </ul>
              <div className="flex justify-end">
                <button className="group p-1 border border-neutral-400 rounded-md hover:cursor-pointer hover:border-main">
                  <ChevronLeft className="w-[1.1rem] h-[1.1rem] text-neutral-400 group-hover:text-main" />
                </button>
                <div className="w-2" />
                <button className="group p-1 border border-neutral-400 rounded-md hover:cursor-pointer hover:border-main">
                  <ChevronRight className="w-[1.1rem] h-[1.1rem] text-neutral-400 group-hover:text-main" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-6/12 lg:flex flex-col gap-y-2 mr-2">
          {/* TTV */}
          <div className="w-full base-card">
            <div className="relative px-2.5 py-1.5">
              <p className="pl-5 pr-10 py-1 absolute -left-2 -top-2 bg-white-stroke z-12 font-medium text-slate-500 rounded-br-full">Tanda Tanda Vital (TTV)</p>
              <div className="mt-9 grid grid-cols-5 gap-x-2">
                <div className="col-span-2">
                  <p className="base-input-label">Tensi</p>
                  <div className="flex">
                    <input type="text" className="base-input appearance-none"/>
                    <div className="w-2" />
                    <input type="text" className="base-input appearance-none"/>
                  </div>
                </div>
                <div>
                  <p className="base-input-label">suhu (&#8451;)</p>
                  <input type="number" className="base-input"/>
                </div>
                <div>
                  <p className="base-input-label">tinggi (Cm)</p>
                  <input type="number" className="base-input"/>
                </div>
                <div>
                  <p className="base-input-label">berat (Kg)</p>
                  <input type="number" className="base-input"/>
                </div>
                <div className="col-span-full mt-3">
                  <p className="base-input-label">Keluhan Pasien</p>
                  <textarea className="base-input" rows={4}></textarea>
                </div>
              </div>
              <div className="h-1"></div>
              <button className="base-button-icon">
                <Save className="button-icon"/>
                <span>simpan</span>
              </button>
            </div>
          </div>
              {/* Anamnesis */}
          <div className="w-full base-card">
            <div className="relative px-2.5 py-1.5">
              <p className="pl-5 pr-10 py-1 absolute -left-2 -top-2 bg-white-stroke z-12 font-medium text-slate-500 rounded-br-full">Anamnesis</p>
              <div className="mt-9 grid grid-cols-2 grid-rows-2 gap-2">
                <div>
                  <p className="base-input-label">anamnesis</p>
                  <textarea className="base-input" rows={3}></textarea>
                </div>
                <div>
                  <p className="base-input-label">pemeriksaan fisik</p>
                  <textarea className="base-input" rows={3}></textarea>
                </div>
                <div>
                  <p className="base-input-label">tata laksana</p>
                  <textarea className="base-input" rows={3}></textarea>
                </div>
                <div>
                  <p className="base-input-label">edukasi</p>
                  <textarea className="base-input" rows={3}></textarea>
                </div>
              </div>
              <div className="h-1"></div>
              <button className="base-button-icon">
                <Save className="button-icon"/>
                <span>simpan</span>
              </button>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-3/12">
          <div className="w-full base-card">
            <div className="relative px-2.5 py-1.5">
              <p className="pl-5 pr-10 py-1 absolute -left-2 -top-2 bg-white-stroke z-12 font-medium text-slate-500 rounded-br-full">Obat</p>
              <div className="mt-9">
                <div>
                  <p className="base-input-label">Resep Obat</p>
                  <textarea className="base-input" rows={10}></textarea>
                </div>
              </div>
              <div className="h-1"></div>
              <button className="base-button-icon">
                <Save className="button-icon"/>
                <span>simpan</span>
              </button>
            </div>
          </div>
        </div>
    </>
  )
}
