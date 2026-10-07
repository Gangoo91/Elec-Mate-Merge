import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  PageFrame,
  PageHero,
  StatStrip,
  ListCard,
  ListCardHeader,
  ListBody,
  ListRow,
  Avatar,
  Pill,
  EmptyState,
  LoadingBlocks,
  PrimaryButton,
  type Tone,
} from '@/components/employer/editorial';
import {
  PageHelpButton,
  HowItWorks,
  type PageHelpContent,
  type HelpBlocker,
} from '@/components/hub/PageHelp';
import { useClientSummaries } from '@/hooks/useEmployerClients';
import {
  useClientMessageInbox,
  useFirmPortalLinks,
  type FirmPortalLinkRow,
} from '@/hooks/useCustomerPortal';

/* ==========================================================================
   Client portal (ELE-1996). One private page per client, shared from the
   client's record. This page is the firm-wide view: every conversation with
   a client, and every portal link with whether it has been opened.

   Before: links were per job, 0 were ever made, the invoices tab read a dead
   table, messages were unreachable until a link existed, and the "Active
   clients" stat really counted active links. Every figure here says exactly
   what it counts.
   ========================================================================== */

const HELP: PageHelpContent = {
  id: 'employer-client-portal',
  title: 'Client portal',
  what: (
    <>
      Each client gets one private page with their jobs and dates, who is coming on the day,
      certificates to download, quotes to accept, invoices with Pay now, and a message thread with
      you. They open it from a link, with no account or password.
    </>
  ),
  steps: [
    {
      title: 'Open the client',
      body: 'Go to Clients and open the client. The Client portal card makes their link the first time you tap Create.',
    },
    {
      title: 'Send it',
      body: 'Copy it, share it, send it by WhatsApp or email, or show the QR code on site. Invoice emails also carry it.',
    },
    {
      title: 'Answer messages',
      body: 'Messages from clients land here, on the client record and in your notifications. Reply from the client record.',
    },
  ],
  notes: [
    {
      title: 'What the client sees',
      body: 'Only their own jobs, certificates, quotes and invoices. Staff appear by first name only, and only if they have switched on "Show me to customers". No phone numbers, costs or safety records.',
    },
    {
      title: 'Certificates',
      body: 'Shown once issued. If you hold a certificate until the invoice is paid, or a QS still has to sign it off, the client sees "Being finalised" until it is released.',
    },
    {
      title: 'Turning a link off',
      body: 'Pause it, give it an expiry, make a new link if it went to the wrong person, or switch it off for good. Messages are kept either way.',
    },
  ],
  tasks: [
    {
      title: 'Give a client their portal',
      steps: [
        'Tap Share with a client. It opens Clients.',
        'Tap the client, then Create portal link in the Client portal card.',
        'Tap Copy, Share, WhatsApp or Email, or QR code to show it on site.',
      ],
      after: 'WhatsApp needs a mobile number on the client, Email needs an email address. The link shows here as Live.',
      tour: [{ target: 'clientportal.share', caption: 'Tap Share with a client, then open the client.' }],
    },
    {
      title: 'Reply to a client message',
      steps: [
        'Under Messages, tap the client. Unread ones show a purple pill.',
        'Their record opens with the thread in view.',
        'Type in the box and tap Send.',
      ],
      tour: [{ target: 'clientportal.messages', caption: 'Tap a conversation to open it and reply.' }],
    },
    {
      title: 'Check a client has opened it',
      steps: [
        'Look under Portal links.',
        'Each client shows how many times they opened it and when, or Not shared or opened yet.',
        'Live, Paused or Expired shows on the right.',
      ],
      tour: [{ target: 'clientportal.links', caption: 'Opened counts and Live, Paused or Expired show here.' }],
    },
    {
      title: 'Pause, expire or switch off a link',
      steps: [
        'Tap the client under Portal links. Their record opens.',
        'In the Client portal card, pick how long the link lasts: No expiry, 30 days, 90 days or 1 year.',
        'Tap Pause to hide it for now, New link if it went to the wrong person, or Switch off to end it for good.',
      ],
      after: 'Messages are kept whichever you choose.',
    },
  ],
};

const shortDate = (d: string | null) =>
  d ? new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) : '';

