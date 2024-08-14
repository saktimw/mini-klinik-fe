import { Billing } from "./billing"
import { Kunjungan } from "./kunjungan"
import { Pasien } from "./pasien"
import { PemeriksaanResume, PemeriksaanTTV, PemeriksaanAlergi } from "./pemeriksaan"

export interface BaseFilter {
   page: number,
   perPage: number,
   total: number,
   lastPage: number,
   keyword: string,
   tanggal?: string
}

export interface HistoryDetail {
   resume: PemeriksaanResume,
   ttv: PemeriksaanTTV
}

export interface KunjunganAll {
   pasien: Pasien;
   billing: Billing;
   kunjungan: Kunjungan;
}

export interface PemeriksaanState {
   kunjungan_all: KunjunganAll[];
   all_filter: BaseFilter;
   all_loading: boolean;
   pemeriksaan_id: KunjunganAll | undefined;
   ttv_id: PemeriksaanTTV | null;
   resume_id: PemeriksaanResume | null;
   billing_id: Billing | null;
   alergi_id: PemeriksaanAlergi | null;
   all_history: any[] | undefined
   history_id: any | null;
   history_detail: HistoryDetail | undefined
}

export interface PemeriksaanActions {
   setFilterAll: (data: Object) => void;
   setKunjunganAll: (data: any) => void;
   setLoading: (loading: boolean) => void;
   setPemeriksaanID: (id: any) => void;
   setTtvID: (data: any) => void;
   setResumeID: (data: any) => void;
   setAlergiID: (data: any) => void;
   setBillingID: (data: any) => void;
   setHistoryAll: (data: any) => void;
   setHistoryID: (data: any) => void;
   setHistoryDetail: (data: any) => void;
   resetPemeriksaan: () => void;
   resetFilter: () => void;
   resetFilterExceptTanggal: (d?: any) => void;
   reset: () => void;
}