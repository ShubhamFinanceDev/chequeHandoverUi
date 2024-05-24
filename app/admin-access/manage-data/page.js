"use client"

import React, { useState } from 'react'
import DataExcelUploadForm from '@/components/page/manage-data/DataExcelUploadForm'
import UserDataTable from '@/components/page/manage-user/UserDataTable'
import SearchInput from '@/components/core/Input/SearchInput'
import useFetchDataHooks from '@/hooks/useFetchDataHooks'

const Page = () => {
    const [showForm, setShowForm] = useState(false)
    const toggleFormVisibility = () => setShowForm((state) => !state)
    const { generateMISReport, removeRecordHandler } = useFetchDataHooks()

    return (
        <div>
            {showForm ? (
                <DataExcelUploadForm
                    toggleFormVisibility={toggleFormVisibility}
                />
            ) : (
                <>
                    <div className="row mb-3">
                        <div className="col-6">
                            <SearchInput />
                        </div>
                        <div className='col'></div>
                        <div className="col-5">
                            <div className="d-flex gap-2">
                                <button className='btn btn-primary' onClick={toggleFormVisibility} hidden={showForm}>Upload Excel Data</button>
                                <button className='btn btn-primary' onClick={generateMISReport} hidden={showForm}>Generate Report</button>
                                <button className='btn btn-primary' onClick={removeRecordHandler} hidden={showForm}>Remove Record</button>
                            </div>

                        </div>

                    </div>
                    <UserDataTable />
                </>
            )}

        </div>
    )
}

export default Page