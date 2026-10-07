import { useState, useEffect } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { IOSStepIndicator } from '@/components/ui/ios-step-indicator';
import {
  Plus,
  Trash2,
  Package,
  ChevronLeft,
  ChevronRight,
  Send,
  Clock,
  Sparkles,
  Loader2,
  X,
} from 'lucide-react';
import { useCreateQuote, useNextQuoteNumber, useUpdateQuoteDraft } from '@/hooks/useFinance';
import type { Quote } from '@/services/financeService';
import { useFirmQuoteDefaults } from '@/hooks/useFirmQuoteDefaults';
import { LineSourceTag } from '@/components/employer/quotes/LineSourceTag';
import { isLineSource, needsCheck, type AIQuoteStamp, type LineSource } from '@/services/aiQuoteService';
import { useFirmPriceBook } from '@/hooks/useFirmPriceBook';
import { PriceBookPicker, type PickedPriceBookLine } from '@/components/employer/PriceBookPicker';
import { sendQuote as sendQuoteService } from '@/services/financeService';
import { useQueryClient } from '@tanstack/react-query';
import { linkRecordToClient } from '@/services/employerClientService';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import { calcEmployerTotals } from '@/utils/employerMoney';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useOptionalVoiceFormContext } from '@/contexts/VoiceFormContext';
import {
  Eyebrow,
  FormCard,
  FormGrid,
  Field,
  PrimaryButton,
  SecondaryButton,
  inputClass,
  textareaClass,
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
  /** ELE-1990: where the price came from (price book / AI estimate / checked). */
  source?: LineSource;
  priceBookItemId?: string | null;
  note?: string;
}

interface LabourItem {
  id: string;
  description: string;
  hours: number;
  hourlyRate: number;
  total: number;
  source?: LineSource;
  basis?: string;
}

interface CreateQuoteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  prefillClient?: string;
  prefillEmail?: string;
  prefillPhone?: string;
  prefillAddress?: string;
  prefillAmount?: number;
  /** ELE-1832: one unpriced line per open certificate observation (remedial quote). */
  prefillLines?: { description: string; note?: string }[];
  prefillTitle?: string;
  /** When raised from a job, links the quote to it. */
  jobId?: string;
  /**
   * ELE-1990: open an existing DRAFT (e.g. one the AI just drafted) for review
   * and editing. Saving updates that row; nothing new is numbered.
   */
  editQuote?: Quote | null;
}

const LABOUR_PRESETS = [
  { description: '1st Fix Electrician', hourlyRate: 45 },
  { description: '2nd Fix Electrician', hourlyRate: 45 },
  { description: 'Apprentice', hourlyRate: 18 },
  { description: 'Qualified Electrician', hourlyRate: 45 },
];

