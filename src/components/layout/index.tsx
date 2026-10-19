import React, { FC, ReactNode } from "react";
import Header from "./header";
interface LayoutPropsI {
    children: ReactNode;
    rightSection?: ReactNode;
    headerContent?: ReactNode;
    headerLeft?: ReactNode;
    headerImage?: string;
}
const Layout: FC<LayoutPropsI> = ({ children, rightSection, headerContent, headerLeft, headerImage }) => {
    return (
        <React.Fragment>
            <div>
                <Header
                    rightSection={rightSection}
                    heroContent={headerContent}
                    leftContent={headerLeft}
                    backgroundImage={headerImage}
                />
                <div className="pokemon-home bg-white">
                    {children}
                </div>
            </div>
        </React.Fragment>
    );
};

export default Layout;
