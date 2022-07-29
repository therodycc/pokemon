import React, { FC, ReactNode } from "react";
import Header from "./header";
interface LayoutPropsI {
    children: ReactNode;
    rightSection?: ReactNode;
}
const Layout: FC<LayoutPropsI> = ({ children, rightSection }) => {
    return (
        <React.Fragment>
            <div>
                <Header
                    rightSection={rightSection} />
                {children}
            </div>
        </React.Fragment>
    );
};

export default Layout;
