"use client"

import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

import useFetchDataHooks from '@/hooks/useFetchDataHooks'
import useAdminFormHooks from '@/hooks/useAdminFormHooks'
import BankCheckboxWithlabel from '@/components/core/Input/BankCheckboxWithlabel'
import { InputWithLabel, SelectWithLabel, TextAreaWithLabel } from '@/components/core/Input'


const input = {
    select: SelectWithLabel,
    textarea: TextAreaWithLabel,
    multiCheckbox: BankCheckboxWithlabel,
}

const AddUserForm = (props) => {
    const { showFormHandler, userBody, userBodyChangeHandler, userBodySubmitHandler, isUpdate, resetUpdateUserBody } = props
    const { fetchBranchList } = useFetchDataHooks()
    const { branchList } = useSelector(state => state.globalSlice)

    const formFeilds = [
        {
            label: "First Name",
            name: "firstname",
            isRequired: true,
        },
        {
            label: "Last Name",
            name: "lastName",
            isRequired: true,
        },
        {
            label: "Mobile No.",
            name: "mobileNo",
            isRequired: true,
            maxLength: 10,
        },
        {
            label: "Email",
            name: "emailId",
            type: "email",
            isRequired: true,
        },
        {
            label: "Password",
            name: "password",
            type: "password",
            isRequired: true,
            isHidden: isUpdate
        },
        {
            label: "Employee code",
            name: "empCode",
            isRequired: true,
            maxLength: 5,
            isHidden: isUpdate
        },

        {
            label: "Role",
            name: "roleMasters",
            type: "select",
            options: [
                { name: "Admin", value: "ROLE_ADMIN" },
                { name: "User", value: "ROLE_USER" },
            ],
            isRequired: true,
        },
        {
            isFilter: true,
            label: "Branch",
            name: "assignBranches",
            placeholder: "Search branch by name",
            options: branchList,
            type: "multiCheckbox",
            className: ["row mb-2", "col-12", "col-2"]
        },
    ]

    useEffect(() => {
        fetchBranchList()
    }, [])

    return (
        <form className='mb-4' onSubmit={(e) => userBodySubmitHandler(e, isUpdate)}>
            {/* {JSON.stringify(userBody)} */}
            <div className="row">
                {formFeilds.map((f, idx) => {
                    const InputComponent = input?.[f.type] || InputWithLabel
                    const classNameArray = f?.className || ["col-6 mb-2", "col-12", "col-12"]
                    return (<InputComponent
                        key={`feild__${idx}`}
                        feilds={f}
                        className={classNameArray}
                        state={userBody}
                        onChangeHandler={userBodyChangeHandler}
                    />)
                })}
            </div>
            <div className='d-flex gap-1'>
                <button type='submit' className='btn btn-primary'>Submit</button>
                <button
                    type='reset' className='btn btn-outline-primary ' onClick={() => {
                        showFormHandler()
                        resetUpdateUserBody()
                    }}>Cancel</button>
            </div>

        </form>
    )
}

export default AddUserForm