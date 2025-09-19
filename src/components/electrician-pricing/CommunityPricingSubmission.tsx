import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Users, Plus, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import PostcodeAutocomplete from "./PostcodeAutocomplete";

interface CommunityPricingSubmissionProps {
  onSubmissionSuccess?: () => void;
}

const CommunityPricingSubmission = ({ onSubmissionSuccess }: CommunityPricingSubmissionProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    postcode: "",
    jobType: "",
    actualPrice: "",
    jobDescription: "",
    completionDate: "",
    materialsCost: "",
    labourHours: "",
    complexityNotes: ""
  });

  const jobTypes = [
    "Socket Installation",
    "Light Fitting",
    "Fuse Box Upgrade",
    "EV Charger Install",
    "Garden Lighting",
    "Security System",
    "Emergency Call Out",
    "Electrical Inspection",
    "Rewiring",
    "Other"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.postcode || !formData.jobType || !formData.actualPrice || !formData.completionDate) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Extract postcode district
      const { data: postcodeDistrict } = await supabase.rpc('extract_postcode_district', {
        full_postcode: formData.postcode
      });

      const { data, error } = await supabase
        .from('community_pricing_submissions')
        .insert({
          postcode_district: postcodeDistrict || formData.postcode.toUpperCase(),
          job_type: formData.jobType,
          actual_price: parseFloat(formData.actualPrice),
          job_description: formData.jobDescription,
          completion_date: formData.completionDate,
          materials_cost: formData.materialsCost ? parseFloat(formData.materialsCost) : null,
          labour_hours: formData.labourHours ? parseFloat(formData.labourHours) : null,
          complexity_notes: formData.complexityNotes
        });

      if (error) throw error;

      toast({
        title: "Submission Successful",
        description: "Thank you for contributing to the community pricing database!",
      });

      // Reset form
      setFormData({
        postcode: "",
        jobType: "",
        actualPrice: "",
        jobDescription: "",
        completionDate: "",
        materialsCost: "",
        labourHours: "",
        complexityNotes: ""
      });

      onSubmissionSuccess?.();

    } catch (error: any) {
      console.error('Submission error:', error);
      toast({
        title: "Submission Failed",
        description: error.message || "Please try again",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-elec-yellow" />
          Submit Real Job Pricing
        </CardTitle>
        <p className="text-sm text-white/80">
          Help fellow electricians by sharing your actual job pricing data
        </p>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-white mb-2 block">
                Postcode <span className="text-red-400">*</span>
              </label>
              <PostcodeAutocomplete
                value={formData.postcode}
                onChange={(value) => setFormData({ ...formData, postcode: value })}
                placeholder="Enter job postcode..."
              />
            </div>

            <div>
              <label className="text-sm font-medium text-white mb-2 block">
                Job Type <span className="text-red-400">*</span>
              </label>
              <Select 
                value={formData.jobType} 
                onValueChange={(value) => setFormData({ ...formData, jobType: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select job type" />
                </SelectTrigger>
                <SelectContent className="bg-elec-dark border-elec-yellow/20">
                  {jobTypes.map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-white mb-2 block">
                Total Price (£) <span className="text-red-400">*</span>
              </label>
              <Input
                type="number"
                step="0.01"
                placeholder="Enter total job price"
                value={formData.actualPrice}
                onChange={(e) => setFormData({ ...formData, actualPrice: e.target.value })}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-white mb-2 block">
                Completion Date <span className="text-red-400">*</span>
              </label>
              <Input
                type="date"
                value={formData.completionDate}
                onChange={(e) => setFormData({ ...formData, completionDate: e.target.value })}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-white mb-2 block">
                Materials Cost (£)
              </label>
              <Input
                type="number"
                step="0.01"
                placeholder="Optional"
                value={formData.materialsCost}
                onChange={(e) => setFormData({ ...formData, materialsCost: e.target.value })}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-white mb-2 block">
                Labour Hours
              </label>
              <Input
                type="number"
                step="0.5"
                placeholder="Optional"
                value={formData.labourHours}
                onChange={(e) => setFormData({ ...formData, labourHours: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-white mb-2 block">
              Job Description
            </label>
            <Textarea
              placeholder="Brief description of the work completed..."
              value={formData.jobDescription}
              onChange={(e) => setFormData({ ...formData, jobDescription: e.target.value })}
              rows={3}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-white mb-2 block">
              Complexity Notes
            </label>
            <Textarea
              placeholder="Any factors that affected pricing (access issues, materials, urgency, etc.)"
              value={formData.complexityNotes}
              onChange={(e) => setFormData({ ...formData, complexityNotes: e.target.value })}
              rows={2}
            />
          </div>

          <div className="flex items-center gap-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <AlertCircle className="h-5 w-5 text-blue-600" />
            <div className="text-sm text-blue-800">
              <p className="font-medium">Privacy & Verification</p>
              <p>Submissions are anonymous and will be verified before inclusion in pricing data.</p>
            </div>
          </div>

          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full"
          >
            {isSubmitting ? (
              <>
                <Clock className="h-4 w-4 mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Plus className="h-4 w-4 mr-2" />
                Submit Pricing Data
              </>
            )}
          </Button>
        </form>

        <div className="mt-6 flex items-center justify-center gap-4 text-sm text-white/60">
          <div className="flex items-center gap-1">
            <CheckCircle className="h-4 w-4" />
            <span>Anonymous</span>
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle className="h-4 w-4" />
            <span>Verified</span>
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle className="h-4 w-4" />
            <span>Helps Community</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CommunityPricingSubmission;