import React from 'react'
import icons from '@/env/icons'

function SearchInput() {
    return (
        <div className="search-input">
            <div className="search-input-form">
                <input
                    type="text"
                    placeholder="Search by Name"
                // value={searchQuery}
                // onChange={(e) => setSearchQuery(e.target.value)}
                />
                <img src={icons.Icon1} alt="search" />
            </div>
        </div>
    )
}

export default SearchInput