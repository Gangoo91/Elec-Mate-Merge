import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { MapPin, Search } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface PostcodeAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

interface PostcodeDistrict {
  district_code: string;
  region: string;
  county: string;
  local_authority: string;
  avg_household_income: number;
  contractor_density: number;
}

const PostcodeAutocomplete = ({ 
  value, 
  onChange, 
  placeholder = "Enter UK postcode or location...",
  className = ""
}: PostcodeAutocompleteProps) => {
  const [open, setOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<PostcodeDistrict[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout>();

  const searchPostcodes = async (searchTerm: string) => {
    if (searchTerm.length < 2) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    try {
      // Search postcode districts and nearby areas
      const { data, error } = await supabase
        .from('uk_postcode_districts')
        .select('district_code, region, county, local_authority, avg_household_income, contractor_density')
        .or(`district_code.ilike.%${searchTerm.toUpperCase()}%,region.ilike.%${searchTerm}%,local_authority.ilike.%${searchTerm}%`)
        .order('contractor_density', { ascending: false })
        .limit(10);

      if (error) {
        console.error('Error searching postcodes:', error);
        return;
      }

      setSuggestions(data || []);
    } catch (error) {
      console.error('Error searching postcodes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (value && open) {
      searchTimeoutRef.current = setTimeout(() => {
        searchPostcodes(value);
      }, 300);
    }

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [value, open]);

  const handleSelect = (district: PostcodeDistrict) => {
    onChange(district.district_code);
    setOpen(false);
  };

  const formatIncomeRange = (income: number) => {
    if (income >= 50000) return "High income area";
    if (income >= 35000) return "Middle income area";
    if (income >= 25000) return "Average income area";
    return "Lower income area";
  };

  const getContractorDensityText = (density: number) => {
    if (density >= 100) return "Very high competition";
    if (density >= 75) return "High competition";
    if (density >= 50) return "Moderate competition";
    return "Low competition";
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="relative">
          <Input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className={`pl-10 ${className}`}
            onFocus={() => setOpen(true)}
          />
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0 bg-elec-dark border-elec-yellow/20" align="start">
        <Command>
          <CommandInput 
            placeholder="Search UK postcodes..." 
            value={value}
            onValueChange={onChange}
          />
          <CommandList>
            {isLoading ? (
              <CommandEmpty>
                <div className="flex items-center justify-center py-6">
                  <Search className="h-4 w-4 animate-spin mr-2" />
                  Searching...
                </div>
              </CommandEmpty>
            ) : suggestions.length === 0 ? (
              <CommandEmpty>
                <div className="text-center py-6">
                  <MapPin className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm text-muted-foreground">
                    {value.length < 2 ? "Type to search postcodes" : "No postcodes found"}
                  </p>
                </div>
              </CommandEmpty>
            ) : (
              <CommandGroup>
                {suggestions.map((district) => (
                  <CommandItem
                    key={district.district_code}
                    value={district.district_code}
                    onSelect={() => handleSelect(district)}
                    className="flex flex-col items-start space-y-1 p-3 hover:bg-elec-yellow/10 cursor-pointer"
                  >
                    <div className="flex items-center gap-2 w-full">
                      <MapPin className="h-4 w-4 text-elec-yellow" />
                      <span className="font-medium text-white">{district.district_code}</span>
                      <span className="text-sm text-white/70">
                        {district.local_authority}, {district.county}
                      </span>
                    </div>
                    <div className="flex gap-4 text-xs text-white/60 ml-6">
                      <span>{formatIncomeRange(district.avg_household_income)}</span>
                      <span>•</span>
                      <span>{getContractorDensityText(district.contractor_density)}</span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default PostcodeAutocomplete;