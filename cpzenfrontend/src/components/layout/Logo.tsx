import { Link } from "react-router-dom";

export const Logo = () => {
  return (
    <Link to="/" className="mr-6 flex items-center space-x-2">
      <div className="h-6 w-6 flex items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
        &lt;&gt;
      </div>
      <span className="font-bold text-lg">CpZen</span>
    </Link>
  );
}; 