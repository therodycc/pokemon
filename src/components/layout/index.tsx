import React, { FC, ReactNode } from 'react'
import Header from './header'
interface LayoutPropsI {
    children: ReactNode
}
const Layout: FC<LayoutPropsI> = ({ children }) => {
    return (
        <React.Fragment>
            <Header />
            {children}
        </React.Fragment>
    )
}

export default Layout