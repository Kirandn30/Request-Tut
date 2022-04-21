import React, { useContext, useEffect, useState } from 'react'
import { Pop } from './pop'
import { UserAuthContext } from '../../context/UserauthContext';
import { useNavigate } from 'react-router';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db, functions } from '../../config/config';
import { TutBar } from './tutBar';
import { arr } from "../../types"
import { httpsCallable } from 'firebase/functions';
import { Alert } from '@mui/material';


export const Dashboard = () => {

    const [pop, setPop] = useState(false)
    const [err, setErr] = useState<string>("")
    const [arr, setArr] = useState<arr[]>([])
    const [upVoteErr, setupVoteErr] = useState<string>("")

    const addRequest = () => {
        setPop(true)
    }

    const navigate = useNavigate()

    const { LogOut }: any = useContext(UserAuthContext)

    const logout = async () => {
        try {
            await LogOut()
            navigate("/login")
        }
        catch (error: any) {
            setErr(error.message)
        }
    }

    const ref = collection(db, "requests")

    const Q = query(ref, orderBy("upVotes", "desc"))

    useEffect(() => {
        const unSub = onSnapshot(Q, snapshot => {
            let arr: any[] = [];
            snapshot.forEach(doc => {
                arr.push({ ...doc.data(), id: doc.id })
                setArr(arr)
                console.log(arr);
            })
        })

        return () => {
            unSub()
        }
    }, [])

    const clicked = (id: string) => {
        const upVote = httpsCallable(functions, "upVote")
        upVote({ id })
            .catch(err => {
                setupVoteErr(err.message)
            })
    }

    upVoteErr && setTimeout(() => {
        setupVoteErr("")
    }, 2000);


    return (
        <>
            {pop && <Pop setPop={setPop} />}
            <header>
                <nav>
                    <p onClick={addRequest}>Add request</p>
                    <p onClick={logout}>sign out</p>
                </nav>
            </header>
            {err && <p className="error">{err}</p>}
            {upVoteErr && <Alert severity="error">{upVoteErr}</Alert>}
            <section className="content">
                <h1>Tutorial Requests</h1>
                {arr.map((doc: arr) => <TutBar key={doc.id} arr={doc} id={doc.id} clicked={clicked} />)}
            </section>
        </>
    )

}
