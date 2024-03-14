import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginSrv } from '../../services/userSrv'
import { useNavigate } from 'react-router-dom'
import { getToken } from '../../api/localStorage'
function Login() {
    const data = useSelector(state => state.user.user)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const submit = (e) => {
        e.preventDefault()
        dispatch(loginSrv({ email, password }))
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


        <form className='row' onSubmit={submit}>

            <h4 className='d-flex my-4 justify-content-center'>Log in</h4>
            {data.message === "validation err" ? null : <h1>{data.message}</h1>}
            <div className="col-12 mb-3">
                {valid.map(e => e.type === "email" ? <p className='validation fs-6 text-danger w-100'>* {e.msg}</p> : null)}
                <label htmlFor="inputEmail4" className="form-label">Email</label>
                <input type="email" className="form-control" id="inputEmail4"
                    onChange={(e) => {
                        setEmail(e.target.value)
                    }} />


            </div>
            <div className="col-12 mb-5">
                <label htmlFor="inputPassword4" className="form-label">Password</label>
                <input type="password" className="form-control" id="inputPassword4" onChange={(e) => {
                    setPassword(e.target.value)
                }} />
                {valid.map(e => e.type === "password" ? <p className='validation fs-6 text-danger w-100'>* {e.msg}</p> : null)}
            </div>
            <div className="col-6 tex-align-center mx-auto mb-0">
                <button type="submite" className="btn submite  w-100 delay" >Log in</button>
            </div>

        </form>
    )
}
export default Login