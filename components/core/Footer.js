import React from 'react'

const Footer = () => {
    const date = new Date()
    return (
        <footer>
            <p>Copyright © 2018-{date.getFullYear()} Shubham Housing Development Finance Company Limited. All Rights Reserved.</p>
        </footer>
    )
}

export default Footer