"use client"


import React from 'react'
const defaultClassNameArray = ["row", "col-12", "col-12"]

const SelectWithLabel = (props) => {
    const {
        feilds = {},
        state = {},
        onChangeHandler = () => { },
        className = defaultClassNameArray,
        additinalValidation = (value) => value,
    } = props

    const {
        options = [],
        name = "",
        id = "",
        label = "",
        isRequired = false,
        isDisabled = false,
        isHidden = false,
        isReadOnly = false
    } = feilds

    return (
        <div className={className[0]}>
            {label && <div className={className[1]}>
                <label htmlFor={id || name}>{label} {isRequired && <span />}</label>
            </div>}

            <div className={className[2]}>
                <select
                    id={id || name}
                    name={name}
                    className='form-control'

                    value={state?.[name]}
                    onChange={(e) => {
                        e.target.value = additinalValidation(e.target.value)
                        onChangeHandler(e)
                    }}

                    readOnly={isReadOnly}
                    disabled={isDisabled}
                    hidden={isHidden}
                    required={isRequired}
                >
                    <option value="" hidden></option>
                    {options?.map((o) => (
                        <option value={o.value} key={`option__${name}__${o.value}`}>{o.name}</option>
                    ))}
                </select>
            </div>

        </div>)
}

export default SelectWithLabel