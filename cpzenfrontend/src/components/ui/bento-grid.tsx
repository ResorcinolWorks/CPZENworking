
import { cn } from "@/lib/utils";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-8",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  icon,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  icon?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-xl group/bento transition-transform duration-300 ease-in-out hover:-translate-y-2 relative",
        "p-[1px]",
        "bg-muted/50 dark:bg-black border dark:border-white/[0.1] shadow-lg dark:shadow-none hover:shadow-xl", // default state
        "group-hover:bg-[linear-gradient(90deg,hsl(var(--secondary)),hsl(var(--primary)),hsl(var(--secondary)))]",
        "group-hover:bg-[length:200%_100%]",
        "group-hover:animate-animate-gradient",
        className
      )}
    >
        <div className="rounded-[11px] w-full h-full p-6 bg-muted/50 dark:bg-black flex flex-col justify-center items-center text-center">
            <div className="text-primary bg-primary/10 p-3 rounded-full mb-4">
                {icon}
            </div>
            <h3 className="text-2xl font-semibold leading-none tracking-tight mb-1.5">
                {title}
            </h3>
            <p className="text-sm text-muted-foreground">
                {description}
            </p>
        </div>
    </div>
  );
};
