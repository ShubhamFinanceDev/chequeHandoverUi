import SearchInput from '@/components/core/Input/SearchInput'
import React from 'react'
import Table from '@/components/core/Input/Table'

function AdminDashboardPage() {
    return (
        <div>
            <SearchInput />
            <hr />
            <Table header={["Metric", "Unit | Denomination | Currency", "Year", "Month/Quater", "Value", "Action"]} ></Table>
        </div>
    )
}

export default AdminDashboardPage