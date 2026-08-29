/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { storageGetJSONSync, storageRemoveSync } from '@/utils/storage';
import { trackFeatureUse } from '@/components/ActivityTracker';
import { Helmet } from 'react-helmet';
import { ArrowLeft } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { InvoiceWizard } from '@/components/electrician/invoice-builder/InvoiceWizard';
import { useInvoiceStorage } from '@/hooks/useInvoiceStorage';
import { useState, useEffect } from 'react';
import { VoiceFormProvider } from '@/contexts/VoiceFormContext';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

const InvoiceBuilderCreate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { fetchInvoices } = useInvoiceStorage();
  const [quoteContext, setQuoteContext] = useState<any>(null);
  const [certificateContext, setCertificateContext] = useState<any>(null);
  const [projectContext, setProjectContext] = useState<{
    client?: { name: string; email?: string; phone?: string; address: string; postcode: string };
    jobDetails?: { title: string; description: string; location: string };
  } | null>(null);
  const [showExitDialog, setShowExitDialog] = useState(false);
  const [composedSessionIds, setComposedSessionIds] = useState<string[]>([]);
  const [composedItems, setComposedItems] = useState<any[]>([]);
  const [composedMaterialIds, setComposedMaterialIds] = useState<string[]>([]);
  const [composedCostEntryIds, setComposedCostEntryIds] = useState<string[]>([]);
  const [isLoadingContext, setIsLoadingContext] = useState(true);

  // Read projectId and timeSessionId from URL
  const projectId = new URLSearchParams(location.search).get('projectId') || undefined;
  const timeSessionId = new URLSearchParams(location.search).get('timeSessionId') || undefined;

  // Load quote data or certificate data from sessionStorage
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const quoteSessionId = params.get('quoteSessionId');
    const certificateSessionId = params.get('certificateSessionId');

    if (quoteSessionId) {
      const storedContext = sessionStorage.getItem(quoteSessionId);
      if (storedContext) {
        const parsed = JSON.parse(storedContext);
        setQuoteContext(parsed.quoteData);
        sessionStorage.removeItem(quoteSessionId);
      }
    }

    if (certificateSessionId) {
      // Two writer conventions share this param: certificateToQuote writes via
      // storageSetJSONSync (localStorage on web, Preferences on native), while
      // TimeTrackerPage/StartCertificateDialog write raw sessionStorage.
      // Reading only sessionStorage silently dropped every certificate payload
      // — check both stores.
      let parsed = storageGetJSONSync<any>(certificateSessionId, null);
      if (parsed?.certificateData) {
        storageRemoveSync(certificateSessionId);
      } else {
        const storedContext = sessionStorage.getItem(certificateSessionId);
        if (storedContext) {
          parsed = JSON.parse(storedContext);
          sessionStorage.removeItem(certificateSessionId);
        }
      }
      if (parsed?.certificateData) {
        setCertificateContext(parsed.certificateData);
      }
    }

    // If launched from a project (and no quote/certificate context took over),
    // fetch the project so we can pre-fill the client and job details — mirrors
    // QuoteBuilderCreate. The project_id back-link is still passed regardless.
    if (projectId && !quoteSessionId && !certificateSessionId) {
      (async () => {
        try {
          const {
            data: { user: rateUser },
          } = await supabase.auth.getUser();
          const [{ data: project }, { data: sessions }, { data: gotMaterials }, { data: costEntries }, { data: rateProfile }] =
            await Promise.all([
              supabase
                .from('spark_projects')
                .select(
                  'title, description, location, customer_id, customers(name, email, phone, address)'
                )
                .eq('id', projectId)
                .single(),
              (supabase as any)
                .from('time_sessions')
                .select('id, duration_seconds, hourly_rate')
                .eq('project_id', projectId)
                .is('invoice_id', null),
              (supabase as any)
                .from('job_materials')
                .select('id, name, quantity, unit, unit_price')
                .eq('project_id', projectId)
                .is('invoice_id', null)
                .in('status', ['got', 'fitted']),
              (supabase as any)
                .from('job_cost_entries')
                .select('id, entry_date, category, description, hours, quantity, unit_cost, total')
                .eq('project_id', projectId)
                .is('invoice_id', null)
                .order('entry_date', { ascending: true }),
              // The user's own rates — labour bills at whatever is configured
              // here (hourly and/or day rate), not a hardcoded number.
              (supabase as any)
                .from('company_profiles')
                .select('hourly_rate, day_rate')
                .eq('user_id', rateUser?.id ?? '')
                .maybeSingle(),
            ]);

          // Compose line items from the job's actuals (ELE-1357).
          //
          // Labour bills from the user's OWN rates, both of them: sessions
          // carry the hourly rate they were tracked at (falling back to the
          // profile rate for older untagged ones), and where a day's tracked
          // time at hourly beats the configured DAY RATE, the day rate is
          // applied instead — the price a fair electrician would hand-write.
          // Untraceable rates no longer vanish: zero-rate time appears as a
          // visible £0 line to price in the builder, never silently dropped.
          const items: any[] = [];
          const profileHourly = Number((rateProfile as any)?.hourly_rate) || 0;
          const profileDay = Number((rateProfile as any)?.day_rate) || 0;

          const byDay = new Map<
            string,
            { secs: number; ids: string[]; hourlyTotal: number; byRate: Map<number, number> }
          >();
          for (const s of (sessions as any[]) || []) {
            const secs = Number(s.duration_seconds) || 0;
            if (secs <= 0) continue;
            const rate = Number(s.hourly_rate) > 0 ? Number(s.hourly_rate) : profileHourly;
            const day = String(s.started_at || '').slice(0, 10) || 'unknown';
            const cur =
              byDay.get(day) || { secs: 0, ids: [], hourlyTotal: 0, byRate: new Map() };
            cur.secs += secs;
            cur.ids.push(s.id);
            cur.hourlyTotal += (secs / 3600) * rate;
            cur.byRate.set(rate, (cur.byRate.get(rate) || 0) + secs);
            byDay.set(day, cur);
          }

          const sessionIds: string[] = [];
          const hourlyByRate = new Map<number, number>();
          for (const [day, d] of byDay) {
            sessionIds.push(...d.ids);
            if (profileDay > 0 && d.hourlyTotal > profileDay) {
              const dayLabel = new Date(`${day}T00:00:00`).toLocaleDateString('en-GB', {
                weekday: 'short',
                day: 'numeric',
                month: 'short',
              });
              items.push({
                id: `labour-day-${day}`,
                description: `Labour — day rate (${dayLabel}, ${Math.round((d.secs / 3600) * 10) / 10} hrs tracked)`,
                quantity: 1,
                unit: 'day',
                unitPrice: profileDay,
                totalPrice: profileDay,
                category: 'labour',
              });
            } else {
              for (const [rate, secs] of d.byRate) {
                hourlyByRate.set(rate, (hourlyByRate.get(rate) || 0) + secs);
              }
            }
          }
          for (const [rate, secs] of hourlyByRate) {
            const hours = Math.round((secs / 3600) * 100) / 100;
            if (hours <= 0) continue;
            items.push({
              id: `labour-${rate}`,
              description:
                rate > 0
                  ? `Labour — ${hours} hrs @ £${rate}/hr`
                  : `Labour — ${hours} hrs (set your rate)`,
              quantity: hours,
              unit: 'hours',
              unitPrice: rate,
              totalPrice: Math.round(hours * rate * 100) / 100,
              category: 'labour',
            });
          }
          const materialIds: string[] = [];
          for (const m of (gotMaterials as any[]) || []) {
            const qty = m.quantity == null ? 1 : Number(m.quantity);
            const price = Number(m.unit_price) || 0;
            if (qty <= 0 || price <= 0) continue;
            materialIds.push(m.id);
            items.push({
              id: `mat-${m.id}`,
              description: m.name,
              quantity: qty,
              unit: m.unit || 'each',
              unitPrice: price,
              totalPrice: Math.round(qty * price * 100) / 100,
              category: 'materials',
            });
          }
          // Cost-ledger entries logged on the job (ELE-1401) — per-visit
          // labour/materials/other, composed alongside sessions + materials.
          const costEntryIds: string[] = [];
          for (const e of (costEntries as any[]) || []) {
            const total = Number(e.total) || 0;
            if (total <= 0) continue;
            costEntryIds.push(e.id);
            const dateLabel = new Date(`${e.entry_date}T00:00:00`).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'short',
            });
            if (e.category === 'labour') {
              const hours = Number(e.hours) || 1;
              const rate = Number(e.unit_cost) || total;
              items.push({
                id: `cost-${e.id}`,
                description: `Labour — ${e.description} (${dateLabel})`,
                quantity: hours,
                unit: 'hours',
                unitPrice: rate,
                totalPrice: total,
                category: 'labour',
              });
            } else {
              const qty = Number(e.quantity) || 1;
              items.push({
                id: `cost-${e.id}`,
                description: `${e.description} (${dateLabel})`,
                quantity: qty,
                unit: 'each',
                unitPrice: Number(e.unit_cost) || total,
                totalPrice: total,
                category: 'materials',
              });
            }
          }

          setComposedItems(items);
          setComposedSessionIds(sessionIds);
          setComposedMaterialIds(materialIds);
          setComposedCostEntryIds(costEntryIds);

          if (project) {
            const customer = (project as any).customers;
            setProjectContext({
              ...(customer && {
                client: {
                  name: customer.name || '',
                  email: customer.email || '',
                  phone: customer.phone || '',
                  address: customer.address || '',
                  postcode: '',
                },
              }),
              jobDetails: {
                title: (project as any).title || '',
                description: (project as any).description || '',
                location: (project as any).location || '',
              },
            });
          }
        } catch {
          // Project context fetch failed — continue without it (blank form)
        } finally {
          setIsLoadingContext(false);
        }
      })();
      return; // defer setIsLoadingContext to the async block
    }

    // Mark context loading as complete
    setIsLoadingContext(false);
  }, [location, projectId]);

  const handleInvoiceGenerated = async (invoiceId: string) => {
    fetchInvoices();
    toast({ title: 'Invoice created', description: 'Your invoice has been saved.' });
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) trackFeatureUse(user.id, 'invoice_created', {});
    });
    // If launched from Time Tracker, mark the session as invoiced
    if (timeSessionId && invoiceId) {
      await supabase
        .from('time_sessions')
        .update({ invoice_id: invoiceId })
        .eq('id', timeSessionId);
    }
    // Composer path: sessions + materials rolled into the invoice are now billed
    if (composedSessionIds.length > 0 && invoiceId) {
      const { error } = await (supabase as any)
        .from('time_sessions')
        .update({ invoice_id: invoiceId })
        .in('id', composedSessionIds);
      if (error)
        toast({ title: 'Could not mark time as billed', variant: 'destructive' });
    }
    if (composedMaterialIds.length > 0 && invoiceId) {
      const { error } = await (supabase as any)
        .from('job_materials')
        .update({ invoice_id: invoiceId })
        .in('id', composedMaterialIds);
      if (error)
        toast({ title: 'Could not mark materials as billed', variant: 'destructive' });
    }
    if (composedCostEntryIds.length > 0 && invoiceId) {
      const { error } = await (supabase as any)
        .from('job_cost_entries')
        .update({ invoice_id: invoiceId, invoiced_at: new Date().toISOString() })
        .in('id', composedCostEntryIds)
        .is('invoice_id', null);
      if (error)
        toast({ title: 'Could not mark job costs as billed', variant: 'destructive' });
    }
    if (projectId) {
      navigate(`/electrician/projects/${projectId}`);
    } else {
      navigate('/electrician/invoices');
    }
  };

  const handleBack = () => {
    setShowExitDialog(true);
  };

  const confirmExit = () => {
    if (projectId) {
      navigate(`/electrician/projects/${projectId}`);
    } else {
      navigate('/electrician/invoices');
    }
  };

  // Voice navigation handler
  const handleVoiceNavigate = (section: string) => {
    const sectionLower = section.toLowerCase().replace(/\s+/g, '-');
    switch (sectionLower) {
      case 'back':
      case 'invoices':
      case 'invoice-builder':
        handleBack();
        break;
      case 'business':
        navigate('/electrician/business');
        break;
      default:
        navigate(`/electrician/${sectionLower}`);
    }
  };

  const canonical = `${window.location.origin}/electrician/invoice-builder/create`;

  return (
    <VoiceFormProvider>
      <div className="min-h-screen bg-background animate-fade-in">
        <Helmet>
          <title>Create Invoice | Elec-Mate</title>
          <meta name="description" content="Create professional invoices with our guided invoice builder." />
          <link rel="canonical" href={canonical} />
        </Helmet>

        {/* Header — matching QuoteBuilderCreate */}
        <header className="sticky top-0 z-50 bg-white/[0.02] backdrop-blur-xl border-b border-white/[0.06]">
          <div className="flex items-center gap-3 px-4 h-14">
            <button
              onClick={handleBack}
              className="h-11 w-11 -ml-2 flex items-center justify-center rounded-xl hover:bg-white/[0.05] active:scale-[0.98] touch-manipulation"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className="flex-1 min-w-0">
              <h1 className="text-base font-semibold text-white">New Invoice</h1>
            </div>
          </div>
        </header>

        {/* Context banners */}
        {quoteContext && (
          <div className="mx-4 mt-4 flex items-center gap-3 p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-semibold text-emerald-400">Quote data imported</p>
              <p className="text-[11px] text-white mt-0.5">Client and items pre-filled</p>
            </div>
          </div>
        )}

        {certificateContext && (
          <div className="mx-4 mt-4 flex items-center gap-3 p-3.5 rounded-2xl bg-blue-500/10 border border-blue-500/20">
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-semibold text-blue-400">Certificate data imported</p>
              <p className="text-[11px] text-white mt-0.5">Client details pre-filled</p>
            </div>
          </div>
        )}

        {projectContext?.client && (
          <div className="mx-4 mt-4 flex items-center gap-3 p-3.5 rounded-2xl bg-purple-500/10 border border-purple-500/20">
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-semibold text-purple-400">Composed from the job</p>
              <p className="text-[11px] text-white mt-0.5">
                {composedItems.length > 0
                  ? `Client, job details and ${composedItems.length} line item${composedItems.length === 1 ? '' : 's'} from logged time & materials`
                  : 'Client & job details pre-filled'}
              </p>
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="px-0 sm:px-2 py-3">
          {isLoadingContext ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-elec-yellow border-t-transparent" />
            </div>
          ) : (
            <InvoiceWizard
              onInvoiceGenerated={handleInvoiceGenerated}
              sourceQuote={quoteContext}
              initialCertificateData={certificateContext}
              existingInvoice={
                projectId
                  ? {
                      project_id: projectId,
                      ...(projectContext?.client && { client: projectContext.client }),
                      ...(projectContext?.jobDetails && { jobDetails: projectContext.jobDetails }),
                      ...(composedItems.length > 0 && { items: composedItems }),
                    }
                  : undefined
              }
            />
          )}
        </main>

        {/* Exit Confirmation Dialog */}
        <AlertDialog open={showExitDialog} onOpenChange={setShowExitDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Discard invoice?</AlertDialogTitle>
              <AlertDialogDescription>
                Your progress will be lost. Are you sure you want to exit?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Keep Editing</AlertDialogCancel>
              <AlertDialogAction
                onClick={confirmExit}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Discard
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </VoiceFormProvider>
  );
};

export default InvoiceBuilderCreate;
