import { Progress } from "@/components/ui/progress";

interface ProgressMeterProps {
  label: string;
  value: number;
}

const ProgressMeter = ({ label, value }: ProgressMeterProps) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <p className="font-semibold">{label}</p>
        <p className="text-sm text-muted-foreground">{value}%</p>
      </div>
      <Progress value={value} />
    </div>
  );
};

export default ProgressMeter;
