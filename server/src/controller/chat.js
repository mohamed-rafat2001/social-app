const Chat = require('../models/chat')
const User = require('../models/user')

const appError = require('../utils/appError')
const errorHandler = require('../middelwares/errorHandler')
//create chat
const createChat = errorHandler(
    async (req, res, next) => {
        const userId = req.user._id
        const secondId = req.body.secondId
        const findSecondId = await User.findById(secondId)
        if (!findSecondId) {
            const error = appError.Error('user not found', 'fail', 404)
            return next(error)
        }
        const findChat = await Chat.findOne({ members: { $elemMatch: { userId, secondId } } })
        if (findChat) {
            return res.status(200).send({ status: 'success', data: findChat })

        }
        const chat = await Chat({ members: { userId, secondId } })
        if (!chat) {
            const error = appError.Error('not create chat', 'fail', 404)
            return next(error)
        }
        await chat.save()
        res.status(200).send({ status: 'success', data: chat })
    }
)
const findChat = errorHandler(
    async (req, res, next) => {

        const _id = req.params.id
        const chat = await Chat.findById(_id).populate(['members.secondId', 'members.userId'])
        if (!chat) {
            const error = appError.Error('chat not found', 'fail', 404)
            return next(error)
        }
        res.status(200).send({ status: 'success', data: chat })
    }
)
const findUserChats = errorHandler(
    async (req, res, next) => {
        const userId = req.user._id
        const chat = await Chat.find({
            members: {
                $elemMatch: {
                    $or: [{ userId }, { secondId: userId }]
                }
            }
        }).populate(['members.secondId', 'members.userId'])
        if (chat.length == 0) {
            const error = appError.Error('chats not found', 'fail', 404)
            return next(error)
        }

        res.status(200).send({ status: 'success', data: chat })

    }
)

const deleteChat = errorHandler(
    async (req, res, next) => {
        const userId = req.user._id
        const secondId = req.params.id
        const chat = await Chat.findOneAndDelete({ userId, secondId })
        if (!chat) {
            const error = appError.Error('chats not found', 'fail', 404)
            return next(error)
        }

        res.status(200).send({ status: 'success', data: chat })

    }
)
function List() {

    this.listSize = 0
    this.pos = 0
    this.dataStore = []
    this.append = append
    this.find = find
    this.remove = remove
    this.length = length
    this.toString = toString
    this.insert = insert
    this.clear = clear
    this.getElement = getElement
    this.contains = contains



    this.front = front
    this.end = end
    this.prev = prev
    this.next = next
    this.currPos = currPos
    this.moveTo = moveTo

    /// apppend func
    function append(ele) {
        this.dataStore[this.listSize++] = ele
    }
    //find func 
    function find(ele) {
        for (let i = 0; i < this.dataStore.length; i++) {
            if (this.dataStore[i] == ele) {
                return i
            }
        }
        return -1
    }
    // remove func
    function remove(ele) {
        const findAt = this.find(ele)
        if (findAt > -1) {
            this.dataStore.splice(findAt, 1)
            --this.listSize
            return true
        }
        return false
    }
    // length func
    function length() {
        return this.listSize
    }
    // toString func
    function toString() {
        return this.dataStore
    }
    // insert func 
    function insert(ele, after) {
        const insertPos = this.find(after)
        if (insertPos > -1) {
            this.dataStore.splice(insertPos + 1, 0, ele)
            ++this.listSize
            return true
        }
        return false
    }
    // clear func 
    function clear() {
        delete this.dataStore
        this.dataStore = []
        this.listSize = this.pos = 0
        return true
    }
    //travesing a list :

    // fetElement func
    function getElement() {
        return this.dataStore[this.pos]
    }
    //contain func 
    function contains(ele) {
        for (let i = 0; i < this.dataStore.length; i++) {
            if (this.dataStore[i] == ele) {
                return true
            }
        }
        return false
    }
    // front func 
    function front() {
        this.pos
    }
    // end func
    function end() {
        this.pos = this.listSize - 1
    }
    //
    // prev func 
    function prev() {
        if (this.pos > 0)
            --this.pos
    }
    //next func 
    function next() {
        if (this.pos < this.listSize - 1)
            ++this.pos
    }
    // currPos func 
    function currPos() {
        return this.pos
    }
    // moveTo func 
    function moveTo(position) {
        this.pos = position
    }


}
function fact(n) {
    let factorial = 1
    // while (n > 1)
    //     nums.push(n--)
    for (let i = 0; i < n; i++) {
        factorial *= n - i
    }
    return factorial
}
// function Stack() {
//     this.dataStore = [];

//     this.top = 0;
//     this.push = push;
//     this.pop = pop;
//     this.peek = peek;
//     this.clear = clear;
//     this.length = length;
// }
// function push(element) {
//     this.dataStore[this.top++] = element;
// }
// function peek() {
//     return this.dataStore[this.top - 1];
// }
// function pop() {
//     return this.dataStore[--this.top];
// }
// function clear() {
//     this.top = 0;
// }
// function length() {
//     return this.top;
// }
// function fact(n) {
//     var s = new Stack();
//     while (n > 1) {
//         s.push(n--);
//     }
//     var product = 1;
//     while (s.length() > 0) {
//         product *= s.pop();
//     }
//     return product;
// }
console.log(fact(6))
// const names = new List()
// names.append('mohamed')
// names.append('rafat')
// names.append('taha')
// names.append('sayed')
// names.append('taha')
// names.next()
// console.log(names.currPos())
// console.log(names.getElement())
// names.prev()
// console.log(names.currPos())
// console.log(names.getElement())
// names.moveTo(2)
// console.log(names.currPos())
// console.log(names.getElement())
// console.log(names.find('rafat'))
// console.log(names.remove('rafat'))
// console.log(names.length())
// console.log(names.insert('mr', 'taha'))
// console.log(names.toString())
// console.log(names.clear())
// console.log(names.getElement())

// console.log(names.toString())
module.exports = {
    createChat,
    findChat,
    findUserChats,
    deleteChat
}