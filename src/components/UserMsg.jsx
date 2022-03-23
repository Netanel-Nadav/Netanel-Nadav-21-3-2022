import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearMsg } from '../store/actions/favorites.action'

export const UserMsg = () => {

    const { msg } = useSelector(state => state.weatherModule)
    const dispatch = useDispatch()

    let intervalId = useRef()

    useEffect(() => {
        if (msg) clearInterval(intervalId)
        intervalId = setTimeout(() => {
            dispatch(clearMsg())
        }, 3000);

        return () => {
            clearInterval(intervalId)
        }
    }, [msg])


    if (!msg) return <></>
    const {type, txt} = msg
    return (
        <div className="user-msg" style={{backgroundColor: type === 'error' ? 'red' : 'green'}}>
            <span>{txt}</span>
        </div>
    )
}
