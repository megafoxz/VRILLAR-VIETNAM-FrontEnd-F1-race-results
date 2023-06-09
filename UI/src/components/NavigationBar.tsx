import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button, TextField } from "@mui/material";

function NavBar() {
  const [input, setInput] = useState("");
  const [searchResult, setSearchResult] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput((event.target as HTMLInputElement).value);
  };

  const handleSearchClick = () => {
    setSearchResult(input);
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          VRILLAR VIETNAM
        </Typography>
        <TextField
          label="Search"
          variant="outlined"
          value={input}
          onChange={handleInputChange}
        />
        <Button color="inherit" onClick={handleSearchClick}>
          Search
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
