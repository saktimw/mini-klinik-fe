import { create } from "zustand";
import { PemeriksaanActions, PemeriksaanState } from "~/shared/types/pemeriksaan_page";

const initialState: PemeriksaanState = {
   kunjungan_all: [],
   all_filter: {
      page: 1,
      perPage: 7,
      total: 0,
      lastPage: 0,
      keyword: "",
      tanggal: new Date().toLocaleDateString('fr-CA')
   },
   all_loading: false,
   pemeriksaan_id: undefined,
   ttv_id: null,
   resume_id: null,
   obat_id: null,
   billing_id: null
}

export const usePemeriksaanStore = create<PemeriksaanState & PemeriksaanActions>((set, get) => ({
   ...initialState,
   setFilterAll: (filter) => set({ 
      all_filter: { ...get().all_filter, ...filter } 
   }),
   setKunjunganAll: (data) => set({
      kunjungan_all: data
   }),
   setLoading: (loading) => set({ all_loading: loading }),
   setPemeriksaanID: (data) => set({ pemeriksaan_id: data }),
   setTtvID: (data) => set({ ttv_id: data }),
   setResumeID: (data) => set({ resume_id: data }),
   setObatID: (data) => set({ obat_id: data }),
   setBillingID: (data) => set({ billing_id: data }),
   resetFilter: () => set({
      all_filter: initialState.all_filter
   }),
   resetFilterExceptTanggal: (tanggal) => set({
      all_filter: { 
         ...initialState.all_filter, 
         tanggal: tanggal
      }
   }),
   resetPemeriksaan: () => set({
      ttv_id: null,
      resume_id: null,
      obat_id: null,
      billing_id: null,
   })
}))