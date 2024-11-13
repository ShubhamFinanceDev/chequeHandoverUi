'use client'

import React, { useState } from 'react'
import { InputWithLabel } from '@/components/core/Input'
import useFormHooks from '@/hooks/useFormHooks'

const ReportUser = () => {
  const { reportState,selectedOption, reportChangeHandler, reportSubmitHandler,handleRadioChange } = useFormHooks()

  return (
    <form onSubmit={reportSubmitHandler}>
      <div className='row mt-4'>
        <div className='col-12'>
          <label>
            <input
              type='radio'
              value='application'
              checked={selectedOption === 'application'}
              onChange={handleRadioChange}
            />
            Application
          </label>
          <label className='ms-3'>
            <input
              type='radio'
              value='excel'
              checked={selectedOption === 'excel'}
              onChange={handleRadioChange}
            />
            Excel
          </label>
        </div>

        {selectedOption === 'application' && (
          <div className='col-8'>
            <InputWithLabel
              feilds={{
                label: 'Application No',
                name: 'applicationNo',
                isRequired: true,
              }}
              state={reportState}
              onChangeHandler={reportChangeHandler}
            />
          </div>
        )}

        {selectedOption === 'excel' && (
          <div className='col-8'>
            <InputWithLabel
              feilds={{
                label: 'Excel File',
                name: 'file',
                type: 'file',
                isRequired: true,
              }}
              state={reportState}
              onChangeHandler={reportChangeHandler}
            />
          </div>
        )}

        <div className='col-4 mt-4'>
          <button type='submit' className='btn btn-primary'>
            Generate Report
          </button>
        </div>
      </div>

      {/* Action buttons */}
      {/* <div className='d-flex gap-2'>
        <button className='btn btn-outline-primary' onClick={resetHandler} type='reset'>
          Cancel
        </button>
        <button className='btn btn-primary' onClick={reportSubmitHandler}>
          Upload
        </button>
      </div> */}
    </form>
  )
}

export default ReportUser
