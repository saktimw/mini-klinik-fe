"use client"

import Select, { StylesConfig } from 'react-select';
import { stylesConfig, stylesBase, stylesError } from '~/shared/styles/react-select';

const SelectOption = (props: any) => {
   const validStyles: StylesConfig = props.invalid ? stylesError : stylesBase ; 
   
   return (
      <Select
         id="selectBox"
         instanceId="selectBox"
         options= { props.options }
         isMulti= { false }
         hideSelectedOptions= { false }
         unstyled
         styles={{ ...stylesConfig, ...validStyles }}
         { ...props }
      />
   )   
}

// SelectOption.defaultProps = {
//    invalid: false
// }

export default SelectOption;