"use client"

import DataExcelUploadForm from '@/components/page/manage-data/DataExcelUploadForm'
import UserDataTable from '@/components/page/manage-user/UserDataTable'
import React, { useState } from 'react'

const Page = () => {
    const [showForm, setShowForm] = useState(false)
    const toggleFormVisibility = () => setShowForm((state) => !state)
    return (
        <div>
            <button className='btn btn-primary' onClick={toggleFormVisibility} hidden={showForm}>Upload</button>
            {showForm && (
                <DataExcelUploadForm
                    toggleFormVisibility={toggleFormVisibility}
                />
            )}
            <UserDataTable />
        </div>
    )
}

export default Page