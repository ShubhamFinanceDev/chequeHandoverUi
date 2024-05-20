"use client"

import useFetchDataHooks from '@/hooks/useFetchDataHooks'
import React from 'react'

function SearchInput(props) {
    const { state = "", setState = () => { } } = props
    const { searchQuery, searchUserData, searchQueryChangeHandler } = useFetchDataHooks()
    return (
        <div className='row'>
            <div className="col-2">
                <label>Application Number</label>
                <input type="string"
                    className='form-control'
                    name='applicationNumber'
                    state={searchQuery}
                    onChange={searchQueryChangeHandler} />
            </div>
            <div className='col-2'>
                <button type='button' className='btn btn-primary mt-4' onClick={searchUserData}>Search</button>
            </div>
            <div className='col-8'></div>
        </div>


    )
}

export default SearchInput