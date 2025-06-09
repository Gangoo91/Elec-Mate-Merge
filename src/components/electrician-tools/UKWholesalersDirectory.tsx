
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Star, ExternalLink, Phone, Truck } from "lucide-react";

const UKWholesalersDirectory = () => {
  const suppliers = [
    {
      name: "Screwfix",
      type: "Trade Counter & Online",
      location: "Nationwide - 700+ Stores",
      rating: 4.3,
      reviews: 12500,
      specialties: ["Power Tools", "Hand Tools", "Testing Equipment", "PPE"],
      delivery: "Next Day",
      benefits: ["Trade Discount", "Click & Collect", "5min Collection"],
      phone: "0333 011 2112",
      website: "screwfix.com",
      logo: "🔧"
    },
    {
      name: "City Electrical Factors",
      type: "Electrical Wholesaler",
      location: "400+ Branches UK",
      rating: 4.6,
      reviews: 3400,
      specialties: ["Testing Equipment", "Cable", "Consumer Units", "Professional Tools"],
      delivery: "Same Day*",
      benefits: ["Trade Prices", "Technical Support", "Expert Advice"],
      phone: "020 7254 2151",
      website: "cef.co.uk",
      logo: "⚡"
    },
    {
      name: "Toolstation",
      type: "Trade Supplies",
      location: "500+ Stores",
      rating: 4.4,
      reviews: 8900,
      specialties: ["Quality Tools", "Fixings", "Power Tools", "Hand Tools"],
      delivery: "Free Over £45",
      benefits: ["Trade Account", "Price Match", "Bulk Discounts"],
      phone: "0808 100 7211",
      website: "toolstation.com",
      logo: "🛠️"
    },
    {
      name: "RS Components",
      type: "Industrial Supplier",
      location: "Online + Branches",
      rating: 4.7,
      reviews: 5600,
      specialties: ["Test Equipment", "Industrial Tools", "Electronics", "Automation"],
      delivery: "Next Day",
      benefits: ["Technical Data", "CAD Models", "Expert Support"],
      phone: "01536 201 234",
      website: "uk.rs-online.com",
      logo: "🔬"
    },
    {
      name: "Amazon Business",
      type: "B2B Platform",
      location: "Online Delivery",
      rating: 4.2,
      reviews: 25000,
      specialties: ["Wide Selection", "Bulk Orders", "Prime Delivery", "Business Tools"],
      delivery: "Prime Next Day",
      benefits: ["Business Pricing", "Tax Invoices", "Procurement Tools"],
      phone: "0800 279 7234",
      website: "amazon.co.uk/business",
      logo: "📦"
    },
    {
      name: "Electrical Direct",
      type: "Online Electrical",
      location: "Online + Warehouse",
      rating: 4.5,
      reviews: 2100,
      specialties: ["Electrical Components", "LED Lighting", "Cable", "Switches"],
      delivery: "Free Over £45",
      benefits: ["Competitive Prices", "Technical Support", "Fast Dispatch"],
      phone: "01423 800 800",
      website: "electricaldirect.co.uk",
      logo: "💡"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-white">UK Electrical Suppliers Directory</h2>
          <p className="text-muted-foreground">Trusted suppliers with trade accounts and competitive pricing</p>
        </div>
        <Button variant="outline" size="sm" className="border-elec-yellow/30">
          Compare All
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {suppliers.map((supplier, index) => (
          <Card key={index} className="border-elec-yellow/20 bg-elec-gray hover:border-elec-yellow/50 transition-all">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{supplier.logo}</div>
                  <div>
                    <CardTitle className="text-lg text-white">{supplier.name}</CardTitle>
                    <p className="text-sm text-elec-yellow">{supplier.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 bg-elec-dark/50 px-2 py-1 rounded">
                  <Star className="h-3 w-3 text-amber-400 fill-current" />
                  <span className="text-xs font-medium">{supplier.rating}</span>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                {supplier.location}
              </div>
              
              <div className="flex items-center gap-2 text-sm">
                <Truck className="h-4 w-4 text-green-400" />
                <span className="text-green-400">{supplier.delivery}</span>
              </div>
              
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-white">Specialties:</h4>
                <div className="flex flex-wrap gap-1">
                  {supplier.specialties.slice(0, 3).map((specialty, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs border-elec-yellow/30">
                      {specialty}
                    </Badge>
                  ))}
                  {supplier.specialties.length > 3 && (
                    <Badge variant="outline" className="text-xs border-elec-yellow/30">
                      +{supplier.specialties.length - 3}
                    </Badge>
                  )}
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-white">Benefits:</h4>
                <div className="space-y-1">
                  {supplier.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <div className="w-1 h-1 bg-green-400 rounded-full" />
                      {benefit}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-2 pt-2">
                <Button className="flex-1 bg-elec-yellow text-black hover:bg-elec-yellow/90" size="sm">
                  Visit Store
                </Button>
                <Button variant="outline" size="sm" className="border-elec-yellow/30">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" className="border-elec-yellow/30">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default UKWholesalersDirectory;
