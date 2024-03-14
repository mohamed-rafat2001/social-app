import './post.css'
import profile from '../../images/avatar-03.png'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { allPosts, like, addPost } from '../../services/posts'
import { share } from '../../services/share.js'
import moment from 'moment'
import { useSocket } from '../../Hooks/Socket.js'
import { useUser } from '../../Hooks/UserHook.js'
import InputEmoji from 'react-input-emoji'

function Post() {
    const posts = useSelector(state => state.posts.posts)
    const [text, setText] = useState('')
    const [file, setFile] = useState(null)

    const { data } = useUser()
    const { onlineUsers } = useSocket(data ? data : '')
    const dispatch = useDispatch()
    const allposts = () => {
        dispatch(allPosts())

    }
    const likeOn = (id) => {
        dispatch(like(id))
    }
    const addShare = (id) => {
        dispatch(share(id))
    }
    useEffect(() => {
        allposts()
    }, [posts])

    const submite = (e) => {
        e.preventDefault()
        if (!file) {
            dispatch(addPost({ text }))
            setText('')
            return
        }
        let data = new FormData()
        file.forEach(f => {
            data.append("filess", f)
        });
        data.append('text', text)
        dispatch(addPost(data))
        setFile(null)

    }
    return (
        <>
            <div className='row d-flex justify-content-between'>
                <button type='button' className='col-6 post-header py-2'><p className='fw-bold text-center'>For you</p></button>
                <button type='button' className='col-6 post-header py-2'><p className='fw-bold text-center'>Following</p></button>
            </div>
            <div className='d-flex row justify-content-between border-top border-bottom py-3'>
                <div className='col-1'>
                    <img className='porfile-image ' src={data?.data?.image?.secure_url} alt='' ></img>
                </div>
                <form className='col-8 col-sm-10 pe-1 pe-sm-4' onSubmit={submite}>
                    <InputEmoji value={text} type='text' placeholder='What is happen' onChange={setText} />
                    {/* <img src='' alt='' /> */}
                    <div className='d-flex justify-content-between m-0 pt-2 border-top'>
                        <div className=''>
                            <label htmlFor='image'><i className="bi bi-image fs-5 text-primary" style={{ cursor: 'pointer' }} > </i></label >
                            <input type="file" className='border-0' onChange={(e) => {
                                setFile(prev => [...e.target.files, prev])
                            }} multiple id='image' style={{ visibility: 'hidden', width: '0px' }} ></input>
                        </div>
                        <button type='submite' className='btn rounded-pill text-white text-bg-primary fw-bold py-1' style={{ width: '70px', height: "0%" }}> post</button>
                    </div>

                </form>
            </div>
            {

                posts?.data ?

                    posts.data.map((post, index) => (
                        <div key={post._id} className='Post-card border' id={post._id}>
                            <div className='Post row px-3 px-sm-5 pt-2'>
                                <div className="col-12 header d-flex justify-content-between align-items-center ">
                                    <div className="col-8 user d-flex align-items-center ">
                                        {post.userId.image ?
                                            <img src={post.userId.image.secure_url} className='porfile-image' alt="" />
                                            : <img src={profile} className='porfile-image' alt="" />}

                                        <div>
                                            <h5 className='m-0 fs-6'>{post.userId.firstName} {post.userId.lastName}
                                            </h5>
                                            {
                                                onlineUsers.some((user) => user.userId === post?.userId._id) ? <p className='text-primary'>online</p> : <p className='text-primary'>offline</p>
                                            }
                                            <p></p>
                                            <p className='col-12 m-0 text-body-tertiary'>id_{post.userId.idNumber}</p>
                                        </div>
                                    </div>
                                    <i className="bi bi-twitter-x text-black fs-4"></i>
                                </div>
                                <div className="col-12  mt-2 fw-medium ">
                                    <p className="text-break">{post.text}</p>

                                </div>
                                <div className="post-cover  my-2 ">
                                    {post.fileUp[0] ?
                                        <img className='cover' src={post.fileUp[0].secure_url} alt="" /> : ''}

                                </div>
                                <div className="create-At text-body-tertiary my-1 ">
                                    <p>{moment(post.createdAt).calendar()}</p>
                                </div>
                            </div>
                            <div className='border-top px-3 px-sm-5 pt-2 d-flex justify-content-evenly'>
                                <div className=' d-flex '>
                                    <p className='me-2 fw-medium'>{post.shares.length}</p>
                                    <p className='fs-6 text-body-tertiary'>shares</p>
                                </div>
                                <div className='d-flex '>
                                    <p className='me-2 fw-medium'>{post.views}</p>
                                    <p className='fs-6 text-body-tertiary'>Views</p>
                                </div>

                                <div className='d-flex '>
                                    <p className='me-2 fw-medium'>{post.likesNumber}</p>
                                    <p className='text-body-tertiary'>Likes</p>
                                </div>
                            </div>
                            <div className='border-top px-5 py-4 d-flex justify-content-evenly'>
                                <i className="bi bi-chat " />
                                <button type='button' onClick={() => {
                                    addShare(post._id)

                                }}>
                                    <i className="bi bi-arrow-down-up fs-boold " style={{ color: post.shares.some(e => (e.userId === data?.data?._id.toString())) ? 'red' : '' }} />
                                </button>
                                <button type='button' onClick={() => {
                                    likeOn(post._id)

                                }} ><i className={post.likes.includes(data?.data?._id) ? 'bi bi-heart-fill' : 'bi bi-heart'} style={{ color: post.likes.includes(data?.data?._id) ? 'red' : '' }} />
                                </button>
                                <i className="bi bi-upload" />
                            </div>

                        </div>
                    )) : null
            }
        </>
    )
}
export default Post