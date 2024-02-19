"use client"
import { Syringe, Users2 } from "lucide-react";
import ButtonIcon from "~/components/atoms/ButtonIcon";
import ButtonWithConfirm from "~/components/common/ButtonWithConfirm";
import Pagination from "~/components/common/Pagination";

export default function Home() {
   return (
      <>
         <div className="w-full h-screen flex justify-center items-center">
            <div className="stats shadow">
               <div className="stat">
                  <div className="stat-figure text-orange-400">
                     <Users2 className="w-10 h-10"/>
                  </div>
                  <div className="stat-title">Pasien Hari ini</div>
                  <div className="stat-value text-orange-400">0</div>
                  <div className="stat-desc">Jumlah pasien baru hari ini</div>
               </div>
               <div className="stat">
                  <div className="stat-figure text-teal-400">
                     <Syringe className="w-10 h-10" />
                  </div>
                  <div className="stat-title">Kunjungan Hari ini</div>
                  <div className="stat-value text-teal-500">0</div>
                  <div className="stat-desc">Jumlah kunjungan pasien hari ini</div>
               </div>
               <div className="stat">
                  <div className="stat-figure text-main">
                     <Users2 className="w-10 h-10"/>
                  </div>
                  <div className="stat-title">Total Pasien</div>
                  <div className="stat-value text-main">0</div>
                  <div className="stat-desc">Jumlah pasien yang terdaftar</div>
               </div>
               <div className="stat">
                  <div className="stat-figure text-pink-500">
                     <Syringe className="w-10 h-10" />
                  </div>
                  <div className="stat-title">Total Kunjungan</div>
                  <div className="stat-value text-pink-500">0</div>
                  <div className="stat-desc">Jumlah semua kunjungan</div>
               </div>
            </div>
         </div>
      </>
   )
}