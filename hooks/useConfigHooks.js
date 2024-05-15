import { restoreAuthState } from '@/redux/slice/auth.slice';
import Cookies from 'js-cookie'

const useConfigHooks = (store) => {
    const { dispatch, getState } = store

    const restoreCookies = () => {
        const user = JSON.parse(Cookies.get("user") || "{}")
        dispatch(restoreAuthState(user))
    }

    return ({ restoreCookies })
}

export default useConfigHooks

