"use client"

import useActionDispatch from '@/hooks/useActionDispatch'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

const ValidationMsg = () => {
    const { type, msg } = useSelector(state => state.validationSlice)
    const { resetValidation } = useActionDispatch()
    useEffect(() => {
        setTimeout(() => {
            resetValidation()
        }, 1000);
    }, [type, msg])
    return (msg && <p className={`text-center ${type}`}>{msg}</p>)
}

export default ValidationMsg