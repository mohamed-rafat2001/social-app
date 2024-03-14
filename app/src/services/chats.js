import { createAsyncThunk } from '@reduxjs/toolkit'
import apiApp from "../api/apiApp";

//get chats
export const chats = createAsyncThunk('Chat/getChats', async () => {
    try {
        let res = await apiApp.get('/chats')
        res = await res.data
        return res
    }
    catch (e) {
        return e.response.data
    }
}
)
// get chat 
export const singleChat = createAsyncThunk('Chat/getChat', async (chatId) => {
    try {
        let res = await apiApp.get(`/chat/${chatId}`)
        res = await res.data
        return res
    }
    catch (e) {
        return e.response.data
    }
}
)