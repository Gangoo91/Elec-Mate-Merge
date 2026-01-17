import { useState, useEffect, useRef } from "react";
import { Search, MapPin, Loader2, Edit3 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";
import { Input } from "./input";
import { Button } from "./button";

interface UnifiedAddressFinderProps {
  onAddressSelect: (address: string, postcode: string) => void;
  defaultValue?: string;
  className?: string;
}

interface Prediction {
  description: string;
  place_id: string;
}

export const UnifiedAddressFinder = ({
  onAddressSelect,
  defaultValue = "",
  className,
}: UnifiedAddressFinderProps) => {
  const [searchValue, setSearchValue] = useState(defaultValue);
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<{ address: string; postcode: string } | null>(null);
  const [showManualEntry, setShowManualEntry] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const debounceTimer = useRef<NodeJS.Timeout>();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch autocomplete suggestions
  const fetchSuggestions = async (input: string) => {
    if (input.length < 3) {
      setPredictions([]);
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("google-places-autocomplete", {
        body: { input },
      });

      if (error) throw error;
      setPredictions(data.predictions || []);
      setShowDropdown(true);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setPredictions([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle input change with debounce
  const handleInputChange = (value: string) => {
    setSearchValue(value);
    setSelectedAddress(null);

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      fetchSuggestions(value);
    }, 300);
  };

  // Fetch place details and parse address
  const handleSelectAddress = async (prediction: Prediction) => {
    setIsLoading(true);
    setShowDropdown(false);

    try {
      const { data, error } = await supabase.functions.invoke("google-place-details", {
        body: { placeId: prediction.place_id },
      });

      if (error) throw error;

      // Build comprehensive address string
      const addressParts = [
        data.address.line_1,
        data.address.line_2,
        data.address.post_town,
      ].filter(Boolean);
      
      const address = addressParts.join(', ') || data.address.formatted_address;
      const postcode = data.address.postcode;

      setSelectedAddress({ address, postcode });
      setSearchValue(prediction.description);
      onAddressSelect(address, postcode);
    } catch (error) {
      console.error("Error fetching place details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (showManualEntry) {
    return (
      <div className={cn("space-y-4", className)}>
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">Enter Address Manually</label>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => {
              setShowManualEntry(false);
              setSearchValue("");
              setSelectedAddress(null);
            }}
            className="text-xs"
          >
            Use Address Search
          </Button>
        </div>
        <Input
          placeholder="Address"
          onChange={(e) => onAddressSelect(e.target.value, "")}
        />
        <Input
          placeholder="Postcode"
          onChange={(e) => {
            const currentAddress = selectedAddress?.address || "";
            onAddressSelect(currentAddress, e.target.value);
          }}
        />
      </div>
    );
  }

  return (
    <div ref={wrapperRef} className={cn("relative space-y-4", className)}>
      <div>
        <label className="text-sm font-medium mb-2 block">
          Search Address *
        </label>
        <div className="relative">
          {!searchValue && (
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
          )}
          <Input
            value={searchValue}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder="Start typing an address..."
            className={cn(!searchValue && "pl-12")}
          />
          {isLoading && (
            <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 animate-spin text-muted-foreground" />
          )}
        </div>
      </div>

      {/* Suggestions Dropdown */}
      {showDropdown && predictions.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-background border border-primary/30 rounded-xl shadow-lg max-h-60 overflow-y-auto">
          {predictions.map((prediction) => (
            <button
              key={prediction.place_id}
              type="button"
              onClick={() => handleSelectAddress(prediction)}
              className="w-full px-4 py-3 text-left hover:bg-primary/5 transition-colors flex items-start gap-3 border-b border-primary/10 last:border-0"
            >
              <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-sm">{prediction.description}</span>
            </button>
          ))}
        </div>
      )}

      {/* Selected Address Display */}
      {selectedAddress && (
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 space-y-2">
          <div className="flex items-center gap-2 text-sm font-medium text-primary">
            <MapPin className="h-4 w-4" />
            <span>Selected Address</span>
          </div>
          <div className="text-sm space-y-1">
            <div>
              <span className="font-medium">Address:</span> {selectedAddress.address}
            </div>
            <div>
              <span className="font-medium">Postcode:</span> {selectedAddress.postcode}
            </div>
          </div>
        </div>
      )}

      {/* Manual Entry Link */}
      <button
        type="button"
        onClick={() => setShowManualEntry(true)}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <Edit3 className="h-4 w-4" />
        Can't find your address? Enter manually
      </button>

      {/* Google Attribution */}
      <div className="text-xs text-muted-foreground">
        Powered by Google Places
      </div>
    </div>
  );
};
