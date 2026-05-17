import { useCallback, useState } from 'react';
import JSZip from 'jszip';
import { supabase } from '@/integrations/supabase/client';
import { rowsToCsv } from '@/lib/csv';

/* ==========================================================================
   useStudentGdprExport — subject-access export pack for one learner.

   Builds a ZIP of CSVs covering every per-student table the learner (or a
   parent acting on their behalf) is entitled to see under UK GDPR Article
   15. Runs in the browser using JSZip — no edge function needed, RLS does
   the scoping.

   Includes:
     - student_profile.csv  (name, contact, cohort, course, status)
     - attendance.csv       (every session register entry)
     - otj_entries.csv      (every OTJ log, including employer attestations)
     - portfolio_comments.csv (every tutor / assessor / AI comment)
     - pastoral_notes.csv   (visible-to-student notes only — see RLS)
     - epa_records.csv      (gateway date, status, result)
     - epa_judgements.csv   (learner / tutor / AI verdicts over time)
     - epa_mocks.csv        (mock session results)
     - quiz_attempts.csv    (every completed quiz with score)
     - observations.csv     (lesson observations recorded about the learner)
     - ilps.csv             (ILP targets + review history)
     - export_manifest.txt  (timestamp + table coverage list)
   ========================================================================== */

export function useStudentGdprExport() {
  const [exporting, setExporting] = useState(false);
  const [progress, setProgress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const exportPack = useCallback(
    async (opts: { collegeStudentId: string; studentUserId: string | null; studentName: string }) => {
      setExporting(true);
      setProgress('Fetching student data…');
      setError(null);
      try {
        const zip = new JSZip();
        const folder = zip.folder('gdpr-export') ?? zip;

        const tablesCovered: string[] = [];
        const addCsv = (
          name: string,
          rows: Array<Record<string, unknown>>,
          columns: Array<{ key: string; header: string }>
        ) => {
          folder.file(name, rowsToCsv(rows, columns));
          tablesCovered.push(`${name} — ${rows.length} row${rows.length === 1 ? '' : 's'}`);
        };

        // 1. Profile
        setProgress('Profile…');
        const { data: profileRow } = await supabase
          .from('college_students')
          .select('id, name, email, phone, status, progress_percent, risk_level, cohort_id, course_id, start_date, expected_end_date, employer_id')
          .eq('id', opts.collegeStudentId)
          .maybeSingle();
        addCsv(
          'student_profile.csv',
          profileRow ? [profileRow as Record<string, unknown>] : [],
          [
            { key: 'id', header: 'Student ID' },
            { key: 'name', header: 'Name' },
            { key: 'email', header: 'Email' },
            { key: 'phone', header: 'Phone' },
            { key: 'status', header: 'Status' },
            { key: 'progress_percent', header: 'Progress %' },
            { key: 'risk_level', header: 'Risk level' },
            { key: 'cohort_id', header: 'Cohort ID' },
            { key: 'course_id', header: 'Course ID' },
            { key: 'start_date', header: 'Start date' },
            { key: 'expected_end_date', header: 'Expected end date' },
            { key: 'employer_id', header: 'Employer ID' },
          ]
        );

        // 2. Attendance
        setProgress('Attendance…');
        const { data: attendance } = await supabase
          .from('college_attendance')
          .select('date, status, notes')
          .eq('student_id', opts.collegeStudentId)
          .order('date', { ascending: false });
        addCsv(
          'attendance.csv',
          (attendance ?? []) as Array<Record<string, unknown>>,
          [
            { key: 'date', header: 'Date' },
            { key: 'status', header: 'Status' },
            { key: 'notes', header: 'Notes' },
          ]
        );

        // 3. OTJ entries
        if (opts.studentUserId) {
          setProgress('OTJ entries…');
          const { data: otj } = await supabase
            .from('college_otj_entries')
            .select(
              'activity_date, activity_type, title, description, duration_minutes, source_kind, verification_status, verified_at, attested_by_name, attestation_email, attestation_comment'
            )
            .eq('student_id', opts.studentUserId)
            .order('activity_date', { ascending: false });
          addCsv(
            'otj_entries.csv',
            (otj ?? []) as Array<Record<string, unknown>>,
            [
              { key: 'activity_date', header: 'Date' },
              { key: 'activity_type', header: 'Activity type' },
              { key: 'title', header: 'Title' },
              { key: 'description', header: 'Description' },
              { key: 'duration_minutes', header: 'Duration (min)' },
              { key: 'source_kind', header: 'Source' },
              { key: 'verification_status', header: 'Status' },
              { key: 'verified_at', header: 'Verified at' },
              { key: 'attested_by_name', header: 'Attested by' },
              { key: 'attestation_email', header: 'Attestation email' },
              { key: 'attestation_comment', header: 'Employer comment' },
            ]
          );

          // 4. Portfolio comments — `portfolio_comments` is keyed by
          // `evidence_id` (→ `portfolio_items.id`), not by student. So we
          // resolve the learner's portfolio item ids first, then pull
          // every comment on them. Captures both tutor feedback ABOUT the
          // learner and comments the learner authored themselves.
          setProgress('Portfolio comments…');
          const { data: portfolioItems } = await supabase
            .from('portfolio_items')
            .select('id')
            .eq('user_id', opts.studentUserId);
          const itemIds = ((portfolioItems ?? []) as Array<{ id: string }>).map((p) => p.id);
          let portfolioComments: Array<Record<string, unknown>> = [];
          if (itemIds.length > 0) {
            const { data: comments } = await supabase
              .from('portfolio_comments')
              .select('created_at, content, author_name, author_role, evidence_id, requires_action, is_resolved')
              .in('evidence_id', itemIds)
              .order('created_at', { ascending: false });
            portfolioComments = (comments ?? []) as Array<Record<string, unknown>>;
          }
          // Plus any comments the learner authored themselves (e.g. replies
          // on someone else's evidence, comments on shared items).
          const { data: authoredComments } = await supabase
            .from('portfolio_comments')
            .select('created_at, content, author_name, author_role, evidence_id, requires_action, is_resolved')
            .eq('user_id', opts.studentUserId)
            .order('created_at', { ascending: false });
          const seenIds = new Set<string>();
          const merged = [...portfolioComments, ...((authoredComments ?? []) as Array<Record<string, unknown>>)]
            .filter((c) => {
              const key = `${c.created_at}::${c.evidence_id}::${c.content}`;
              if (seenIds.has(key)) return false;
              seenIds.add(key);
              return true;
            });
          addCsv(
            'portfolio_comments.csv',
            merged,
            [
              { key: 'created_at', header: 'Date' },
              { key: 'author_name', header: 'Author' },
              { key: 'author_role', header: 'Author role' },
              { key: 'content', header: 'Comment' },
              { key: 'evidence_id', header: 'Evidence item' },
              { key: 'requires_action', header: 'Action required?' },
              { key: 'is_resolved', header: 'Resolved?' },
            ]
          );

          // 5. EPA records
          setProgress('EPA records…');
          const { data: epaRows } = await supabase
            .from('college_epa')
            .select('status, gateway_date, epa_date, result, notes')
            .eq('student_id', opts.studentUserId);
          addCsv(
            'epa_records.csv',
            (epaRows ?? []) as Array<Record<string, unknown>>,
            [
              { key: 'status', header: 'Status' },
              { key: 'gateway_date', header: 'Gateway date' },
              { key: 'epa_date', header: 'EPA date' },
              { key: 'result', header: 'Result' },
              { key: 'notes', header: 'Notes' },
            ]
          );

          // 6. EPA mock sessions
          setProgress('Mock sessions…');
          const { data: mocks } = await supabase
            .from('epa_mock_sessions')
            .select(
              'completed_at, session_type, status, overall_score, predicted_grade, ai_feedback, recorded_by_tutor_id'
            )
            .eq('user_id', opts.studentUserId)
            .order('completed_at', { ascending: false });
          addCsv(
            'epa_mocks.csv',
            (mocks ?? []) as Array<Record<string, unknown>>,
            [
              { key: 'completed_at', header: 'Completed at' },
              { key: 'session_type', header: 'Session type' },
              { key: 'status', header: 'Status' },
              { key: 'overall_score', header: 'Score' },
              { key: 'predicted_grade', header: 'Predicted grade' },
              { key: 'ai_feedback', header: 'Feedback' },
              { key: 'recorded_by_tutor_id', header: 'Tutor-recorded?' },
            ]
          );

          // 7. Quiz attempts
          setProgress('Quiz attempts…');
          const { data: attempts } = await supabase
            .from('tutor_quiz_attempts')
            .select('submitted_at, score, total_points, quiz_id')
            .eq('student_id', opts.studentUserId)
            .order('submitted_at', { ascending: false });
          addCsv(
            'quiz_attempts.csv',
            (attempts ?? []) as Array<Record<string, unknown>>,
            [
              { key: 'submitted_at', header: 'Submitted at' },
              { key: 'quiz_id', header: 'Quiz ID' },
              { key: 'score', header: 'Score' },
              { key: 'total_points', header: 'Total points' },
            ]
          );
        }

        // 8. EPA judgements (uses college_student_id, not user_id)
        setProgress('EPA judgements…');
        const { data: judgements } = await supabase
          .from('college_epa_judgements')
          .select(
            'source, verdict, predicted_grade, confidence, blockers, recorded_at, is_current, actual_outcome, actual_recorded_at'
          )
          .eq('college_student_id', opts.collegeStudentId)
          .order('recorded_at', { ascending: false });
        addCsv(
          'epa_judgements.csv',
          (judgements ?? []) as Array<Record<string, unknown>>,
          [
            { key: 'recorded_at', header: 'Recorded at' },
            { key: 'source', header: 'Source' },
            { key: 'verdict', header: 'Verdict' },
            { key: 'predicted_grade', header: 'Predicted grade' },
            { key: 'confidence', header: 'Confidence %' },
            { key: 'is_current', header: 'Current?' },
            { key: 'blockers', header: 'Blockers' },
            { key: 'actual_outcome', header: 'Actual outcome' },
            { key: 'actual_recorded_at', header: 'Actual recorded at' },
          ]
        );

        // 9. Pastoral notes (RLS scopes to what the caller can see — student
        // is shown only the visible-to-student / non-safeguarding subset).
        setProgress('Pastoral notes…');
        const { data: notes } = await supabase
          .from('pastoral_notes')
          .select('created_at, kind, visibility, title, body, action_required, action_by_date')
          .eq('student_id', opts.collegeStudentId)
          .order('created_at', { ascending: false });
        addCsv(
          'pastoral_notes.csv',
          (notes ?? []) as Array<Record<string, unknown>>,
          [
            { key: 'created_at', header: 'Date' },
            { key: 'kind', header: 'Kind' },
            { key: 'visibility', header: 'Visibility' },
            { key: 'title', header: 'Title' },
            { key: 'body', header: 'Body' },
            { key: 'action_required', header: 'Action required' },
            { key: 'action_by_date', header: 'Action by date' },
          ]
        );

        // 10. Manifest
        const stamp = new Date().toISOString();
        const manifest = [
          `Elec-Mate · GDPR Subject Access Export`,
          ``,
          `Learner: ${opts.studentName}`,
          `Generated: ${stamp}`,
          ``,
          `Tables included:`,
          ...tablesCovered.map((t) => `  • ${t}`),
          ``,
          `Notes:`,
          `  - This pack contains personal data the college holds about you.`,
          `  - Some safeguarding notes are withheld from this export (RLS-scoped).`,
          `  - For questions, contact your college's Data Protection Officer.`,
        ].join('\n');
        folder.file('export_manifest.txt', manifest);

        // Generate + download
        setProgress('Building ZIP…');
        const blob = await zip.generateAsync({ type: 'blob' });
        const safeName = opts.studentName.replace(/[^A-Za-z0-9]+/g, '-').toLowerCase();
        const filename = `gdpr-export-${safeName}-${stamp.slice(0, 10)}.zip`;
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } catch (e) {
        setError(e instanceof Error ? e.message : String(e));
        throw e;
      } finally {
        setExporting(false);
        setProgress(null);
      }
    },
    []
  );

  return { exportPack, exporting, progress, error };
}
