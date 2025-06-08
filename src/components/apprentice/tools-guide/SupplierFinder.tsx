
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, ExternalLink, Tag, Star } from "lucide-react";
import { supplierData } from "@/data/electrician/supplierData";
import { useIsMobile } from "@/hooks/use-mobile";

const SupplierFinder = () => {
  const isMobile = useIsMobile();
  
  const suppliers = [
    {
      ...supplierData.screwfix,
      website: "https://www.screwfix.com",
      rating: 4.2,
      deliveryTime: "Next Day",
      locations: "500+ stores nationwide"
    },
    {
      ...supplierData["city-electrical-factors"],
      website: "https://www.cef.co.uk",
      rating: 4.0,
      deliveryTime: "Same Day",
      locations: "400+ branches"
    },
    {
      ...supplierData.electricaldirect,
      website: "https://www.electricaldirect.co.uk",
      rating: 4.3,
      deliveryTime: "2-3 Days",
      locations: "Online + Collection Points"
    },
    {
      ...supplierData.toolstation,
      website: "https://www.toolstation.com",
      rating: 4.1,
      deliveryTime: "Click & Collect",
      locations: "450+ stores nationwide"
    }
  ];

  return (
    <div className="p-4 sm:p-6">
      <div className="text-center mb-6">
        <h2 className="text-xl sm:text-2xl font-semibold text-elec-yellow mb-2 flex items-center justify-center gap-2">
          <MapPin className="h-6 w-6" />
          UK Supplier Directory
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground">
          Compare prices and find the best deals from trusted electrical suppliers across the UK
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {suppliers.map((supplier, index) => (
          <Card key={index} className="border-elec-yellow/20 bg-elec-dark/50 hover:border-elec-yellow/40 transition-all duration-300 group">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg text-elec-yellow group-hover:text-elec-yellow/90 transition-colors">
                    {supplier.name}
                  </CardTitle>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{supplier.rating}</span>
                    </div>
                    <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow text-xs">
                      {supplier.deliveryTime}
                    </Badge>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  asChild
                  className="text-elec-yellow hover:text-elec-yellow/80 hover:bg-elec-yellow/10"
                >
                  <a href={supplier.website} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {supplier.description}
              </p>
              
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <MapPin className="h-3.5 w-3.5" />
                {supplier.locations}
              </div>
              
              {/* Deal of the Day */}
              <div className="bg-elec-gray/50 border border-elec-yellow/20 rounded-lg p-3 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-sm text-elec-yellow flex items-center gap-1.5">
                    <Tag className="h-4 w-4" />
                    Deal of the Day
                  </h4>
                  <Badge variant="destructive" className="text-xs">
                    {supplier.dealOfTheDay.discount} OFF
                  </Badge>
                </div>
                
                <div>
                  <h5 className="font-medium text-sm">{supplier.dealOfTheDay.name}</h5>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-bold text-green-400">{supplier.dealOfTheDay.price}</span>
                    <span className="text-xs text-muted-foreground line-through">
                      {supplier.dealOfTheDay.regularPrice}
                    </span>
                  </div>
                </div>
                
                <ul className="space-y-1">
                  {supplier.dealOfTheDay.features.slice(0, 2).map((feature, idx) => (
                    <li key={idx} className="text-xs text-muted-foreground flex items-center gap-1.5">
                      <div className="w-1 h-1 bg-elec-yellow rounded-full flex-shrink-0"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Button 
                  size="sm" 
                  className="w-full bg-elec-yellow/20 border border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow hover:text-black transition-all duration-300"
                  asChild
                >
                  <a href={supplier.website} target="_blank" rel="noopener noreferrer">
                    Visit {supplier.name}
                    <ExternalLink className="h-3.5 w-3.5 ml-1.5" />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-gradient-to-r from-elec-yellow/5 to-green-500/5 border border-elec-yellow/20 rounded-lg">
        <p className="text-center text-sm text-muted-foreground">
          <strong className="text-elec-yellow">Pro Tip:</strong> Compare prices across suppliers and check for bulk discounts. 
          Many suppliers offer trade accounts with additional savings for apprentices and qualified electricians.
        </p>
      </div>
    </div>
  );
};

export default SupplierFinder;
