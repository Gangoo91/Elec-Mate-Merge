
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Search, ExternalLink, Phone } from "lucide-react";

const LocalResourceFinder = () => {
  const [postcode, setPostcode] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Sample local resources for demonstration
  const sampleResources = [
    {
      name: "NHS Greater Manchester Mental Health Trust",
      type: "NHS Service",
      address: "Bury New Road, Prestwich, Manchester M25 3BL",
      phone: "0161 358 1996",
      services: ["Crisis Support", "Community Mental Health", "Emergency Assessment"],
      distance: "2.3 miles"
    },
    {
      name: "Manchester Mind",
      type: "Charity",
      address: "Zion Community Resource Centre, 339 Stretford Road, Manchester M15 4ZY",
      phone: "0161 769 5732",
      services: ["Counselling", "Support Groups", "Wellbeing Services"],
      distance: "3.1 miles"
    },
    {
      name: "Pennine Care NHS Foundation Trust",
      type: "NHS Service", 
      address: "225 Old Street, Ashton-under-Lyne OL6 7SR",
      phone: "0161 716 3000",
      services: ["24/7 Crisis Line", "Community Teams", "Urgent Care"],
      distance: "4.7 miles"
    }
  ];

  const handleSearch = () => {
    if (!postcode.trim()) return;
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setSearchResults(sampleResources);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <Card className="border-green-500/50 bg-green-500/10">
      <CardHeader>
        <CardTitle className="text-green-300 flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Find Local Mental Health Support
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            value={postcode}
            onChange={(e) => setPostcode(e.target.value)}
            placeholder="Enter your postcode (e.g. M1 1AA)"
            className="flex-1"
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <Button 
            onClick={handleSearch}
            disabled={isLoading || !postcode.trim()}
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            ) : (
              <Search className="h-4 w-4" />
            )}
          </Button>
        </div>

        {searchResults.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-medium text-green-300">
              Mental Health Services near {postcode.toUpperCase()}
            </h4>
            {searchResults.map((resource, index) => (
              <div key={index} className="p-4 bg-green-500/5 rounded-lg border border-green-500/20">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h5 className="font-medium text-white">{resource.name}</h5>
                      <Badge className="bg-green-500/20 text-green-400 text-xs">
                        {resource.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{resource.address}</p>
                    
                    <div className="flex items-center gap-4 text-sm mb-2">
                      <div className="flex items-center gap-1 text-green-400">
                        <Phone className="h-3 w-3" />
                        <span>{resource.phone}</span>
                      </div>
                      <div className="text-muted-foreground">
                        📍 {resource.distance}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {resource.services.map((service: string, serviceIndex: number) => (
                        <Badge key={serviceIndex} variant="outline" className="text-xs">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-2 ml-4">
                    <Button size="sm" variant="outline" asChild>
                      <a href={`tel:${resource.phone.replace(/\s/g, '')}`}>
                        <Phone className="h-3 w-3" />
                      </a>
                    </Button>
                    <Button size="sm" variant="outline">
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {searchResults.length === 0 && !isLoading && (
          <div className="text-center py-6">
            <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">
              Enter your postcode to find mental health services near you
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="p-3 bg-green-500/5 rounded-lg border border-green-500/20">
                <div className="font-medium text-green-400 mb-1">NHS Services</div>
                <div className="text-muted-foreground">Local mental health trusts</div>
              </div>
              <div className="p-3 bg-green-500/5 rounded-lg border border-green-500/20">
                <div className="font-medium text-green-400 mb-1">Charities</div>
                <div className="text-muted-foreground">Mind, Samaritans branches</div>
              </div>
              <div className="p-3 bg-green-500/5 rounded-lg border border-green-500/20">
                <div className="font-medium text-green-400 mb-1">Crisis Teams</div>
                <div className="text-muted-foreground">24/7 emergency support</div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LocalResourceFinder;
