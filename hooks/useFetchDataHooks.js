import React from 'react'

import useActionDispatch from './useActionDispatch';
import { useSelector } from 'react-redux';
import { useState } from 'react';


// Services
import axios from '@/services/axios';
import endpoint from '@/services/endpoint';
import { changeHandlerHelper } from './helper/changeHandler';

const searchQueryInitialState = {
    applicationNumber: "",
}

const useFetchDataHooks = () => {
    const { setError, setBankList, setApplicationDetails } = useActionDispatch()
    const { email } = useSelector((state) => state.authSlice)
    const [searchQuery, setSearchQuery] = useState({ ...searchQueryInitialState })


    const fetchBranchList = async () => {
        try {
            const { data: { branchMasters = [], commanResponse = {} } } = await axios.get(endpoint.fetchBankList())
            if (commanResponse?.code == "0000") {
                setBankList(branchMasters.map(({ branchName, branchCode }) => ({ name: branchName, value: branchCode })))
                return
            }

        } catch (error) {
            setError(error)
        }

    }

    const searchUserData = async (e, page) => {
        e.preventDefault()
        try {
            const { data } = await axios.get(endpoint.userData(email, page, searchQuery.applicationNumber));
            setApplicationDetails(data)
        } catch (error) {
            setError(error)
        }

    }

    const searchQueryChangeHandler = (e) => changeHandlerHelper(e, searchQuery, setSearchQuery)


    return ({
        searchQuery,
        fetchBranchList,
        searchUserData,
        searchQueryChangeHandler

    })
}

export default useFetchDataHooks