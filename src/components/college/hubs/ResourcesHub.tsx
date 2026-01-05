import { Card, CardContent } from "@/components/ui/card";
import { CollegeFeatureTile } from "@/components/college/CollegeFeatureTile";
import { CollegeSectionHeader } from "@/components/college/CollegeSectionHeader";
import { Button } from "@/components/ui/button";
import type { CollegeSection } from "@/pages/college/CollegeDashboard";
import { useCollege } from "@/contexts/CollegeContext";
import {
  FolderOpen,
  Library,
  Shield,
  Plug,
  Settings,
  Upload,
  FileCheck,
  AlertTriangle,
  Plus,
} from "lucide-react";

interface ResourcesHubProps {
  onNavigate: (section: CollegeSection) => void;
}

export function ResourcesHub({ onNavigate }: ResourcesHubProps) {
  const { teachingResources, staff } = useCollege();

  const totalResources = teachingResources.length;

  // Mock compliance data (would come from context in full implementation)
  const expiringCompliance = staff.filter(s => {
    if (!s.dbsExpiry) return false;
    const expiry = new Date(s.dbsExpiry);
    const threeMonths = new Date();
    threeMonths.setMonth(threeMonths.getMonth() + 3);
    return expiry <= threeMonths;
  }).length;

  const ltiPlatformsConnected = 0; // Would come from LTI state

  return (
    <div className="space-y-4 md:space-y-6 animate-fade-in">
      <CollegeSectionHeader
        title="Resources Hub"
        description="Document library, compliance and system settings"
        action={
          <Button className="gap-2 bg-elec-yellow hover:bg-elec-yellow/90 text-black">
            <Plus className="h-4 w-4" />
            Upload File
          </Button>
        }
      />

      {/* Quick Stats */}
      <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1 -mx-4 px-4 md:mx-0 md:px-0">
        <Card className="bg-elec-yellow/10 border-elec-yellow/20 shrink-0">
          <CardContent className="p-3 flex items-center gap-2">
            <Library className="h-4 w-4 text-elec-yellow" />
            <div>
              <p className="text-lg font-bold text-foreground">{totalResources}</p>
              <p className="text-xs text-muted-foreground">Resources</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-info/10 border-info/20 shrink-0">
          <CardContent className="p-3 flex items-center gap-2">
            <Plug className="h-4 w-4 text-info" />
            <div>
              <p className="text-lg font-bold text-foreground">{ltiPlatformsConnected}</p>
              <p className="text-xs text-muted-foreground">VLE Connected</p>
            </div>
          </CardContent>
        </Card>
        {expiringCompliance > 0 && (
          <Card className="bg-warning/10 border-warning/20 shrink-0">
            <CardContent className="p-3 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-warning" />
              <div>
                <p className="text-lg font-bold text-foreground">{expiringCompliance}</p>
                <p className="text-xs text-muted-foreground">Expiring</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Documents & Files */}
      <div>
        <h2 className="text-base md:text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
          <span className="w-1 h-5 bg-elec-yellow rounded-full"></span>
          Documents & Files
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <CollegeFeatureTile
            icon={Library}
            title="Document Library"
            description="Teaching resources & files"
            onClick={() => onNavigate("documentlibrary")}
            badge={`${totalResources} files`}
          />
          <CollegeFeatureTile
            icon={Shield}
            title="Compliance"
            description="Policies & staff documents"
            onClick={() => onNavigate("compliancedocs")}
            badge={expiringCompliance > 0 ? `${expiringCompliance} expiring` : 'All current'}
            badgeVariant={expiringCompliance > 0 ? "warning" : "success"}
          />
        </div>
      </div>

      {/* Settings & Integration */}
      <div>
        <h2 className="text-base md:text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
          <span className="w-1 h-5 bg-info rounded-full"></span>
          Settings & Integration
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <CollegeFeatureTile
            icon={Plug}
            title="VLE Integration"
            description="Canvas, Moodle & more"
            onClick={() => onNavigate("ltisettings")}
            badge={ltiPlatformsConnected > 0 ? `${ltiPlatformsConnected} connected` : 'Not connected'}
            badgeVariant={ltiPlatformsConnected > 0 ? "success" : "info"}
          />
          <CollegeFeatureTile
            icon={Settings}
            title="Settings"
            description="Institution preferences"
            onClick={() => onNavigate("collegesettings")}
          />
        </div>
      </div>

      {/* Compliance Alert */}
      {expiringCompliance > 0 && (
        <div>
          <h2 className="text-base md:text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
            <span className="w-1 h-5 bg-warning rounded-full"></span>
            Needs Attention
          </h2>
          <CollegeFeatureTile
            icon={AlertTriangle}
            title="Compliance Attention Needed"
            description="DBS checks or documents expiring within 3 months"
            onClick={() => onNavigate("compliancedocs")}
            badge={`${expiringCompliance} expiring`}
            badgeVariant="warning"
          />
        </div>
      )}

      {/* Quick Actions */}
      <div>
        <h2 className="text-base md:text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
          <span className="w-1 h-5 bg-elec-yellow rounded-full"></span>
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <CollegeFeatureTile
            icon={Upload}
            title="Upload File"
            description="Add resource"
            onClick={() => onNavigate("documentlibrary")}
            compact
          />
          <CollegeFeatureTile
            icon={FileCheck}
            title="Check Compliance"
            description="Review docs"
            onClick={() => onNavigate("compliancedocs")}
            compact
          />
          <CollegeFeatureTile
            icon={Plug}
            title="Connect VLE"
            description="LTI setup"
            onClick={() => onNavigate("ltisettings")}
            compact
          />
          <CollegeFeatureTile
            icon={Settings}
            title="Settings"
            description="Configure"
            onClick={() => onNavigate("collegesettings")}
            compact
          />
        </div>
      </div>
    </div>
  );
}
