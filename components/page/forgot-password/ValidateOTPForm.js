import icons from '@/env/icons'
import { InputWithLabel } from '@/components/core/Input'
import ValidationMsg from '@/components/core/ValidationMsg'

const ValidateOTPForm = ({ useAuthHooksFn }) => {
    const { passwordReset, passwordResetChangeHandler, passwordResetOTPValidate, passwordResetOTPGenerate } = useAuthHooksFn

    return (
        <div className="container">
            <div className="login-page-outer-container">
                <form className="login-form-inner-container" onSubmit={passwordResetOTPValidate}>

                    <img src={icons.LOGO} alt="Logo" />

                    <h2>Reset your password</h2>
                    <ValidationMsg />

                    <InputWithLabel
                        feilds={{
                            label: "Email",
                            name: "emailId",
                            isDisabled: true,
                            isRequired: true
                        }}
                        state={passwordReset}
                        onChangeHandler={passwordResetChangeHandler}
                    />

                    <InputWithLabel
                        feilds={{
                            label: "OTP",
                            name: "otpCode",
                            maxLength: 6,
                            isRequired: true
                        }}
                        state={passwordReset}
                        onChangeHandler={passwordResetChangeHandler}
                    />

                    <div className="row mt-2">
                        <div className="col-12">
                            <button type="submit" className={`btn btn-primary w-100`}>Validate OTP</button>
                            <button type="button" className={`btn w-100`} onClick={passwordResetOTPGenerate}>Didn&apos;t receive the code? Resend OTP</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ValidateOTPForm