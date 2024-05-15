import React, { useState } from 'react'
import { useRouter } from "next/navigation";
// Services
import axios from '@/services/axios';
import endpoint from '@/services/endpoint';
// Hooks
import useActionDispatch from '@/hooks/useActionDispatch';
import { changeHandlerHelper } from './changeHandler';
import pageRoutes from '@/utils/pageRoutes';
import Cookies from 'js-cookie';



const authIninitalBody = {
    emailId: "",
    password: "",
}

const otpInitialState = {
    email: "",
    otp: "",
}

function useAuthHooks() {
    const router = useRouter();
    const { setError, setUserAuthCred, removeUserAuthCred } = useActionDispatch()

    const [authBody, setAuthBody] = useState({ ...authIninitalBody })


    const [showOtpInput, setShowOtpInput] = useState(false)
    const [showPasswordInput, setShowPasswordInput] = useState(false)
    const [otpGeneratesState, setOtpGeneratesState] = useState({ ...otpInitialState })


    const siginSubmitHandler = async (e) => {
        e.preventDefault()
        try {
            const body = { ...authBody }
            const { data } = await axios.post(endpoint.login(), body)
            const { token, emailId: email, role: isAdmin } = data
            const user = { token, email, isAdmin }
            setUserAuthCred(user)
            Cookies.set("user", JSON.stringify(user || {}))

            if (isAdmin) {
                router.push(pageRoutes.ADMIN_DASHBOARD_PAGE())
            } else {
                router.push(pageRoutes.DASHBOARD_PAGE())
            }
        } catch (error) {
            setError(error)
        }
    }

    const logoutActionHandler = () => {
        router.push(pageRoutes.SIGIN_PAGE())
        Cookies.remove("user")
        removeUserAuthCred()
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

    const siginChangeHandler = (e) => changeHandlerHelper(e, authBody, setAuthBody)
    const otpChangeHandler = (e) => changeHandlerHelper(e, otpGeneratesState, setOtpGeneratesState)

    return ({
        authBody, siginChangeHandler, siginSubmitHandler,
        showOtpInput, otpChangeHandler,


        showPasswordInput,
        otpGeneratesState,

        // SubmitHandler
        forgotSubmitHandler,
        requestOTPSubmitHandler,

        // ActionHandler
        logoutActionHandler

    })
}

export default useAuthHooks