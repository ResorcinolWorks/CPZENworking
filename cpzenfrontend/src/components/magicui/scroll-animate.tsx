import React, { useRef, useEffect } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScrollAnimateProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  animation?: "fadeIn" | "slideUp" | "scaleUp" | "slideFromLeft" | "slideFromRight";
  delay?: number;
  threshold?: number;
  duration?: number;
  once?: boolean;
  className?: string;
}

const animations = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  slideUp: {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  },
  scaleUp: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  },
  slideFromLeft: {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  },
  slideFromRight: {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
  },
};

const ScrollAnimate = ({
  children,
  animation = "fadeIn",
  delay = 0,
  threshold = 0.1,
  duration = 0.5,
  once = true,
  className,
  ...props
}: ScrollAnimateProps) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once, threshold });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else if (!once) {
      controls.start("hidden");
    }
  }, [controls, inView, once]);

  return (
    <motion.div
      className={cn(className)}
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={animations[animation]}
      transition={{ duration, delay, ease: "easeOut" }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default ScrollAnimate;
