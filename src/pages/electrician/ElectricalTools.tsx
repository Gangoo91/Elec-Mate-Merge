
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Wrench, ArrowLeft, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const ElectricalTools = () => {
  const tools = [
    {
      id: 1,
      name: "Fluke 1664FC Multifunction Tester",
      category: "Testing Equipment",
      price: "£1,275.00",
      rating: 4.8,
      image: "placeholder.svg"
    },
    {
      id: 2,
      name: "DeWalt 18V XR Combi Drill",
      category: "Power Tools",
      price: "£179.99",
      rating: 4.7,
      image: "placeholder.svg"
    },
    {
      id: 3,
      name: "C.K Tools VDE Screwdriver Set",
      category: "Hand Tools",
      price: "£39.95",
      rating: 4.6,
      image: "placeholder.svg"
    },
    {
      id: 4,
      name: "Klein Tools Cable Cutter",
      category: "Hand Tools",
      price: "£54.50",
      rating: 4.8,
      image: "placeholder.svg"
    },
    {
      id: 5,
      name: "Megger MIT320 Insulation Tester",
      category: "Testing Equipment",
      price: "£299.99",
      rating: 4.5,
      image: "placeholder.svg"
    },
    {
      id: 6,
      name: "Knipex Wire Stripper",
      category: "Hand Tools",
      price: "£27.50",
      rating: 4.9,
      image: "placeholder.svg"
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Wrench className="h-8 w-8 text-elec-yellow" />
            Electrical Tools
          </h1>
          <p className="text-muted-foreground">
            Essential tools and equipment for electrical work
          </p>
        </div>
        <Link to="/electrician/toolbox-talk">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Toolbox Talk
          </Button>
        </Link>
      </div>

      <div className="border p-4 rounded-lg bg-elec-gray border-elec-yellow/20 flex items-center gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search tools..." className="pl-8" />
          </div>
        </div>
        <Button variant="default">Search</Button>
      </div>

      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map(tool => (
            <Card key={tool.id} className="border-elec-yellow/20 bg-elec-gray flex flex-col h-full">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center mb-2">
                  <span className="bg-elec-yellow/20 text-elec-yellow text-xs px-2 py-1 rounded">
                    {tool.category}
                  </span>
                  <span className="font-bold text-elec-yellow">{tool.price}</span>
                </div>
                <CardTitle className="text-lg">{tool.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col flex-1 justify-between">
                <div className="mb-4">
                  <div className="flex items-center">
                    <span className="text-sm mr-2">Rating: {tool.rating}/5</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={`text-sm ${i < Math.floor(tool.rating) ? "text-elec-yellow" : "text-gray-400"}`}>★</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-auto">
                  <Button className="w-full">View Details</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ElectricalTools;
