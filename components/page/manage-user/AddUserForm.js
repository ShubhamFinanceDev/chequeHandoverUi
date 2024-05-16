"use client"

import React, { useEffect } from 'react'
import {
    InputWithLabel,
    SelectWithLabel,
    TextAreaWithLabel
} from '@/components/core/Input'
import MultiCheckboxWithLabel from '@/components/core/Input/MultiCheckboxWithLabel'
import useFetchDataHooks from '@/hooks/useFetchDataHooks'

const input = {
    select: SelectWithLabel,
    textarea: TextAreaWithLabel,

}


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
        type: "number",
        isRequired: true,
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
    },
    {
        label: "Role",
        name: "role",
        type: "select",
        options: [
            { name: "Admin", value: "admin" },
        ],
        isRequired: true,
    },
]

const AddUserForm = () => {
    const { fetchBranchList } = useFetchDataHooks()
    useEffect(() => {
        fetchBranchList()
    }, [])
    return (
        <form className='mb-4'>
            <div className="row">
                {formFeilds.map((f) => {
                    const InputComponent = input?.[f.type] || InputWithLabel
                    return (<InputComponent feilds={f} className={["col-6 mb-2", "col-12", "col-12"]} />)
                })}

                <MultiCheckboxWithLabel
                    className={["row mb-2", "col-12", "col-3"]}
                    feilds={{
                        label: "Branch",
                        name: "branch",
                        isRequired: true,
                        options: [
                            { name: "Hello", value: "hello" },
                            { name: "Hello", value: "hello" },
                            { name: "Hello", value: "hello" },
                            { name: "Hello", value: "hello" },
                            { name: "Hello", value: "hello" },
                            { name: "Hello", value: "hello" },
                        ]
                    }}
                />
            </div>
        </form>
    )
}

export default AddUserForm