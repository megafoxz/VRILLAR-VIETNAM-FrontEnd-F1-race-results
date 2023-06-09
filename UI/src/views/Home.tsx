import React, { useState, useEffect } from "react";

//Setvice
import RaceService from "../services/RaceService";

//Components
import {
  Typography,
  CircularProgress,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
} from "@mui/material";

//Style
import "./styles/index.css";

interface Location {
  url: string;
  name: string;
}

function Home() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [raceData, setRaceData] = useState<any[]>([]);
  const [input, setInput] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    RaceService.fetchRaceLocations()
      .then((data) => {
        setLocations(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // setInput((event.target as HTMLInputElement).value);
  };

  const handleSelectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const url = event.target.value as string;
    setSelectedLocation(url);
    RaceService.fetchRaceData(url)
      .then((data: any) => {
        setRaceData(data);
      })
      .catch((error: any) => {
        console.error(error);
      });
  };

  return (
    <div className="home-container">
      <Typography variant="h4" gutterBottom>
        F1 Race Search
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <div className="filter-row">
          <Select
            className="custom-select"
            labelId="location-select-label"
            value={selectedLocation}
            onChange={handleSelectChange as any}
          >
            {locations.map((location, index) => (
              <MenuItem key={index} value={location.url}>
                {location.name}
              </MenuItem>
            ))}
          </Select>
          <TextField
            className="custom-text-field"
            label="Search"
            variant="outlined"
            value={input}
            onChange={handleInputChange}
          />
        </div>
      )}
      {raceData && raceData.length > 0 ? (
        <TableContainer component={Paper} style={{ marginTop: "20px" }}>
          <Table>
            <TableHead>
              <TableRow>
                {Object.keys(raceData[0]).map((key, index) => (
                  <TableCell key={index}>{key}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {raceData.map((row, index) => (
                <TableRow key={index}>
                  {Object.values(row).map((value, i) => (
                    <TableCell key={i}>{value as string}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <p className="noData-title">No data available</p>
      )}
    </div>
  );
}

export default Home;
