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
    roleMasters: ""
}

const useFormHooks = () => {
    const fileInputRef = useRef(null);
    const { setError, resetValidation, setSuccess } = useActionDispatch()
    const [ChequeStatus, setChequeStatus] = useState({ ...ChequeInitialState })


    const ChequeStatusSubmitHandler = async (e, next = () => { }) => {
        e.preventDefault()
        console.log(ChequeStatus)
        try {
            const body = { ...ChequeStatus }
            const formdata = formDataParser(body)
            const { data } = await axios.post(endpoint.updateStatusCheque(), formdata)
            if (data.code === "1111") {
                setError(data.msg)
                return
            } else {
                setSuccess(data.msg)
                setChequeStatus({ ...ChequeInitialState })
                next()

            }

        } catch (error) {
            setError(error)
        }

    }

    const ChequeStatusChangeHandler = (e) => changeHandlerHelper(e, ChequeStatus, setChequeStatus)
    return ({
        ChequeStatus,
        ChequeStatusChangeHandler,
        ChequeStatusSubmitHandler
    })
}

export default useFormHooks