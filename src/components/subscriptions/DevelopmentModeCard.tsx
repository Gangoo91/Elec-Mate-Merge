
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Code, BarChart } from "lucide-react";
import { useAuth } from '@/contexts/AuthContext';
import { Link } from "react-router-dom";

const DevelopmentModeCard = () => {
  const { isDevelopmentMode, toggleDevelopmentMode } = useAuth();

  return (
    <Card className="border-blue-500/20 bg-elec-gray">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Code size={20} />
          Development Mode
        </CardTitle>
        <CardDescription>
          Enable development mode to bypass subscription restrictions while building the application.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">Current Status</div>
            <div className="text-lg font-medium">
              {isDevelopmentMode ? "Enabled" : "Disabled"}
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            {isDevelopmentMode && (
              <Link to="/admin/analytics">
                <Button variant="outline" className="flex items-center gap-2 w-full sm:w-auto">
                  <BarChart className="h-4 w-4" />
                  Analytics Dashboard
                </Button>
              </Link>
            )}
            <Button 
              onClick={toggleDevelopmentMode}
              variant={isDevelopmentMode ? "destructive" : "default"}
              className={isDevelopmentMode ? "" : "bg-blue-600 hover:bg-blue-700 w-full sm:w-auto"}
            >
              {isDevelopmentMode ? "Disable Development Mode" : "Enable Development Mode"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DevelopmentModeCard;
