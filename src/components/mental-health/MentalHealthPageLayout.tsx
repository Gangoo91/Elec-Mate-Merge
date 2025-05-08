
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { ReactNode } from "react";

interface MentalHealthPageLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
  backLink?: string;
  icon?: ReactNode;
  color?: string;
}

export const MentalHealthPageLayout = ({ 
  title, 
  description, 
  children, 
  backLink,
  icon,
  color = "purple" 
}: MentalHealthPageLayoutProps) => {
  const location = useLocation();
  const isElectricianPath = location.pathname.startsWith('/electrician/');
  const basePath = isElectricianPath ? '/electrician/mental-health' : '/apprentice/mental-health';
  const finalBackLink = backLink || basePath;
  
  const colorClasses = {
    purple: "border-purple-500/20 from-purple-500/10 border-purple-500/10",
    yellow: "border-elec-yellow/20 from-elec-yellow/10 border-elec-yellow/10",
    green: "border-green-500/20 from-green-500/10 border-green-500/10",
    red: "border-red-500/20 from-red-500/10 border-red-500/10"
  };

  return (
    <div className="space-y-6 animate-fade-in pb-6">
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">{title}</h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">
            {description}
          </p>
        </div>
        <Link to={finalBackLink} className="self-start sm:self-auto">
          <Button variant="outline" size="sm" className="w-full sm:w-auto flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Mental Health Hub
          </Button>
        </Link>
      </div>
      
      <Card className={`${colorClasses[color as keyof typeof colorClasses]} bg-elec-gray`}>
        <CardHeader className="pb-3 bg-gradient-to-r from-transparent border-b">
          <div className="flex items-center gap-3">
            {icon}
            <div>
              <CardTitle className="text-lg sm:text-xl">{title}</CardTitle>
              <CardDescription className="text-sm">
                {description}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          {children}
        </CardContent>
      </Card>
    </div>
  );
};

export default MentalHealthPageLayout;
