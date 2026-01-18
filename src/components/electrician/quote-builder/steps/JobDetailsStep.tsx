import { MobileInput } from "@/components/ui/mobile-input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MobileSelectWrapper } from "@/components/ui/mobile-select-wrapper";
import { Clock, ChevronRight, Briefcase } from "lucide-react";
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
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center gap-2">
        <Briefcase className="h-5 w-5 text-elec-yellow" />
        <h2 className="text-lg font-semibold">Job Details</h2>
      </div>

      {/* Job Title */}
      <MobileInput
        label="Job Title *"
        id="job-title"
        value={jobDetails?.title || ""}
        onChange={(e) => handleChange("title", e.target.value)}
        placeholder="e.g. Kitchen Rewire, Consumer Unit Upgrade"
        className="h-14"
        required
      />

      {/* Job Description */}
      <div className="space-y-2">
        <Label htmlFor="job-description" className="text-sm font-medium">
          Job Description *
        </Label>
        <Textarea
          id="job-description"
          value={jobDetails?.description || ""}
          onChange={(e) => handleChange("description", e.target.value)}
          placeholder="Describe the scope of work..."
          className="min-h-[120px] text-base border-2 border-primary/20 focus:border-elec-yellow"
          required
        />
      </div>

      {/* Duration and Start Date - Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {jobDetails?.estimatedDuration === "Other" ? (
          <MobileInput
            label="Estimated Duration"
            id="estimated-duration-custom"
            value={jobDetails?.customDuration || ""}
            onChange={(e) => handleChange("customDuration", e.target.value)}
            placeholder="Enter custom duration"
            className="h-14"
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

        <MobileInput
          label="Proposed Start Date"
          id="work-start-date"
          type="date"
          value={jobDetails?.workStartDate || ""}
          onChange={(e) => handleChange("workStartDate", e.target.value)}
          className="h-14"
        />
      </div>

      {/* Optional fields in collapsible */}
      <details className="group">
        <summary className="flex items-center gap-2 cursor-pointer text-sm text-muted-foreground hover:text-foreground active:text-foreground transition-all touch-manipulation py-2">
          <ChevronRight className="h-4 w-4 group-open:rotate-90 transition-transform" />
          Additional Details (optional)
        </summary>
        <div className="mt-4 space-y-4 pl-6 border-l-2 border-border/50">
          <MobileInput
            label="Work Location"
            id="job-location"
            value={jobDetails?.location || ""}
            onChange={(e) => handleChange("location", e.target.value)}
            placeholder="If different from client address"
            hint="Leave blank if same as client address"
            className="h-14"
          />

          <div className="space-y-2">
            <Label htmlFor="special-requirements" className="text-sm font-medium">
              Special Requirements
            </Label>
            <Textarea
              id="special-requirements"
              value={jobDetails?.specialRequirements || ""}
              onChange={(e) => handleChange("specialRequirements", e.target.value)}
              placeholder="Access restrictions, working hours, safety considerations..."
              className="min-h-[80px] text-base border-2 border-primary/20 focus:border-elec-yellow"
            />
          </div>
        </div>
      </details>
    </div>
  );
};
