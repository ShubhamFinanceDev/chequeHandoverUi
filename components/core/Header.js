import React from 'react'
import { useSelector } from 'react-redux'
import icons from '@/env/icons'
import useAuthHooks from '@/hooks/useAuthHooks'

const Header = () => {
    const { email } = useSelector(state => state.authSlice)
    const { logoutActionHandler } = useAuthHooks()

    return (
        <header className="container-fluid p-2">
            <img src={icons.NAVLOGO} alt="logo" />
            <button className='btn btn-primary' onClick={logoutActionHandler}>Logout {email && `(${email})`}</button>
        </header>
    )
}

export default Header