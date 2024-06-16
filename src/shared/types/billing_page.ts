import { Billing } from '~/shared/types/billing';
import { Pasien } from '~/shared/types/pasien';
import { Kunjungan } from '~/shared/types/kunjungan';

export interface BaseFilter {
   page: number,
   perPage: number,
   total: number,
   lastPage: number,
   keyword: string,
   tanggal?: Date
   sampai?: Date
}

export interface BillingAll {
   pasien: Pasien;
   billing: Billing;
   kunjungan: Kunjungan;
}

export interface BillingState {
   billing_all: BillingAll[];
   all_loading: boolean;
   excel_loading: boolean;
   all_filter: BaseFilter
}

export interface BillingActions {
   setFilterAll: (data: Object) => void;
   setBillingAll: (data: any) => void;
   setLoading: (loading: boolean) => void;
   setExcelLoading: (loading: boolean) => void;
   resetFilter: () => void;
}