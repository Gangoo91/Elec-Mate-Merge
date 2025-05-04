
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Package, ArrowLeft, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const ElectricalMaterials = () => {
  const materials = [
    {
      id: 1,
      name: "6242Y Twin & Earth Cable 2.5mm² - 100m",
      category: "Cables",
      price: "£85.99",
      supplier: "ElectricalDirect",
      image: "placeholder.svg"
    },
    {
      id: 2,
      name: "Consumer Unit 10-Way 100A Dual RCD",
      category: "Distribution",
      price: "£109.50",
      supplier: "City Electrical Factors",
      image: "placeholder.svg"
    },
    {
      id: 3,
      name: "Double Socket Outlet 13A - White",
      category: "Accessories",
      price: "£6.75",
      supplier: "Screwfix",
      image: "placeholder.svg"
    },
    {
      id: 4,
      name: "LED GU10 Bulbs 5W - Pack of 10",
      category: "Lighting",
      price: "£29.99",
      supplier: "Toolstation",
      image: "placeholder.svg"
    },
    {
      id: 5,
      name: "32A Type B MCB Circuit Breaker",
      category: "Protection",
      price: "£7.50",
      supplier: "ElectricalDirect",
      image: "placeholder.svg"
    },
    {
      id: 6,
      name: "RCD 30mA 40A Double Pole",
      category: "Protection",
      price: "£34.25",
      supplier: "City Electrical Factors",
      image: "placeholder.svg"
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Package className="h-8 w-8 text-elec-yellow" />
            Electrical Materials
          </h1>
          <p className="text-muted-foreground">
            Browse and source electrical materials
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
            <Input placeholder="Search materials..." className="pl-8" />
          </div>
        </div>
        <Button variant="default">Search</Button>
      </div>

      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {materials.map(item => (
            <Card key={item.id} className="border-elec-yellow/20 bg-elec-gray flex flex-col h-full">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center mb-2">
                  <span className="bg-elec-yellow/20 text-elec-yellow text-xs px-2 py-1 rounded">
                    {item.category}
                  </span>
                  <span className="font-bold text-elec-yellow">{item.price}</span>
                </div>
                <CardTitle className="text-lg">{item.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col flex-1 justify-between">
                <div className="text-sm text-muted-foreground mb-4">Supplier: {item.supplier}</div>
                <div className="mt-auto">
                  <Button className="w-full">Add to Order</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ElectricalMaterials;
