"use client"

import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

import useFetchDataHooks from '@/hooks/useFetchDataHooks'
import InputWithLabel from './InputWithLabel'
import SelectWithLabel from './SelectWithLabel'

function SearchInput() {
    const { email } = useSelector((state) => state.authSlice)
    const { assingBranch } = useSelector((state) => state.globalSlice)
    const { searchQuery, searchUserData, searchQueryChangeHandler, fetchassingBranch } = useFetchDataHooks()

    useEffect(() => {
        fetchassingBranch()
    }, [email])

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
                                label: "Branch",
                                name: "branch",
                                options: assingBranch.map((d) => ({ name: d, value: d }))
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