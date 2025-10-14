import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MobileInput } from "@/components/ui/mobile-input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MobileSelectWrapper } from "@/components/ui/mobile-select-wrapper";
import { Calendar, MapPin, Clock, AlertCircle, Briefcase } from "lucide-react";
import { JobDetails } from "@/types/quote";

interface JobDetailsStepProps {
  jobDetails?: JobDetails;
  onUpdate: (jobDetails: JobDetails) => void;
}

export const JobDetailsStep = ({ jobDetails, onUpdate }: JobDetailsStepProps) => {
  const handleChange = (field: keyof JobDetails, value: string) => {
    onUpdate({
      ...(jobDetails || {}),
      [field]: value,
    } as JobDetails);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Briefcase className="h-5 w-5" />
          Job Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Job Title */}
        <MobileInput
          label="Job Title *"
          id="job-title"
          value={jobDetails?.title || ""}
          onChange={(e) => handleChange("title", e.target.value)}
          placeholder="e.g. Kitchen Rewire, Consumer Unit Upgrade"
          required
        />

        {/* Job Description */}
        <div className="space-y-2">
          <Label htmlFor="job-description">Job Description *</Label>
          <Textarea
            id="job-description"
            value={jobDetails?.description || ""}
            onChange={(e) => handleChange("description", e.target.value)}
            placeholder="Describe the scope of work, what needs to be done, any specific requirements..."
            className="min-h-[100px]"
            required
          />
        </div>

        {/* Location and Timeline Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <MobileInput
            label="Work Location"
            id="job-location"
            value={jobDetails?.location || ""}
            onChange={(e) => handleChange("location", e.target.value)}
            placeholder="If different from client address"
            hint="Optional - leave blank if same as client address"
          />

          {jobDetails?.estimatedDuration === "Other" ? (
            <MobileInput
              label="Estimated Duration"
              id="estimated-duration-custom"
              value={jobDetails?.customDuration || ""}
              onChange={(e) => handleChange("customDuration", e.target.value)}
              placeholder="Enter custom duration"
            />
          ) : (
            <MobileSelectWrapper
              label="Estimated Duration"
              value={jobDetails?.estimatedDuration || ""}
              onValueChange={(value) => handleChange("estimatedDuration", value)}
              options={[
                { value: "Half day", label: "Half day" },
                { value: "1 day", label: "1 day" },
                { value: "2 days", label: "2 days" },
                { value: "3 days", label: "3 days" },
                { value: "1 week", label: "1 week" },
                { value: "2 weeks", label: "2 weeks" },
                { value: "3 weeks", label: "3 weeks" },
                { value: "1 month", label: "1 month" },
                { value: "Other", label: "Other..." },
              ]}
              placeholder="Select duration"
              icon={<Clock className="h-4 w-4" />}
            />
          )}
        </div>

        {/* Work Start Date */}
        <MobileInput
          label="Proposed Start Date"
          id="work-start-date"
          type="date"
          value={jobDetails?.workStartDate || ""}
          onChange={(e) => handleChange("workStartDate", e.target.value)}
        />

        {/* Special Requirements */}
        <div className="space-y-2">
          <Label htmlFor="special-requirements">Special Requirements</Label>
          <div className="relative">
            <AlertCircle className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Textarea
              id="special-requirements"
              value={jobDetails?.specialRequirements || ""}
              onChange={(e) => handleChange("specialRequirements", e.target.value)}
              placeholder="Any special access requirements, working hours restrictions, safety considerations, etc."
              className="pl-10 min-h-[80px]"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};