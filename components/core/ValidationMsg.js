"use client"

import React from 'react'
import { useSelector } from 'react-redux'

const ValidationMsg = () => {
    const { type, msg } = useSelector(state => state.validationSlice)
    return (msg && <p className={`text-center ${type}`}>{msg}</p>)
}

export default ValidationMsg