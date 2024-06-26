'use client'

import React from 'react'
import { InputWithLabel } from '@/components/core/Input'
import icons from '@/env/icons'
import Link from 'next/link'
import pageRoutes from '@/utils/pageRoutes'
import useAuthHooks from '@/hooks/useAuthHooks'
import ValidationMsg from '@/components/core/ValidationMsg'


function SingInPages() {
  const { authBody, siginSubmitHandler, siginChangeHandler } = useAuthHooks()
  return (
    <div className="container">
      <div className="login-page-outer-container">
        <form
          onSubmit={siginSubmitHandler}
          className="login-form-inner-container">
          <img src={icons.LOGO} alt="Logo" className='mb-3' />

          <ValidationMsg />

          <InputWithLabel
            feilds={{
              label: "Email",
              name: "emailId",
              type: "email",
              isRequired: true,
            }}
            state={authBody}
            onChangeHandler={siginChangeHandler}
          />
          <InputWithLabel
            feilds={{
              label: "Password",
              name: "password",
              type: "password",
              isRequired: true,
            }}
            state={authBody}
            onChangeHandler={siginChangeHandler}
          />

          <div className="row">
            <div className="col-12">
              <button type="submit" className={`btn btn-primary w-100 mt-3`}>Sign In</button>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <Link href={pageRoutes.FORGOT_PASSWORD()}>
                <button className={`btn btn-link w-100 mt-2`}>Forgotten your password?</button>
              </Link>

            </div>
          </div>

        </form>
      </div>
    </div>
  )
}

export default SingInPages