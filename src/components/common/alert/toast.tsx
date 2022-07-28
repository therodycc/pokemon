import React, { FC } from 'react'

interface ToastPropsI {
    text: string
}
const Toast: FC<ToastPropsI> = ({ text }) => {
    return (
        <div className="alert" >
            <p>{text}</p>
        </div>
    )
}

export default Toast