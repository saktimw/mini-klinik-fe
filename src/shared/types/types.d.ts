import { LucideIcon } from "lucide-react";
import React from "react";
import { UseFormReturn } from "react-hook-form";

// Atom components props
interface ButtonIconProps {
   Icon: LucideIcon;
   buttonStyle?: string;
   iconStyle?: string;
   onClick: (v?: any) => void
}

interface LinkIconProps {
   href: string;
   Icon: LucideIcon;
   iconStyle?: string;
}

interface ButtonLoadingProps {
   submit?: boolean,
   Icon?: LucideIcon;
   title: string;
   buttonStyle?: string;
   loading?: true | false
}

// Common components props
interface FormContainerProps {
   children: React.ReactNode;
   formInit: UseFormReturn;
   onSubmit(): void;
}

interface InputProps {
   type: 'text' | 'number' | 'email' | 'password' | 'hidden' | 'date';
   title?: string;
   id?: string;
   name: string;
   value?: any;
   minlength?: number;
   maxlength?: number;
   placeholder?: string;
   readonly?: boolean;
   focus?: boolean;
   rules?: Object
}

interface InputNumberProps {
   title?: string;
   id?: string;
   name: string;
   value?: any;
   min?: any;
   max?: any;
   step?: any;
   placeholder?: string;
   readonly?: boolean;
   focus?: boolean;
   rules?: Object
}

interface TextareaProps {
   title?: string;
   id?: string;
   name: string;
   placeholder?: string;
   readonly?: boolean;
   rows?: number;
   cols?: number;
   rules?: Object
}

interface CheckInputProps {
   type: 'radio' | 'checkbox';
   name: string;
   id?: string;
   value?: any;
   label: string;
   rules?: Object
}

interface SelectInputProps {
   title: string;
   name: string;
   options: any;
   value?: any;
   rules?: Object
}

interface ButtonConfirmProps {
   title: string;
   message: string;
   action: (value?: any) => (any | Promise<void>) 
   children: React.ReactElement
}

interface MenuLinkProps {
   keyID: string;
   Icon: LucideIcon;
   href: string;
}

interface SearchProps {
   onEnter: (v: string) => void;
   placeholder?: string
}

interface PaginatonProps {
   current: number;
   totalPage: number;
   onChangeValue: (v: any) => void
}

interface ButtonDateProps {
   onChange: (v: any) => void;
}