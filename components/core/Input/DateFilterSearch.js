import React from 'react'

function DateFilterSearch() {
    return (
        <div className='row'>
            <div className='col-5'>
                <label>From</label>
                <input
                    type="date"
                    className="form-control"
                    name="from_date"
                // onChange={searchQueryChangeHandler}
                />
            </div>
            <div className='col-5'>
                <label>To</label>
                <input
                    type="date"
                    className="form-control"
                    name="to_date"
                // onChange={searchQueryChangeHandler}
                />
            </div>
            <div className='col-2 mt-4'>
                <button className='btn btn-primary'>search</button>

            </div>
        </div>
    )
}

export default DateFilterSearch
