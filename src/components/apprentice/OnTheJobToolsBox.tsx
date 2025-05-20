
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
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-md bg-elec-yellow/10">
                  <tool.icon className="h-6 w-6 text-elec-yellow" />
                </div>
                <CardTitle className="text-lg">{tool.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-elec-light/80">{tool.description}</CardDescription>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default OnTheJobToolsBox;
