/**
 * What a College Hub section page shows a learner who is not linked to a
 * college (ELE-1897). These sections (timetable, learning plan, surveys,
 * funding evidence, the college activity feed) only exist because a college
 * runs them, so instead of empty cards and promises about a tutor, the page
 * says what it would hold and offers the ways forward: join with a code,
 * invite an assessor, back up work with a witness, export the record.
 */
import { useNavigate } from 'react-router-dom';
import { NoCollegeCard } from '@/components/apprentice-hub/portfolio2/NoCollegeCard';
import { invalidateMyCollegeContext } from '@/hooks/useMyCollegeContext';
import { P_CARD } from '@/components/apprentice-hub/portfolio2/ui';

export const NO_COLLEGE_SECTION_COPY: Record<string, string> = {
  today: 'Your timetable, this week’s lessons and your attendance come from your college. They appear here once you join.',
  plan: 'Your learning plan is the set of goals you agree with your college tutor at review, with a message thread between you. It appears here once you join.',
  voice: 'Surveys and reflections here go to your college. They appear once you join.',
  compliance: 'This shows what your college’s funding body needs from you. It appears once you join.',
  activity: 'Comments, sign-offs and observations from your college team appear here once you join.',
};

export function NoCollegeSectionPanel({ section }: { section: string }) {
  const navigate = useNavigate();
  return (
    <div className="space-y-4">
      <div className={P_CARD}>
        <p className="text-[15px] font-semibold text-white">Nothing here until you join a college</p>
        <p className="mt-1.5 text-[13.5px] leading-relaxed text-white">
          {NO_COLLEGE_SECTION_COPY[section] ?? 'This part is run by your college. It appears once you join.'} Your
          portfolio, hours, study and mock exams all work now, with or without a college.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => navigate('/apprentice/hub')}
            className="inline-flex h-11 items-center rounded-xl border border-white/[0.14] px-4 text-[14px] font-semibold text-white touch-manipulation hover:border-elec-yellow"
          >
            Open your portfolio
          </button>
          <button
            type="button"
            onClick={() => navigate('/apprentice/ojt-hub')}
            className="inline-flex h-11 items-center rounded-xl border border-white/[0.14] px-4 text-[14px] font-semibold text-white touch-manipulation hover:border-elec-yellow"
          >
            Log your hours
          </button>
        </div>
      </div>
      <NoCollegeCard
        onExport={() => navigate('/apprentice/hub?export=1')}
        onAskWitness={() => navigate('/apprentice/college/progress?witness=1')}
        onChanged={() => invalidateMyCollegeContext()}
      />
    </div>
  );
}
