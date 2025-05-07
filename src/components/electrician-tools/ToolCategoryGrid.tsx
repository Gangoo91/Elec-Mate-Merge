
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

// Tool suppliers data structure
const toolSupplierData = {
  "screwfix": {
    name: "Screwfix",
    productCount: 128,
    categories: ["Testing Equipment", "Power Tools", "Hand Tools", "PPE & Workwear", "Site Equipment"]
  },
  "toolstation": {
    name: "Toolstation",
    productCount: 96,
    categories: ["Power Tools", "Hand Tools", "Tool Storage", "Fixings & Fasteners", "Site Equipment"]
  },
  "cef": {
    name: "City Electrical Factors",
    productCount: 75,
    categories: ["Testing Equipment", "Hand Tools", "Cable Management", "Specialist Electrical Tools"]
  },
  "rs-components": {
    name: "RS Components",
    productCount: 110,
    categories: ["Test Equipment", "Hand Tools", "Cable Tools", "Measurement Tools", "Tool Kits"]
  }
};

const ToolCategoryGrid = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.entries(toolSupplierData).map(([supplierKey, supplier]) => (
          <Card key={supplierKey} className="border-elec-yellow/20 bg-elec-gray h-full transition-all hover:border-elec-yellow/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">{supplier.name}</CardTitle>
              <p className="text-sm text-muted-foreground">
                {supplier.productCount} tools available
              </p>
            </CardHeader>
            
            <CardContent>
              <div className="bg-elec-card/70 h-32 rounded-md flex items-center justify-center mb-4">
                <span className="text-elec-yellow/70 text-lg">{supplier.name} Logo</span>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium mb-1">Popular Categories:</h3>
                <div className="flex flex-wrap gap-1">
                  {supplier.categories.map(category => (
                    <Link 
                      key={category}
                      to={`/electrician/tools/${supplierKey}?category=${encodeURIComponent(category)}`}
                      className="bg-elec-card hover:bg-elec-card/70 text-xs rounded-full px-2 py-1 transition-colors"
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="pt-0">
              <Link to={`/electrician/tools/${supplierKey}`} className="w-full">
                <Button className="w-full flex justify-between">
                  Browse Tools
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ToolCategoryGrid;
