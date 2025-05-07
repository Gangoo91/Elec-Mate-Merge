
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Star } from "lucide-react";

const DealOfTheDay = () => {
  return (
    <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-gray/70 overflow-hidden">
      <div className="absolute top-0 right-0 bg-elec-yellow text-black px-3 py-1 rounded-bl-md font-semibold flex items-center text-sm">
        <Star className="h-3 w-3 mr-1 fill-current" />
        DEAL OF THE DAY
      </div>
      <CardHeader>
        <CardTitle className="text-2xl">Schneider Electric Distribution Board</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-elec-yellow">£129.99</span>
              <span className="text-lg line-through text-muted-foreground">£179.99</span>
              <span className="bg-elec-yellow/20 text-elec-yellow px-2 py-0.5 rounded text-sm">
                SAVE 28%
              </span>
            </div>
            
            <ul className="space-y-2">
              <li className="flex items-center">
                <Zap className="h-4 w-4 text-elec-yellow mr-2" />
                10-Way 100A Type B Consumer Unit
              </li>
              <li className="flex items-center">
                <Zap className="h-4 w-4 text-elec-yellow mr-2" />
                Dual 80A RCDs + 10 MCBs
              </li>
              <li className="flex items-center">
                <Zap className="h-4 w-4 text-elec-yellow mr-2" />
                Metal Housing with Full Compliance
              </li>
              <li className="flex items-center">
                <Zap className="h-4 w-4 text-elec-yellow mr-2" />
                2-Year Warranty & Free Delivery
              </li>
            </ul>
            
            <div className="pt-2">
              <Button className="w-full sm:w-auto">
                Add to Order
              </Button>
            </div>
          </div>
          
          <div className="flex items-center justify-center">
            <div className="bg-elec-card w-full h-40 rounded-md flex items-center justify-center text-elec-yellow/50">
              Product Image
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DealOfTheDay;
