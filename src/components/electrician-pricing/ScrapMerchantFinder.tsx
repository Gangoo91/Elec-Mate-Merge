
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, MapPin, Phone, ExternalLink } from "lucide-react";

interface ScrapMerchant {
  id: number;
  name: string;
  address: string;
  distance: string;
  phone: string;
  rating: number;
  openNow: boolean;
  paymentMethods: string[];
  acceptedMaterials: string[];
}

const mockScrapMerchants: ScrapMerchant[] = [
  {
    id: 1,
    name: "City Metal Recycling",
    address: "123 Industrial Ave, Manchester, M1 1AA",
    distance: "2.3 miles",
    phone: "0161 123 4567",
    rating: 4.7,
    openNow: true,
    paymentMethods: ["Cash", "Bank Transfer"],
    acceptedMaterials: ["Copper", "Brass", "Aluminum", "Steel", "Lead"]
  },
  {
    id: 2,
    name: "Northern Scrap Solutions",
    address: "45 Recycling Way, Manchester, M4 5RT",
    distance: "3.8 miles",
    phone: "0161 987 6543",
    rating: 4.2,
    openNow: true,
    paymentMethods: ["Cash", "Bank Transfer", "Cheque"],
    acceptedMaterials: ["Copper", "Aluminium", "Iron", "Steel", "Electrical Equipment"]
  },
  {
    id: 3,
    name: "Eco Metals",
    address: "78 Green Street, Salford, M6 8QP",
    distance: "5.1 miles",
    phone: "0161 555 1234",
    rating: 4.5,
    openNow: false,
    paymentMethods: ["Cash", "Bank Transfer"],
    acceptedMaterials: ["Copper", "Brass", "Lead", "All Electrical Waste"]
  }
];

const ScrapMerchantFinder = () => {
  const [postcode, setPostcode] = useState("");
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [merchants, setMerchants] = useState<ScrapMerchant[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = () => {
    if (!postcode.trim()) return;
    
    setIsLoading(true);
    
    // Simulate API call with a delay
    setTimeout(() => {
      setMerchants(mockScrapMerchants);
      setSearchPerformed(true);
      setIsLoading(false);
    }, 1000);
  };

  const renderStarRating = (rating: number) => {
    return (
      <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, index) => {
          const starValue = index + 1;
          return (
            <svg 
              key={index} 
              className={`h-4 w-4 ${starValue <= rating ? "text-yellow-400" : "text-gray-300"}`}
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          );
        })}
        <span className="ml-1 text-sm">{rating.toFixed(1)}</span>
      </div>
    );
  };
  
  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-elec-yellow" />
          Find Local Scrap Merchants
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Input 
              placeholder="Enter your postcode" 
              value={postcode}
              onChange={(e) => setPostcode(e.target.value)}
              className="max-w-xs"
            />
            <Button 
              onClick={handleSearch} 
              disabled={isLoading}
              className="flex items-center gap-1"
            >
              {isLoading ? (
                <>
                  <div className="h-4 w-4 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                  <span>Searching...</span>
                </>
              ) : (
                <>
                  <Search className="h-4 w-4" />
                  <span>Search</span>
                </>
              )}
            </Button>
          </div>
          
          {searchPerformed && merchants.length === 0 && !isLoading && (
            <div className="text-center py-6">
              <p className="text-muted-foreground">No merchants found near this location.</p>
            </div>
          )}
          
          {merchants.length > 0 && (
            <div className="space-y-4">
              {merchants.map((merchant) => (
                <div 
                  key={merchant.id} 
                  className="border border-elec-yellow/20 rounded-lg p-4 bg-black/10"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-lg">{merchant.name}</h3>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3 w-3" /> {merchant.address} ({merchant.distance})
                      </p>
                    </div>
                    <span className={`px-2 py-0.5 text-xs rounded-full ${
                      merchant.openNow ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                    }`}>
                      {merchant.openNow ? "Open Now" : "Closed"}
                    </span>
                  </div>
                  
                  <div className="mt-2">
                    {renderStarRating(merchant.rating)}
                  </div>
                  
                  <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div>
                      <p className="text-xs text-muted-foreground">Accepts</p>
                      <p className="text-sm">{merchant.acceptedMaterials.join(", ")}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Payment</p>
                      <p className="text-sm">{merchant.paymentMethods.join(", ")}</p>
                    </div>
                  </div>
                  
                  <div className="mt-3 flex gap-2">
                    <Button size="sm" variant="outline" className="flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      <span>{merchant.phone}</span>
                    </Button>
                    <Button size="sm" variant="outline" className="flex items-center gap-1">
                      <ExternalLink className="h-3 w-3" />
                      <span>Directions</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ScrapMerchantFinder;
