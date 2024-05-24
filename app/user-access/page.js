'use client'
import SearchInput from '@/components/core/Input/SearchInput'
import UserDataTable from '@/components/page/manage-user/UserDataTable'
import useFetchDataHooks from '@/hooks/useFetchDataHooks'
import React from 'react'

function UserDashboardPage() {
    const { generateMISReport } = useFetchDataHooks()
    return (
        <div>
            <div className="row mt-2 mb-3">
                <div className="col-8">
                    <SearchInput />
                </div>
                <div className="col-4">
                    <div className="d-flex gap-2">
                        <button className='btn btn-primary' onClick={generateMISReport}>Generate Report</button>
                    </div>

                </div>

            </div>
            <UserDataTable />
        </div>
    )
}

export default UserDashboardPage