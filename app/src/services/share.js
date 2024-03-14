import { createAsyncThunk } from '@reduxjs/toolkit'
import apiApp from "../api/apiApp";

export const share = createAsyncThunk('Post/sharePost', async (id) => {
    try {
        let share = await apiApp.post(`/sharePost/${id}`)
        share = await share.data
        return share
    }
    catch (e) {
        console.log(e)
    }
})