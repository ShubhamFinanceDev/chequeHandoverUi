import icons from '@/env/icons'
import React from 'react'

const Header = () => {
    return (
        <header className="container-fluid p-2">
            <img src={icons.LOGO} alt="logo" />
        </header>
    )
}

export default Header