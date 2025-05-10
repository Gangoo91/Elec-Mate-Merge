
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface ToolboxHeaderProps {
  title: string;
  linkPath: string;
  linkText: string;
}

const ToolboxHeader = ({ title, linkPath, linkText }: ToolboxHeaderProps) => {
  return (
    <div className="flex flex-col items-center justify-center mb-6">
      <h1 className="text-3xl font-bold tracking-tight mb-6">{title}</h1>
      <div className="w-full flex justify-center">
        <Link to={linkPath} className="w-full max-w-xs">
          <Button variant="outline" className="w-full">{linkText}</Button>
        </Link>
      </div>
    </div>
  );
};

export default ToolboxHeader;
