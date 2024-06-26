'use client'
import BranchExcelUploadForm from '@/components/page/manage-branch/BranchExcelUploadForm'
import Table from '@/components/core/Input/Table'
import useFetchDataHooks from '@/hooks/useFetchDataHooks'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

const BranchManagePage = () => {
    const { branchList } = useSelector((state) => state.globalSlice)


    const { fetchBranchList, formatDate } = useFetchDataHooks()

    useEffect(() => {
        fetchBranchList()
    }, [])

    return (
        <div>
            <BranchExcelUploadForm />
            <Table header={["S/N","Branch Code", "Branch Name", "State","Added Date","Added By"]} className='mt-4' >
                {branchList?.map((m, index) => {
                    return (
                        <tr key={`branchdata__` + m.id}>
                            <td>{index + 1}</td>
                            <td>{m.value}</td>
                            <td>{m.name}</td>
                            <td>{m.state}</td>
                            <td>{formatDate(m.addedDate)}</td>
                            <td>{m.addedBy}</td>

                        </tr>
                    )
                })}

            </Table>
        </div>
    )
}

export default BranchManagePage