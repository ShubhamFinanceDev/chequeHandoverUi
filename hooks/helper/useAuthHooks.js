import React, { useRef, useState } from 'react'
import { useRouter } from "next/navigation";
// Services
import axios from '@/services/axios';
import endpoint from '@/services/endpoint';
// Hooks
import useActionDispatch from '@/hooks/useActionDispatch';
import { conditionRequiredFields, requiredFields } from '@/hooks/helper/requiredFields';
import { changeHandlerHelper } from './changeHandler';
import { sign } from 'jsonwebtoken';
import pageRoutes from '@/utils/pageRoutes';



const authIninitalBody = {
    email: "",
    password: "",
}

const otpInitialState = {
    email: "",
    otp: "",
}

function useAuthHooks() {
    const { setError } = useActionDispatch()

    const router = useRouter();
    const [authBody, setAuthBody] = useState({ ...authIninitalBody })
    const [showOtpInput, setShowOtpInput] = useState(false)
    const [showPasswordInput, setShowPasswordInput] = useState(false)
    const [otpGeneratesState, setOtpGeneratesState] = useState({ ...otpInitialState })


    const siginSubmitHandler = async (e) => {
        try {
            e.preventDefault()
            const body = { ...authBody }
            const { data } = await axios.post(endpoint.login(), body)
            router.push(pageRoutes.DASHBOARD_PAGE())
        } catch (error) {
            setError(error)
        }
    }

    const forgotSubmitHandler = (e) => {
        e.preventDefault()
        setShowPasswordInput(true)
        if (showPasswordInput) {
            router.push(pageRoutes.SIGIN_PAGE())
        }
    }

    const requestOTPSubmitHandler = (e) => {
        e.preventDefault()
        setShowOtpInput(true)

    }

    return ({
        authBody,
        showOtpInput,
        showPasswordInput,
        otpGeneratesState,

        // SubmitHandler
        siginSubmitHandler,
        forgotSubmitHandler,
        requestOTPSubmitHandler,

        // changeHandler
        siginChangeHandler: (e) => changeHandlerHelper(e, authBody, setAuthBody),
        otpChangeHandler: (e) => changeHandlerHelper(e, otpGeneratesState, setOtpGeneratesState)

    })
}

export default useAuthHooks