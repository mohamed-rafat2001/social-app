import { Link, useNavigate } from 'react-router-dom'
import './pages.css'
import { removeToken, getToken } from '../../api/localStorage'
import { useMessage } from '../../Hooks/messages'
import { useEffect } from 'react'

function Pages() {
    const navigate = useNavigate()
    const { allMessageNotifications } = useMessage()
    const logOut = () => {
        removeToken()
        if (!getToken()) {
            navigate('/')
        }

    }
    useEffect(() => {

    }, [allMessageNotifications])
    return (
        <>
            <ul className=" ms-0 ps-0 nav d-flex flex-column position-fixed ">
                <li className="log nav-item ps-3  mb-2 pb-0 text-black d-flex align-items-center rounded-pill link-hover">
                    <i className="bi bi-twitter-x text-black fs-3 "></i>
                    <button type='button' className='fs-5 m-0 border-0 logOut  ' data-bs-toggle="modal" data-bs-target="#exampleModal" >
                        Log out
                    </button>
                </li>

                <li className="nav-item rounded-pill link-hover ">
                    <Link className="nav-link  mb-1 pb-0 active text-black d-flex align-items-center h-100 " to={"/Home"}>
                        <i className="bi bi-house-door-fill  fs-2 me-4"></i>
                        <h4 className='fs-5 m-0 align-items-center  d-none d-xl-flex'>Home</h4>
                    </Link>
                </li>
                <li className="nav-item   rounded-pill link-hover">
                    <Link className="nav-link mb-1 pb-0 text-black d-flex align-items-center h-100 " to={"/Home/Profile"}>
                        <i className="bi bi-person  fs-2 me-4"></i>
                        <h4 className='fs-5 m-0 align-items-center d-none d-xl-flex'>Profile</h4>
                    </Link>
                </li>
                <li className="nav-item   rounded-pill link-hover">
                    <Link className="nav-link mb-1 pb-0  text-black d-flex align-items-center h-100 " to={"/Home/Messages"}>
                        <i className="bi bi-envelope text-black fs-2 me-4"></i>
                        <h4 className='fs-5 m-0 align-items-center  d-none d-xl-flex'>Messages <span className='text-danger'>{allMessageNotifications}</span></h4>
                    </Link>
                </li>
                <li className="nav-item   rounded-pill link-hover">
                    <Link className="nav-link mb-1 pb-0 text-black d-flex align-items-center h-100 " to={"/Home/Notifications"}>
                        <i className="bi bi-bell text-black fs-2 me-4"></i>
                        <h4 className='fs-5 m-0 align-items-center  d-none d-xl-flex'>Notifications</h4>
                    </Link>
                </li>
                <li className="nav-item rounded-pill link-hover">
                    <Link className="nav-link mb-1 pb-0  text-black d-flex align-items-center h-100 " to={"/lists"}>
                        <i className="bi bi-card-list text-black fs-2 me-4"></i>
                        <h4 className='fs-5 m-0 align-items-center  d-none d-xl-flex'>Lists</h4>
                    </Link>
                </li>
                <li className="nav-item  rounded-pill link-hover">
                    <Link className="nav-link mb-1 pb-0 text-black d-flex align-items-center h-100 " to={"/settings"}>
                        <i className="bi bi-gear text-black fs-2 me-4"></i>
                        <h4 className='fs-5 m-0 align-items-center  d-none d-xl-flex '>Settings</h4>
                    </Link>
                </li>
            </ul>

            <div className="modal fade " id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-W   modal-dialog modal-dialog-centered  ">
                    <div className="modal-content col-2 modal-R px-4 ">
                        <div className="modal-header border-0 mb-0 pb-0">
                            <i className="modal-title mx-auto bi bi-twitter-x text-black fs-1 " id="exampleModalLabel"></i>

                        </div>
                        <div className="modal-body text-black  ">
                            <h5 className='text-bold'>Log out of X?</h5>
                            <p>You can always log back in at any time. If you just want to switch accounts, you can do that by adding an existing account. </p>
                        </div>
                        <div className="modal-footer flex-column ">
                            <button type="button" className="btn  w-100 rounded-pill text-bg-dark fw-bold" data-bs-dismiss="modal" aria-label="Close" onClick={() => {
                                logOut()
                            }}> Log out</button>
                            <button type="button" className="btn  border border-1 fw-bold w-100 rounded-pill " data-bs-dismiss="modal" aria-label="Close">Cancel</button>

                        </div>
                    </div>
                </div>
            </div >
        </>


    )
}
export default Pages