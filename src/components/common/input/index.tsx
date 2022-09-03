import React, { HTMLInputTypeAttribute } from 'react'

interface InputPropsI extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    type?: HTMLInputTypeAttribute;
}

const Input = ({ label, type, ...props }: InputPropsI) => {
    return (
        <React.Fragment>
            <div className="menu">
                <label htmlFor="">{label}</label>
                <input
                    type={type || `text`}
                    {...props}
                />
            </div>
        </React.Fragment>
    )
}

export default Input