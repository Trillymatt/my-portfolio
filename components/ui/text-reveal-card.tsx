"use client";
import React, { useEffect, useRef, useState, memo } from "react";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { cn } from "@/lib/utils";

interface TextRevealCardProps {
  text: string;
  revealText: string;
  className?: string;
}

const Stars = memo(() => {
  // Use fixed positions for stars to avoid hydration mismatch
  const starPositions = [
    { top: "10%", left: "20%" },
    { top: "20%", left: "40%" },
    { top: "30%", left: "60%" },
    { top: "40%", left: "80%" },
    { top: "50%", left: "20%" },
    { top: "60%", left: "40%" },
    { top: "70%", left: "60%" },
    { top: "80%", left: "80%" },
    { top: "90%", left: "20%" },
    { top: "10%", left: "80%" },
    { top: "20%", left: "60%" },
    { top: "30%", left: "40%" },
    { top: "40%", left: "20%" },
    { top: "50%", left: "80%" },
    { top: "60%", left: "60%" },
    { top: "70%", left: "40%" },
    { top: "80%", left: "20%" },
    { top: "90%", left: "80%" },
    { top: "10%", left: "40%" },
    { top: "20%", left: "20%" }
  ];

  return (
    <div className="absolute inset-0 w-full h-full">
      {starPositions.map((pos, idx) => (
        <motion.span
          key={idx}
          animate={{
            top: pos.top,
            left: pos.left,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
            delay: idx * 0.1,
          }}
          style={{
            position: "absolute",
            width: "2px",
            height: "2px",
            backgroundColor: "white",
            borderRadius: "50%",
            zIndex: 1,
          }}
        >
          <span
            className="inline-block"
            style={{
              position: "absolute",
              width: "2px",
              height: "2px",
              backgroundColor: "white",
              borderRadius: "50%",
              zIndex: 1,
            }}
          />
        </motion.span>
      ))}
    </div>
  );
});

Stars.displayName = "Stars";

export const TextRevealCard = ({
  text,
  revealText,
  className
}: TextRevealCardProps) => {
  const [widthPercentage, setWidthPercentage] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const [left, setLeft] = useState(0);
  const [localWidth, setLocalWidth] = useState(0);
  const [isMouseOver, setIsMouseOver] = useState(false);

  useEffect(() => {
    if (cardRef.current) {
      const { left, width: localWidth } =
        cardRef.current.getBoundingClientRect();
      setLeft(left);
      setLocalWidth(localWidth);
    }
  }, []);

  function mouseMoveHandler(event: React.MouseEvent) {
    event.preventDefault();

    const { clientX } = event;
    if (cardRef.current) {
      const relativeX = clientX - left;
      setWidthPercentage((relativeX / localWidth) * 100);
    }
  }

  function mouseLeaveHandler() {
    setIsMouseOver(false);
    setWidthPercentage(0);
  }
  function mouseEnterHandler() {
    setIsMouseOver(true);
  }
  function touchMoveHandler(event: React.TouchEvent) {
    event.preventDefault();
    const clientX = event.touches[0].clientX;
    if (cardRef.current) {
      const relativeX = clientX - left;
      setWidthPercentage((relativeX / localWidth) * 100);
    }
  }

  const rotateDeg = (widthPercentage - 50) * 0.1;
  return (
    <div
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
      onMouseMove={mouseMoveHandler}
      onTouchStart={mouseEnterHandler}
      onTouchEnd={mouseLeaveHandler}
      onTouchMove={touchMoveHandler}
      ref={cardRef}
      className={cn(
        "w-full max-w-3xl rounded-lg p-8 relative overflow-hidden bg-black",
        className
      )}>
      <div className="h-40 relative flex items-center justify-center overflow-hidden">
        <motion.div
          style={{
            width: "100%",
          }}
          animate={
            isMouseOver
              ? {
                  opacity: widthPercentage > 0 ? 1 : 0,
                  clipPath: `inset(0 ${100 - widthPercentage}% 0 0)`,
                }
              : {
                  clipPath: `inset(0 ${100 - widthPercentage}% 0 0)`,
                }
          }
          transition={isMouseOver ? { duration: 0 } : { duration: 0.4 }}
          className={cn("absolute z-20 will-change-transform", className)}>
          <p
            style={{
              textShadow: "4px 4px 15px rgba(0,0,0,0.5)",
            }}
            className="text-base sm:text-[3rem] py-10 font-bold text-white bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-300 text-center">
            {revealText}
          </p>
        </motion.div>
        <motion.div
          animate={{
            left: `${widthPercentage}%`,
            rotate: `${rotateDeg}deg`,
            opacity: widthPercentage > 0 ? 1 : 0,
          }}
          transition={isMouseOver ? { duration: 0 } : { duration: 0.4 }}
          className="h-40 w-[8px] bg-gradient-to-b from-transparent via-neutral-800 to-transparent absolute z-50 will-change-transform"></motion.div>

        <div
          className="overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,white,transparent)]">
          <p
            className="text-base sm:text-[3rem] py-10 font-bold text-white text-center">
            {text}
          </p>
          <Stars />
        </div>
      </div>
    </div>
  );
};

export const TextRevealCardTitle = ({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h2 className={twMerge("text-white text-lg mb-2", className)}>
      {children}
    </h2>
  );
};

export const TextRevealCardDescription = ({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (<p className={twMerge("text-[#a9a9a9] text-sm", className)}>{children}</p>);
}; 