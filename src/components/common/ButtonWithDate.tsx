import { CalendarDays } from 'lucide-react';
import { forwardRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { ButtonDateProps } from '~/shared/types/types';

const ButtonWithDate = ({ onChange }: ButtonDateProps) => {
   const [date, setDate] = useState(new Date());
   return (
      <DatePicker 
         selected={ date }
         onChange={ (d: any) => {
            setDate(d);
            onChange(d);
         }}
         customInput= { 
            <button className="group p-1.5 border border-secondary-typo rounded-md hover:cursor-pointer hover:border-main">
               <CalendarDays className="w-[1.1rem] h-[1.1rem] text-secondary-typo group-hover:text-main" />
            </button>
         }
      />
   )
}

export default ButtonWithDate;