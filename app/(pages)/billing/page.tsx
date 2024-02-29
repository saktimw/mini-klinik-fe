import BillingFilter from "./_contents/billing_filter";
import BillingList from "./_contents/billing_list";

export default async function Billing() {
   
   return(
      <>
         <div className="w-full flex gap-2 flex-nowrap">
            <div className="lg:w-10/12 lg:mx-auto">
               <BillingList />
            </div>
         </div>
      </>
   )
}