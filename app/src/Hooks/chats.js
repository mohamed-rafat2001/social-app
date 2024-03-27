import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { chats } from '../services/chats'
export const useChats = () => {
    const data = useSelector(state => state.chats.Chats)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(chats())
    }, [data])
    return { data }
}
