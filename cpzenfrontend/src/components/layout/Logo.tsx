import { Link } from "react-router-dom";

export const Logo = () => {
  return (
    <Link to="/" className="mr-6 flex items-center space-x-2">
      <span className="font-bold text-lg">CpZen</span>
    </Link>
  );
}; 