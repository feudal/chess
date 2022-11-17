import { useContext, useEffect, useState } from "react";
import { GameContext } from "../../context";

const formatTime = (time: number) => {
  return new Date(time).toLocaleTimeString("en-Gb", { hour12: false, timeZone: "UTC" });
};

export const Timer = () => {
  const { game } = useContext(GameContext);
  const passedTime = new Date().getTime() - new Date(game?.createdAt as any).getTime();
  const [time, setTime] = useState(+passedTime || 0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => prev + 1000);
    }, 1000);

    return () => clearInterval(interval);
  }, [game?.status, time]);

  return <div className="timer">{formatTime(time)}</div>;
};
