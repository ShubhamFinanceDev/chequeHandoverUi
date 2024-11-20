'use client'

import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'

import Header from '@/components/core/Header'
import pageRoutes from '@/utils/pageRoutes'
import ValidationMsg from '@/components/core/ValidationMsg'
import Footer from '@/components/core/Footer'

function LayoutPage({ children }) {
    const router = useRouter()
    // const { role, token } = useSelector(state => state.authSlice)

    // useEffect(() => {
    //     if (token && role==0) {
    //         router.push(pageRoutes.SIGIN_PAGE())
    //     }

    // }, [token])

    return (
        <>
            <Header />
            <main className="container-fluid pt-2">
                <ValidationMsg />
                {children}
            </main>
            <Footer/>
        </>

    )
}

export default LayoutPage