"use client";

import { cn } from "@/lib/utils";
import useRandomInterval from "@/hooks/use-random-interval";
import { random } from "@/lib/utils";
import { Sparkle } from "lucide-react";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from "react";

// Inspired by https://www.joshwcomeau.com/react/animated-sparkles-in-react/

export interface SparklesProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /**
   * The maximum number of sparkles to display at once.
   * @default 2
   */
  maxCount?: number;
  /**
   * The color of the sparkles.
   * Can be a string or an array of strings.
   * If it's an array, a random color will be chosen from the array.
   */
  color?: string | string[];
}

const SparklesContext = createContext<SparklesProps | null>(null);

const SparklesProvider = ({
  children,
  color,
  maxCount = 2,
  ...props
}: SparklesProps) => {
  return (
    <SparklesContext.Provider
      value={{
        children,
        color,
        maxCount,
        ...props,
      }}
    >
      <div {...props} className={cn("relative", props.className)}>
        {children}
      </div>
    </SparklesContext.Provider>
  );
};

export const useSparkles = () => {
  const context = useContext(SparklesContext);
  if (!context) {
    throw new Error("useSparkles must be used within a SparklesProvider");
  }
  return context;
};

export const Sparkles = (props: SparklesProps) => {
  return (
    <SparklesProvider {...props}>
      <SparklesCore />
    </SparklesProvider>
  );
};

const SparklesCore = () => {
  const { color, maxCount } = useSparkles();
  const [sparkles, setSparkles] = useState<
    Array<{
      id: string;
      createdAt: number;
      color: string;
      size: number;
      style: {
        top: string;
        left: string;
      };
    }>
  >([]);

  useRandomInterval(
    () => {
      const sparkleColor = Array.isArray(color)
        ? color[random(0, color.length - 1)]
        : color;

      const sparkle = {
        id: String(random(10000, 99999)),
        createdAt: Date.now(),
        color: sparkleColor || "gold",
        size: random(10, 20),
        style: {
          top: random(0, 100) + "%",
          left: random(0, 100) + "%",
        },
      };
      const now = Date.now();
      const nextSparkles = sparkles.filter((sp) => {
        const delta = now - sp.createdAt;
        return delta < 750;
      });
      nextSparkles.push(sparkle);
      setSparkles(nextSparkles);
    },
    50,
    100,
    maxCount,
  );

  return (
    <>
      {sparkles.map(({ id, size, color, style }) => (
        <div
          key={id}
          className="absolute"
          style={{
            ...style,
          }}
        >
          <div
            className="animate-sparkle"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              position: "absolute",
              backgroundColor: "transparent",
              borderRadius: "50%",
              boxShadow: `0 0 ${
                size / 2
              }px 0px ${color}, 0 0 3px 0px ${color}`,
            }}
          />
          <Sparkle
            style={{
              position: "absolute",
              width: `${size}px`,
              height: `${size}px`,
              color: color,
            }}
          />
        </div>
      ))}
    </>
  );
}; 