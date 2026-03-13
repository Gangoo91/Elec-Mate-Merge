import { BookOpen } from 'lucide-react';
import type { ReferencesSection as ReferencesSectionType } from '@/types/safety-template';

interface Props {
  section: ReferencesSectionType;
  mode: 'preview' | 'edit';
}

export function ReferencesSection({ section }: Props) {
  // References are always read-only
  return (
    <div className="flex flex-wrap gap-2">
      {section.items.map((ref, i) => (
        <div
          key={i}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-amber-500/10 border border-amber-500/20"
        >
          <BookOpen className="h-3.5 w-3.5 text-amber-400 flex-shrink-0" />
          <div>
            <p className="text-[11px] font-bold text-amber-400">{ref.code}</p>
            {ref.description && <p className="text-[10px] text-white">{ref.description}</p>}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ReferencesSection;
