"use client"
import { useState, useEffect } from "react";
import { Syringe, Users2 } from "lucide-react";
import ButtonIcon from "~/components/atoms/ButtonIcon";
import ButtonWithConfirm from "~/components/common/ButtonWithConfirm";
import { Pagination } from "~/components/common/Pagination";
import { kunjungan_statistik, pasien_statistik } from "~/models/statistik";

export default function Home() {

   const [statistikCount, setStatistikCount] = useState<{ [k: string]: any } | undefined>(undefined);
   async function loadStatistik() {
      try {
         const kunjungan = await kunjungan_statistik();
         const pasien = await pasien_statistik();

         if (kunjungan.data && pasien.data) {
            setStatistikCount({
               kunjungan: kunjungan.data,
               pasien: pasien.data,
            })
         }
      } catch (error) {
         console.log(error);
      }
   }

   useEffect(() => {
      loadStatistik();
   }, [])

   return (
      <div className="relative w-full h-screen flex justify-center items-center">
         <div className="stats shadow-sm">
            <div className="stat">
               <div className="stat-figure text-orange-400">
                  <Users2 className="w-10 h-10"/>
               </div>
               <div className="stat-title">Pasien Baru Hari ini</div>
               <div className="stat-value text-orange-400">{ statistikCount ? statistikCount.pasien.perhari : 0 }</div>
               <div className="stat-desc">Jumlah pasien baru hari ini</div>
            </div>
            <div className="stat">
               <div className="stat-figure text-teal-400">
                  <Syringe className="w-10 h-10" />
               </div>
               <div className="stat-title">Kunjungan Hari ini</div>
               <div className="stat-value text-teal-500">{ statistikCount ? statistikCount.kunjungan.perhari : 0 }</div>
               <div className="stat-desc">Jumlah kunjungan pasien hari ini</div>
            </div>
            <div className="stat">
               <div className="stat-figure text-main">
                  <Users2 className="w-10 h-10"/>
               </div>
               <div className="stat-title">Total Pasien</div>
               <div className="stat-value text-main">{ statistikCount ? statistikCount.pasien.total : 0 }</div>
               <div className="stat-desc">Jumlah pasien yang terdaftar</div>
            </div>
            <div className="stat">
               <div className="stat-figure text-pink-500">
                  <Syringe className="w-10 h-10" />
               </div>
               <div className="stat-title">Total Kunjungan</div>
               <div className="stat-value text-pink-500">{ statistikCount ? statistikCount.kunjungan.total : 0 }</div>
               <div className="stat-desc">Jumlah semua kunjungan</div>
            </div>
         </div>
      </div>
   )
}