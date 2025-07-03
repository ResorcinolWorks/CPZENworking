import { cn } from "@/lib/utils";
import React, { type ReactNode } from "react";

interface NeonGradientCardProps {
  className?: string;
  children?: ReactNode;
  borderSize?: number;
  borderRadius?: number;
  neonColors?: {
    firstColor: string;
    secondColor: string;
  };
  [key: string]: unknown;
}

const NeonGradientCard: React.FC<NeonGradientCardProps> = ({
  className,
  children,
  borderSize = 2,
  borderRadius = 20,
  neonColors = {
    firstColor: "#ff00aa",
    secondColor: "#00FFF1",
  },
  ...props
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { currentTarget: target } = e;
      const { left, top } = (target as HTMLElement).getBoundingClientRect();
      const x = e.clientX - left;
      const y = e.clientY - top;
      (target as HTMLElement).style.setProperty("--x", `${x}px`);
      (target as HTMLElement).style.setProperty("--y", `${y}px`);
    };

    const cardElement = document.getElementById("neon-gradient-card");
    if (cardElement) {
      cardElement.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      if (cardElement) {
        cardElement.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, []);

  return (
    <div
      id="neon-gradient-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={
        {
          "--x": "50%",
          "--y": "50%",
        } as React.CSSProperties
      }
      {...props}
      className={cn(
        "relative p-px",
        "before:absolute before:left-0 before:top-0 before:h-full before:w-full before:rounded-lg before:bg-card before:content-[''] before:opacity-90 before:[mask:var(--mask-gradient)] before:[mask-size:400%_400%]",
        "after:absolute after:left-0 after:top-0 after:h-full after:w-full after:rounded-lg after:bg-[conic-gradient(from_calc(270deg-var(--start-angle)),var(--neon-first-color)_0%,var(--neon-second-color)_20%,var(--neon-first-color)_40%)] after:content-[''] after:opacity-100 after:[animation:shine_5s_linear_infinite] after:[background-size:200%_200%]",
        "hover:after:opacity-100",
        className
      )}
    >
      <div
        className={cn(
          "relative z-10 h-full w-full rounded-[inherit] bg-background p-4",
          "md:p-6"
        )}
      >
        {children}
      </div>
    </div>
  );
};

export { NeonGradientCard }; 