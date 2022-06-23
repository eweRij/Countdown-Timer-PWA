import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState, useEffect } from "react";
import "./Clock.scss";

const theme = createTheme();

export const Clock: React.FC = () => {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [timeGiven, setTimeGiven] = useState(0);

  const handleChange = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const { value } = e.target as HTMLInputElement;
    setTimeGiven(parseInt(value));
  };
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const { value } = e.target as HTMLInputElement;
    setTime(timeGiven);
  };
  useEffect(() => {
    let interval: any;
    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (!running || time === 0) {
      clearInterval(interval);
    }

    time === 0 && setRunning(false);
    return () => clearInterval(interval);
  }, [running, time]);
  const watchStopViewMin = () => {
    const minutes = Math.floor(time / 60);
    if (minutes > 9) {
      return minutes;
    }
    return "0" + minutes;
  };
  const watchStopViewSec = () => {
    const seconds = time - Math.floor(time / 60) * 60;
    if (seconds > 9) {
      return seconds;
    }
    return "0" + seconds;
  };
  console.log(running);
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "75vh",
          }}
        >
          <Typography component="h1" variant="h5">
            Twój prywatny stoper
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              mt: 1,
              marginBottom: "50px",
              backgroundColor: "white important",
            }}
          >
            <TextField
              sx={{ backgroundColor: "white !important" }}
              margin="normal"
              fullWidth
              id="time"
              label="Wpisz czas w sekundach"
              name="time"
              autoFocus
              variant="filled"
              onChange={handleChange}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              OK!!
            </Button>
          </Box>
          {time < 6 && time > 0 ? (
            <Typography
              sx={{
                color: "red",
                fontSize: "10rem",
                fontWeight: "bolder",
              }}
              component="h1"
              variant="h1"
            >
              {!time ? "00" : watchStopViewMin()}:
              {!time ? "00" : watchStopViewSec()}
            </Typography>
          ) : (
            <Typography component="h1" variant="h1">
              {!time ? "00" : watchStopViewMin()}:
              {!time ? "00" : watchStopViewSec()}
            </Typography>
          )}

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Button
              onClick={() => setRunning(true)}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              START
            </Button>
            <Button
              onClick={() => setRunning(false)}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              STOP
            </Button>
            <Button
              onClick={() => setTime(0)}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              ZERUJ
            </Button>
            <Button
              onClick={() => setTime(120)}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              USTAW 2 MIN
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
