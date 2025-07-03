import { cn } from "@/lib/utils";
import { type CSSProperties, type FC, type ReactNode } from "react";

interface AnimatedGradientTextProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

const AnimatedGradientText: FC<AnimatedGradientTextProps> = ({
  children,
  className,
  style,
}) => {
  return (
    <div
      className={cn(
        "group relative mx-auto flex max-w-fit flex-row items-center justify-center rounded-2xl bg-white/40 px-4 py-1.5 text-sm font-medium text-black/50 shadow-lg backdrop-blur-sm dark:bg-black/40 dark:text-white/50",
        className,
      )}
      style={style}
    >
      <div
        className="absolute inset-0 -z-10 rounded-2xl"
        style={
          {
            "--bg-size": "400%",
            "--color-one": "#FF7112",
            "--color-two": "#FFB26B",
            background:
              "linear-gradient(90deg, var(--color-one), var(--color-two), var(--color-one)) 0 0 / var(--bg-size) 100%",
          } as CSSProperties
        }
      />

      <div
        className="absolute inset-0 -z-20 rounded-2xl"
        style={
          {
            "--bg-size": "400%",
            "--color-one": "#FF7112",
            "--color-two": "#FFB26B",
            background:
              "linear-gradient(90deg, var(--color-one), var(--color-two), var(--color-one)) 0 0 / var(--bg-size) 100%",
            filter: "blur(40px)",
          } as CSSProperties
        }
      />
      {children}
    </div>
  );
};

export default AnimatedGradientText; 