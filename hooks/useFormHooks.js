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

const useFormHooks = () => {
    const fileInputRef = useRef(null);
    const { setError, resetValidation, setSuccess, updateApplicationStatus } = useActionDispatch()
    const [ChequeStatus, setChequeStatus] = useState({ ...ChequeInitialState })
    const { email } = useSelector((state) => state.authSlice)


    const ChequeStatusSubmitHandler = async (e, next = () => { }) => {
        e.preventDefault()
        try {
            if(!email){
                return
            }
            const body = { ...ChequeStatus, emailId: email}
            const formdata = formDataParser(body)
            const { data } = await axios.post(endpoint.updateStatusCheque(), formdata)
            if (data.code === "0000") {
                setSuccess("Acknowledgement has been received!")
                updateApplicationStatus(body.applicationNo)
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

    const ChequeStatusChangeHandler = (e) => changeHandlerHelper(e, ChequeStatus, setChequeStatus)
    //  default state handler
    const ChequeStatusDefaultStateHandler = (e) => setChequeStatus(state => ({ ...state, ...e }))

    return ({
        ChequeStatus, ChequeStatusChangeHandler, ChequeStatusSubmitHandler, ChequeStatusDefaultStateHandler
    })
}

export default useFormHooks