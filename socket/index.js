const { Server } = require("socket.io");
const io = new Server({ cors: "http://localhost:3000/" })
let onLineUsers = []
io.on("connection", socket => {
    console.log("new connection", socket.id)
    socket.on('addUser', (userId) => {
        !onLineUsers.some((user) => user.userId === userId) &&
            onLineUsers.push({
                userId,
                socketId: socket.id
            })

        io.emit('getUsersOnLine', onLineUsers)
    })
    socket.on('sendMessage', ({ newMessage, userId }) => {
        const user = onLineUsers.find((user) => user.userId === userId)
        if (user) {
            console.log(newMessage)

            io.to(user.socketId).emit('getMessage', newMessage)
            io.to(user.socketId).emit('notification', {
                senderId: newMessage.data.senderId,
                isRead: false,
            })
        }
        console.log(newMessage)
        // console.log('userid', { userId })

    })
    socket.on('disconnect', () => {
        onLineUsers = onLineUsers.filter((user) => user.socketId !== socket.id)
        io.emit("getUsersOnLine", onLineUsers)
        // console.log(onLineUsers)
    })




})

io.listen("4000")