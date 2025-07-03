import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const blurInVariants = cva(
  "animate-blur-in data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
  {
    variants: {
      variant: {
        "blur-sm": "blur-sm",
        "blur-md": "blur-md",
        "blur-lg": "blur-lg",
        "blur-xl": "blur-xl",
      },
      duration: {
        "duration-100": "duration-100",
        "duration-200": "duration-200",
        "duration-300": "duration-300",
        "duration-500": "duration-500",
        "duration-700": "duration-700",
        "duration-1000": "duration-1000",
      },
    },
    defaultVariants: {
      variant: "blur-lg",
      duration: "duration-500",
    },
  },
);

interface WordPullUpProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof blurInVariants> {
  text: string;
}

export default function BlurIn({
  text,
  className,
  variant,
  duration,
}: WordPullUpProps) {
  return (
    <h1
      className={cn(
        "font-bold tracking-[-0.02em] text-black drop-shadow-sm dark:text-white",
        className,
        blurInVariants({ variant, duration }),
      )}
    >
      {text}
    </h1>
  );
} 