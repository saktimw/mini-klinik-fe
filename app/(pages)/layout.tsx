import ToastifyContainer from "~/components/atoms/ToastifyContainer";
import Header from "~/components/widget/Header";
import Sidebar from "~/components/widget/Sidebar";

export default function BaseLayout({ children }: { children: React.ReactNode }) {
   
   return (
      <>
         <ToastifyContainer />
         <Sidebar />
         <div className="lg:max-h-screen lg:h-full sm:w-full lg:w-full overflow-x-hidden overflow-y-auto scrollbar">
            <Header />
            <div className="lg:flex justify-start p-2 ">
               { children }
            </div>
         </div>
      </>
   )
}
