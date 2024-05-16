import React from 'react'

import useActionDispatch from './useActionDispatch';

// Services
import axios from '@/services/axios';
import endpoint from '@/services/endpoint';
import pageRoutes from '@/utils/pageRoutes';


const useFetchDataHooks = () => {
    const { setError, setBankList } = useActionDispatch()

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

    return ({ fetchBranchList })
}

export default useFetchDataHooks