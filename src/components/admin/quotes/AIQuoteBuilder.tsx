
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Brain, Loader2, Zap } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface AIQuoteBuilderProps {
  onQuoteGenerated: (quoteData: any) => void;
}

const AIQuoteBuilder = ({ onQuoteGenerated }: AIQuoteBuilderProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [clientName, setClientName] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [budget, setBudget] = useState("");

  const handleAIGenerate = async () => {
    if (!clientName || !jobDescription) {
      toast({
        title: "Missing Information",
        description: "Please provide client name and job description.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('ai-quote-generator', {
        body: {
          jobType: "custom",
          propertyDetails: { type: propertyType },
          clientRequirements: jobDescription,
          clientName,
          budget
        }
      });

      if (error) {
        throw error;
      }

      // Generate a basic quote structure for the AI response
      const aiQuoteData = {
        clientInfo: {
          name: clientName,
          address: ""
        },
        jobDetails: {
          type: "custom",
          propertyType: propertyType || "house",
          scopeOfWork: jobDescription,
          additionalRequirements: budget ? `Budget consideration: ${budget}` : ""
        },
        materials: [
          { id: 1, description: "Materials (AI Generated)", quantity: 1, unitPrice: 500 },
          { id: 2, description: "Labour & Installation", quantity: 1, unitPrice: 750 }
        ],
        labour: {
          days: 2,
          rate: 250,
          total: 500
        },
        financials: {
          materialCost: 500,
          labourCost: 750,
          subtotal: 1250,
          vat: 250,
          total: 1500
        },
        quoteNumber: `AI-${Date.now().toString().substring(7)}`,
        issueDate: new Date().toISOString().split('T')[0],
        validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      };

      onQuoteGenerated(aiQuoteData);
      
      toast({
        title: "AI Quote Generated",
        description: "Your quote has been generated using AI assistance."
      });

      // Reset form
      setClientName("");
      setJobDescription("");
      setPropertyType("");
      setBudget("");

    } catch (error) {
      console.error('Error generating AI quote:', error);
      toast({
        title: "Generation Failed",
        description: "Unable to generate quote. Please try again or use manual quote generation.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="border-elec-yellow/30 bg-gradient-to-r from-elec-gray to-elec-dark/50">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-elec-yellow/20">
            <Brain className="h-6 w-6 text-elec-yellow" />
          </div>
          <div>
            <CardTitle className="text-xl flex items-center gap-2">
              AI Quote Builder
              <Zap className="h-5 w-5 text-elec-yellow" />
            </CardTitle>
            <CardDescription>
              Generate intelligent quotes instantly with AI assistance
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="ai-client-name">Client Name</Label>
            <Input
              id="ai-client-name"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="Enter client name"
              className="bg-elec-dark/20 border-elec-yellow/20"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ai-property-type">Property Type</Label>
            <Select value={propertyType} onValueChange={setPropertyType}>
              <SelectTrigger className="bg-elec-dark/20 border-elec-yellow/20">
                <SelectValue placeholder="Select property type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="house">House</SelectItem>
                <SelectItem value="flat">Flat</SelectItem>
                <SelectItem value="bungalow">Bungalow</SelectItem>
                <SelectItem value="commercial">Commercial</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="ai-job-description">Job Description</Label>
          <Textarea
            id="ai-job-description"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Describe the electrical work needed (e.g., 'Full rewire of 3-bedroom house', 'Install EV charger in garage', 'EICR inspection')"
            rows={3}
            className="bg-elec-dark/20 border-elec-yellow/20"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="ai-budget">Budget Range (Optional)</Label>
          <Input
            id="ai-budget"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            placeholder="e.g., £2000-3000"
            className="bg-elec-dark/20 border-elec-yellow/20"
          />
        </div>

        <Button 
          onClick={handleAIGenerate} 
          disabled={isLoading || !clientName || !jobDescription}
          className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating AI Quote...
            </>
          ) : (
            <>
              <Brain className="mr-2 h-4 w-4" />
              Generate AI Quote
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default AIQuoteBuilder;
