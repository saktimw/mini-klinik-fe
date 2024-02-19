import PasienInfo from './_contents/pasien_info';
import KunjunganList from './_contents/kunjungan_list';
import FormTTV from './_contents/form_ttv';
import FormResume from './_contents/form_resume';
import FormResep from './_contents/form_resep';
import FormBilling from './_contents/form_billing';

export default function Pemeriksaan() {
  
  return (
    <>
        <div className="w-full lg:w-3/12 mr-2">
          <PasienInfo />
          <KunjunganList />
        </div>
        <div className="w-full lg:w-6/12 lg:flex flex-col gap-y-2 mr-2">
          <FormTTV />
          <FormResume />
        </div>
        <div className="w-full lg:flex flex-col gap-y-2 lg:w-3/12">
          {/* Resep Obat */}
          <FormResep />
          <FormBilling />
        </div>
    </>
  )
}
