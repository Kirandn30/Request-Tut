import { ArrowUpward } from '@mui/icons-material'
import React from 'react'
import { arr } from "../../types"

type TutBarProps = {
    arr: arr
    id: string
    clicked: (id: string) => void

}

export const TutBar = ({ arr, id, clicked }: TutBarProps) => {
    return (
        <>
            <ul className="request-list">
                <li>
                    <span className="text">{arr.text.request}</span>
                    <div className='votes'>
                        <span className='vote'>{arr.upVotes}</span>
                        <ArrowUpward className='arrow' onClick={() => clicked(id)} />
                    </div>
                </li>
            </ul>
        </>
    )
}
