"use client";
import React from "react";
import { motion, useScroll } from "framer-motion";
import { cn } from "@/lib/utils";

interface TimelineProps {
  data: {
    title: string;
    content: string;
  }[];
}

export const Timeline = ({ data }: TimelineProps) => {
  const { scrollYProgress } = useScroll();

  return (
    <div className="relative">
      <motion.div
        className="absolute left-[65px] top-2 w-[3px] h-[calc(100%-24px)] bg-gradient-to-b from-white/20 via-white/50 to-white/20"
        style={{
          scaleY: scrollYProgress,
          transformOrigin: "top",
        }}
      />

      <div className="flex flex-col space-y-12">
        {data.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.2 }}
            className="flex items-start gap-8">
            <div className="flex flex-col items-center">
              <div className="w-[66px] h-[66px] rounded-full border-2 border-white/20 flex items-center justify-center bg-black">
                <div className="w-3 h-3 rounded-full bg-white" />
              </div>
            </div>
            <div className="pt-3">
              <p className="text-3xl font-bold text-white mb-3">{item.title}</p>
              <p className="text-[#a9a9a9] text-lg">{item.content}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}; 