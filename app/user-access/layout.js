'use client'

import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'

import Header from '@/components/core/Header'
import pageRoutes from '@/utils/pageRoutes'
import ValidationMsg from '@/components/core/ValidationMsg'

function LayoutPage({ children }) {
    const router = useRouter()
    const { isAdmin, token } = useSelector(state => state.authSlice)

    useEffect(() => {
        if (token && isAdmin) {
            router.push(pageRoutes.SIGIN_PAGE())
        }

    }, [token])

    return (
        <>
            <Header />
            <main className="container-fluid pt-2">
                <ValidationMsg />
                {children}
            </main>
        </>

    )
}

export default LayoutPage