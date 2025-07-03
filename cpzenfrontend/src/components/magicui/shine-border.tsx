import { cn } from "@/lib/utils";
import React, { useEffect, useRef } from "react";

interface ShineBorderProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: string | string[];
  duration?: number;
  borderWidth?: number;
  borderRadius?: number;
  isHoverable?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const ShineBorder = ({
  color = ["#8678f9", "#c7d2fe"],
  duration = 2,
  borderWidth = 1,
  borderRadius = 8,
  isHoverable = true,
  className,
  children,
  ...props
}: ShineBorderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const gradientColors = Array.isArray(color) ? color : [color, color];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isHoverable) return;
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      container.style.setProperty("--mouse-x", `${x}px`);
      container.style.setProperty("--mouse-y", `${y}px`);
    };

    container.addEventListener("mousemove", handleMouseMove);
    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isHoverable]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative group cursor-pointer py-3 px-6 rounded-lg",
        className
      )}
      style={{
        borderRadius: borderRadius ? `${borderRadius}px` : undefined,
        "--border-width": `${borderWidth}px`,
        "--border-radius": `${borderRadius}px`,
        "--gradient-color-1": gradientColors[0],
        "--gradient-color-2": gradientColors[1],
        "--animation-duration": `${duration}s`,
      } as React.CSSProperties}
      {...props}
    >
      <div
        className="absolute inset-0 rounded-lg"
        style={{ 
          borderRadius: `var(--border-radius)`,
          padding: 'var(--border-width)',
          background: `linear-gradient(90deg, var(--gradient-color-1), var(--gradient-color-2), var(--gradient-color-1))`,
          backgroundSize: '200% auto',
          animation: `shine var(--animation-duration) linear infinite`,
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor',
          pointerEvents: 'none'
        }}
      />
      <div
        className={cn(
          "absolute inset-0 opacity-0 rounded-lg transition-opacity duration-300",
          isHoverable && "group-hover:opacity-100"
        )}
        style={{
          borderRadius: `var(--border-radius)`,
          padding: 'var(--border-width)',
          background: `radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), var(--gradient-color-1), transparent 40%)`,
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor',
          pointerEvents: 'none'
        }}
      />
      <div className="relative z-10 p-2">{children}</div>
    </div>
  );
};

export default ShineBorder;
