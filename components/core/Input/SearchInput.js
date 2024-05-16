"use client"

import React from 'react'

function SearchInput(props) {
    const { state = "", setState = () => { } } = props
    return (
        <div className='row'>
            <div className="col-5">
                <label>Region</label>
                <select
                    className="form-control"
                    name="region"
                //   onChange={searchQueryChangeHandler}
                >
                    {/* <option hidden></option>
                  {filterOption?.pegging?.region?.map((region, idx) => (
                    <option value={region} key={`region_sn__${idx}`}>
                      {region}
                    </option>
                  ))} */}
                </select>
            </div>

            <div className="col-5">
                <label>Application Number</label>
                <input type="number"
                    className='form-control' />
            </div>
            <div className='col-2'>
                <button className='btn btn-primary mt-4'>Search</button>
            </div>
        </div>


    )
}

export default SearchInput