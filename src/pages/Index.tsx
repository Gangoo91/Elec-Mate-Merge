
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="container mx-auto py-10 px-4 min-h-screen flex flex-col items-center justify-center">
      <Card className="w-full max-w-3xl border-elec-yellow/20">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Welcome to Electrician App</CardTitle>
          <CardDescription>
            Access your tools and resources from the dashboard
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 items-center">
          <Button asChild size="lg" className="w-full max-w-sm">
            <Link to="/dashboard">Go to Dashboard</Link>
          </Button>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl mt-4">
            <Card className="border-elec-yellow/20 bg-elec-gray">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Health & Safety</CardTitle>
              </CardHeader>
              <CardContent>
                <Button asChild size="sm" variant="outline" className="w-full">
                  <Link to="/health-safety">Access Health & Safety</Link>
                </Button>
              </CardContent>
            </Card>
            <Card className="border-elec-yellow/20 bg-elec-gray">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Apprentice Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <Button asChild size="sm" variant="outline" className="w-full">
                  <Link to="/apprentice/hub">Access Hub</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
