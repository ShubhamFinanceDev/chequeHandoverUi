'use client'
import React from 'react'
import Table from '@/components/core/Input/Table'
import SearchInput from '@/components/core/Input/SearchInput'
import { useSelector } from 'react-redux'

function UserPage() {
    const { userDetails: { applicationDetails } } = useSelector((state) => state.globalSlice)

    return (
        <div className='container-fluid'>
            <div className='row mt-3'>
                <div>
                    <SearchInput />
                </div>
            </div>
            <hr className='mt-4' />
            <Table header={["Applicant Name", "Branch Name", "Region", "Hub Name", "Application Number", "Product Name", "Loan Amount", "Sanction Date", "Disbursal date", "Cheque Amount", "Cheque Status"]} >
                {applicationDetails?.map((m) => {
                    return (
                        <tr key={`userdata__` + m.id}>
                            <td>{m.applicantName}</td>
                            <td>{m.branchName}</td>
                            <td>{m.region}</td>
                            <td>{m.hubName}</td>
                            <td>{m.applicationNumber}</td>
                            <td>{m.productName}</td>
                            <td>{m.loanAmount}</td>
                            <td>{m.sanctionDate}</td>
                            <td>{m.disbursalDate}</td>
                            <td>{m.chequeAmount}</td>
                            <td>
                                <button className='btn btn-outline-info'>{m.chequeStatus}</button>
                                <button className='btn btn-outline-info'>{m.chequeStatus}</button>
                            </td>
                        </tr>
                    )
                })}

            </Table>

        </div>
    )
}

export default UserPage