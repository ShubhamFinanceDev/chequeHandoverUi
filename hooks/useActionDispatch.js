import { useDispatch } from 'react-redux'

import { setError, setSuccess, resetValidation } from '@/redux/slice/validation.slice'
import { removeUserAuthCred, setUserAuthCred } from '@/redux/slice/auth.slice'

const useActionDispatch = () => {
    const dispatch = useDispatch()

    return ({
        setError: (e) => {
            if (e?.response?.data?.msg) {
                alert(e.response.data.msg)
            }
            dispatch(setError(e))
        },
        setSuccess: (e) => dispatch(setSuccess(e)),
        resetValidation: (e) => dispatch(resetValidation(e)),

        setUserAuthCred: (e) => dispatch(setUserAuthCred(e)),
        removeUserAuthCred: (e) => dispatch(removeUserAuthCred(e)),


    })
}

export default useActionDispatch