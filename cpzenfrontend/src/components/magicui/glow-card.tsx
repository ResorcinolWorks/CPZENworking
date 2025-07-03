import React from "react";
import { Card as ShadcnCard } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface GlowCardProps extends React.HTMLAttributes<HTMLDivElement> {
  glowColor?: string;
  hoverEffect?: boolean;
  borderEffect?: boolean;
  borderColors?: string[];
  intensity?: number;
  children: React.ReactNode;
}

const GlowCard: React.FC<GlowCardProps> = ({
  className,
  glowColor = "rgba(239, 68, 68, 0.5)",
  hoverEffect = true,
  borderEffect = true,
  borderColors = ["rgba(239, 68, 68, 0.7)", "rgba(234, 179, 8, 0.7)"],
  intensity = 0.5,
  children,
  ...props
}) => {
  return (
    <div 
      className={cn(
        "relative group transition-all duration-500",
        hoverEffect && "hover:scale-[1.02]",
        className
      )}
    >
      {/* Glow effect */}
      <div
        className={cn(
          "absolute inset-0 rounded-lg opacity-40 blur-xl transition-opacity duration-500",
          hoverEffect && "group-hover:opacity-70"
        )}
        style={{
          background: `radial-gradient(circle at center, ${glowColor}, transparent 70%)`,
          opacity: intensity
        }}
      />
      
      {/* Border effect */}
      {borderEffect && (
        <div
          className="absolute inset-0 rounded-lg"
          style={{
            padding: '1px',
            background: `linear-gradient(90deg, ${borderColors[0]}, ${borderColors[1]}, ${borderColors[0]})`,
            backgroundSize: '200% auto',
            animation: 'shine 6s linear infinite',
            mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            maskComposite: 'exclude',
            WebkitMaskComposite: 'xor',
          }}
        />
      )}
      
      {/* Card content */}
      <ShadcnCard 
        className={cn(
          "relative z-10 border-0 backdrop-blur-[2px]",
          hoverEffect && "transition-transform duration-500"
        )}
        {...props}
      >
        {children}
      </ShadcnCard>
    </div>
  );
};

export default GlowCard;
