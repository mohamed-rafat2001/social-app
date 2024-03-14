import './signUp.css'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signUpSrv } from '../../services/userSrv'
import { getToken } from '../../api/localStorage'
import { useNavigate } from 'react-router-dom'

function SignUp() {
    const data = useSelector(state => state.user.user)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [idNumber, setIdNumber] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const submit = (e) => {
        e.preventDefault()
        dispatch(signUpSrv({ firstName, lastName, email, password, idNumber }))
    }
    const valid = []
    if (data.message === "validation err") {
        data.validation.map(e => (
            valid.push({ type: e.path, msg: e.msg })

        ))
    }

    useEffect(() => {
        if (getToken()) {
            navigate('/home')
        }
    }, [data])

    return (
        <form className="row delay " onSubmit={submit}>
            <h4 className='d-flex my-4 justify-content-center'>Sign UP</h4>

            <div className="col-md-6">
                {valid.map(e => e.type === "firstName" ? <p className='validation fs-6 text-danger'>* in-valid first name</p> : null)}

                <label htmlFor="firstName" className="form-label">First Name</label>
                <input type="text" id='firstName' className="form-control" aria-label="First name" onChange={(e) => {
                    setFirstName(e.target.value)
                }} />
            </div>
            <div className="col-md-6">
                {valid.map(e => e.type === "lastName" ? <p className='validation fs-6 text-danger'>* in-valid last name</p> : null)}
                <label htmlFor="LastName" className="form-label">Last Name</label>
                <input type="text" id='LastName' className="form-control" aria-label="First name" onChange={(e) => {
                    setLastName(e.target.value)
                }} />
            </div>
            <div className="col-12 ">
                {valid.map(e => e.type === "email" ? <p className='validation fs-6 text-danger'>* {e.msg}</p> : null)}

                <label htmlFor="inputEmail4" className="form-label">Email</label>
                <input type="email" className="form-control" id="inputEmail4" onChange={(e) => {
                    setEmail(e.target.value)
                }} />
            </div>
            <div className="col-12 ">
                <label htmlFor="inputPassword4" className="form-label">Password</label>
                <input type="password" className="form-control" id="inputPassword4" onChange={(e) => {
                    setPassword(e.target.value)
                }} />
                {valid.map(e => e.type === "password" ? <p className='validation fs-6 text-danger'>* {e.msg}</p> : null)}
            </div>
            <div className="col-12 mb-4 ">
                <label htmlFor="idNumber" className="form-label">idNumber</label>
                <input type="Number" id='idNumber' className="form-control" aria-label="idNumber" onChange={(e) => {
                    setIdNumber(e.target.value)
                }} />
                {valid.map(e => e.type === "idNumber" ? <p className='validation fs-6 text-danger'>*in-valid id Number</p> : null)}
            </div>
            <div className="col-6 tex-align-center mx-auto mb-0 ">
                <button type="submite" className="btn submite  w-100" >Sign Up</button>
            </div>
        </form>
    )
}
export default SignUp
