import { useMessage } from '../../../Hooks/messages'
import { useSocket } from '../../../Hooks/Socket'
import { useUser } from '../../../Hooks/UserHook'
import { useDispatch } from 'react-redux'
import { createMessages } from '../../../services/messages'
import moment from 'moment'
import InputEmoji from 'react-input-emoji'
import { useState, useRef, useEffect } from 'react'

function Chat() {
    const { user, chatId, allMessages, } = useMessage()
    const [text, setText] = useState('')
    const [file, setFile] = useState(null)

    const { data } = useUser()
    const { onlineUsers } = useSocket(data ? data : '')
    const isOnline = onlineUsers?.some((u) => u.userId === user?._id)
    const scroll = useRef()
    const dispatch = useDispatch()
    const addMessage = () => {
        if (!file) {
            return dispatch(createMessages({ chatId, dataa: { text } }))
        }
        let dataa = new FormData()
        file.forEach(f => {
            dataa.append("files", f)
        });
        dataa.append('text', text)
        dispatch(createMessages({ chatId, dataa }))

    }
    useEffect(() => {
        scroll.current?.scrollIntoView({ behavior: 'smooth' })
    }, [allMessages])
    return (

        <div className='message p-0 m-0'>
            {user?.firstName ?
                <>
                    <div className=' col-12 px-3 py-2 d-flex justify-content-between align-items-center '>
                        <div className='d-flex col-6 align-items-center'>

                            <img className="porfile-image" src={user?.image?.secure_url} alt=''></img>
                            <div>
                                <p className='fw-bold pb-0 mb-0 '>{user?.firstName} {user?.lastName}</p>
                                {isOnline ? <p className='mb-0 text-primary'>online</p> :
                                    <p className='mb-0 text-primary'>offline</p>}
                            </div>


                        </div>

                        <button type='button'><i className=" bi bi-exclamation-circle fs-5 icons-style  "></i>
                        </button>
                    </div>
                    <div className='chat col-12 border-bottom px-2 mb-0 mb-sm-3 d-flex flex-column '>

                        {allMessages ?
                            allMessages.map((content) => (
                                content.senderId === data?.data?._id ?
                                    <div key={content._id} className='second-user col-12 d-flex flex-column align-items-start ' ref={scroll}>

                                        {content.text ? <p className='text-break   text-bg-primary d-flex justify-content-start' > {content.text}</p> : null}
                                        {content.file[0] ? <img className='message-image ' src={content.file[0]?.secure_url} alt='' /> : null}

                                        <p className='creatAt-message text-primary'>{moment(content.createdAt).calendar()}</p>

                                    </div>
                                    : <div key={content._id} className='first-user col-12 d-flex flex-column align-items-end ' ref={scroll}>
                                        {content.text ? <p className='text-break   text-bg-primary d-flex justify-content-end' > {content.text}</p>
                                            : null}
                                        {content.file[0] ? <img className='message-image ' src={content.file[0]?.secure_url} alt='' /> : null}
                                        <p className='creatAt-message text-primary'>{moment(content.createdAt).calendar()}</p>
                                    </div>

                            ))
                            : null}



                    </div>

                    <div className='col-12 search  d-flex  justify-content-between align-items-center '>
                        <InputEmoji type="text" className=' text-break' placeholder='Send Message ' value={text} onChange={
                            setText
                        } />
                        <label htmlFor='image'><i className="bi bi-image fs-5 text-primary" style={{ cursor: 'pointer' }} > </i></label >
                        <input type="file" className='border-0' multiple id='image' style={{ visibility: 'hidden', width: '0px' }}
                            onChange={e => { setFile([...e.target.files]) }}></input>
                        <button type='button'><i className="bi bi-send text-primary fs-4 pe-sm-3 " onClick={() => {
                            addMessage()
                            setText('')
                            setFile('')
                        }} /></button>
                    </div></> : null}
        </div>

    )
}
export default Chat