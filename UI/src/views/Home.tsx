import React, { useState, useEffect } from "react";

//Helper

//Setvice
import RaceService from "../services/RaceService";

//Components
import {
  CircularProgress,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Box,
} from "@mui/material";

import BarChart3D from "../components/BarChart3D";

//Style
import "./styles/index.css";

interface Location {
  url: string;
  name: string;
}

interface RaceData {
  Car: string;
  "Grand Prix": string;
  Time: string;
}

function Home() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<number | null>(null);
  const [displayedRaceData, setDisplayedRaceData] = useState<any[]>([]);
  const [raceData, setRaceData] = useState<any[]>([]);
  const [input, setInput] = useState("");

  const [mockData, setMockData] = useState([
    { racer: "Racer 1", wins: 5 },
    { racer: "Racer 2", wins: 7 },
    { racer: "Racer 3", wins: 2 },
    { racer: "Racer 4", wins: 8 },
    { racer: "Racer 5", wins: 4 },
  ]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getLocationOptions();
  }, []);

  const handleInputChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const value = event.target.value as string;
    setInput(value);
    if (value !== "") {
      const filteredData = raceData.filter(
        (data) =>
          data.Car.toLowerCase().includes(value.toLowerCase()) ||
          (data.Driver &&
            data.Driver.toLowerCase().includes(value.toLowerCase())) ||
          data.Winner.toLowerCase().includes(value.toLowerCase())
      );
      setDisplayedRaceData(filteredData);
    } else {
      setDisplayedRaceData(raceData);
    }
  };

  const transformData = (data: any[]) => {
    return data.map((item, index) => ({
      racer: `${item.Pos || index + 1}  ${item.Car} \n    ${
        item["Grand Prix"] || item.Driver
      }`,
      wins: item.Pos ? item.Pos : index + 1,
    }));
  };

  const handleSelectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const selectedIndex = event.target.value as number;
    setSelectedLocation(selectedIndex);

    RaceService.fetchRaceData(locations[selectedIndex].url)
      .then((data: RaceData[]) => {
        setRaceData(data);
        setDisplayedRaceData(data);
        setTimeout(() => {
          setMockData(transformData(data));
        }, 500);
      })
      .catch((error: any) => {
        console.error(error);
      });
  };

  const getLocationOptions = async () => {
    RaceService.fetchRaceLocations()
      .then((data) => {
        setLocations(data);
        setSelectedLocation(0);
        setLoading(false);
        if (data[0]) {
          RaceService.fetchRaceData(data[0].url)
            .then((raceData: RaceData[]) => {
              setRaceData(raceData);
              setDisplayedRaceData(raceData);
              setMockData(transformData(raceData));
            })
            .catch((error: any) => {
              console.error(error);
            });
        }
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  return (
    <div className="home-container">
      {mockData.length > 0 && (
        <Box className="visualization-section">
          <BarChart3D data={mockData} />
        </Box>
      )}
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
              <MenuItem key={index} value={index}>
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
      {displayedRaceData && displayedRaceData.length > 0 ? (
        <TableContainer component={Paper}>
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
