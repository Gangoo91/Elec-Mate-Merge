import { useState, useEffect, useRef } from "react";
import { Search, MapPin, Loader2, Edit3, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";
import { Input } from "./input";
import { Textarea } from "./textarea";

interface UnifiedAddressFinderProps {
  onAddressSelect: (address: string, postcode: string) => void;
  defaultValue?: string;
  className?: string;
}

interface Prediction {
  description: string;
  place_id: string;
}

interface PostcodeResult {
  postcode: string;
  line_1: string;
  line_2: string;
  post_town: string;
  county: string;
}

// Check if input looks like a UK postcode (partial or full)
const isPostcodeSearch = (input: string): boolean => {
  const trimmed = input.trim().toUpperCase();
  // Full postcode: SW1A 1AA, SW1A1AA
  // Partial postcode: SW1A, SW1, SW
  const fullPostcode = /^[A-Z]{1,2}\d{1,2}[A-Z]?\s*\d[A-Z]{2}$/i;
  const partialPostcode = /^[A-Z]{1,2}\d{1,2}[A-Z]?$/i;
  const outwardCode = /^[A-Z]{1,2}\d{1,2}$/i;

  return fullPostcode.test(trimmed) || partialPostcode.test(trimmed) || outwardCode.test(trimmed);
};

// Parse postcode from full address (UK postcodes)
const parseAddressAndPostcode = (fullAddress: string): { address: string; postcode: string } => {
  // UK postcode pattern: 1-2 letters, 1-2 digits, optional space, digit, 2 letters
  const postcodeRegex = /\b([A-Z]{1,2}\d{1,2}[A-Z]?\s*\d[A-Z]{2})\b/i;
  const match = fullAddress.match(postcodeRegex);

  if (match) {
    const postcode = match[1].toUpperCase();
    // Remove the postcode from the address (and any trailing comma/space)
    const address = fullAddress.replace(postcodeRegex, '').replace(/,?\s*$/, '').trim();
    return { address, postcode };
  }

  return { address: fullAddress.trim(), postcode: "" };
};

export const UnifiedAddressFinder = ({
  onAddressSelect,
  defaultValue = "",
  className,
}: UnifiedAddressFinderProps) => {
  const [searchValue, setSearchValue] = useState(defaultValue);
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<{ address: string; postcode: string; fullAddress: string } | null>(null);
  const [showManualEntry, setShowManualEntry] = useState(false);
  const [manualAddress, setManualAddress] = useState("");
  const [postcodeResults, setPostcodeResults] = useState<PostcodeResult[]>([]);
  const [isPostcodeMode, setIsPostcodeMode] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const debounceTimer = useRef<NodeJS.Timeout>();

  // Initialise with default value if provided
  useEffect(() => {
    if (defaultValue && !selectedAddress) {
      const { address, postcode } = parseAddressAndPostcode(defaultValue);
      if (address) {
        setSelectedAddress({ address, postcode, fullAddress: defaultValue });
      }
    }
  }, [defaultValue]);

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

  // Fetch addresses by postcode using postcodes.io
  const fetchByPostcode = async (postcode: string) => {
    const cleanPostcode = postcode.replace(/\s+/g, '').toUpperCase();

    setIsLoading(true);
    setIsPostcodeMode(true);
    try {
      // First validate/lookup the postcode
      const response = await fetch(`https://api.postcodes.io/postcodes/${cleanPostcode}`);
      const data = await response.json();

      if (data.status === 200 && data.result) {
        const result = data.result;
        // Create a single result for the postcode area
        const postcodeResult: PostcodeResult = {
          postcode: result.postcode,
          line_1: "",
          line_2: result.admin_ward || "",
          post_town: result.admin_district || result.parliamentary_constituency || "",
          county: result.region || "",
        };
        setPostcodeResults([postcodeResult]);
        setPredictions([]);
        setShowDropdown(true);
      } else {
        // Try autocomplete for partial postcodes
        const autocompleteResponse = await fetch(`https://api.postcodes.io/postcodes/${cleanPostcode}/autocomplete`);
        const autocompleteData = await autocompleteResponse.json();

        if (autocompleteData.status === 200 && autocompleteData.result?.length > 0) {
          // Fetch details for each suggested postcode (limit to 5)
          const postcodes = autocompleteData.result.slice(0, 5);
          const detailPromises = postcodes.map(async (pc: string) => {
            const detailResponse = await fetch(`https://api.postcodes.io/postcodes/${pc.replace(/\s+/g, '')}`);
            const detailData = await detailResponse.json();
            if (detailData.status === 200 && detailData.result) {
              return {
                postcode: detailData.result.postcode,
                line_1: "",
                line_2: detailData.result.admin_ward || "",
                post_town: detailData.result.admin_district || "",
                county: detailData.result.region || "",
              } as PostcodeResult;
            }
            return null;
          });

          const results = (await Promise.all(detailPromises)).filter(Boolean) as PostcodeResult[];
          setPostcodeResults(results);
          setPredictions([]);
          setShowDropdown(true);
        } else {
          setPostcodeResults([]);
        }
      }
    } catch (error) {
      console.error("Error fetching postcode:", error);
      setPostcodeResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch autocomplete suggestions from Google Places
  const fetchSuggestions = async (input: string) => {
    if (input.length < 3) {
      setPredictions([]);
      setPostcodeResults([]);
      return;
    }

    // Check if this looks like a postcode search
    if (isPostcodeSearch(input)) {
      await fetchByPostcode(input);
      return;
    }

    setIsPostcodeMode(false);
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("google-places-autocomplete", {
        body: { input },
      });

      if (error) throw error;
      setPredictions(data.predictions || []);
      setPostcodeResults([]);
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
    setPostcodeResults([]);

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
      const postcode = data.address.postcode || "";
      const fullAddress = postcode ? `${address}, ${postcode}` : address;

      setSelectedAddress({ address, postcode, fullAddress });
      setSearchValue(fullAddress);
      onAddressSelect(address, postcode);
    } catch (error) {
      console.error("Error fetching place details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle postcode result selection
  const handleSelectPostcodeResult = (result: PostcodeResult) => {
    const addressParts = [result.line_1, result.line_2, result.post_town].filter(Boolean);
    const address = addressParts.join(', ') || result.post_town || result.county;
    const fullAddress = `${address}, ${result.postcode}`;

    setSelectedAddress({ address, postcode: result.postcode, fullAddress });
    setSearchValue(fullAddress);
    setShowDropdown(false);
    setPostcodeResults([]);
    onAddressSelect(address, result.postcode);
  };

  const handleManualAddressChange = (value: string) => {
    setManualAddress(value);
    const { address, postcode } = parseAddressAndPostcode(value);
    onAddressSelect(address, postcode);
  };

  if (showManualEntry) {
    return (
      <div className={cn("space-y-3", className)}>
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium flex items-center gap-2">
            <Edit3 className="h-4 w-4 text-elec-yellow" />
            Enter Full Address
          </label>
          <button
            type="button"
            onClick={() => {
              setShowManualEntry(false);
              setSearchValue("");
              setSelectedAddress(null);
              setManualAddress("");
            }}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Use Address Search
          </button>
        </div>
        <Textarea
          value={manualAddress}
          onChange={(e) => handleManualAddressChange(e.target.value)}
          placeholder="Enter full address including postcode&#10;e.g. 123 High Street, London, SW1A 1AA"
          className="min-h-[80px] text-base touch-manipulation resize-none"
        />
        <p className="text-xs text-muted-foreground">
          Include the postcode at the end of the address
        </p>
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
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none sm:hidden" />
          )}
          <Input
            value={searchValue}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder="Enter address or postcode..."
            className={cn(!searchValue && "pl-12 sm:pl-4")}
          />
          {isLoading && (
            <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 animate-spin text-muted-foreground" />
          )}
        </div>
      </div>

      {/* Suggestions Dropdown - Google Places */}
      {showDropdown && predictions.length > 0 && !isPostcodeMode && (
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

      {/* Suggestions Dropdown - Postcode Results */}
      {showDropdown && postcodeResults.length > 0 && isPostcodeMode && (
        <div className="absolute z-50 w-full mt-1 bg-background border border-elec-yellow/30 rounded-xl shadow-lg max-h-60 overflow-y-auto">
          <div className="px-4 py-2 bg-elec-yellow/10 border-b border-elec-yellow/20">
            <p className="text-xs text-elec-yellow font-medium">Postcode Results</p>
          </div>
          {postcodeResults.map((result, index) => (
            <button
              key={`${result.postcode}-${index}`}
              type="button"
              onClick={() => handleSelectPostcodeResult(result)}
              className="w-full px-4 py-3 text-left hover:bg-elec-yellow/5 transition-colors flex items-start gap-3 border-b border-primary/10 last:border-0"
            >
              <MapPin className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white">{result.postcode}</p>
                <p className="text-xs text-white/60 truncate">
                  {[result.line_2, result.post_town, result.county].filter(Boolean).join(', ')}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Selected Address Display */}
      {selectedAddress && (
        <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-3 flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center flex-shrink-0">
            <Check className="h-4 w-4 text-green-400" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-green-400 font-medium mb-0.5">Address Selected</p>
            <p className="text-sm text-white leading-relaxed">{selectedAddress.fullAddress}</p>
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
