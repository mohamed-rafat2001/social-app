import { createSlice } from '@reduxjs/toolkit'
import { share } from '../../services/share'
const sharesSlice = createSlice({
    name: 'Share',
    initialState: {
        shares: [],
        error: '',
        loading: false

    },
    extraReducers: (builder) => {
        //all posts
        builder.addCase(share.pending, (state, action) => {
            state.loading = true
            return state
        }).addCase(share.fulfilled, (state, action) => {
            state.loading = false
            state.error = ''
            state.shares = action.payload
            return state

        }).addCase(share.rejected, (state, action) => {
            state.error = action.error.message
            return state
        })

    }
})
export default sharesSlice.reducer