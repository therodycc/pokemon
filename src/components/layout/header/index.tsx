import React from 'react'

const Header = () => {
    return (
        <React.Fragment>
            <header>
                <div className="nav bg-white position-relative d-flex justify-content-end container" style={{

                }}>
                    <div className="logo d-flex align-items-center" style={{
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

                        <img src="/assets/img/logo.jpg" className="bg-white rounded-circle" alt="" />
                        <h1 style={{ color: "#F1948A" }}>Pokemon</h1>
                    </div>
                    <div className="menu">
                        <input type="text" v-model="inputSearch" placeholder="Search" />
                    </div>
                </div>
            </header>
        </React.Fragment>
    )
}

export default Header