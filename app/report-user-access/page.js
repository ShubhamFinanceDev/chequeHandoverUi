'use client'

import React from 'react'
import { InputWithLabel } from '@/components/core/Input'
import useFormHooks from '@/hooks/useFormHooks'


const ReportUserPage = () => {
  const {reportState,reportChangeHandler,reportSubmitHandler} =useFormHooks()
  return (
    <form onSubmit={reportSubmitHandler}>
        <div className='row mt-4'>
        <div className='col-8'>
          <InputWithLabel
            feilds={{
              label: "Application No",
              name: "applicationNo",
              isRequired: true,
            }}
            state={reportState}
            onChangeHandler={reportChangeHandler}
          />
          </div>
          {/* <div className='2'></div> */}
          <div className='col-4 mt-4'>
           <button type='submit' className='btn btn-primary'>Generate Report</button>
          </div>
    </div>
          </form>
  )
}

export default ReportUserPage
