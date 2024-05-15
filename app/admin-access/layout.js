'use client'

import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { usePathname, useRouter } from 'next/navigation'

import Header from '@/components/core/Header'
import pageRoutes, { adminNavitem } from '@/utils/pageRoutes'
import Link from 'next/link'

function LayoutPage({ children }) {
    const router = useRouter()
    const pathname = usePathname()
    const { isAdmin, token } = useSelector(state => state.authSlice)

    useEffect(() => {
        if (token && !isAdmin) {
            router.push(pageRoutes.SIGIN_PAGE())
        }
    }, [token])

    return (
        <>
            <Header />
            <main className="container-fluid">
                <div className="row">
                    <div className="col-2 mb-4">
                        <div className='p-3'>
                            {adminNavitem.map((i) => (
                                <Link href={i.path} className='row mt-2'>
                                    <button className={`btn text-start ${pathname == i.path ? "btn-primary" : "btn-secondary"}`}>{i.label}</button>
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className="col-10 pt-4">{children}</div>
                </div>
            </main>
        </>

    )
}

export default LayoutPage