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
    empCode: "",
    assignBranches: [],

    // ...userTestState
}

const dataBodyInitialState = {
    file: []
}



const useAdminFormHooks = () => {
    const formRef = useRef()
    const { setError, setSuccess } = useActionDispatch()
    const { email } = useSelector(state => state.authSlice)

    const [userBody, setUserBody] = useState({ ...userBodyInitialState })
    const [dataBody, setDataBody] = useState({ ...dataBodyInitialState })
    const [branchDataBody, setBranchDataBody] = useState({ ...dataBodyInitialState })
    const [isUpdate, setIsUpdate] = useState(false)

    // onchange handlers
    const userBodyChangeHandler = (e) => changeHandlerHelper(e, userBody, setUserBody)
    const dataBodyChangeHandler = (e) => changeHandlerHelper(e, dataBody, setDataBody)
    const branchDataBodyChangeHandler = (e) => changeHandlerHelper(e, branchDataBody, setBranchDataBody)

    const userBodyDefaultHandler = (e) => {
        setIsUpdate(state => !state)
        const { firstname = "", lastName = "", emailId = "", roleMaster = "", encodedMobileNo = "", branchesCode = [] } = e
        setUserBody({ firstname, lastName, emailId, mobileNo: atob(encodedMobileNo), roleMasters: roleMaster, assignBranches: branchesCode.map((d) => d.toString()) })
    }
    // mobile number validation check
    const isMobileValid = (mobileNo) => {
        const regex = /^\d{10}$/;
        return regex.test(mobileNo);
    };

    // submit handlers
    const userBodySubmitHandler = async (e, isUpdate) => {
        e.preventDefault()
        try {
            const body = { ...userBody }
            body.roleMasters = {
                role: body.roleMasters
            }
            if (!isMobileValid(userBody.mobileNo)) {
                setError("Mobile number is not correct");
                return;
            } else {
                setUserBody({ ...userBodyInitialState })
            }
            body.createdBy = email
            body.assignBranches = body.assignBranches.map((d) => ({ branchCode: d }))

            requiredFields(["firstname", "lastName", "emailId", "mobileNo", "createdBy", "roleMasters", "assignBranches"], body)

            if (!isUpdate) {
                requiredFields(["password", "empCode"], body)
                const { data } = await axios.post(endpoint.userCreate(), body)
                if (data.code === "0000") {
                    setSuccess(data.msg)
                    setUserBody({ ...userBodyInitialState })
                    return
                } else {
                    setError(data.msg)
                }
            } else {
                delete body.password
                delete body.empCode
                delete body.createdBy

                const { data } = await axios.put(endpoint.updateUserDetails(body.emailId
                ), body)
                if (data.code === "0000") {
                    setSuccess(data.msg)
                    setUserBody({ ...userBodyInitialState })
                    return
                } else {
                    setError(data.msg)
                }

            }

        } catch (error) {
            setError(error)
        }
    }

    const resetUpdateUserBody = () => {
        setIsUpdate(false)
        setUserBody({ ...userBodyInitialState })
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
            if (!email) {
                return
            }
            const body = { ...branchDataBody, emailId: email }
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
        isUpdate,
        resetUpdateUserBody,
        userBody, userBodyChangeHandler, userBodySubmitHandler, userBodyDefaultHandler,
        dataBody, dataBodyChangeHandler, dataBodySubmitHandler,
        branchDataBody, branchDataBodyChangeHandler, branchDataBodySubmitHandler,

    })
}

export default useAdminFormHooks