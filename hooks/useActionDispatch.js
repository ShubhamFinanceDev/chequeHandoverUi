import { useDispatch } from 'react-redux'

import { setError, setSuccess, resetValidation } from '@/redux/slice/validation.slice'
import { removeUserAuthCred, setUserAuthCred } from '@/redux/slice/auth.slice'
import { setApplicationDetails, setBankList } from '@/redux/slice/global.slice'

const useActionDispatch = () => {
    const dispatch = useDispatch()

    return ({
        setError: (e) => {
            if (e?.response?.data?.msg) {
                dispatch(setError(e.response.data.msg))
            } else {
                dispatch(setError(e))
            }
        },
        setSuccess: (e) => dispatch(setSuccess(e)),
        resetValidation: (e) => dispatch(resetValidation(e)),

        setUserAuthCred: (e) => dispatch(setUserAuthCred(e)),
        removeUserAuthCred: (e) => dispatch(removeUserAuthCred(e)),
        setBankList: (e) => dispatch(setBankList(e)),
        setApplicationDetails: (e) => dispatch(setApplicationDetails(e)),

    })
}

export default useActionDispatch