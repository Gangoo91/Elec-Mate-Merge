import { useState } from 'react';
import { JobPackSelector } from '@/components/employer/smart-docs/JobPackSelector';
import { useJobPacks } from '@/hooks/useJobPacks';
import { useCreateQuote, useNextQuoteNumber } from '@/hooks/useFinance';
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
  Pill,
  IconButton,
  EmptyState,
  LoadingBlocks,
  Divider,
  PrimaryButton,
  SecondaryButton,
  Field,
  inputClass,
  textareaClass,
  fieldLabelClass,
} from '@/components/employer/editorial';
import { RefreshCw, Sparkles, Loader2, Download, Plus, Trash2, FileCheck } from 'lucide-react';

interface AIQuoteSectionProps {
  onNavigate: (section: Section) => void;
}

interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

interface HistoryEntry {
  id: string;
  clientName: string;
  total: number;
  createdAt: number;
  saved: boolean;
}

export function AIQuoteSection({ onNavigate }: AIQuoteSectionProps) {
  const { data: jobPacks = [] } = useJobPacks();
  const { toast } = useToast();

  const [selectedJobPackId, setSelectedJobPackId] = useState<string | null>(null);
  const [clientName, setClientName] = useState('');
  const [clientAddress, setClientAddress] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [lineItems, setLineItems] = useState<LineItem[]>([
    { id: '1', description: '', quantity: 1, unitPrice: 0 },
  ]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  const createQuote = useCreateQuote();
  const { data: nextQuoteNumber } = useNextQuoteNumber();

  const selectedJobPack = jobPacks.find((jp) => jp.id === selectedJobPackId);

  const subtotal = lineItems.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  const vat = subtotal * 0.2;
  const total = subtotal + vat;

  const generatedCount = history.length;
  const savedCount = history.filter((h) => h.saved).length;
  const avgValue =
    history.length > 0
      ? Math.round(history.reduce((s, h) => s + h.total, 0) / history.length)
      : 0;

  const addLineItem = () => {
    setLineItems([
      ...lineItems,
      { id: Date.now().toString(), description: '', quantity: 1, unitPrice: 0 },
    ]);
  };

  const removeLineItem = (id: string) => {
    if (lineItems.length > 1) {
      setLineItems(lineItems.filter((item) => item.id !== id));
    }
  };

  const updateLineItem = (id: string, field: keyof LineItem, value: any) => {
    setLineItems(lineItems.map((item) => (item.id === id ? { ...item, [field]: value } : item)));
  };

  const handleGenerate = async () => {
    if (!clientName.trim() || !projectDescription.trim()) {
      toast({
        title: 'Missing information',
        description: 'Please provide client name and project description.',
        variant: 'destructive',
      });
      return;
    }

    const validItems = lineItems.filter((item) => item.description.trim() && item.unitPrice > 0);
    if (validItems.length === 0) {
      toast({
        title: 'No line items',
        description: 'Please add at least one line item with description and price.',
        variant: 'destructive',
      });
      return;
    }

    setIsGenerating(true);
    setProgress(0);
    setError(null);
    setResult(null);

    try {
      // Assemble the quote draft locally — the summary panel and Save path work
      // entirely from the line items, subtotal, VAT and total we already hold.
      const draft = {
        clientName,
        clientAddress,
        projectDescription,
        lineItems: validItems,
        subtotal,
        vat,
        total,
        projectInfo: selectedJobPack
          ? { projectName: selectedJobPack.title, location: selectedJobPack.location }
          : null,
      };

      setProgress(100);
      setResult(draft);
      setIsGenerating(false);

      setHistory((prev) => [
        {
          id: `${clientName}-${validItems.length}-${total}`,
          clientName,
          total,
          createdAt: Date.now(),
          saved: false,
        },
        ...prev,
      ]);

      toast({
        title: 'Quote ready',
        description: 'Your quote draft is ready to review and save.',
      });
    } catch (err: any) {
      setIsGenerating(false);
      setError(err.message);
      toast({
        title: 'Error',
        description: err.message,
        variant: 'destructive',
      });
    }
  };

  const handleDownload = () => {
    if (!result) return;
    const validItems = lineItems.filter((item) => item.description.trim() && item.unitPrice > 0);
    const lines = [
      `QUOTE${clientName ? ` — ${clientName}` : ''}`,
      clientAddress ? clientAddress : null,
      selectedJobPack ? `Project: ${selectedJobPack.title}` : null,
      projectDescription ? `\n${projectDescription}` : null,
      '',
      ...validItems.map(
        (i) =>
          `${i.description}  —  ${i.quantity} × £${i.unitPrice.toFixed(2)}  =  £${(
            i.quantity * i.unitPrice
          ).toFixed(2)}`
      ),
      '',
      `Subtotal:  £${subtotal.toFixed(2)}`,
      `VAT (20%): £${vat.toFixed(2)}`,
      `Total:     £${total.toFixed(2)}`,
    ].filter((l) => l !== null);
    const blob = new Blob([lines.join('\n')], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Quote-${clientName || 'draft'}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Persist the generated draft as a real employer quote (mirrors CreateQuoteDialog
  // so it shows up in Quotes & Invoices, can be sent, accepted, converted, etc.).
  const handleSaveQuote = async () => {
    const validItems = lineItems.filter((item) => item.description.trim() && item.unitPrice > 0);
    if (validItems.length === 0) return;
    setIsSaving(true);
    try {
      const validUntil = new Date();
      validUntil.setDate(validUntil.getDate() + 30);
      await createQuote.mutateAsync({
        quote_number: nextQuoteNumber || `QU-${new Date().getFullYear()}-0001`,
        client: clientName,
        client_address: clientAddress || null,
        job_title: selectedJobPack?.title || null,
        description: projectDescription,
        value: total,
        status: 'Draft',
        valid_until: validUntil.toISOString().split('T')[0],
        job_id: null,
        created_by: 'Admin',
        line_items: validItems.map((i) => ({
          id: i.id,
          description: i.description,
          quantity: i.quantity,
          unit: 'item',
          unitPrice: i.unitPrice,
          total: i.quantity * i.unitPrice,
          type: 'material',
        })),
        vat_rate: 20,
        subtotal,
        vat_amount: vat,
      } as never);
      // Mark the newest draft (prepended → index 0) as saved.
      setHistory((prev) => prev.map((h, idx) => (idx === 0 ? { ...h, saved: true } : h)));
      onNavigate('quotes');
    } catch {
      // useCreateQuote surfaces its own error toast
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
    setProgress(0);
  };

  const handleRefresh = () => {
    handleReset();
    setClientName('');
    setClientAddress('');
    setProjectDescription('');
    setSelectedJobPackId(null);
    setLineItems([{ id: '1', description: '', quantity: 1, unitPrice: 0 }]);
  };

  const formatTime = (ts: number) => {
    const d = new Date(ts);
    return d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <PageFrame>
      <PageHero
        eyebrow="Smart Docs"
        title="AI Quote Generator"
        description="Build a quote from your line items — VAT calculated and saved straight to your quotes."
        tone="yellow"
        actions={
          <IconButton onClick={handleRefresh} aria-label="Reset form">
            <RefreshCw className="h-4 w-4" />
          </IconButton>
        }
        meta={<Pill tone="purple">AI</Pill>}
      />

      <StatStrip
        columns={3}
        stats={[
          { label: 'Generated', value: generatedCount, tone: 'yellow' },
          { label: 'Saved as quotes', value: savedCount, tone: 'emerald', accent: true },
          { label: 'Avg value £', value: avgValue, tone: 'blue' },
        ]}
      />

      <ListCard>
        <ListCardHeader
          tone="yellow"
          title="Quote brief"
          meta={<Pill tone="yellow">Draft</Pill>}
        />
        <div className="px-5 sm:px-6 py-5 sm:py-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.18em] font-medium text-white">
                Client name
              </label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Company or individual"
                disabled={isGenerating}
className={inputClass}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.18em] font-medium text-white">
                Site address
              </label>
              <input
                type="text"
                value={clientAddress}
                onChange={(e) => setClientAddress(e.target.value)}
                placeholder="Where is the work?"
                disabled={isGenerating}
className={inputClass}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.18em] font-medium text-white">
              Job description
            </label>
            <textarea
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
              placeholder="Describe what needs doing — circuits, fittings, board changes, anything relevant."
              disabled={isGenerating}
              className={`${textareaClass} min-h-[120px]`}
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.18em] font-medium text-white">
              Link to job pack (optional)
            </label>
            <JobPackSelector
              selectedJobPackId={selectedJobPackId}
              onSelect={setSelectedJobPackId}
              onCreateNew={() => onNavigate('jobpacks')}
              showStatus={false}
            />
          </div>

          <Divider label="Line items" />

          <div className="space-y-3">
            {lineItems.map((item, index) => (
              <div
                key={item.id}
                className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-[0.18em] font-medium text-white">
                    Item {index + 1}
                  </span>
                  {lineItems.length > 1 && (
                    <button
                      onClick={() => removeLineItem(item.id)}
                      disabled={isGenerating}
                      aria-label="Remove item"
                      className="h-9 w-9 rounded-full flex items-center justify-center text-white hover:text-red-400 hover:bg-white/[0.04] transition-colors touch-manipulation"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
                <input
                  type="text"
                  value={item.description}
                  onChange={(e) => updateLineItem(item.id, 'description', e.target.value)}
                  placeholder="Description"
                  disabled={isGenerating}
  className={inputClass}
                />
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-[0.18em] font-medium text-white">
                      Qty
                    </label>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        updateLineItem(item.id, 'quantity', parseInt(e.target.value) || 0)
                      }
                      disabled={isGenerating}
className={`${inputClass} tabular-nums`}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-[0.18em] font-medium text-white">
                      Unit price (£)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={item.unitPrice}
                      onChange={(e) =>
                        updateLineItem(item.id, 'unitPrice', parseFloat(e.target.value) || 0)
                      }
                      disabled={isGenerating}
className={`${inputClass} tabular-nums`}
                    />
                  </div>
                </div>
              </div>
            ))}

            <SecondaryButton onClick={addLineItem} disabled={isGenerating} fullWidth>
              <Plus className="h-4 w-4 mr-2" />
              Add line item
            </SecondaryButton>
          </div>

          <PrimaryButton
            onClick={handleGenerate}
            disabled={isGenerating || !clientName.trim() || !projectDescription.trim()}
            fullWidth
            size="lg"
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Generating quote draft…
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 mr-2" />
                Generate quote draft
              </>
            )}
          </PrimaryButton>
        </div>
      </ListCard>

      {isGenerating && <LoadingBlocks />}

      {error && !isGenerating && (
        <ListCard>
          <ListCardHeader
            tone="red"
            title="Generation failed"
            meta={<Pill tone="red">Error</Pill>}
          />
          <div className="px-5 sm:px-6 py-5 space-y-4">
            <p className="text-[13px] text-white">{error}</p>
            <PrimaryButton onClick={handleReset}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Retry
            </PrimaryButton>
          </div>
        </ListCard>
      )}

      {result && !isGenerating && (
        <ListCard>
          <ListCardHeader
            tone="yellow"
            title="Quote draft"
            meta={<Pill tone="emerald">Ready</Pill>}
            action="Reset"
            onAction={handleReset}
          />
          <ListBody>
            {lineItems
              .filter((i) => i.description.trim() && i.unitPrice > 0)
              .map((item) => (
                <ListRow
                  key={item.id}
                  title={item.description}
                  subtitle={`${item.quantity} × £${item.unitPrice.toFixed(2)}`}
                  trailing={
                    <span className="text-[14px] font-semibold text-white tabular-nums">
                      £{(item.quantity * item.unitPrice).toFixed(2)}
                    </span>
                  }
                />
              ))}
          </ListBody>
          <div className="px-5 sm:px-6 py-5 sm:py-6 border-t border-white/[0.06] space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[13px] text-white">Subtotal</span>
              <span className="text-[14px] text-white tabular-nums">£{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[13px] text-white">VAT (20%)</span>
              <span className="text-[14px] text-white tabular-nums">£{vat.toFixed(2)}</span>
            </div>
            <div className="pt-4 border-t border-white/[0.06] flex items-baseline justify-between gap-4">
              <span className="text-[10px] uppercase tracking-[0.18em] font-medium text-white">
                Total
              </span>
              <span className="text-[40px] sm:text-5xl lg:text-[56px] font-semibold text-elec-yellow tabular-nums tracking-[-0.02em] leading-none">
                £{total.toFixed(2)}
              </span>
            </div>
            <PrimaryButton
              onClick={handleSaveQuote}
              fullWidth
              size="lg"
              disabled={isSaving || !nextQuoteNumber}
            >
              {isSaving ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <FileCheck className="h-4 w-4 mr-2" />
              )}
              {isSaving ? 'Saving…' : 'Save as quote'}
            </PrimaryButton>
            <SecondaryButton onClick={handleDownload} fullWidth size="lg">
              <Download className="h-4 w-4 mr-2" />
              Download
            </SecondaryButton>
          </div>
        </ListCard>
      )}

      <ListCard>
        <ListCardHeader
          tone="purple"
          title="Recent generations"
          meta={<Pill tone="purple">{history.length}</Pill>}
        />
        {history.length === 0 ? (
          <div className="p-1">
            <EmptyState
              title="No quotes generated yet"
              description="Drafts you create will appear here so you can re-open or save them as quotes."
            />
          </div>
        ) : (
          <ListBody>
            {history.map((entry) => (
              <ListRow
                key={entry.id}
                title={entry.clientName || 'Untitled'}
                subtitle={formatTime(entry.createdAt)}
                trailing={
                  <>
                    <span className="text-[14px] font-semibold text-white tabular-nums">
                      £{entry.total.toFixed(2)}
                    </span>
                    {entry.saved && <Pill tone="emerald">Saved</Pill>}
                  </>
                }
              />
            ))}
          </ListBody>
        )}
      </ListCard>
    </PageFrame>
  );
}
