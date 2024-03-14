import Post from '../../posts/Post'
import Pages from '../Pages'
import { Route, Routes } from 'react-router-dom'
import Profile from '../profile/Profile'
import Messages from '../messages/Messages'
import Chat from '../messages/Chat'
import Notifications from '../Notifications/Notifications'

function Home() {


    return (
        <div className="container-fluid ">
            <div className="row justify-content-between px-3">
                <aside className="ps-0 ms-0 col-1 col-lg-3 position-relative    ">
                    <Pages />
                </aside>
                <Routes>
                    <Route path='/' element={
                        <>
                            <div className="post col-10 col-sm-9 col-md-7 col-lg-6 border-start border-end "><Post /></div>
                            <aside className="rigth col-3 d-none d-md-block  "><h1>Hello rigth</h1></aside>
                        </>

                    } />
                    <Route path='/Profile' element={
                        <>
                            <div className="col-10 col-sm-9 col-md-7 col-lg-5   "><Profile /></div>
                            <aside className="col-3 d-none d-md-block  "><h1>Hello right pro..</h1></aside>
                        </>

                    } />

                    <Route path='/Messages' element={
                        <>
                            <div className="col-4 d-none d-md-block  p-0 m-0 border-start"><Messages /></div>
                            <aside className="col-10 col-sm-9 col-md-7 col-lg-5 p-0 border-start border-end"><Chat /></aside>
                        </>

                    } />
                    <Route path='/Notifications' element={
                        <>
                            <div className="col-10 col-sm-9 col-md-7 col-lg-5   "><Notifications /></div>
                            <aside className="col-3 d-none d-md-block  "><h1>Hello right notifi..</h1></aside>
                        </>

                    } />
                </Routes>
                {/* <aside className="rigth col-3 d-none d-md-block  "><h1>Hello rigth</h1></aside> */}
            </div>
        </div>
    )
}
export default Home