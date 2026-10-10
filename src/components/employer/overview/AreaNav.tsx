/**
 * The six areas of the Employer Hub in the top bar of every inner page
 * (10 Oct 2026, Andrew: "make it easier to get around"). Jump from Finance to
 * Safety without going back to the Overview first. Wide screens only; on a
 * phone the bar keeps Back and the page title.
 */
import { cn } from '@/lib/utils';
import {
  ClientsIcon,
  DocsIcon,
  FinanceIcon,
  JobsIcon,
  PeopleIcon,
  SafetyIcon,
} from '@/components/employer/overview/HubIcons';

const AREAS = [
  { section: 'peoplehub', name: 'People', Icon: PeopleIcon },
  { section: 'jobshub', name: 'Jobs', Icon: JobsIcon },
  { section: 'financehub', name: 'Finance', Icon: FinanceIcon },
  { section: 'safetyhub', name: 'Safety', Icon: SafetyIcon },
  { section: 'clientshub', name: 'Clients', Icon: ClientsIcon },
  { section: 'smartdocs', name: 'Smart Docs', Icon: DocsIcon },
] as const;

export function AreaNav({
  current,
  onGo,
  className,
}: {
  /** The area hub the open page belongs to, e.g. 'financehub'. */
  current: string | null;
  onGo: (section: string) => void;
  className?: string;
}) {
  return (
    <nav aria-label="Hub areas" className={cn('items-center gap-0.5', className)}>
      {AREAS.map(({ section, name, Icon }) => {
        const on = current === section;
        return (
          <button
            key={section}
            type="button"
            onClick={() => onGo(section)}
            aria-current={on ? 'page' : undefined}
            className={cn(
              'relative flex h-11 items-center gap-2 rounded-xl px-3 text-[13.5px] font-semibold text-white transition-colors touch-manipulation hover:bg-white/[0.06]',
              on && 'bg-white/[0.08]'
            )}
          >
            <Icon className="h-5 w-5" />
            {name}
            {on && (
              <span
                aria-hidden
                className="absolute inset-x-3 -bottom-[6px] h-[2px] rounded-full bg-elec-yellow"
              />
            )}
          </button>
        );
      })}
    </nav>
  );
}
