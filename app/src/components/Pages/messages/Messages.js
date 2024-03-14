import './messages.css'

import { useChats } from '../../../Hooks/chats'
import { useUser } from '../../../Hooks/UserHook'
import { useDispatch, } from 'react-redux'
import { singleChat } from '../../../services/chats'
function Messages() {

    const { data } = useChats()
    const user = useUser().data.data
    const dispatch = useDispatch()
    return (
        <div className="row ">
            <div className="message col-12  ">
                <div className='d-flex justify-content-between align-items-center my-3 px-3 '>
                    <h4 className="col-6 fw-bold">Messages</h4>
                    <div className='col-3 d-flex justify-content-evenly '>
                        <i className="bi  bi-gear text-black fs-5 icons-style"></i>
                        <i className="bi  bi-envelope-plus text-black fs-5   icons-style "></i>
                    </div>
                </div>
                <div className='search rounded-pill  d-flex p-2 border mb-3 px-3'>
                    <label htmlFor='search'><i className="bi bi-search text-secondary fs-6 mx-2"></i></label>
                    <input id='search' type='text' className='border-0 w-100' placeholder='Search Direct Message '></input>
                </div>
                {data?.data ? data.data.map((chat) => (
                    <div key={chat._id} className=' user-chat border-end border-2 border-primary mb-1'>
                        <button className='w-100' type='button' onClick={() => {
                            dispatch(singleChat(chat._id))
                        }}>
                            {chat.members.map((userId) => (

                                userId.userId._id === user._id ?
                                    <  div key={userId.secondId._id} className='w-100 px-3 py-2 m-0 d-flex justify-content-between  '>
                                        <div className='d-flex col-8 justify-content-between '>
                                            <img className="porfile-image" src={userId.secondId?.image?.secure_url} alt=''></img>
                                            <p className='fw-bold col-7'>{userId.secondId?.firstName} {userId.secondId?.lastName}</p>
                                            <p className=' text-secondary'>id_{userId.secondId?.idNumber}</p>
                                        </div>
                                        <i className="icon  bi bi-three-dots fs-5 col-1 "></i>
                                    </div> : <div key={userId.userId._id} className='w-100 px-3 py-2 m-0 d-flex justify-content-between '>
                                        <div className='d-flex  col-8 justify-content-between' >
                                            <img className="porfile-image" src={userId.userId?.image?.secure_url} alt=''></img>
                                            <p className='me-2 fw-bold col-7'>{userId.userId?.firstName} {userId.userId?.lastName}</p>
                                            <p className=' text-secondary'>id_{userId.userId?.idNumber}</p>
                                        </div>
                                        <i className="icon  bi bi-three-dots fs-5 col-1 "></i>
                                    </div>
                            ))}
                        </button>

                    </div>
                )) : <h4 className='d-flex justify-content-center align-items-center text-primary '>no chats yet now...</h4>}
            </div>
        </div>
    )
}
export default Messages