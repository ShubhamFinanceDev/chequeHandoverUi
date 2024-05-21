"use client"

import React, { useState } from 'react'
import BranchExcelUploadForm from '@/components/page/manage-branch/BranchExcelUploadForm'

const BranchManagePage = () => {
    const [showForm, setShowForm] = useState(false)
    const toggleFormVisibility = () => setShowForm((state) => !state)
    return (
        <div>
            <button className='btn btn-primary' onClick={toggleFormVisibility} hidden={showForm}>Upload</button>
            {showForm && (
                <BranchExcelUploadForm
                    toggleFormVisibility={toggleFormVisibility}
                />
            )}
        </div>
    )
}

export default BranchManagePage