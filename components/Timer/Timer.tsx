import { useEffect, useState } from "react";
import { GameStatusEnum } from "../../types";

interface TimerProps {
  status: keyof typeof GameStatusEnum;
}

export const Timer = ({ status }: TimerProps) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (status === GameStatusEnum.PLAYING) {
      const interval = setInterval(() => {
        setTime((prev) => prev + 1000);
      }, 1000);

      return () => clearInterval(interval);
    } else if (status === GameStatusEnum.NOT_STARTED) {
      setTime(0);
    }
  }, [status]);

  const timeString = new Date(time).toLocaleTimeString("en-GB", {
    hour12: false,
    timeZone: "UTC",
  });

  return <div className="timer">{timeString}</div>;
};
