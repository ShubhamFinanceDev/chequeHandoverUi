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
}

const useFetchDataHooks = () => {
    const { setError, setSuccess, setBankList, setApplicationDetails, resetGlobalState } = useActionDispatch()
    const { email } = useSelector((state) => state.authSlice)
    const [searchQuery, setSearchQuery] = useState({ ...searchQueryInitialState })

    useEffect(() => {
        return () => resetGlobalState()
    }, [])

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

    const searchUserData = async (e, page = 1) => {
        e.preventDefault()
        try {
            if (!email) {
                return
            }
            const { data } = await axios.get(endpoint.userData(email, page, searchQuery.applicationNumber));
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
                setError(data.msg)
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
                setSuccess(data.msg)
                searchUserData({ preventDefault: () => { } })
                return
            } else {
                setError(data.msg)
            }
        } catch (error) {
            setError(error)
        }

    }

    const searchQueryChangeHandler = (e) => changeHandlerHelper(e, searchQuery, setSearchQuery)


    return ({
        searchQuery,
        fetchBranchList,
        searchUserData,
        searchQueryChangeHandler,
        generateMISReport,
        removeRecordHandler

    })
}

export default useFetchDataHooks