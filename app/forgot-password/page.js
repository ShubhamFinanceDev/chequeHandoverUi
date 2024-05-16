'use client'

import React from 'react'
import useAuthHooks from '@/hooks/useAuthHooks'
import UserEmailForm from '@/components/page/forgot-password/UserEmailForm'
import ValidateOTPForm from '@/components/page/forgot-password/ValidateOTPForm'
import NewPasswordForm from '@/components/page/forgot-password/NewPasswordForm'


function ForgotPasswordPage() {
    const useAuthHooksFn = useAuthHooks()
    const { passwordResetSection } = useAuthHooksFn

    switch (passwordResetSection) {
        case "VALIDATE_OTP":
            return (<ValidateOTPForm useAuthHooksFn={useAuthHooksFn} />)

        case "NEW_PASSWORD":
            return (<NewPasswordForm useAuthHooksFn={useAuthHooksFn} />)

        default:
            return (<UserEmailForm useAuthHooksFn={useAuthHooksFn} />)
    }

}

export default ForgotPasswordPage