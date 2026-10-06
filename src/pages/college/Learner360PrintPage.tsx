import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Printer, ChevronLeft } from 'lucide-react';
import { useStudent360 } from '@/hooks/useStudent360';
import { useAppLearningBreakdown, useOtjSummary } from '@/hooks/useOtjSummary';
import { ATTENDANCE_LABEL, MODE_LABEL, useStudentReviews } from '@/hooks/useTripartiteReviews';
import { useReviewDueBy } from '@/components/college/student360/SectionProgressReviews';
import { useStudentPortfolio } from '@/hooks/useStudentPortfolio';
import { useStudentEpa } from '@/hooks/useStudentEpa';
import { useEpaReadiness } from '@/hooks/useEpaReadiness';
import {
  effectiveVerdict,
  useLearnerEpaReadinessModel,
  VERDICT_LABEL,
} from '@/hooks/college/epaReadinessModels';
import { EPA_STATUS_LABEL } from '@/lib/epa/readiness';
import { useStudentIlp } from '@/hooks/useStudentIlp';
import { useCollegeObservations } from '@/hooks/useCollegeObservations';

/* ==========================================================================
   Learner360PrintPage — /college/students/:id/print
   Ofsted-ready A4 portrait printable Learner 360 snapshot. Bring to parent
   meetings, EPA gateway reviews, inspector visits.

   White paper styling — overrides the app's dark theme via @media print.
   ========================================================================== */

