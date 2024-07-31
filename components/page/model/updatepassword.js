import React from 'react'
import { InputWithLabel, SelectWithLabel } from '@/components/core/Input'
import { useSelector } from "react-redux";
import useFormHooks from '@/hooks/useFormHooks';
import ValidationMsg from '@/components/core/ValidationMsg';

const UpdatePasswordModel = () => {
    const { userDetails: { userDetailResponse } } = useSelector((state) => state.globalSlice);
    const { updatePassword, UpdatePasswordChangeHandler, UpdatePasswordSubmitHandler } = useFormHooks()

    return (
        <div className="container">
            <div className='mt-4'>
                <form onSubmit={UpdatePasswordSubmitHandler} >
                    <ValidationMsg />
                    <SelectWithLabel
                        feilds={{
                            label: "Email",
                            name: "email",
                            options: userDetailResponse?.map((d) => ({
                                name: d.emailId,
                                value: d.emailId,
                            })),
                            isRequired: true
                        }}
                        state={updatePassword}
                        onChangeHandler={UpdatePasswordChangeHandler}
                    />
                    {/* <InputWithLabel
                        feilds={{
                            label: "Old Password",
                            name: "oldPassword",
                            type: "password",
                            isRequired: true

                        }}
                        state={updatePassword}
                        onChangeHandler={UpdatePasswordChangeHandler}
                        isRequired={true}
                    /> */}
                    <InputWithLabel
                        feilds={{
                            label: "New Password",
                            name: "newPassword",
                            type: "password",
                            isRequired: true

                        }}
                        state={updatePassword}
                        onChangeHandler={UpdatePasswordChangeHandler}
                    />

                    <InputWithLabel
                        feilds={{
                            label: "Confirm Password",
                            name: "confirmNewPassword",
                            type: "password",
                            isRequired: true
                        }}
                        state={updatePassword}
                        onChangeHandler={UpdatePasswordChangeHandler}
                    />


                    <div className="row mt-3">
                        <div className="col-md-12 col-12 d-flex justify-content-end">
                            <button className="btn btn-primary ">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UpdatePasswordModel