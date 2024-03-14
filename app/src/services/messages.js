import { createAsyncThunk } from '@reduxjs/toolkit'
import apiApp from "../api/apiApp";

//create messages 
export const createMessages = createAsyncThunk('Messages/createMessages', async ({ chatId, dataa }) => {
    try {
        let res = await apiApp.post(`/message/${chatId}`, dataa)
        res = await res.data
        console.log(res)
        return res
    }
    catch (e) {
        return e.response.data
    }
}
)
//chat messages 
export const chatMessages = createAsyncThunk('Messages/chatMessages', async ({ chatId }) => {
    try {
        let res = await apiApp.get(`/message/${chatId}`)
        res = await res.data
        return res
    }
    catch (e) {
        return e.response.data
    }
}
)
