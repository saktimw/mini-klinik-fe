import ToastifyContainer from "~/components/atoms/ToastifyContainer";
import Sidebar from "~/components/widget/Sidebar";

export default function BaseLayout({ children }: { children: React.ReactNode }) {
   return (
      <>
         <ToastifyContainer />
         <Sidebar />
         <div className="lg:max-h-screen lg:h-full sm:w-full lg:w-full lg:flex justify-start p-2 overflow-x-hidden overflow-y-auto scrollbar">
            { children }
         </div>
      </>
   )
}
