/**
 * Policies (ELE-1946) — the firm's policies, written once and signed by the
 * team.
 *
 * The firm owns them (co-admins see and edit the same library). A policy is
 * adopted from a template or drafted with AI, published to the team, and each
 * person reads and signs it in Worker Tools. The list says where every policy
 * stands ("7 of 9 signed"); the export is the policy plus its acknowledgement
 * record, which is what an SSIP or principal contractor questionnaire asks for.
 *
 * URL: ?section=policies&policy=<id> opens a policy (the bell uses it).
 */
import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { PolicyViewer } from '@/components/employer/PolicyViewer';
import {
  FirmPolicySheet,
  changedSincePublished,
} from '@/components/employer/policies/FirmPolicySheet';
import { PolicyAiDraftSheet } from '@/components/employer/policies/PolicyAiDraftSheet';
import { PageFrame, PageHero, LoadingBlocks } from '@/components/employer/editorial';
import {
  frameClass,
  HeroActions,
  HeroPrimary,
  HeroSecondary,
  TwoColumn,
  Row,
  PanelHead,
  PlainEmpty,
  Tag,
  panel,
  rowsClass,
  plural,
} from '@/components/employer/pageParts/PageParts';
import { PageHelpButton, HowItWorks, type PageHelpContent } from '@/components/hub/PageHelp';
import {
  usePolicyTemplates,
  useUserPolicies,
  useAdoptedTemplateIds,
  type PolicyTemplate,
} from '@/hooks/usePolicies';
import { useFirmPolicyStatus, type PolicyStatus } from '@/hooks/useFirmSignoffAttention';

const HELP: PageHelpContent = {
  id: 'employer-policies',
  title: 'Policies',
  what: 'Your company policies, and proof your team has read them. Each person signs every version in the app, and you can print the policy with its list of signatures.',
  steps: [
    {
      title: 'Start a policy',
      body: 'Adopt one of the templates, or tap Draft with AI and say what it is about. Read it through and fill in anything in square brackets.',
    },
    {
      title: 'Publish it to the team',
      body: 'Everyone on your team who is on the app gets a notification to read and sign it in Worker Tools.',
    },
    {
      title: 'See who has signed',
      body: 'Each policy shows how many have signed, and who is still to. Change a policy and send the new version; everyone signs again.',
    },
    {
      title: 'Show it when asked',
      body: 'Export with signatures gives you the policy and the acknowledgement record in one PDF, for SSIP and principal contractor questionnaires.',
    },
  ],
};

const day = (iso?: string | null) => {
  if (!iso) return '';
  try {
    return format(parseISO(iso), 'd MMM yyyy');
  } catch {
    return '';
  }
};

