import React, { useState } from 'react'
import { InputWithLabel, SelectWithLabel } from '../../core/Input'
import useFormHooks from '@/hooks/useFormHooks'

const ChequeStatusModel = (props) => {
    const { ChequeStatus, ChequeStatusChangeHandler, ChequeStatusSubmitHandler } = useFormHooks()
    const { closeModel } = props

    const onConfirmAction = () => {
        closeModel()
    }
    return (
        <div className='model-container'>
            <form onSubmit={e => ChequeStatusSubmitHandler(e, onConfirmAction)}>
                <div>
                    <div className='heading'>
                        <InputWithLabel
                            feilds={{
                                label: "Application No",
                                name: "applicationNo",
                                type: "staring",
                                isRequired: true,
                            }}
                            state={ChequeStatus}
                            onChangeHandler={ChequeStatusChangeHandler}
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
                        />
                    </div>
                    <div>
                        <SelectWithLabel
                            feilds={{
                                label: "Role",
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
                        />
                    </div>
                </div>
                <div className='mt-3'>
                    <button className='btn btn-outline-primary' onClick={onConfirmAction}>Cancel</button>
                    <button className='btn btn-outline-primary' type='submit'>Submit</button>
                </div>
            </form>
        </div >
    )
}

export default ChequeStatusModel