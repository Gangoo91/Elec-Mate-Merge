
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, MapPin, PoundSterling, MessageSquare, Plus } from "lucide-react";
import { useJobTypes, getJobTypeConfig, type JobAttribute } from "@/hooks/useJobTypes";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const CommunityPriceSubmission = () => {
  const { data: jobTypesData } = useJobTypes();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    jobType: "",
    location: "",
    price: "",
    unit: "per job",
    complexityLevel: "standard",
    notes: "",
    attributes: {} as Record<string, string | number>
  });

  const selectedJobConfig = getJobTypeConfig(formData.jobType);
  const jobAttributes = selectedJobConfig?.attributes || [];

  const handleJobTypeChange = (jobType: string) => {
    const config = getJobTypeConfig(jobType);
    setFormData(prev => ({
      ...prev,
      jobType,
      unit: config?.unit || "per job",
      attributes: {} // Reset attributes when job type changes
    }));
  };

  const handleAttributeChange = (attributeKey: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      attributes: {
        ...prev.attributes,
        [attributeKey]: value
      }
    }));
  };

  const renderAttributeField = (attribute: JobAttribute) => {
    const value = formData.attributes[attribute.key] || "";
    
    switch (attribute.type) {
      case 'select':
        return (
          <div key={attribute.key} className="space-y-2">
            <Label htmlFor={attribute.key}>
              {attribute.label} {attribute.required && <span className="text-red-500">*</span>}
            </Label>
            <Select 
              value={value as string}
              onValueChange={(val) => handleAttributeChange(attribute.key, val)}
            >
              <SelectTrigger className="bg-elec-dark border-elec-yellow/20 focus:border-elec-yellow text-white h-10">
                <SelectValue placeholder={`Select ${attribute.label.toLowerCase()}`} />
              </SelectTrigger>
              <SelectContent className="bg-elec-dark border-elec-yellow/20 text-white z-50">
                {attribute.options?.map((option) => (
                  <SelectItem 
                    key={option.value} 
                    value={option.value}
                    className="hover:bg-elec-yellow/10 focus:bg-elec-yellow/10"
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );
      
      case 'number':
        return (
          <div key={attribute.key} className="space-y-2">
            <Label htmlFor={attribute.key}>
              {attribute.label} {attribute.unit && `(${attribute.unit})`} {attribute.required && <span className="text-red-500">*</span>}
            </Label>
              <Input
                id={attribute.key}
                type="number"
                min={attribute.min}
                max={attribute.max}
                value={value}
                onChange={(e) => handleAttributeChange(attribute.key, parseFloat(e.target.value) || 0)}
                className="bg-elec-dark border-elec-yellow/20 focus:border-elec-yellow text-white h-10"
                placeholder={`Enter ${attribute.label.toLowerCase()}`}
              />
          </div>
        );
      
      case 'text':
        return (
          <div key={attribute.key} className="space-y-2">
            <Label htmlFor={attribute.key}>
              {attribute.label} {attribute.required && <span className="text-red-500">*</span>}
            </Label>
              <Input
                id={attribute.key}
                type="text"
                value={value}
                onChange={(e) => handleAttributeChange(attribute.key, e.target.value)}
                className="bg-elec-dark border-elec-yellow/20 focus:border-elec-yellow text-white h-10"
                placeholder={`Enter ${attribute.label.toLowerCase()}`}
              />
          </div>
        );
      
      default:
        return null;
    }
  };

  const validateForm = () => {
    if (!formData.jobType || !formData.location || !formData.price) {
      return false;
    }

    // Validate required attributes
    const requiredAttributes = jobAttributes.filter(attr => attr.required);
    for (const attr of requiredAttributes) {
      const value = formData.attributes[attr.key];
      if (!value || (typeof value === 'string' && value.trim() === '')) {
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke('submit-community-price', {
        body: {
          job_type: formData.jobType,
          location: formData.location,
          price: parseFloat(formData.price),
          unit: formData.unit,
          complexity_level: formData.complexityLevel,
          notes: formData.notes,
          attributes: formData.attributes
        }
      });

      if (error) throw error;

      toast.success(
        data.auto_approved 
          ? "Price submitted and approved automatically!" 
          : "Price submitted for review. Thank you for contributing!"
      );

      // Reset form
      setFormData({
        jobType: "",
        location: "",
        price: "",
        unit: "per job",
        complexityLevel: "standard",
        notes: "",
        attributes: {}
      });

    } catch (error) {
      console.error('Error submitting price:', error);
      toast.error("Failed to submit price. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-elec-yellow">
          <Users className="h-5 w-5" />
          Submit Community Price
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Job Type Selection */}
          <div className="space-y-2">
            <Label htmlFor="jobType">Job Type <span className="text-red-500">*</span></Label>
            <Select value={formData.jobType} onValueChange={handleJobTypeChange}>
              <SelectTrigger className="bg-elec-dark border-elec-yellow/20 focus:border-elec-yellow text-white h-10">
                <SelectValue placeholder="Select job type" />
              </SelectTrigger>
              <SelectContent className="bg-elec-dark border-elec-yellow/20 text-white max-h-[300px] z-50">
                {jobTypesData?.byCategory && Object.entries(jobTypesData.byCategory).map(([category, jobs]) => (
                  <div key={category}>
                    <div className="px-2 py-1 text-xs font-semibold text-elec-yellow bg-elec-yellow/10 sticky top-0">
                      {category}
                    </div>
                    {jobs.map((job) => (
                      <SelectItem 
                        key={job.job_type} 
                        value={job.job_type}
                        className="hover:bg-elec-yellow/10 focus:bg-elec-yellow/10 pl-6"
                      >
                        {job.job_type}
                      </SelectItem>
                    ))}
                  </div>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Dynamic Attributes */}
          {jobAttributes.length > 0 && (
            <div className="space-y-4 p-4 border border-elec-yellow/20 rounded-lg bg-elec-yellow/5">
              <h4 className="text-sm font-medium text-elec-yellow flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Job-Specific Details
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {jobAttributes.map(renderAttributeField)}
              </div>
            </div>
          )}

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="location" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Location <span className="text-red-500">*</span>
            </Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
              className="bg-elec-dark border-elec-yellow/20 focus:border-elec-yellow text-white h-10"
              placeholder="e.g., London, Manchester, Birmingham, etc."
            />
          </div>

          {/* Price, Unit, and Complexity Level in aligned grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price" className="flex items-center gap-2">
                <PoundSterling className="h-4 w-4" />
                Price <span className="text-red-500">*</span>
              </Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                className="bg-elec-dark border-elec-yellow/20 focus:border-elec-yellow text-white h-10"
                placeholder="0.00"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="unit">Unit</Label>
              <Select 
                value={formData.unit} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, unit: value }))}
              >
                <SelectTrigger className="bg-elec-dark border-elec-yellow/20 focus:border-elec-yellow text-white h-10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-elec-dark border-elec-yellow/20 text-white z-50">
                  <SelectItem value="per job">per job</SelectItem>
                  <SelectItem value="per hour">per hour</SelectItem>
                  <SelectItem value="per point">per point</SelectItem>
                  <SelectItem value="per circuit">per circuit</SelectItem>
                  <SelectItem value="each">each</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="complexityLevel">Complexity Level</Label>
              <Select 
                value={formData.complexityLevel} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, complexityLevel: value }))}
              >
                <SelectTrigger className="bg-elec-dark border-elec-yellow/20 focus:border-elec-yellow text-white h-10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-elec-dark border-elec-yellow/20 text-white z-50">
                  <SelectItem value="basic">Basic</SelectItem>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="complex">Complex</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Additional Notes (Optional)
            </Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              className="bg-elec-dark border-elec-yellow/20 focus:border-elec-yellow text-white resize-none"
              placeholder="Any additional details about the job, location factors, etc."
              rows={3}
            />
          </div>

          <Button 
            type="submit" 
            disabled={isSubmitting || !validateForm()}
            className="w-full bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90"
          >
            {isSubmitting ? "Submitting..." : "Submit Price"}
          </Button>
        </form>

        <div className="mt-4 text-xs text-muted-foreground bg-elec-yellow/5 p-3 rounded">
          <strong>Community Guidelines:</strong> Please ensure prices are accurate and reflect current UK market rates. 
          Submissions are reviewed for quality and may be auto-approved if they fall within reasonable ranges.
        </div>
      </CardContent>
    </Card>
  );
};

export default CommunityPriceSubmission;
