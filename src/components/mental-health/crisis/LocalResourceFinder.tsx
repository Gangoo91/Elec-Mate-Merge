
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Search, Phone, Navigation } from "lucide-react";

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
      services: ["Crisis Support", "Community Mental Health"],
      distance: "2.3 miles"
    },
    {
      name: "Manchester Mind",
      type: "Charity",
      address: "Zion Community Resource Centre, Manchester M15 4ZY",
      phone: "0161 769 5732",
      services: ["Counselling", "Support Groups"],
      distance: "3.1 miles"
    },
    {
      name: "Pennine Care NHS Foundation Trust",
      type: "NHS Service",
      address: "225 Old Street, Ashton-under-Lyne OL6 7SR",
      phone: "0161 716 3000",
      services: ["24/7 Crisis Line", "Community Teams"],
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
    }, 1000);
  };

  return (
    <div className="space-y-4 pt-3">
      {/* Search Bar */}
      <div className="flex gap-2">
        <Input
          value={postcode}
          onChange={(e) => setPostcode(e.target.value)}
          placeholder="Enter postcode (e.g. M1 1AA)"
          className="flex-1 h-11"
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <Button
          onClick={handleSearch}
          disabled={isLoading || !postcode.trim()}
          className="h-11 px-4 bg-green-500 hover:bg-green-600"
        >
          {isLoading ? (
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
          ) : (
            <Search className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Results */}
      {searchResults.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs text-green-400 font-medium">
            Services near {postcode.toUpperCase()}
          </p>
          {searchResults.map((resource, index) => (
            <div
              key={index}
              className="p-3 rounded-lg border border-green-500/20 bg-green-500/5"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-foreground text-sm truncate">{resource.name}</h4>
                  <Badge className="bg-green-500/20 text-green-400 text-[10px] mt-0.5">
                    {resource.type}
                  </Badge>
                </div>
                <div className="text-xs text-muted-foreground whitespace-nowrap">
                  {resource.distance}
                </div>
              </div>

              <p className="text-xs text-muted-foreground mb-2 line-clamp-1">{resource.address}</p>

              <div className="flex flex-wrap gap-1 mb-3">
                {resource.services.map((service: string, serviceIndex: number) => (
                  <Badge key={serviceIndex} variant="outline" className="text-[10px] py-0">
                    {service}
                  </Badge>
                ))}
              </div>

              <div className="flex gap-2">
                <Button size="sm" className="flex-1 h-9 bg-green-500 hover:bg-green-600" asChild>
                  <a href={`tel:${resource.phone.replace(/\s/g, '')}`}>
                    <Phone className="h-3 w-3 mr-1" />
                    {resource.phone}
                  </a>
                </Button>
                <Button size="sm" variant="outline" className="h-9" asChild>
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(resource.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Navigation className="h-3 w-3" />
                  </a>
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {searchResults.length === 0 && !isLoading && (
        <div className="text-center py-4">
          <MapPin className="h-10 w-10 text-green-400/50 mx-auto mb-3" />
          <p className="text-sm text-muted-foreground mb-3">
            Enter your postcode to find local services
          </p>
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="p-2 rounded bg-green-500/5 border border-green-500/20">
              <div className="text-green-400 font-medium">NHS</div>
              <div className="text-muted-foreground text-[10px]">Mental health trusts</div>
            </div>
            <div className="p-2 rounded bg-green-500/5 border border-green-500/20">
              <div className="text-green-400 font-medium">Charities</div>
              <div className="text-muted-foreground text-[10px]">Mind, Samaritans</div>
            </div>
            <div className="p-2 rounded bg-green-500/5 border border-green-500/20">
              <div className="text-green-400 font-medium">Crisis</div>
              <div className="text-muted-foreground text-[10px]">24/7 support</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocalResourceFinder;
