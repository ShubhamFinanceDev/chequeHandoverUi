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
        label = "",
        isRequired = false,
        isDisabled = false,
        isHidden = false,
        isReadOnly = false
    } = feilds

    return (
        <div className={className[0]}>
            {label && <div className={className[1]}>
                <label>{label} {isRequired && <span />}</label>
            </div>}

            {options?.map((o, idx) => (
                <div className={className[2]} key={`checkbox_${name}_${idx}`}>
                    <div className="form-check">

                        <input
                            type="checkbox"
                            className="form-check-input"
                            id={`checkbox_${name}_${idx}`}
                            name={name}
                            value={o.value}
                            checked={state?.[name]?.includes(o.value)}
                            onChange={(e) => {
                                e.target.value = additinalValidation(e.target.value)
                                onChangeHandler(e)
                            }}

                            readOnly={isReadOnly}
                            disabled={isDisabled}
                            hidden={isHidden}
                            required={isRequired}
                        />
                        <label className="form-check-label" htmlFor={`checkbox_${name}_${idx}`}>{o.name}</label>
                    </div>
                </div>
            ))}
        </div>)
}

export default MultiCheckboxWithLabel