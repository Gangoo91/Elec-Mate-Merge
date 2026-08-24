/**
 * FireAlarmCertificateChooser — "which BS 5839-1 certificate do I need, and who
 * signs it?" for /guides/fire-alarm-certificate-requirements.
 *
 * WHY THIS SHAPE
 * That page pulls 4,100 impressions but sits at position 18.3 overall. Its
 * query data shows why: it already ranks 3.7 for "fire alarm design
 * certificate" (18% CTR) and 8.4 for "fire alarm commissioning certificate",
 * but 17.8 for the generic head term "fire alarm certificate" (64 imp). People
 * are searching for a SPECIFIC certificate in the chain — so the page should
 * let them find theirs in one tap rather than scroll a 838-line guide.
 *
 * The thing worth surfacing, which a snippet cannot: there is no single "fire
 * alarm certificate". BS 5839-1 runs a chain across the system lifecycle —
 * design, installation, commissioning, optional independent verification, then
 * ongoing service records — and each is signed by a different party. Someone
 * asking for "the fire alarm certificate" usually needs to know which one.
 *
 * EVERY fact is taken verbatim from this page's own body copy:
 *  · design — system category, zone layout, detector types, sounder coverage,
 *    cable specification; signed by the designer
 *  · installation — confirms the install matches the approved design; issued by
 *    the installing company
 *  · commissioning — functional tests of every device, cause-and-effect,
 *    sounder levels, battery drain; signed by the commissioning engineer
 *  · verification — issued by an independent third party who was NOT the
 *    installer; not always required, but recommended for complex or high-risk
 *    systems and often required by insurers or building control
 *  · service records — ongoing, retained in the fire safety logbook
 *  · the Responsible Person keeps them all (RRO 2005 in England and Wales;
 *    equivalent duties in Scotland and Northern Ireland)
 * Do not add a certificate or duty the page body does not state.
 */
import { useRef, useState } from 'react';
import { trackSeoToolUsed } from '@/lib/analytics-events';
import { Info } from 'lucide-react';

type Stage = 'design' | 'installation' | 'commissioning' | 'verification' | 'service';

interface CertInfo {
  name: string;
  when: string;
  signedBy: string;
  records: string;
  note?: string;
}

const CERTS: Record<Stage, CertInfo> = {
  design: {
    name: 'Design certificate',
    when: 'Produced during the design phase, before installation begins.',
    signedBy:
      'The designer. It should then be reviewed and accepted by the client or their representative.',
    records:
      'The system category, zone layout, detector types, sounder coverage and cable specification.',
    note: 'The single most important entry is the system category — it determines what the rest of the system has to achieve.',
  },
  installation: {
    name: 'Installation certificate',
    when: 'On completion of the physical installation.',
    signedBy: 'The installing company.',
    records:
      'Confirmation that the system as installed matches the approved design.',
  },
  commissioning: {
    name: 'Commissioning certificate',
    when: 'After installation, once the system has been commissioned and tested.',
    signedBy: 'The commissioning engineer.',
    records:
      'Functional tests of every device, cause-and-effect verification, sounder level measurements and battery drain tests.',
  },
  verification: {
    name: 'Verification certificate',
    when: 'After commissioning, where independent confirmation is wanted.',
    signedBy: 'An independent third party — someone who was not the installer.',
    records:
      'An independent check that the completed installation complies with BS 5839-1 and the design specification.',
    note: 'Not every installation requires it, but it is recommended for complex or high-risk systems and is often required by insurers or building control.',
  },
  service: {
    name: 'Service records',
    when: 'Ongoing, for the life of the system.',
    signedBy: 'The servicing company or engineer.',
    records: 'Regular testing and maintenance, documented across the year.',
  },
};

const ORDER: Stage[] = ['design', 'installation', 'commissioning', 'verification', 'service'];
const LABELS: Record<Stage, string> = {
  design: 'Design',
  installation: 'Installation',
  commissioning: 'Commissioning',
  verification: 'Verification',
  service: 'Servicing',
};

