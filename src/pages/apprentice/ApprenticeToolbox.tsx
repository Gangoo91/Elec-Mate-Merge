
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { MessageSquare, Wrench, Shield, GraduationCap, Book, FileText, Hammer } from "lucide-react";

const ApprenticeToolbox = () => {
  const toolboxCategories = [
    {
      id: 1,
      title: "Chat",
      description: "Connect with other apprentices and get answers to your questions",
      icon: <MessageSquare className="h-6 w-6 text-elec-yellow" />,
      link: "/apprentice/chat"
    },
    {
      id: 2,
      title: "Reference Materials",
      description: "Access codes, standards, and technical terminology for electrical work",
      icon: <Book className="h-6 w-6 text-elec-yellow" />,
      link: "/apprentice/reference-materials"
    },
    {
      id: 3,
      title: "Basic Tools Guide",
      description: "Learn about essential tools for electrical apprentices",
      icon: <Wrench className="h-6 w-6 text-elec-yellow" />,
      link: "/apprentice/tools-guide"
    },
    {
      id: 4,
      title: "Safety Fundamentals",
      description: "Critical safety information for apprentices on-site",
      icon: <Shield className="h-6 w-6 text-elec-yellow" />,
      link: "/apprentice/safety-fundamentals"
    },
    {
      id: 5,
      title: "Practical Tips",
      description: "Day-to-day advice from experienced electricians for apprentices",
      icon: <FileText className="h-6 w-6 text-elec-yellow" />,
      link: "/apprentice/practical-tips"
    },
    {
      id: 6,
      title: "Qualification Pathway",
      description: "Understand the steps to becoming a qualified electrician",
      icon: <GraduationCap className="h-6 w-6 text-elec-yellow" />,
      link: "/apprentice/career-progression"
    },
    {
      id: 7,
      title: "Installation Techniques",
      description: "Best practices for various electrical installations and procedures",
      icon: <Hammer className="h-6 w-6 text-elec-yellow" />,
      link: "/apprentice/installation-techniques"
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Apprentice Toolbox Talk</h1>
          <p className="text-muted-foreground">
            Essential resources for electrical apprentices
          </p>
        </div>
        <Link to="/apprentice/hub">
          <Button variant="outline">Back to Apprentice Hub</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {toolboxCategories.map((category) => (
          <Link to={category.link} key={category.id} className="block">
            <Card 
              className="border-elec-yellow/20 bg-elec-gray hover:border-elec-yellow/50 transition-all flex flex-col h-full"
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-xl flex items-center gap-2">
                  {category.icon}
                  {category.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col flex-1 justify-between">
                <CardDescription className="text-sm mb-4">
                  {category.description}
                </CardDescription>
                <Button className="w-full mt-auto">View Details</Button>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ApprenticeToolbox;
