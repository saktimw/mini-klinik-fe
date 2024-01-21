import { StylesConfig } from "react-select";

const styles = {
   bgWhite: '#ffffff',
   rounded4: '4px',
   cursorPointer: 'pointer',
   gap1: '0.25rem',
   padding15: '0.375rem',
   textColor: 'rgb(103 109 134 / 1)'   
}

export const stylesConfig: StylesConfig = {
   input: (base) => ({ ...base,
      color: styles.textColor
   }),
   valueContainer: (base) => ({ ...base,
      paddingLeft: '0.75rem',
      gap: styles.gap1
   }),
   singleValue: (base) => ({ ...base,
      color: styles.textColor
   }),
   placeholder: (base) => ({ ...base,
      textTransform: 'capitalize',
      color: 'rgb(212 212 212 / 1)'
   }),
   indicatorsContainer: (base) => ({ ...base,
      gap: styles.gap1,
      padding: '0 0.375rem 0 0.375rem'
   }),
   dropdownIndicator: (base) => ({ ...base,
      width: '1rem'
   }),
   clearIndicator: (base) => ({ ...base,
      width: '1rem'
   }), 
   menu: (base) => ({ ...base,
      marginTop: '0.25rem',
      padding: styles.padding15,
      backgroundColor: styles.bgWhite,
      borderRadius: styles.rounded4,
      border: '1px solid rgb(148 163 184 / 0.5)'
   }),
   option: (base, { isFocused, isSelected }) => ({ ...base,
      cursor: styles.cursorPointer,
      padding: '0.375rem 0.75rem 0.375rem 0.75rem',
      ":hover": {
         backgroundColor: 'rgb(16 187 229 / 0.15)'
      },
      backgroundColor: isSelected ? 'rgb(16 187 229 / 0.5)' : styles.bgWhite
   })
}

export const stylesBase: StylesConfig = {
   control: (base, state) => ({ ...base,
      borderWidth: state.isFocused ? '2px' : '1px',
      borderStyle: 'solid',
      borderColor: 'rgb(148 163 184 / 1)',
      backgroundColor: styles.bgWhite,
      borderRadius: styles.rounded4,
      cursor: styles.cursorPointer,
   })
}

export const stylesError: StylesConfig = {
   control: (base, state) => ({ ...base,
      borderWidth: state.isFocused ? '2px' : '1px',
      borderStyle: 'solid',
      borderColor: 'rgb(248 113 113 / 1)',
      backgroundColor: styles.bgWhite,
      borderRadius: styles.rounded4,
      cursor: styles.cursorPointer,
   })
}
