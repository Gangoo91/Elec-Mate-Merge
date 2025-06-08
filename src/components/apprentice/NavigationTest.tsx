
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, CheckCircle, XCircle } from "lucide-react";

const NavigationTest = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const testRoutes = [
    "/apprentice/hub",
    "/apprentice/study", 
    "/apprentice/ojt",
    "/apprentice/mental-health",
    "/apprentice/mentor",
    "/apprentice/toolbox",
    "/apprentice/on-job-tools",
    "/apprentice/professional-development",
    "/apprentice/rights-and-pay"
  ];

  const testNavigation = (route: string) => {
    try {
      navigate(route);
      console.log(`Successfully navigated to: ${route}`);
    } catch (error) {
      console.error(`Failed to navigate to ${route}:`, error);
    }
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-green-400" />
          Navigation Test Panel
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm">
          <p className="text-muted-foreground mb-2">Current location: <code>{location.pathname}</code></p>
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          {testRoutes.map((route) => (
            <Button
              key={route}
              variant="outline"
              size="sm"
              onClick={() => testNavigation(route)}
              className="text-xs"
            >
              {route.replace('/apprentice/', '')}
            </Button>
          ))}
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(-1)}
          className="w-full"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Go Back
        </Button>
      </CardContent>
    </Card>
  );
};

export default NavigationTest;
