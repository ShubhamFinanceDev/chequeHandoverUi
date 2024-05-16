'use client'

import React from 'react'
import useAuthHooks from '@/hooks/helper/useAuthHooks'
import UserEmailForm from '@/components/page/forgot-password/UserEmailForm'


function ForgotPasswordPage() {
    const useAuthHooksFn = useAuthHooks()

    return (
        <UserEmailForm useAuthHooksFn={useAuthHooksFn} />
    )
}

export default ForgotPasswordPage