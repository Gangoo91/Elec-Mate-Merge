/**
 * Final-assessment module page: "the mock exam for this course" (10 Oct 2026).
 *
 * 24 short courses ended in the same hand-built page: purple washes and
 * gradient hairlines that belonged to no palette, a 4-cell stat strip, and
 * three stacked lists. Same content now, in the course pages' language
 * (./course-kit): a header with the four facts and one Start button, then
 * what it covers, the format and how to prepare, two columns on a computer.
 */
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle, type LucideIcon } from 'lucide-react';
import { HubBody, HubMasthead, HubPage } from '@/components/hub/HubPrimitives';
import { ListHeading } from '@/components/study-centre/course-kit';

export interface ExamStat {
  label: string;
  value: string | number;
  sub?: string;
}

export function ExamIntroShell({
  section,
  backTo,
  description,
  examPath,
  stats,
  features,
  categories,
  categoryNote,
  tips,
  afterNote,
}: {
  section: string;
  backTo: string;
  description: string;
  examPath: string;
  stats: ExamStat[];
  features: { icon: LucideIcon; label: string; description: string }[];
  categories: { module: string; name: string; count: number }[];
  categoryNote?: string;
  tips: { title: string; description: string }[];
  afterNote?: string;
}) {
  const navigate = useNavigate();
  return (
    <HubPage ground="landing">
      <HubMasthead section={section} title="Mock exam" backTo={backTo} />
      <HubBody>
        {/* ── Header ── */}
        <section className="relative -mx-4 overflow-hidden card-landing max-sm:!rounded-none max-sm:!border-x-0 px-5 py-6 sm:mx-0 sm:rounded-3xl sm:px-8 sm:py-8">
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/0 via-elec-yellow/70 to-elec-yellow/0"
          />
          <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,380px)] lg:items-end lg:gap-x-10">
            <div className="min-w-0">
              <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-elec-yellow">
                {section}
              </p>
              <h1 className="mt-1.5 text-[28px] font-bold leading-[1.1] tracking-tight text-white sm:text-[38px]">
                Mock exam
              </h1>
              <p className="mt-2.5 max-w-2xl text-[15px] leading-relaxed text-white">
                {description}
              </p>
              <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {stats.map((s) => (
                  <div
                    key={s.label}
                    className="min-w-0 rounded-2xl border border-white/[0.14] bg-white/[0.04] px-3.5 py-3"
                  >
                    <p className="text-[12.5px] font-semibold text-white">{s.label}</p>
                    <p className="mt-1 text-[22px] font-black leading-none tabular-nums text-white">
                      {s.value}
                    </p>
                    {s.sub && <p className="mt-1 text-[12px] font-medium text-white">{s.sub}</p>}
                  </div>
                ))}
              </div>
            </div>
            <div className="min-w-0 space-y-2">
              <button
                type="button"
                onClick={() => navigate(examPath)}
                className="flex min-h-[56px] w-full items-center justify-between gap-3 rounded-xl bg-elec-yellow px-4 py-3 text-left text-black transition-transform touch-manipulation active:scale-[0.99]"
              >
                <span>
                  <span className="block text-[16px] font-bold leading-tight">Start mock exam</span>
                  <span className="mt-0.5 block text-[12.5px] font-medium">
                    New questions every attempt
                  </span>
                </span>
                <ArrowRight className="h-5 w-5 shrink-0" aria-hidden />
              </button>
              <p className="text-center text-[12.5px] text-white">Retake it as often as you like.</p>
            </div>
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:items-start">
          <div className="min-w-0 space-y-6">
            {/* What it covers */}
            <section className="space-y-3">
              <ListHeading title="What it covers" />
              {categoryNote && <p className="text-[13.5px] text-white">{categoryNote}</p>}
              <ul className="-mx-4 divide-y divide-white/[0.08] card-landing max-sm:!rounded-none max-sm:!border-x-0 sm:mx-0 sm:rounded-2xl">
                {categories.map((c) => (
                  <li key={c.name} className="flex items-center gap-4 px-5 py-3.5 sm:px-6">
                    <span className="min-w-0 flex-1">
                      <span className="block text-[12.5px] font-medium text-white">{c.module}</span>
                      <span className="block text-[15px] font-semibold leading-snug text-white">
                        {c.name}
                      </span>
                    </span>
                    <span className="shrink-0 text-[13px] font-semibold tabular-nums text-white">
                      {c.count} questions
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Format */}
            <section className="space-y-3">
              <ListHeading title="How it works" />
              <ul className="grid gap-2.5 sm:grid-cols-2">
                {features.map((f) => (
                  <li
                    key={f.label}
                    className="flex items-start gap-3 rounded-2xl border border-white/[0.12] bg-white/[0.04] p-4"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.08]">
                      <f.icon className="h-5 w-5 text-elec-yellow" aria-hidden />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[14.5px] font-semibold leading-snug text-white">
                        {f.label}
                      </span>
                      <span className="mt-0.5 block text-[13px] leading-snug text-white">
                        {f.description}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* How to prepare */}
          <section className="min-w-0 space-y-3 lg:sticky lg:top-24">
            <ListHeading title="How to prepare" />
            <ol className="-mx-4 divide-y divide-white/[0.08] card-landing max-sm:!rounded-none max-sm:!border-x-0 sm:mx-0 sm:rounded-2xl">
              {tips.map((t, i) => (
                <li key={t.title} className="flex gap-3 px-5 py-3.5 sm:px-6">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-elec-yellow text-[13px] font-bold text-elec-yellow">
                    {i + 1}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[14.5px] font-semibold leading-snug text-white">
                      {t.title}
                    </span>
                    <span className="mt-0.5 block text-[13px] leading-snug text-white">
                      {t.description}
                    </span>
                  </span>
                </li>
              ))}
            </ol>
            {afterNote && (
              <p className="flex items-start gap-2.5 rounded-2xl border border-white/[0.12] p-4 text-[13px] leading-relaxed text-white">
                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" aria-hidden />
                {afterNote}
              </p>
            )}
            <Link
              to={examPath}
              className="flex h-12 items-center justify-center gap-2 rounded-xl border border-white/[0.2] text-[14px] font-semibold text-white touch-manipulation hover:border-white/[0.4] active:bg-white/[0.08] lg:hidden"
            >
              Start mock exam
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </section>
        </div>
      </HubBody>
    </HubPage>
  );
}
