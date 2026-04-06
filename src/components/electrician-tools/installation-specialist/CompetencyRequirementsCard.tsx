import { GraduationCap, Shield, Award } from 'lucide-react';

interface CompetencyRequirementsCardProps {
  competencyRequirements: {
    minimumQualifications: string[];
    supervision?: string;
    additionalTraining?: string[];
  };
}

export const CompetencyRequirementsCard = ({
  competencyRequirements,
}: CompetencyRequirementsCardProps) => {
  const { minimumQualifications, supervision, additionalTraining } = competencyRequirements;

  if (!minimumQualifications || minimumQualifications.length === 0) {
    return null;
  }

  return (
    <div className="rounded-xl bg-white/[0.03] border border-white/[0.08] p-4">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
          <GraduationCap className="h-5 w-5 text-blue-400" />
        </div>
        <h3 className="font-bold text-lg text-white">Competency Requirements</h3>
      </div>

      {/* Minimum Qualifications */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <Award className="h-4 w-4 text-blue-400" />
          <h4 className="font-semibold text-sm text-white">Minimum Qualifications</h4>
        </div>
        <div className="flex flex-wrap gap-2">
          {minimumQualifications.map((qual, index) => (
            <span
              key={index}
              className="inline-flex items-center rounded-lg bg-blue-500/10 border border-blue-500/20 px-3 py-1 text-xs font-medium text-white"
            >
              ✓ {qual}
            </span>
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
              <p className="text-sm text-white">{supervision}</p>
            </div>
          </div>
        </div>
      )}

      {/* Additional Training */}
      {additionalTraining && additionalTraining.length > 0 && (
        <div>
          <h4 className="font-semibold text-sm text-white mb-2">
            Additional Training / Registration
          </h4>
          <ul className="space-y-2">
            {additionalTraining.map((training, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <span className="text-blue-400 mt-0.5">•</span>
                <span className="text-white">{training}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Footer Note */}
      <div className="mt-4 pt-3 border-t border-white/[0.08]">
        <p className="text-xs text-white">
          <strong>Note:</strong> All work must comply with Electricity at Work Regulations 1989
          (Regulation 16). Persons must be competent to prevent danger and injury.
        </p>
      </div>
    </div>
  );
};
