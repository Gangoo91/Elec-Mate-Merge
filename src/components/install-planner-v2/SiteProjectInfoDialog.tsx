import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { InstallPlanDataV2, SiteInfo, ProjectInfo } from "./types";

interface SiteProjectInfoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  planData: InstallPlanDataV2;
  onSave: (siteInfo: SiteInfo, projectInfo: ProjectInfo) => void;
}

export const SiteProjectInfoDialog = ({
  open,
  onOpenChange,
  planData,
  onSave,
}: SiteProjectInfoDialogProps) => {
  const [siteInfo, setSiteInfo] = useState<SiteInfo>(
    planData.siteInfo || {}
  );
  const [projectInfo, setProjectInfo] = useState<ProjectInfo>(
    planData.projectInfo || {}
  );

  const handleSave = () => {
    onSave(siteInfo, projectInfo);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Site & Project Information</DialogTitle>
          <DialogDescription>
            Add optional site and project details for the PDF installation plan
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Site Information */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Site Information</h3>
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="propertyAddress">Property Address</Label>
                <Input
                  id="propertyAddress"
                  placeholder="123 High Street, London"
                  value={siteInfo.propertyAddress || ""}
                  onChange={(e) =>
                    setSiteInfo({ ...siteInfo, propertyAddress: e.target.value })
                  }
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="postcode">Postcode</Label>
                  <Input
                    id="postcode"
                    placeholder="SW1A 1AA"
                    value={siteInfo.postcode || ""}
                    onChange={(e) =>
                      setSiteInfo({ ...siteInfo, postcode: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="clientName">Client Name</Label>
                  <Input
                    id="clientName"
                    placeholder="John Smith"
                    value={siteInfo.clientName || ""}
                    onChange={(e) =>
                      setSiteInfo({ ...siteInfo, clientName: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactNumber">Contact Number</Label>
                <Input
                  id="contactNumber"
                  placeholder="07700 900000"
                  value={siteInfo.contactNumber || ""}
                  onChange={(e) =>
                    setSiteInfo({ ...siteInfo, contactNumber: e.target.value })
                  }
                />
              </div>
            </div>
          </div>

          {/* Project Information */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Project Planning</h3>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="plannedStartDate">Planned Start Date</Label>
                  <Input
                    id="plannedStartDate"
                    type="date"
                    value={projectInfo.plannedStartDate || ""}
                    onChange={(e) =>
                      setProjectInfo({
                        ...projectInfo,
                        plannedStartDate: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="estimatedDuration">Estimated Duration</Label>
                  <Input
                    id="estimatedDuration"
                    placeholder="2 days"
                    value={projectInfo.estimatedDuration || ""}
                    onChange={(e) =>
                      setProjectInfo({
                        ...projectInfo,
                        estimatedDuration: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="leadElectrician">Lead Electrician</Label>
                  <Input
                    id="leadElectrician"
                    placeholder="Jane Doe"
                    value={projectInfo.leadElectrician || ""}
                    onChange={(e) =>
                      setProjectInfo({
                        ...projectInfo,
                        leadElectrician: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="registrationNumber">Registration Number</Label>
                  <Input
                    id="registrationNumber"
                    placeholder="NICEIC 12345"
                    value={projectInfo.registrationNumber || ""}
                    onChange={(e) =>
                      setProjectInfo({
                        ...projectInfo,
                        registrationNumber: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save & Continue</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