const chipOn = 'bg-elec-yellow border-elec-yellow text-black font-semibold';
const chipOff = 'bg-white/[0.06] border-white/[0.12] text-white font-medium hover:border-white/30';
const chip = (active: boolean) =>
  `flex min-h-11 items-center justify-center rounded-xl border px-3 text-center text-[13px] leading-tight transition-colors touch-manipulation ${
    active ? chipOn : chipOff
  }`;

export default function FireAlarmCertificateChooser() {
  const [stage, setStage] = useState<Stage>('commissioning');
  const usedRef = useRef(false);

  const markUsed = () => {
    if (usedRef.current) return;
    usedRef.current = true;
    trackSeoToolUsed({ tool: 'fire_alarm_certificate_chooser', page: window.location.pathname });
  };

  const cert = CERTS[stage];

  return (
    <div className="-mx-4 border-y border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 sm:mx-0 sm:rounded-2xl sm:border-x sm:p-5 lg:p-6">
      <h3 className="text-[15px] font-semibold tracking-tight text-white lg:text-[17px]">
        Which fire alarm certificate do you need?
      </h3>
      <p className="mt-1 text-sm leading-relaxed text-white">
        There is no single &ldquo;fire alarm certificate&rdquo;. BS 5839-1 runs a chain across the
        system&rsquo;s life, and each document is signed by a different party. Pick the stage
        you&rsquo;re at.
      </p>

      <div className="mt-5 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-8">
        <div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-2">
            {ORDER.map((s, i) => (
              <button
                key={s}
                type="button"
                aria-pressed={stage === s}
                onClick={() => {
                  setStage(s);
                  markUsed();
                }}
                className={chip(stage === s)}
              >
                {i + 1}. {LABELS[s]}
              </button>
            ))}
          </div>

          <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-white/[0.12] bg-white/[0.04] p-3">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-elec-yellow" aria-hidden />
            <p className="text-[13px] leading-relaxed text-white">
              Whoever issues them, the <strong>Responsible Person</strong> for the premises must keep
              them. Under the Regulatory Reform (Fire Safety) Order 2005 they have to be available
              for inspection by the fire and rescue service — Scotland and Northern Ireland have
              equivalent duties under their own legislation.
            </p>
          </div>
        </div>

        <div role="status" aria-live="polite" className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-xl border border-white/[0.14] bg-white/[0.04] p-4 lg:p-5">
            <p className="text-2xl font-bold text-elec-yellow">{cert.name}</p>

            <div className="mt-4 space-y-3">
              <div>
                <p className="text-[12px] font-semibold uppercase tracking-wider text-elec-yellow">
                  When
                </p>
                <p className="mt-1 text-[13.5px] leading-relaxed text-white">{cert.when}</p>
              </div>
              <div className="border-t border-white/[0.08] pt-3">
                <p className="text-[12px] font-semibold uppercase tracking-wider text-elec-yellow">
                  Who signs it
                </p>
                <p className="mt-1 text-[13.5px] leading-relaxed text-white">{cert.signedBy}</p>
              </div>
              <div className="border-t border-white/[0.08] pt-3">
                <p className="text-[12px] font-semibold uppercase tracking-wider text-elec-yellow">
                  What it records
                </p>
                <p className="mt-1 text-[13.5px] leading-relaxed text-white">{cert.records}</p>
              </div>
              {cert.note ? (
                <div className="border-t border-white/[0.08] pt-3">
                  <p className="text-[13px] leading-relaxed text-white">{cert.note}</p>
                </div>
              ) : null}
            </div>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-white">
            All of them belong in the building&rsquo;s fire safety logbook. BS 5839-1 requires each
            to be issued by a competent person.
          </p>
        </div>
      </div>
    </div>
  );
}
