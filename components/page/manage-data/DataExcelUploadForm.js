"use client"

import { InputWithLabel } from '@/components/core/Input'
import useAdminFormHooks from '@/hooks/useAdminFormHooks'
import React from 'react'

const DataExcelUploadForm = () => {
    const { dataBody, dataBodyChangeHandler, dataBodySubmitHandler } = useAdminFormHooks()
    return (
        <div>
            <p className='mb-3'>Excel Upload Form</p>

            <form onSubmit={dataBodySubmitHandler}>
                <InputWithLabel
                    feilds={{
                        label: "Excel File",
                        name: "file",
                        type: "file",
                        isRequired: true,
                    }}
                    state={dataBody}
                    onChangeHandler={dataBodyChangeHandler}
                />
                <button className='btn btn-primary'>Upload</button>
            </form>

        </div>
    )
}

export default DataExcelUploadForm