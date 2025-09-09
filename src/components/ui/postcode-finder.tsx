import React, { useState, useEffect } from "react";
import { Search, MapPin, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useDebounce } from "@/hooks/useDebounce";
import { supabase } from "@/integrations/supabase/client";

interface Address {
  line_1: string;
  line_2?: string;
  line_3?: string;
  post_town: string;
  postcode: string;
  county?: string;
  formatted_address: string;
}

interface Prediction {
  description: string;
  place_id: string;
  structured_formatting: {
    main_text: string;
    secondary_text: string;
  };
}

interface PostcodeFinderProps {
  onAddressSelect: (address: Address) => void;
  className?: string;
  placeholder?: string;
}

export const PostcodeFinder: React.FC<PostcodeFinderProps> = ({
  onAddressSelect,
  className = "",
  placeholder = "Enter UK address or postcode"
}) => {
  const [input, setInput] = useState("");
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const { toast } = useToast();
  
  const debouncedInput = useDebounce(input, 300);

  // Fetch address predictions when input changes
  useEffect(() => {
    const fetchPredictions = async () => {
      if (!debouncedInput || debouncedInput.length < 3) {
        setPredictions([]);
        setIsExpanded(false);
        return;
      }

      setIsLoading(true);
      try {
        const { data, error } = await supabase.functions.invoke('google-places-autocomplete', {
          body: { input: debouncedInput }
        });

        if (error) {
          console.error('Error fetching predictions:', error);
          toast({
            title: "Search failed",
            description: "Could not fetch address suggestions",
            variant: "destructive"
          });
          return;
        }

        setPredictions(data.predictions || []);
        setIsExpanded(data.predictions?.length > 0);
      } catch (error) {
        console.error('Error:', error);
        toast({
          title: "Search failed", 
          description: "Could not fetch address suggestions",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchPredictions();
  }, [debouncedInput, toast]);

  const handlePredictionSelect = async (prediction: Prediction) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('google-place-details', {
        body: { placeId: prediction.place_id }
      });

      if (error) {
        console.error('Error fetching place details:', error);
        toast({
          title: "Address fetch failed",
          description: "Could not get address details",
          variant: "destructive"
        });
        return;
      }

      const address = data.address;
      onAddressSelect(address);
      setInput(address.formatted_address);
      setIsExpanded(false);
      setPredictions([]);
      
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

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && predictions.length > 0) {
      handlePredictionSelect(predictions[0]);
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <Label htmlFor="address-finder" className="text-foreground">
        Address Finder
      </Label>
      
      <div className="flex gap-2">
        <Input
          id="address-finder"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          className="flex-1"
        />
        <Button 
          variant="outline"
          size="icon"
          disabled
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Search className="h-4 w-4" />
          )}
        </Button>
      </div>

      {isExpanded && predictions.length > 0 && (
        <Card className="border-primary/20 bg-card">
          <CardContent className="p-3">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <MapPin className="h-4 w-4" />
                Found {predictions.length} addresses
              </div>
              
              <div className="space-y-1 max-h-40 overflow-y-auto">
                {predictions.map((prediction, index) => (
                  <button
                    key={index}
                    onClick={() => handlePredictionSelect(prediction)}
                    className="w-full text-left p-2 rounded-md border border-border hover:border-primary/50 hover:bg-accent transition-colors"
                    disabled={isLoading}
                  >
                    <div className="text-sm font-medium">{prediction.structured_formatting.main_text}</div>
                    <div className="text-xs text-muted-foreground">
                      {prediction.structured_formatting.secondary_text}
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