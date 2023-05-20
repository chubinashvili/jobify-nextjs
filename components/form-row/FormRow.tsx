import { NextPage } from 'next'
import React, { ChangeEvent } from 'react'

interface FormRowProps {
  name: string
  type: string
  value?: string
  handleChange: (event: ChangeEvent<any>) => void
  labelText?: string
}

const FormRow: NextPage<FormRowProps> = ({ name, type, value, handleChange, labelText }) => {
  return (
    <div className='form-row'>
      <label htmlFor={name} className='form-label'>
        {labelText || name}
      </label>
      <input
        data-testid='input-element'
        type={type}
        value={value}
        name={name}
        onChange={handleChange}
        className='form-input'
      />
    </div>
  )
}

export default FormRow
