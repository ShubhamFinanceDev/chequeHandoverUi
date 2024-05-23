import BranchExcelUploadForm from '@/components/page/manage-branch/BranchExcelUploadForm'
import React from 'react'
import Table from '@/components/core/Input/Table'

const BranchManagePage = () => {
    return (
        <div>
            <BranchExcelUploadForm />
            <Table header={["BranchName", "state"]} className='mt-2' >
            </Table>
        </div>
    )
}

export default BranchManagePage