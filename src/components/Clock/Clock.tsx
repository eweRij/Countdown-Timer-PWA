import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import DownloadForOfflineOutlinedIcon from "@mui/icons-material/DownloadForOfflineOutlined";
import { useState, useEffect } from "react";
import "./Clock.scss";
import { actionButtonsState } from "../../store/initialState";
import ActionButton from "../ActionButton/ActionButton";
import {
  handleChangeTime,
  handleSubmitTime,
  watchStopViewMin,
  watchStopViewSec,
} from "../../helpers/timeHelpers";
import tick from "../../assets/tick.mp3";

const theme = createTheme();

export const Clock: React.FC = () => {
  const [time, setTime] = useState<number>(0);
  const [running, setRunning] = useState<boolean>(false);
  const [timeGiven, setTimeGiven] = useState<number>(0);

  useEffect(() => {
    const audioEl = document.getElementsByClassName(
      "audio-element"
    )[0] as HTMLAudioElement | null;

    let interval: NodeJS.Timer;
    if (running) {
      interval = setInterval(() => {
        audioEl && audioEl.play();
        setTime((prevTime) => prevTime - 1);
      }, 1000);

      if (!running || time === 0) {
        clearInterval(interval);
      }
    }

    time === 0 && setRunning(false);
    return () => clearInterval(interval);
  }, [running, time]);

  return (
    <ThemeProvider theme={theme}>
      <audio className="audio-element">
        <source src={tick} type="audio/mp3" />
      </audio>
      <Container
        component="main"
        maxWidth="xs"
        sx={{ display: "flex", flexDirection: "column" }}
      >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 9,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "75vh",
          }}
        >
          {" "}
          <Button
            type="button"
            variant="contained"
            sx={{ mt: 4, mb: 2, alignSelf: "flex-end", display: "none" }}
            id="installBtn"
            color="warning"
          >
            <DownloadForOfflineOutlinedIcon />
          </Button>
          <Typography component="h1" variant="h5" sx={{ textAlign: "center" }}>
            Twój prywatny stoper
          </Typography>
          <Box
            component="form"
            onSubmit={(e: React.SyntheticEvent) =>
              handleSubmitTime(e, timeGiven, setTime)
            }
            noValidate
            sx={{
              mt: 1,
              marginBottom: "20px",
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
              onChange={(e: React.SyntheticEvent) =>
                handleChangeTime(e, setTimeGiven)
              }
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              OK
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
              {!time ? "00" : watchStopViewMin(time)}:
              {!time ? "00" : watchStopViewSec(time)}
            </Typography>
          ) : (
            <Typography component="h1" variant="h1">
              {!time ? "00" : watchStopViewMin(time)}:
              {!time ? "00" : watchStopViewSec(time)}
            </Typography>
          )}
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
          >
            {actionButtonsState.map((btn, id) => {
              const { label, time } = btn;
              return (
                <ActionButton
                  key={label + id}
                  handleTime={
                    typeof time === "boolean"
                      ? () => setRunning(time)
                      : () => setTime(time)
                  }
                  label={label}
                />
              );
            })}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
