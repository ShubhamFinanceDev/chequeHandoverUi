import icons from '@/env/icons'
import { InputWithLabel } from '@/components/core/Input'

const UserEmailForm = ({ useAuthHooksFn }) => {
    const { passwordReset, passwordResetChangeHandler, passwordResetOTPValidate } = useAuthHooksFn

    return (
        <div className="container">
            <div className="login-page-outer-container">
                <form className="login-form-inner-container" onSubmit={passwordResetOTPValidate}>

                    <img src={icons.LOGO} alt="Logo" />
                    <h2>Reset your password</h2>

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
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UserEmailForm