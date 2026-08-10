/**
 * AITooling — the AI tools hub.
 *
 * Rebuilt on the shared hub primitives. It was drawn in its own dialect: a
 * hand-rolled sticky header, a hand-rolled card surface
 * (`linear-gradient(180deg,hsl(0_0%_13%)…)` under a white/[0.10] border) and a
 * `max-w-5xl` column — so one tap from the Electrical Hub you were looking at
 * a different application. Cards now come from `card-recipe` via
 * HubToolGrid, the width comes from HubBody, and the press feel, the volt
 * hairline and the lit surface are defined once for the whole app.
 *
 * What changed beyond the shell:
 *
 *   The hero has gone. "Power up the work." plus a three-line standfirst plus
 *   a four-cell capability strip came to roughly 300px before an electrician
 *   reached a single tool, and one of the four cells was a photography tip
 *   ("Bright + flat — best capture light") dressed as a metric. The one claim
 *   in it that is load-bearing — every answer is cited — survives as the
 *   closing line.
 *
 *   Quick Capture and Component ID were two cards pointing at the same route,
 *   which is how a page advertising "six tools" listed five. Folded into one,
 *   and Elec-AI — routed at ai-tooling/assistant, linked from the sidebar and
 *   the Electrical Hub, and absent from its own hub — takes the sixth place.
 *
 *   Phones lay the tools out two-up. A single column of five cards under that
 *   hero put the first tool below the fold.
 *
 * No KPI row: none of these tools persist a result anywhere (they upload to
 * the visual-uploads bucket and call an edge function), so there is no figure
 * to report and a strip of them would be invented.
 */

import { useNavigate } from 'react-router-dom';
import useSEO from '@/hooks/useSEO';
import {
  HubPage,
  HubBody,
  HubMasthead,
  HubQuickStart,
  HubToolGrid,
  type HubTool,
  type HubQuickAction,
} from '@/components/hub/HubPrimitives';

const BASE = '/electrician-tools/ai-tooling';

/**
 * Photo-led. Every one of these opens the camera or takes an upload, which is
 * the thing worth knowing before you pick one while standing at a board.
 *
 * ⚠️ Descriptions are capped around forty characters. HubToolGrid clamps them
 * to two lines, and two lines of a 2-up card on a 390px phone is roughly that
 * — the first draft ran to a full sentence each and every card on a phone
 * ended in "Photograph any component for…". The grid is shared with nine other
 * hubs, so the copy fits the primitive rather than the other way round.
 */
const CAMERA_TOOLS: HubTool[] = [
  {
    id: 'component-identify',
    title: 'Component ID',
    description: 'Specs, regs and install steps.',
    to: `${BASE}/component-identify`,
  },
  {
    id: 'fault-diagnosis',
    title: 'Fault Diagnosis',
    description: 'Root cause, EICR code, risk grade.',
    to: `${BASE}/fault-diagnosis`,
  },
  {
    id: 'installation-verify',
    title: 'Install Verify',
    description: 'Pass or fail against BS 7671.',
    to: `${BASE}/installation-verify`,
  },
  {
    id: 'wiring-instruction',
    title: 'Wiring Guide',
    description: 'Step-by-step UK wiring, by circuit.',
    to: `${BASE}/wiring-instruction`,
  },
];

/** Typed in, not photographed. */
const WRITTEN_TOOLS: HubTool[] = [
  {
    id: 'assistant',
    title: 'Elec-AI',
    description: 'Every answer cited to the regs.',
    to: `${BASE}/assistant`,
  },
  {
    id: 'explainer',
    title: 'Client Explainer',
    description: 'Plain English for the customer.',
    to: `${BASE}/explainer`,
  },
];

const AITooling = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'AI Tools',
    description:
      'Component identification, fault diagnosis, wiring guides, install verification and plain-English client comms — every answer cited to BS 7671.',
    noindex: true,
  });

  const quickStart: HubQuickAction[] = [
    {
      title: 'Ask Elec-AI',
      description: 'Any question, cited answer',
      onClick: () => navigate(`${BASE}/assistant`),
      primary: true,
    },
    {
      title: 'Photograph a component',
      description: 'Camera or upload',
      onClick: () => navigate(`${BASE}/component-identify`),
    },
    {
      title: 'Diagnose a fault',
      description: 'Symptoms to root cause',
      onClick: () => navigate(`${BASE}/fault-diagnosis`),
    },
    {
      title: 'Explain it to a client',
      description: 'Turn a finding into plain English',
      onClick: () => navigate(`${BASE}/explainer`),
    },
  ];

  return (
    <HubPage>
      <HubMasthead section="Electrician" title="AI Tools" backTo="/electrician" />

      <HubBody>
        <HubQuickStart label="Start something" items={quickStart} />

        <HubToolGrid label="Point a camera" cards={CAMERA_TOOLS} columns="four" />

        <HubToolGrid label="Ask and explain" cards={WRITTEN_TOOLS} columns="four" />

        {/* The one claim from the old hero worth keeping. Full white — the
            page had five separate runs of text-white/65, which reads grey. */}
        <p className="pt-2 text-center text-[11.5px] font-medium leading-snug text-white">
          Every answer cited to BS 7671:2018+A4:2026. No invented regulations.
        </p>
      </HubBody>
    </HubPage>
  );
};

export default AITooling;
