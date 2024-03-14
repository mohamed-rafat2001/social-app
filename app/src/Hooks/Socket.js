import { useEffect, useState } from 'react';
import { io } from "socket.io-client"
import { useSelector, useDispatch } from 'react-redux'
import { chatMessages } from '../services/messages'
export const useSocket = ({ data }) => {
    const [onlineUsers, setOnlineUsers] = useState([])
    const [isOnline, setOnline] = useState(false)
    const [socket, setSocket] = useState(null)
    const [userId, setId] = useState(null)
    const newMessage = useSelector(state => state.message.newMessage)
    const [userDetails, setUserDetails] = useState({})
    const [chatOpen, setChatOpen] = useState(false)
    const [messageNotification, setMessageNotification] = useState([])
    const user = useSelector(state => state.chats.Chat)
    const dispatch = useDispatch()

    useEffect(() => {

        const newSocket = io("http://localhost:4000/")
        setSocket(newSocket)
        return () => {
            newSocket.disconnect()
        }

    }, [data])
    useEffect(() => {
        if (socket === null) return
        socket.emit('addUser', data?._id)
        socket.on('getUsersOnLine', (res) => {
            setOnlineUsers(res)

        })
        return () => socket.off('getUsersOnLine')
    }, [socket])

    useEffect(() => {
        if (socket === null) return

        user.data?.members.some(user => user.userId._id === newMessage.data?.senderId ? setId(user.secondId._id) : setId(user.userId._id))
        user.data?.members.some(user => user.userId._id === newMessage.data?.senderId ? setChatOpen(true) :
            user.secondId._id === newMessage.data?.senderId ? setChatOpen(true) : setChatOpen(false))
        socket.emit('sendMessage', { newMessage, userId })

    }, [newMessage, userId])
    useEffect(() => {
        if (socket === null) return
        socket.on('getMessage', res => {
            if (user.data?._id !== res.data.chatId) return
            dispatch(chatMessages({ chatId: res.data.chatId }))
            console.log(user)

        })



        return () => {
            socket.off('getMessage')

        }

    }, [socket, newMessage, user])
    useEffect(() => {
        if (socket === null) return
        socket.on('notification', res => {
            if (chatOpen) {
                console.log(res)
                setMessageNotification(prev => [{ ...res, isRead: true }, ...prev])
                console.log(messageNotification)
                console.log('chat open')
            }
            else {
                setMessageNotification(prev => [res, ...prev])
                // console.log(messageNotification)
                console.log('chat not open')


            }
        })

        return () => {

            socket.off('notification')
        }

    }, [socket, chatOpen])

    return ({ onlineUsers, messageNotification })
}