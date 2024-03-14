import { createSlice } from '@reduxjs/toolkit'
import { allPosts, like, addPost } from '../../services/posts'
const postsSlice = createSlice({
    name: 'Post',
    initialState: {
        posts: [],
        post: {},
        error: '',
        loading: false

    },
    extraReducers: (builder) => {
        //add post
        builder.addCase(addPost.pending, (state, action) => {
            state.loading = true
            return state
        }).addCase(addPost.fulfilled, (state, action) => {
            state.loading = false
            state.error = ''
            state.post = action.payload
            return state

        }).addCase(addPost.rejected, (state, action) => {
            state.error = action.error.message
            return state
        })
        //all posts
        builder.addCase(allPosts.pending, (state, action) => {
            state.loading = true
            return state
        }).addCase(allPosts.fulfilled, (state, action) => {
            state.loading = false
            state.error = ''
            state.posts = action.payload
            return state

        }).addCase(allPosts.rejected, (state, action) => {
            state.error = action.error.message
            return state
        })
        // like on post
        builder.addCase(like.pending, (state, action) => {

            return state
        }).addCase(like.fulfilled, (state, action) => {
            state.loading = false
            state.error = ''
            return state

        }).addCase(like.rejected, (state, action) => {
            state.error = action.error.message
            return state
        })
    }
})
export default postsSlice.reducer