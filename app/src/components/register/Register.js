import './register.css'
import image from '../../images/Illustration.png'
import Login from './Login'
import SignUp from './SignUp'

import { useState } from 'react'
function Register() {
    const [state, setState] = useState(true)
    return (
        <div className='Register'>
            <div className="container-lg d-flex justify-content-center align-items-center">
                <div className="all row  ">
                    <div className="left col-6 d-none d-md-flex  justify-content-center align-items-center">
                        <div className='content '>
                            <h1>Wellcom to social app</h1>
                            <h3 className='my-5'>created by Mohamed Rafat </h3>
                            <img src={image} alt='' className='w-50 ms-3' />
                        </div>
                    </div>
                    <div className="right col-10 col-sm-8 col-md-6 mx-auto">

                        <div className="form row w-100  p-3 p-sm-4 p-md-5 bg-white">
                            <div className="col-6 ">
                                <button type="button" className=" btn w-100  submite" onClick={() => {
                                    setState(true)
                                }} style={{ backgroundColor: state ? '#111111' : '#c3c3c3', color: 'white' }}>Sign Up</button>
                            </div>
                            <div className="col-6">
                                <button type="button" className="btn w-100 submite" onClick={() => {
                                    setState(false)
                                }} style={{ backgroundColor: state ? '#c3c3c3' : '#111111', color: 'white' }}>Log in</button>
                            </div>
                            {state ?
                                <SignUp />
                                :
                                <Login />

                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}
export default Register;
