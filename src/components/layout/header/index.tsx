import React, { FC } from 'react'
import ButtonCircle from '../../common/button/button-circle'
import { ReactNode } from 'react';
interface HeaderPropsI {
    rightSection: ReactNode
}
const Header: FC<HeaderPropsI> = ({ rightSection }) => {
    return (
        <React.Fragment>
            <header style={{ position: "fixed", top: "0", left: 0 }}>
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
                {/* <svg

                    style={{
                        position: "fixed",
                        top: 0,
                        right: "0px",
                        zIndex: -1,
                    }}
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#7B241C" fillOpacity="1" d="M0,128L9.2,117.3C18.5,107,37,85,55,106.7C73.8,128,92,192,111,234.7C129.2,277,148,299,166,261.3C184.6,224,203,128,222,122.7C240,117,258,203,277,250.7C295.4,299,314,309,332,304C350.8,299,369,277,388,240C406.2,203,425,149,443,133.3C461.5,117,480,139,498,138.7C516.9,139,535,117,554,90.7C572.3,64,591,32,609,58.7C627.7,85,646,171,665,224C683.1,277,702,299,720,288C738.5,277,757,235,775,234.7C793.8,235,812,277,831,293.3C849.2,309,868,299,886,277.3C904.6,256,923,224,942,218.7C960,213,978,235,997,202.7C1015.4,171,1034,85,1052,53.3C1070.8,21,1089,43,1108,80C1126.2,117,1145,171,1163,165.3C1181.5,160,1200,96,1218,69.3C1236.9,43,1255,53,1274,53.3C1292.3,53,1311,43,1329,48C1347.7,53,1366,75,1385,122.7C1403.1,171,1422,245,1431,282.7L1440,320L1440,0L1430.8,0C1421.5,0,1403,0,1385,0C1366.2,0,1348,0,1329,0C1310.8,0,1292,0,1274,0C1255.4,0,1237,0,1218,0C1200,0,1182,0,1163,0C1144.6,0,1126,0,1108,0C1089.2,0,1071,0,1052,0C1033.8,0,1015,0,997,0C978.5,0,960,0,942,0C923.1,0,905,0,886,0C867.7,0,849,0,831,0C812.3,0,794,0,775,0C756.9,0,738,0,720,0C701.5,0,683,0,665,0C646.2,0,628,0,609,0C590.8,0,572,0,554,0C535.4,0,517,0,498,0C480,0,462,0,443,0C424.6,0,406,0,388,0C369.2,0,351,0,332,0C313.8,0,295,0,277,0C258.5,0,240,0,222,0C203.1,0,185,0,166,0C147.7,0,129,0,111,0C92.3,0,74,0,55,0C36.9,0,18,0,9,0L0,0Z"></path></svg> */}
            </header>
        </React.Fragment>
    )
}

export default Header