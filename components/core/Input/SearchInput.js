"use client"

import useFetchDataHooks from '@/hooks/useFetchDataHooks'
import React from 'react'
import InputWithLabel from './InputWithLabel'
import SelectWithLabel from './SelectWithLabel'
import { useEffect } from 'react'

function SearchInput() {
    const { searchQuery, searchUserData, searchQueryChangeHandler, fetchassingBranch } = useFetchDataHooks()

    useEffect(() => {
        fetchassingBranch()
    }, [])

    return (
        <form onSubmit={searchUserData} className='row' >
            <div className="col-10">
                <div className="row">
                    <div className="col-6">
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
                    <div className="col-6">
                        <SelectWithLabel
                            feilds={{
                                label: "Branch List",
                                name: "branch",
                                type: "select",
                                options: []
                            }}
                            state={searchQuery}
                            onChangeHandler={searchQueryChangeHandler}
                            className={['row', 'col-4', 'col-8']} />
                    </div>
                </div>
            </div>
            <div className="col-2">
                <button type='submit' className='btn btn-primary w-100'>Search</button>
            </div>
        </form >
    )
}

export default SearchInput