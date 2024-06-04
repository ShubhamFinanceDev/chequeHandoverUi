import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

const useSearchParamHooks = () => {
    const searchParams = useSearchParams()
    const [params, setParams] = useState({ update: false })

    useEffect(() => {
        const para = Object.fromEntries(searchParams.entries())
        setParams(para)
    }, [searchParams])

    return (params)
}

export default useSearchParamHooks