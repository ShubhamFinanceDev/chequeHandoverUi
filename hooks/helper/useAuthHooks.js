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

const passwordResetInitialState = {
    emailId: "",
    otpCode: "",
    newPassword: "",
    confirmNewPassword: "",
}

function useAuthHooks() {
    const router = useRouter();
    const { setError, setUserAuthCred, removeUserAuthCred } = useActionDispatch()

    const [authBody, setAuthBody] = useState({ ...authIninitalBody })
    const [passwordReset, setPasswordReset] = useState({ ...passwordResetInitialState })
    const [passwordResetSection, setPasswordResetSection] = useState("GENERATE_OTP")

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
                router.push(pageRoutes.MANAGE_USER_PAGE())
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

    const passwordResetOTPGenerate = async (e) => {
        e.preventDefault()
        try {
            setShowOtpInput(true)
            const body = { ...passwordReset }
            const { data } = await axios.post(endpoint.generateOTPResetPwd(), { emailId: body.emailId })

        } catch (error) {
            setError(error)
        }
    }

    const passwordResetOTPValidate = async (e) => {
        e.preventDefault()
        try {
            // setShowOtpInput(true)
            // const body = { ...passwordReset }
            // const { data } = await axios.post(endpoint.generateOTPResetPwd(), { emailId: body.emailId })

        } catch (error) {
            setError(error)
        }
    }

    const passwordResetSubmitHandler = async (e) => {
        e.preventDefault()
        try {
            // setShowOtpInput(true)
            // const body = { ...passwordReset }
            // const { data } = await axios.post(endpoint.generateOTPResetPwd(), { emailId: body.emailId })

        } catch (error) {
            setError(error)
        }
    }

    // change handler
    const siginChangeHandler = (e) => changeHandlerHelper(e, authBody, setAuthBody)
    const passwordResetChangeHandler = (e) => changeHandlerHelper(e, passwordReset, setPasswordReset)


    return ({
        authBody, siginChangeHandler, siginSubmitHandler,
        passwordReset, passwordResetChangeHandler,
        passwordResetOTPGenerate,
        passwordResetOTPValidate,
        passwordResetSubmitHandler,

        passwordResetSection,

        // ActionHandler
        logoutActionHandler

    })
}

export default useAuthHooks