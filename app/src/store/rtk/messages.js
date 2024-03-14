import { createSlice } from '@reduxjs/toolkit'
import { createMessages, chatMessages } from '../../services/messages'
const messageSlice = createSlice({
    name: 'Message',
    initialState: {
        error: '',
        loading: false,
        allMessages: [],
        newMessage: {}
    },
    extraReducers: (builder) => {
        // all chat messages
        builder.addCase(chatMessages.pending, (state, action) => {
            state.loading = true

        }).addCase(chatMessages.fulfilled, (state, action) => {
            state.loading = false
            state.allMessages = action.payload
            state.error = ''
        }).addCase(chatMessages.rejected, (state, action) => {
            state.error = action.error.message
        })
        // create messages
        builder.addCase(createMessages.pending, (state, action) => {
            state.loading = true

        }).addCase(createMessages.fulfilled, (state, action) => {
            state.loading = false
            state.newMessage = action.payload
            state.error = ''
        }).addCase(createMessages.rejected, (state, action) => {
            state.error = action.error.message
        })

    }
})
export default messageSlice.reducer