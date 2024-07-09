import PasienInfo from './_contents/pasien_info';
import KunjunganList from './_contents/kunjungan_list';
import FormBilling from './_contents/form_billing';
import FormPemeriksaan from './_contents/form_pemeriksaan';
import { cookies } from 'next/headers';
import { getCookie } from 'cookies-next';
import PasienHistory from './_contents/pasien_history';

export const dynamic = 'force-dynamic'
export const revalidate = 0;
export default function Pemeriksaan() {
  const role = getCookie('xrole', { cookies })
  
  return role && (
    <>
        <div className="w-full lg:w-3/12 mr-2">
          <PasienInfo />
          <KunjunganList />
        </div>
        <div className="w-full lg:w-6/12 lg:flex flex-col gap-y-2 mr-2">
          <FormPemeriksaan role={ String(role) }/>
        </div>
        <div className="w-full lg:flex flex-col gap-y-2 lg:w-3/12">
          {
            role === "dokter" && (
              <>
                <FormBilling />
                <PasienHistory />
              </>
            )
          }
        </div>
    </>
  )
}
