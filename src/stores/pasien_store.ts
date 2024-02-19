import { create } from "zustand";
import { PasienActions, PasienState } from "~/shared/types/pasien_page";

const initialState: PasienState = {
   pasien_all: [],
   all_loading: false,
   all_filter: {
      page: 1,
      perPage: 10,
      total: 0,
      lastPage: 0,
      keyword: ""
   },
   id: 0,
   pasien_id: undefined,
   form_action: 'save'
}

export const usePasienStore = create<PasienState & PasienActions>((set, get) => ({
   ...initialState,
   setFilterAll: (filter) => set({
      all_filter: { ...get().all_filter, ...filter }
   }),
   setPasienAll: (data) => set({ 
      all_loading: false,
      pasien_all: data
   }),
   setID: (id) => set({ id: id }),
   setPasienID: (data) => set({ pasien_id: data }),
   setLoading: (load) => set({ all_loading: load }),
   resetFilter: () => set({ all_filter: initialState.all_filter }),
   setFormAction: (act) => set({ form_action: act })
}))