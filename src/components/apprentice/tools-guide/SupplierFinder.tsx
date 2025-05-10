
import { useState } from "react";
import { Search, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SupplierFinder = () => {
  const [postcode, setPostcode] = useState("");
  const [searchSubmitted, setSearchSubmitted] = useState(false);
  
  // For demo purposes, showing some hardcoded suppliers
  const demoSuppliers = [
    { 
      name: "Screwfix", 
      distance: "1.2 miles", 
      address: "Unit 2, Industrial Estate, Birmingham" 
    },
    { 
      name: "Toolstation", 
      distance: "1.8 miles", 
      address: "123 Main Street, Birmingham" 
    },
    { 
      name: "City Electrical Factors", 
      distance: "2.4 miles", 
      address: "456 Commerce Road, Birmingham" 
    }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (postcode.trim()) {
      setSearchSubmitted(true);
    }
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center gap-2">
          <MapPin className="h-5 w-5 text-elec-yellow" />
          Find Tool Suppliers Near You
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Enter your postcode..."
              value={postcode}
              onChange={(e) => setPostcode(e.target.value)}
              className="pl-8"
            />
          </div>
          <Button type="submit">Find Suppliers</Button>
        </form>
        
        {searchSubmitted && (
          <div className="mt-4 space-y-3">
            <p className="text-sm font-medium">Tool suppliers near {postcode}:</p>
            {demoSuppliers.map((supplier, index) => (
              <div key={index} className="p-3 border border-elec-yellow/20 rounded-md bg-elec-dark">
                <div className="flex justify-between">
                  <h4 className="font-semibold">{supplier.name}</h4>
                  <span className="text-sm text-elec-yellow">{supplier.distance}</span>
                </div>
                <p className="text-sm text-muted-foreground">{supplier.address}</p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SupplierFinder;
