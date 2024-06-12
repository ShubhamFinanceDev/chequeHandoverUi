'use client'

import React from 'react'
import Table from '@/components/core/Input/Table'
import { useSelector } from 'react-redux'
import ModelHOC from '@/hooks/helper/modelHoc'
import Pagination from '@/components/core/Pagination'
import useFetchDataHooks from '@/hooks/useFetchDataHooks'

function UserDataTable(props) {
    const { applications, applicationMeta } = useSelector((state) => state.globalSlice)
    const { searchUserData } = useFetchDataHooks(false)

    return (
        <>
            <Table header={["Application No.", "Applicant Name", "Branch", "Region", "In Favour Of", "Product Name", "Loan Amount", "Sanction Date", "Disbursal date", "Amount", "Status", ""]} >
                {applications?.map((m) => {
                    const isIssued = m.chequeStatus == "Y"
                    return (
                        <tr key={`userdata__` + m.id}>
                            <td>{m.applicationNumber}</td>
                            <td>{m.applicantName}</td>
                            <td>{m.branchName}</td>
                            <td>{m.region}</td>
                            <td>{m.hubName}</td>
                            <td>{m.productName}</td>
                            <td>{m.loanAmount}</td>
                            <td>{m.sanctionDate}</td>
                            <td>{m.disbursalDate}</td>
                            <td>{m.chequeAmount}</td>
                            <td>{isIssued ? 'Issued' : 'Not Issued'}</td>
                            <td>
                                <button className='btn btn-outline-primary' onClick={() => props?.openModel({
                                    key: "CHEQUE_STATUS_MODEL",
                                    applicationNo: m.applicationNumber,
                                    chequeId: m.id,
                                })} disabled={isIssued}>Update</button>
                            </td>
                        </tr>
                    )
                })}

            </Table>
            <Pagination meta={applicationMeta} next={(page) => searchUserData({ preventDefault: () => { } }, page)} />
        </>
    )
}

export default ModelHOC(UserDataTable)