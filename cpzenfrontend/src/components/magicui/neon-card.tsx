import { cn } from "@/lib/utils";
import React from "react";

interface NeonCardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  glowColor?: string;
  hoverEffect?: boolean;
  children: React.ReactNode;
}

const NeonCard = ({
  className,
  glowColor = "rgba(239, 68, 68, 0.5)",
  hoverEffect = true,
  children,
  ...props
}: NeonCardProps) => {
  return (
    <div
      className={cn(
        "relative rounded-xl transition-all duration-500",
        hoverEffect && "hover:scale-[1.03]",
        className
      )}
      style={{
        '--glow-color': glowColor,
      } as React.CSSProperties}
      {...props}
    >
      {/* Glow Effect Layer */}
      <div 
        className={cn(
          "absolute inset-0 rounded-xl blur-xl opacity-50 transition-opacity duration-500",
          hoverEffect && "group-hover:opacity-70"
        )}
        style={{
          background: `radial-gradient(circle at center, var(--glow-color), transparent 70%)`,
        }}
      />
      
      {/* Border Layer */}
      <div 
        className="absolute inset-0 rounded-xl"
        style={{
          padding: '1px',
          background: `linear-gradient(90deg, var(--glow-color), transparent, var(--glow-color))`,
          backgroundSize: '200% auto',
          animation: 'shine 6s linear infinite',
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor',
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 rounded-xl bg-card p-6 backdrop-blur-sm">
        {children}
      </div>
    </div>
  );
};

export default NeonCard;
