import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import RaceService from "../services/RaceService";

function Homes() {
  useEffect(() => {
    RaceService.fetchRaceData();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "20px",
      }}
    >
      <Typography variant="h4" gutterBottom>
        F1 Race Search
      </Typography>
    </div>
  );
}

export default Homes;
