"use client"

import React, { useState } from 'react'
const defaultClassNameArray = ["row mb-2", "col-12", "col-12"]

const BankCheckboxWithlabel = (props) => {
    const [query, setQuery] = useState("")

    const {
        feilds = {},
        state = {},
        onChangeHandler = () => { },
        className = defaultClassNameArray,
        additinalValidation = (value) => value,
    } = props

    const {
        isFilter = false,
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

            {isFilter && (
                <div className="col-12 mt-2 mb-3">
                    <input type="text" className='form-control' value={query} onChange={(e) => setQuery(e.target.value)} />

                </div>
            )}

            {options.filter((d) => state?.[name]?.includes(d.value))?.map((o) => (
                <div className={className[2]} key={`checkbox_${name}_${o.value}`}>
                    <div className="form-check">

                        <input
                            type="checkbox"
                            className="form-check-input"
                            id={`checkbox_${name}_${o.value}`}
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
                        <label className="form-check-label" htmlFor={`checkbox_${name}_${o.value}`}>{o.name}</label>
                    </div>
                </div>
            ))}

            {query && options.filter((d) => d?.name?.toLowerCase()?.includes(query) && !state?.[name]?.includes(d.value))?.map((o) => (
                <div className={className[2]} key={`checkbox_${name}_${o.value}`}>
                    <div className="form-check">

                        <input
                            type="checkbox"
                            className="form-check-input"
                            id={`checkbox_${name}_${o.value}`}
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
                        <label className="form-check-label" htmlFor={`checkbox_${name}_${o.value}`}>{o.name}</label>
                    </div>
                </div>
            ))}

            {/* {JSON.stringify(state?.[name])} */}



        </div>)
}

export default BankCheckboxWithlabel