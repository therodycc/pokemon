import React, { FC } from 'react'

interface ButtonCirclePropsI {
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    props?: React.ButtonHTMLAttributes<HTMLButtonElement>;
    children: React.ReactNode;
}

const ButtonCircle: React.FC<ButtonCirclePropsI> = ({ onClick, props, children }) => {
    return (
        <button
            className='btn-circle'
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    )
}

export default ButtonCircle