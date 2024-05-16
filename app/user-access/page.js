'use client'
import React from 'react'
import Table from '@/components/core/Input/Table'
import SearchInput from '@/components/core/Input/SearchInput'
import DateFilterSearch from '@/components/core/Input/DateFilterSearch'

function UserDashboardPage() {
    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-4'>
                    <SearchInput />
                </div>
                <div className='col-4'></div>
                <div className='col-4'>
                    <DateFilterSearch />
                </div>
            </div>
            <hr />

            <Table header={["Applicant Name", "Branch Name", "Region", "Hub Name", "Application Number", "Product Name", "Loan Amount", "Sanction Date", "Disbursal date", "Cheque Amount", "Cheque Status"]} >


            </Table>

        </div>
    )
}

export default UserDashboardPage