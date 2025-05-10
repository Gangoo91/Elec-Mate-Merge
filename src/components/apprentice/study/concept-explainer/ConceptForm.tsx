
import { useState } from "react";
import { Loader } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface ConceptFormProps {
  query: string;
  setQuery: (query: string) => void;
  isLoading: boolean;
  onExplain: () => void;
  onClose: () => void;
}

const ConceptForm = ({ query, setQuery, isLoading, onExplain, onClose }: ConceptFormProps) => {
  return (
    <div className="space-y-4">
      <Textarea
        placeholder="e.g., What is the difference between a residual current device (RCD) and a residual current circuit breaker with overload protection (RCBO)?"
        className="min-h-[100px]"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      
      <div className="flex space-x-2">
        <Button 
          className="flex-1"
          onClick={onExplain} 
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader className="h-4 w-4 mr-2 animate-spin" />
              Explaining...
            </>
          ) : (
            'Get Explanation'
          )}
        </Button>
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
      </div>
    </div>
  );
};

export default ConceptForm;