const ago = (d: string) => {
  const mins = Math.round((Date.now() - new Date(d).getTime()) / 60_000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${hrs} hr${hrs === 1 ? '' : 's'} ago`;
  return shortDate(d);
};

const initialsOf = (name: string) =>
  name
    .split(' ')
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase() || '?';

function linkStatus(l: FirmPortalLinkRow): { label: string; tone: Tone } {
  if (l.expires_at && new Date(l.expires_at).getTime() <= Date.now())
    return { label: 'Expired', tone: 'red' };
  if (l.is_active === false) return { label: 'Paused', tone: 'amber' };
  return { label: 'Live', tone: 'emerald' };
}

export function ClientPortalSection() {
  const [, setSearchParams] = useSearchParams();
  const { data: clients = [] } = useClientSummaries();
  const { data: links = [], isLoading: linksLoading } = useFirmPortalLinks();
  const { data: inbox = [], isLoading: inboxLoading } = useClientMessageInbox();

  const nameById = useMemo(() => new Map(clients.map((c) => [c.id, c.name])), [clients]);

  const openClient = (customerId: string, messages = false) =>
    setSearchParams(
      messages
        ? { section: 'clients', client: customerId, tab: 'messages' }
        : { section: 'clients', client: customerId }
    );

  const live = links.filter((l) => linkStatus(l).label === 'Live').length;
  const opened = links.filter((l) => (l.views_count ?? 0) > 0).length;
  const unread = inbox.reduce((s, t) => s + (t.unread || 0), 0);
  const waiting = inbox.filter((t) => t.unread > 0).length;

  // Live "Before you start" line for the help (ELE-1980).
  const helpBlockers: HelpBlocker[] =
    !linksLoading && links.length === 0
      ? [
          {
            text: 'No client has a portal link yet. Make one from a client record.',
            fixLabel: 'Go to Clients',
            onFix: () => setSearchParams({ section: 'clients' }),
          },
        ]
      : [];

  return (
    <PageFrame>
      <PageHero
        eyebrow="Clients"
        title="Client portal"
        description="One private page per client: jobs, who is coming, certificates, invoices with Pay now, and messages to you."
        tone="blue"
        actions={
          <>
            <PrimaryButton
              data-help="clientportal.share"
              onClick={() => setSearchParams({ section: 'clients' })}
            >
              Share with a client
            </PrimaryButton>
            <PageHelpButton
              help={HELP}
              blockers={helpBlockers}
              askContext={{ page: 'clientportal' }}
            />
          </>
        }
      />

      <HowItWorks help={HELP} blockers={helpBlockers} askContext={{ page: 'clientportal' }} />

      <StatStrip
        columns={4}
        stats={[
          { label: 'Clients with a live link', value: live, accent: true },
          { label: 'Links opened', value: opened, tone: 'cyan' },
          {
            label: 'Unread messages',
            value: unread,
            tone: unread > 0 ? 'purple' : 'emerald',
          },
          { label: 'Clients waiting on you', value: waiting, tone: waiting > 0 ? 'amber' : 'emerald' },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
        <div data-help="clientportal.messages">
        <ListCard>
          <ListCardHeader
            tone="purple"
            title="Messages"
            meta={unread > 0 ? <Pill tone="purple">{unread} new</Pill> : undefined}
          />
          {inboxLoading ? (
            <div className="p-4">
              <LoadingBlocks />
            </div>
          ) : inbox.length === 0 ? (
            <div className="p-4">
              <EmptyState
                title="No messages yet"
                description="When a client writes to you from their portal, it shows here, on their record and in your notifications."
              />
            </div>
          ) : (
            <ListBody>
              {inbox.map((t) => (
                <ListRow
                  key={t.customer_id}
                  onClick={() => openClient(t.customer_id, true)}
                  lead={<Avatar initials={initialsOf(t.customer_name)} />}
                  title={t.customer_name}
                  subtitle={`${t.last_from === 'employer' ? 'You: ' : ''}${t.last_message}`}
                  trailing={
                    <span className="flex items-center gap-2">
                      <span className="text-[11.5px] text-white">{ago(t.last_at)}</span>
                      {t.unread > 0 && <Pill tone="purple">{t.unread} new</Pill>}
                    </span>
                  }
                />
              ))}
            </ListBody>
          )}
        </ListCard>
        </div>

        <div data-help="clientportal.links">
        <ListCard>
          <ListCardHeader tone="blue" title="Portal links" meta={<Pill tone="cyan">{links.length}</Pill>} />
          {linksLoading ? (
            <div className="p-4">
              <LoadingBlocks />
            </div>
          ) : links.length === 0 ? (
            <div className="p-4">
              <EmptyState
                title="No client has a link yet"
                description="Open a client and tap Create portal link. It takes a second and you can switch it off at any time."
                action="Go to Clients"
                onAction={() => setSearchParams({ section: 'clients' })}
              />
            </div>
          ) : (
            <ListBody>
              {links.map((l) => {
                const name = nameById.get(l.customer_id) ?? 'Client';
                const st = linkStatus(l);
                const views = l.views_count ?? 0;
                return (
                  <ListRow
                    key={l.id}
                    onClick={() => openClient(l.customer_id)}
                    lead={<Avatar initials={initialsOf(name)} />}
                    title={name}
                    subtitle={
                      views > 0
                        ? `Opened ${views} time${views === 1 ? '' : 's'}, last ${shortDate(l.last_accessed_at)}`
                        : l.last_shared_at
                          ? `Shared ${shortDate(l.last_shared_at)}, not opened yet`
                          : 'Not shared or opened yet'
                    }
                    trailing={<Pill tone={st.tone}>{st.label}</Pill>}
                  />
                );
              })}
            </ListBody>
          )}
        </ListCard>
        </div>
      </div>
    </PageFrame>
  );
}

export default ClientPortalSection;
