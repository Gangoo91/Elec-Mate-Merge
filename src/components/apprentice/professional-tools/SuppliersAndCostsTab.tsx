
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Store, MapPin, Clock, PoundSterling, Package, Truck } from "lucide-react";
import SupplierFinder from "@/components/apprentice/tools-guide/SupplierFinder";

const SuppliersAndCostsTab = () => {
  const supplierTypes = [
    {
      type: "Trade Wholesalers",
      icon: Store,
      pros: ["Best prices for bulk purchases", "Trade accounts available", "Professional advice"],
      cons: ["May require trade credentials", "Minimum order quantities"],
      examples: ["CEF", "Rexel", "Edmundson Electrical"],
      avgSaving: "15-25%"
    },
    {
      type: "Online Retailers",
      icon: Package,
      pros: ["Convenient shopping", "Wide selection", "Customer reviews"],
      cons: ["Can't handle tools before buying", "Shipping delays possible"],
      examples: ["Screwfix", "Toolstation", "Amazon Business"],
      avgSaving: "10-20%"
    },
    {
      type: "Specialist Tool Shops",
      icon: MapPin,
      pros: ["Expert knowledge", "Tool demonstrations", "After-sales support"],
      cons: ["Higher prices", "Limited locations"],
      examples: ["Local electrical suppliers", "Tool specialists"],
      avgSaving: "5-10%"
    }
  ];

  const costBreakdown = [
    { category: "Basic Hand Tools", apprentice: "£200-300", qualified: "£400-600", description: "Screwdrivers, pliers, spanners" },
    { category: "Power Tools", apprentice: "£300-500", qualified: "£600-1200", description: "Drill, SDS, grinder, saw" },
    { category: "Test Equipment", apprentice: "£400-600", qualified: "£800-1500", description: "MFT, voltage tester, clamp meter" },
    { category: "PPE & Safety", apprentice: "£150-250", qualified: "£250-400", description: "Complete safety equipment" },
    { category: "Tool Storage", apprentice: "£100-200", qualified: "£300-500", description: "Van racking, toolboxes" }
  ];

  const financingOptions = [
    { option: "Apprentice Tool Allowance", description: "Many employers provide £200-500 annually", availability: "Check with employer" },
    { option: "Tool Finance Plans", description: "0% finance available on purchases over £500", availability: "Most major retailers" },
    { option: "Trade Account Credit", description: "30-60 day payment terms once established", availability: "Wholesalers" },
    { option: "Personal Loan", description: "For large purchases, compare rates", availability: "Banks/building societies" }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Store className="h-5 w-5 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Supplier Types & Benefits</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {supplierTypes.map((supplier, index) => (
              <div key={index} className="border border-elec-yellow/20 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <supplier.icon className="h-5 w-5 text-elec-yellow" />
                  <h4 className="font-semibold text-white">{supplier.type}</h4>
                </div>
                
                <Badge className="bg-green-500/20 text-green-400 border-green-500/40 mb-3">
                  Save {supplier.avgSaving}
                </Badge>
                
                <div className="space-y-3">
                  <div>
                    <h5 className="text-sm font-medium text-green-400 mb-1">Pros:</h5>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      {supplier.pros.map((pro, idx) => (
                        <li key={idx}>• {pro}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="text-sm font-medium text-orange-400 mb-1">Cons:</h5>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      {supplier.cons.map((con, idx) => (
                        <li key={idx}>• {con}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="text-sm font-medium text-blue-400 mb-1">Examples:</h5>
                    <p className="text-xs text-muted-foreground">
                      {supplier.examples.join(", ")}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-blue-500/20 bg-blue-500/10">
        <CardHeader>
          <div className="flex items-center gap-2">
            <PoundSterling className="h-5 w-5 text-blue-400" />
            <CardTitle className="text-blue-400">Tool Investment Guide</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-blue-500/20">
                  <th className="text-left p-3 text-blue-400">Category</th>
                  <th className="text-left p-3 text-blue-400">Apprentice Budget</th>
                  <th className="text-left p-3 text-blue-400">Qualified Budget</th>
                  <th className="text-left p-3 text-blue-400">Includes</th>
                </tr>
              </thead>
              <tbody>
                {costBreakdown.map((item, index) => (
                  <tr key={index} className="border-b border-gray-700">
                    <td className="p-3 font-medium text-white">{item.category}</td>
                    <td className="p-3 text-green-400">{item.apprentice}</td>
                    <td className="p-3 text-blue-400">{item.qualified}</td>
                    <td className="p-3 text-muted-foreground">{item.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card className="border-green-500/20 bg-green-500/10">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-green-400" />
            <CardTitle className="text-green-400">Financing Options</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {financingOptions.map((option, index) => (
              <div key={index} className="border border-green-500/20 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2">{option.option}</h4>
                <p className="text-sm text-muted-foreground mb-2">{option.description}</p>
                <Badge variant="outline" className="border-green-500/40 text-green-400">
                  {option.availability}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <SupplierFinder />
    </div>
  );
};

export default SuppliersAndCostsTab;
