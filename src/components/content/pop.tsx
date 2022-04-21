import React, { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { useForm } from "react-hook-form";
import { httpsCallable } from 'firebase/functions';
import { functions } from '../../config/config';


type PoptypePorps = {
    setPop: React.Dispatch<React.SetStateAction<boolean>>
}

type Inputs = {
    request: string
};



export const Pop = ({ setPop }: PoptypePorps) => {

    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
    const [err, setErr] = useState<string>("")

    const onSubmit = (data: any) => {

        const addRequest = httpsCallable(functions, "addRequest")
        addRequest({
            text: data
        })
            .then(() => {
                setPop(false)
            })
            .catch(error => {
                setErr(error)
            })
    }


    return (
        <>
            <div className="new-request">
                <div className="modal">
                    <p style={{ textAlign: 'right' }} ><CloseIcon onClick={() => setPop(false)} /></p>
                    <h2>Request a Tutorial</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input type="text" {...register("request", { required: "cannot be empty" })} placeholder="Request..." />
                        {errors.request && <p className="error">{errors.request.message}</p>}
                        {err && <p className="error">{err}</p>}
                        <button type="submit">Submit Request</button>
                    </form>
                </div>
            </div>

        </>
    )
}
