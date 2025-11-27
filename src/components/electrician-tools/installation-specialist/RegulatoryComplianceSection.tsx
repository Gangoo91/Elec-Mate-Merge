import { Card } from "@/components/ui/card";
import { BookOpen } from "lucide-react";

interface RegulatoryReference {
  number: string;
  description: string;
}

interface RegulatoryComplianceSectionProps {
  regulatoryReferences?: RegulatoryReference[];
  stepBsReferences?: string[];
  sectionNumber?: number;
}

export const RegulatoryComplianceSection = ({
  regulatoryReferences = [],
  stepBsReferences = [],
  sectionNumber = 6
}: RegulatoryComplianceSectionProps) => {
  // Parse step BS references (format: "BS 7671 Reg 132.10 - Safe isolation")
  const parsedStepReferences: RegulatoryReference[] = stepBsReferences
    .map(ref => {
      const match = ref.match(/(?:BS 7671 Reg |Regulation )?(\d+\.?\d*\.?\d*\.?\d*)\s*[-–—]\s*(.+)/i);
      if (match) {
        return {
          number: match[1],
          description: match[2].trim()
        };
      }
      // Fallback: use entire string as description
      return {
        number: ref.split(/[-–—]/)[0].trim(),
        description: ref.split(/[-–—]/)[1]?.trim() || ref
      };
    })
    .filter(ref => ref.number && ref.description);

  // Merge and deduplicate by regulation number
  const allReferences = [...regulatoryReferences, ...parsedStepReferences];
  const uniqueReferences = Array.from(
    new Map(allReferences.map(ref => [ref.number, ref])).values()
  );

  // Sort by regulation number
  const sortedReferences = uniqueReferences.sort((a, b) => {
    const aNum = parseFloat(a.number.replace(/[^\d.]/g, ''));
    const bNum = parseFloat(b.number.replace(/[^\d.]/g, ''));
    return aNum - bNum;
  });

  if (sortedReferences.length === 0) {
    return null;
  }

  return (
    <div id="compliance" className="space-y-4">
      {/* Gold Section Header */}
      <div className="border-b-2 border-yellow-500/50 pb-2">
        <h3 className="text-sm font-bold text-yellow-500 uppercase tracking-wider">
          Section {sectionNumber} — Applicable BS 7671 Regulations
        </h3>
      </div>

      {/* Green Container Card */}
      <Card className="bg-gradient-to-br from-green-500/10 to-background border-green-500/30 p-5 sm:p-6">
        {/* Inner Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2 rounded-lg bg-green-500/10">
            <BookOpen className="h-5 w-5 text-green-400" />
          </div>
          <h4 className="text-base font-semibold text-foreground uppercase tracking-wide">
            Regulatory Compliance References
          </h4>
        </div>

        {/* Responsive Grid of Regulation Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {sortedReferences.map((ref, index) => (
            <div
              key={index}
              className="bg-card border border-border/50 rounded-lg p-4 border-l-4 border-l-green-500 hover:bg-card/80 transition-colors"
            >
              <div className="font-bold text-foreground text-base mb-2">
                {ref.number}
              </div>
              <div className="text-sm text-foreground leading-relaxed">
                {ref.description}
              </div>
            </div>
          ))}
        </div>

        {/* Total count badge */}
        <div className="mt-4 pt-4 border-t border-green-500/20">
          <p className="text-sm text-foreground text-center">
            <span className="font-semibold">{sortedReferences.length}</span> BS 7671 regulations referenced in this installation method
          </p>
        </div>
      </Card>
    </div>
  );
};
