
import { Users, MapPin } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const AndysManClub = () => {
  return (
    <Card className="border-purple-500/30 bg-purple-500/5 hover:shadow-md transition-shadow shadow-sm">
      <CardHeader className="pb-3 border-b border-purple-500/10">
        <CardTitle className="text-base flex items-center gap-2">
          <Users className="h-4 w-4 text-purple-500" />
          Andy's Man Club
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-6">
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="bg-purple-500/10 p-2 rounded-md">
              <Users className="h-4 w-4 text-purple-500" />
            </div>
            <div className="text-sm">
              <p>Free, peer-to-peer support group for men - #ITSOKAYTOTALK</p>
              <p className="text-xs text-muted-foreground mt-1">
                Groups meet every Monday at 7pm (excluding bank holidays)
              </p>
            </div>
          </div>
          <Button 
            className="w-full bg-purple-600 hover:bg-purple-700 text-white text-sm flex items-center gap-2"
            onClick={() => window.open("https://andysmanclub.co.uk/find-your-nearest-group/", "_blank")}
          >
            <MapPin className="h-4 w-4" />
            Find Nearest Group
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AndysManClub;
