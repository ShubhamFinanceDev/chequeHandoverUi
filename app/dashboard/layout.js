'use client'
import React from 'react'
import Header from '@/components/core/Header'

function LayoutPage({ children }) {
    return (
        <>
            <Header />
            <main className="container-fluid">{children}

            </main>
        </>

    )
}

export default LayoutPage