'use client'

import React from 'react'
import icons from '@/env/icons'
import { InputWithLabel } from '@/components/core/Input'
import Link from 'next/link'
import pageRoutes from '@/utils/pageRoutes'
import useAuthHooks from '@/hooks/helper/useAuthHooks'


function ForgotPasswordPage() {
    const { showOtpInput, otpGeneratesState, showPasswordInput, requestOTPSubmitHandler, forgotSubmitHandler, otpChangeHandler } = useAuthHooks()
    return (
        <div className="container">
            <div className="login-page-outer-container">
                <form onSubmit={showOtpInput ? forgotSubmitHandler : requestOTPSubmitHandler}
                    className="login-form-inner-container">
                    <img src={icons.LOGO} alt="Logo" />

                    <InputWithLabel
                        feilds={{
                            label: "Email",
                            name: "email",
                            state: otpGeneratesState,
                            onChangeHandler: otpChangeHandler,
                            disabled: showOtpInput

                        }}
                    />
                    {showOtpInput &&
                        <InputWithLabel
                            feilds={{
                                label: "OTP",
                                name: "otp",
                                state: otpGeneratesState,
                                onChangeHandler: otpChangeHandler,
                                maxLength: 4,
                                disabled: !showOtpInput

                            }}
                        />
                    }
                    {showPasswordInput &&
                        <InputWithLabel
                            feilds={{
                                label: "Change Password",
                                name: "Changepassword",
                                type: "password",
                                state: "",
                                onChangeHandler: ''
                            }}
                        />
                    }
                    <div className="mt-3">
                        <button type="submit" className={`btn btn-primary w-100`}>              {showOtpInput ? "Submit" : "Request OTP"}
                        </button>
                        <Link href={pageRoutes.SIGIN_PAGE()}>
                            <button className={`btn btn-outline-primary w-100 mt-3`}>GO Back Login</button>
                        </Link>

                    </div>
                </form>
            </div>
        </div>
    )
}

export default ForgotPasswordPage