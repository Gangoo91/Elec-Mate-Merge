
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface Tool {
  id: number;
  title: string;
  icon: LucideIcon;
  description: string;
  link: string;
}

interface OnTheJobToolsBoxProps {
  tools: Tool[];
}

const OnTheJobToolsBox = ({ tools }: OnTheJobToolsBoxProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tools.map((tool) => (
        <Link to={tool.link} key={tool.id} className="focus:outline-none">
          <Card className="border-elec-yellow/20 bg-elec-gray h-full hover:bg-elec-gray/80 transition-colors cursor-pointer">
            <CardHeader className="flex flex-col items-center justify-center text-center">
              <tool.icon className="h-8 w-8 mb-2 text-elec-yellow" />
              <CardTitle className="text-lg">{tool.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-elec-light/80 text-center">{tool.description}</CardDescription>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default OnTheJobToolsBox;
