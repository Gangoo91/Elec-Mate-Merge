
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { JobDetailsProps } from "../types";

const JobDetails = ({ 
  formData, 
  jobType, 
  setJobType,
  handleInputChange, 
  handleSelectChange, 
  isMobile 
}: JobDetailsProps) => {
  return (
    <Card className="border-elec-yellow/20">
      <CardHeader>
        <CardTitle>Job Details</CardTitle>
        <CardDescription>Customize the scope of work based on project requirements</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-2">
            <Label htmlFor="jobType">Job Type</Label>
            <Select 
              value={jobType} 
              onValueChange={(value) => setJobType(value)}
            >
              <SelectTrigger className={isMobile ? "h-12 text-base" : ""}>
                <SelectValue placeholder="Select job type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rewire">Full House Rewire</SelectItem>
                <SelectItem value="eicr">EICR</SelectItem>
                <SelectItem value="consumer_unit">Consumer Unit Replacement</SelectItem>
                <SelectItem value="ev_charger">EV Charger Installation</SelectItem>
                <SelectItem value="lighting">Lighting Installation</SelectItem>
                <SelectItem value="smart_home">Smart Home Installation</SelectItem>
                <SelectItem value="fire_alarm">Fire Alarm System</SelectItem>
                <SelectItem value="maintenance">Electrical Maintenance Contract</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="propertyType">Property Type</Label>
            <Select 
              value={formData.propertyType} 
              onValueChange={(value) => handleSelectChange("propertyType", value)}
            >
              <SelectTrigger className={isMobile ? "h-12 text-base" : ""}>
                <SelectValue placeholder="Select property type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="house">House</SelectItem>
                <SelectItem value="flat">Flat</SelectItem>
                <SelectItem value="bungalow">Bungalow</SelectItem>
                <SelectItem value="commercial">Commercial Property</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="bedrooms">Number of Bedrooms</Label>
              <Select 
                value={formData.bedrooms} 
                onValueChange={(value) => handleSelectChange("bedrooms", value)}
              >
                <SelectTrigger className={isMobile ? "h-12 text-base" : ""}>
                  <SelectValue placeholder="Select number" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4">4</SelectItem>
                  <SelectItem value="5">5+</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="floors">Number of Floors</Label>
              <Select 
                value={formData.floors} 
                onValueChange={(value) => handleSelectChange("floors", value)}
              >
                <SelectTrigger className={isMobile ? "h-12 text-base" : ""}>
                  <SelectValue placeholder="Select number" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4">4+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="scopeOfWork">Scope of Work</Label>
          <Textarea 
            id="scopeOfWork" 
            name="scopeOfWork"
            value={formData.scopeOfWork}
            onChange={handleInputChange}
            placeholder="Describe the work to be carried out in detail..."
            rows={3}
            className={isMobile ? "min-h-[100px] text-base" : ""}
          />
          <p className="text-xs text-muted-foreground mt-1">Leave blank to auto-generate from job details</p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="additionalRequirements">Additional Requirements</Label>
          <Textarea 
            id="additionalRequirements" 
            name="additionalRequirements"
            value={formData.additionalRequirements}
            onChange={handleInputChange}
            placeholder="Any special requirements or conditions..."
            rows={2}
            className={isMobile ? "min-h-[80px] text-base" : ""}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default JobDetails;
