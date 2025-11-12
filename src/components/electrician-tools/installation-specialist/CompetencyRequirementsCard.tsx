import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Shield, Award } from "lucide-react";

interface CompetencyRequirementsCardProps {
  competencyRequirements: {
    minimumQualifications: string[];
    supervision?: string;
    additionalTraining?: string[];
  };
}

export const CompetencyRequirementsCard = ({ competencyRequirements }: CompetencyRequirementsCardProps) => {
  const { minimumQualifications, supervision, additionalTraining } = competencyRequirements;

  if (!minimumQualifications || minimumQualifications.length === 0) {
    return null;
  }

  return (
    <Card className="border-blue-500/20 bg-gradient-to-br from-blue-500/5 to-background shadow-lg">
      <CardContent className="p-5 sm:p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-blue-500/10">
            <GraduationCap className="h-5 w-5 text-blue-400" />
          </div>
          <h3 className="font-bold text-lg">Competency Requirements</h3>
        </div>

        {/* Minimum Qualifications */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Award className="h-4 w-4 text-blue-400" />
            <h4 className="font-semibold text-sm text-muted-foreground">Minimum Qualifications</h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {minimumQualifications.map((qual, index) => (
              <Badge 
                key={index}
                className="bg-gradient-to-r from-blue-500/20 to-blue-600/20 text-foreground border-blue-500/40 px-3 py-1 text-xs font-medium"
              >
                ✓ {qual}
              </Badge>
            ))}
          </div>
        </div>

        {/* Supervision Requirements */}
        {supervision && (
          <div className="mb-4 bg-amber-500/10 border border-amber-500/30 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <Shield className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-sm text-amber-400 mb-1">Supervision</h4>
                <p className="text-sm text-foreground">{supervision}</p>
              </div>
            </div>
          </div>
        )}

        {/* Additional Training */}
        {additionalTraining && additionalTraining.length > 0 && (
          <div>
            <h4 className="font-semibold text-sm text-muted-foreground mb-2">Additional Training / Registration</h4>
            <ul className="space-y-2">
              {additionalTraining.map((training, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <span className="text-blue-400 mt-0.5">•</span>
                  <span className="text-foreground">{training}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Footer Note */}
        <div className="mt-4 pt-3 border-t border-border/50">
          <p className="text-xs text-muted-foreground">
            <strong>Note:</strong> All work must comply with Electricity at Work Regulations 1989 (Regulation 16). 
            Persons must be competent to prevent danger and injury.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
