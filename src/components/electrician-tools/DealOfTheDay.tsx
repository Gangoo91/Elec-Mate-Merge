
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wrench, Star } from "lucide-react";

const DealOfTheDay = () => {
  return (
    <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-gray/70 overflow-hidden">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2">
          Tool Deal of the Day
          <span className="bg-elec-yellow text-black px-2 py-0.5 rounded-md text-sm flex items-center">
            <Star className="h-3 w-3 mr-1 fill-current" />
            SAVE 35%
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-elec-yellow">£149.99</span>
              <span className="text-lg line-through text-muted-foreground">£229.99</span>
            </div>
            
            <div className="text-xl font-medium">DeWalt 18V XR Combi Drill Kit</div>
            
            <ul className="space-y-2">
              <li className="flex items-center">
                <Wrench className="h-4 w-4 text-elec-yellow mr-2" />
                18V Brushless Motor
              </li>
              <li className="flex items-center">
                <Wrench className="h-4 w-4 text-elec-yellow mr-2" />
                2 x 2.0Ah Batteries Included
              </li>
              <li className="flex items-center">
                <Wrench className="h-4 w-4 text-elec-yellow mr-2" />
                Fast Charger & Carry Case
              </li>
              <li className="flex items-center">
                <Wrench className="h-4 w-4 text-elec-yellow mr-2" />
                3-Year Manufacturer Warranty
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
              Tool Image
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DealOfTheDay;
