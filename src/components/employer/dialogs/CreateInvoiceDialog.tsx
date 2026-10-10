import { useState, useEffect } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { IOSStepIndicator } from '@/components/ui/ios-step-indicator';
import { Plus, Trash2, FileText, ChevronLeft, ChevronRight, Send, X } from 'lucide-react';
import { useCreateInvoice, useNextInvoiceNumber, useQuotes } from '@/hooks/useFinance';
import { sendInvoice as sendInvoiceService } from '@/services/financeService';
import {
  getJobInvoiceCertificates,
  getQuoteDeposit,
  linkInvoiceToQuote,
  setInvoiceCertificate,
  type CertificateReleaseMode,
} from '@/services/quoteChainService';
import { supabase } from '@/integrations/supabase/client';
import { ClientMatchHint } from '@/components/employer/clients/ClientMatchHint';
import { depositCreditFromQuote } from '@/utils/invoiceDeposit';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { linkRecordToClient } from '@/services/employerClientService';
import { Switch } from '@/components/ui/switch';
import { calcEmployerTotals, isLabourItem } from '@/utils/employerMoney';
import { useJobCostEntries } from '@/hooks/useJobCostEntries';
import { useJobDoneSummary } from '@/hooks/useJobDone';
import type { Quote } from '@/services/financeService';
import { useOptionalVoiceFormContext } from '@/contexts/VoiceFormContext';
import { cn } from '@/lib/utils';
import {
  Field,
  FormCard,
  FormGrid,
  PrimaryButton,
  SecondaryButton,
  inputClass,
  textareaClass,
  fieldLabelClass,
  Eyebrow,
} from '@/components/employer/editorial';
import { SelectField } from '@/components/forms';
import { autoCompleteOff } from '@/lib/textEntry';

interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  total: number;
  type?: string;
}

/** "EICR-2026-0142", or "EICR 0142" when the reference doesn't say what it is. */
const certName = (c: { label: string; reference: string | null }) =>
  c.reference && c.reference.toUpperCase().includes(c.label.toUpperCase())
    ? c.reference
    : [c.label, c.reference].filter(Boolean).join(' ');

interface CreateInvoiceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  fromQuote?: Quote;
  /** When raised from a job, links the invoice to it and prefills client/project. */
  jobId?: string;
  jobTitle?: string;
  prefillClient?: string;
}

