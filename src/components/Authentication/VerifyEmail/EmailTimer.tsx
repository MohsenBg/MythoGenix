"use client";
import React, { useContext, useEffect, useState } from "react";
import { Typography, Box } from "@mui/material";
import { VerifyEmailContext } from "@/contexts/VerifyEmailWrapper";
import { useTimer } from "use-timer";
export default function EmailTimer() {
  const { expiration, setExpiration } = useContext(VerifyEmailContext);
  const [seconds, setSeconds] = useState(0);
  const { time, advanceTime } = useTimer({
    initialTime: 0,
    timerType: "DECREMENTAL",
    autostart: true,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      if (seconds > 0) {
        //@ts-ignore
        setSeconds((prvSecond) => setSeconds(prvSecond - 1));
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [seconds]);

  useEffect(() => {
    const current = new Date();
    if (expiration && expiration > current) {
      const second = Math.floor(
        (expiration.getTime() - current.getTime()) / 1000
      );
      if (second > 0) advanceTime(-(second - time));
    }
  }, [expiration]);

  useEffect(() => {
    const currentDate = new Date();
    if (time <= 0 && setExpiration) {
      setExpiration(new Date(currentDate.getTime() - 5000));
    }
  }, [time]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };
  return (
    <>
      {expiration && time > 0 && (
        <Box sx={{ textAlign: "center", marginTop: "1rem" }}>
          <Typography variant="body1" sx={{ marginBottom: "0.5rem" }}>
            You can send the email again in:
          </Typography>

          <Typography variant="h5">{formatTime(time * 1000)}</Typography>
        </Box>
      )}
    </>
  );
}
