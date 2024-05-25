import React, { useState } from 'react'
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';
// Services
import axios from '@/services/axios';
import endpoint from '@/services/endpoint';
import pageRoutes from '@/utils/pageRoutes';
// Hooks
import useActionDispatch from '@/hooks/useActionDispatch';
import { changeHandlerHelper } from '@/hooks/helper/changeHandler';


const passwordResetTestState = {
    emailId: "saurabhsingh2757@gmail.com",
    otpCode: "",
    newPassword: "saurabh8585",
    confirmNewPassword: "saurabh8585",
}

const authIninitalBody = {
    emailId: "",
    password: "",
}

const passwordResetInitialState = {
    emailId: "",
    otpCode: "",
    newPassword: "",
    confirmNewPassword: "",
    // ...passwordResetTestState
}

function useAuthHooks() {
    const router = useRouter();
    const { setError, setSuccess, setUserAuthCred, removeUserAuthCred } = useActionDispatch()

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
            Cookies.set("token", token)

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
        Cookies.remove("token")
        removeUserAuthCred()
    }

    const passwordResetOTPGenerate = async (e) => {
        e.preventDefault()
        try {
            const body = { ...passwordReset }
            const { data } = await axios.post(endpoint.generateOTPResetPwd(), { emailId: body.emailId })
            if (data.code == "1111") {
                setError(data.msg)
                return
            }
            body.otpCode = data?.otpCode || ""
            setPasswordReset(body)
            setPasswordResetSection("VALIDATE_OTP")
        } catch (error) {
            setError(error)
        }
    }

    const passwordResetOTPValidate = async (e) => {
        e.preventDefault()
        try {
            const body = { ...passwordReset }
            const { data } = await axios.post(endpoint.validateOTP(), {
                emailId: body.emailId, otpCode: body.otpCode
            })

            if (data.code == "1111") {
                setError(data.msg)
                return
            }

            setPasswordResetSection("NEW_PASSWORD")

        } catch (error) {
            setError(error)
        }
    }

    const passwordResetSubmitHandler = async (e) => {
        e.preventDefault()
        try {
            const { emailId, newPassword, confirmNewPassword } = passwordReset
            const { data } = await axios.post(endpoint.resetPassword(), {
                emailId, newPassword, confirmNewPassword
            })

            if (data.code === "0000") {
                setSuccess("Your password has been successfully reset!")
                router.push(pageRoutes.SIGIN_PAGE())
                return
            } else {
                setError(data.msg)
            }
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