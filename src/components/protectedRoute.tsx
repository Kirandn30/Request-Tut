import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { UserAuthContext } from '../context/UserauthContext'

export const Protected = ({ children }: any) => {

    const navigate = useNavigate()
    const { user }: any = useContext(UserAuthContext)

    useEffect(() => {
        if (!user) {
            navigate("/login")
        }
    }, [])

    return children
}
