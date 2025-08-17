
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Users, MapPin, PoundSterling, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { useJobTypes } from "@/hooks/useJobTypes";
import { supabase } from "@/integrations/supabase/client";

const CommunityPriceSubmission = () => {
  const { data: jobTypes, isLoading: jobTypesLoading } = useJobTypes();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    job_type: '',
    location: '',
    price: '',
    unit: 'per job',
    complexity_level: 'standard',
    notes: ''
  });

  const complexityOptions = [
    { value: 'simple', label: 'Simple', description: 'Straightforward job, minimal complications' },
    { value: 'standard', label: 'Standard', description: 'Typical job with normal requirements' },
    { value: 'complex', label: 'Complex', description: 'Challenging job with complications' }
  ];

  const handleJobTypeChange = (jobType: string) => {
    setFormData(prev => ({ ...prev, job_type: jobType }));
    
    // Auto-populate unit based on job type
    const jobInfo = jobTypes?.all.find(item => item.job_type === jobType);
    if (jobInfo?.unit) {
      setFormData(prev => ({ ...prev, unit: jobInfo.unit }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.job_type || !formData.location || !formData.price) {
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const { error } = await supabase.functions.invoke('submit-community-price', {
        body: {
          job_type: formData.job_type,
          location: formData.location.trim(),
          price: parseFloat(formData.price),
          unit: formData.unit,
          complexity_level: formData.complexity_level,
          notes: formData.notes.trim() || null
        }
      });

      if (error) throw error;

      setSubmitStatus('success');
      setFormData({
        job_type: '',
        location: '',
        price: '',
        unit: 'per job',
        complexity_level: 'standard',
        notes: ''
      });
    } catch (error) {
      console.error('Error submitting price:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === 'success') {
    return (
      <Card className="border-green-200 bg-green-50">
        <CardContent className="pt-6">
          <div className="text-center">
            <CheckCircle2 className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-green-800 mb-2">Thank You!</h3>
            <p className="text-green-700 mb-4">
              Your pricing data has been submitted for review. Once approved, it will help improve accuracy for your area.
            </p>
            <Button 
              variant="outline" 
              onClick={() => setSubmitStatus('idle')}
              className="border-green-300 text-green-700 hover:bg-green-100"
            >
              Submit Another Price
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-elec-yellow" />
          Help Improve UK Pricing Data
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Share actual prices from your area to help build the most accurate UK electrical pricing database.
        </p>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Job Type Selection */}
          <div>
            <Label htmlFor="job-type">Job Type *</Label>
            <Select value={formData.job_type} onValueChange={handleJobTypeChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select the type of electrical work" />
              </SelectTrigger>
              <SelectContent className="max-h-60">
                {jobTypesLoading ? (
                  <SelectItem value="loading" disabled>Loading job types...</SelectItem>
                ) : (
                  jobTypes?.byCategory && Object.entries(jobTypes.byCategory).map(([category, jobs]) => (
                    <div key={category}>
                      <div className="px-2 py-1 text-xs font-medium text-muted-foreground bg-muted/50">
                        {category}
                      </div>
                      {jobs.map((job) => (
                        <SelectItem key={job.job_type} value={job.job_type}>
                          {job.job_type}
                        </SelectItem>
                      ))}
                    </div>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>

          {/* Location */}
          <div>
            <Label htmlFor="location">Location *</Label>
            <Input
              id="location"
              placeholder="e.g., Manchester, Birmingham, SW1 2AA"
              value={formData.location}
              onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
              className="w-full"
            />
            <p className="text-xs text-muted-foreground mt-1">
              City, town, or postcode. We'll keep this anonymous in our database.
            </p>
          </div>

          {/* Price and Unit */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="price">Price Charged *</Label>
              <div className="relative">
                <PoundSterling className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  placeholder="250.00"
                  value={formData.price}
                  onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="unit">Unit</Label>
              <Select value={formData.unit} onValueChange={(value) => setFormData(prev => ({ ...prev, unit: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="per job">Per Job</SelectItem>
                  <SelectItem value="each">Each</SelectItem>
                  <SelectItem value="per hour">Per Hour</SelectItem>
                  <SelectItem value="per day">Per Day</SelectItem>
                  <SelectItem value="per point">Per Point</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Complexity */}
          <div>
            <Label>Job Complexity</Label>
            <div className="grid grid-cols-3 gap-2 mt-2">
              {complexityOptions.map(option => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, complexity_level: option.value }))}
                  className={`p-3 border rounded-lg text-left transition-colors ${
                    formData.complexity_level === option.value 
                      ? 'border-elec-yellow bg-elec-yellow/10' 
                      : 'border-muted hover:border-elec-yellow/50'
                  }`}
                >
                  <div className="font-medium text-sm">{option.label}</div>
                  <div className="text-xs text-muted-foreground">{option.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <Label htmlFor="notes">Additional Notes (Optional)</Label>
            <Textarea
              id="notes"
              placeholder="Any special circumstances, materials included, travel time, etc."
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              rows={3}
            />
          </div>

          {submitStatus === 'error' && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
              <AlertCircle className="h-4 w-4" />
              <span className="text-sm">Please check all required fields and try again.</span>
            </div>
          )}

          <Button 
            type="submit" 
            disabled={isSubmitting || !formData.job_type || !formData.location || !formData.price}
            className="w-full"
          >
            {isSubmitting ? (
              <>
                <Clock className="h-4 w-4 mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <MapPin className="h-4 w-4 mr-2" />
                Share This Price
              </>
            )}
          </Button>
        </form>

        <div className="mt-4 p-3 border border-elec-yellow/20 rounded-lg bg-elec-yellow/5">
          <p className="text-xs text-muted-foreground">
            <strong>Privacy:</strong> Your submissions are moderated before being added to the database. 
            We only store job type, approximate location, and price - no personal details.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CommunityPriceSubmission;
