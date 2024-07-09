import PasienList from "./_contents/pasien_list";
import FormPasien from "./_contents/form_pasien";

export default async function Pasien() {   
   return(
      <div className="w-full h- flex gap-2 flex-nowrap">
         <div className="lg:w-3/12 base-card lg:flex lg:flex-col gap-2 order-2">
            <FormPasien />
         </div>
         <div className="lg:w-9/12 base-card order-1">
            <PasienList />
         </div>
      </div>
   )
}