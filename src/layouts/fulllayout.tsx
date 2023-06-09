import React, { ReactNode } from "react";

interface FullLayoutProps {
  children: ReactNode;
}

const FullLayout: React.FC<FullLayoutProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default FullLayout;
