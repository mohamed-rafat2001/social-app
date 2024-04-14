import { useUser } from '../../../Hooks/UserHook'
import './profile.css'
import moment from 'moment'

function Profile() {
    const user = useUser().data.data

    return (
        <div className="profile">
            <div className='row'>
                <div className='col-12 pt-2'>
                    <h4 className='fw-bold'>{user?.firstName} {user?.lastName}</h4>
                </div>
                <div className='col-12 d-flex justify-content-between my-2'>
                    <div className='col-6'>
                        <img src={user?.image?.secure_url} className='porfile-image' alt="" />
                    </div>
                    <div className='col-6 d-flex align-items-center justify-content-end'>
                        <button type='button' className='fs-6 fw-bold m-0 btn border rounded-pill' data-bs-toggle="modal" data-bs-target="#exampleModal" >
                            Edit profile
                        </button>
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

                                        }}> Log out</button>
                                        <button type="button" className="btn  border border-1 fw-bold w-100 rounded-pill " data-bs-dismiss="modal" aria-label="Close">Cancel</button>

                                    </div>
                                </div>
                            </div>
                        </div >
                    </div>
                </div>
                <div className='col-12 d-flex flex-column mt-2'>
                    <h4 className='fw-bold p-0 m-0'>{user?.firstName} {user?.lastName}</h4>
                    <p className='text-secondary mb-3'>id_{user?.idNumber}</p>
                    {user?.bio ? <p>{user.bio}</p> : null}
                    <div className=' col-12 d-flex '>
                        <div className='me-4 d-flex '>
                            <i className="me-2 text-secondary bi bi-geo-alt"></i>
                            <p className=' text-secondary'>{user?.city ? user.city : 'Elminya'}</p>
                        </div>
                        <div className='d-flex'>
                            <i className="me-2 text-secondary bi bi-calendar4-week"></i>
                            <span className='text-secondary me-2'>joined</span><p className='text-secondary'> {moment(user?.createdAt).calendar()}</p>
                        </div>
                    </div>
                    <div className=' col-12 d-flex '>
                        <p className='text-secondary me-2'>3 Following</p>
                        <p className='text-secondary'>3 Followers</p>
                    </div>

                </div>
            </div>

        </div>
    )
}
export default Profile