export function CreateInvoiceDialog({
  open,
  onOpenChange,
  fromQuote,
  jobId,
  jobTitle,
  prefillClient,
}: CreateInvoiceDialogProps) {
  const [step, setStep] = useState(1);
  const [client, setClient] = useState(prefillClient || '');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  // ELE-2065 §3A #10: the address travels to the invoice (PDF, Xero contact).
  const [clientAddress, setClientAddress] = useState('');
  // §3A #14: an existing client picked from "This looks like an existing client".
  const [clientChoice, setClientChoice] = useState<{ id: string } | 'new' | null>(null);
  // §3A #12: the job's finished certificate on this invoice, and when it goes.
  const [certPick, setCertPick] = useState<string | null>(null);
  const [certMode, setCertMode] = useState<CertificateReleaseMode | 'none'>('with_invoice');
  const [project, setProject] = useState(jobTitle || '');
  const [paymentTerms, setPaymentTerms] = useState('30');
  const [vatRate, setVatRate] = useState('20');
  const [reverseCharge, setReverseCharge] = useState(false);
  const [cisEnabled, setCisEnabled] = useState(false);
  const [cisRate, setCisRate] = useState('20');
  const [notes, setNotes] = useState('');
  const [lineItems, setLineItems] = useState<LineItem[]>([]);
  const [selectedQuoteId, setSelectedQuoteId] = useState<string | null>(null);
  const [newItem, setNewItem] = useState({
    description: '',
    quantity: '',
    unit: 'each',
    unitPrice: '',
    type: 'material',
  });
  const [itemQuantityInputs, setItemQuantityInputs] = useState<Record<string, string>>({});

  const { data: invoiceNumber } = useNextInvoiceNumber();
  const { data: quotes = [], isFetched: quotesLoaded } = useQuotes();
  const createInvoiceMutation = useCreateInvoice();
  const queryClient = useQueryClient();

  // Client-accepted quotes (via the portal) are just as convertible as
  // in-app approved ones. ELE-2065: a quote already invoiced drops out, and so
  // does a quote billed in stages (its stages raise their own invoices, so a
  // whole-quote invoice would bill it twice). From a job, only that job's
  // quotes (§3A #9).
  const approvedQuotes = quotes.filter(
    (q) =>
      (q.status === 'Approved' || q.status === 'Client Accepted') &&
      !q.converted_invoice_id &&
      !(
        Array.isArray((q.settings as { stages?: unknown } | null)?.stages) &&
        (q.settings as { stages: unknown[] }).stages.length > 0
      ) &&
      (!jobId || q.job_id === jobId)
  );

  // §3A #9: the job's own contact details, for an invoice raised from the job.
  const { data: jobRow, isFetched: jobRowLoaded } = useQuery({
    queryKey: ['invoice-job-prefill', jobId],
    enabled: open && !!jobId && !fromQuote,
    staleTime: 30_000,
    queryFn: async () => {
      const { data } = await supabase
        .from('employer_jobs')
        .select('client, client_email, client_phone, location, customer_id')
        .eq('id', jobId as string)
        .maybeSingle();
      return (data ?? null) as {
        client: string | null;
        client_email: string | null;
        client_phone: string | null;
        location: string | null;
        customer_id: string | null;
      } | null;
    },
  });

  // §3A #12: certificates on the invoice's job that are ready to go with it.
  const certJobId =
    jobId ??
    fromQuote?.job_id ??
    (selectedQuoteId ? quotes.find((q) => q.id === selectedQuoteId)?.job_id : null) ??
    null;
  const { data: jobCerts } = useQuery({
    queryKey: ['job-invoice-certificates', certJobId],
    enabled: open && !!certJobId,
    staleTime: 30_000,
    queryFn: () => getJobInvoiceCertificates(certJobId as string),
  });
  const readyCerts = jobCerts?.certificates ?? [];
  const chosenCert = readyCerts.find((c) => c.report_uuid === certPick) ?? null;
  useEffect(() => {
    if (!open) return;
    if (readyCerts.length > 0 && !certPick) setCertPick(readyCerts[0].report_uuid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, readyCerts.length]);

  // ELE-2065: a deposit the customer paid on acceptance comes off this
  // invoice's balance (the server applies it on link; this is the preview,
  // same maths as the Electrical Hub, ELE-1760).
  const { data: sourceDeposit } = useQuery({
    queryKey: ['quote-deposit-credit', selectedQuoteId],
    enabled: open && !!selectedQuoteId,
    staleTime: 15_000,
    queryFn: () => getQuoteDeposit(selectedQuoteId as string),
  });
  const depositCredit =
    sourceDeposit && !sourceDeposit.converted_invoice_id
      ? depositCreditFromQuote(sourceDeposit)
      : null;
  const depositPaid = depositCredit?.depositApplied.amount ?? 0;

  // Re-apply job prefills each time the sheet opens — the dialog stays mounted
  // (e.g. inside the Job Control Centre), so initial useState values go stale
  // when the selected job changes.
  useEffect(() => {
    if (!open) return;
    if (prefillClient) setClient(prefillClient);
    if (jobTitle) setProject(jobTitle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // §3A #9: from a job, start from the job's accepted quote when it has
  // exactly one (lines, VAT, CIS, email, address); otherwise fill the contact
  // details from the job itself.
  const [jobPrefilled, setJobPrefilled] = useState(false);
  useEffect(() => {
    if (!open) {
      setJobPrefilled(false);
      return;
    }
    if (!jobId || fromQuote || jobPrefilled || selectedQuoteId || !quotesLoaded || !jobRowLoaded)
      return;
    const one = approvedQuotes.length === 1 ? approvedQuotes[0] : null;
    if (one) loadFromQuote(one.id);
    // Then anything the quote left blank comes from the job, when the job is
    // for the same client (never another person's email on this invoice).
    const norm = (v: string | null | undefined) => (v ?? '').trim().toLowerCase();
    if (jobRow && (!one || norm(one.client) === norm(jobRow.client))) {
      setClientEmail((v) => v || jobRow.client_email || '');
      setClientPhone((v) => v || jobRow.client_phone || '');
      setClientAddress((v) => v || jobRow.location || '');
      if (jobRow.customer_id) setClientChoice({ id: jobRow.customer_id });
    }
    setJobPrefilled(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    open,
    jobId,
    jobRow,
    jobRowLoaded,
    approvedQuotes.length,
    fromQuote,
    jobPrefilled,
    selectedQuoteId,
    quotesLoaded,
  ]);

  useEffect(() => {
    if (fromQuote) {
      setClient(fromQuote.client);
      setClientEmail(fromQuote.client_email || '');
      setClientPhone(fromQuote.client_phone || '');
      setClientAddress(fromQuote.client_address || '');
      setProject(fromQuote.job_title || fromQuote.description || '');
      setSelectedQuoteId(fromQuote.id);
      setVatRate(String(fromQuote.vat_rate ?? 20));
      setReverseCharge(Boolean(fromQuote.reverse_charge));
      setCisEnabled(Boolean(fromQuote.cis_enabled));
      setCisRate(String(fromQuote.cis_rate ?? 20));
      if (Array.isArray(fromQuote.line_items)) {
        setLineItems(
          fromQuote.line_items.map((item: Partial<LineItem>) => ({
            id: crypto.randomUUID(),
            description: item.description,
            quantity: item.quantity,
            unit: item.unit,
            unitPrice: item.unitPrice,
            total: item.total,
            type: item.type,
          }))
        );
      }
    }
  }, [fromQuote]);

  // Voice form registration
  const voiceContext = useOptionalVoiceFormContext();

  useEffect(() => {
    if (!open || !voiceContext) return;

    voiceContext.registerForm({
      formId: 'create-invoice',
      formName: 'Create Invoice',
      fields: [
        { name: 'client', label: 'Client Name', type: 'text', required: true },
        { name: 'project', label: 'Project Reference', type: 'text' },
        { name: 'paymentTerms', label: 'Payment Terms', type: 'text' },
        { name: 'vatRate', label: 'VAT Rate', type: 'text' },
        { name: 'notes', label: 'Notes', type: 'text' },
      ],
      actions: ['add_line_item', 'next_step', 'previous_step'],
      onFillField: (field, value) => {
        const strValue = String(value);
        switch (field) {
          case 'client':
            setClient(strValue);
            break;
          case 'project':
            setProject(strValue);
            break;
          case 'paymentTerms':
            setPaymentTerms(strValue);
            break;
          case 'vatRate':
            setVatRate(strValue);
            break;
          case 'notes':
            setNotes(strValue);
            break;
        }
      },
      onAction: (action, params) => {
        if (action === 'add_line_item' && params) {
          const item: LineItem = {
            id: crypto.randomUUID(),
            description: String(params.description || 'Item'),
            quantity: Number(params.quantity) || 1,
            unit: String(params.unit || 'each'),
            unitPrice: Number(params.price) || 0,
            total: (Number(params.quantity) || 1) * (Number(params.price) || 0),
          };
          setLineItems((prev) => [...prev, item]);
        }
        if (action === 'next_step') setStep((prev) => Math.min(prev + 1, 3));
        if (action === 'previous_step') setStep((prev) => Math.max(prev - 1, 1));
      },
      onSubmit: () => handleSubmit(false),
      onCancel: () => {
        resetForm();
        onOpenChange(false);
      },
      onNextStep: () => setStep((prev) => Math.min(prev + 1, 3)),
    });

    return () => voiceContext.unregisterForm('create-invoice');
  }, [open, voiceContext]);

  const loadFromQuote = (quoteId: string) => {
    const quote = quotes.find((q) => q.id === quoteId);
    if (quote) {
      setClient(quote.client);
      setClientEmail(quote.client_email || '');
      setClientPhone(quote.client_phone || '');
      setClientAddress((v) => quote.client_address || v);
      setProject(quote.job_title || quote.description || '');
      setSelectedQuoteId(quote.id);
      setVatRate(String(quote.vat_rate ?? 20));
      setReverseCharge(Boolean(quote.reverse_charge));
      setCisEnabled(Boolean(quote.cis_enabled));
      setCisRate(String(quote.cis_rate ?? 20));
      if (Array.isArray(quote.line_items)) {
        setLineItems(
          quote.line_items.map((item: Partial<LineItem>) => ({
            id: crypto.randomUUID(),
            description: item.description,
            quantity: item.quantity,
            unit: item.unit,
            unitPrice: item.unitPrice,
            total: item.total,
            type: item.type,
          }))
        );
      }
    }
  };

  const money = calcEmployerTotals(lineItems, {
    vatRate: Number(vatRate),
    reverseCharge,
    cisEnabled,
    cisRate: Number(cisRate),
  });
  const { subtotal, vatAmount, notionalVat, cisAmount, total, amountDue } = money;
  // What the customer still owes once the paid deposit is taken off.
  const balanceDue = Math.max(Math.round((amountDue - depositPaid) * 100) / 100, 0);
  const hasLabour = lineItems.some(isLabourItem);

  // ELE-1401 — import the job's uninvoiced cost-ledger entries as line items.
  // Maps entry id → line-item id so only entries still on the invoice at
  // submit get stamped (removing an imported line un-imports that entry).
  const { uninvoiced: uninvoicedCosts, markInvoiced } = useJobCostEntries(jobId ?? null);
  const [importedCostMap, setImportedCostMap] = useState<Record<string, string>>({});
  const uninvoicedNotImported = uninvoicedCosts.filter((e) => !importedCostMap[e.id]);
  const uninvoicedImportTotal = uninvoicedNotImported.reduce((s, e) => s + (e.total || 0), 0);

  const importJobCosts = () => {
    if (uninvoicedNotImported.length === 0) return;
    const map: Record<string, string> = { ...importedCostMap };
    const items: LineItem[] = uninvoicedNotImported.map((e) => {
      const lineId = crypto.randomUUID();
      map[e.id] = lineId;
      const dateLabel = new Date(e.entry_date + 'T00:00:00').toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
      });
      if (e.category === 'labour') {
        return {
          id: lineId,
          description: `Labour — ${e.description} (${dateLabel})`,
          quantity: e.hours || 1,
          unit: 'hour',
          unitPrice: e.unit_cost || e.total,
          total: e.total,
          type: 'labour',
        };
      }
      return {
        id: lineId,
        description: `${e.description} (${dateLabel})`,
        quantity: e.quantity || 1,
        unit: 'each',
        unitPrice: e.unit_cost || e.total,
        total: e.total,
        type: 'material',
      };
    });
    setLineItems((prev) => [...prev, ...items]);
    setImportedCostMap(map);
    toast.success(`${items.length} cost ${items.length === 1 ? 'entry' : 'entries'} added`);
  };

  // Design audit 2: "Invoice this job" offers the job's value and the extras
  // agreed on site as lines, one tap each (the client is already prefilled).
  const { data: jobValueRow } = useQuery({
    queryKey: ['invoice-job-value', jobId],
    enabled: open && !!jobId,
    staleTime: 60_000,
    queryFn: async () => {
      const { data } = await supabase
        .from('employer_jobs')
        .select('title, value')
        .eq('id', jobId!)
        .maybeSingle();
      return (data ?? null) as { title: string | null; value: number | null } | null;
    },
  });
  const { data: doneSummary } = useJobDoneSummary(open && jobId ? jobId : null);
  const [addedJobValue, setAddedJobValue] = useState(false);
  const [addedExtras, setAddedExtras] = useState(false);
  const jobValue = Number(jobValueRow?.value) || 0;
  const siteExtras = (doneSummary?.completion?.extras ?? []).filter(
    (x) => Number(x.unit_price ?? x.total ?? 0) > 0
  );
  const siteExtrasTotal = siteExtras.reduce(
    (t, x) => t + (Number(x.total) || Number(x.quantity || 1) * Number(x.unit_price || 0)),
    0
  );
  const offerJobValue = !!jobId && !selectedQuoteId && jobValue > 0 && !addedJobValue;
  const offerExtras = !!jobId && siteExtras.length > 0 && !addedExtras;

  const addJobValueLine = () => {
    setLineItems((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        description: jobValueRow?.title || jobTitle || 'Works as agreed',
        quantity: 1,
        unit: 'each',
        unitPrice: jobValue,
        total: jobValue,
        type: 'material',
      },
    ]);
    setAddedJobValue(true);
  };
  const addExtrasLines = () => {
    setLineItems((prev) => [
      ...prev,
      ...siteExtras.map((x) => {
        const qty = Number(x.quantity) || 1;
        const price = Number(x.unit_price ?? (Number(x.total) || 0) / qty);
        return {
          id: crypto.randomUUID(),
          description: `Extra agreed on site: ${x.description}`,
          quantity: qty,
          unit: x.unit || 'each',
          unitPrice: price,
          total: Math.round(qty * price * 100) / 100,
          type: 'material',
        };
      }),
    ]);
    setAddedExtras(true);
  };

  const addLineItem = () => {
    if (!newItem.description) return;
    const qty = Number(newItem.quantity) || 1;
    const price = Number(newItem.unitPrice) || 0;
    const item: LineItem = {
      id: crypto.randomUUID(),
      description: newItem.description,
      quantity: qty,
      unit: newItem.unit,
      unitPrice: price,
      total: qty * price,
      type: newItem.type,
    };
    setLineItems([...lineItems, item]);
    setNewItem({ description: '', quantity: '', unit: 'each', unitPrice: '', type: 'material' });
  };

  const removeLineItem = (id: string) => {
    setLineItems(lineItems.filter((item) => item.id !== id));
    setItemQuantityInputs((prev) => {
      const { [id]: _, ...rest } = prev;
      return rest;
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    setLineItems(
      lineItems.map((item) =>
        item.id === id ? { ...item, quantity, total: quantity * item.unitPrice } : item
      )
    );
  };

  const handleSubmit = async (sendImmediately: boolean) => {
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + Number(paymentTerms));

    const email = clientEmail.trim();
    const emailOk = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);

    // ELE-2065: never raise a second invoice for a quote that's already been
    // invoiced (another tab, another person, or the Job done draft).
    if (selectedQuoteId) {
      const fresh = await getQuoteDeposit(selectedQuoteId);
      if (fresh?.converted_invoice_id) {
        toast.error(
          fresh.converted_invoice_number
            ? `This quote is already on invoice ${fresh.converted_invoice_number}. Open that invoice instead.`
            : 'This quote has already been invoiced. Open that invoice instead.'
        );
        queryClient.invalidateQueries({ queryKey: ['quotes'] });
        return;
      }
    }

    const createdInvoice = await createInvoiceMutation.mutateAsync({
      invoice_number: '',
      client,
      client_email: email || null,
      client_phone: clientPhone.trim() || null,
      client_address: clientAddress.trim() || null,
      client_id: clientChoice && clientChoice !== 'new' ? clientChoice.id : null,
      from_quote_id: selectedQuoteId,
      project,
      amount: total,
      status: 'Draft',
      due_date: dueDate.toISOString().split('T')[0],
      paid_date: null,
      // Carry the job link through quote → invoice so the job's P&L sees it.
      job_id:
        jobId ??
        fromQuote?.job_id ??
        (selectedQuoteId ? quotes.find((q) => q.id === selectedQuoteId)?.job_id : null) ??
        null,
      quote_id: selectedQuoteId,
      line_items: lineItems,
      notes,
      vat_rate: Number(vatRate),
      reverse_charge: reverseCharge,
      cis_enabled: cisEnabled,
      cis_rate: Number(cisRate),
      subtotal,
      vat_amount: vatAmount,
      cis_amount: cisAmount,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);

    // Auto-link into the CRM so the client record builds itself (non-fatal).
    if (createdInvoice?.id && client) {
      linkRecordToClient('quotes', createdInvoice.id, client, {
        clientId: clientChoice && clientChoice !== 'new' ? clientChoice.id : null,
        forceNew: clientChoice === 'new',
        email,
        phone: clientPhone,
        address: clientAddress,
      }).catch(() => {});
    }

    // §3A #12: the job's certificate goes with this invoice, or waits until it
    // is paid (release-certificate sends it when the payment lands). Before
    // any send, so the emailed invoice carries it.
    if (createdInvoice?.id && chosenCert && certMode !== 'none') {
      try {
        await setInvoiceCertificate(createdInvoice.id, chosenCert.report_uuid, certMode);
      } catch (err) {
        toast.error(
          `Invoice saved, but the certificate couldn't be added: ${
            err instanceof Error ? err.message : 'please try again'
          }`
        );
      }
    }

    // Stamp imported cost-ledger entries so they can never be billed twice —
    // only those whose line item survived to submission (ELE-1401).
    if (createdInvoice?.id) {
      const liveLineIds = new Set(lineItems.map((li) => li.id));
      const stampIds = Object.entries(importedCostMap)
        .filter(([, lineId]) => liveLineIds.has(lineId))
        .map(([entryId]) => entryId);
      if (stampIds.length > 0) {
        markInvoiced({ ids: stampIds, invoiceId: createdInvoice.id }).catch((err) =>
          console.error('Failed to stamp cost entries as invoiced:', err)
        );
      }
    }

    // ELE-2065: converting from a quote links the two and closes the quote out
    // (it can't be invoiced twice and leaves the convert list), and takes a
    // paid deposit off the balance. Done before any send, so the emailed
    // invoice already shows the balance.
    if (createdInvoice?.id && selectedQuoteId) {
      try {
        const link = await linkInvoiceToQuote(selectedQuoteId, createdInvoice.id);
        if (link.deposit_credited > 0) {
          toast.success(
            `Deposit of £${Number(link.deposit_credited).toFixed(2)} taken off this invoice.`
          );
        }
      } catch (err) {
        toast.error(
          `Invoice saved, but it couldn't be linked to its quote: ${
            err instanceof Error ? err.message : 'please try again'
          }`
        );
      } finally {
        queryClient.invalidateQueries({ queryKey: ['quotes'] });
        queryClient.invalidateQueries({ queryKey: ['invoices'] });
        queryClient.invalidateQueries({ queryKey: ['quote-deposit-credit'] });
      }
    }

    // "Send" really sends — the emailed portal link marks it Pending.
    if (sendImmediately && createdInvoice?.id) {
      if (!emailOk) {
        toast.info('Invoice saved as draft. Add a client email to send it.');
      } else {
        try {
          await sendInvoiceService(createdInvoice.id, email);
          queryClient.invalidateQueries({ queryKey: ['invoices'] });
          toast.success(`Invoice sent to ${email}`);
        } catch (err) {
          toast.error(
            err instanceof Error && err.message !== 'NEEDS_CLIENT_EMAIL'
              ? err.message
              : 'Invoice saved as draft. The email failed to send. Open it and use Send email.'
          );
        }
      }
    }

    resetForm();
    onOpenChange(false);
  };

  const resetForm = () => {
    setStep(1);
    setClient('');
    setClientEmail('');
    setClientPhone('');
    setClientAddress('');
    setClientChoice(null);
    setCertPick(null);
    setCertMode('with_invoice');
    setProject('');
    setPaymentTerms('30');
    setVatRate('20');
    setReverseCharge(false);
    setCisEnabled(false);
    setCisRate('20');
    setNotes('');
    setLineItems([]);
    setAddedJobValue(false);
    setAddedExtras(false);
    setSelectedQuoteId(null);
    setNewItem({ description: '', quantity: '', unit: 'each', unitPrice: '', type: 'material' });
    setItemQuantityInputs({});
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return client.trim().length > 0;
      case 2:
        return lineItems.length > 0;
      case 3:
        return true;
      default:
        return false;
    }
  };

  const stepLabels = ['Client', 'Items', 'Review'];
  const currentStepLabel = stepLabels[step - 1];

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        hideCloseButton
        className="h-[85vh] p-0 rounded-t-2xl overflow-hidden bg-[hsl(0_0%_8%)] border-white/[0.08]"
      >
        <div className="flex flex-col h-full">
          {/* Drag indicator */}
          <div className="pt-2.5 pb-1 flex justify-center">
            <div className="h-1 w-10 rounded-full bg-white/20" />
          </div>

          <div className="px-4 pb-4 border-b border-white/[0.06]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => onOpenChange(false)}
                  className="h-9 w-9 rounded-full bg-white/[0.04] border border-white/[0.08] text-white flex items-center justify-center hover:bg-white/[0.08] transition-colors touch-manipulation"
                >
                  <X className="h-5 w-5" />
                </button>
                <div>
                  <Eyebrow>New invoice</Eyebrow>
                  <div className="mt-1 text-[18px] font-semibold text-white leading-tight">
                    {invoiceNumber || 'Draft invoice'}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[13px] font-medium text-white">{currentStepLabel}</span>
                <IOSStepIndicator steps={3} currentStep={step - 1} className="mt-1" />
              </div>
            </div>
          </div>

          {/* Content */}
          <ScrollArea className="min-h-0 flex-1">
            <div className="mx-auto w-full max-w-[88rem] px-4 py-6 pb-8">
              {step === 1 && (
                <div className="space-y-4 lg:grid lg:grid-cols-2 lg:items-start lg:gap-4 lg:space-y-0">
                  {jobId && !fromQuote && quotesLoaded && approvedQuotes.length === 0 && (
                    <p className="text-[13px] leading-snug text-white lg:col-span-2">
                      No accepted quote on this job yet. Add the lines yourself, or open the quote
                      and use Link to a job.
                    </p>
                  )}
                  {approvedQuotes.length > 0 && (
                    <div className="min-w-0 space-y-2 lg:col-span-2">
                      <label className={cn(fieldLabelClass, 'flex items-center gap-2')}>
                        <FileText className="h-4 w-4" />
                        {jobId ? "From this job's accepted quote" : 'Create from accepted quote'}
                      </label>
                      <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar -mx-1 px-1 lg:flex-wrap lg:overflow-visible">
                        {approvedQuotes.map((quote) => {
                          const isSelected = selectedQuoteId === quote.id;
                          return (
                            <button
                              key={quote.id}
                              type="button"
                              onClick={() => loadFromQuote(quote.id)}
                              className={cn(
                                'shrink-0 min-h-[44px] px-4 rounded-full text-[12.5px] font-medium border transition-colors',
                                isSelected
                                  ? 'bg-elec-yellow text-black border-elec-yellow'
                                  : 'bg-white/[0.04] text-white border-white/[0.08] hover:bg-white/[0.08]'
                              )}
                            >
                              {quote.quote_number} - {quote.client}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  <FormCard bleed eyebrow="Client details">
                    <Field label="Client name" required>
                      <Input
                        placeholder="Enter client name"
                        value={client}
                        onChange={(e) => setClient(e.target.value)}
                        className={inputClass}
                        autoComplete={autoCompleteOff}
                      />
                    </Field>
                    {!selectedQuoteId && (
                      <ClientMatchHint
                        name={client}
                        email={clientEmail}
                        phone={clientPhone}
                        pickedId={clientChoice && clientChoice !== 'new' ? clientChoice.id : null}
                        onPick={(m) => {
                          if (m === 'new' || m === null) {
                            setClientChoice(m);
                            return;
                          }
                          setClientChoice({ id: m.id });
                          setClient(m.name);
                          setClientEmail((v) => v || m.email || '');
                          setClientPhone((v) => v || m.phone || '');
                          setClientAddress((v) => v || m.address || '');
                        }}
                      />
                    )}
                    <FormGrid cols={2}>
                      <Field label="Client email">
                        <Input
                          type="email"
                          placeholder="client@example.com"
                          value={clientEmail}
                          onChange={(e) => setClientEmail(e.target.value)}
                          className={inputClass}
                          autoComplete={autoCompleteOff}
                        />
                      </Field>
                      <Field label="Client phone">
                        <Input
                          type="tel"
                          placeholder="+44 7700 900000"
                          value={clientPhone}
                          onChange={(e) => setClientPhone(e.target.value)}
                          className={inputClass}
                          autoComplete={autoCompleteOff}
                        />
                      </Field>
                    </FormGrid>
                    <Field label="Client address">
                      <Input
                        placeholder="Billing address, as it should read on the invoice"
                        value={clientAddress}
                        onChange={(e) => setClientAddress(e.target.value)}
                        className={inputClass}
                        autoComplete={autoCompleteOff}
                      />
                    </Field>
                    <Field label="Project / reference">
                      <Input
                        placeholder="Project name or reference"
                        value={project}
                        onChange={(e) => setProject(e.target.value)}
                        className={inputClass}
                        autoComplete={autoCompleteOff}
                      />
                    </Field>
                    <FormGrid cols={2}>
                      <Field label="Payment terms">
                        <SelectField
                          value={paymentTerms}
                          onValueChange={setPaymentTerms}
                          options={[
                            { value: '0', label: 'Due on Receipt' },
                            { value: '7', label: 'Net 7' },
                            { value: '14', label: 'Net 14' },
                            { value: '30', label: 'Net 30' },
                            { value: '60', label: 'Net 60' },
                          ]}
                        />
                      </Field>
                      <Field label="VAT rate">
                        <SelectField
                          value={vatRate}
                          onValueChange={setVatRate}
                          options={[
                            { value: '0', label: '0% (Exempt)' },
                            { value: '5', label: '5% (Reduced)' },
                            { value: '20', label: '20% (Standard)' },
                          ]}
                        />
                      </Field>
                    </FormGrid>
                  </FormCard>

                  <FormCard bleed eyebrow="VAT & CIS">
                    <div className="flex items-center justify-between gap-3 min-h-[44px]">
                      <div className="flex-1 min-w-0">
                        <p className="text-[13.5px] font-medium text-white">
                          Domestic reverse charge
                        </p>
                        <p className="text-[11.5px] text-white mt-0.5">
                          Invoice shows £0 VAT and the customer accounts to HMRC. For VAT-registered
                          contractor chains.
                        </p>
                      </div>
                      <Switch checked={reverseCharge} onCheckedChange={setReverseCharge} />
                    </div>
                    <div className="flex items-center justify-between gap-3 min-h-[44px]">
                      <div className="flex-1 min-w-0">
                        <p className="text-[13.5px] font-medium text-white">CIS deduction</p>
                        <p className="text-[11.5px] text-white mt-0.5">
                          Deducted from labour lines only. Tag items as labour when adding them.
                        </p>
                      </div>
                      <Switch checked={cisEnabled} onCheckedChange={setCisEnabled} />
                    </div>
                    {cisEnabled && (
                      <div className="flex gap-2">
                        {[
                          { value: '20', label: '20% — registered' },
                          { value: '30', label: '30% — unverified' },
                        ].map((opt) => (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => setCisRate(opt.value)}
                            className={cn(
                              'h-11 flex-1 rounded-xl text-[12.5px] font-medium border transition-colors touch-manipulation',
                              cisRate === opt.value
                                ? 'bg-elec-yellow text-black border-elec-yellow'
                                : 'bg-white/[0.04] text-white border-white/[0.08]'
                            )}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </FormCard>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4 lg:grid lg:grid-cols-2 lg:items-start lg:gap-4 lg:space-y-0">
                  {(offerJobValue || offerExtras) && (
                    <div className="overflow-hidden rounded-xl border border-white/[0.12] bg-white/[0.04] lg:col-span-2">
                      <p className="px-4 pt-3.5 text-[14px] font-semibold text-white">
                        From this job
                      </p>
                      <div className="divide-y divide-white/[0.07]">
                        {offerJobValue && (
                          <div className="flex items-center gap-3 px-4 py-3">
                            <div className="min-w-0 flex-1">
                              <p className="line-clamp-2 break-words text-[14px] font-medium text-white">
                                {jobValueRow?.title || jobTitle || 'The job'}
                              </p>
                              <p className="text-[12.5px] text-white">The job's agreed value</p>
                            </div>
                            <span className="shrink-0 text-[15px] font-semibold tabular-nums text-white">
                              £
                              {jobValue.toLocaleString('en-GB', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })}
                            </span>
                            <button
                              type="button"
                              onClick={addJobValueLine}
                              className="h-11 shrink-0 rounded-xl border border-white/[0.14] bg-white/[0.06] px-4 text-[14px] font-semibold text-white touch-manipulation hover:bg-white/[0.1]"
                            >
                              Add
                            </button>
                          </div>
                        )}
                        {offerExtras && (
                          <div className="flex items-center gap-3 px-4 py-3">
                            <div className="min-w-0 flex-1">
                              <p className="line-clamp-2 break-words text-[14px] font-medium text-white">
                                Extras agreed on site
                              </p>
                              <p className="text-[12.5px] text-white">
                                {siteExtras.length === 1
                                  ? siteExtras[0].description
                                  : `${siteExtras.length} items the customer agreed`}
                              </p>
                            </div>
                            <span className="shrink-0 text-[15px] font-semibold tabular-nums text-white">
                              £
                              {siteExtrasTotal.toLocaleString('en-GB', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })}
                            </span>
                            <button
                              type="button"
                              onClick={addExtrasLines}
                              className="h-11 shrink-0 rounded-xl border border-white/[0.14] bg-white/[0.06] px-4 text-[14px] font-semibold text-white touch-manipulation hover:bg-white/[0.1]"
                            >
                              Add
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  {uninvoicedNotImported.length > 0 && (
                    <button
                      onClick={importJobCosts}
                      className="w-full flex items-center justify-between gap-3 px-4 py-3.5 rounded-xl border border-elec-yellow/30 bg-white/[0.06] text-left touch-manipulation active:scale-[0.99] transition-transform lg:col-span-2"
                    >
                      <div className="min-w-0">
                        <div className="text-[13.5px] font-semibold text-white">
                          Import job costs
                        </div>
                        <div className="mt-0.5 text-[11.5px] text-white">
                          {uninvoicedNotImported.length}{' '}
                          {uninvoicedNotImported.length === 1 ? 'entry' : 'entries'} logged on this
                          job, not yet invoiced
                        </div>
                      </div>
                      <span className="text-[14px] font-bold text-elec-yellow tabular-nums shrink-0">
                        £{uninvoicedImportTotal.toFixed(2)}
                      </span>
                    </button>
                  )}
                  {lineItems.length > 0 && (
                    <FormCard bleed eyebrow="Line items added">
                      <div className="space-y-2">
                        {lineItems.map((item) => (
                          <div
                            key={item.id}
                            className="rounded-xl bg-white/[0.025] border border-white/[0.08] p-4"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-[13px] text-white truncate">
                                  {item.description}
                                  {isLabourItem(item) && (
                                    <span className="ml-2 inline-block rounded-full bg-white/[0.06] border border-elec-yellow/25 px-2 py-0.5 text-[10px] font-medium text-elec-yellow align-middle">
                                      Labour
                                    </span>
                                  )}
                                </p>
                                <div className="flex items-center gap-3 mt-2">
                                  <Input
                                    type="text"
                                    inputMode="decimal"
                                    value={itemQuantityInputs[item.id] ?? String(item.quantity)}
                                    onChange={(e) =>
                                      setItemQuantityInputs((prev) => ({
                                        ...prev,
                                        [item.id]: e.target.value,
                                      }))
                                    }
                                    onBlur={(e) => {
                                      const val = Number(e.target.value) || 1;
                                      updateQuantity(item.id, val);
                                      setItemQuantityInputs((prev) => ({
                                        ...prev,
                                        [item.id]: String(val),
                                      }));
                                    }}
                                    className={cn(inputClass, 'w-20 text-center')}
                                  />
                                  <span className="text-[11.5px] text-white">{item.unit}</span>
                                  <span className="text-[11.5px] text-white">
                                    × £{item.unitPrice.toFixed(2)}
                                  </span>
                                </div>
                              </div>
                              <div className="text-right shrink-0">
                                <p className="text-lg font-bold text-elec-yellow tabular-nums">
                                  £{item.total.toFixed(2)}
                                </p>
                                <button
                                  type="button"
                                  onClick={() => removeLineItem(item.id)}
                                  className="h-9 w-9 rounded-full flex items-center justify-center text-red-400 hover:bg-red-500/10 transition-colors mt-1"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </FormCard>
                  )}

                  <div className="rounded-2xl border border-dashed border-white/[0.15] bg-white/[0.02] p-4 space-y-3">
                    <label className={fieldLabelClass}>Add line item</label>
                    <Input
                      placeholder="Item description"
                      value={newItem.description}
                      onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                      className={inputClass}
                      autoComplete={autoCompleteOff}
                    />
                    <div className="grid grid-cols-3 gap-3">
                      <Field label="Qty">
                        <Input
                          type="text"
                          inputMode="decimal"
                          placeholder="1"
                          value={newItem.quantity}
                          onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
                          className={cn(inputClass, 'text-center')}
                        />
                      </Field>
                      <Field label="Unit">
                        <SelectField
                          value={newItem.unit}
                          onValueChange={(v) => setNewItem({ ...newItem, unit: v })}
                          options={[
                            { value: 'each', label: 'each' },
                            { value: 'm', label: 'm' },
                            { value: 'm²', label: 'm²' },
                            { value: 'hour', label: 'hour' },
                            { value: 'day', label: 'day' },
                            { value: 'job', label: 'job' },
                          ]}
                        />
                      </Field>
                      <Field label="Price £">
                        <Input
                          type="text"
                          inputMode="decimal"
                          placeholder="0"
                          value={newItem.unitPrice}
                          onChange={(e) => setNewItem({ ...newItem, unitPrice: e.target.value })}
                          className={cn(inputClass, 'text-center')}
                        />
                      </Field>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { value: 'labour', label: 'Labour' },
                        { value: 'material', label: 'Materials' },
                        { value: 'equipment', label: 'Equipment hire' },
                        { value: 'service', label: 'Service / fee' },
                      ].map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => setNewItem({ ...newItem, type: opt.value })}
                          className={cn(
                            'h-11 flex-1 rounded-xl text-[12.5px] font-medium border transition-colors touch-manipulation',
                            newItem.type === opt.value
                              ? 'bg-elec-yellow text-black border-elec-yellow'
                              : 'bg-white/[0.04] text-white border-white/[0.08]'
                          )}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                    <SecondaryButton
                      onClick={addLineItem}
                      disabled={!newItem.description}
                      fullWidth
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Item
                    </SecondaryButton>
                  </div>

                  {cisEnabled && !hasLabour && lineItems.length > 0 && (
                    <p className="rounded-xl border border-amber-500/30 bg-white/[0.06] px-3 py-2.5 text-[12px] text-amber-300">
                      CIS is on but no items are tagged as labour. The deduction will be £0. Tag
                      labour items using the Labour toggle above.
                    </p>
                  )}

                  {lineItems.length === 0 && (
                    <p className="text-[12.5px] text-white text-center py-2 lg:col-span-2">
                      Add at least one line item to continue.
                    </p>
                  )}
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4 lg:grid lg:grid-cols-2 lg:items-start lg:gap-4 lg:space-y-0">
                  <div className="rounded-2xl bg-white/[0.06] border border-elec-yellow/30 p-4 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-[12.5px] text-white">Client</span>
                      <span className="font-medium text-white">{client}</span>
                    </div>
                    {project && (
                      <div className="flex justify-between items-center">
                        <span className="text-[12.5px] text-white">Project</span>
                        <span className="font-medium text-[12.5px] text-white">{project}</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center">
                      <span className="text-[12.5px] text-white">Payment Terms</span>
                      <span className="font-medium text-white">
                        {paymentTerms === '0' ? 'Due on Receipt' : `Net ${paymentTerms}`}
                      </span>
                    </div>
                    <div className="border-t border-white/[0.1] pt-4 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-[12.5px] text-white">Subtotal</span>
                        <span className="text-[12.5px] text-white tabular-nums">
                          £{subtotal.toFixed(2)}
                        </span>
                      </div>
                      {reverseCharge ? (
                        <div className="flex justify-between">
                          <span className="text-[12.5px] text-white">VAT — reverse charge</span>
                          <span className="text-[12.5px] text-white tabular-nums">£0.00</span>
                        </div>
                      ) : (
                        <div className="flex justify-between">
                          <span className="text-[12.5px] text-white">VAT ({vatRate}%)</span>
                          <span className="text-[12.5px] text-white tabular-nums">
                            £{vatAmount.toFixed(2)}
                          </span>
                        </div>
                      )}
                      {cisAmount > 0 && (
                        <div className="flex justify-between">
                          <span className="text-[12.5px] text-white">
                            Less CIS ({cisRate}% of labour)
                          </span>
                          <span className="text-[12.5px] text-red-400 tabular-nums">
                            −£{cisAmount.toFixed(2)}
                          </span>
                        </div>
                      )}
                      <div className="flex justify-between pt-2 border-t border-white/[0.1]">
                        <span className="text-lg font-bold text-white">
                          {cisAmount > 0 ? 'Due after CIS' : 'Total Due'}
                        </span>
                        <span className="text-2xl font-bold text-elec-yellow tabular-nums">
                          £{amountDue.toFixed(2)}
                        </span>
                      </div>
                      {depositPaid > 0 && (
                        <>
                          <div className="flex justify-between">
                            <span className="text-[12.5px] text-white">
                              Deposit paid
                              {depositCredit?.depositApplied.paidAt
                                ? ` on ${new Date(depositCredit.depositApplied.paidAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}`
                                : ''}
                            </span>
                            <span className="text-[12.5px] text-white tabular-nums">
                              −£{depositPaid.toFixed(2)}
                            </span>
                          </div>
                          <div className="flex justify-between pt-2 border-t border-white/[0.1]">
                            <span className="text-[15px] font-semibold text-white">
                              Balance due
                            </span>
                            <span className="text-[18px] font-semibold text-white tabular-nums">
                              £{balanceDue.toFixed(2)}
                            </span>
                          </div>
                        </>
                      )}
                      {reverseCharge && (
                        <p className="text-[11px] text-white leading-relaxed pt-1">
                          Reverse charge: customer to account to HMRC for the VAT of £
                          {notionalVat.toFixed(2)} ({vatRate}%). VAT Act 1994, s.55A.
                        </p>
                      )}
                    </div>
                  </div>

                  <Field label="Notes / payment details">
                    <Textarea
                      placeholder="Bank details, payment instructions, etc."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className={cn(textareaClass, 'min-h-[100px]')}
                    />
                  </Field>

                  <FormCard bleed eyebrow="Line items">
                    <div className="space-y-2">
                      {lineItems.map((item, idx) => (
                        <div
                          key={item.id}
                          className="flex justify-between items-center py-2 px-3 bg-white/[0.025] border border-white/[0.06] rounded-xl"
                        >
                          <div className="flex-1 min-w-0">
                            <span className="text-[12.5px] text-white mr-2">{idx + 1}.</span>
                            <span className="text-[12.5px] text-white">{item.description}</span>
                            <span className="text-[11px] text-white ml-2">× {item.quantity}</span>
                          </div>
                          <span className="font-medium text-white shrink-0 tabular-nums">
                            £{item.total.toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </FormCard>

                  {readyCerts.length > 0 && (
                    <FormCard bleed eyebrow="Certificate">
                      {readyCerts.length > 1 && (
                        <div className="flex flex-wrap gap-2">
                          {readyCerts.slice(0, 4).map((c) => (
                            <button
                              key={c.report_uuid}
                              type="button"
                              onClick={() => setCertPick(c.report_uuid)}
                              className={cn(
                                'h-11 rounded-xl border px-3.5 text-[13px] font-medium touch-manipulation transition-colors',
                                certPick === c.report_uuid
                                  ? 'bg-elec-yellow text-black border-elec-yellow font-semibold'
                                  : 'bg-white/[0.06] text-white border-white/[0.12]'
                              )}
                            >
                              {certName(c)}
                            </button>
                          ))}
                        </div>
                      )}
                      {chosenCert && (
                        <p className="text-[14px] font-semibold text-white">
                          {certName(chosenCert)}
                        </p>
                      )}
                      <div
                        className="grid gap-2 sm:grid-cols-3"
                        role="radiogroup"
                        aria-label="When the certificate goes"
                      >
                        {(
                          [
                            { v: 'with_invoice', label: 'With the invoice' },
                            { v: 'on_payment', label: 'When it is paid' },
                            { v: 'none', label: 'Leave it off' },
                          ] as const
                        ).map((o) => (
                          <button
                            key={o.v}
                            type="button"
                            role="radio"
                            aria-checked={certMode === o.v}
                            onClick={() => setCertMode(o.v)}
                            className={cn(
                              'h-11 rounded-xl border px-3 text-[13px] touch-manipulation transition-colors',
                              certMode === o.v
                                ? 'bg-elec-yellow text-black border-elec-yellow font-semibold'
                                : 'bg-white/[0.06] text-white border-white/[0.12] font-medium'
                            )}
                          >
                            {o.label}
                          </button>
                        ))}
                      </div>
                      <p className="text-[13px] leading-snug text-white">
                        {certMode === 'with_invoice'
                          ? 'The certificate is attached to the invoice email.'
                          : certMode === 'on_payment'
                            ? 'Held back until the invoice is paid, then emailed to the customer straight away.'
                            : 'The invoice goes without it. You can still send it from the job.'}
                      </p>
                      {chosenCert && !chosenCert.has_pdf && certMode !== 'none' && (
                        <p className="text-[13px] leading-snug text-orange-300">
                          Its PDF isn't saved yet. Open the certificate and save the PDF, or it
                          can't go out.
                        </p>
                      )}
                    </FormCard>
                  )}
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Sticky footer: the amount due and the step's primary action. */}
          <div className="flex-shrink-0 border-t border-white/[0.06] bg-[hsl(0_0%_8%)] px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
            <div className="mx-auto flex w-full max-w-[88rem] flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-baseline justify-between gap-3 sm:block">
                <span className="text-[13px] font-semibold text-white">
                  {depositPaid > 0 ? 'Balance due' : cisAmount > 0 ? 'Due after CIS' : 'Total due'}
                </span>
                <span className="block text-[22px] font-semibold tabular-nums text-white sm:text-[24px]">
                  £{(depositPaid > 0 ? balanceDue : amountDue).toFixed(2)}
                </span>
              </div>
              <div className="flex w-full gap-3 sm:w-auto sm:min-w-[24rem]">
                {step > 1 ? (
                  <SecondaryButton onClick={() => setStep(step - 1)} fullWidth size="lg">
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Back
                  </SecondaryButton>
                ) : (
                  <SecondaryButton onClick={() => onOpenChange(false)} fullWidth size="lg">
                    Cancel
                  </SecondaryButton>
                )}
                {step < 3 ? (
                  <PrimaryButton
                    onClick={() => setStep(step + 1)}
                    disabled={!canProceed()}
                    fullWidth
                    size="lg"
                  >
                    Next
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </PrimaryButton>
                ) : (
                  <div className="flex gap-2 flex-1">
                    <SecondaryButton
                      onClick={() => handleSubmit(false)}
                      disabled={createInvoiceMutation.isPending}
                      fullWidth
                      size="lg"
                    >
                      Save draft
                    </SecondaryButton>
                    <PrimaryButton
                      onClick={() => handleSubmit(true)}
                      disabled={createInvoiceMutation.isPending}
                      fullWidth
                      size="lg"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Send
                    </PrimaryButton>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
