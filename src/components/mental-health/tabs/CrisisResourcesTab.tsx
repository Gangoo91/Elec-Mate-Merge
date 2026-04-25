import { openExternalUrl } from '@/utils/open-external-url';
import LocalResourceFinder from '@/components/mental-health/crisis/LocalResourceFinder';
import {
  emergencyContacts,
  onlineResources,
} from '@/components/mental-health/crisis/CrisisResourcesData';
import {
  PageHero,
  SectionHeader,
  ListCard,
  ListRow,
  Pill,
  Eyebrow,
} from '@/components/college/primitives';
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

const PHONE_PRIMARY =
  'inline-flex items-center gap-1.5 h-11 px-4 rounded-full bg-elec-yellow/15 text-elec-yellow border border-elec-yellow/25 text-[13px] font-semibold touch-manipulation';
const PHONE_SECONDARY =
  'inline-flex items-center gap-1.5 h-11 px-4 rounded-full bg-white/[0.06] text-white border border-white/[0.1] text-[13px] font-semibold touch-manipulation';

const CrisisResourcesTab = () => {
  const priorityHelplines = emergencyContacts.filter(
    (c) => c.type === 'emergency' || c.type === 'crisis'
  );
  const supportLines = emergencyContacts.filter(
    (c) => c.type === 'support' || c.type === 'specialty'
  );

  return (
    <div className="space-y-8 sm:space-y-10">
      <PageHero
        eyebrow="Crisis support"
        title="You're not alone"
        description="If you feel unsafe or overwhelmed, reach out now. Speed matters — pick the option that feels easiest."
        tone="red"
      />

      {/* Primary actions */}
      <div className="space-y-3">
        <Eyebrow>Reach out now</Eyebrow>
        <ListCard>
          <ListRow
            accent="red"
            title="Call 999"
            subtitle="Immediate danger or medical emergency"
            trailing={
              <a
                href="tel:999"
                onClick={() => onCrisisDial('999 Emergency')}
                className={PHONE_PRIMARY}
                aria-label="Call 999"
              >
                999
              </a>
            }
          />
          <ListRow
            accent="blue"
            title="Call Samaritans"
            subtitle="Free 24/7 support — someone to listen"
            trailing={
              <a
                href="tel:116123"
                onClick={() => onCrisisDial('Samaritans 116 123')}
                className={PHONE_PRIMARY}
                aria-label="Call Samaritans on 116 123"
              >
                116 123
              </a>
            }
          />
          <ListRow
            accent="purple"
            title="Text SHOUT"
            subtitle="24/7 text support — if speaking feels harder"
            trailing={
              <a
                href="sms:85258?body=SHOUT"
                onClick={() => onCrisisText('SHOUT 85258')}
                className={PHONE_SECONDARY}
                aria-label="Text SHOUT to 85258"
              >
                85258
              </a>
            }
          />
        </ListCard>
      </div>

      {/* Encouragement */}
      <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5">
        <div className="flex items-start gap-3">
          <Pill tone="emerald">Note</Pill>
          <p className="text-[13px] text-white leading-relaxed">
            A smaller first step is still a real first step. If calling feels too difficult, start
            with a text.
          </p>
        </div>
      </div>

      {/* Crisis helplines */}
      <div className="space-y-3">
        <SectionHeader eyebrow="Priority lines" title="Crisis & urgent support" />
        <ListCard>
          {priorityHelplines.map((c) => (
            <ListRow
              key={`${c.name}-${c.phone}`}
              accent="red"
              title={c.name}
              subtitle={`${c.description} · ${c.hours}`}
              trailing={
                <a
                  href={`tel:${c.phone.replace(/\s/g, '')}`}
                  onClick={() => onCrisisDial(`${c.name} ${c.phone}`)}
                  className={PHONE_PRIMARY}
                  aria-label={`Call ${c.name} on ${c.phone}`}
                >
                  {c.phone}
                </a>
              }
            />
          ))}
        </ListCard>
      </div>

      {/* Local resource finder */}
      <div className="space-y-3">
        <SectionHeader eyebrow="Nearby" title="Find local help" />
        <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5">
          <LocalResourceFinder />
        </div>
      </div>

      {/* Support lines */}
      <div className="space-y-3">
        <SectionHeader eyebrow="Long-term" title="Ongoing support" />
        <ListCard>
          {supportLines.map((c) => (
            <ListRow
              key={`${c.name}-${c.phone}`}
              accent="yellow"
              title={c.name}
              subtitle={c.description}
              trailing={
                <a
                  href={`tel:${c.phone.replace(/\s/g, '')}`}
                  className={PHONE_SECONDARY}
                  aria-label={`Call ${c.name} on ${c.phone}`}
                >
                  {c.phone}
                </a>
              }
            />
          ))}
        </ListCard>
      </div>

      {/* Online resources */}
      <div className="space-y-3">
        <SectionHeader eyebrow="Online" title="Trusted resources" />
        <ListCard>
          {onlineResources.map((r) => (
            <ListRow
              key={`${r.name}-${r.url}`}
              accent="cyan"
              title={r.name}
              subtitle={r.description}
              trailing={<Pill tone="cyan">Open</Pill>}
              onClick={() => openExternalUrl(r.url)}
            />
          ))}
        </ListCard>
      </div>
    </div>
  );
};

export default CrisisResourcesTab;
