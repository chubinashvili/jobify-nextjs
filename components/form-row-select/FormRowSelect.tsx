import { NextPage } from 'next'
import React, { ChangeEvent } from 'react'

interface FormRowSelectProps {
  labelText?: string
  name: string
  value: string
  handleChange: (event: ChangeEvent<HTMLSelectElement>) => void
  list: string[]
}

const FormRowSelect: NextPage<FormRowSelectProps> = ({ labelText, name, value, handleChange, list }) => {
  return (
    <div className='form-row'>
      <label htmlFor={name} className='form-label'>
        {labelText || name}
      </label>

      <select data-testid='select-element' name={name} value={value} onChange={handleChange} className='form-select'>
        {list.map((itemValue, index) => {
          return (
            <option data-testid='select-option' key={index} value={itemValue}>
              {itemValue}
            </option>
          )
        })}
      </select>
    </div>
  )
}

export default FormRowSelect
