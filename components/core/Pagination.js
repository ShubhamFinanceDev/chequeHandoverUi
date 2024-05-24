import React from 'react'

const Pagination = ({ meta, next }) => {
    // totalPages: totalCount / 100,
    // currentPage: page,
    // isNextPage: nextPage,

    if (meta?.totalPages == 0) {
        return (
            <div className="pagination">
                <p>No Data Found</p>
            </div>
        )
    } else if (meta?.totalPages > 0) {
        return (
            <div className="pagination mb-3">
                <button
                    onClick={() => next(meta.currentPage - 1)}
                    disabled={meta.currentPage <= 1}
                >Previous Page</button>

                <p>{meta.currentPage} / {meta.totalPages}</p>

                <button
                    disabled={!meta.isNextPage}
                    onClick={() => next(meta.currentPage + 1)}
                >Next Page</button>
            </div>
        )
    } else {
        return <></>
    }
}

export default Pagination