import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { Alert } from '@mui/material';
import { UserAuthContext } from '../context/UserauthContext';

type Inputs = {
    email: string
    password: string
    confirmpassword: string
}

export const Signup = () => {

    const { register, handleSubmit } = useForm<Inputs>();
    const [err, setErr] = useState("")

    const { signup }: any = useContext(UserAuthContext)
    const navigate = useNavigate()

    const onSubmit = async (data: Inputs) => {
        const { email, password, confirmpassword } = data
        if (password !== confirmpassword) {
            setErr("Passwords do not match")
        } else {
            try {
                await signup(email, password)
                navigate("/")
            }
            catch (error: any) {
                setErr(error.message)
            }
        }

    }

    return (
        <>
            <div className="modal">
                <h2>Sign Up</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input {...register("email", { required: true })} type="email" placeholder="Email" />
                    <input {...register("password", { required: true })} type="password" placeholder='password' />
                    <input {...register("confirmpassword", { required: true })} type="confirm password" placeholder='confirm password' />
                    <button type="submit">Sign Up</button>
                    {err && <p className="error">{err}</p>}
                </form>
                <p style={{ fontSize: "smaller" }}>Already have a account <Link style={{ color: "red" }} to="/login">Login</Link></p>
            </div>
        </>
    )
}
