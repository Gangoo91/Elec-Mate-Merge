import { Sun, ClipboardCheck, Scale, BatteryCharging, SunMedium } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import { VideoList } from '@/components/study-centre/learning';
import { videos } from '@/data/study-centre/video-library';

const subsections = [
  {
    number: '6.1',
    title: 'Types of micro-renewables (6.1)',
    description:
      'Solar PV, micro-wind, micro-hydro, micro-CHP, heat pumps and battery storage — what each one is and how it ties into the install.',
    icon: Sun,
    href: '6-1',
  },
  {
    number: '6.2',
    title: 'Solar PV deep dive (6.1, 6.2)',
    description:
      'BS 7671 Section 712 in detail — DC isolation, anti-islanding, Type B RCDs, panel arrays, inverter selection, MCS install standards and G98 / G99 paperwork.',
    icon: SunMedium,
    href: '6-2',
  },
  {
    number: '6.3',
    title: 'Battery storage deep dive (6.1, 6.2)',
    description:
      'Lithium-ion vs lead-acid; BS 7671 Section 712 and Chapter 53 implications; G99 thresholds; fire safety and BS EN 62619; AC, DC and hybrid coupling topologies.',
    icon: BatteryCharging,
    href: '6-3',
  },
  {
    number: '6.4',
    title: 'Installation requirements (6.2)',
    description:
      'G98/G99 connection rules, MCS certification, BS 7671 Section 712 and EICR considerations for micro-generation — the general install framework across all renewable kit.',
    icon: ClipboardCheck,
    href: '6-4',
  },
  {
    number: '6.5',
    title: 'Advantages and disadvantages (6.3)',
    description:
      'Cost, payback, weather dependency, planning, grid impact and what to tell the customer who’s asking about it. Closes Module 3 with the hand-off into Module 4.',
    icon: Scale,
    href: '6-5',
  },
];

export default function Section6() {
  return (
    <SectionShell
      backTo=".."
      backLabel="Module 3"
      moduleNumber={3}
      sectionNumber={6}
      title="Micro-renewable energy"
      description="Solar PV, wind, hydro, CHP, heat pumps and batteries — the renewable kit you’ll be asked about more and more. Installation rules, MCS, BS 7671 712 and the trade-offs to talk through with customers. Aligned to LO6 of Unit 203."
      tone="emerald"
      subsectionsCount={subsections.length}
      prevSectionHref="../section5"
      prevSectionLabel="How electricity is supplied"
      aboveGrid={
        <div className="max-w-3xl space-y-3 pt-2">
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            Micro-renewables are the fastest-growing area of UK electrical work
            and the area customers ask the most questions about. Section 6 is the
            theory layer — what the kit is, what installation rules govern it,
            and what to actually say when a customer asks "is solar worth it?".
          </p>
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            Sub 6.1 introduces the six micro-renewable categories — solar PV,
            micro-wind, micro-hydro, micro-CHP, heat pumps, battery storage.
            Subs 6.2 and 6.3 are dedicated deep dives on the two technologies
            an apprentice is most likely to meet on site — solar PV
            (Section 712, DC isolation, MCS, panel arrays) and battery
            storage (lithium-ion vs lead-acid, BS EN 62619, fire safety,
            G99). Sub 6.4 covers the general installation framework —
            G98/G99 DNO notification, MCS certification, BS 7671 Section
            712, EICR considerations across all renewable kit. Sub 6.5
            closes Module 3 with the trade-offs — cost, payback, weather
            dependency, planning, grid impact — and the hand-off into
            Module 4.
          </p>
          <p className="text-white/80 leading-relaxed text-[14px] sm:text-[15px]">
            By the end you'll have the language and the framework to talk
            renewables sensibly with a customer, even before you've worked on
            your first PV install.
          </p>
        </div>
      }
      belowGrid={
        <VideoList
          title="Go deeper — inverters and batteries"
          videos={[
            videos.inverter,
            videos.leadAcidBatteries,
            videos.batteries,
          ]}
        />
      }
    >
      {subsections.map((subsection, index) => (
        <ModuleCard
          key={index}
          number={subsection.number}
          title={subsection.title}
          description={subsection.description}
          icon={subsection.icon}
          href={subsection.href}
        />
      ))}
    </SectionShell>
  );
}
