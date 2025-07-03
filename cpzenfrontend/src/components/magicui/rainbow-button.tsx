import { cn } from "@/lib/utils";
import React from "react";

const RainbowButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  return (
    <button
      className={cn(
        "relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50",
        "before:absolute before:w-full before:h-full before:-z-10 before:rounded-[var(--radius)] before:px-6 before:py-3 before:bg-[radial-gradient(circle_at_100%_100%,#fca5a5,transparent_60%),radial-gradient(circle_at_0%_0%,#fca5a5,transparent_60%)]",
        "dark:before:bg-[radial-gradient(circle_at_100%_100%,#ef4444,transparent_60%),radial-gradient(circle_at_0%_0%,#ef4444,transparent_60%)]",
        "before:animate-bg-spin",
        className
      )}
      ref={ref}
      {...props}
    >
      <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-100/80 dark:bg-slate-900/80 px-3 py-1 text-sm font-medium text-black dark:text-white backdrop-blur-3xl">
        {props.children}
      </span>
    </button>
  );
});
RainbowButton.displayName = "RainbowButton";

export default RainbowButton; 