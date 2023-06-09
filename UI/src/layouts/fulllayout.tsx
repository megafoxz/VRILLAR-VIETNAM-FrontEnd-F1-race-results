import React, { ReactNode } from "react";
import NavBar from "../components/NavigationBar";

interface FullLayoutProps {
  children: ReactNode;
}

const FullLayout: React.FC<FullLayoutProps> = ({ children }) => {
  return (
    <div>
      <NavBar />
      {children}
    </div>
  );
};

export default FullLayout;
