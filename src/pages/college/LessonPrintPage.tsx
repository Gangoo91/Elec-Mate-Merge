import { useEffect, useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { useLessonPlan } from '@/hooks/useCurriculum';

/* ==========================================================================
   LessonPrintPage — A4 classroom-ready print layout.
   Light theme by design. Opens in its own window and auto-invokes print()
   once the plan has loaded so tutors can save as PDF or send to a printer.
   Route: /college/lessons/:id/print?auto=1
   ========================================================================== */

export default function LessonPrintPage() {
  const { id } = useParams<{ id: string }>();
  const [sp] = useSearchParams();
  const auto = sp.get('auto') !== '0';
  const { plan, loading, error } = useLessonPlan(id ?? null);

  useEffect(() => {
    document.documentElement.classList.add('lesson-print-html');
    return () => {
      document.documentElement.classList.remove('lesson-print-html');
    };
  }, []);

  useEffect(() => {
    if (!auto || loading || !plan) return;
    const t = window.setTimeout(() => window.print(), 400);
    return () => window.clearTimeout(t);
  }, [auto, loading, plan]);

  const facetById = useMemo(() => {
    const m = new Map<string, (typeof plan extends null ? never : NonNullable<typeof plan>)['cited_facets'][number]>();
    (plan?.cited_facets ?? []).forEach((c) => m.set(c.facet_id, c));
    return m;
  }, [plan]);

  if (loading) {
    return (
      <div className="print-page">
        <p className="text-center text-sm text-gray-500 pt-20">Loading lesson plan…</p>
      </div>
    );
  }

  if (error || !plan) {
    return (
      <div className="print-page">
        <p className="text-center text-sm text-red-600 pt-20">
          {error ?? 'Lesson plan not found.'}
        </p>
      </div>
    );
  }

  const a4Count = plan.cited_facets?.filter((c) => c.is_a4_change).length ?? 0;

  return (
    <div className="print-page bg-white text-black">
      {/* ─── Cover block ──────────────────────────────────────── */}
      <section className="print-cover">
        <div className="text-[9pt] font-semibold uppercase tracking-[0.22em] text-gray-500 mb-3">
          Lesson plan
        </div>
        <h1 className="print-title">{plan.title}</h1>
        <div className="mt-8 grid grid-cols-4 gap-px bg-gray-200 border border-gray-200 rounded">
          <CoverStat label="Duration" value={`${plan.duration_mins} min`} />
          <CoverStat label="Objectives" value={`${plan.learning_objectives?.length ?? 0}`} />
          <CoverStat label="Activities" value={`${plan.activities?.length ?? 0}`} />
          <CoverStat
            label={a4Count > 0 ? 'A4:2026 changes' : 'Citations'}
            value={`${a4Count > 0 ? a4Count : plan.cited_facets?.length ?? 0}`}
          />
        </div>
        {plan.audience_note && (
          <p className="mt-6 text-[11pt] leading-relaxed text-gray-700 max-w-[62ch]">
            <span className="font-semibold text-black">Audience · </span>
            {plan.audience_note}
          </p>
        )}
        {plan.prior_knowledge?.length > 0 && (
          <div className="mt-4">
            <div className="text-[9pt] uppercase tracking-[0.18em] text-gray-500 mb-1">
              Prior knowledge
            </div>
            <ul className="list-disc pl-5 text-[10.5pt] text-gray-800 leading-relaxed">
              {plan.prior_knowledge.map((k, i) => (
                <li key={i}>{k}</li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {/* ─── A4 callout ───────────────────────────────────────── */}
      {plan.a4_change_summary && (
        <section className="print-section print-callout-amber">
          <div className="text-[9pt] font-semibold uppercase tracking-[0.18em] text-amber-800 mb-1">
            New / changed in BS 7671 Amendment 4:2026
          </div>
          <p className="text-[11pt] leading-relaxed">{plan.a4_change_summary}</p>
        </section>
      )}

      {/* ─── Learning goals ───────────────────────────────────── */}
      <section className="print-section">
        <PrintSectionHeader eyebrow="Outcomes" title="What apprentices will master" />
        <ol className="divide-y divide-gray-200 border border-gray-200 rounded">
          {plan.learning_objectives?.map((o, i) => (
            <li key={i} className="px-4 py-3 flex items-start gap-4">
              <span className="shrink-0 font-mono text-[10pt] text-gray-500 tabular-nums mt-0.5 w-8">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="flex-1">
                <div className="text-[11pt] leading-snug">{o.text}</div>
                {o.ac_codes?.length > 0 && (
                  <div className="mt-1 text-[9pt] font-mono text-gray-600">
                    AC {o.ac_codes.join(' · ')}
                  </div>
                )}
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* ─── Session plan ─────────────────────────────────────── */}
      <section className="print-section">
        <PrintSectionHeader
          eyebrow={`${plan.duration_mins} minutes`}
          title="Session plan"
        />
        <div className="space-y-3">
          {(() => {
            let cursor = 0;
            return plan.activities?.map((a, i) => {
              const start = cursor;
              cursor += a.time_mins;
              const end = cursor;
              return (
                <article
                  key={i}
                  className="print-activity border border-gray-200 rounded grid grid-cols-[80px_1fr] overflow-hidden"
                >
                  <div className="bg-gray-50 border-r border-gray-200 px-3 py-3">
                    <div className="text-[8pt] uppercase tracking-[0.18em] text-gray-500">
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <div className="mt-1 font-mono text-[10pt] tabular-nums">
                      {formatClock(start)}
                    </div>
                    <div className="font-mono text-[8.5pt] tabular-nums text-gray-500">
                      → {formatClock(end)}
                    </div>
                    <div className="mt-2 text-[9pt] font-mono text-gray-700">
                      {a.time_mins}m
                    </div>
                  </div>
                  <div className="px-4 py-3">
                    <div className="text-[8pt] uppercase tracking-[0.18em] text-gray-500">
                      {a.phase}
                    </div>
                    <h3 className="mt-1 text-[12pt] font-semibold">{a.title}</h3>
                    <p className="mt-2 text-[10.5pt] leading-relaxed text-gray-800">
                      {a.description}
                    </p>
                    {a.teacher_moves && a.teacher_moves.length > 0 && (
                      <div className="mt-3">
                        <div className="text-[8.5pt] uppercase tracking-[0.18em] text-gray-500 mb-1">
                          Teacher moves
                        </div>
                        <ul className="list-disc pl-5 text-[10pt] leading-relaxed space-y-0.5">
                          {a.teacher_moves.map((m, mi) => (
                            <li key={mi}>{m}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {a.check_for_understanding && (
                      <div className="mt-3 bg-yellow-50 border border-yellow-200 rounded px-3 py-2">
                        <div className="text-[8.5pt] uppercase tracking-[0.18em] text-yellow-900 mb-0.5">
                          Check for understanding
                        </div>
                        <div className="text-[10pt] leading-snug">
                          {a.check_for_understanding}
                        </div>
                      </div>
                    )}
                    {(a.resources_needed?.length ?? 0) > 0 && (
                      <div className="mt-3 text-[9pt] text-gray-600 leading-relaxed">
                        <span className="font-semibold text-gray-800">Resources · </span>
                        {a.resources_needed?.join(' · ')}
                      </div>
                    )}
                    {(a.cited_facet_ids?.length ?? 0) > 0 && (
                      <div className="mt-1 text-[9pt] text-gray-600">
                        <span className="font-semibold text-gray-800">Regs · </span>
                        {a.cited_facet_ids
                          ?.map((id) => {
                            const f = facetById.get(id);
                            if (!f) return null;
                            const src =
                              f.document_type === 'bs7671'
                                ? 'BS 7671'
                                : f.document_type === 'gn3'
                                  ? 'GN3'
                                  : 'OSG';
                            return `${src} ${f.reg_number ?? '—'}${
                              f.is_a4_change ? ' (A4)' : ''
                            }`;
                          })
                          .filter(Boolean)
                          .join(' · ')}
                      </div>
                    )}
                  </div>
                </article>
              );
            });
          })()}
        </div>
      </section>

      {/* ─── Tutor briefing ───────────────────────────────────── */}
      {plan.tutor_brief_markdown && (
        <section className="print-section page-break-before">
          <PrintSectionHeader eyebrow="Teacher's craft" title="Tutor's briefing" />
          <div className="print-prose max-w-[68ch]">
            <ReactMarkdown>{plan.tutor_brief_markdown}</ReactMarkdown>
          </div>
        </section>
      )}

      {/* ─── Craft sections ───────────────────────────────────── */}
      {plan.analogies && plan.analogies.length > 0 && (
        <section className="print-section">
          <PrintSectionHeader eyebrow="Make it click" title="Analogies" />
          <ul className="space-y-3">
            {plan.analogies.map((a, i) => (
              <li key={i} className="border border-gray-200 rounded px-4 py-3">
                <div className="text-[9pt] uppercase tracking-[0.18em] text-gray-600">
                  {a.name}
                </div>
                <p className="mt-1 text-[10.5pt] leading-relaxed">{a.description}</p>
                <p className="mt-2 text-[9.5pt] text-gray-600 leading-relaxed">
                  <span className="font-semibold text-gray-800">When · </span>
                  {a.when_to_use}
                </p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {plan.misconceptions && plan.misconceptions.length > 0 && (
        <section className="print-section">
          <PrintSectionHeader eyebrow="Watch for" title="Common misconceptions" />
          <div className="divide-y divide-gray-200 border border-gray-200 rounded">
            {plan.misconceptions.map((m, i) => (
              <div key={i} className="px-4 py-3 grid grid-cols-2 gap-4">
                <div>
                  <div className="text-[8pt] uppercase tracking-[0.18em] text-red-700 mb-0.5">
                    Apprentice believes
                  </div>
                  <div className="text-[10pt] leading-snug">{m.belief}</div>
                </div>
                <div>
                  <div className="text-[8pt] uppercase tracking-[0.18em] text-emerald-700 mb-0.5">
                    Correction
                  </div>
                  <div className="text-[10pt] leading-snug">{m.correction}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {plan.worked_examples && plan.worked_examples.length > 0 && (
        <section className="print-section">
          <PrintSectionHeader eyebrow="Modelling" title="Worked examples" />
          <div className="space-y-3">
            {plan.worked_examples.map((w, i) => (
              <div key={i} className="border border-gray-200 rounded overflow-hidden">
                <div className="bg-gray-50 border-b border-gray-200 px-4 py-2 text-[10pt]">
                  <span className="text-[8pt] uppercase tracking-[0.18em] text-gray-600 mr-2">
                    Scenario
                  </span>
                  {w.scenario}
                </div>
                <ol className="px-4 py-3 space-y-1 list-decimal list-inside text-[10pt]">
                  {w.working?.map((s, si) => <li key={si}>{s}</li>)}
                </ol>
                <div className="bg-yellow-50 border-t border-yellow-200 px-4 py-2 text-[10.5pt] font-semibold">
                  {w.answer}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {plan.cold_call_questions && plan.cold_call_questions.length > 0 && (
        <section className="print-section">
          <PrintSectionHeader eyebrow="AFL" title="Cold-call question bank" />
          <ol className="divide-y divide-gray-200 border border-gray-200 rounded">
            {plan.cold_call_questions.map((q, i) => (
              <li key={i} className="px-4 py-3">
                <div className="flex items-start gap-3">
                  <span className="shrink-0 font-mono text-[10pt] text-gray-500 tabular-nums w-6 mt-0.5">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="flex-1">
                    <div className="text-[10.5pt] leading-snug">{q.question}</div>
                    <div className="mt-1 text-[8.5pt] text-gray-500 uppercase tracking-wider">
                      {q.bloom_level}
                    </div>
                    {q.expected_answer && (
                      <div className="mt-1 text-[9.5pt] text-gray-700">
                        <span className="font-semibold">Expected · </span>
                        {q.expected_answer}
                      </div>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </section>
      )}

      {plan.exit_ticket && plan.exit_ticket.length > 0 && (
        <section className="print-section">
          <PrintSectionHeader eyebrow="Check for understanding" title="Exit ticket" />
          <ol className="grid grid-cols-3 gap-2">
            {plan.exit_ticket.map((e, i) => (
              <li key={i} className="border border-gray-200 rounded px-3 py-2">
                <div className="text-[8pt] uppercase tracking-[0.18em] text-gray-500">
                  Q{i + 1}
                </div>
                <div className="mt-1 text-[10pt] font-semibold leading-snug">
                  {e.question}
                </div>
                <div className="mt-2 pt-2 border-t border-gray-200 text-[9.5pt] text-gray-700">
                  <span className="font-semibold">Ans · </span>
                  {e.answer}
                </div>
              </li>
            ))}
          </ol>
        </section>
      )}

      {plan.vocabulary && plan.vocabulary.length > 0 && (
        <section className="print-section">
          <PrintSectionHeader eyebrow="Language" title="Key vocabulary" />
          <dl className="divide-y divide-gray-200 border border-gray-200 rounded">
            {plan.vocabulary.map((v, i) => (
              <div key={i} className="px-4 py-2 grid grid-cols-[180px_1fr] gap-4">
                <dt className="text-[10.5pt] font-semibold">{v.term}</dt>
                <dd className="text-[10pt] text-gray-700 leading-snug">
                  {v.definition}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      {plan.british_values && plan.british_values.length > 0 && (
        <section className="print-section">
          <PrintSectionHeader eyebrow="Ofsted · DfE" title="British Values" />
          <ol className="divide-y divide-gray-200 border border-gray-200 rounded">
            {plan.british_values.map((bv, i) => (
              <li key={i} className="px-4 py-3">
                <div className="text-[8.5pt] uppercase tracking-[0.18em] text-gray-600">
                  {bv.value.replace(/_/g, ' ')}
                </div>
                <div className="mt-1 text-[10.5pt] leading-snug">{bv.how_embedded}</div>
                {bv.activity_ref && (
                  <div className="mt-1 text-[9pt] text-gray-500">
                    Tied to: {bv.activity_ref}
                  </div>
                )}
              </li>
            ))}
          </ol>
        </section>
      )}

      {plan.stretch_challenge && plan.stretch_challenge.length > 0 && (
        <section className="print-section">
          <PrintSectionHeader eyebrow="Raise the bar" title="Stretch & challenge" />
          <div className="grid grid-cols-2 gap-3">
            {plan.stretch_challenge.map((s, i) => (
              <div
                key={i}
                className="border border-gray-200 rounded px-3 py-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="text-[8.5pt] uppercase tracking-[0.18em] text-gray-600">
                    {s.title}
                  </div>
                  <div className="text-[8pt] uppercase tracking-wider text-gray-500">
                    {s.bloom_level}
                  </div>
                </div>
                <div className="mt-1.5 text-[10pt] leading-snug">{s.task}</div>
                <div className="mt-1.5 pt-1.5 border-t border-gray-200 text-[9pt] text-gray-700">
                  <span className="font-semibold">For: </span>
                  {s.target_learner}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {plan.inclusive_practice && plan.inclusive_practice.length > 0 && (
        <section className="print-section">
          <PrintSectionHeader eyebrow="Inclusion" title="Inclusive practice" />
          <ol className="divide-y divide-gray-200 border border-gray-200 rounded">
            {plan.inclusive_practice.map((ip, i) => (
              <li key={i} className="px-4 py-3">
                <div className="text-[8.5pt] uppercase tracking-[0.18em] text-gray-600">
                  {ip.need.replace(/_/g, ' ')}
                </div>
                <div className="mt-1 text-[10pt] leading-snug">{ip.strategy}</div>
                {ip.activity_ref && (
                  <div className="mt-1 text-[9pt] text-gray-500">
                    Tied to: {ip.activity_ref}
                  </div>
                )}
              </li>
            ))}
          </ol>
        </section>
      )}

      {plan.differentiation && (
        <section className="print-section">
          <PrintSectionHeader eyebrow="Inclusion" title="Differentiation" />
          <div className="grid grid-cols-2 gap-3">
            <PrintDiffBox label="Stretch" items={plan.differentiation.stretch} />
            <PrintDiffBox label="Support" items={plan.differentiation.support} />
            {plan.differentiation.send && plan.differentiation.send.length > 0 && (
              <PrintDiffBox label="SEND strategies" items={plan.differentiation.send} />
            )}
            {plan.differentiation.eal && plan.differentiation.eal.length > 0 && (
              <PrintDiffBox label="EAL strategies" items={plan.differentiation.eal} />
            )}
          </div>
        </section>
      )}

      {plan.health_safety && plan.health_safety.length > 0 && (
        <section className="print-section">
          <PrintSectionHeader eyebrow="Safe practice" title="Health & safety" />
          <table className="w-full border border-gray-200 rounded overflow-hidden text-left">
            <thead className="bg-gray-50">
              <tr className="text-[8pt] uppercase tracking-[0.18em] text-gray-600">
                <th className="px-3 py-2 w-[30%]">Risk</th>
                <th className="px-3 py-2 w-[50%]">Control</th>
                <th className="px-3 py-2 w-[20%]">Reg</th>
              </tr>
            </thead>
            <tbody>
              {plan.health_safety.map((h, i) => (
                <tr key={i} className="border-t border-gray-200 align-top">
                  <td className="px-3 py-2 text-[10pt]">{h.risk}</td>
                  <td className="px-3 py-2 text-[10pt] text-gray-800">{h.control}</td>
                  <td className="px-3 py-2 text-[9.5pt] font-mono">{h.reg_ref}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {plan.homework && (
        <section className="print-section">
          <PrintSectionHeader
            eyebrow={`Independent study · ${plan.homework.estimated_mins} min`}
            title="Homework"
          />
          <p className="text-[10.5pt] leading-relaxed">{plan.homework.description}</p>
        </section>
      )}

      {plan.cited_facets?.length > 0 && (
        <section className="print-section">
          <PrintSectionHeader
            eyebrow="Evidence"
            title={`Regulation citations · ${plan.cited_facets.length}`}
          />
          <ul className="divide-y divide-gray-200 border border-gray-200 rounded">
            {plan.cited_facets.map((c) => (
              <li key={c.facet_id} className="px-4 py-2">
                <div className="text-[9pt] font-mono">
                  {c.document_type === 'bs7671'
                    ? 'BS 7671'
                    : c.document_type === 'gn3'
                      ? 'Guidance Note 3'
                      : 'On-Site Guide'}
                  {c.reg_number && (
                    <>
                      <span className="mx-2 text-gray-400">·</span>
                      <span className="font-semibold">{c.reg_number}</span>
                    </>
                  )}
                  {c.is_a4_change && (
                    <>
                      <span className="mx-2 text-gray-400">·</span>
                      <span className="text-amber-700">A4:2026</span>
                    </>
                  )}
                </div>
                {c.citation_note && (
                  <p className="mt-1 text-[10pt] leading-snug text-gray-700">
                    {c.citation_note}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      {plan.next_lesson_hint && (
        <section className="print-section">
          <PrintSectionHeader eyebrow="Scheme of work" title="Suggested next lesson" />
          <p className="text-[10.5pt] leading-relaxed">{plan.next_lesson_hint}</p>
        </section>
      )}
    </div>
  );
}

/* ─── Small pieces ─────────────────────────────────────────── */

function PrintSectionHeader({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <header className="mb-3">
      <div className="text-[8.5pt] font-semibold uppercase tracking-[0.22em] text-gray-500">
        {eyebrow}
      </div>
      <h2 className="text-[15pt] font-semibold text-black tracking-tight leading-tight">
        {title}
      </h2>
    </header>
  );
}

function PrintDiffBox({ label, items }: { label: string; items: string[] }) {
  return (
    <div className="border border-gray-200 rounded px-3 py-3">
      <div className="text-[8.5pt] uppercase tracking-[0.18em] text-gray-500 mb-2">
        {label}
      </div>
      <ul className="list-disc pl-4 text-[10pt] leading-snug space-y-0.5">
        {(items ?? []).map((it, i) => (
          <li key={i}>{it}</li>
        ))}
      </ul>
    </div>
  );
}

function CoverStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white px-4 py-3">
      <div className="text-[8pt] uppercase tracking-[0.2em] text-gray-500">{label}</div>
      <div className="mt-1 text-[20pt] font-semibold tabular-nums leading-none">
        {value}
      </div>
    </div>
  );
}

function formatClock(mins: number): string {
  const m = Math.max(0, Math.floor(mins));
  return `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
}
