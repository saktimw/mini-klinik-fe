import { create } from "zustand";
import { BillingState, BillingActions } from "~/shared/types/billing_page";

const initialState: BillingState = {
   billing_all: [],
   all_filter: {
      page: 1,
      perPage: 10,
      total: 0,
      lastPage: 0,
      keyword: "",
   },
   all_loading: false,
   excel_loading: false
}

export const useBillingStore = create<BillingState & BillingActions>((set, get) => ({
   ...initialState,
   setFilterAll: (filter) => set({ 
      all_filter: { ...get().all_filter, ...filter } 
   }),
   setBillingAll: (data) => set({
      billing_all: data
   }),
   setLoading: (loading) => set({ all_loading: loading }),
   setExcelLoading: (loading) => set({ excel_loading: loading }),
   resetFilter: () => set({
      all_filter: initialState.all_filter
   }),
}))