import icons from '@/env/icons'
import { InputWithLabel } from '@/components/core/Input'
import Link from 'next/link'
import pageRoutes from '@/utils/pageRoutes'

const UserEmailForm = ({ useAuthHooksFn }) => {
    const { passwordReset, passwordResetChangeHandler, passwordResetOTPGenerate } = useAuthHooksFn

    return (
        <div className="container">
            <div className="login-page-outer-container">
                <form className="login-form-inner-container" onSubmit={passwordResetOTPGenerate}>

                    <img src={icons.LOGO} alt="Logo" />
                    <h2>Reset your password</h2>

                    <InputWithLabel
                        feilds={{
                            type: "email",
                            label: "Email",
                            name: "emailId",
                            isRequired: true
                        }}
                        state={passwordReset}
                        onChangeHandler={passwordResetChangeHandler}
                    />

                    <div className="row mt-2">
                        <div className="col-12">
                            <button type="submit" className={`btn btn-primary w-100`}>Request OTP</button>
                            <Link href={pageRoutes.SIGIN_PAGE()}><button className={`btn btn-link w-100 mt-2`}>Go back login</button></Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UserEmailForm