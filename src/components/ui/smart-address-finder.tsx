import React, { useState, useEffect, useRef } from "react";
import { Search, MapPin, Loader2, Check, Building2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useDebounce } from "@/hooks/useDebounce";
import { supabase } from "@/integrations/supabase/client";

interface Address {
  line_1: string;
  line_2?: string;
  post_town: string;
  postcode: string;
  county?: string;
  formatted_address: string;
}

interface PostcodeDistrict {
  district_code: string;
  region: string;
  county: string;
  local_authority: string;
  avg_household_income: number;
  contractor_density: number;
}

interface GooglePrediction {
  description: string;
  place_id: string;
  structured_formatting: {
    main_text: string;
    secondary_text: string;
  };
}

interface SmartAddressFinderProps {
  onAddressSelect: (address: Address) => void;
  postcodeValue: string;
  addressValue: string;
  onPostcodeChange: (value: string) => void;
  onAddressChange: (value: string) => void;
  className?: string;
}

export const SmartAddressFinder: React.FC<SmartAddressFinderProps> = ({
  onAddressSelect,
  postcodeValue,
  addressValue,
  onPostcodeChange,
  onAddressChange,
  className = ""
}) => {
  const [postcodeSuggestions, setPostcodeSuggestions] = useState<PostcodeDistrict[]>([]);
  const [googlePredictions, setGooglePredictions] = useState<GooglePrediction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchMode, setSearchMode] = useState<'uk' | 'google' | null>(null);
  const [isAutoFilled, setIsAutoFilled] = useState(false);
  const { toast } = useToast();
  
  const debouncedPostcode = useDebounce(postcodeValue, 200);
  const containerRef = useRef<HTMLDivElement>(null);

  // UK postcode regex (flexible)
  const ukPostcodeRegex = /^[A-Z]{1,2}\d{1,2}[A-Z]?\s*\d?[A-Z]{0,2}$/i;

  // Detect if input looks like UK postcode
  const isUKPostcode = (input: string) => {
    const cleaned = input.trim().toUpperCase();
    return ukPostcodeRegex.test(cleaned) || (cleaned.length >= 2 && /^[A-Z]{1,2}\d/.test(cleaned));
  };

  // Search UK postcode database
  useEffect(() => {
    const searchUKPostcodes = async () => {
      if (!debouncedPostcode || debouncedPostcode.length < 2) {
        setPostcodeSuggestions([]);
        setSearchMode(null);
        setIsExpanded(false);
        return;
      }

      if (!isUKPostcode(debouncedPostcode)) {
        setSearchMode('google');
        return;
      }

      setSearchMode('uk');
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('uk_postcode_districts')
          .select('district_code, region, county, local_authority, avg_household_income, contractor_density')
          .or(`district_code.ilike.%${debouncedPostcode.toUpperCase()}%,local_authority.ilike.%${debouncedPostcode}%,region.ilike.%${debouncedPostcode}%`)
          .order('contractor_density', { ascending: false })
          .limit(8);

        if (!error && data) {
          setPostcodeSuggestions(data);
          setIsExpanded(data.length > 0);
        }
      } catch (error) {
        console.error('Error searching UK postcodes:', error);
      } finally {
        setIsLoading(false);
      }
    };

    searchUKPostcodes();
  }, [debouncedPostcode]);

  // Search Google Places for non-UK addresses
  useEffect(() => {
    const searchGooglePlaces = async () => {
      if (searchMode !== 'google' || !debouncedPostcode || debouncedPostcode.length < 3) {
        setGooglePredictions([]);
        return;
      }

      setIsLoading(true);
      try {
        const { data, error } = await supabase.functions.invoke('google-places-autocomplete', {
          body: { input: debouncedPostcode }
        });

        if (!error && data?.predictions) {
          setGooglePredictions(data.predictions);
          setIsExpanded(data.predictions.length > 0);
        }
      } catch (error) {
        console.error('Error searching Google Places:', error);
      } finally {
        setIsLoading(false);
      }
    };

    searchGooglePlaces();
  }, [debouncedPostcode, searchMode]);

  // Handle UK postcode selection
  const handleUKPostcodeSelect = (district: PostcodeDistrict) => {
    const address: Address = {
      line_1: "",
      post_town: district.local_authority,
      postcode: district.district_code,
      county: district.county,
      formatted_address: `${district.district_code}, ${district.local_authority}, ${district.county}`
    };
    
    onPostcodeChange(district.district_code);
    onAddressChange(`${district.local_authority}, ${district.county}`);
    setIsExpanded(false);
    setIsAutoFilled(true);
    
    toast({
      title: "Postcode selected",
      description: `${district.district_code} - ${district.local_authority}`
    });
  };

  // Handle Google Places selection
  const handleGooglePlaceSelect = async (prediction: GooglePrediction) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('google-place-details', {
        body: { placeId: prediction.place_id }
      });

      if (error) {
        toast({
          title: "Address fetch failed",
          description: "Could not get address details",
          variant: "destructive"
        });
        return;
      }

      const address = data.address;
      onPostcodeChange(address.postcode || "");
      onAddressChange(address.line_1 || address.formatted_address);
      onAddressSelect(address);
      setIsExpanded(false);
      setIsAutoFilled(true);
      
      toast({
        title: "Address selected",
        description: address.formatted_address
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Address fetch failed",
        description: "Could not get address details", 
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatIncomeRange = (income: number) => {
    if (income >= 50000) return "High income";
    if (income >= 35000) return "Middle income";
    return "Average income";
  };

  const getContractorDensityText = (density: number) => {
    if (density >= 100) return "Very competitive";
    if (density >= 75) return "High competition";
    if (density >= 50) return "Moderate";
    return "Low competition";
  };

  return (
    <div className={cn("space-y-4", className)} ref={containerRef}>
      {/* Postcode Input */}
      <div className="space-y-3">
        <Label className="text-sm font-semibold text-elec-light flex items-center gap-2">
          <span className="w-1 h-4 bg-elec-yellow rounded-full"></span>
          Postcode *
          {isAutoFilled && (
            <span className="ml-auto text-xs bg-elec-yellow/20 text-elec-yellow px-2 py-1 rounded-full flex items-center gap-1">
              <Check className="h-3 w-3" />
              Auto-filled
            </span>
          )}
        </Label>
        
        <div className="relative group">
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-elec-yellow/70 z-10">
            <MapPin className="h-5 w-5" />
          </div>
          
          <input
            type="text"
            value={postcodeValue}
            onChange={(e) => {
              onPostcodeChange(e.target.value);
              setIsAutoFilled(false);
            }}
            onFocus={() => postcodeValue.length >= 2 && setIsExpanded(true)}
            placeholder="Enter UK postcode"
            className={cn(
              "h-14 w-full bg-card border border-primary/30 rounded-xl text-elec-light",
              "hover:border-elec-yellow/40 focus:border-elec-yellow transition-all duration-200",
              "placeholder:text-elec-light/60 text-base font-medium",
              "pl-12 pr-12",
              "focus:outline-none"
            )}
            style={{ fontSize: '16px' }}
          />
          
          {isLoading && (
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-elec-yellow/70">
              <Loader2 className="h-4 w-4 animate-spin" />
            </div>
          )}
        </div>

        {/* Suggestions Dropdown */}
        {isExpanded && (
          <div className="bg-card border border-elec-yellow/30 rounded-xl p-3 shadow-lg max-h-64 overflow-y-auto">
            {searchMode === 'uk' && postcodeSuggestions.length > 0 && (
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs text-elec-light/70 mb-2 px-2">
                  <Building2 className="h-3 w-3" />
                  UK Postcode Districts
                </div>
                {postcodeSuggestions.map((district) => (
                  <button
                    key={district.district_code}
                    onClick={() => handleUKPostcodeSelect(district)}
                    className="w-full text-left p-3 rounded-lg hover:bg-elec-yellow/10 transition-colors border border-transparent hover:border-elec-yellow/30"
                  >
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-elec-light">{district.district_code}</div>
                        <div className="text-sm text-elec-light/70">
                          {district.local_authority}, {district.county}
                        </div>
                        <div className="flex gap-3 text-xs text-elec-light/50 mt-1">
                          <span>{formatIncomeRange(district.avg_household_income)}</span>
                          <span>•</span>
                          <span>{getContractorDensityText(district.contractor_density)}</span>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {searchMode === 'google' && googlePredictions.length > 0 && (
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs text-elec-light/70 mb-2 px-2">
                  <Search className="h-3 w-3" />
                  Address Suggestions
                </div>
                {googlePredictions.map((prediction, index) => (
                  <button
                    key={index}
                    onClick={() => handleGooglePlaceSelect(prediction)}
                    disabled={isLoading}
                    className="w-full text-left p-3 rounded-lg hover:bg-elec-yellow/10 transition-colors border border-transparent hover:border-elec-yellow/30"
                  >
                    <div className="font-medium text-elec-light text-sm">
                      {prediction.structured_formatting.main_text}
                    </div>
                    <div className="text-xs text-elec-light/60 mt-1">
                      {prediction.structured_formatting.secondary_text}
                    </div>
                  </button>
                ))}
              </div>
            )}

            {!isLoading && searchMode && postcodeSuggestions.length === 0 && googlePredictions.length === 0 && (
              <div className="text-center py-6 text-elec-light/60">
                <MapPin className="h-8 w-8 mx-auto mb-2 opacity-30" />
                <p className="text-sm">No addresses found</p>
                <p className="text-xs mt-1">Try entering manually below</p>
              </div>
            )}
          </div>
        )}

        <p className="text-xs text-elec-light/70 flex items-center gap-1">
          <span className="w-1 h-1 bg-elec-yellow/60 rounded-full"></span>
          {searchMode === 'uk' ? 'Searching UK postcode database...' : searchMode === 'google' ? 'Searching international addresses...' : 'Type a UK postcode or international address'}
        </p>
      </div>

      {/* Address Input */}
      <div className="space-y-3">
        <Label className="text-sm font-semibold text-elec-light flex items-center gap-2">
          <span className="w-1 h-4 bg-elec-yellow rounded-full"></span>
          Address *
          {isAutoFilled && (
            <span className="ml-auto text-xs bg-elec-yellow/20 text-elec-yellow px-2 py-1 rounded-full flex items-center gap-1">
              <Check className="h-3 w-3" />
              Auto-filled
            </span>
          )}
        </Label>
        
        <div className="relative">
          <input
            type="text"
            value={addressValue}
            onChange={(e) => {
              onAddressChange(e.target.value);
              setIsAutoFilled(false);
            }}
            placeholder="Enter full address or select from suggestions above"
            className={cn(
              "h-14 w-full bg-card border border-primary/30 rounded-xl text-elec-light",
              "hover:border-elec-yellow/40 focus:border-elec-yellow transition-all duration-200",
              "placeholder:text-elec-light/60 text-base font-medium",
              "px-4",
              "focus:outline-none"
            )}
            style={{ fontSize: '16px' }}
          />
        </div>
        
        <p className="text-xs text-elec-light/70 flex items-center gap-1">
          <span className="w-1 h-1 bg-elec-yellow/60 rounded-full"></span>
          {isAutoFilled ? 'Address auto-filled from postcode selection' : 'Or enter manually'}
        </p>
      </div>
    </div>
  );
};
