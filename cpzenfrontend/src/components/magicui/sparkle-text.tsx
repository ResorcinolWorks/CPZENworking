"use client";

import { memo } from "react";
import { Sparkles } from "./sparkles";
import type { SparklesProps } from "./sparkles";

interface SparkleTextProps extends Partial<SparklesProps> {
  text: string;
  className?: string;
}

const SparkleText = ({
  text,
  className,
  maxCount,
  ...props
}: SparkleTextProps) => {
  return (
    <div className="relative">
      <Sparkles {...props} maxCount={maxCount} />
      <p className={className}>{text}</p>
    </div>
  );
};

export default memo(SparkleText); 