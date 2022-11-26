import { RefObject, useEffect, useState } from "react";

export const useElementOrientation = (ref: RefObject<any>) => {
  const [orientation, setOrientation] = useState<"horizontal" | "vertical">("horizontal");

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      setOrientation(width > height ? "horizontal" : "vertical");
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, [ref]);

  return orientation;
};
