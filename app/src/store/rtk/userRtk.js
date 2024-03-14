import { createSlice } from '@reduxjs/toolkit'
import { loginSrv, signUpSrv, user } from '../../services/userSrv'


const userSlice = createSlice({
    name: "User",
    initialState: {
        error: '',
        user: {},
        existUser: {}
    },

    extraReducers: (builder) => {
        // login
        builder.addCase(loginSrv.pending, (state, action) => {
            state.loading = true
        })
            .addCase(loginSrv.fulfilled, (state, action) => {
                state.user = action.payload
                state.error = ''
                state.loading = false
            })
            .addCase(loginSrv.rejected, (state, action) => {
                state.error = action.error.message
                state.loading = false
                state.user = {}

            })
        //sign up
        builder.addCase(signUpSrv.pending, (state, action) => {
            state.loading = true
        })
            .addCase(signUpSrv.fulfilled, (state, action) => {
                state.user = action.payload
                state.error = ''
                state.loading = false
            })
            .addCase(signUpSrv.rejected, (state, action) => {
                state.error = action.error.message
                state.loading = false
                state.user = {}

            })
        //user
        builder.addCase(user.pending, (state, action) => {
            state.loading = true
        })
            .addCase(user.fulfilled, (state, action) => {
                state.existUser = action.payload
                state.error = ''
                state.loading = false
            })
            .addCase(user.rejected, (state, action) => {
                state.error = action.error
                state.loading = false
                state.existUser = {}

            })
    }
})
export default userSlice.reducer