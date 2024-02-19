export interface PemeriksaanTTV {
   id?: number;
   tensi_sistole: string;
   tensi_diastole: string;
   suhu: string;
   tinggi: string;
   berat: string;
   keluhan: string;
}

export interface PemeriksaanResume {
   id?: number;
   anamnesis: string;
   pemeriksaan_fisik: string;
   tata_laksana: string;
   edukasi: string;
}

export interface Obat {
   id?: number;
   obat: string;
}