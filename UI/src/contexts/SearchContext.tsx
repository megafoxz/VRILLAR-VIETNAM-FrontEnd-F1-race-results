import React from "react";

const SearchContext = React.createContext({
  search: "",
  setSearch: (search: string) => {},
});

export default SearchContext;
