import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import RegulationsProcedure from '@/components/inspection/learning-hub/regulations/RegulationsProcedure';
import FaultFindingProcedure from '@/components/inspection/learning-hub/fault-finding/FaultFindingProcedure';
import TestingProceduresSection from './learning-hub/TestingProceduresSection';
import QuizAssessmentSection from './learning-hub/QuizAssessmentSection';
import LearnPath from './learning-hub/LearnPath';
import OnSiteReference from './learning-hub/OnSiteReference';

interface LearningHubProps {
  onBack: () => void;
}

export type LearningSection = 'overview' | 'fault-finding' | 'regulations' | 'testing' | 'quiz';
type HubMode = 'learn' | 'onsite';

/**
 * Inspection & Testing hub.
 *
 * Two surfaces, because there are two genuinely different moments:
 *   Learn   — at home, working through the test sequence, progress recorded.
 *   On site — at the board, checking one number, no prose in the way.
 *
 * State lives in the URL, not in `useState`. It used to be component state,
 * which broke the thing an electrician reaches for most: the native back
 * button. `useNativeApp` handles Android back with `window.history.back()`, so
 * with nothing in history, backing out of a section left the hub entirely and
 * dropped the user at the apprentice home screen having lost their place. Now
 * each move pushes history, so back walks up one level, and a section can be
 * linked to directly — `?mode=onsite`, or `?section=quiz`.
 */
const LearningHub = ({ onBack }: LearningHubProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Validated against the known set rather than cast. `?section=` yields an
  // empty string, not null, so a `?? 'overview'` fallback never fires — and any
  // unrecognised value used to fall through to the last branch and render the
  // quiz. A mistyped or truncated link should land on the hub, not mid-test.
  const DETAIL_SECTIONS: LearningSection[] = ['fault-finding', 'regulations', 'testing', 'quiz'];
  const rawSection = searchParams.get('section');
  const section: LearningSection = DETAIL_SECTIONS.includes(rawSection as LearningSection)
    ? (rawSection as LearningSection)
    : 'overview';

  const mode: HubMode = searchParams.get('mode') === 'onsite' ? 'onsite' : 'learn';

  // `replace: false` is the whole point — each push is a history entry for
  // back to return to.
  const setSection = (next: LearningSection) => {
    const params = new URLSearchParams(searchParams);
    if (next === 'overview') params.delete('section');
    else params.set('section', next);
    setSearchParams(params, { replace: false });
  };

  const setMode = (next: HubMode) => {
    const params = new URLSearchParams(searchParams);
    params.delete('section');
    if (next === 'learn') params.delete('mode');
    else params.set('mode', next);
    setSearchParams(params, { replace: false });
  };

  const backToOverview = () => setSection('overview');

  if (section !== 'overview') {
    const detail =
      section === 'fault-finding' ? (
        <FaultFindingProcedure onBack={backToOverview} />
      ) : section === 'regulations' ? (
        <RegulationsProcedure onBack={backToOverview} />
      ) : section === 'testing' ? (
        <TestingProceduresSection onBack={backToOverview} />
      ) : (
        <QuizAssessmentSection onBack={backToOverview} />
      );

    return (
      <div className="-mt-3 bg-background pb-24 sm:-mt-4 md:-mt-6">
        <div className="px-4">{detail}</div>
      </div>
    );
  }

  const tabCn = (active: boolean) =>
    `h-11 flex-1 touch-manipulation rounded-xl text-[13px] font-semibold transition-colors ${
      active
        ? 'bg-elec-yellow text-black'
        : 'border border-white/[0.12] bg-white/[0.06] text-white'
    }`;

  return (
    <div className="-mt-3 bg-background pb-24 sm:-mt-4 md:-mt-6">
      <div className="sticky top-0 z-50 border-b border-white/[0.06] bg-background/95 backdrop-blur-sm">
        <div className="px-4 py-2">
          <div className="flex h-11 items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="h-11 w-11 touch-manipulation rounded-xl text-white hover:bg-white/10 hover:text-white active:scale-[0.98]"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-base font-semibold text-white">Inspection &amp; Testing</h1>
              <p className="text-[10px] text-white">BS 7671:2018+A4:2026</p>
            </div>
          </div>
        </div>

        <div className="flex gap-2 px-4 pb-3">
          <button type="button" onClick={() => setMode('learn')} className={tabCn(mode === 'learn')}>
            Learn
          </button>
          <button
            type="button"
            onClick={() => setMode('onsite')}
            className={tabCn(mode === 'onsite')}
          >
            On site
          </button>
        </div>
      </div>

      {mode === 'learn' ? <LearnPath onNavigateToSection={setSection} /> : <OnSiteReference />}
    </div>
  );
};

export default LearningHub;
