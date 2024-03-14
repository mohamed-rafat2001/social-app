import { createAsyncThunk } from '@reduxjs/toolkit'
import apiApp from "../api/apiApp";
//create post
export const addPost = createAsyncThunk('Post/addPost', async (body) => {
    try {
        let post = await apiApp.post('/post', body)
        post = await post.data
        console.log(body)
        return post
    }
    catch (e) {
        return e.message
    }
})
export const allPosts = createAsyncThunk('Post/allPosts', async () => {
    try {
        let posts = await apiApp.get('/posts')
        posts = await posts.data
        return posts
    }
    catch (e) {
        return e.message
    }
})
export const like = createAsyncThunk('Post/postLike', async (id) => {
    try {
        let posts = await apiApp.patch(`/post/like/${id}`)
        posts = await posts.data
        return posts
    }
    catch (e) {
        return e.message
    }
})
