import React, { useRef, useState } from 'react'
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';
// Services
import axios from '@/services/axios';
import endpoint from '@/services/endpoint';
import pageRoutes from '@/utils/pageRoutes';
// Hooks
import { changeHandlerHelper } from '@/hooks/helper/changeHandler';
import { requiredFields } from '@/hooks/helper/requiredFields';
import { formDataParser } from '@/hooks/helper/formDataParser';
import useActionDispatch from './useActionDispatch';
import { useSelector } from 'react-redux';

const userTestState = {
    firstname: "saurabh",
    lastName: "singh",
    emailId: "chintu5@shubham.com",
    mobileNo: "8160041657",
    password: "password",
    createdBy: "atish.rai@dbalounge.com",
    roleMasters: "ROLE_ADMIN",
    assignBranches: ["110"]
}

const userBodyInitialState = {
    firstname: "",
    lastName: "",
    emailId: "",
    mobileNo: "",
    password: "",
    createdBy: "",
    roleMasters: "",
    assignBranches: [],

    // ...userTestState
}

const dataBodyInitialState = {
    file: []
}



const useAdminFormHooks = () => {
    const formRef = useRef()
    const {
        setError, setSuccess
    } = useActionDispatch()
    const { email } = useSelector(state => state.authSlice)
    const [userBody, setUserBody] = useState({ ...userBodyInitialState })
    const [dataBody, setDataBody] = useState({ ...dataBodyInitialState })
    const [branchDataBody, setBranchDataBody] = useState({ ...dataBodyInitialState })

    // onchange handlers
    const userBodyChangeHandler = (e) => changeHandlerHelper(e, userBody, setUserBody)
    const dataBodyChangeHandler = (e) => changeHandlerHelper(e, dataBody, setDataBody)
    const branchDataBodyChangeHandler = (e) => changeHandlerHelper(e, branchDataBody, setBranchDataBody)

    // submit handlers
    const userBodySubmitHandler = async (e) => {
        e.preventDefault()
        try {
            const body = { ...userBody }
            body.roleMasters = {
                role: body.roleMasters
            }
            body.createdBy = email
            body.assignBranches = body.assignBranches.map((d) => ({ branchCode: d }))
            requiredFields(["firstname", "lastName", "emailId", "mobileNo", "password", "createdBy", "roleMasters", "assignBranches"], body)
            const { data } = await axios.post(endpoint.userCreate(), body)

            if (data.code === "0000") {
                setSuccess(data.msg)
                setUserBody({ ...userBodyInitialState })
                return
            } else {
                setError(data.msg)
            }
        } catch (error) {
            setError(error)
        }
    }

    const dataBodySubmitHandler = async (e) => {
        e.preventDefault()
        try {
            const body = { ...dataBody }
            const formData = formDataParser(body)
            const { data } = await axios.post(endpoint.dataExcelUpload(), formData)

            if (data.code === "0000") {
                setSuccess(data.msg)
                setDataBody({ ...dataBodyInitialState })
                return
            } else {
                setError(data.msg)
            }
        } catch (error) {
            setError(error)
        }
    }

    const branchDataBodySubmitHandler = async (e) => {
        e.preventDefault()
        try {
            if(!email){
                return
            }
            const body = { ...branchDataBody, emailId: email  }
            const formData = formDataParser(body)
            const { data } = await axios.post(endpoint.branchDataExcelUpload(), formData)

            if (data.code === "0000") {
                setSuccess(data.msg)
                setDataBody({ ...dataBodyInitialState })
                return
            } else {
                setError(data.msg)
            }
        } catch (error) {
            setError(error)
        }
    }

    return ({
        userBody, userBodyChangeHandler, userBodySubmitHandler,
        dataBody, dataBodyChangeHandler, dataBodySubmitHandler,
        branchDataBody, branchDataBodyChangeHandler, branchDataBodySubmitHandler

    })
}

export default useAdminFormHooks