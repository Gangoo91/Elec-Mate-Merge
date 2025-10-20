import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SignaturePad } from "@/components/electrician-tools/site-safety/common/SignaturePad";
import { PenTool } from "lucide-react";

interface MaintenanceSignatureSectionProps {
  technicianSignature: {
    name: string;
    date: string;
    signatureDataUrl: string;
  };
  supervisorSignature: {
    name: string;
    date: string;
    signatureDataUrl: string;
  };
  onTechnicianChange: (field: 'name' | 'date' | 'signature', value: string) => void;
  onSupervisorChange: (field: 'name' | 'date' | 'signature', value: string) => void;
}

export const MaintenanceSignatureSection = ({
  technicianSignature,
  supervisorSignature,
  onTechnicianChange,
  onSupervisorChange
}: MaintenanceSignatureSectionProps) => {
  return (
    <Card className="border-elec-yellow/30 bg-elec-dark">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-elec-yellow">
          <PenTool className="h-5 w-5" />
          Sign-Off Required
        </CardTitle>
        <CardDescription>
          Both signatures required before PDF can be downloaded. Digital signatures are legally binding.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <SignaturePad
          label="Work Completed By (Technician)"
          name={technicianSignature.name}
          date={technicianSignature.date}
          signatureDataUrl={technicianSignature.signatureDataUrl}
          onNameChange={(value) => onTechnicianChange('name', value)}
          onDateChange={(value) => onTechnicianChange('date', value)}
          onSignatureChange={(value) => onTechnicianChange('signature', value)}
        />

        <SignaturePad
          label="Verified & Approved By (Supervisor/AP)"
          name={supervisorSignature.name}
          date={supervisorSignature.date}
          signatureDataUrl={supervisorSignature.signatureDataUrl}
          onNameChange={(value) => onSupervisorChange('name', value)}
          onDateChange={(value) => onSupervisorChange('date', value)}
          onSignatureChange={(value) => onSupervisorChange('signature', value)}
        />

        <div className="text-xs text-muted-foreground bg-elec-gray/30 p-3 rounded-md border border-elec-yellow/20">
          <p className="font-semibold mb-1">Legal Notice:</p>
          <p>By signing above, you confirm this maintenance work was completed in accordance with BS 7671:2018+A3:2024 standards. Signatures are timestamped and embedded in the PDF for audit trail purposes.</p>
        </div>
      </CardContent>
    </Card>
  );
};
