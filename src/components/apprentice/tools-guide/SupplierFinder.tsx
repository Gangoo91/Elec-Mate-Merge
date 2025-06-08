
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Globe, PoundSterling, Clock, CreditCard, Truck } from "lucide-react";

const SupplierFinder = () => {
  const supplierCategories = [
    {
      type: "Major Electrical Wholesalers",
      description: "Trade prices, technical support, and wide product range",
      suppliers: [
        { 
          name: "CEF (City Electrical Factors)", 
          stores: "500+ branches nationwide", 
          apprenticeDiscount: "Student discount with ID",
          delivery: "Same day in most areas",
          strengths: ["Technical advice", "Specialist products", "Account facilities"],
          website: "cef.co.uk"
        },
        { 
          name: "Rexel (formerly Newey & Eyre)", 
          stores: "200+ branches", 
          apprenticeDiscount: "Educational pricing available",
          delivery: "Next day standard",
          strengths: ["Digital ordering", "Stock availability", "Technical training"],
          website: "rexel.co.uk"
        },
        { 
          name: "Edmundson Electrical", 
          stores: "230+ branches", 
          apprenticeDiscount: "Student rates with proof",
          delivery: "Multi-drop service",
          strengths: ["Local knowledge", "Project support", "Installation materials"],
          website: "edmundson.com"
        },
        { 
          name: "TLC Electrical", 
          stores: "Online + collection points", 
          apprenticeDiscount: "Educational discounts available",
          delivery: "Free over £45",
          strengths: ["Competitive prices", "Online convenience", "Fast dispatch"],
          website: "tlc-direct.co.uk"
        }
      ]
    },
    {
      type: "General Trade & DIY Retailers",
      description: "Competitive prices, convenience, and tools focus",
      suppliers: [
        { 
          name: "Screwfix", 
          stores: "800+ stores nationwide", 
          apprenticeDiscount: "Trade account pricing",
          delivery: "Click & collect in 5 mins",
          strengths: ["Speed", "Tool selection", "Extended hours"],
          website: "screwfix.com"
        },
        { 
          name: "Toolstation", 
          stores: "500+ stores", 
          apprenticeDiscount: "Trade pricing with account",
          delivery: "Free click & collect",
          strengths: ["Quality tools", "Fair prices", "Good locations"],
          website: "toolstation.com"
        },
        { 
          name: "Travis Perkins", 
          stores: "600+ branches", 
          apprenticeDiscount: "Apprentice account rates",
          delivery: "Local delivery service",
          strengths: ["Building materials", "Bulk discounts", "Site delivery"],
          website: "travisperkins.co.uk"
        },
        { 
          name: "Machine Mart", 
          stores: "60+ stores + online", 
          apprenticeDiscount: "Student discount available",
          delivery: "Free over £50",
          strengths: ["Power tools", "Specialist equipment", "Good warranties"],
          website: "machinemart.co.uk"
        }
      ]
    }
  ];

  const onlineSpecialists = [
    {
      name: "ElectricalDirect",
      speciality: "LED lighting & electrical accessories",
      benefit: "Free delivery over £45",
      tip: "Great for domestic installation materials"
    },
    {
      name: "BLT Direct",
      speciality: "Bulk cable and containment",
      benefit: "Competitive cable prices",
      tip: "Good for larger projects and cable runs"
    },
    {
      name: "CPC Farnell",
      speciality: "Electronic components & test equipment",
      benefit: "Next day delivery",
      tip: "Professional test equipment and components"
    },
    {
      name: "RS Components",
      speciality: "Industrial electrical equipment",
      benefit: "Technical datasheets",
      tip: "High-quality control and automation products"
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold text-elec-yellow flex items-center justify-center gap-2">
          <MapPin className="h-6 w-6" />
          UK Supplier Guide - Where to Buy
        </h2>
        <p className="text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Build relationships with local suppliers for better prices and technical advice. 
          Different suppliers excel in different areas - know where to go for what you need.
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
                  <div key={idx} className="bg-elec-dark/30 p-4 rounded-lg border border-elec-yellow/10 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-white">{supplier.name}</h4>
                      <Badge variant="outline" className="border-blue-400 text-blue-300 text-xs">
                        {supplier.website}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <p className="text-muted-foreground flex items-center gap-2">
                        <MapPin className="h-3 w-3" />
                        {supplier.stores}
                      </p>
                      <p className="text-green-300 flex items-center gap-2">
                        <PoundSterling className="h-3 w-3" />
                        {supplier.apprenticeDiscount}
                      </p>
                      <p className="text-blue-300 flex items-center gap-2">
                        <Truck className="h-3 w-3" />
                        {supplier.delivery}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <p className="text-xs font-medium text-elec-yellow">Key Strengths:</p>
                      <div className="flex flex-wrap gap-1">
                        {supplier.strengths.map((strength, strengthIdx) => (
                          <Badge 
                            key={strengthIdx} 
                            variant="outline" 
                            className="text-xs border-green-500/30 text-green-300"
                          >
                            {strength}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Online Specialists */}
      <Card className="border-purple-500/30 bg-elec-gray/50">
        <CardHeader>
          <CardTitle className="text-purple-300 flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Online Specialists Worth Knowing
          </CardTitle>
          <p className="text-sm text-muted-foreground">Specialist suppliers for specific product categories</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {onlineSpecialists.map((specialist, idx) => (
              <div key={idx} className="bg-purple-500/10 p-3 rounded-lg border border-purple-500/20">
                <h4 className="font-medium text-purple-200 mb-1">{specialist.name}</h4>
                <p className="text-sm text-muted-foreground mb-2">{specialist.speciality}</p>
                <div className="space-y-1 text-xs">
                  <p className="text-green-300">{specialist.benefit}</p>
                  <p className="text-elec-yellow">Tip: {specialist.tip}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Money-Saving Strategies */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-green-500/30 bg-elec-gray/50">
          <CardHeader>
            <CardTitle className="text-green-300 flex items-center gap-2">
              <PoundSterling className="h-5 w-5" />
              Money-Saving Strategies
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="space-y-1">
              <h4 className="font-medium text-green-200">Account Benefits</h4>
              <p className="text-muted-foreground">Open trade accounts for better prices and credit terms. Many suppliers offer 30-day payment terms.</p>
            </div>
            <div className="space-y-1">
              <h4 className="font-medium text-green-200">Bulk Buying</h4>
              <p className="text-muted-foreground">Team up with other apprentices for bulk purchases. Buy consumables like cable in longer lengths.</p>
            </div>
            <div className="space-y-1">
              <h4 className="font-medium text-green-200">Timing</h4>
              <p className="text-muted-foreground">January sales and summer clearances offer significant savings. Plan non-urgent purchases.</p>
            </div>
            <div className="space-y-1">
              <h4 className="font-medium text-green-200">Loyalty Schemes</h4>
              <p className="text-muted-foreground">Join manufacturer schemes for exclusive offers and cashback on purchases.</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-500/30 bg-elec-gray/50">
          <CardHeader>
            <CardTitle className="text-blue-300 flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Service Comparison Tips
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="space-y-1">
              <h4 className="font-medium text-blue-200">Delivery Options</h4>
              <p className="text-muted-foreground">Compare delivery costs and speeds. Some suppliers offer free collection, saving delivery charges.</p>
            </div>
            <div className="space-y-1">
              <h4 className="font-medium text-blue-200">Technical Support</h4>
              <p className="text-muted-foreground">Value technical advice - it's worth paying slightly more for expert guidance when needed.</p>
            </div>
            <div className="space-y-1">
              <h4 className="font-medium text-blue-200">Stock Availability</h4>
              <p className="text-muted-foreground">Check stock levels before ordering. Some suppliers show real-time availability online.</p>
            </div>
            <div className="space-y-1">
              <h4 className="font-medium text-blue-200">Returns Policy</h4>
              <p className="text-muted-foreground">Understand return policies for unused items. Some allow returns, others charge restocking fees.</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
        <h3 className="text-lg font-medium text-elec-yellow mb-2">Building Supplier Relationships</h3>
        <div className="space-y-2 text-sm text-muted-foreground leading-relaxed">
          <p>
            <strong>Be Professional:</strong> Always be polite and respectful. Suppliers remember customers who are pleasant to deal with 
            and may offer better service or pricing.
          </p>
          <p>
            <strong>Ask Questions:</strong> Don't be afraid to ask for advice or alternatives. Experienced counter staff have valuable 
            knowledge and often suggest better or cheaper solutions.
          </p>
          <p>
            <strong>Pay Promptly:</strong> If you have an account, pay on time. This builds trust and may lead to better credit terms 
            or pricing in the future.
          </p>
          <p>
            <strong>Know Your Local Branch:</strong> Get to know your local supplier staff. They can help with urgent orders, 
            hold items, and provide personalised service.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SupplierFinder;