export function CreateQuoteDialog({
  open,
  onOpenChange,
  prefillClient,
  prefillEmail,
  prefillPhone,
  prefillAddress,
  prefillAmount,
  prefillLines,
  prefillTitle,
  jobId,
  editQuote,
}: CreateQuoteDialogProps) {
  const isEdit = !!editQuote;
  const [step, setStep] = useState(1);
  const [client, setClient] = useState(prefillClient || '');
  const [clientAddress, setClientAddress] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [description, setDescription] = useState('');
  const [validityDays, setValidityDays] = useState('30');
  const [vatRate, setVatRate] = useState('20');
  const [reverseCharge, setReverseCharge] = useState(false);
  const [cisEnabled, setCisEnabled] = useState(false);
  const [cisRate, setCisRate] = useState('20');
  // Deposit on acceptance (ELE-1947): the accept page reads these from the
  // quote's settings; 'default' leaves them out so the firm's default applies.
  const [depositMode, setDepositMode] = useState<'default' | 'none' | 'percent' | 'amount'>(
    'default'
  );
  const [depositValue, setDepositValue] = useState('');
  const [notes, setNotes] = useState('');
  const [lineItems, setLineItems] = useState<LineItem[]>([]);
  const [labourItems, setLabourItems] = useState<LabourItem[]>([]);
  const [newItem, setNewItem] = useState({
    description: '',
    quantity: '',
    unit: 'each',
    unitPrice: '',
  });
  const [newLabour, setNewLabour] = useState({ description: '', hours: '', hourlyRate: '' });

  const [itemQuantityInputs, setItemQuantityInputs] = useState<Record<string, string>>({});
  const [labourHoursInputs, setLabourHoursInputs] = useState<Record<string, string>>({});
  const [isExpandingDescription, setIsExpandingDescription] = useState(false);

  const { data: nextQuoteNumber } = useNextQuoteNumber();
  const quoteNumber = editQuote?.quote_number || nextQuoteNumber;
  const updateDraft = useUpdateQuoteDraft();
  const { data: firmDefaults } = useFirmQuoteDefaults();
  const aiStamp = (editQuote?.settings?.aiQuote ?? null) as AIQuoteStamp | null;
  const [itemPriceInputs, setItemPriceInputs] = useState<Record<string, string>>({});
  // The firm's ONE price book (owner's Electrical Hub materials, ELE-1991).
  // Sell prices only — office managers may quote, never see buy prices.
  const { data: priceBook = [] } = useFirmPriceBook();
  const [pickerOpen, setPickerOpen] = useState(false);
  const recentPriced = priceBook
    .filter((i) => i.sell_price != null)
    .sort((a, b) => (b.price_updated_at ?? '').localeCompare(a.price_updated_at ?? ''))
    .slice(0, 6);
  const createQuoteMutation = useCreateQuote();
  const queryClient = useQueryClient();

  const handleExpandDescription = async () => {
    if (!description.trim()) return;

    setIsExpandingDescription(true);
    try {
      const { data, error } = await supabase.functions.invoke('expand-description', {
        body: { description: description.trim() },
      });

      if (error) throw error;

      if (data?.expandedDescription) {
        setDescription(data.expandedDescription);
        toast.success('Description expanded');
      }
    } catch (err) {
      console.error('Error expanding description:', err);
      toast.error((err instanceof Error ? err.message : '') || 'Failed to expand description');
    } finally {
      setIsExpandingDescription(false);
    }
  };

  useEffect(() => {
    if (prefillClient) setClient(prefillClient);
    if (prefillEmail) setClientEmail(prefillEmail);
    if (prefillPhone) setClientPhone(prefillPhone);
    if (prefillAddress) setClientAddress(prefillAddress);
    if (prefillAmount) {
      setLineItems([
        {
          id: crypto.randomUUID(),
          description: 'Works as discussed',
          quantity: 1,
          unit: 'job',
          unitPrice: prefillAmount,
          total: prefillAmount,
        },
      ]);
    }
    if (prefillTitle) setJobTitle(prefillTitle);
    if (prefillLines?.length) {
      setLineItems(
        prefillLines.map((l) => ({
          id: crypto.randomUUID(),
          description: l.description,
          quantity: 1,
          unit: 'item',
          unitPrice: 0,
          total: 0,
          note: l.note,
        }))
      );
    }
  }, [prefillClient, prefillEmail, prefillPhone, prefillAddress, prefillAmount, prefillLines, prefillTitle]);

  // ELE-1990: a new quote starts from the FIRM's VAT position, not a fixed 20%.
  useEffect(() => {
    if (!open || isEdit || !firmDefaults) return;
    setVatRate(firmDefaults.vatRegistered ? '20' : '0');
    setReverseCharge(firmDefaults.reverseCharge);
    setCisEnabled(firmDefaults.cisEnabled);
    setValidityDays(String(firmDefaults.validityDays));
  }, [open, isEdit, firmDefaults]);

  // An edited draft must not leak into the next "New quote".
  useEffect(() => {
    if (!open && isEdit) resetForm();
  }, [open, isEdit]);

  // ELE-1990: open an existing draft for review (the AI quote lands here).
  useEffect(() => {
    if (!open || !editQuote) return;
    const settings = (editQuote.settings ?? {}) as Record<string, unknown>;
    const num = (v: unknown, d = 0) => (Number.isFinite(Number(v)) ? Number(v) : d);
    setStep(4);
    setClient(editQuote.client === 'Client' ? '' : editQuote.client || '');
    setClientAddress(editQuote.client_address || '');
    setClientEmail(editQuote.client_email || '');
    setClientPhone(editQuote.client_phone || '');
    setJobTitle(editQuote.job_title || '');
    setDescription(editQuote.description || '');
    setNotes(editQuote.notes || '');
    const registered = String(settings.vatRegistered ?? 'true') !== 'false';
    setVatRate(registered ? String(num(settings.vatRate ?? editQuote.vat_rate, 20)) : '0');
    setReverseCharge(settings.reverseCharge === true || editQuote.reverse_charge === true);
    setCisEnabled(settings.cisEnabled === true || editQuote.cis_enabled === true);
    setCisRate(String(num(settings.cisRate ?? editQuote.cis_rate, 20)));
    if (settings.noDeposit === true) setDepositMode('none');
    else if (num(settings.depositPercentage) > 0) {
      setDepositMode('percent');
      setDepositValue(String(settings.depositPercentage));
    } else if (num(settings.depositAmount) > 0) {
      setDepositMode('amount');
      setDepositValue(String(settings.depositAmount));
    } else setDepositMode('default');
    if (editQuote.valid_until) {
      const days = Math.max(
        1,
        Math.round((new Date(editQuote.valid_until).getTime() - Date.now()) / 86_400_000)
      );
      setValidityDays(String(days));
    }
    const lines = (editQuote.line_items ?? []) as Array<Record<string, unknown>>;
    const isLabour = (l: Record<string, unknown>) =>
      l.type === 'labour' || l.category === 'labour' || (!l.type && (l.unit === 'hour' || l.unit === 'day'));
    setLabourItems(
      lines.filter(isLabour).map((l) => {
        const hours = num(l.quantity, 1);
        const rate = num(l.unitPrice);
        return {
          id: String(l.id ?? crypto.randomUUID()),
          description: String(l.description ?? 'Labour'),
          hours,
          hourlyRate: rate,
          total: Math.round(hours * rate * 100) / 100,
          source: isLineSource(l.source) ? l.source : undefined,
          basis: typeof l.basis === 'string' ? l.basis : undefined,
        };
      })
    );
    setLineItems(
      lines
        .filter((l) => !isLabour(l))
        .map((l) => {
          const qty = num(l.quantity, 1);
          const price = num(l.unitPrice);
          return {
            id: String(l.id ?? crypto.randomUUID()),
            description: String(l.description ?? 'Item'),
            quantity: qty,
            unit: String(l.unit ?? 'each'),
            unitPrice: price,
            total: Math.round(qty * price * 100) / 100,
            source: isLineSource(l.source) ? l.source : undefined,
            priceBookItemId: typeof l.priceBookItemId === 'string' ? l.priceBookItemId : null,
            note: typeof l.notes === 'string' ? l.notes : undefined,
          };
        })
    );
    setItemQuantityInputs({});
    setLabourHoursInputs({});
    setItemPriceInputs({});
  }, [open, editQuote]);

  const voiceContext = useOptionalVoiceFormContext();

  useEffect(() => {
    if (!open || !voiceContext) return;

    voiceContext.registerForm({
      formId: 'create-quote',
      formName: 'Create Quote',
      fields: [
        { name: 'client', label: 'Client Name', type: 'text', required: true },
        { name: 'clientAddress', label: 'Client Address', type: 'text', required: true },
        { name: 'clientEmail', label: 'Client Email', type: 'text' },
        { name: 'clientPhone', label: 'Client Phone', type: 'text' },
        { name: 'jobTitle', label: 'Job Title', type: 'text', required: true },
        { name: 'description', label: 'Project Description', type: 'text' },
        { name: 'validityDays', label: 'Validity Days', type: 'text' },
        { name: 'vatRate', label: 'VAT Rate', type: 'text' },
        { name: 'notes', label: 'Notes', type: 'text' },
      ],
      actions: [
        'add_labour_item',
        'add_material_item',
        'add_from_preset',
        'next_step',
        'previous_step',
      ],
      onFillField: (field, value) => {
        const strValue = String(value);
        switch (field) {
          case 'client':
            setClient(strValue);
            break;
          case 'clientAddress':
            setClientAddress(strValue);
            break;
          case 'clientEmail':
            setClientEmail(strValue);
            break;
          case 'clientPhone':
            setClientPhone(strValue);
            break;
          case 'jobTitle':
            setJobTitle(strValue);
            break;
          case 'description':
            setDescription(strValue);
            break;
          case 'validityDays':
            setValidityDays(strValue);
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
        if (action === 'add_labour_item' && params) {
          const item: LabourItem = {
            id: crypto.randomUUID(),
            description: String(params.description || 'Labour'),
            hours: Number(params.hours) || 8,
            hourlyRate: Number(params.rate) || 45,
            total: (Number(params.hours) || 8) * (Number(params.rate) || 45),
          };
          setLabourItems((prev) => [...prev, item]);
        }
        if (action === 'add_material_item' && params) {
          const item: LineItem = {
            id: crypto.randomUUID(),
            description: String(params.description || 'Material'),
            quantity: Number(params.quantity) || 1,
            unit: String(params.unit || 'each'),
            unitPrice: Number(params.price) || 0,
            total: (Number(params.quantity) || 1) * (Number(params.price) || 0),
          };
          setLineItems((prev) => [...prev, item]);
        }
        if (action === 'add_from_preset' && params?.preset) {
          const preset = LABOUR_PRESETS.find((p) =>
            p.description.toLowerCase().includes(String(params.preset).toLowerCase())
          );
          if (preset) addLabourFromPreset(preset);
        }
        if (action === 'next_step') setStep((prev) => Math.min(prev + 1, 4));
        if (action === 'previous_step') setStep((prev) => Math.max(prev - 1, 1));
      },
      onSubmit: () => handleSubmit(false),
      onCancel: () => {
        resetForm();
        onOpenChange(false);
      },
      onNextStep: () => setStep((prev) => Math.min(prev + 1, 4)),
    });

    return () => voiceContext.unregisterForm('create-quote');
  }, [open, voiceContext]);

  const labourTotal = labourItems.reduce((sum, item) => sum + item.total, 0);
  const materialsTotal = lineItems.reduce((sum, item) => sum + item.total, 0);
  const money = calcEmployerTotals(
    [
      { total: labourTotal, type: 'labour' },
      { total: materialsTotal, type: 'material' },
    ],
    {
      vatRate: Number(vatRate),
      reverseCharge,
      cisEnabled,
      cisRate: Number(cisRate),
    }
  );
  const { subtotal, vatAmount, notionalVat, cisAmount, total, amountDue } = money;

  const addLabourItem = () => {
    if (!newLabour.description) return;
    const hours = Number(newLabour.hours) || 1;
    const rate = Number(newLabour.hourlyRate) || 0;
    const item: LabourItem = {
      id: crypto.randomUUID(),
      description: newLabour.description,
      hours,
      hourlyRate: rate,
      total: hours * rate,
    };
    setLabourItems([...labourItems, item]);
    setNewLabour({ description: '', hours: '', hourlyRate: '' });
  };

  const addLabourFromPreset = (preset: (typeof LABOUR_PRESETS)[0]) => {
    const item: LabourItem = {
      id: crypto.randomUUID(),
      description: preset.description,
      hours: 8,
      hourlyRate: preset.hourlyRate,
      total: 8 * preset.hourlyRate,
    };
    setLabourItems([...labourItems, item]);
  };

  const removeLabourItem = (id: string) => {
    setLabourItems(labourItems.filter((item) => item.id !== id));
    setLabourHoursInputs((prev) => {
      const { [id]: _, ...rest } = prev;
      return rest;
    });
  };

  const updateLabourHours = (id: string, hours: number) => {
    setLabourItems(
      labourItems.map((item) =>
        item.id === id ? { ...item, hours, total: hours * item.hourlyRate } : item
      )
    );
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
    };
    setLineItems([...lineItems, item]);
    setNewItem({ description: '', quantity: '', unit: 'each', unitPrice: '' });
  };

  const addFromPriceBook = (item: { name: string; unit: string; sell_price: number | null }, qty = 1) => {
    const price = Number(item.sell_price ?? 0);
    const lineItem: LineItem = {
      id: crypto.randomUUID(),
      description: item.name,
      quantity: qty,
      unit: item.unit,
      unitPrice: price,
      total: price * qty,
      source: 'price_book',
    };
    setLineItems((prev) => [...prev, lineItem]);
  };

  const addPicked = (picked: PickedPriceBookLine[]) => {
    for (const p of picked) addFromPriceBook(p.item, p.qty);
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

  /** A typed price is a checked price: an AI estimate stops asking to be checked. */
  const updateUnitPrice = (id: string, unitPrice: number) => {
    setLineItems(
      lineItems.map((item) =>
        item.id === id
          ? {
              ...item,
              unitPrice,
              total: Math.round(item.quantity * unitPrice * 100) / 100,
              source:
                item.source && item.source !== 'price_book'
                  ? 'edited'
                  : item.source === 'price_book' && unitPrice !== item.unitPrice
                    ? 'edited'
                    : item.source,
            }
          : item
      )
    );
  };

  const toCheck =
    lineItems.filter((i) => needsCheck(i.source)).length +
    labourItems.filter((i) => needsCheck(i.source)).length;

  const handleSubmit = async (sendImmediately: boolean) => {
    const validUntil = new Date();
    validUntil.setDate(validUntil.getDate() + Number(validityDays));

    const allLineItems = [
      ...labourItems.map((item) => ({
        id: item.id,
        description: item.description,
        quantity: item.hours,
        unit: 'hour',
        unitPrice: item.hourlyRate,
        total: item.total,
        totalPrice: item.total,
        type: 'labour',
        category: 'labour',
        ...(item.source ? { source: item.source } : {}),
        ...(item.basis ? { basis: item.basis } : {}),
      })),
      ...lineItems.map(({ note, ...item }) => ({
        ...item,
        totalPrice: item.total,
        type: 'material',
        category: 'materials',
        ...(note ? { notes: note } : {}),
      })),
    ];

    const email = clientEmail.trim();
    const emailOk = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
    // "Send" must actually email the client — create as Draft first and only
    // mark Sent once the email has really gone out.
    const willSend = sendImmediately && emailOk;

    const depositSettings =
      depositMode === 'none'
        ? { noDeposit: true }
        : depositMode === 'percent' && Number(depositValue) > 0
          ? { depositPercentage: Math.min(100, Number(depositValue)) }
          : depositMode === 'amount' && Number(depositValue) > 0
            ? { depositAmount: Number(depositValue) }
            : {};

    // ELE-1990: an existing draft is UPDATED in place (no second number).
    if (isEdit && editQuote) {
      try {
        await updateDraft.mutateAsync({
          id: editQuote.id,
          data: {
            client,
            client_email: clientEmail || null,
            client_phone: clientPhone || null,
            client_address: clientAddress || null,
            job_title: jobTitle || null,
            description: description || null,
            notes,
            valid_until: validUntil.toISOString(),
            line_items: allLineItems,
            vat_rate: Number(vatRate),
            reverse_charge: reverseCharge,
            cis_enabled: cisEnabled,
            cis_rate: Number(cisRate),
            subtotal,
            vat_amount: vatAmount,
            value: total,
            settings: {
              noDeposit: depositMode === 'none' ? true : undefined,
              depositPercentage: undefined,
              depositAmount: undefined,
              ...depositSettings,
            },
          },
        });
      } catch {
        return; // the hook has already said why
      }
      if (client) linkRecordToClient('quotes', editQuote.id, client).catch(() => {});
      if (sendImmediately && !willSend) {
        toast.info('Draft saved. Add a client email to send it.');
      } else if (willSend) {
        try {
          await sendQuoteService(editQuote.id);
          queryClient.invalidateQueries({ queryKey: ['quotes'] });
          toast.success(`Quote sent to ${email}`);
        } catch (err) {
          console.error('Error sending quote:', err);
          toast.error('Draft saved. The email failed to send. Open it and use Send email.');
        }
      } else {
        toast.success(editQuote.quote_number ? `Quote ${editQuote.quote_number} saved` : 'Quote saved');
      }
      resetForm();
      onOpenChange(false);
      return;
    }

    const createdQuote = await createQuoteMutation.mutateAsync({
      quote_number: '',
      client,
      client_address: clientAddress || null,
      client_email: clientEmail || null,
      client_phone: clientPhone || null,
      job_title: jobTitle || null,
      description,
      value: total,
      status: 'Draft',
      sent_date: null,
      valid_until: validUntil.toISOString().split('T')[0],
      job_id: jobId ?? null,
      created_by: 'Admin',
      line_items: allLineItems,
      notes,
      vat_rate: Number(vatRate),
      reverse_charge: reverseCharge,
      cis_enabled: cisEnabled,
      cis_rate: Number(cisRate),
      subtotal,
      vat_amount: vatAmount,
      cis_amount: cisAmount,
      settings: depositSettings,
      // Quote type omits the finance fields (subtotal/vat/cis/job_id); the real
      // fix is completing that shared type, not casting here.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);

    // Auto-link into the CRM so the client record builds itself (non-fatal).
    if (createdQuote?.id && client) {
      linkRecordToClient('quotes', createdQuote.id, client).catch(() => {});
    }

    if (sendImmediately && !willSend) {
      toast.info('Quote saved as draft. Add a client email to send it.');
    }

    if (willSend && createdQuote?.id) {
      try {
        // One send, the Electrical Hub's own: PDF, email with the customer
        // accept link, tracking. (The old path called a dead link generator
        // and a second email function before this one.)
        await sendQuoteService(createdQuote.id);
        queryClient.invalidateQueries({ queryKey: ['quotes'] });
        toast.success(`Quote sent to ${email}`);
      } catch (err) {
        console.error('Error sending quote:', err);
        toast.error('Quote saved as draft. The email failed to send. Open it and use Send email.');
      }
    }

    resetForm();
    onOpenChange(false);
  };

  const resetForm = () => {
    setStep(1);
    setClient('');
    setClientAddress('');
    setClientEmail('');
    setClientPhone('');
    setJobTitle('');
    setDescription('');
    setValidityDays('30');
    setVatRate('20');
    setReverseCharge(false);
    setCisEnabled(false);
    setCisRate('20');
    setDepositMode('default');
    setDepositValue('');
    setNotes('');
    setLineItems([]);
    setLabourItems([]);
    setItemQuantityInputs({});
    setLabourHoursInputs({});
    setItemPriceInputs({});
    setNewItem({ description: '', quantity: '', unit: 'each', unitPrice: '' });
    setNewLabour({ description: '', hours: '', hourlyRate: '' });
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return client.trim().length > 0;
      case 2:
        return true;
      case 3:
        return true;
      case 4:
        return labourItems.length > 0 || lineItems.length > 0;
      default:
        return false;
    }
  };

  const stepLabels = ['Client', 'Labour', 'Materials', 'Review'];
  const currentStepLabel = stepLabels[step - 1];

  const NavigationButtons = () => (
    <div className="flex gap-3 mt-6 pt-4 border-t border-white/[0.06]">
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

      {step < 4 ? (
        <PrimaryButton
          data-help="quotes.next"
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
            disabled={createQuoteMutation.isPending || updateDraft.isPending || !canProceed()}
            fullWidth
            size="lg"
          >
            {isEdit ? 'Save changes' : 'Save draft'}
          </SecondaryButton>
          <PrimaryButton
            data-help="quotes.send"
            onClick={() => handleSubmit(true)}
            disabled={createQuoteMutation.isPending || updateDraft.isPending || !canProceed()}
            fullWidth
            size="lg"
          >
            <Send className="h-4 w-4 mr-1" />
            Send
          </PrimaryButton>
        </div>
      )}
    </div>
  );

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <FormCard eyebrow="Client">
              <Field label="Client name" required>
                <Input
                  placeholder="Enter client name"
                  value={client}
                  onChange={(e) => setClient(e.target.value)}
                  className={inputClass}
                  autoComplete={autoCompleteOff}
                />
              </Field>
              <Field label="Client address">
                <Textarea
                  placeholder="123 High Street&#10;London&#10;SW1A 1AA"
                  value={clientAddress}
                  onChange={(e) => setClientAddress(e.target.value)}
                  className={`${textareaClass} min-h-[80px]`}
                />
              </Field>
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
            </FormCard>

            <FormCard eyebrow="Project">
              <Field label="Job title" required>
                <Input
                  placeholder="e.g. Kitchen Rewire, Consumer Unit Upgrade"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  className={inputClass}
                  autoComplete={autoCompleteOff}
                />
              </Field>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-[11.5px] text-white block">Project description</label>
                  <button
                    type="button"
                    onClick={handleExpandDescription}
                    disabled={!description.trim() || isExpandingDescription}
                    className="inline-flex items-center gap-1 text-[11px] font-medium text-elec-yellow/90 hover:text-elec-yellow disabled:opacity-40 transition-colors touch-manipulation"
                  >
                    {isExpandingDescription ? (
                      <Loader2 className="h-3 w-3 animate-spin" />
                    ) : (
                      <Sparkles className="h-3 w-3" />
                    )}
                    AI expand
                  </button>
                </div>
                <Textarea
                  placeholder="Brief description of the work (e.g. 'rewire kitchen')"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className={`${textareaClass} min-h-[120px]`}
                />
              </div>
              <FormGrid cols={2}>
                <Field label="Valid for">
                  <SelectField
                    value={validityDays}
                    onValueChange={setValidityDays}
                    options={[
                      ...(['14', '30', '60', '90'].includes(validityDays)
                        ? []
                        : [{ value: validityDays, label: `${validityDays} days` }]),
                      { value: '14', label: '14 days' },
                      { value: '30', label: '30 days' },
                      { value: '60', label: '60 days' },
                      { value: '90', label: '90 days' },
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

            <FormCard eyebrow="VAT & CIS">
              <div className="flex items-center justify-between gap-3 min-h-[44px]">
                <div className="flex-1 min-w-0">
                  <p className="text-[13.5px] font-medium text-white">Domestic reverse charge</p>
                  <p className="text-[11.5px] text-white mt-0.5">
                    For VAT-registered contractor chains. The quote shows £0 VAT and the customer
                    accounts to HMRC.
                  </p>
                </div>
                <Switch checked={reverseCharge} onCheckedChange={setReverseCharge} />
              </div>
              <div className="flex items-center justify-between gap-3 min-h-[44px]">
                <div className="flex-1 min-w-0">
                  <p className="text-[13.5px] font-medium text-white">CIS deduction</p>
                  <p className="text-[11.5px] text-white mt-0.5">
                    Deducted from labour only. Shown so the client knows the amount payable.
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
              {cisEnabled && labourItems.length === 0 && (
                <p className="rounded-xl border border-amber-500/30 bg-white/[0.06] px-3 py-2.5 text-[12px] text-amber-300">
                  No labour items yet — CIS only deducts from labour, so the deduction will be £0
                  until you add labour in the next step.
                </p>
              )}
            </FormCard>

            <FormCard eyebrow="Deposit on acceptance">
              <p className="text-[12px] text-white leading-relaxed">
                When the customer accepts online, they're asked to pay this before the job is
                booked.
              </p>
              <div className="grid grid-cols-2 gap-2" data-help="quotes.deposit">
                {(
                  [
                    { value: 'default', label: 'Firm default' },
                    { value: 'none', label: 'No deposit' },
                    { value: 'percent', label: 'Percentage' },
                    { value: 'amount', label: 'Fixed amount' },
                  ] as const
                ).map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setDepositMode(opt.value)}
                    className={cn(
                      'h-11 rounded-xl text-[12.5px] font-medium border transition-colors touch-manipulation',
                      depositMode === opt.value
                        ? 'bg-elec-yellow text-black border-elec-yellow'
                        : 'bg-white/[0.04] text-white border-white/[0.08]'
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
              {(depositMode === 'percent' || depositMode === 'amount') && (
                <Input
                  type="number"
                  inputMode="decimal"
                  min={0}
                  max={depositMode === 'percent' ? 100 : undefined}
                  value={depositValue}
                  onChange={(e) => setDepositValue(e.target.value)}
                  placeholder={depositMode === 'percent' ? 'e.g. 30 (%)' : 'e.g. 250 (£)'}
                  className={inputClass}
                />
              )}
              {depositMode === 'default' && (
                <p className="text-[12px] text-white">
                  Uses the deposit set in Settings, if there is one.
                </p>
              )}
            </FormCard>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            {labourItems.length > 0 && (
              <FormCard eyebrow="Labour added">
                <div className="space-y-2">
                  {labourItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-start justify-between gap-3 bg-[hsl(0_0%_9%)] border border-white/[0.06] rounded-xl p-3"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-medium text-white truncate">
                          {item.description}
                        </p>
                        {(item.source || item.basis) && (
                          <div className="mt-1 flex flex-wrap items-center gap-1.5">
                            <LineSourceTag source={item.source} />
                            {item.basis && (
                              <span className="text-[11.5px] text-white leading-snug">{item.basis}</span>
                            )}
                          </div>
                        )}
                        <div className="flex items-center gap-2 mt-1.5">
                          <Input
                            type="text"
                            inputMode="decimal"
                            value={labourHoursInputs[item.id] ?? String(item.hours)}
                            onChange={(e) =>
                              setLabourHoursInputs((prev) => ({
                                ...prev,
                                [item.id]: e.target.value,
                              }))
                            }
                            onBlur={(e) => {
                              const val = Number(e.target.value) || 1;
                              updateLabourHours(item.id, val);
                              setLabourHoursInputs((prev) => ({
                                ...prev,
                                [item.id]: String(val),
                              }));
                            }}
                            className={`${inputClass} w-20 text-center`}
                          />
                          <span className="text-[12px] text-white">hrs</span>
                          <span className="text-[12px] text-white">
                            × £{item.hourlyRate.toFixed(2)}/hr
                          </span>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-[15px] font-semibold text-elec-yellow tabular-nums">
                          £{item.total.toFixed(2)}
                        </p>
                        <button
                          type="button"
                          onClick={() => removeLabourItem(item.id)}
                          className="mt-1 h-8 w-8 inline-flex items-center justify-center rounded-full bg-white/[0.04] border border-white/[0.08] text-red-400 hover:bg-red-500/15 transition-colors"
                          aria-label="Remove labour"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </FormCard>
            )}

            <FormCard eyebrow="Quick add labour">
              <div className="grid grid-cols-2 gap-2">
                {LABOUR_PRESETS.map((preset) => (
                  <button
                    key={preset.description}
                    type="button"
                    onClick={() => addLabourFromPreset(preset)}
                    className="group relative bg-[hsl(0_0%_9%)] border border-white/[0.06] rounded-xl p-3 text-center hover:border-elec-yellow/40 hover:bg-white/[0.03] active:scale-[0.98] transition-all touch-manipulation"
                  >
                    <Plus className="h-4 w-4 mx-auto text-elec-yellow mb-1" />
                    <p className="text-[12.5px] font-medium text-white truncate">
                      {preset.description}
                    </p>
                    <p className="text-[11px] text-elec-yellow font-medium">
                      £{preset.hourlyRate}/hr
                    </p>
                  </button>
                ))}
              </div>
            </FormCard>

            <FormCard eyebrow="Custom labour">
              <Field label="Description">
                <Input
                  placeholder="Labour description (e.g. Site Supervisor)"
                  value={newLabour.description}
                  onChange={(e) => setNewLabour({ ...newLabour, description: e.target.value })}
                  className={inputClass}
                  autoComplete={autoCompleteOff}
                />
              </Field>
              <FormGrid cols={2}>
                <Field label="Hours">
                  <Input
                    type="text"
                    inputMode="decimal"
                    placeholder="8"
                    value={newLabour.hours}
                    onChange={(e) => setNewLabour({ ...newLabour, hours: e.target.value })}
                    className={`${inputClass} text-center`}
                  />
                </Field>
                <Field label="Rate £/hr">
                  <Input
                    type="text"
                    inputMode="decimal"
                    placeholder="45"
                    value={newLabour.hourlyRate}
                    onChange={(e) => setNewLabour({ ...newLabour, hourlyRate: e.target.value })}
                    className={`${inputClass} text-center`}
                  />
                </Field>
              </FormGrid>
              <SecondaryButton onClick={addLabourItem} disabled={!newLabour.description} fullWidth>
                <Plus className="h-4 w-4 mr-1.5" />
                Add labour
              </SecondaryButton>
            </FormCard>

            {labourItems.length === 0 && (
              <p className="text-[12px] text-white text-center py-2">
                No labour added yet. You can skip this step if not needed.
              </p>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            {lineItems.length > 0 && (
              <FormCard eyebrow="Materials added">
                <div className="space-y-2">
                  {lineItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-start justify-between gap-3 bg-[hsl(0_0%_9%)] border border-white/[0.06] rounded-xl p-3"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-medium text-white truncate">
                          {item.description}
                        </p>
                        {(item.source || item.note) && (
                          <div className="mt-1 flex flex-wrap items-center gap-1.5">
                            <LineSourceTag source={item.source} />
                            {item.note && (
                              <span className="text-[11.5px] text-white leading-snug">{item.note}</span>
                            )}
                          </div>
                        )}
                        <div className="flex items-center gap-2 mt-1.5">
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
                            className={`${inputClass} w-20 text-center`}
                          />
                          <span className="whitespace-nowrap text-[12px] text-white">{item.unit} at £</span>
                          <Input
                            type="text"
                            inputMode="decimal"
                            aria-label={`Price per ${item.unit} for ${item.description}`}
                            value={itemPriceInputs[item.id] ?? item.unitPrice.toFixed(2)}
                            onChange={(e) =>
                              setItemPriceInputs((prev) => ({ ...prev, [item.id]: e.target.value }))
                            }
                            onBlur={(e) => {
                              const val = Math.max(0, Number(e.target.value) || 0);
                              if (val !== item.unitPrice) updateUnitPrice(item.id, val);
                              setItemPriceInputs((prev) => ({ ...prev, [item.id]: val.toFixed(2) }));
                            }}
                            className={`${inputClass} w-24 text-center`}
                          />
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-[15px] font-semibold text-elec-yellow tabular-nums">
                          £{item.total.toFixed(2)}
                        </p>
                        <button
                          type="button"
                          onClick={() => removeLineItem(item.id)}
                          className="mt-1 h-8 w-8 inline-flex items-center justify-center rounded-full bg-white/[0.04] border border-white/[0.08] text-red-400 hover:bg-red-500/15 transition-colors"
                          aria-label="Remove material"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </FormCard>
            )}

            <FormCard eyebrow="From the price book">
              <SecondaryButton onClick={() => setPickerOpen(true)} fullWidth>
                <Plus className="h-4 w-4 mr-1.5" />
                {priceBook.length > 0
                  ? `Pick from ${priceBook.length.toLocaleString()} price-book items`
                  : 'Open the price book'}
              </SecondaryButton>
              {recentPriced.length > 0 && (
                <div className="grid grid-cols-2 gap-2">
                  {recentPriced.map((item) => (
                    <button
                      key={item.item_id}
                      type="button"
                      onClick={() => addFromPriceBook(item)}
                      className="min-h-[64px] rounded-xl border border-white/[0.1] bg-[hsl(0_0%_9%)] p-3 text-left hover:border-elec-yellow/40 active:scale-[0.98] transition-all touch-manipulation"
                    >
                      <p className="text-[12.5px] font-medium text-white truncate">{item.name}</p>
                      <p className="text-[12px] text-elec-yellow font-semibold tabular-nums">
                        £{Number(item.sell_price).toFixed(2)} / {item.unit}
                      </p>
                    </button>
                  ))}
                </div>
              )}
            </FormCard>

            <FormCard eyebrow="Custom material">
              <Field label="Description">
                <Input
                  placeholder="Item description"
                  value={newItem.description}
                  onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                  className={inputClass}
                  autoComplete={autoCompleteOff}
                />
              </Field>
              <FormGrid cols={3}>
                <Field label="Qty">
                  <Input
                    type="text"
                    inputMode="decimal"
                    placeholder="1"
                    value={newItem.quantity}
                    onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
                    className={`${inputClass} text-center`}
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
                    className={`${inputClass} text-center`}
                  />
                </Field>
              </FormGrid>
              <SecondaryButton onClick={addLineItem} disabled={!newItem.description} fullWidth>
                <Plus className="h-4 w-4 mr-1.5" />
                Add material
              </SecondaryButton>
            </FormCard>

            {lineItems.length === 0 && (
              <p className="text-[12px] text-white text-center py-2">
                No materials added yet. You can skip this step if not needed.
              </p>
            )}
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            {aiStamp && (
              <FormCard eyebrow="AI draft, check before sending">
                <p className="text-[13px] text-white leading-relaxed">
                  {aiStamp.fromPriceBook} line{aiStamp.fromPriceBook === 1 ? '' : 's'} priced from
                  your price book
                  {aiStamp.estimated > 0
                    ? `, ${aiStamp.estimated} AI estimate${aiStamp.estimated === 1 ? '' : 's'} to check`
                    : ''}
                  . {aiStamp.labourHours} labour hours
                  {aiStamp.historyCount > 0 && aiStamp.historyAvgHours != null
                    ? `; your last ${aiStamp.historyCount} ${aiStamp.jobType ?? ''} job${aiStamp.historyCount === 1 ? '' : 's'} took ${aiStamp.historyAvgHours} hours on average.`
                    : '.'}
                </p>
                {toCheck > 0 ? (
                  <p className="rounded-xl border border-orange-500/30 bg-orange-500/10 px-3 py-2.5 text-[12.5px] text-white">
                    {toCheck} price{toCheck === 1 ? '' : 's'} still marked to check. Go back to
                    Labour or Materials and confirm each one; typing a price marks it checked.
                  </p>
                ) : (
                  <p className="text-[12.5px] text-white">Every estimated price has been checked.</p>
                )}
                {aiStamp.siteChecks?.length > 0 && (
                  <div className="border-t border-white/[0.1] pt-3">
                    <h3 className="text-[13px] font-semibold text-white">Confirm on site</h3>
                    <ul className="mt-1.5 space-y-1">
                      {aiStamp.siteChecks.map((c) => (
                        <li key={c} className="text-[12.5px] text-white leading-snug">
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {aiStamp.assumptions?.length > 0 && (
                  <div className="border-t border-white/[0.1] pt-3">
                    <h3 className="text-[13px] font-semibold text-white">The price assumes</h3>
                    <ul className="mt-1.5 space-y-1">
                      {aiStamp.assumptions.map((c) => (
                        <li key={c} className="text-[12.5px] text-white leading-snug">
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </FormCard>
            )}
            <FormCard eyebrow="Summary">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[12px] text-white">Client</span>
                  <span className="text-[13px] font-medium text-white">{client}</span>
                </div>
                {clientEmail && (
                  <div className="flex justify-between items-center">
                    <span className="text-[12px] text-white">Email</span>
                    <span className="text-[12px] font-medium text-white">{clientEmail}</span>
                  </div>
                )}
                <div className="h-px bg-white/[0.06] my-3" />
                {labourTotal > 0 && (
                  <div className="flex justify-between">
                    <span className="text-[12px] text-white">
                      Labour ({labourItems.length} item{labourItems.length !== 1 ? 's' : ''})
                    </span>
                    <span className="text-[12px] text-white tabular-nums">
                      £{labourTotal.toFixed(2)}
                    </span>
                  </div>
                )}
                {materialsTotal > 0 && (
                  <div className="flex justify-between">
                    <span className="text-[12px] text-white">
                      Materials ({lineItems.length} item{lineItems.length !== 1 ? 's' : ''})
                    </span>
                    <span className="text-[12px] text-white tabular-nums">
                      £{materialsTotal.toFixed(2)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between pt-2 border-t border-white/[0.06]">
                  <span className="text-[12px] text-white">Subtotal</span>
                  <span className="text-[12px] text-white tabular-nums">
                    £{subtotal.toFixed(2)}
                  </span>
                </div>
                {reverseCharge ? (
                  <div className="flex justify-between">
                    <span className="text-[12px] text-white">VAT — reverse charge</span>
                    <span className="text-[12px] text-white tabular-nums">£0.00</span>
                  </div>
                ) : (
                  <div className="flex justify-between">
                    <span className="text-[12px] text-white">VAT ({vatRate}%)</span>
                    <span className="text-[12px] text-white tabular-nums">
                      £{vatAmount.toFixed(2)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between pt-2 border-t border-white/[0.06]">
                  <span className="text-[14px] font-semibold text-white">Total</span>
                  <span className="text-[22px] font-semibold text-elec-yellow tabular-nums">
                    £{total.toFixed(2)}
                  </span>
                </div>
                {cisAmount > 0 && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-[12px] text-white">
                        Less CIS ({cisRate}% of labour)
                      </span>
                      <span className="text-[12px] text-red-400 tabular-nums">
                        −£{cisAmount.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[13px] font-medium text-white">Amount payable</span>
                      <span className="text-[15px] font-semibold text-white tabular-nums">
                        £{amountDue.toFixed(2)}
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
            </FormCard>

            <FormCard eyebrow="Notes / terms">
              <Field label="Payment terms, conditions, special instructions">
                <Textarea
                  placeholder="Payment terms, conditions, special instructions..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className={`${textareaClass} min-h-[100px]`}
                />
              </Field>
            </FormCard>

            {labourItems.length > 0 && (
              <FormCard eyebrow="Labour breakdown">
                <div className="space-y-1.5">
                  {labourItems.map((item, idx) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center py-1.5 px-3 bg-[hsl(0_0%_9%)] border border-white/[0.06] rounded-lg"
                    >
                      <div className="flex-1 min-w-0">
                        <span className="text-[12px] text-white mr-2">{idx + 1}.</span>
                        <span className="text-[12.5px] text-white">{item.description}</span>
                        <span className="text-[11px] text-white ml-2">× {item.hours} hrs</span>
                        {item.source && <LineSourceTag source={item.source} className="ml-2" />}
                      </div>
                      <span className="text-[13px] font-medium text-white tabular-nums shrink-0">
                        £{item.total.toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </FormCard>
            )}

            {lineItems.length > 0 && (
              <FormCard eyebrow="Materials breakdown">
                <div className="space-y-1.5">
                  {lineItems.map((item, idx) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center py-1.5 px-3 bg-[hsl(0_0%_9%)] border border-white/[0.06] rounded-lg"
                    >
                      <div className="flex-1 min-w-0">
                        <span className="text-[12px] text-white mr-2">{idx + 1}.</span>
                        <span className="text-[12.5px] text-white">{item.description}</span>
                        <span className="text-[11px] text-white ml-2">× {item.quantity}</span>
                        {item.source && <LineSourceTag source={item.source} className="ml-2" />}
                      </div>
                      <span className="text-[13px] font-medium text-white tabular-nums shrink-0">
                        £{item.total.toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </FormCard>
            )}

            {labourItems.length === 0 && lineItems.length === 0 && (
              <div className="bg-white/[0.06] border border-amber-500/20 rounded-2xl px-4 py-3 text-center">
                <p className="text-[12.5px] text-amber-300">
                  Please add at least one labour or material item before saving.
                </p>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" hideCloseButton className="h-[85vh] p-0 overflow-hidden">
        <div className="flex flex-col h-full bg-[hsl(0_0%_8%)]">
          <div className="flex justify-center pt-2.5 pb-1 flex-shrink-0">
            <div className="h-1 w-10 rounded-full bg-white/20" />
          </div>

          <div className="flex-shrink-0 border-b border-white/[0.06] px-5 pb-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <button
                  type="button"
                  onClick={() => onOpenChange(false)}
                  className="h-9 w-9 rounded-full bg-white/[0.04] border border-white/[0.08] text-white flex items-center justify-center hover:bg-white/[0.08] transition-colors"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
                <div className="min-w-0">
                  <Eyebrow>{isEdit ? (aiStamp ? 'AI draft' : 'Edit quote') : 'New quote'}</Eyebrow>
                  <div className="mt-1 text-[18px] font-semibold text-white leading-tight truncate">
                    {quoteNumber || 'Draft quote'}
                  </div>
                </div>
              </div>
              <div className="text-right shrink-0">
                <span className="text-[12px] font-medium text-white">{currentStepLabel}</span>
                <IOSStepIndicator steps={4} currentStep={step - 1} className="mt-1" />
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto overscroll-contain">
            <div className="px-5 py-5 pb-32 space-y-4">
              {renderStepContent()}
              <NavigationButtons />
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 px-5 py-4 border-t border-white/[0.06] bg-[hsl(0_0%_8%)]/95 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] text-white uppercase tracking-[0.14em] font-medium block">
                  Quote total
                </span>
                <span className="text-[11px] text-white">
                  {labourItems.length + lineItems.length} item
                  {labourItems.length + lineItems.length !== 1 ? 's' : ''}
                </span>
              </div>
              <span className="text-[26px] font-semibold text-elec-yellow tabular-nums">
                £{total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </SheetContent>
      <PriceBookPicker open={pickerOpen} onOpenChange={setPickerOpen} mode="sell" onAdd={addPicked} />
    </Sheet>
  );
}
