export interface Pasien {
   id?: number;
   nama_lengkap: string;
   alamat: string;
   telp: string;
   jns_kelamin: 'L' | 'P';
   tempat_lahir: string;
   tanggal_lahir: Date;
   nomer_rm?: string;
   aktif?: boolean;
}