"use client";

import { cn } from "@/lib/utils";
import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

interface GradualSpacingProps {
  text: string;
  duration?: number;
  delayMultiple?: number;
  framerProps?: {
    hidden: {
      opacity: number;
      x: number;
    };
    visible: {
      opacity: number;
      x: number;
      transition: {
        type: string;
        stiffness: number;
        damping: number;
      };
    };
  };
  className?: string;
}

export default function GradualSpacing({
  text,
  duration = 0.5,
  delayMultiple = 0.04,
  framerProps = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 300, damping: 20 } },
  },
  className,
}: GradualSpacingProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [inView, controls]);

  return (
    <div className="flex justify-center space-x-0.5" ref={ref}>
      {text.split("").map((char, i) => (
        <motion.h1
          key={i}
          initial="hidden"
          animate={controls}
          variants={framerProps}
          transition={{ duration, delay: i * delayMultiple }}
          className={cn("drop-shadow-sm", className)}
        >
          {char === " " ? <span>&nbsp;</span> : char}
        </motion.h1>
      ))}
    </div>
  );
} 