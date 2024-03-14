import { createAsyncThunk } from '@reduxjs/toolkit'
import { storeToken } from '../api/localStorage'
import apiApp from "../api/apiApp";

//login
export const loginSrv = createAsyncThunk('User/login', async (data) => {

    try {
        let res = await apiApp.post('/login', data)
        res = await res.data
        storeToken(res.data.token)

        return res
    }
    catch (e) {
        return e.response.data
    }

})

//sign up
export const signUpSrv = createAsyncThunk('User/signUp', async (data) => {
    try {
        let res = await apiApp.post('/singUp', data)
        res = await res.data

        storeToken(res.data.token)
        return res
    }
    catch (e) {
        return e.response.data
    }

})
// user
export const user = createAsyncThunk('User/user', async () => {
    try {
        let res = await apiApp.get('/user')
        res = await res.data
        return res
    }
    catch (e) {
        console.log(e)
    }

})


