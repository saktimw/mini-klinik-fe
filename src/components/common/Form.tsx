"use client"
import { CheckInputProps, InputNumberProps, InputProps, SelectInputProps, TextareaProps } from "~/shared/types/types";
import { Controller, useFormContext } from "react-hook-form";
import SelectOption from "~/components/atoms/SelectOption";
import { twMerge } from "tailwind-merge";

const Input = ({ 
   id, name, title, type, placeholder, 
   focus = false, 
   readonly = false,
   rules = {}
}: InputProps) => {
      const formCtx = useFormContext();
      
   return (
      <div>
         { title && <label htmlFor={`input-id-${id}`} className="base-input-label">{ title }</label> }
         <input 
            type={ type }
            id={`input-id-${id}`}
            className={twMerge(`base-input`, formCtx.formState.errors[name] && 'base-input-error')}
            placeholder={ placeholder }
            readOnly={ readonly }
            autoFocus={ focus }
            { ...formCtx.register(name, rules && rules)}
         />
         { formCtx.formState.errors[name] && 
            <p className="base-error-message">
               { formCtx.formState.errors[name]?.message?.toString() }
            </p> }
      </div>      
   );
}

const InputNumber = ({ 
   id, name, title, placeholder, min, max, step,
   focus = false, 
   readonly = false,
   rules = {}
}: InputNumberProps) => {
      const formCtx = useFormContext();
      
   return (
      <div>
         { title && <label htmlFor={`input-id-${id}`} className="base-input-label">{ title }</label> }
         <input 
            type="number"
            id={`input-id-${id}`}
            className={twMerge(`base-input`, formCtx.formState.errors[name] && 'base-input-error')}
            placeholder={ placeholder }
            readOnly={ readonly }
            autoFocus={ focus }
            min={ min }
            max={ max }
            step={ step }
            { ...formCtx.register(name, rules && rules)}
         />
         { formCtx.formState.errors[name] && 
            <p className="base-error-message">
               { formCtx.formState.errors[name]?.message?.toString() }
            </p> }
      </div>      
   );
}

const TextareaInput = ({ 
   id, name, title, placeholder, cols,
   rows = 3,
   readonly = false,
   rules = {}
}: TextareaProps) => {
      const formCtx = useFormContext();
   return (
      <div>
         { title && <label htmlFor={`textarea-id-${id}`} className="base-input-label">{ title }</label> }
         <textarea 
            id={`textarea-id-${id}`}
            className={twMerge(`base-input`, formCtx.formState.errors[name] && 'base-input-error')}
            placeholder={ placeholder }
            readOnly={ readonly }
            cols={ cols }
            rows={ rows }
            { ...formCtx.register(name, rules && rules)}
         ></textarea>
         { formCtx.formState.errors[name] && 
            <p className="base-error-message">
               { formCtx.formState.errors[name]?.message?.toString() }
            </p> }
      </div>      
   );
}

const CheckInput = ({
   id, name, type, label, value,
   rules = {}
}: CheckInputProps) => {
      const formCtx = useFormContext();
   return (
      <div className={`base-check-wrap`}>
         <input 
            type={ type }
            id={`${type}-id-${id}`}
            className={`base-input-check`}
            value={ value }
            { ...formCtx.register(name, rules && rules) }
         />
         <label 
            htmlFor={`${type}-id-${id}`} 
            className={twMerge(`base-label-check`, formCtx.formState.errors[name] && `base-check-error`)}>
               { label }
         </label>
      </div>
   ) 
}

const SelectInput = ({
   title, name, options, 
   rules = {}
}: SelectInputProps) => {
   const formCtx = useFormContext();
   return (
      <div>
         { title && <label className="base-input-label">{ title }</label> }
         <Controller
            name={ name }
            control={ formCtx.control }
            rules={ rules && rules }
            render={ ({field: { value, onChange }}) => (
               <SelectOption
                  options={ options }
                  onChange={async (v: any) => {
                     onChange(v.value);
                     formCtx.formState.isValid = false 
                  }}
                  value={ options.find((i: any) => i.value == value )}
               />
            )}
         />
         { formCtx.formState.errors[name] && 
            <p className="base-error-message">
               { formCtx.formState.errors[name]?.message?.toString() }
            </p> }
      </div>
   );
}

export {
   Input, InputNumber, CheckInput, SelectInput, TextareaInput
}