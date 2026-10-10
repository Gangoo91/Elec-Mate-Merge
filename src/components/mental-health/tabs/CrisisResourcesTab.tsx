import { Download } from 'lucide-react';
import ExternalLinkCards from '@/components/mental-health/ExternalLinkCards';
import LocalResourceFinder from '@/components/mental-health/crisis/LocalResourceFinder';
import { generateCrisisPlanPdf, generateEmergencyContactsPdf } from '@/utils/crisisResourcesPdf';
import {
  emergencyContacts,
  onlineResources,
} from '@/components/mental-health/crisis/CrisisResourcesData';
import {
  ContactButton,
  ContactRow,
  WB_CARD,
  WB_LIST,
  WellbeingIntro,
  WellbeingSection,
} from '@/components/mental-health/wellbeingUi';
import { recordCrisisEvent } from '@/services/mentalHealthService';

const onCrisisDial = (label: string) => {
  recordCrisisEvent({ kind: 'call', label }).catch(() => {
    /* private follow-up is best-effort; failure must never block the call */
  });
};
const onCrisisText = (label: string) => {
  recordCrisisEvent({ kind: 'text', label }).catch(() => {
    /* same — never block */
  });
};

const CrisisResourcesTab = () => {
  const priorityHelplines = emergencyContacts.filter(
    (c) => c.type === 'emergency' || c.type === 'crisis'
  );
  const supportLines = emergencyContacts.filter(
    (c) => c.type === 'support' || c.type === 'specialty'
  );

  return (
    <div className="space-y-8 sm:space-y-10">
      <WellbeingIntro
        tone="red"
        label="Crisis support"
        title="You're not alone"
        description="If you feel unsafe or overwhelmed, reach out now. Pick whichever feels easiest."
      />

      {/* Two columns on a wide screen: reach out now and the priority lines
          on the left, finding local and longer-term help on the right. */}
      <div className="grid grid-cols-1 items-start gap-8 xl:grid-cols-2 xl:gap-6">
        <div className="min-w-0 space-y-8">
          <WellbeingSection title="Reach out now">
            <ul className={WB_LIST}>
              <ContactRow
                title="Call 999"
                detail="Immediate danger or a medical emergency"
                action={
                  <ContactButton
                    urgent
                    href="tel:999"
                    label="999"
                    ariaLabel="Call 999"
                    onClick={() => onCrisisDial('999 Emergency')}
                  />
                }
              />
              <ContactRow
                title="Call Samaritans"
                detail="Free, 24/7. Someone to listen."
                action={
                  <ContactButton
                    urgent
                    href="tel:116123"
                    label="116 123"
                    ariaLabel="Call Samaritans on 116 123"
                    onClick={() => onCrisisDial('Samaritans 116 123')}
                  />
                }
              />
              <ContactRow
                title="Text SHOUT"
                detail="24/7 by text, if speaking feels harder"
                action={
                  <ContactButton
                    kind="text"
                    href="sms:85258?body=SHOUT"
                    label="85258"
                    ariaLabel="Text SHOUT to 85258"
                    onClick={() => onCrisisText('SHOUT 85258')}
                  />
                }
              />
            </ul>
            <p className="text-[13.5px] leading-relaxed text-white">
              A smaller first step is still a real first step. If calling feels too hard, start with
              a text.
            </p>
          </WellbeingSection>

          <WellbeingSection title="Crisis and urgent support">
            <ul className={WB_LIST}>
              {priorityHelplines.map((c) => (
                <ContactRow
                  key={`${c.name}-${c.phone}`}
                  title={c.name}
                  detail={`${c.description} · ${c.hours}`}
                  action={
                    <ContactButton
                      urgent
                      href={`tel:${c.phone.replace(/\s/g, '')}`}
                      label={c.phone}
                      ariaLabel={`Call ${c.name} on ${c.phone}`}
                      onClick={() => onCrisisDial(`${c.name} ${c.phone}`)}
                    />
                  }
                />
              ))}
            </ul>
          </WellbeingSection>
        </div>

        <div className="min-w-0 space-y-8">
          <WellbeingSection title="Find local help">
            <div className={WB_CARD}>
              <LocalResourceFinder />
            </div>
          </WellbeingSection>

          <WellbeingSection title="Ongoing support">
            <ul className={WB_LIST}>
              {supportLines.map((c) => (
                <ContactRow
                  key={`${c.name}-${c.phone}`}
                  title={c.name}
                  detail={c.description}
                  action={
                    <ContactButton
                      href={`tel:${c.phone.replace(/\s/g, '')}`}
                      label={c.phone}
                      ariaLabel={`Call ${c.name} on ${c.phone}`}
                    />
                  }
                />
              ))}
            </ul>
          </WellbeingSection>

          {/* Printable resources — a plan made on a good day, kept for a bad one */}
          <WellbeingSection title="Keep it on paper">
            <ul className={WB_LIST}>
              {[
                {
                  title: 'Crisis plan template',
                  detail: 'Fill in by hand: warning signs, coping steps, people to call.',
                  onClick: () => generateCrisisPlanPdf(),
                },
                {
                  title: 'Emergency contacts card',
                  detail: 'Wallet-size card of every verified helpline. Print and cut out.',
                  onClick: () => generateEmergencyContactsPdf(),
                },
              ].map((d) => (
                <li key={d.title}>
                  <button
                    type="button"
                    onClick={d.onClick}
                    className="flex min-h-[64px] w-full items-center gap-3 px-5 py-3.5 text-left transition-colors touch-manipulation hover:bg-white/[0.04] active:bg-white/[0.07] sm:px-6"
                  >
                    <Download className="h-[18px] w-[18px] shrink-0 text-white" strokeWidth={1.5} />
                    <span className="min-w-0 flex-1">
                      <span className="block text-[15px] font-semibold text-white">{d.title}</span>
                      <span className="mt-0.5 block text-[13px] leading-snug text-white">
                        {d.detail}
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </WellbeingSection>
        </div>
      </div>

      <WellbeingSection title="Trusted resources online">
        <ExternalLinkCards
          items={onlineResources.map((r) => ({
            title: r.title,
            description: r.description,
            url: r.url || '',
          }))}
        />
      </WellbeingSection>
    </div>
  );
};

export default CrisisResourcesTab;
