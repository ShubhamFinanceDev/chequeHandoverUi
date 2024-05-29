"use client"

import React from 'react';
import useFetchDataHooks from '@/hooks/useFetchDataHooks';

const GenrateReport = () => {

    const { generateMISReport } = useFetchDataHooks();

    return (
        <div className='d-flex justify-content-end'>
            <button className='btn btn-primary' onClick={generateMISReport}>Generate Report</button>
        </div>
    );
}

export default GenrateReport;
