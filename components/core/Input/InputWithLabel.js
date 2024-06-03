"use client"


import React from 'react'
const defaultClassNameArray = ["row mb-2", "col-12", "col-12"]

const InputWithLabel = (props) => {
    const {
        feilds = {},
        state = {},
        onChangeHandler = () => { },
        className = defaultClassNameArray,
        additinalValidation = (value) => value,
    } = props

    const {

        type = "text",
        label = "",
        placeholder = "",
        name = "",

        isDisabled = false,
        isReadOnly = false,
        isRequired = false,
        isMultiple = false,
        isHidden = false,
        maxLength = null,

    } = feilds

    const value = type == 'file' ? null : state?.[name]

    return (isHidden ? <></> :
        <div className={className[0]}>
            {label &&
                <div className={className[1]}>
                    <label>{label} {isRequired && <span />}</label>
                </div>
            }
            <div className={className[2]}>
                <input
                    type={type}
                    placeholder={placeholder}
                    name={name}

                    className='form-control'

                    value={value}
                    onChange={(e) => {
                        if (type == "file") {
                            e.target.files = additinalValidation(e.target.files)
                        } else {
                            e.target.value = additinalValidation(e.target.value)
                        }
                        onChangeHandler(e)
                    }}

                    multiple={isMultiple}
                    readOnly={isReadOnly}
                    disabled={isDisabled}
                    // hidden={isHidden}
                    maxLength={maxLength}
                    required={isRequired}
                />
            </div>
        </div>
    )
}

export default InputWithLabel