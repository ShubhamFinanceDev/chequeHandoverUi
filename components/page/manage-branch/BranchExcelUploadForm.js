"use client"

import { InputWithLabel } from '@/components/core/Input'
import useAdminFormHooks from '@/hooks/useAdminFormHooks'
import React from 'react'

const BranchExcelUploadForm = ({ toggleFormVisibility }) => {
    const { branchDataBody, branchDataBodyChangeHandler, branchDataBodySubmitHandler } = useAdminFormHooks()
    return (
        <div>
            <p className='mb-3'>Branch Excel Upload Form</p>

            <form onSubmit={branchDataBodySubmitHandler}>
                <InputWithLabel
                    feilds={{
                        label: "Excel File",
                        name: "file",
                        type: "file",
                        isRequired: true,
                    }}
                    state={branchDataBody}
                    onChangeHandler={branchDataBodyChangeHandler}
                />
                <button className='btn' onClick={toggleFormVisibility} type='reset'>Cancel</button>
                <button className='btn btn-primary'>Upload</button>
            </form>

        </div>
    )
}

export default BranchExcelUploadForm