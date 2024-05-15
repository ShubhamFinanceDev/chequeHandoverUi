import { useDispatch } from 'react-redux'

import { setError, setSuccess, resetValidation } from '@/redux/slice/validation.slice'
import { setUserAuthCred } from '@/redux/slice/auth.slice'

const useActionDispatch = () => {
    const dispatch = useDispatch()

    return ({
        setError: (e) => dispatch(setError(e)),
        setSuccess: (e) => dispatch(setSuccess(e)),
        resetValidation: (e) => dispatch(resetValidation(e)),

        setUserAuthCred: (e) => dispatch(setUserAuthCred(e)),


    })
}

export default useActionDispatch