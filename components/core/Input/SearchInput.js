"use client"

import React from 'react'
import icons from '@/env/icons'

function SearchInput(props) {
    const { state = "", setState = () => { } } = props
    return (
        <div className="search-input">
            <div className="search-input-form">
                <input
                    type="text"
                    placeholder="Search"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                />
                <img src={icons.Icon1} alt="search" />
            </div>
        </div>
    )
}

export default SearchInput