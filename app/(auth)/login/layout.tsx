import ToastifyContainer from "~/components/atoms/ToastifyContainer";

export default function BaseLayout({ children }: { children: React.ReactNode }) {
   return (
      <>
         <ToastifyContainer />
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/5 h-3/4 mx-auto my-auto shadow-xl rounded-xl bg-white-card overflow-clip">
            { children }
         </div>
      </>
   )
}