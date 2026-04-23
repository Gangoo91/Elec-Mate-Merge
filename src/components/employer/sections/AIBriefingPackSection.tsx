import { useState, useRef } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { JobPackSelector } from '@/components/employer/smart-docs/JobPackSelector';
import { useJobPacks, useUpdateJobPack } from '@/hooks/useJobPacks';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { Section } from '@/pages/employer/EmployerDashboard';
import {
  PageFrame,
  PageHero,
  StatStrip,
  ListCard,
  ListCardHeader,
  ListBody,
  ListRow,
  IconButton,
  Pill,
  LoadingBlocks,
  EmptyState,
  Eyebrow,
  Dot,
  PrimaryButton,
  SecondaryButton,
  textareaClass,
} from '@/components/employer/editorial';
import { RefreshCw, Loader2, Download, Sparkles, ImagePlus, X } from 'lucide-react';

interface AIBriefingPackSectionProps {
  onNavigate: (section: Section) => void;
}

interface AttachedPhoto {
  id: string;
  name: string;
  size: number;
  dataUrl: string;
}

export function AIBriefingPackSection({ onNavigate }: AIBriefingPackSectionProps) {
  const { data: jobPacks = [], isLoading } = useJobPacks();
  const updateJobPack = useUpdateJobPack();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [selectedJobPackId, setSelectedJobPackId] = useState<string | null>(null);
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [photos, setPhotos] = useState<AttachedPhoto[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const selectedJobPack = jobPacks.find((jp) => jp.id === selectedJobPackId);
  const hasRAMS = selectedJobPack?.rams_generated;
  const hasMethodStatement = selectedJobPack?.method_statement_generated;
  const canGenerate = hasRAMS && hasMethodStatement;

  const briefingsGenerated = jobPacks.filter((jp) => jp.briefing_pack_generated).length;
  const packsSent = jobPacks.filter((jp) => jp.briefing_pack_generated).length;

  const handlePickPhotos = () => fileInputRef.current?.click();

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (!files.length) return;
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = String(reader.result || '');
        setPhotos((prev) => [
          ...prev,
          {
            id: `${file.name}-${Date.now()}-${Math.random()}`,
            name: file.name,
            size: file.size,
            dataUrl,
          },
        ]);
      };
      reader.readAsDataURL(file);
    });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleRemovePhoto = (id: string) => {
    setPhotos((prev) => prev.filter((p) => p.id !== id));
  };

  const handleGenerate = async () => {
    if (!selectedJobPackId) {
      toast({
        title: 'Select a job pack',
        description: 'Please select a job pack to generate a briefing for.',
        variant: 'destructive',
      });
      return;
    }
    if (!canGenerate) {
      toast({
        title: 'Prerequisites missing',
        description: 'RAMS and Method Statement must be generated first.',
        variant: 'destructive',
      });
      return;
    }

    setIsGenerating(true);
    setError(null);
    setResult(null);

    try {
      const { data, error: invokeError } = await supabase.functions.invoke(
        'generate-briefing-content',
        {
          body: {
            jobPackId: selectedJobPackId,
            projectInfo: {
              projectName: selectedJobPack?.title,
              location: selectedJobPack?.location,
              scope: selectedJobPack?.scope,
            },
            additionalNotes,
            photos: photos.map((p) => ({ name: p.name, dataUrl: p.dataUrl })),
          },
        }
      );

      if (invokeError) throw invokeError;

      setResult(data);
      setIsGenerating(false);

      toast({
        title: 'Briefing pack generated',
        description: 'Worker briefing has been created successfully.',
      });

      if (selectedJobPackId) {
        updateJobPack.mutate({
          id: selectedJobPackId,
          data: { briefing_pack_generated: true },
        });
      }
    } catch (err: any) {
      setIsGenerating(false);
      setError(err?.message ?? 'Generation failed.');
      toast({
        title: 'Error',
        description: err?.message ?? 'Generation failed.',
        variant: 'destructive',
      });
    }
  };

  const handleDownloadPdf = () => {
    if (!result) return;
    const w = window.open('', '_blank');
    if (!w) return;
    const title = selectedJobPack?.title || 'Briefing Pack';
    const safe = (s: string) =>
      String(s ?? '').replace(/[&<>"']/g, (c) =>
        ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] as string)
      );
    const body =
      typeof result === 'string'
        ? `<pre style="white-space:pre-wrap;font-family:inherit">${safe(result)}</pre>`
        : `<pre style="white-space:pre-wrap;font-family:inherit">${safe(JSON.stringify(result, null, 2))}</pre>`;
    const photoHtml = photos
      .map(
        (p) =>
          `<figure style="margin:0 0 16px 0"><img src="${p.dataUrl}" style="max-width:100%;border:1px solid #ccc;border-radius:8px"/><figcaption style="font-size:12px;color:#555;margin-top:4px">${safe(p.name)}</figcaption></figure>`
      )
      .join('');
    w.document.write(`<!doctype html><html><head><meta charset="utf-8"/><title>${safe(title)}</title>
      <style>
        body{font-family:-apple-system,Segoe UI,Roboto,sans-serif;padding:32px;color:#111;max-width:780px;margin:0 auto}
        h1{font-size:24px;margin:0 0 4px}
        h2{font-size:14px;text-transform:uppercase;letter-spacing:.14em;color:#666;margin:24px 0 8px;border-bottom:1px solid #eee;padding-bottom:4px}
        @media print{ button{display:none} }
      </style></head><body>
      <h1>${safe(title)}</h1>
      <div style="color:#666;font-size:12px">${safe(selectedJobPack?.location || '')}</div>
      <h2>Briefing</h2>${body}
      ${photos.length ? `<h2>Site photos</h2>${photoHtml}` : ''}
      <button onclick="window.print()" style="margin-top:24px;padding:8px 14px;border:1px solid #111;background:#FFD400;cursor:pointer">Print / Save as PDF</button>
      </body></html>`);
    w.document.close();
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
    setPhotos([]);
    setAdditionalNotes('');
  };

  const refresh = () => {
    handleReset();
  };

  return (
    <PageFrame>
      <PageHero
        eyebrow="Smart Docs"
        title="AI Briefing Pack"
        description="Site briefing packs with photos, instructions and sign-off."
        tone="amber"
        actions={
          <IconButton onClick={refresh} aria-label="Reset">
            <RefreshCw className="h-4 w-4" />
          </IconButton>
        }
        meta={<Pill tone="purple">AI</Pill>}
      />

      <StatStrip
        columns={3}
        stats={[
          { label: 'Generated', value: briefingsGenerated, tone: 'amber' },
          { label: 'Photos used', value: photos.length, tone: 'blue' },
          { label: 'Packs sent', value: packsSent, tone: 'emerald' },
        ]}
      />

      {isLoading ? (
        <LoadingBlocks />
      ) : (
        <>
          <ListCard>
            <ListCardHeader
              tone="amber"
              title="New briefing"
              meta={
                selectedJobPack ? (
                  <span className="flex items-center gap-2">
                    <Pill tone={hasRAMS ? 'emerald' : 'red'}>
                      RAMS {hasRAMS ? 'ready' : 'missing'}
                    </Pill>
                    <Pill tone={hasMethodStatement ? 'emerald' : 'red'}>
                      Method {hasMethodStatement ? 'ready' : 'missing'}
                    </Pill>
                  </span>
                ) : (
                  <Pill tone="amber">Select job pack</Pill>
                )
              }
            />
            <div className="px-5 sm:px-6 py-5 sm:py-6 space-y-6">
              <div className="space-y-2">
                <Eyebrow>Job pack</Eyebrow>
                <JobPackSelector
                  selectedJobPackId={selectedJobPackId}
                  onSelect={setSelectedJobPackId}
                  onCreateNew={() => onNavigate('jobpacks')}
                />
              </div>

              {selectedJobPack && !canGenerate && (
                <div className="flex flex-col sm:flex-row gap-2">
                  {!hasRAMS && (
                    <SecondaryButton onClick={() => onNavigate('airams')}>
                      Generate RAMS →
                    </SecondaryButton>
                  )}
                  {!hasMethodStatement && (
                    <SecondaryButton onClick={() => onNavigate('aimethodstatement')}>
                      Generate Method Statement →
                    </SecondaryButton>
                  )}
                </div>
              )}

              <div className="space-y-2">
                <Eyebrow>Additional notes</Eyebrow>
                <Textarea
                  value={additionalNotes}
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                  placeholder="Site access codes, parking instructions, specific safety concerns…"
                  className={`${textareaClass} min-h-[120px]`}
                  disabled={isGenerating}
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Eyebrow>Site photos</Eyebrow>
                  <SecondaryButton onClick={handlePickPhotos} disabled={isGenerating}>
                    <ImagePlus className="h-4 w-4 mr-2" />
                    Add photos
                  </SecondaryButton>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handlePhotoChange}
                  />
                </div>
                {photos.length === 0 ? (
                  <div className="rounded-xl border border-dashed border-white/[0.08] bg-[hsl(0_0%_10%)] py-6 text-center text-[12.5px] text-white">
                    No photos attached yet.
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {photos.map((p) => (
                      <div
                        key={p.id}
                        className="relative group rounded-xl overflow-hidden border border-white/[0.08] bg-[hsl(0_0%_10%)] aspect-square"
                      >
                        <img
                          src={p.dataUrl}
                          alt={p.name}
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                        <button
                          onClick={() => handleRemovePhoto(p.id)}
                          aria-label="Remove photo"
                          className="absolute top-1.5 right-1.5 h-7 w-7 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-black/90 touch-manipulation"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-2 py-1.5 text-[10px] text-white truncate">
                          {p.name}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-2">
                <PrimaryButton
                  onClick={handleGenerate}
                  disabled={isGenerating || !canGenerate}
                  fullWidth
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Generating…
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Generate briefing pack
                    </>
                  )}
                </PrimaryButton>
                {result && (
                  <SecondaryButton onClick={handleDownloadPdf}>
                    <Download className="h-4 w-4 mr-2" />
                    Export PDF
                  </SecondaryButton>
                )}
              </div>

              {error && (
                <div className="flex items-center gap-2 text-[12.5px] text-white">
                  <Dot tone="red" />
                  {error}
                </div>
              )}
              {result && !error && (
                <div className="flex items-center gap-2 text-[12.5px] text-white">
                  <Dot tone="emerald" />
                  Briefing pack ready and attached to job pack.
                </div>
              )}
            </div>
          </ListCard>

          <ListCard>
            <ListCardHeader
              tone="emerald"
              title="History"
              meta={<Pill tone="emerald">{briefingsGenerated}</Pill>}
            />
            {jobPacks.filter((jp) => jp.briefing_pack_generated).length === 0 ? (
              <div className="px-5 sm:px-6 py-2">
                <EmptyState
                  title="No briefings yet"
                  description="Generated briefing packs will appear here, attached to their job pack."
                />
              </div>
            ) : (
              <ListBody>
                {jobPacks
                  .filter((jp) => jp.briefing_pack_generated)
                  .map((jp) => (
                    <ListRow
                      key={jp.id}
                      title={jp.title || 'Untitled job pack'}
                      subtitle={jp.location || jp.scope || 'No location'}
                      trailing={<Pill tone="amber">Briefing</Pill>}
                      onClick={() => setSelectedJobPackId(jp.id)}
                      accent="amber"
                    />
                  ))}
              </ListBody>
            )}
          </ListCard>
        </>
      )}
    </PageFrame>
  );
}
