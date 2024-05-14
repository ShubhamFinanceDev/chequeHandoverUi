import React from 'react'

const Table = ({ header = [], children, className = "" }) => {
    return (
        <div className={`table-responsive table-container ${className}`}>
            <table className='table'>
                <thead>
                    <tr>
                        {header.map((h, idx) => (<th key={`table-header__${idx}`}>{h}</th>))}
                    </tr>
                </thead>

                <tbody>
                    {children}

                </tbody>
            </table>

        </div>
    )
}

export default Table