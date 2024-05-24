"use client"

import useFetchDataHooks from '@/hooks/useFetchDataHooks'
import React from 'react'
import InputWithLabel from './InputWithLabel'

function SearchInput() {
    const { searchQuery, searchUserData, searchQueryChangeHandler } = useFetchDataHooks()

    return (
        <form onSubmit={searchUserData} className='row'>
            <div className="col-10">
                <InputWithLabel
                    feilds={{
                        label: "Application Number :",
                        name: "applicationNumber",
                        // isRequired: true,
                    }}
                    state={searchQuery}
                    onChangeHandler={searchQueryChangeHandler}
                    className={['row', 'col-4', 'col-8']}
                />
            </div>
            <div className="col-2">
                <button type='submit' className='btn btn-primary w-100'>Search</button>
            </div>
        </form>
    )
}

export default SearchInput