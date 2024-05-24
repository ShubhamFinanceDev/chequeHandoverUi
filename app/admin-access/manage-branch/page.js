'use client'
import BranchExcelUploadForm from '@/components/page/manage-branch/BranchExcelUploadForm'
import Table from '@/components/core/Input/Table'
import useFetchDataHooks from '@/hooks/useFetchDataHooks'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

const BranchManagePage = () => {
    const { branchList } = useSelector((state) => state.globalSlice)


    const { fetchBranchList } = useFetchDataHooks()

    useEffect(() => {
        fetchBranchList()
    }, [])

    return (
        <div>
            <BranchExcelUploadForm />
            <Table header={["S/N", "BranchName", "state"]} className='mt-2' >
                {branchList?.map((m, index) => {
                    return (
                        <tr key={`branchdata__` + m.id}>
                            <td>{index + 1}</td>
                            <td>{m.name}</td>
                            <td>{m.state}</td>
                        </tr>
                    )
                })}

            </Table>
        </div>
    )
}

export default BranchManagePage