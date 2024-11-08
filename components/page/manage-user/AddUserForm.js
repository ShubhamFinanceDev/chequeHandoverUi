'use client'

import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

import useFetchDataHooks from '@/hooks/useFetchDataHooks'
import BankCheckboxWithlabel from '@/components/core/Input/BankCheckboxWithlabel'
import {InputWithLabel,SelectWithLabel,TextAreaWithLabel} from '@/components/core/Input'
import ValidationMsg from '@/components/core/ValidationMsg'

const input = {
  select: SelectWithLabel,
  textarea: TextAreaWithLabel,
  multiCheckbox: BankCheckboxWithlabel
}

const AddUserForm = props => {
  const {showFormHandler,userBody,userBodyChangeHandler,userBodySubmitHandler,isUpdate,resetUpdateUserBody} = props
  const { fetchBranchList } = useFetchDataHooks()
  const { branchList } = useSelector(state => state.globalSlice)

  const formFeilds = [
    {
      label: 'First Name',
      name: 'firstName',
      isRequired: true
    },
    {
      label: 'Last Name',
      name: 'lastName',
      isRequired: true
    },
    {
      label: 'Mobile No.',
      name: 'mobileNo',
      isRequired: true,
      maxLength: 10
    },
    {
      label: 'Email',
      name: 'emailId',
      type: 'email',
      isRequired: true
    },
    {
      label: 'Password',
      name: 'password',
      type: 'password',
      isRequired: true,
      isHidden: isUpdate
    },
    {
      label: 'Employee code',
      name: 'empCode',
      isRequired: true,
      maxLength: 5,
      isDisabled: isUpdate
    },
    {
      label: 'Role',
      name: 'roleMasters',
      type: 'checkbox',
      options: [
        { name: 'Admin', value: 'ROLE_ADMIN' },
        { name: 'User', value: 'ROLE_USER' },
        { name: 'Report User', value: 'ROLE_REPORT_USER' }
      ],
      isRequired: true
    },
    {
      isFilter: true,
      label: 'Branch',
      name: 'assignBranches',
      placeholder: 'Search branch by name',
      options: branchList,
      type: 'multiCheckbox',
      className: ['row mb-2', 'col-12', 'col-2']
    }
  ]

  useEffect(() => {
    fetchBranchList()
  }, [])

  const handleRoleChange = (e, option) => {
    const isChecked = e.target.checked;
    let updatedRoles = [...(userBody.roleMasters || [])];
     if (isChecked) {
      updatedRoles.push({ role: option.value }); 
    } else {
      updatedRoles = updatedRoles.filter(role => role.role !== option.value);
    }
  
    userBodyChangeHandler({
      target: { name: 'roleMasters', value: updatedRoles } 
    });
  };
      const handleSelectAllChange = e => {
    const checked = e.target.checked
    const allBranchValues = checked
      ? branchList.map(branch => branch.value)
      : []
    userBodyChangeHandler({
      target: { name: 'assignBranches', value: allBranchValues }
    })
  }

  return (
    <form className='mb-4' onSubmit={e => userBodySubmitHandler(e, isUpdate)}>
      <div className='row'>
        <ValidationMsg />
        {formFeilds.map((f, idx) => {
          if (f.type === 'checkbox') {
            return (
              <div key={`feild__${idx}`} className={f.className?.join(' ')}>
                <label>{f.label}</label>
                <div>
                  {f.options.map((option, i) => {
                    const isDisabled =
                      ((option.value === 'ROLE_USER' ||
                        option.value === 'ROLE_REPORT_USER') &&
                        userBody.roleMasters?.some(role => role.role === 'ROLE_ADMIN')) ||
                      (option.value === 'ROLE_ADMIN' &&
                        userBody.roleMasters?.some(role => role.role === 'ROLE_USER'))

                    const isChecked = userBody.roleMasters?.some(role => role.role === option.value)

                    return (
                      <div key={i} className='form-check'>
                        <input
                          type='checkbox'
                          className='form-check-input'
                          name={f.name}
                          value={option.value}
                          checked={isChecked}
                          disabled={isDisabled}
                          onChange={e => handleRoleChange(e, option)}
                        />
                        <label className='form-check-label'>
                          {option.name}
                        </label>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          }

          const InputComponent = input?.[f.type] || InputWithLabel
          return (
            <InputComponent
              key={`feild__${idx}`}
              feilds={f}
              className={f.className || ['col-6 mb-2']}
              state={userBody}
              onChangeHandler={userBodyChangeHandler}
            />
          )
        })}
      </div>

      <div className='row mb-2'>
        <div className='col-12'>
          <div className='form-check'>
            <input
              type='checkbox'
              className='form-check-input col-6'
              id='select_all_branches'
              checked={userBody.assignBranches?.length === branchList.length}
              onChange={handleSelectAllChange}
              disabled={userBody.roleMasters.some(role => role.role === 'ROLE_USER')}
            />
            <label className='form-check-label' htmlFor='select_all_branches'>
              Select All Branches
            </label>
          </div>
        </div>
      </div>
      <div className='d-flex gap-1'>
        <button type='submit' className='btn btn-primary'>
          Submit
        </button>
        <button
          type='reset'
          className='btn btn-outline-primary '
          onClick={() => {
            showFormHandler()
            resetUpdateUserBody()
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

export default AddUserForm
