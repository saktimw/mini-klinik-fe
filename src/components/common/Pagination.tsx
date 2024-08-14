import { PaginatonProps } from "~/shared/types/types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ButtonIcon from "../atoms/ButtonIcon";

export function Pagination({
   current = 0,
   totalPage = 0,
   totalData = 0,
   onChangeValue
}: PaginatonProps) {
   if (totalPage === 0) return (<></>)

   let prev, next = false;
   let page = [];
   const maxcol = 5;
   
   let start = Math.max(1, current - Math.floor(maxcol / 2));
   let end = Math.min(totalPage, start + maxcol - 1);
   // jika start pada batas maksimal
   start = Math.max(1, end - maxcol + 1);

   // tampil previous button
   if (current > 1) {
      prev = true;
   }
   // tampil page
   for (let n = Number(start); n <= Number(end); n++ ) {
      page.push(n);
   }
   // tampil next button
   if (current < totalPage) {
      next = true;
   }
   
   return (
      <div className="flex items-center no-wrap">
         <div className="flex gap-1.5">
            <ButtonIcon 
               Icon={ ChevronLeft }
               buttonStyle={ prev ? '' : 'hidden' }
               onClick={() => onChangeValue(current - 1) }
            />
            { page.map((val: number) => (
               <button className={`group p-1 border ${ val === current ? 'bg-main' : 'border-secondary-typo'} rounded-md hover:cursor-pointer hover:border-main`} key={val} onClick={() => onChangeValue(val)} >
                  <span className={`text-md mx-1.5 ${ val === current ? 'text-white group-hover:text-white' : 'text-secondary-typo group-hover:text-main'}`}>{ val }</span>
               </button>
            )) }
            <ButtonIcon 
               Icon={ ChevronRight }
               buttonStyle={ next ? '' : 'hidden' }
               onClick={() => onChangeValue(current + 1) }
            />
         </div>
      </div>
   )
}

export function PaginationInfo({
   current = 0,
   totalPage = 0,
   totalData = 0
}: Pick<PaginatonProps, "totalData" | "totalPage" | "current">) {
   return (
      <div>
         <p className="text-sm font-semibold">Page 
            <span className="text-main"> { current } </span> dari <span className="text-main"> { totalPage } </span>
         </p>
         <p className="text-xs mt-0.5">total data : { totalData }</p>
      </div>
   )
}
