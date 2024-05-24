import icons from '@/env/icons'
import { InputWithLabel } from '@/components/core/Input'
import ValidationMsg from '@/components/core/ValidationMsg'

const NewPasswordForm = ({ useAuthHooksFn }) => {
    const { passwordReset, passwordResetChangeHandler, passwordResetSubmitHandler } = useAuthHooksFn

    return (
        <div className="container">
            <div className="login-page-outer-container">
                <form className="login-form-inner-container" onSubmit={passwordResetSubmitHandler}>

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
                            label: "Password",
                            name: "newPassword",
                            type: "password",
                        }}
                        state={passwordReset}
                        onChangeHandler={passwordResetChangeHandler}
                    />

                    <InputWithLabel
                        feilds={{
                            label: "Confirm password",
                            name: "confirmNewPassword",
                            type: "password",
                        }}
                        state={passwordReset}
                        onChangeHandler={passwordResetChangeHandler}
                    />

                    <div className="row mt-2">
                        <div className="col-12">
                            <button type="submit" className={`btn btn-primary w-100`}>Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default NewPasswordForm