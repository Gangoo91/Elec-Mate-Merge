import React, { useState } from "react";
import { Search, MapPin, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface Address {
  line_1: string;
  line_2?: string;
  line_3?: string;
  post_town: string;
  postcode: string;
  county?: string;
  formatted_address: string;
}

interface PostcodeFinderProps {
  onAddressSelect: (address: Address) => void;
  className?: string;
  placeholder?: string;
}

export const PostcodeFinder: React.FC<PostcodeFinderProps> = ({
  onAddressSelect,
  className = "",
  placeholder = "Enter UK postcode"
}) => {
  const [postcode, setPostcode] = useState("");
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const { toast } = useToast();

  const searchAddresses = async () => {
    if (!postcode.trim()) {
      toast({
        title: "Postcode required",
        description: "Please enter a valid UK postcode",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      // Using postcodes.io API for UK postcode lookup
      const response = await fetch(`https://api.postcodes.io/postcodes/${postcode.replace(/\s/g, '')}`);
      
      if (!response.ok) {
        throw new Error('Postcode not found');
      }

      const data = await response.json();
      
      if (data.status === 200 && data.result) {
        // Create mock addresses based on the postcode data
        // In a real implementation, you'd use a proper address lookup service
        const mockAddresses: Address[] = [
          {
            line_1: `1 ${data.result.admin_ward} Street`,
            post_town: data.result.admin_district,
            postcode: data.result.postcode,
            county: data.result.admin_county,
            formatted_address: `1 ${data.result.admin_ward} Street, ${data.result.admin_district}, ${data.result.postcode}`
          },
          {
            line_1: `2 ${data.result.admin_ward} Road`,
            post_town: data.result.admin_district,
            postcode: data.result.postcode,
            county: data.result.admin_county,
            formatted_address: `2 ${data.result.admin_ward} Road, ${data.result.admin_district}, ${data.result.postcode}`
          },
          {
            line_1: `3 ${data.result.admin_ward} Avenue`,
            post_town: data.result.admin_district,
            postcode: data.result.postcode,
            county: data.result.admin_county,
            formatted_address: `3 ${data.result.admin_ward} Avenue, ${data.result.admin_district}, ${data.result.postcode}`
          }
        ];
        
        setAddresses(mockAddresses);
        setIsExpanded(true);
      }
    } catch (error) {
      toast({
        title: "Search failed",
        description: "Could not find addresses for this postcode",
        variant: "destructive"
      });
      setAddresses([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddressSelect = (address: Address) => {
    onAddressSelect(address);
    setIsExpanded(false);
    setPostcode(address.postcode);
    toast({
      title: "Address selected",
      description: address.formatted_address
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      searchAddresses();
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <Label htmlFor="postcode-finder" className="text-foreground">
        Postcode Finder
      </Label>
      
      <div className="flex gap-2">
        <Input
          id="postcode-finder"
          value={postcode}
          onChange={(e) => setPostcode(e.target.value.toUpperCase())}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          className="flex-1"
          maxLength={8}
        />
        <Button 
          onClick={searchAddresses}
          disabled={isLoading}
          variant="outline"
          size="icon"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Search className="h-4 w-4" />
          )}
        </Button>
      </div>

      {isExpanded && addresses.length > 0 && (
        <Card className="border-primary/20 bg-card">
          <CardContent className="p-3">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <MapPin className="h-4 w-4" />
                Found {addresses.length} addresses
              </div>
              
              <div className="space-y-1 max-h-40 overflow-y-auto">
                {addresses.map((address, index) => (
                  <button
                    key={index}
                    onClick={() => handleAddressSelect(address)}
                    className="w-full text-left p-2 rounded-md border border-border hover:border-primary/50 hover:bg-accent transition-colors"
                  >
                    <div className="text-sm font-medium">{address.line_1}</div>
                    <div className="text-xs text-muted-foreground">
                      {address.post_town}, {address.postcode}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};