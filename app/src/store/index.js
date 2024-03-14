import { configureStore, combineReducers } from '@reduxjs/toolkit'
import userSlice from './rtk/userRtk'
import postsSlice from './rtk/postsRtk'
import shareSlice from './rtk/shareRtk'
import chatSlice from './rtk/chats'
import messageSlice from './rtk/messages'
const reducer = combineReducers({
    user: userSlice,
    posts: postsSlice,
    shares: shareSlice,
    chats: chatSlice,
    message: messageSlice
})

const store = configureStore({
    reducer,

})
export default store