function fmtMins(m: number): string {
  if (m < 60) return `${Math.round(m)}m`;
  return `${Math.round((m / 60) * 10) / 10}h`;
}
function fmtDate(iso: string | null | undefined): string {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export default function Learner360PrintPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const data = useStudent360(id ?? null);
  // The one off-the-job figure (get_otj_summary) — what the learner, tutor
  // and employer see — plus measured app learning by area.
  const { data: otjSummary } = useOtjSummary(data.core?.user_id ?? null);
  const { data: appLearning } = useAppLearningBreakdown(data.core?.user_id ?? null, 30);
  const portfolio = useStudentPortfolio(data.core?.user_id ?? null);
  const epa = useStudentEpa(data.core?.user_id ?? null, data.core?.id ?? null);
  // EPA readiness prints whether or not a gateway checklist row exists — the
  // pack used to show nothing (there were 0 rows). Same model the learner sees.
  const readinessModel = useLearnerEpaReadinessModel(
    data.core?.user_id ?? null,
    data.core?.id ?? null
  ).model;
  const judge = useEpaReadiness({
    collegeStudentId: data.core?.id ?? null,
    userId: data.core?.user_id ?? null,
  });
  const effective = effectiveVerdict(judge.tutor, judge.ai);
  const ilp = useStudentIlp({ collegeStudentId: data.core?.id ?? null });
  const obs = useCollegeObservations(data.core?.id ?? null);
  const { reviews } = useStudentReviews(data.core?.id ?? null);
  const reviewDueBy = useReviewDueBy(data.core?.id ?? null);
  const signedReviews = reviews.filter((r) => r.locked_at);

  // Auto-trigger print dialog after data loads
  useEffect(() => {
    if (data.core && !data.loading.core) {
      const t = setTimeout(() => {
        // Don't auto-print — let the user choose. They'll click the button.
      }, 800);
      return () => clearTimeout(t);
    }
  }, [data.core, data.loading.core]);

  if (!data.core) {
    return (
      <div className="min-h-screen bg-white text-black p-8">
        <p>Loading learner…</p>
      </div>
    );
  }

  const c = data.core;
  const today = new Date();
  const attendance30 = data.attendance.slice(0, 30);
  const presentCount = attendance30.filter((a) => a.status === 'present').length;
  const attendancePct =
    attendance30.length > 0 ? Math.round((presentCount / attendance30.length) * 100) : null;

  return (
    <div className="min-h-screen bg-white text-black print:bg-white">
      {/* Print toolbar — hidden in @media print */}
      <div className="no-print sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-3 flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="text-[12.5px] font-medium text-gray-600 hover:text-black inline-flex items-center gap-1 touch-manipulation"
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </button>
        <div className="ml-auto flex items-center gap-2">
          <span className="text-[11px] text-gray-500">
            Use your browser's Print dialog (Cmd+P) to save as PDF
          </span>
          <button
            onClick={() => window.print()}
            className="h-11 px-4 rounded-full bg-black text-white text-[12.5px] font-semibold hover:bg-gray-800 inline-flex items-center gap-1.5 touch-manipulation"
          >
            <Printer className="h-3.5 w-3.5" />
            Print
          </button>
        </div>
      </div>

      <style>{`
        @media print {
          @page { size: A4 portrait; margin: 14mm 12mm; }
          body { background: white !important; }
          .no-print { display: none !important; }
          .page-break { page-break-after: always; }
          .avoid-break { page-break-inside: avoid; }
        }
        .print-doc { font-family: ui-sans-serif, system-ui, sans-serif; }
        .print-doc h1 { font-size: 22px; font-weight: 700; letter-spacing: -0.01em; }
        .print-doc h2 { font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #555; margin-top: 18px; margin-bottom: 6px; border-bottom: 1px solid #ccc; padding-bottom: 4px; }
        .print-doc h3 { font-size: 13px; font-weight: 600; margin-top: 10px; margin-bottom: 4px; }
        .print-doc p, .print-doc li { font-size: 11.5px; line-height: 1.45; }
        .print-doc .meta { font-size: 10.5px; color: #666; }
        .print-doc table { width: 100%; border-collapse: collapse; font-size: 10.5px; }
        .print-doc th { text-align: left; font-weight: 600; padding: 4px 6px; border-bottom: 1px solid #999; background: #f5f5f5; }
        .print-doc td { padding: 4px 6px; border-bottom: 1px solid #eee; vertical-align: top; }
        .print-doc .stat { display: inline-block; padding: 4px 8px; border: 1px solid #ddd; border-radius: 4px; margin-right: 6px; margin-bottom: 4px; font-size: 10.5px; }
        .print-doc .stat-label { color: #666; font-size: 9.5px; text-transform: uppercase; letter-spacing: 0.06em; }
      `}</style>

      <div className="print-doc max-w-[210mm] mx-auto px-8 py-8 print:px-0 print:py-0">
        {/* Header */}
        <header className="flex items-start justify-between gap-4 pb-4 border-b border-gray-300">
          <div>
            <div className="text-[10px] uppercase tracking-[0.16em] text-gray-500">
              Learner 360 — Snapshot
            </div>
            <h1 className="mt-1">{c.name}</h1>
            <div className="mt-1 meta">
              {c.uln && <span>ULN: {c.uln} · </span>}
              {c.email && <span>{c.email}</span>}
            </div>
          </div>
          <div className="text-right meta">
            <div>
              Generated:{' '}
              {today.toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </div>
            <div>Status: {c.status ?? '—'}</div>
            {c.expected_end_date && <div>End date: {fmtDate(c.expected_end_date)}</div>}
          </div>
        </header>

        {/* Identity strip */}
        <div className="mt-3 flex flex-wrap gap-2">
          {c.cohort_name && (
            <span className="stat">
              <span className="stat-label">Cohort</span> {c.cohort_name}
            </span>
          )}
          {c.course_name && (
            <span className="stat">
              <span className="stat-label">Course</span> {c.course_name}
            </span>
          )}
          {c.send_flags.length > 0 && (
            <span className="stat">
              <span className="stat-label">SEND</span> {c.send_flags.join(', ')}
            </span>
          )}
          {c.eal && (
            <span className="stat">
              <span className="stat-label">EAL</span> Yes
            </span>
          )}
          {c.ehcp_ref && (
            <span className="stat">
              <span className="stat-label">EHCP</span> {c.ehcp_ref}
            </span>
          )}
        </div>

        {/* Risk */}
        <section className="avoid-break">
          <h2>Risk &amp; Safeguarding</h2>
          {data.risk ? (
            <>
              <p>
                <strong>Score:</strong> {data.risk.score}/100 ({data.risk.level}) · computed{' '}
                {fmtDate(data.risk.computed_at)}
              </p>
              {data.risk.factors.length > 0 && (
                <ul className="mt-1 ml-5 list-disc">
                  {data.risk.factors.slice(0, 6).map((f, i) => (
                    <li key={i}>
                      <strong>{f.label}</strong>
                      {f.detail ? ` — ${f.detail}` : ''}{' '}
                      <span className="meta">(severity {f.severity})</span>
                    </li>
                  ))}
                </ul>
              )}
            </>
          ) : (
            <p className="meta">No risk score computed yet.</p>
          )}
        </section>

        {/* ILP */}
        <section className="avoid-break">
          <h2>Individual Learning Plan (ILP)</h2>
          {ilp.ilp ? (
            <>
              <p className="meta">
                v{ilp.ilp.version} · {ilp.rollUp.completed}/{ilp.rollUp.total_goals} goals complete
                {ilp.ilp.target_completion_date
                  ? ` · target ${fmtDate(ilp.ilp.target_completion_date)}`
                  : ''}
                {ilp.ilp.tutor_name_snapshot ? ` · owned by ${ilp.ilp.tutor_name_snapshot}` : ''}
              </p>
              {ilp.ilp.headline_focus && (
                <>
                  <h3>Focus</h3>
                  <p>{ilp.ilp.headline_focus}</p>
                </>
              )}
              {ilp.ilp.headline_strengths && (
                <>
                  <h3>Strengths</h3>
                  <p>{ilp.ilp.headline_strengths}</p>
                </>
              )}
              {ilp.ilp.headline_areas && (
                <>
                  <h3>Areas for development</h3>
                  <p>{ilp.ilp.headline_areas}</p>
                </>
              )}
              {ilp.ilp.support_strategies && (
                <>
                  <h3>Support strategies</h3>
                  <p>{ilp.ilp.support_strategies}</p>
                </>
              )}
              {ilp.goals.length > 0 && (
                <>
                  <h3>Goals</h3>
                  <table>
                    <thead>
                      <tr>
                        <th>Goal</th>
                        <th>Category</th>
                        <th>Status</th>
                        <th>Target</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ilp.goals.map((g) => (
                        <tr key={g.id}>
                          <td>{g.title}</td>
                          <td>{g.category}</td>
                          <td>{g.status}</td>
                          <td>{fmtDate(g.target_date)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </>
              )}
            </>
          ) : (
            <p className="meta">No active ILP.</p>
          )}
        </section>

        <div className="page-break" />

        {/* Off-the-job training */}
        <section className="avoid-break">
          <h2>Off-the-job training</h2>
          <p>
            <strong>Counted:</strong> {otjSummary ? `${otjSummary.counted_hours}h` : '—'}
            {otjSummary?.required_hours ? ` of ${Math.round(otjSummary.required_hours)}h required` : ''}
            {otjSummary?.planned_to_date_hours != null
              ? ` · planned by today ${otjSummary.planned_to_date_hours}h`
              : ''}
            {otjSummary ? ` · ${otjSummary.risk.replace(/_/g, ' ')}` : ''}
          </p>
          <p className="meta mt-1">
            Approved or verified {otjSummary?.verified_hours ?? 0}h · app learning awaiting approval{' '}
            {otjSummary?.app_learning_hours ?? 0}h · waiting for sign-off {otjSummary?.pending_hours ?? 0}h
          </p>
          {appLearning && appLearning.areas.length > 0 && (
            <p className="meta mt-1">
              Learning in Elec-Mate, last 30 days:{' '}
              {appLearning.areas.map((a) => `${a.area} ${fmtMins(a.minutes)}`).join(' · ')}
            </p>
          )}
          <p className="meta mt-1">
            The requirement is a fixed total for the standard (funding rules 2025/26, para 80).
          </p>
        </section>

        {/* Progress reviews (funding rules paras 97–98) */}
        <section className="avoid-break">
          <h2>Progress reviews</h2>
          <p>
            <strong>Next due by:</strong> {reviewDueBy ? fmtDate(reviewDueBy) : '—'}
            {' · '}
            <strong>Held:</strong> {signedReviews.length}
            {' · '}
            <strong>Employer attended:</strong>{' '}
            {signedReviews.filter((r) => r.employer_attendance === 'attended').length} of {signedReviews.length}
          </p>
          {signedReviews.length === 0 ? (
            <p className="meta mt-1">No signed reviews yet.</p>
          ) : (
            <table className="mt-2 w-full text-left">
              <thead>
                <tr>
                  <th>Held</th>
                  <th>How</th>
                  <th>Employer</th>
                  <th>Signed by</th>
                </tr>
              </thead>
              <tbody>
                {signedReviews.map((r) => (
                  <tr key={r.id}>
                    <td>{fmtDate(r.held_on)}</td>
                    <td>{r.mode ? MODE_LABEL[r.mode] : '—'}</td>
                    <td>{r.employer_attendance ? ATTENDANCE_LABEL[r.employer_attendance] : '—'}</td>
                    <td>
                      {[
                        r.signatures?.tutor_signed_at && 'college',
                        r.signatures?.student_signed_at && 'apprentice',
                        r.signatures?.employer_signed_at && 'employer',
                      ]
                        .filter(Boolean)
                        .join(', ')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {signedReviews[0]?.outcomes?.summary && (
            <p className="meta mt-1">Latest summary: {signedReviews[0].outcomes.summary}</p>
          )}
        </section>

        {/* Portfolio */}
        <section className="avoid-break">
          <h2>Portfolio</h2>
          <p>
            <strong>Submissions:</strong> {portfolio.rollUp.total_submissions} total ·{' '}
            {portfolio.rollUp.iqa_verified} IQA verified · {portfolio.rollUp.iqa_requires_action}{' '}
            require action
            {' · '}
            <strong>Items:</strong> {portfolio.rollUp.total_items}
          </p>
          {portfolio.rollUp.overdue_requirements > 0 && (
            <p className="meta">
              ⚠ {portfolio.rollUp.overdue_requirements} overdue tutor-set requirements
            </p>
          )}
        </section>

        {/* Observations */}
        <section className="avoid-break">
          <h2>Recent Assessor Observations</h2>
          {obs.observations.length === 0 ? (
            <p className="meta">No observations recorded.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Activity</th>
                  <th>Outcome</th>
                  <th>Grade</th>
                </tr>
              </thead>
              <tbody>
                {obs.observations.slice(0, 8).map((o) => (
                  <tr key={o.id}>
                    <td>{fmtDate(o.observed_at)}</td>
                    <td>{o.activity_title}</td>
                    <td>{o.outcome}</td>
                    <td>{o.grade ?? '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>

        {/* Attendance */}
        <section className="avoid-break">
          <h2>Attendance (last {attendance30.length} sessions)</h2>
          <p>
            <strong>{attendancePct ?? '—'}%</strong> present · {presentCount}/{attendance30.length}{' '}
            sessions
          </p>
        </section>

        {/* Grades / Assessments */}
        <section className="avoid-break">
          <h2>Recent Assessments</h2>
          {data.grades.length === 0 ? (
            <p className="meta">No assessment records.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Unit</th>
                  <th>Type</th>
                  <th>Grade</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {data.grades.slice(0, 10).map((g) => (
                  <tr key={g.id}>
                    <td>{fmtDate(g.assessed_at)}</td>
                    <td>{g.unit_name ?? '—'}</td>
                    <td>{g.assessment_type ?? '—'}</td>
                    <td>{g.grade ?? '—'}</td>
                    <td>{g.score != null ? `${g.score}` : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>

        {/* EPA Readiness */}
        <section className="avoid-break">
          <h2>EPA readiness</h2>
          {readinessModel ? (
            <>
              <p className="meta">{readinessModel.route.summary}</p>
              <p>
                <strong>Readiness estimate:</strong> {readinessModel.score}/100 ·{' '}
                {EPA_STATUS_LABEL[readinessModel.status]}
              </p>
              <p>
                <strong>{readinessModel.route.assessment || 'AM2'} practice:</strong>{' '}
                {readinessModel.am2.ready} of {readinessModel.am2.of} sections at the practice bar
                {readinessModel.portfolio.known && (
                  <>
                    {' '}
                    · <strong>Portfolio:</strong> {readinessModel.portfolio.pct}% of ACs (
                    {readinessModel.portfolio.signedOff} signed off of{' '}
                    {readinessModel.portfolio.totalACs})
                  </>
                )}
              </p>
              <table className="mt-2">
                <tbody>
                  {readinessModel.gateway.items.map((i) => (
                    <tr key={i.key}>
                      <td>{i.label}</td>
                      <td>{i.done ? '✓ Done' : 'Not yet'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {!readinessModel.gateway.recorded && (
                <p className="meta">No gateway checklist recorded yet.</p>
              )}
            </>
          ) : (
            <p className="meta">
              No linked apprentice account — no practice or portfolio to report.
            </p>
          )}
          {epa.checklist?.gateway_passed && (
            <p>
              ✓ Gateway passed
              {epa.checklist.gateway_passed_at
                ? ` on ${fmtDate(epa.checklist.gateway_passed_at)}`
                : ''}
            </p>
          )}

          {effective ? (
            <>
              <p className="mt-2">
                <strong>
                  {effective.isPrediction
                    ? 'AI prediction (not co-signed by a tutor):'
                    : 'Tutor verdict:'}
                </strong>{' '}
                {VERDICT_LABEL[effective.judgement.verdict] ?? effective.judgement.verdict}
                {readinessModel?.route.graded && effective.judgement.predicted_grade
                  ? ` · predicted ${effective.judgement.predicted_grade}`
                  : ''}{' '}
                <span className="meta">({fmtDate(effective.judgement.created_at)})</span>
              </p>
              {(effective.judgement.blockers ?? []).length > 0 && (
                <>
                  <p className="mt-1">
                    <strong>Blockers</strong>
                  </p>
                  <ul className="ml-5 list-disc">
                    {(effective.judgement.blockers ?? []).map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </>
              )}
              {(effective.judgement.recommended_actions ?? []).length > 0 && (
                <>
                  <p className="mt-1">
                    <strong>Agreed actions</strong>
                  </p>
                  <table className="mt-1">
                    <thead>
                      <tr>
                        <th>Action</th>
                        <th>Target date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(effective.judgement.recommended_actions ?? []).map((a, i) => (
                        <tr key={i}>
                          <td>{a.action}</td>
                          <td>{a.target_date ? fmtDate(a.target_date) : '—'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </>
              )}
            </>
          ) : (
            <p className="meta mt-2">No tutor or AI verdict recorded.</p>
          )}
          <p className="meta mt-2">
            The readiness figure is an estimate. The employer and training provider decide when the
            apprentice goes through gateway.
          </p>
        </section>

        {/* Pastoral notes */}
        <section className="avoid-break">
          <h2>Recent Pastoral Notes</h2>
          {data.notes.length === 0 ? (
            <p className="meta">No notes recorded.</p>
          ) : (
            <ul className="ml-5 list-disc">
              {data.notes.slice(0, 6).map((n) => (
                <li key={n.id} className="mt-1">
                  <span className="meta">
                    [{n.kind}] {fmtDate(n.created_at)}
                    {n.author_name ? ` · ${n.author_name}` : ''}
                  </span>
                  <br />
                  {n.title && <strong>{n.title}: </strong>}
                  {(n.body ?? '').slice(0, 280)}
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Sign-off */}
        <section className="avoid-break mt-8 pt-4 border-t border-gray-300">
          <h2>Sign-off</h2>
          <table className="mt-2">
            <thead>
              <tr>
                <th>Role</th>
                <th>Name</th>
                <th>Signature</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Learner</td>
                <td>{c.name}</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td>Tutor / Assessor</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td>IQA / Quality Lead</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
            </tbody>
          </table>
        </section>

        <footer className="mt-8 pt-4 border-t border-gray-300 text-center meta">
          Generated by Elec-Mate · Confidential — for tutor / assessor / quality use only
        </footer>
      </div>
    </div>
  );
}
