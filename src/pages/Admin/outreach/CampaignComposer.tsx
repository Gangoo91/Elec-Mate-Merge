import { useEffect, useMemo, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Mail,
  Loader2,
  Smartphone,
  Monitor,
  Code2,
  Eye,
  Wand2,
  Users,
  Tag,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  callOutreach,
  CONTACT_TYPES,
  MERGE_TAGS,
  type OutreachTemplate,
} from './shared';

interface CampaignComposerProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onSuccess: () => void;
  /** If set, composer initialises with this template's content. */
  initialTemplate?: OutreachTemplate | null;
}

const FROM_OPTIONS = [
  { email: 'founder@elec-mate.com', name: 'Andrew from Elec-Mate' },
  { email: 'hello@elec-mate.com', name: 'Elec-Mate' },
  { email: 'tutors@elec-mate.com', name: 'Elec-Mate Tutors' },
];

export default function CampaignComposer({
  open,
  onOpenChange,
  onSuccess,
  initialTemplate,
}: CampaignComposerProps) {
  const { toast } = useToast();
  const [step, setStep] = useState<'compose' | 'preview'>('compose');
  const [previewMode, setPreviewMode] = useState<'mobile' | 'desktop' | 'code'>('mobile');

  const [form, setForm] = useState({
    name: '',
    subject: '',
    preheader: '',
    html_body: '',
    from_email: FROM_OPTIONS[0].email,
    from_name: FROM_OPTIONS[0].name,
    reply_to: 'founder@elec-mate.com',
    template_slug: null as string | null,
    segment_contact_types: [] as string[],
    segment_tags: '',
  });

  // Apply template when it changes
  useEffect(() => {
    if (initialTemplate) {
      setForm((f) => ({
        ...f,
        subject: initialTemplate.subject,
        preheader: initialTemplate.preheader || '',
        html_body: initialTemplate.html_body,
        template_slug: initialTemplate.slug,
        name: f.name || initialTemplate.name,
        segment_contact_types:
          initialTemplate.category === 'general'
            ? f.segment_contact_types
            : initialTemplate.category === 'follow_up'
              ? f.segment_contact_types
              : [initialTemplate.category],
      }));
    }
  }, [initialTemplate]);

  // Reset when closed
  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setStep('compose');
        setForm({
          name: '',
          subject: '',
          preheader: '',
          html_body: '',
          from_email: FROM_OPTIONS[0].email,
          from_name: FROM_OPTIONS[0].name,
          reply_to: 'founder@elec-mate.com',
          template_slug: null,
          segment_contact_types: [],
          segment_tags: '',
        });
      }, 250);
    }
  }, [open]);

  const { data: templateList } = useQuery({
    queryKey: ['outreach-templates'],
    queryFn: () => callOutreach('list_templates'),
    staleTime: 60_000,
    enabled: open,
  });

  // Live preview render (merge tags resolved by edge fn)
  const { data: rendered } = useQuery({
    queryKey: ['outreach-preview', form.html_body, form.subject],
    queryFn: () =>
      callOutreach('preview_render', {
        html_body: form.html_body,
        subject: form.subject,
      }),
    staleTime: 5_000,
    enabled: open && !!form.html_body,
  });

  const createMutation = useMutation({
    mutationFn: () =>
      callOutreach('create_campaign', {
        name: form.name,
        subject: form.subject,
        preheader: form.preheader || undefined,
        html_body: form.html_body,
        from_name: form.from_name,
        from_email: form.from_email,
        reply_to: form.reply_to,
        template_slug: form.template_slug,
        segment_filter: {
          contact_type:
            form.segment_contact_types.length > 0 ? form.segment_contact_types : undefined,
          tags: form.segment_tags
            ? form.segment_tags.split(',').map((t) => t.trim()).filter(Boolean)
            : undefined,
        },
      }),
    onSuccess: () => {
      toast({
        title: 'Campaign created',
        description: 'Now review recipients, send a test, then start sending.',
      });
      onSuccess();
    },
    onError: (e: Error) => toast({ title: 'Error', description: e.message, variant: 'destructive' }),
  });

  const toggleType = (type: string) => {
    setForm((f) => ({
      ...f,
      segment_contact_types: f.segment_contact_types.includes(type)
        ? f.segment_contact_types.filter((t) => t !== type)
        : [...f.segment_contact_types, type],
    }));
  };

  const applyTemplate = (slug: string) => {
    const t = (templateList?.templates || []).find((x: OutreachTemplate) => x.slug === slug);
    if (!t) return;
    setForm((f) => ({
      ...f,
      subject: t.subject,
      preheader: t.preheader || '',
      html_body: t.html_body,
      template_slug: t.slug,
      name: f.name || t.name,
    }));
    toast({ title: `Loaded template: ${t.name}` });
  };

  const insertMergeTag = (tag: string) => {
    const ta = document.getElementById('composer-html-body') as HTMLTextAreaElement | null;
    const subj = document.getElementById('composer-subject') as HTMLInputElement | null;
    const target: HTMLInputElement | HTMLTextAreaElement | null =
      document.activeElement === subj ? subj : ta;
    if (!target) {
      setForm((f) => ({ ...f, html_body: f.html_body + tag }));
      return;
    }
    const start = target.selectionStart ?? target.value.length;
    const end = target.selectionEnd ?? target.value.length;
    const before = target.value.slice(0, start);
    const after = target.value.slice(end);
    const next = before + tag + after;
    if (target === subj) setForm((f) => ({ ...f, subject: next }));
    else setForm((f) => ({ ...f, html_body: next }));
    setTimeout(() => {
      target.focus();
      target.setSelectionRange(start + tag.length, start + tag.length);
    }, 0);
  };

  const canSubmit = form.name.trim() && form.subject.trim() && form.html_body.trim();

  const previewIframeHeight = useMemo(
    () => (previewMode === 'mobile' ? '80vh' : '80vh'),
    [previewMode]
  );

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[96vh] rounded-t-3xl p-0 border-t border-border/50 max-w-none">
        <div className="flex flex-col h-full bg-background">
          <div className="flex justify-center pt-3 pb-2">
            <div className="w-12 h-1.5 rounded-full bg-muted-foreground/20" />
          </div>
          <SheetHeader className="px-5 pb-3 border-b border-border/50">
            <div className="flex items-center justify-between">
              <SheetTitle className="flex items-center gap-2 text-white">
                <Mail className="h-5 w-5 text-elec-yellow" />
                New campaign
              </SheetTitle>
              <div className="flex items-center rounded-lg bg-white/[0.04] p-1 border border-white/[0.08]">
                <button
                  onClick={() => setStep('compose')}
                  className={`h-8 px-3 text-xs font-medium rounded-md touch-manipulation ${
                    step === 'compose'
                      ? 'bg-elec-yellow text-black'
                      : 'text-white hover:text-white'
                  }`}
                >
                  Compose
                </button>
                <button
                  onClick={() => setStep('preview')}
                  className={`h-8 px-3 text-xs font-medium rounded-md touch-manipulation ${
                    step === 'preview'
                      ? 'bg-elec-yellow text-black'
                      : 'text-white hover:text-white'
                  }`}
                >
                  Preview
                </button>
              </div>
            </div>
          </SheetHeader>

          {step === 'compose' ? (
            <div className="flex-1 overflow-y-auto p-5 space-y-5">
              {/* Template quick-pick */}
              {templateList?.templates?.length > 0 && (
                <Section icon={<Sparkles className="h-4 w-4 text-violet-300" />} title="Start from a template">
                  <Select
                    value={form.template_slug || ''}
                    onValueChange={applyTemplate}
                  >
                    <SelectTrigger className="h-11 touch-manipulation rounded-xl">
                      <SelectValue placeholder="Blank — start from scratch" />
                    </SelectTrigger>
                    <SelectContent>
                      {templateList.templates.map((t: OutreachTemplate) => (
                        <SelectItem key={t.slug} value={t.slug}>
                          {t.thumbnail_emoji} {t.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Section>
              )}

              {/* Campaign details */}
              <Section icon={<Mail className="h-4 w-4 text-elec-yellow" />} title="Campaign details">
                <FieldRow label="Campaign name *">
                  <Input
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    placeholder="e.g. College Partnership Outreach — Q2 2026"
                    className="h-11 touch-manipulation"
                  />
                </FieldRow>
                <FieldRow label="From">
                  <Select
                    value={form.from_email}
                    onValueChange={(v) => {
                      const o = FROM_OPTIONS.find((x) => x.email === v);
                      setForm((f) => ({
                        ...f,
                        from_email: v,
                        from_name: o?.name || f.from_name,
                      }));
                    }}
                  >
                    <SelectTrigger className="h-11 touch-manipulation">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {FROM_OPTIONS.map((o) => (
                        <SelectItem key={o.email} value={o.email}>
                          {o.name} &lt;{o.email}&gt;
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FieldRow>
                <FieldRow label="Reply-to">
                  <Input
                    value={form.reply_to}
                    onChange={(e) => setForm((f) => ({ ...f, reply_to: e.target.value }))}
                    placeholder="founder@elec-mate.com"
                    className="h-11 touch-manipulation"
                  />
                </FieldRow>
              </Section>

              {/* Subject + preheader */}
              <Section icon={<Wand2 className="h-4 w-4 text-violet-300" />} title="Subject line & preheader">
                <FieldRow label="Subject *">
                  <Input
                    id="composer-subject"
                    value={form.subject}
                    onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
                    placeholder="A free tool built for your apprentices"
                    className="h-11 touch-manipulation"
                  />
                </FieldRow>
                <FieldRow
                  label="Preheader"
                  hint="Shown next to the subject in the inbox — 40–90 chars recommended."
                >
                  <Input
                    value={form.preheader}
                    onChange={(e) => setForm((f) => ({ ...f, preheader: e.target.value }))}
                    placeholder="Portfolio, EPA prep, Study Centre — free for tutors."
                    className="h-11 touch-manipulation"
                  />
                </FieldRow>

                {/* Merge tag bar */}
                <div className="rounded-xl bg-elec-yellow/5 border border-elec-yellow/20 p-3">
                  <p className="text-[11px] text-elec-yellow uppercase tracking-wider font-semibold mb-2">
                    Merge tags — click to insert
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {MERGE_TAGS.map((mt) => (
                      <button
                        key={mt.tag}
                        onClick={() => insertMergeTag(mt.tag)}
                        title={`${mt.label} · example: ${mt.example}`}
                        className="h-8 px-2.5 rounded-lg bg-white/[0.06] text-xs font-mono text-white border border-white/10 hover:bg-elec-yellow/10 hover:border-elec-yellow/40 touch-manipulation"
                      >
                        {mt.tag}
                      </button>
                    ))}
                  </div>
                </div>
              </Section>

              {/* Body */}
              <Section icon={<Code2 className="h-4 w-4 text-blue-300" />} title="Email body (HTML)">
                <Textarea
                  id="composer-html-body"
                  value={form.html_body}
                  onChange={(e) => setForm((f) => ({ ...f, html_body: e.target.value }))}
                  placeholder={'<h1>Hi {{FirstName}}</h1><p>Your email content…</p>'}
                  className="min-h-[280px] font-mono text-xs leading-relaxed touch-manipulation"
                />
                <p className="text-[11px] text-white mt-1">
                  Tip: Tap <strong className="text-elec-yellow">Preview</strong> at the top to
                  see the email with merge tags filled in.
                </p>
              </Section>

              {/* Segmentation */}
              <Section icon={<Users className="h-4 w-4 text-blue-300" />} title="Who gets this email">
                <Label className="text-white text-sm">Contact types</Label>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {CONTACT_TYPES.map((type) => (
                    <button
                      key={type}
                      onClick={() => toggleType(type)}
                      className={`h-9 px-3 rounded-full text-xs font-medium touch-manipulation transition-colors ${
                        form.segment_contact_types.includes(type)
                          ? 'bg-elec-yellow text-black'
                          : 'bg-white/[0.04] text-white border border-white/10'
                      }`}
                    >
                      {type.replace('_', ' ')}
                    </button>
                  ))}
                </div>
                <p className="text-[11px] text-white mt-1">
                  Leave all empty to send to every non-suppressed contact.
                </p>

                <FieldRow
                  label="Tag filter (comma-separated)"
                  hint="Sends only to contacts with at least one matching tag."
                >
                  <div className="relative">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white" />
                    <Input
                      value={form.segment_tags}
                      onChange={(e) => setForm((f) => ({ ...f, segment_tags: e.target.value }))}
                      placeholder="london, q2-2026"
                      className="h-11 pl-10 touch-manipulation"
                    />
                  </div>
                </FieldRow>
              </Section>

              {/* Submit */}
              <div className="pb-4">
                <Button
                  className="w-full h-12 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation rounded-xl"
                  onClick={() => createMutation.mutate()}
                  disabled={!canSubmit || createMutation.isPending}
                >
                  {createMutation.isPending ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <>
                      Save as draft
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </>
                  )}
                </Button>
                <p className="text-[11px] text-white mt-2 text-center">
                  Creates a draft — you can send a test, schedule, or start sending next.
                </p>
              </div>
            </div>
          ) : (
            // ─── Preview pane ────────────────────────────────────
            <div className="flex-1 overflow-y-auto flex flex-col">
              <div className="px-5 py-3 border-b border-border/30 flex items-center justify-between">
                <div className="min-w-0">
                  <p className="text-[11px] text-white uppercase tracking-wider">Subject</p>
                  <p className="text-white text-sm font-medium truncate">
                    {rendered?.subject || form.subject || '—'}
                  </p>
                </div>
                <div className="flex items-center rounded-lg bg-white/[0.04] p-1 border border-white/[0.08] shrink-0 ml-3">
                  <button
                    onClick={() => setPreviewMode('mobile')}
                    className={`h-8 w-8 flex items-center justify-center rounded-md touch-manipulation ${
                      previewMode === 'mobile' ? 'bg-elec-yellow text-black' : 'text-white'
                    }`}
                  >
                    <Smartphone className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setPreviewMode('desktop')}
                    className={`h-8 w-8 flex items-center justify-center rounded-md touch-manipulation ${
                      previewMode === 'desktop' ? 'bg-elec-yellow text-black' : 'text-white'
                    }`}
                  >
                    <Monitor className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setPreviewMode('code')}
                    className={`h-8 w-8 flex items-center justify-center rounded-md touch-manipulation ${
                      previewMode === 'code' ? 'bg-elec-yellow text-black' : 'text-white'
                    }`}
                  >
                    <Code2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="p-4 flex-1 overflow-hidden">
                {previewMode === 'code' ? (
                  <pre className="w-full h-full overflow-auto rounded-xl border border-border/30 bg-black/60 text-xs text-white p-4 font-mono whitespace-pre-wrap">
                    {rendered?.html || form.html_body}
                  </pre>
                ) : (
                  <div
                    className={`mx-auto rounded-xl overflow-hidden border border-border/30 transition-all ${
                      previewMode === 'mobile' ? 'max-w-[390px]' : 'max-w-[680px]'
                    }`}
                  >
                    <div className="bg-white/[0.04] border-b border-white/[0.06] px-3 py-1.5 flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400/60" />
                      <span className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
                      <span className="ml-2 text-[10px] text-white">
                        {previewMode === 'mobile' ? 'iPhone preview' : 'Desktop preview'} · merge tags filled
                      </span>
                    </div>
                    <iframe
                      srcDoc={rendered?.html || form.html_body || ''}
                      title="Preview"
                      className="w-full block bg-black"
                      style={{ height: previewIframeHeight }}
                    />
                  </div>
                )}
              </div>

              <div className="px-5 py-3 border-t border-border/50 flex items-center justify-between gap-3">
                <div className="text-xs text-white">
                  <Badge className="bg-elec-yellow/20 text-elec-yellow text-[10px] mr-1.5">
                    <Eye className="h-2.5 w-2.5 mr-0.5 inline" />
                    Live preview
                  </Badge>
                  Sample: Sam Tutor · Sample College · London
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-9 text-white hover:bg-white/5 touch-manipulation"
                  onClick={() => setStep('compose')}
                >
                  Back to edit
                </Button>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

function Section({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        {icon}
        <p className="text-xs text-white uppercase tracking-wider font-semibold">{title}</p>
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function FieldRow({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Label className="text-white text-sm">{label}</Label>
      <div className="mt-1.5">{children}</div>
      {hint && <p className="text-[11px] text-white mt-1">{hint}</p>}
    </div>
  );
}
