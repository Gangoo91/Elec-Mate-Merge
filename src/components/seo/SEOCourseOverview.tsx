import { Clock, BarChart3, BookOpen, Users, Award } from 'lucide-react';

interface SEOCourseOverviewProps {
  duration: string;
  level: string;
  prerequisites?: string;
  modules?: number;
  certification?: string;
  whoIsItFor?: string;
}

export function SEOCourseOverview({
  duration,
  level,
  prerequisites,
  modules,
  certification,
  whoIsItFor,
}: SEOCourseOverviewProps) {
  const facts = [
    { icon: Clock, label: 'Duration', value: duration },
    { icon: BarChart3, label: 'Level', value: level },
    ...(prerequisites ? [{ icon: BookOpen, label: 'Prerequisites', value: prerequisites }] : []),
    ...(modules ? [{ icon: Users, label: 'Modules', value: `${modules} modules` }] : []),
    ...(certification ? [{ icon: Award, label: 'Certification', value: certification }] : []),
  ];

  return (
    <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6">
      <h3 className="font-bold text-white text-lg mb-4">Course Overview</h3>
      <div className="grid gap-4 sm:grid-cols-2">
        {facts.map((fact) => (
          <div key={fact.label} className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center shrink-0">
              <fact.icon className="w-4 h-4 text-yellow-400" />
            </div>
            <div>
              <div className="text-xs font-medium text-yellow-400 uppercase tracking-wider">
                {fact.label}
              </div>
              <div className="text-sm text-white mt-0.5">{fact.value}</div>
            </div>
          </div>
        ))}
      </div>
      {whoIsItFor && (
        <div className="mt-5 pt-5 border-t border-white/10">
          <h4 className="text-sm font-semibold text-white mb-2">Who Is This For?</h4>
          <p className="text-sm text-white leading-relaxed">{whoIsItFor}</p>
        </div>
      )}
    </div>
  );
}
