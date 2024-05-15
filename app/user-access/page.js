'use client'
import React from 'react'
import Table from '@/components/core/Input/Table'
import SearchInput from '@/components/core/Input/SearchInput'

function UserDashboardPage() {
    return (
        <div>
            <SearchInput />
            <hr />
            <Table header={["Application Number", "Applicant Name", "Branch", "Region", "Hub", "Product Name", "Loan Amount", "Sanction Date", "Disbursal Date", "Cheque Amount", "Cheque Status"]} >

                {/* {metricBudget.filter(r => r?.name.toLowerCase().includes(searchQuery.toLowerCase())).map((m) => {
                    const unit_currency_denomination = [m.unit_name, m.currency_name, m.denomination_name].filter((d) => d != null).join(" | ")


                    return (
                        <tr key={`metric__` + m.id}>
                            <td>{m.name}</td>
                            <td>{unit_currency_denomination}</td>
                            <td>{m.year}</td>
                            <td>{MONTHS[m.month] || QUATORS[m.financial_quarter]}</td>
                            <td>{parseFloat(m.value).toFixed(2)}</td>
                            <td>
                                <div className="table-action-btns">
                                    <Link href={pageRoutes.UPDATE_BUDGET_FORM_PAGE(m.id)}>
                                        <button><img src={icons.Icon04} alt="icon" /> Edit</button>
                                    </Link>
                                </div>
                            </td>
                        </tr>
                    )
                })} */}
            </Table>


        </div>
    )
}

export default UserDashboardPage