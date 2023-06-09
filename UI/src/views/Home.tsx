import React, { useState, useEffect } from "react";
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
} from "@mui/material";
import RaceService from "../services/RaceService";

interface Location {
  url: string;
  name: string;
}

function Home() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [raceData, setRaceData] = useState<any[]>([]);
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
      {loading ? (
        <CircularProgress />
      ) : (
        <FormControl>
          <InputLabel id="location-select-label">Location</InputLabel>
          <Select
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
        </FormControl>
      )}
      {raceData && raceData.length > 0 && (
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
      )}
    </div>
  );
}

export default Home;
