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
   onClick?: (v?: any) => void
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
   rules?: Object;
   onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
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
   rules?: Object;
   onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
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
   title?: string;
   Icon: LucideIcon;
   href: string;
   onClick?: () => void;
}

interface SearchProps {
   onEnter: (v: string) => void;
   placeholder?: string
}

interface PaginatonProps {
   current: number;
   totalPage: number;
   totalData?: number;
   onChangeValue: (v: any) => void
}

interface ButtonDateProps {
   onChange: (v: any) => void;
}