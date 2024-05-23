'use client'

import React, { useEffect, useState } from 'react'
import { InputWithLabel, SelectWithLabel } from '../../core/Input'
import useFormHooks from '@/hooks/useFormHooks'

const ChequeStatusModel = (props) => {
    const { ChequeStatus, ChequeStatusChangeHandler, ChequeStatusSubmitHandler, ChequeStatusDefaultStateHandler } = useFormHooks()
    const { closeModel, applicationNo } = props

    useEffect(() => {
        ChequeStatusDefaultStateHandler({ applicationNo })
    }, [applicationNo])

    return (
        <div className='model-container'>
            <p className='mb-3'>Upload Acknowledgement</p>
            <form onSubmit={e => ChequeStatusSubmitHandler(e, closeModel)} className='row'>
                <InputWithLabel
                    feilds={{
                        label: "Application No",
                        name: "applicationNo",
                        type: "staring",
                        isRequired: true,
                        isDisabled: true
                    }}
                    state={ChequeStatus}
                    onChangeHandler={ChequeStatusChangeHandler}
                    className={['col-12 mb-2', 'col-12', 'col-12']}
                />
                <InputWithLabel
                    feilds={{
                        label: "Date",
                        name: "date",
                        type: "date",
                        isRequired: true,
                    }}
                    state={ChequeStatus}
                    onChangeHandler={ChequeStatusChangeHandler}
                    className={['col-12 mb-2', 'col-12', 'col-12']}
                />
                <SelectWithLabel
                    feilds={{
                        label: "Handover to",
                        name: "consumerType",
                        type: "select",
                        options: [
                            { name: "Customer", value: "coustomer" },
                            { name: "seller", value: "seller" },
                        ],
                        isRequired: true,
                    }}
                    state={ChequeStatus}
                    onChangeHandler={ChequeStatusChangeHandler}
                    className={['col-12 mb-2', 'col-12', 'col-12']}

                />

                <InputWithLabel
                    feilds={{
                        label: "Upload",
                        name: "file",
                        type: "file",
                        isRequired: true,
                    }}
                    state={ChequeStatus}
                    onChangeHandler={ChequeStatusChangeHandler}
                    className={['col-12 mb-2', 'col-12', 'col-12']}

                />

                <div className='mt-2 d-flex justify-content-end'>
                    <button className='btn' onClick={closeModel}>Cancel</button>
                    <button className='btn btn-primary' type='submit'>Submit</button>
                </div>
            </form>
        </div >
    )
}

export default ChequeStatusModel