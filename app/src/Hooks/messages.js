import { useEffect, useState } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { chatMessages } from '../services/messages'
import { useUser } from '../Hooks/UserHook'
import { useSocket } from "./Socket"
export const useMessage = () => {
    const allMessages = useSelector(state => state.message.allMessages)
    const newMessage = useSelector(state => state.message.newMessage)
    const [userDetails, setUserDetails] = useState({})
    const { data } = useUser()
    const { messageNotification } = useSocket(data ? data : '')
    const allMessageNotifications = messageNotification.filter((n) => n.isRead === false).length
    const user = useSelector(state => state.chats.Chat)
    const dispatch = useDispatch()
    const messages = () => {
        return user.data ? dispatch(chatMessages({ chatId: user.data._id })) : ''
    }

    useEffect(() => {
        user.data?.members.some(user => user.userId._id === data.data?._id ? setUserDetails(user.secondId) : setUserDetails(user.userId))

        messages()

    }, [user])
    useEffect(() => {
        messages()

    }, [newMessage])
    return { chatId: user.data?._id, user: userDetails, allMessages: allMessages?.data, newMessage, allMessageNotifications }
}