import { Alert } from '@mui/material';
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom'
import { UserAuthContext } from '../context/UserauthContext';

type Inputs = {
    email: string
    password: string
}

export const Login = () => {

    const { register, handleSubmit } = useForm<Inputs>();

    const { login }: any = useContext(UserAuthContext)

    const [err, setErr] = useState<string>("")

    const navigate = useNavigate()

    const onSubmit = async (data: Inputs) => {
        const { email, password } = data
        try {
            await login(email, password)
            navigate("/")
        }

        catch (error: any) {
            setErr(error.message)
        }
    }

    return (
        <>
            <div className="modal">
                <h2>Login</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input {...register("email", { required: true })} type="email" placeholder="Email" />
                    <input {...register("password", { required: true })} type="password" placeholder='password' />
                    <button type="submit">Login</button>
                    {err && <p className="error">{err}</p>}
                    <p style={{ fontSize: "smaller" }}>Don't have a account <Link style={{ color: "red" }} to="/signup">Sign Up</Link></p>
                </form>
            </div>
        </>
    )
}
