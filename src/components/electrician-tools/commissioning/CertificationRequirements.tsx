import { FileText, CheckSquare, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { CertificationRequirements as CertificationRequirementsType } from "@/types/commissioning-response";

interface CertificationRequirementsProps {
  certification: CertificationRequirementsType;
}

const CertificationRequirements = ({ certification }: CertificationRequirementsProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <FileText className="h-5 w-5 text-purple-400" />
          Certification Requirements
        </h3>
        <Badge variant="outline" className="text-xs">
          {certification.certificateType}
        </Badge>
      </div>

      {/* Required Schedules */}
      {certification.requiredSchedules && certification.requiredSchedules.length > 0 && (
        <div className="space-y-2">
          <div className="text-sm font-medium text-foreground flex items-center gap-2">
            <CheckSquare className="h-4 w-4 text-green-400" />
            Required Schedules
          </div>
          <ul className="space-y-2">
            {certification.requiredSchedules.map((schedule, index) => (
              <li
                key={index}
                className="flex items-center gap-2 p-2 rounded-lg bg-elec-gray border border-elec-yellow/20 text-sm text-muted-foreground"
              >
                <div className="h-2 w-2 rounded-full bg-purple-400 shrink-0" />
                {schedule}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Required Data Fields */}
      {certification.requiredData && certification.requiredData.length > 0 && (
        <div className="space-y-2">
          <div className="text-sm font-medium text-foreground">Required Data Fields</div>
          <Accordion type="single" collapsible className="space-y-2">
            {certification.requiredData.map((data, index) => (
              <AccordionItem
                key={index}
                value={`data-${index}`}
                className="border border-elec-yellow/20 rounded-lg overflow-hidden bg-elec-gray"
              >
                <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-elec-yellow/5 text-sm">
                  <div className="flex items-center gap-2 text-left">
                    <span className="font-medium text-foreground">{data.field}</span>
                    <Badge variant="outline" className="text-xs shrink-0">
                      {data.regulation}
                    </Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-3">
                  <p className="text-xs text-muted-foreground">{data.description}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      )}

      {/* Next Inspection */}
      {certification.nextInspection && (
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
          <div className="flex items-center gap-2 text-blue-300 text-sm font-medium mb-1">
            <Info className="h-4 w-4" />
            Next Inspection
          </div>
          <p className="text-xs text-muted-foreground">{certification.nextInspection}</p>
        </div>
      )}

      {/* Additional Notes */}
      {certification.additionalNotes && certification.additionalNotes.length > 0 && (
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
          <div className="text-sm font-medium text-amber-300 mb-2">Additional Notes</div>
          <ul className="space-y-1 text-xs text-muted-foreground">
            {certification.additionalNotes.map((note, index) => (
              <li key={index}>• {note}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CertificationRequirements;
