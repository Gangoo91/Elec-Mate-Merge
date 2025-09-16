
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Send, MapPin, PoundSterling } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const CommunityPriceSubmission = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    jobType: "",
    location: "",
    price: "",
    unit: "per job",
    complexityLevel: "standard",
    notes: "",
    // Dynamic attributes for different job types
    bedrooms: "",
    propertyType: "",
    floors: ""
  });

  const jobTypes = [
    "Socket Installation",
    "Light Fitting", 
    "Light Switch",
    "Rewire Full House",
    "Consumer Unit Replacement",
    "Electrical Inspection",
    "Fault Finding",
    "Garden Lighting",
    "EV Charger Installation",
    "Smoke Alarm Installation",
    "Shower Installation",
    "Outdoor Socket",
    "Cooker Point"
  ];

  const units = [
    "per job",
    "per point",
    "per hour",
    "per day",
    "per room",
    "per circuit"
  ];

  const complexityLevels = [
    { value: "simple", label: "Simple" },
    { value: "standard", label: "Standard" },
    { value: "complex", label: "Complex" }
  ];

  const propertyTypes = [
    { value: "terraced", label: "Terraced" },
    { value: "semi_detached", label: "Semi-detached" },
    { value: "detached", label: "Detached" },
    { value: "flat", label: "Flat" },
    { value: "bungalow", label: "Bungalow" }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.jobType || !formData.location || !formData.price) {
      toast({
        title: "Missing information",
        description: "Please fill in job type, location, and price",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      console.log('Submitting price data:', formData);
      
      // Prepare attributes based on job type
      const attributes: Record<string, string> = {};
      
      if (formData.jobType === "Rewire Full House") {
        if (formData.bedrooms) attributes.bedrooms = formData.bedrooms;
        if (formData.propertyType) attributes.property_type = formData.propertyType;
        if (formData.floors) attributes.floors = formData.floors;
      }

      const response = await supabase.functions.invoke('submit-community-price', {
        body: {
          job_type: formData.jobType,
          location: formData.location,
          price: parseFloat(formData.price),
          unit: formData.unit,
          complexity_level: formData.complexityLevel,
          notes: formData.notes || null,
          attributes
        }
      });

      if (response.error) {
        console.error('Supabase function error:', response.error);
        throw new Error(response.error.message || 'Failed to submit price');
      }

      console.log('Submission response:', response.data);

      toast({
        title: "Price submitted successfully!",
        description: response.data?.auto_approved 
          ? "Your price has been approved and added to our database."
          : "Your price is under review and will be published once approved.",
      });

      // Reset form
      setFormData({
        jobType: "",
        location: "",
        price: "",
        unit: "per job",
        complexityLevel: "standard",
        notes: "",
        bedrooms: "",
        propertyType: "",
        floors: ""
      });

    } catch (error) {
      console.error('Error submitting price:', error);
      toast({
        title: "Failed to submit price",
        description: error instanceof Error ? error.message : "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderJobSpecificFields = () => {
    if (formData.jobType === "Rewire Full House") {
      return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="bedrooms">Number of Bedrooms</Label>
            <Select value={formData.bedrooms} onValueChange={(value) => setFormData(prev => ({...prev, bedrooms: value}))}>
              <SelectTrigger className="h-10">
                <SelectValue placeholder="Select..." />
              </SelectTrigger>
                <SelectContent className="max-h-[120px] overflow-y-auto bg-elec-dark border-elec-yellow/20 text-white">
                  <SelectItem value="1" className="focus:bg-elec-yellow/20 focus:text-white">1 Bedroom</SelectItem>
                  <SelectItem value="2" className="focus:bg-elec-yellow/20 focus:text-white">2 Bedrooms</SelectItem>
                  <SelectItem value="3" className="focus:bg-elec-yellow/20 focus:text-white">3 Bedrooms</SelectItem>
                  <SelectItem value="4" className="focus:bg-elec-yellow/20 focus:text-white">4 Bedrooms</SelectItem>
                  <SelectItem value="5+" className="focus:bg-elec-yellow/20 focus:text-white">5+ Bedrooms</SelectItem>
                </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="property-type">Property Type</Label>
            <Select value={formData.propertyType} onValueChange={(value) => setFormData(prev => ({...prev, propertyType: value}))}>
              <SelectTrigger className="h-10">
                <SelectValue placeholder="Select..." />
              </SelectTrigger>
                <SelectContent className="max-h-[120px] overflow-y-auto bg-elec-dark border-elec-yellow/20 text-white">
                  {propertyTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value} className="focus:bg-elec-yellow/20 focus:text-white">
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="floors">Number of Floors</Label>
            <Select value={formData.floors} onValueChange={(value) => setFormData(prev => ({...prev, floors: value}))}>
              <SelectTrigger className="h-10">
                <SelectValue placeholder="Select..." />
              </SelectTrigger>
                <SelectContent className="max-h-[120px] overflow-y-auto bg-elec-dark border-elec-yellow/20 text-white">
                  <SelectItem value="1" className="focus:bg-elec-yellow/20 focus:text-white">1 Floor</SelectItem>
                  <SelectItem value="2" className="focus:bg-elec-yellow/20 focus:text-white">2 Floors</SelectItem>
                  <SelectItem value="3" className="focus:bg-elec-yellow/20 focus:text-white">3 Floors</SelectItem>
                  <SelectItem value="4+" className="focus:bg-elec-yellow/20 focus:text-white">4+ Floors</SelectItem>
                </SelectContent>
            </Select>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg flex items-center gap-2">
          <Users className="h-5 w-5 text-elec-yellow" />
          Community Price Submission
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Help fellow electricians by sharing recent job prices from your area
        </p>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Job Type and Location Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="job-type">Job Type *</Label>
              <Select value={formData.jobType} onValueChange={(value) => setFormData(prev => ({...prev, jobType: value}))}>
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Select job type..." />
                </SelectTrigger>
              <SelectContent className="max-h-[200px] overflow-y-auto bg-elec-dark border-elec-yellow/20 text-white">
                {jobTypes.map((job) => (
                  <SelectItem key={job} value={job} className="focus:bg-elec-yellow/20 focus:text-white">
                    {job}
                  </SelectItem>
                ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="location"
                  placeholder="e.g., Manchester, Bolton, M1 1AA"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({...prev, location: e.target.value}))}
                  className="pl-10 h-10"
                />
              </div>
            </div>
          </div>

          {/* Price, Unit, and Complexity Row - Responsive stacking */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price (£) *</Label>
              <div className="relative">
                <PoundSterling className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={formData.price}
                  onChange={(e) => setFormData(prev => ({...prev, price: e.target.value}))}
                  className="pl-10 h-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="unit">Unit</Label>
              <Select value={formData.unit} onValueChange={(value) => setFormData(prev => ({...prev, unit: value}))}>
                <SelectTrigger className="h-10">
                  <SelectValue />
                </SelectTrigger>
              <SelectContent className="max-h-[150px] overflow-y-auto bg-elec-dark border-elec-yellow/20 text-white">
                {units.map((unit) => (
                  <SelectItem key={unit} value={unit} className="focus:bg-elec-yellow/20 focus:text-white">
                    {unit}
                  </SelectItem>
                ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="complexity">Complexity</Label>
              <Select value={formData.complexityLevel} onValueChange={(value) => setFormData(prev => ({...prev, complexityLevel: value}))}>
                <SelectTrigger className="h-10">
                  <SelectValue />
                </SelectTrigger>
              <SelectContent className="max-h-[120px] overflow-y-auto bg-elec-dark border-elec-yellow/20 text-white">
                {complexityLevels.map((level) => (
                  <SelectItem key={level.value} value={level.value} className="focus:bg-elec-yellow/20 focus:text-white">
                    {level.label}
                  </SelectItem>
                ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Job-specific fields */}
          {renderJobSpecificFields()}

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes (Optional)</Label>
            <Textarea
              id="notes"
              placeholder="Any additional context about the job, materials used, or special circumstances..."
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({...prev, notes: e.target.value}))}
              className="min-h-[80px] resize-none"
            />
          </div>

          {/* Submit Button */}
          <Button 
            type="submit" 
            disabled={isSubmitting || !formData.jobType || !formData.location || !formData.price}
            className="w-full bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90"
          >
            <Send className="h-4 w-4 mr-2" />
            {isSubmitting ? "Submitting..." : "Submit Price"}
          </Button>

          {/* Disclaimer */}
          <div className="text-xs text-white bg-elec-yellow/5 p-3 rounded-lg">
            <strong>Privacy Notice:</strong> Submissions are reviewed before publication. 
            No personal information is stored. Prices help create accurate regional estimates for the community.
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CommunityPriceSubmission;
