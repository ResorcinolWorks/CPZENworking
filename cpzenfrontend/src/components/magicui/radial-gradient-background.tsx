import { cn } from "@/lib/utils";
import React from "react";

interface RadialGradientBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode;
  colors?: {
    light: {
      base: string;
      highlight: string;
    };
    dark: {
      base: string;
      highlight: string;
    };
  };
  intensity?: number;
}

const RadialGradientBackground = ({
  className,
  children,
  colors = {
    light: {
      base: "#ffffff",
      highlight: "#f9fafb",
    },
    dark: {
      base: "#030712",
      highlight: "#111827",
    },
  },
  intensity = 0.8,
  ...props
}: RadialGradientBackgroundProps) => {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden",
        className
      )}
      {...props}
    >
      {/* Base color layer */}
      <div className="absolute inset-0 bg-background" />
      
      {/* Radial gradient overlay */}
      <div 
        className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
        style={{
          background: `
            radial-gradient(circle at 15% 50%, var(--radial-highlight) 0%, transparent 25%),
            radial-gradient(circle at 85% 30%, var(--radial-highlight) 0%, transparent 25%)
          `,
          opacity: intensity,
          '--radial-highlight': `var(--highlight-color)`,
        } as React.CSSProperties}
      />

      {/* Dynamic CSS variables */}
      <style jsx global>{`
        :root {
          --highlight-color: ${colors.light.highlight};
        }
        .dark {
          --highlight-color: ${colors.dark.highlight};
        }
      `}</style>
      
      {/* Subtle grid overlay */}
      <div className="absolute inset-0 bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] dark:bg-black dark:bg-[radial-gradient(#27272a_1px,transparent_1px)] opacity-40" />
      
      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default RadialGradientBackground;
