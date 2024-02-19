"use client"
import { SearchIcon } from 'lucide-react';
import { SearchProps } from '~/shared/types/types';

export default function Search({ 
   onEnter, placeholder
}: SearchProps) {

   return (
      <div className="flex py-3 border-b border-white-stroke mb-3">
         <SearchIcon className="w-[1.2rem] h-[1.2rem]" />
         <input type="text" 
            className="ml-3 w-full outline-none text-md placeholder:text-sm placeholder:tex focus:outline-none rounded-md" 
            placeholder={ placeholder }
            onKeyDown={(e: any) => e.key === "Enter" && onEnter(e.target.value) }
         />
      </div> 
   )
}
