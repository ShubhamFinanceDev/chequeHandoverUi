'use client'

import React from 'react'
import { InputWithLabel } from '@/components/core/Input'
import icons from '@/env/icons'
import Link from 'next/link'
import pageRoutes from '@/utils/pageRoutes'
import useAuthHooks from '@/hooks/helper/useAuthHooks'


function SingInPages() {
  const { authBody, siginSubmitHandler, siginChangeHandler } = useAuthHooks()
  return (
    <div className="container">
      <div className="login-page-outer-container">
        <form
          onSubmit={siginSubmitHandler}
          className="login-form-inner-container">
          <img src={icons.LOGO} alt="Logo" />

          <InputWithLabel
            feilds={{
              label: "Email",
              name: "email",
              state: authBody,
              onChangeHandler: siginChangeHandler
            }}
          />
          <InputWithLabel
            feilds={{
              label: "Password",
              name: "password",
              type: "password",
              state: authBody,
              onChangeHandler: siginChangeHandler
            }}
          />

          <div className="row">
            <div className="col-12">
              <button type="submit" className={`btn btn-primary w-100 mt-3`}>Sign In</button>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <Link href={pageRoutes.FORGOT_PASSWORD()}>
                <button className={`btn btn-outline-primary w-100 mt-3`}>Forgot password</button>
              </Link>

            </div>
          </div>

        </form>
      </div>
    </div>
  )
}

export default SingInPages