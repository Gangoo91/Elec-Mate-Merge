import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, MapPin, Clock, AlertCircle, Briefcase } from "lucide-react";
import { JobDetails } from "@/types/quote";

interface JobDetailsStepProps {
  jobDetails?: JobDetails;
  onUpdate: (jobDetails: JobDetails) => void;
}

export const JobDetailsStep = ({ jobDetails, onUpdate }: JobDetailsStepProps) => {
  const handleChange = (field: keyof JobDetails, value: string) => {
    onUpdate({
      ...jobDetails,
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
        <div className="space-y-2">
          <Label htmlFor="job-title">Job Title *</Label>
          <Input
            id="job-title"
            value={jobDetails?.title || ""}
            onChange={(e) => handleChange("title", e.target.value)}
            placeholder="e.g. Kitchen Rewire, Consumer Unit Upgrade, Garden Lighting Installation"
            required
          />
        </div>

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
          <div className="space-y-2">
            <Label htmlFor="job-location">Work Location</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="job-location"
                value={jobDetails?.location || ""}
                onChange={(e) => handleChange("location", e.target.value)}
                placeholder="If different from client address"
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="estimated-duration">Estimated Duration</Label>
            <div className="relative">
              <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              {jobDetails?.estimatedDuration === "Other" ? (
                <Input
                  id="estimated-duration-custom"
                  value={jobDetails?.customDuration || ""}
                  onChange={(e) => handleChange("customDuration", e.target.value)}
                  placeholder="Enter custom duration"
                  className="pl-10"
                />
              ) : (
                <Select
                  value={jobDetails?.estimatedDuration || ""}
                  onValueChange={(value) => handleChange("estimatedDuration", value)}
                >
                  <SelectTrigger className="pl-10">
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Half day">Half day</SelectItem>
                    <SelectItem value="1 day">1 day</SelectItem>
                    <SelectItem value="2 days">2 days</SelectItem>
                    <SelectItem value="3 days">3 days</SelectItem>
                    <SelectItem value="1 week">1 week</SelectItem>
                    <SelectItem value="2 weeks">2 weeks</SelectItem>
                    <SelectItem value="3 weeks">3 weeks</SelectItem>
                    <SelectItem value="1 month">1 month</SelectItem>
                    <SelectItem value="Other">Other...</SelectItem>
                  </SelectContent>
                </Select>
              )}
            </div>
          </div>
        </div>

        {/* Work Start Date */}
        <div className="space-y-2">
          <Label htmlFor="work-start-date">Proposed Start Date</Label>
          <div className="relative">
            <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="work-start-date"
              type="date"
              value={jobDetails?.workStartDate || ""}
              onChange={(e) => handleChange("workStartDate", e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

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