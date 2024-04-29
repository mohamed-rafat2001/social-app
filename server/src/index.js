const express = require('express')
const app = express()
const env = require('dotenv').config()
const port = process.env.PORT
const cors = require('cors')
const mongoose = require('mongoose')

mongoose.set('strictQuery', true)

app.use(express.json())
app.use(cors())
const userRouter = require('./routes/user.js')
const adminRouter = require('./routes/admin')
const postsRouter = require('./routes/posts')
const youtubeRouter = require('./routes/youtube')
const commentRouter = require('./routes/comment')
const replayRouter = require('./routes/replay')
const shareRouter = require('./routes/sharePost')
const chatRouter = require('./routes/chat')
const messageRouter = require('./routes/message')

app.use(userRouter)
app.use(adminRouter)
app.use(postsRouter)
app.use(youtubeRouter)
app.use(commentRouter)
app.use(replayRouter)
app.use(shareRouter)
app.use(chatRouter)
app.use(messageRouter)

app.all('*', (req, res, next) => {
    res.status(500).json({ status: "fail", message: "this route not defined" })
})
app.use((error, req, res, next) => {
    if (process.env.MODE == "DEV") {
        return res.status(500).json({ status: "error", message: error.message, code: error.code, stack: error.stack })
    }
    res.status(error.code || 500).json({ status: "error", message: error.message, code: error.code, })

})
require('./db/mongoose')


app.listen(port, () => console.log(`server running ${port}`))