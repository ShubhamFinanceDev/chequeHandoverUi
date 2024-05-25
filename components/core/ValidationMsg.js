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
        }, 5000);
    }, [type, msg])
    return (msg && <p className={`text-center ${type}`}>
        {msg}
        {/* <button onClick={resetValidation} className='btn p-0 m-0'>(Dismiss)</button> */}
    </p>)
}

export default ValidationMsg