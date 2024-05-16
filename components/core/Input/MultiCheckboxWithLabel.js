"use client"

import React from 'react'
const defaultClassNameArray = ["row mb-2", "col-12", "col-12"]

const MultiCheckboxWithLabel = (props) => {
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

            {options?.map((o) => (
                <>
                    <div className={className[2]}>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked"
                                name={name}
                                checked={state?.[name]}
                                onChange={(e) => {
                                    e.target.value = additinalValidation(e.target.value)
                                    onChangeHandler(e)
                                }}

                                readOnly={isReadOnly}
                                disabled={isDisabled}
                                hidden={isHidden}
                                required={isRequired}
                            />
                            <label class="form-check-label" for="flexCheckChecked">{o.name}</label>
                        </div>
                    </div>
                </>
            ))}


        </div>)
}

export default MultiCheckboxWithLabel