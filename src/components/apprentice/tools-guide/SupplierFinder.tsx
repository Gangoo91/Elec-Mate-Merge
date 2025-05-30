
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, Globe, PoundSterling } from "lucide-react";

const SupplierFinder = () => {
  const supplierCategories = [
    {
      type: "Electrical Wholesalers",
      description: "Trade prices and technical support",
      suppliers: [
        { name: "CEF (City Electrical Factors)", stores: "500+ branches nationwide", apprenticeDiscount: "Yes - with student ID" },
        { name: "Rexel", stores: "200+ branches", apprenticeDiscount: "Available on request" },
        { name: "Edmundson Electrical", stores: "230+ branches", apprenticeDiscount: "Student rates available" },
        { name: "TLC Electrical", stores: "Online + collection points", apprenticeDiscount: "Educational discounts" }
      ]
    },
    {
      type: "DIY & Tool Retailers",
      description: "Competitive prices and convenience",
      suppliers: [
        { name: "Screwfix", stores: "800+ stores nationwide", apprenticeDiscount: "Trade account available" },
        { name: "Toolstation", stores: "500+ stores", apprenticeDiscount: "Trade prices with account" },
        { name: "Machine Mart", stores: "60+ stores", apprenticeDiscount: "Student discount available" },
        { name: "Travis Perkins", stores: "600+ branches", apprenticeDiscount: "Apprentice rates" }
      ]
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold text-elec-yellow flex items-center justify-center gap-2">
          <MapPin className="h-6 w-6" />
          Where to Buy - UK Supplier Guide
        </h2>
        <p className="text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Best places to purchase electrical tools and materials in the UK. Build relationships with your local suppliers 
          for better prices and technical advice.
        </p>
      </div>

      <div className="space-y-6">
        {supplierCategories.map((category, index) => (
          <Card key={index} className="border-elec-yellow/20 bg-elec-gray/50">
            <CardHeader className="pb-4">
              <CardTitle className="text-elec-yellow">{category.type}</CardTitle>
              <p className="text-sm text-muted-foreground">{category.description}</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {category.suppliers.map((supplier, idx) => (
                  <div key={idx} className="bg-elec-dark/30 p-4 rounded-lg border border-elec-yellow/10">
                    <h4 className="font-medium text-white mb-2">{supplier.name}</h4>
                    <div className="space-y-1 text-sm">
                      <p className="text-muted-foreground flex items-center gap-2">
                        <MapPin className="h-3 w-3" />
                        {supplier.stores}
                      </p>
                      <p className="text-green-300 flex items-center gap-2">
                        <PoundSterling className="h-3 w-3" />
                        {supplier.apprenticeDiscount}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
        <h3 className="text-lg font-medium text-blue-300 mb-2">Money-Saving Tips</h3>
        <ul className="text-sm text-muted-foreground space-y-1 leading-relaxed">
          <li>• Always ask about apprentice discounts - many suppliers offer them but don't advertise widely</li>
          <li>• Join manufacturer loyalty schemes for additional discounts and exclusive offers</li>
          <li>• Consider buying in small groups with other apprentices to get bulk discounts</li>
          <li>• Look out for seasonal sales, especially January and summer clearances</li>
        </ul>
      </div>
    </div>
  );
};

export default SupplierFinder;
