"use client"
import { useEffect, useState } from "react";
import SelectOption from "~/components/atoms/SelectOption";
import { onSelectHistory } from "~/controllers/pemeriksaan";
import { usePemeriksaanStore } from "~/stores/pemeriksaan_store";

export default function PasienHistory() {

	const pemeriksaanStore = usePemeriksaanStore();

	return (
		<div className="w-full base-card">
			<div className="relative px-2.5 py-1.5">
				<p className="pl-5 pr-10 py-1 absolute -left-2 -top-2 bg-white-stroke z-12 font-medium text-slate-500 rounded-br-full">Riwayat Pasien</p>
				<div className="mt-7">
					{ !pemeriksaanStore.all_history 
						? ( <p className="py-4 text-sm text-center">Tidak ada riwayat pemeriksaan</p> )
						: (	
							<div>
								<SelectOption
									options={ pemeriksaanStore.all_history }
									placeholder="Pilih riwayat pasien"
									defaultValue={ pemeriksaanStore.history_id }
									onChange={(item: any) => onSelectHistory(item)}
								/>
								<div className="mt-4 grid grid-cols-3 grid-rows-2 gap-1 justify-around">
									<div>
										<small className="block text-slate-400">Tensi</small>
										<small className="font-semibold text-secondary-typo">{` ${ pemeriksaanStore.history_detail?.ttv?.tensi_sistole ?? "-" } / ${ pemeriksaanStore.history_detail?.ttv?.tensi_diastole ?? "-" } `}</small>
									</div>
									<div>
										<small className="block text-slate-400">Suhu</small>
										<small className="font-semibold text-secondary-typo">{ pemeriksaanStore.history_detail?.ttv?.suhu ?? "-" } &#8451;</small>
									</div>
									<div>
										<small className="block text-slate-400">SPO2</small>
										<small className="font-semibold text-secondary-typo">{ pemeriksaanStore.history_detail?.ttv?.spo2 ?? "-" }</small>
									</div>
									<div>
										<small className="block text-slate-400">Tinggi</small>
										<small className="font-semibold text-secondary-typo">{ pemeriksaanStore.history_detail?.ttv?.tinggi ?? "-" } Cm</small>
									</div>
									<div>
										<small className="block text-slate-400">Berat</small>
										<small className="font-semibold text-secondary-typo">{ pemeriksaanStore.history_detail?.ttv?.berat ?? "-" } Kg</small>
									</div>
								</div>
								<hr className="border-white-stroke my-1.5"/>
								<div>
									<small className="block text-slate-400">Keluhan : </small>
									<p className="text-sm font-medium text-secondary-typo leading-snug">{ pemeriksaanStore.history_detail?.resume?.keluhan ?? "-" }</p>
								</div>
								<hr className="border-white-stroke my-1.5"/>
								<div>
									<small className="block text-slate-400">Diagnosis : </small>
									<p className="text-sm font-medium text-secondary-typo leading-snug">{ pemeriksaanStore.history_detail?.resume?.diagnosis ?? "-" }</p>
								</div>
								<hr className="border-white-stroke my-1.5"/>
								<div>
									<small className="block text-slate-400">Pemeriksaan Fisik : </small>
									<p className="text-sm font-medium text-secondary-typo leading-snug">{ pemeriksaanStore.history_detail?.resume?.pemeriksaan_fisik ?? "-" }</p>
								</div>
								<hr className="border-white-stroke my-1.5"/>
								<div>
									<small className="block text-slate-400">Resep Obat : </small>
									<p className="text-sm font-medium text-secondary-typo leading-snug">{ pemeriksaanStore.history_detail?.resume?.resep_obat ?? "-" }</p>
								</div>
								<hr className="border-white-stroke my-1.5"/>
								<div>
									<small className="block text-slate-400">Edukasi : </small>
									<p className="text-sm font-medium text-secondary-typo leading-snug">{ pemeriksaanStore.history_detail?.resume?.edukasi ?? "-" }</p>
								</div>
							</div>
						)
					}				
				</div>
			</div>
		</div>
	)
}
