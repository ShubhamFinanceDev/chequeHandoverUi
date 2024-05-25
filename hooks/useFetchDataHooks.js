'use client'

import React, { useEffect } from 'react'

import useActionDispatch from './useActionDispatch';
import { useSelector } from 'react-redux';
import { useState } from 'react';


// Services
import axios from '@/services/axios';
import endpoint from '@/services/endpoint';
import { changeHandlerHelper } from './helper/changeHandler';

const searchQueryInitialState = {
    applicationNumber: "",
    branch: ""
}

const useFetchDataHooks = () => {
    const { setError, setSuccess, setBranchList, setApplicationDetails, resetGlobalState, setAssingBranch } = useActionDispatch()
    const { email } = useSelector((state) => state.authSlice)
    const [searchQuery, setSearchQuery] = useState({ ...searchQueryInitialState })

    useEffect(() => {
        return () => resetGlobalState()
    }, [])

    const fetchBranchList = async () => {
        try {
            const { data: { branchMasters = [], commanResponse = {} } } = await axios.get(endpoint.fetchBranchList())
            if (commanResponse?.code == "0000") {
                setBranchList(branchMasters.map(({ branchName, branchCode, state }) => ({ name: branchName, state: state, value: branchCode })))
                return
            }
        } catch (error) {
            setError(error)
        }
    }

    const searchUserData = async (e, page = 1) => {
        e.preventDefault()
        try {
            if (!email) {
                return
            }
            const { data } = await axios.get(endpoint.userData(email, page, searchQuery.applicationNumber, searchQuery.branch));
            if (data?.commonResponse?.code === "0000") {
                const { applicationDetails, nextPage, totalCount } = data
                setApplicationDetails({
                    applications: applicationDetails,
                    applicationMeta: {
                        totalPages: Math.ceil(totalCount / 100),
                        currentPage: page,
                        isNextPage: nextPage,
                    }
                })
                return
            } else {
                setApplicationDetails({
                    applications: [],
                    applicationMeta: {
                        totalPages: 0,
                        currentPage: 1,
                        isNextPage: false,
                    }
                })
                // setError(data.commonResponse.msg)
            }
        } catch (error) {
            setError(error)
        }

    }

    const generateMISReport = async () => {
        if (!email) {
            return
        }
        axios({
            url: endpoint.generateMISReport(email),
            method: 'GET',
            responseType: 'blob',
        })
            .then(response => {
                const blob = new Blob([response.data], { type: response.headers['content-type'] });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                const contentDisposition = response.headers['content-disposition'];
                let filename = 'download.xlsx';
                if (contentDisposition) {
                    const match = contentDisposition.match(/filename="?([^"]+)"?/);
                    if (match && match[1]) {
                        filename = match[1];
                    }
                }
                a.download = filename;
                document.body.appendChild(a);
                a.click();
                a.remove();
                window.URL.revokeObjectURL(url);
            })
            .catch(error => {
                console.error('Error downloading the file:', error);
            });
    }

    const removeRecordHandler = async () => {
        try {
            if (!email) {
                return
            }
            const { data } = await axios.post(endpoint.invokeStatusProcedure(), {
                emailId: email
            });
            if (data.code === "0000") {
                setSuccess(data.commonResponse.msg)
                searchUserData({ preventDefault: () => { } })
                return
            } else {
                setError(data.commonResponse.msg)
            }
        } catch (error) {
            setError(error)
        }

    }

    const fetchassingBranch = async () => {
        try {
            if (!email) {
                return
            }
            const { data } = await axios.get(endpoint.assignBranch(email));
            if (data.code === "0000") {
                setAssingBranch(data.assignBranchList)
                // setSuccess(data.commonResponse.msg)
                return
            } else {
                setError(data.commonResponse.msg)
            }
        } catch (error) {
            setError(error)
        }
    }

    const resetSearchInputHandler = () => {
        setSearchQuery({ ...searchQueryInitialState })
    }

    const searchQueryChangeHandler = (e) => changeHandlerHelper(e, searchQuery, setSearchQuery)


    return ({
        searchQuery,
        fetchBranchList,
        searchUserData,
        searchQueryChangeHandler,
        generateMISReport,
        removeRecordHandler,
        fetchassingBranch,
        resetSearchInputHandler,

    })
}

export default useFetchDataHooks