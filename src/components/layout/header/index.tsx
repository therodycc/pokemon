import React, { FC } from 'react'
import ButtonCircle from '../../common/button/button-circle'
import { ReactNode } from 'react';
interface HeaderPropsI {
    rightSection: ReactNode
}
const Header: FC<HeaderPropsI> = ({ rightSection }) => {
    return (
        <React.Fragment>
            <header>
                <div className="nav position-relative d-flex justify-content-end container" style={{

                }}>
                    <div
                        className="logo d-flex align-items-center"
                        style={{
                            width: "260px",
                            padding: "20px",
                            height: "200px",
                            borderRadius: "50%",
                            position: "absolute",
                            display: "flex",
                            justifyContent: "end",
                            alignItems: "end",
                            top: "-60px",
                            left: "-20%",
                            background: "#7B241C"
                        }}>

                        <img src="/assets/img/logo.jpg" className="rounded-circle" alt="" />
                        <h1 style={{ color: "#F1948A" }}>Pokemon</h1>
                    </div>
                    <div>
                        {rightSection}
                    </div>
                </div>
            </header>
        </React.Fragment>
    )
}

export default Header