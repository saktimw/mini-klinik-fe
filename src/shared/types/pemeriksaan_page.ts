import { Billing } from "./billing"
import { Kunjungan } from "./kunjungan"
import { Pasien } from "./pasien"
import { Obat, PemeriksaanResume, PemeriksaanTTV } from "./pemeriksaan"

export interface BaseFilter {
   page: number,
   perPage: number,
   total: number,
   lastPage: number,
   keyword: string,
   tanggal?: string
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
   obat_id: Obat | null
   billing_id: Billing | null
}

export interface PemeriksaanActions {
   setFilterAll: (data: Object) => void;
   setKunjunganAll: (data: any) => void;
   setLoading: (loading: boolean) => void;
   setPemeriksaanID: (id: any) => void;
   setTtvID: (data: any) => void;
   setResumeID: (data: any) => void;
   setObatID: (data: any) => void;
   setBillingID: (data: any) => void;
   resetPemeriksaan: () => void;
   resetFilter: () => void;
   resetFilterExceptTanggal: (d?: any) => void;
}