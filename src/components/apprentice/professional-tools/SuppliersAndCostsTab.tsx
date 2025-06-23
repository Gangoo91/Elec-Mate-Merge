
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Store, MapPin, CreditCard, Percent, Truck, Info } from "lucide-react";
import SupplierFinder from "@/components/apprentice/tools-guide/SupplierFinder";

const SuppliersAndCostsTab = () => {
  const supplierCategories = [
    {
      type: "National Trade Suppliers",
      description: "Large suppliers with nationwide coverage and trade accounts",
      suppliers: [
        { name: "CEF (City Electrical Factors)", discount: "Trade + 5-15%", delivery: "Next day", notes: "Excellent for electrical components" },
        { name: "Screwfix", discount: "Trade account 10%", delivery: "1-hour click & collect", notes: "Wide tool range, convenient locations" },
        { name: "RS Components", discount: "Volume discounts", delivery: "Same/next day", notes: "Professional test equipment specialist" },
        { name: "Toolstation", discount: "No trade account", delivery: "Same day collection", notes: "Good value tools and accessories" }
      ]
    },
    {
      type: "Specialist Tool Retailers",
      description: "Focused on tools with expert advice and professional grades",
      suppliers: [
        { name: "Machine Mart", discount: "10% trade discount", delivery: "Standard", notes: "Quality power tools and equipment" },
        { name: "ITS (Tool Shop)", discount: "Negotiable", delivery: "Variable", notes: "Professional tool specialists" },
        { name: "Axminster Tools", discount: "Loyalty scheme", delivery: "£3.95 standard", notes: "Premium hand tools and precision items" },
        { name: "FFX Tools", discount: "Price matching", delivery: "Free over £45", notes: "Competitive online prices" }
      ]
    },
    {
      type: "Online Specialists",
      description: "Internet-based suppliers with competitive pricing",
      suppliers: [
        { name: "Amazon Business", discount: "Business pricing", delivery: "Prime delivery", notes: "Vast selection, but check authenticity" },
        { name: "eBay Business", discount: "Bulk discounts", delivery: "Variable", notes: "Good for specific items and deals" },
        { name: "Rapid Electronics", discount: "Volume pricing", delivery: "Next day", notes: "Electronic components and test gear" },
        { name: "TLC Direct", discount: "Trade pricing", delivery: "Free over £40", notes: "Electrical wholesaler with tools" }
      ]
    }
  ];

  const regionalSuppliers = [
    {
      region: "London & South East",
      suppliers: ["Edmundson Electrical", "Rexel", "Newey & Eyre", "Local wholesalers"]
    },
    {
      region: "Manchester & North West",
      suppliers: ["CEF Branches", "Denmans Electrical", "Yesss Electrical", "Trade counters"]
    },
    {
      region: "Birmingham & Midlands",
      suppliers: ["Kellaway Building Supplies", "Electric Center", "Local electrical factors"]
    },
    {
      region: "Scotland",
      suppliers: ["PDM Group", "BEMCO", "Local factors", "Wholesaler networks"]
    }
  ];

  const costSavingTips = [
    {
      strategy: "Trade Account Setup",
      savings: "10-20%",
      effort: "Low",
      details: "Most suppliers offer trade accounts with immediate discounts. Bring apprenticeship documentation."
    },
    {
      strategy: "Bulk Purchasing Groups",
      savings: "15-25%",
      effort: "Medium",
      details: "Join with college mates or local apprentices to buy in bulk. Great for consumables."
    },
    {
      strategy: "End of Line Sales",
      savings: "30-50%",
      effort: "High",
      details: "Watch for discontinued models and seasonal clearances. Requires patience and flexibility."
    },
    {
      strategy: "Apprentice Schemes",
      savings: "20-30%",
      effort: "Low",
      details: "Many brands offer apprentice-specific discounts. Check DeWalt, Makita, and Fluke programs."
    },
    {
      strategy: "Price Matching",
      savings: "5-15%",
      effort: "Low",
      details: "Most retailers will match competitor prices. Always worth asking before purchasing."
    }
  ];

  const financingOptions = [
    {
      option: "0% Interest Credit",
      duration: "6-12 months",
      requirement: "Good credit score",
      bestFor: "Expensive test equipment",
      providers: ["Snap-on", "Machine Mart", "Some tool retailers"]
    },
    {
      option: "Personal Loan",
      duration: "12-36 months",
      requirement: "Regular income",
      bestFor: "Complete toolkit setup",
      providers: ["High street banks", "Credit unions", "Online lenders"]
    },
    {
      option: "Employer Schemes",
      duration: "Varies",
      requirement: "Employment contract",
      bestFor: "Major tool purchases",
      providers: ["Some electrical contractors", "Large companies"]
    },
    {
      option: "Rent-to-Own",
      duration: "24-48 months",
      requirement: "Minimal checks",
      bestFor: "Expensive power tools",
      providers: ["Specialist tool finance companies"]
    }
  ];

  return (
    <div className="space-y-6">
      <Alert className="border-blue-500/50 bg-blue-500/10">
        <Info className="h-4 w-4 text-blue-400" />
        <AlertDescription className="text-blue-200">
          Strategic supplier relationships and cost management can save you hundreds of pounds on your toolkit investment. This comprehensive guide covers all UK options.
        </AlertDescription>
      </Alert>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Store className="h-5 w-5 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">UK Tool Supplier Categories</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {supplierCategories.map((category, index) => (
              <div key={index}>
                <h4 className="font-medium text-white mb-2">{category.type}</h4>
                <p className="text-sm text-muted-foreground mb-3">{category.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {category.suppliers.map((supplier, idx) => (
                    <div key={idx} className="border border-elec-yellow/30 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-medium text-white">{supplier.name}</h5>
                        <Badge variant="outline" className="border-green-500/40 text-green-400">
                          {supplier.discount}
                        </Badge>
                      </div>
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center gap-2">
                          <Truck className="h-3 w-3 text-blue-400" />
                          <span className="text-muted-foreground">{supplier.delivery}</span>
                        </div>
                        <p className="text-muted-foreground">{supplier.notes}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Regional Suppliers */}
      <Card className="border-green-500/20 bg-green-500/10">
        <CardHeader>
          <CardTitle className="text-green-300 flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Regional Supplier Networks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {regionalSuppliers.map((region, index) => (
              <div key={index} className="border border-green-500/30 rounded-lg p-3">
                <h4 className="font-medium text-white mb-2">{region.region}</h4>
                <ul className="space-y-1">
                  {region.suppliers.map((supplier, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                      <Store className="h-3 w-3 text-green-400" />
                      {supplier}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Cost Saving Strategies */}
      <Card className="border-blue-500/20 bg-blue-500/10">
        <CardHeader>
          <CardTitle className="text-blue-300 flex items-center gap-2">
            <Percent className="h-5 w-5" />
            Cost Saving Strategies
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {costSavingTips.map((tip, index) => (
              <div key={index} className="border border-blue-500/30 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-white">{tip.strategy}</h4>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="border-green-500/40 text-green-400">
                      Save {tip.savings}
                    </Badge>
                    <Badge variant="outline" className="border-blue-500/40 text-blue-400">
                      {tip.effort} effort
                    </Badge>
                  </div>
                </div>
                <p className="text-sm text-blue-200">{tip.details}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Financing Options */}
      <Card className="border-orange-500/20 bg-orange-500/10">
        <CardHeader>
          <CardTitle className="text-orange-300 flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Financing & Payment Options
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {financingOptions.map((option, index) => (
              <div key={index} className="border border-orange-500/30 rounded-lg p-4">
                <h4 className="font-medium text-white mb-2">{option.option}</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Duration:</span>
                    <span className="text-white">{option.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Requirement:</span>
                    <span className="text-white">{option.requirement}</span>
                  </div>
                  <div className="bg-orange-500/20 rounded p-2 mt-2">
                    <p className="text-xs text-orange-200"><strong>Best for:</strong> {option.bestFor}</p>
                    <p className="text-xs text-orange-200"><strong>Providers:</strong> {option.providers.join(", ")}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <SupplierFinder />

      <Alert className="border-orange-500/50 bg-orange-500/10">
        <AlertTriangle className="h-4 w-4 text-orange-400" />
        <AlertDescription className="text-orange-200">
          <strong>Financial Planning:</strong> Always compare total cost of ownership including warranty, spares availability, and financing charges. The cheapest upfront option isn't always the best value.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default SuppliersAndCostsTab;
