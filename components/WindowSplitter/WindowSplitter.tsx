import React, { ReactNode, useEffect, useRef, useState } from "react";
import { useElementOrientation } from "../../hooks";
import { makeBEM } from "../../utils";

const bem = makeBEM("window-splitter");

interface WindowSplitterProps {
  left?: ReactNode;
  right?: ReactNode;
}

export const WindowSplitter = ({ left, right }: WindowSplitterProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const [mouseIsDragging, setMouseIsDragging] = useState(false);

  const orientation = useElementOrientation(ref);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!leftRef?.current && !rightRef?.current && !ref?.current) return;

      if (mouseIsDragging) {
        const { clientX, clientY } = event;
        const { width, height } = ref.current!.getBoundingClientRect();
        const { width: leftWidth } = leftRef.current!.getBoundingClientRect();
        const { width: rightWidth } = rightRef.current!.getBoundingClientRect();
        const { height: leftHeight } = leftRef.current!.getBoundingClientRect();
        const { height: rightHeight } = rightRef.current!.getBoundingClientRect();

        if (orientation === "horizontal") {
          leftRef.current!.style.minWidth = `${clientX - 5}px`;
          rightRef.current!.style.minWidth = `${width - clientX - 5}px`;
        }
        if (orientation === "vertical") {
          const offset = 50;
          leftRef.current!.style.minHeight = `${clientY - offset - 5}px`;
          rightRef.current!.style.minHeight = `${height - clientY - offset - 5}px`;
        }
      }
    };

    const handleMouseUp = () => setMouseIsDragging(false);

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [mouseIsDragging, orientation]);

  return (
    <div ref={ref} className={bem(null, [orientation])}>
      <div ref={leftRef} className={bem("left")}>
        {left}
      </div>
      <div
        className={bem("resizer")}
        onMouseDown={() => setMouseIsDragging(true)}
        onMouseUp={() => setMouseIsDragging(false)}
      />
      <div ref={rightRef} className={bem("right")}>
        {right}
      </div>
    </div>
  );
};
