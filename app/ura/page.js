import React from 'react'
import SearchInput from '@/components/core/Input/SearchInput'
import UserDataTable from '@/components/page/manage-user/UserDataTable'

const UserReportDashboard = () => {
  return (
    <div>
    <div className="row mt-2 mb-3 d-flex align-items-end">
        <div className="col-12">
            <SearchInput />
        </div>
        <div className="col-4">
            {/* <div className="d-flex gap-2">
                <button className='btn btn-primary' onClick={generateMISReport}>Generate Report</button>
            </div> */}

        </div>

    </div>
    <UserDataTable />
</div>
)
}

export default UserReportDashboard
