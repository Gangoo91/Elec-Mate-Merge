import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  FileCheck,
  FileText,
  Wrench,
  Bell,
  Zap,
  Lightbulb,
  Plug,
  Sun,
  ChevronRight,
  Sparkles
} from "lucide-react";

interface CertificateType {
  id: string;
  title: string;
  fullName: string;
  description: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  borderColor: string;
  standard?: string;
  isNew?: boolean;
}

interface CertificateGroup {
  title: string;
  description: string;
  certificates: CertificateType[];
}

export default function NewCertificate() {
  const navigate = useNavigate();

  const certificateGroups: CertificateGroup[] = [
    {
      title: "Electrical Installation",
      description: "BS 7671 certificates for electrical installations",
      certificates: [
        {
          id: "eicr",
          title: "EICR",
          fullName: "Electrical Installation Condition Report",
          description: "Periodic inspection and testing of existing installations",
          icon: FileCheck,
          color: "text-blue-500",
          bgColor: "bg-blue-500/10",
          borderColor: "border-blue-500/30 hover:border-blue-500",
          standard: "BS 7671"
        },
        {
          id: "eic",
          title: "EIC",
          fullName: "Electrical Installation Certificate",
          description: "New installations or major alterations/additions",
          icon: FileText,
          color: "text-green-500",
          bgColor: "bg-green-500/10",
          borderColor: "border-green-500/30 hover:border-green-500",
          standard: "BS 7671"
        },
        {
          id: "minor-works",
          title: "Minor Works",
          fullName: "Minor Electrical Installation Works Certificate",
          description: "Small additions to existing circuits",
          icon: Wrench,
          color: "text-orange-500",
          bgColor: "bg-orange-500/10",
          borderColor: "border-orange-500/30 hover:border-orange-500",
          standard: "BS 7671"
        }
      ]
    },
    {
      title: "Fire & Safety Systems",
      description: "Fire alarm and emergency lighting certificates",
      certificates: [
        {
          id: "fire-alarm",
          title: "Fire Alarm",
          fullName: "Fire Alarm System Certificate",
          description: "Installation, commissioning, and periodic testing",
          icon: Bell,
          color: "text-red-500",
          bgColor: "bg-red-500/10",
          borderColor: "border-red-500/30 hover:border-red-500",
          standard: "BS 5839",
          isNew: true
        },
        {
          id: "emergency-lighting",
          title: "Emergency Lighting",
          fullName: "Emergency Lighting Certificate",
          description: "Installation and periodic inspection",
          icon: Lightbulb,
          color: "text-amber-500",
          bgColor: "bg-amber-500/10",
          borderColor: "border-amber-500/30 hover:border-amber-500",
          standard: "BS 5266",
          isNew: true
        }
      ]
    },
    {
      title: "Specialist Certificates",
      description: "EV charging and solar PV installations",
      certificates: [
        {
          id: "ev-charging",
          title: "EV Charging",
          fullName: "EV Charging Point Certificate",
          description: "Electric vehicle charger installation",
          icon: Zap,
          color: "text-emerald-500",
          bgColor: "bg-emerald-500/10",
          borderColor: "border-emerald-500/30 hover:border-emerald-500",
          standard: "IET CoP",
          isNew: true
        },
        {
          id: "solar-pv",
          title: "Solar PV",
          fullName: "Solar PV Installation Certificate",
          description: "MCS-certified solar panel installations",
          icon: Sun,
          color: "text-amber-500",
          bgColor: "bg-amber-500/10",
          borderColor: "border-amber-500/30 hover:border-amber-500",
          standard: "MCS / BS EN 62446",
          isNew: true
        }
        // PAT Testing archived - code preserved in PATTestingCertificate.tsx
        // {
        //   id: "pat-testing",
        //   title: "PAT Testing",
        //   fullName: "Portable Appliance Test Register",
        //   description: "Portable appliance inspection and testing",
        //   icon: Plug,
        //   color: "text-sky-500",
        //   bgColor: "bg-sky-500/10",
        //   borderColor: "border-sky-500/30 hover:border-sky-500",
        //   standard: "IET CoP",
        //   isNew: true
        // }
      ]
    }
  ];

  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <div className="bg-card border-b border-border sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <Button
            variant="ghost"
            className="text-muted-foreground hover:text-foreground p-0 mb-3 h-11 touch-manipulation active:scale-[0.98]"
            onClick={() => navigate("/electrician/inspection-testing")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-elec-yellow/10 flex items-center justify-center">
              <FileText className="h-5 w-5 text-elec-yellow" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-foreground">New Certificate</h1>
              <p className="text-sm text-muted-foreground">
                Choose the type of certificate to create
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 py-6 sm:px-6 lg:px-8 pb-20 sm:pb-8">
        <div className="space-y-8">
          {certificateGroups.map((group) => (
            <div key={group.title}>
              {/* Group Header */}
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-foreground">{group.title}</h2>
                <p className="text-sm text-muted-foreground">{group.description}</p>
              </div>

              {/* Certificates Grid */}
              <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {group.certificates.map((cert) => (
                  <Card
                    key={cert.id}
                    className={`cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] border touch-manipulation ${cert.borderColor} bg-card/50 backdrop-blur-sm`}
                    onClick={() => navigate(`/electrician/inspection-testing/${cert.id}/new`)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        {/* Icon */}
                        <div className={`w-12 h-12 rounded-xl ${cert.bgColor} flex items-center justify-center flex-shrink-0`}>
                          <cert.icon className={`h-6 w-6 ${cert.color}`} />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-foreground">{cert.title}</h3>
                            {cert.isNew && (
                              <Badge className="bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30 text-[10px] px-1.5 py-0">
                                <Sparkles className="w-2.5 h-2.5 mr-0.5" />
                                New
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                            {cert.description}
                          </p>
                          <div className="flex items-center justify-between">
                            {cert.standard && (
                              <Badge variant="outline" className="text-[10px] px-1.5 py-0 bg-muted/50">
                                {cert.standard}
                              </Badge>
                            )}
                            <ChevronRight className="w-4 h-4 text-muted-foreground" />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Tips */}
        <div className="mt-8 p-4 rounded-xl bg-muted/30 border border-border">
          <h3 className="font-medium text-foreground mb-2 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-elec-yellow" />
            Quick Tips
          </h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• All certificates auto-save as drafts</li>
            <li>• Use your saved inspector profile to pre-fill details</li>
            <li>• Generate PDFs and create quotes/invoices directly</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
