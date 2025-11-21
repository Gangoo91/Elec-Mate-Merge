import { FileText, CheckSquare, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { CertificationRequirements as CertificationRequirementsType } from "@/types/commissioning-response";

interface CertificationRequirementsProps {
  certification: CertificationRequirementsType;
}

const CertificationRequirements = ({ certification }: CertificationRequirementsProps) => {
  return (
    <div className="space-y-5 sm:space-y-4">
      {/* Mobile: Icon centered on top, Desktop: Icon on left */}
      <div className="flex flex-col sm:flex-row items-center sm:items-center justify-center sm:justify-between gap-3 sm:gap-2">
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-2">
          <FileText className="h-8 w-8 sm:h-5 sm:w-5 text-purple-400" />
          <h3 className="text-xl sm:text-lg font-semibold text-foreground text-center sm:text-left">
            Certification Requirements
          </h3>
        </div>
        <Badge variant="outline" className="text-sm sm:text-xs px-3 py-1 sm:px-2 sm:py-0.5">
          {certification.certificateType}
        </Badge>
      </div>

      {/* Required Schedules */}
      {certification.requiredSchedules && certification.requiredSchedules.length > 0 && (
        <div className="space-y-3 sm:space-y-2">
          <div className="text-base sm:text-sm font-semibold sm:font-medium text-foreground flex items-center justify-center sm:justify-start gap-2">
            <CheckSquare className="h-5 w-5 sm:h-4 sm:w-4 text-green-400" />
            Required Schedules
          </div>
          <ul className="space-y-3 sm:space-y-2">
            {certification.requiredSchedules.map((schedule, index) => (
              <li
                key={index}
                className="flex items-center justify-center sm:justify-start gap-3 sm:gap-2 p-4 sm:p-2 rounded-lg bg-elec-gray border-2 sm:border border-elec-yellow/20 text-base sm:text-sm text-muted-foreground text-center sm:text-left"
              >
                <div className="h-3 w-3 sm:h-2 sm:w-2 rounded-full bg-purple-400 shrink-0" />
                {schedule}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Required Data Fields */}
      {certification.requiredData && certification.requiredData.length > 0 && (
        <div className="space-y-3 sm:space-y-2">
          <div className="text-base sm:text-sm font-semibold sm:font-medium text-foreground text-center sm:text-left">Required Data Fields</div>
          <Accordion type="single" collapsible className="space-y-3 sm:space-y-2">
            {certification.requiredData.map((data, index) => (
              <AccordionItem
                key={index}
                value={`data-${index}`}
                className="border-2 sm:border border-elec-yellow/20 rounded-lg overflow-hidden bg-elec-gray"
              >
                <AccordionTrigger className="px-4 sm:px-4 py-4 sm:py-3 hover:no-underline hover:bg-elec-yellow/5 text-base sm:text-sm">
                  <div className="flex flex-col sm:flex-row items-center sm:items-center gap-2 text-center sm:text-left w-full">
                    <span className="font-semibold sm:font-medium text-foreground">{data.field}</span>
                    <Badge variant="outline" className="text-sm sm:text-xs shrink-0 px-3 py-1 sm:px-2 sm:py-0.5">
                      {data.regulation}
                    </Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4 sm:pb-3 text-center sm:text-left">
                  <p className="text-sm sm:text-xs text-muted-foreground">{data.description}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      )}

      {/* Next Inspection */}
      {certification.nextInspection && (
        <div className="bg-blue-500/10 border-2 sm:border border-blue-500/20 rounded-lg p-4 sm:p-3 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 text-blue-300 text-base sm:text-sm font-semibold sm:font-medium mb-2 sm:mb-1">
            <Info className="h-5 w-5 sm:h-4 sm:w-4" />
            Next Inspection
          </div>
          <p className="text-sm sm:text-xs text-muted-foreground">{certification.nextInspection}</p>
        </div>
      )}

      {/* Additional Notes */}
      {certification.additionalNotes && (
        <div className="bg-amber-500/10 border-2 sm:border border-amber-500/20 rounded-lg p-4 sm:p-3 text-center sm:text-left">
          <div className="text-base sm:text-sm font-semibold sm:font-medium text-amber-300 mb-2">Additional Notes</div>
          {Array.isArray(certification.additionalNotes) ? (
            <ul className="space-y-2 sm:space-y-1 text-sm sm:text-xs text-muted-foreground">
              {certification.additionalNotes.map((note, index) => (
                <li key={index}>• {note}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm sm:text-xs text-muted-foreground">{certification.additionalNotes}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CertificationRequirements;
