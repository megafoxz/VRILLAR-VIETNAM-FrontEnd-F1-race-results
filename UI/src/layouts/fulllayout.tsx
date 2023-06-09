import React, { ReactNode, useState } from "react";
import NavBar from "../components/NavigationBar";
import SearchContext from "../contexts/SearchContext";

interface FullLayoutProps {
  children: ReactNode;
}

const FullLayout: React.FC<FullLayoutProps> = ({ children }) => {
  const [search, setSearch] = useState("");

  return (
    <SearchContext.Provider value={{ search, setSearch }}>
      <NavBar />
      {children}
    </SearchContext.Provider>
  );
};

export default FullLayout;