export function PoliciesSection() {
  const [params, setParams] = useSearchParams();
  const openId = params.get('policy');
  const [templateOpen, setTemplateOpen] = useState<PolicyTemplate | null>(null);
  const [aiOpen, setAiOpen] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);

  const { data: templates = [], isLoading: templatesLoading } = usePolicyTemplates();
  const { data: policies = [], isLoading: policiesLoading } = useUserPolicies();
  const { data: adoptedTemplateIds = [] } = useAdoptedTemplateIds();
  const { data: status = [] } = useFirmPolicyStatus();

  const statusById = useMemo(() => {
    const m = new Map<string, PolicyStatus>();
    status.forEach((s) => m.set(s.id, s));
    return m;
  }, [status]);

  const live = policies.filter((p) => p.status !== 'Archived');
  const selected = openId ? (policies.find((p) => p.id === openId) ?? null) : null;
  const openPolicy = (id: string | null) => {
    const next = new URLSearchParams(params);
    if (id) next.set('policy', id);
    else next.delete('policy');
    setParams(next, { replace: !id });
  };

  const today = new Date().toISOString().slice(0, 10);
  const soon = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
  const reviewDue = live
    .filter((p) => p.review_date && p.review_date <= soon)
    .sort((a, b) => (a.review_date ?? '').localeCompare(b.review_date ?? ''));
  const available = templates.filter((t) => !adoptedTemplateIds.includes(t.id));

  const waiting = live
    .map((p) => statusById.get(p.id))
    .filter(
      (s): s is PolicyStatus => !!s && s.published_version != null && s.acknowledged < s.team
    );
  const drafts = live.filter((p) => p.published_version == null);

  const statusLine = policiesLoading
    ? 'Loading your policies'
    : live.length === 0
      ? 'No policies yet'
      : waiting.length === 1
        ? `${waiting[0].name} v${waiting[0].published_version}: ${waiting[0].acknowledged} of ${waiting[0].team} signed`
        : waiting.length > 1
          ? `${plural(waiting.length, 'policy', 'policies')} waiting for signatures`
          : drafts.length
            ? `${plural(drafts.length, 'policy', 'policies')} not sent to the team yet`
            : `${plural(live.length, 'policy', 'policies')}, all signed`;

  const rowStatus = (id: string, publishedVersion: number | null | undefined, changed: boolean) => {
    const s = statusById.get(id);
    if (publishedVersion == null) return <Tag tone="outline">Draft</Tag>;
    if (changed) return <Tag tone="yellow">Changed</Tag>;
    if (!s || s.team === 0) return <Tag tone="neutral">Published</Tag>;
    if (s.acknowledged >= s.team) return <Tag tone="done">All signed</Tag>;
    return (
      <Tag tone="yellow">
        {s.acknowledged} of {s.team}
      </Tag>
    );
  };

  const policiesPanel = (
    <section className={panel}>
      <PanelHead title="Your policies" meta={live.length ? <Tag>{live.length}</Tag> : undefined} />
      {policiesLoading ? (
        <div className="px-4 py-4 sm:px-5">
          <LoadingBlocks />
        </div>
      ) : live.length === 0 ? (
        <PlainEmpty
          bare
          text="Adopt a template or draft one with AI. Then publish it, and your team signs it in the app."
          action="Draft with AI"
          onAction={() => setAiOpen(true)}
        />
      ) : (
        <div className={rowsClass}>
          {live.map((p) => {
            const changed = changedSincePublished(p);
            return (
              <Row
                key={p.id}
                title={p.name}
                detail={
                  p.published_version != null
                    ? `Version ${p.published_version} · sent ${day(p.published_at)}${p.review_date ? ` · review ${day(p.review_date)}` : ''}`
                    : `Not sent to the team${p.review_date ? ` · review ${day(p.review_date)}` : ''}`
                }
                status={rowStatus(p.id, p.published_version, changed)}
                onClick={() => openPolicy(p.id)}
              />
            );
          })}
        </div>
      )}
    </section>
  );

  const reviewPanel = (
    <section className={panel}>
      <PanelHead title="Due for review" />
      {reviewDue.length === 0 ? (
        <PlainEmpty bare text="Nothing due in the next 30 days." />
      ) : (
        <div className={rowsClass}>
          {reviewDue.map((p) => (
            <Row
              key={p.id}
              title={p.name}
              detail={`${(p.review_date ?? '') < today ? 'Was due' : 'Due'} ${day(p.review_date)}`}
              status={
                (p.review_date ?? '') < today ? (
                  <Tag tone="red">Overdue</Tag>
                ) : (
                  <Tag tone="yellow">Soon</Tag>
                )
              }
              onClick={() => openPolicy(p.id)}
            />
          ))}
        </div>
      )}
    </section>
  );

  const templatesPanel = (
    <section className={panel} id="policy-templates">
      <PanelHead
        title="Templates"
        meta={available.length ? <Tag>{available.length}</Tag> : undefined}
        action={!showTemplates && available.length > 4 ? 'Show all' : undefined}
        onAction={() => setShowTemplates(true)}
      />
      {templatesLoading ? (
        <div className="px-4 py-4 sm:px-5">
          <LoadingBlocks />
        </div>
      ) : available.length === 0 ? (
        <PlainEmpty bare text="You have adopted every template." />
      ) : (
        <div className={rowsClass}>
          {(showTemplates ? available : available.slice(0, 4)).map((t) => (
            <Row
              key={t.id}
              title={t.name}
              detail={`${t.category} · version ${t.version}`}
              onClick={() => setTemplateOpen(t)}
            />
          ))}
        </div>
      )}
    </section>
  );

  return (
    <PageFrame className={frameClass}>
      <PageHero
        title="Policies"
        description={statusLine}
        actions={
          <HeroActions>
            <HeroPrimary onClick={() => setAiOpen(true)}>Draft with AI</HeroPrimary>
            <HeroSecondary
              labelOnPhone
              onClick={() => {
                setShowTemplates(true);
                document.getElementById('policy-templates')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Templates
            </HeroSecondary>
            <PageHelpButton help={HELP} askContext={{ page: 'policies' }} />
          </HeroActions>
        }
      />

      <HowItWorks help={HELP} askContext={{ page: 'policies' }} />

      <TwoColumn
        main={policiesPanel}
        side={
          <>
            {reviewPanel}
            {templatesPanel}
          </>
        }
      />

      <FirmPolicySheet
        policy={selected}
        open={!!selected}
        onOpenChange={(o) => !o && openPolicy(null)}
      />
      <PolicyViewer
        open={!!templateOpen}
        onOpenChange={(o) => !o && setTemplateOpen(null)}
        template={templateOpen}
        userPolicy={null}
        isAdopted={templateOpen ? adoptedTemplateIds.includes(templateOpen.id) : false}
      />
      <PolicyAiDraftSheet
        open={aiOpen}
        onOpenChange={setAiOpen}
        onCreated={(p) => openPolicy(p.id)}
      />
    </PageFrame>
  );
}
