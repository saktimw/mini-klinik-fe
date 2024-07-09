export interface PemeriksaanTTV {
   id?: number;
   tensi_sistole: string;
   tensi_diastole: string;
   suhu: string;
   tinggi: string;
   berat: string;
   spo2: string;
}

export interface PemeriksaanResume {
   id?: number;
   diagnosis: string;
   keluhan: string;
   pemeriksaan_fisik: string;
   resep_obat: string;
   edukasi: string;
}

export interface Obat {
   id?: number;
   obat: string;
}