import React, { useRef, useState } from 'react'
import { useRouter } from "next/navigation";
// Services
import axios from '@/services/axios';
import endpoint from '@/services/endpoint';
// Hooks
import useActionDispatch from '@/hooks/useActionDispatch';
import { useSelector } from 'react-redux';
import { changeHandlerHelper } from './helper/changeHandler';
import { formDataParser } from './helper/formDataParser';


const ChequeInitialState = {
    applicationNo: "",
    file: "",
    date: '',
}
const UpdatePasswordInititalState = {
    email: "",
    // oldPassword: "",
    newPassword: "",
    confirmNewPassword: ""
}

const ReportInitialState = {
    applicationNo:''
}

const useFormHooks = () => {
    const fileInputRef = useRef(null);
    const { setError, resetValidation, setSuccess, updateApplicationStatus } = useActionDispatch()
    const [ChequeStatus, setChequeStatus] = useState({ ...ChequeInitialState })
    const [updatePassword, setUpdatePassword] = useState({ ...UpdatePasswordInititalState })
    const [reportState, setreportState] = useState({ ...ReportInitialState })

    const { email } = useSelector((state) => state.authSlice)


    const ChequeStatusSubmitHandler = async (e, next = () => { }) => {
        e.preventDefault()
        try {
            if (!email) {
                return
            }
            const body = { ...ChequeStatus, emailId: email }
            const formdata = formDataParser(body)
            const { data } = await axios.post(endpoint.updateStatusCheque(), formdata)
            if (data.code === "0000") {
                setSuccess("Acknowledgement has been received!")
                updateApplicationStatus(body.chequeId)
                setChequeStatus({ ...ChequeInitialState })
                next()
                return
            } else {
                setError(data.msg)
            }

        } catch (error) {
            setError(error)
        }

    }

    const UpdatePasswordSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            const body = {
                email: updatePassword.email,
                // oldPassword: updatePassword.oldPassword,
                newPassword: updatePassword.newPassword,
                confirmNewPassword: updatePassword.confirmNewPassword
            };

            const { data } = await axios.put(endpoint.updatePassword(), body);
            if (data.code === "0000") {
                setSuccess("Password updated successfully")
                setUpdatePassword({ ...UpdatePasswordInititalState })
                return
            } else {
                setError(data.msg)
            }

            console.log("API Response:", data);

        } catch (error) {
            setError(error);
        }
    };

    const reportSubmitHandler = async (e)=>{
         e.preventDefault()
         try {
            const body = { ...reportState}
            const { data } = await axios.get(endpoint.reportGenerateUser(body.applicationNo))
            setSuccess(data.msg)
            setreportState({applicationNo:''}) 
         } catch (error) {
            setError(error)
         }
    }

    const ChequeStatusChangeHandler = (e) => changeHandlerHelper(e, ChequeStatus, setChequeStatus)
    const UpdatePasswordChangeHandler = (e) => changeHandlerHelper(e, updatePassword, setUpdatePassword)
    const reportChangeHandler = (e) => changeHandlerHelper(e, reportState, setreportState)

    //  default state handler
    const ChequeStatusDefaultStateHandler = (e) => setChequeStatus(state => ({ ...state, ...e }))

    return ({
        ChequeStatus, ChequeStatusChangeHandler, ChequeStatusSubmitHandler, ChequeStatusDefaultStateHandler, updatePassword, UpdatePasswordChangeHandler, UpdatePasswordSubmitHandler,
        reportState,reportSubmitHandler,reportChangeHandler
    })
}

export default useFormHooks