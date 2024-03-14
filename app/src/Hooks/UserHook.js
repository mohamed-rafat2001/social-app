import { useSelector, useDispatch } from 'react-redux'
import { user } from '../services/userSrv'
import { useEffect, } from 'react';
export const useUser = () => {
    const data = useSelector(state => state.user.existUser)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(user())
    }, [])
    return { data }
}