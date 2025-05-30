
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface ToolboxHeaderProps {
  title: string;
  linkPath: string;
  linkText: string;
}

const ToolboxHeader = ({ title, linkPath, linkText }: ToolboxHeaderProps) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold tracking-tight mb-6">{title}</h1>
    </div>
  );
};

export default ToolboxHeader;
