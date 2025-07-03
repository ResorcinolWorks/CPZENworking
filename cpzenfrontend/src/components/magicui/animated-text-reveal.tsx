import React, { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedTextRevealProps {
  text: string;
  className?: string;
  once?: boolean;
  repeatDelay?: number;
  delay?: number;
}

const AnimatedTextReveal = ({
  text,
  className,
  once = true,
  repeatDelay,
  delay = 0,
}: AnimatedTextRevealProps) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once });
  const words = text.split(" ");

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    const animate = async () => {
      if (isInView) {
        await controls.start("visible");
        if (repeatDelay) {
          timeout = setTimeout(async () => {
            await controls.start("hidden");
            controls.start("visible");
          }, repeatDelay);
        }
      }
    };

    animate();

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [isInView, controls, repeatDelay]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: delay },
    }),
  };

  const childVariants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={cn("leading-relaxed tracking-wide", className)}
      variants={containerVariants}
      initial="hidden"
      animate={controls}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="inline-block mx-[0.15em] first:ml-0"
          variants={childVariants}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default AnimatedTextReveal;
