import { createSlice } from '@reduxjs/toolkit'
import { chats, singleChat } from '../../services/chats'
const chatSlice = createSlice({
    name: 'Chat',
    initialState: {
        error: '',
        loading: false,
        Chats: [],
        Chat: {}
    },
    extraReducers: (builder) => {
        //get all chats
        builder.addCase(chats.pending, (state, action) => {
            state.loading = true

        }).addCase(chats.fulfilled, (state, action) => {
            state.loading = false
            state.Chats = action.payload
            state.error = ''
        }).addCase(chats.rejected, (state, action) => {
            state.error = action.error.message
        })
        //get single chat
        builder.addCase(singleChat.pending, (state, action) => {
            state.loading = true

        }).addCase(singleChat.fulfilled, (state, action) => {
            state.loading = false
            state.Chat = action.payload
            state.error = ''
        }).addCase(singleChat.rejected, (state, action) => {
            state.error = action.error.message
        })
    }
})
export default chatSlice.reducer