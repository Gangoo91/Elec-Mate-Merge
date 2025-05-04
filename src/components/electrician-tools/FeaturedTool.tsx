
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wrench } from "lucide-react";

const FeaturedTool = () => {
  return (
    <Card className="border-elec-yellow bg-elec-gray">
      <CardHeader>
        <CardTitle>Featured Tool: Multi-Circuit Designer</CardTitle>
        <CardDescription>
          Design and validate multi-circuit installations with our interactive tool.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="bg-elec-dark rounded-lg aspect-video flex items-center justify-center">
          <div className="text-center p-6">
            <Wrench className="h-12 w-12 text-elec-yellow mx-auto mb-4 opacity-70" />
            <h3 className="text-lg font-medium mb-2">Premium Feature</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Upgrade your subscription to access the Multi-Circuit Designer tool.
            </p>
            <Button>Upgrade to Access</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeaturedTool;
