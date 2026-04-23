import { useState, useEffect } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
import { useCreateQuote, useNextQuoteNumber, usePriceBook } from '@/hooks/useFinance';
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
  selectTriggerClass,
  selectContentClass,
} from '@/components/employer/editorial';

interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  total: number;
}

interface LabourItem {
  id: string;
  description: string;
  hours: number;
  hourlyRate: number;
  total: number;
}

interface CreateQuoteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  prefillClient?: string;
  prefillAmount?: number;
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
  prefillAmount,
}: CreateQuoteDialogProps) {
  const [step, setStep] = useState(1);
  const [client, setClient] = useState(prefillClient || '');
  const [clientAddress, setClientAddress] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [description, setDescription] = useState('');
  const [validityDays, setValidityDays] = useState('30');
  const [vatRate, setVatRate] = useState('20');
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

  const { data: quoteNumber } = useNextQuoteNumber();
  const { data: priceBook = [] } = usePriceBook();
  const createQuoteMutation = useCreateQuote();

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
    } catch (err: any) {
      console.error('Error expanding description:', err);
      toast.error(err.message || 'Failed to expand description');
    } finally {
      setIsExpandingDescription(false);
    }
  };

  useEffect(() => {
    if (prefillClient) setClient(prefillClient);
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
  }, [prefillClient, prefillAmount]);

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
  const subtotal = labourTotal + materialsTotal;
  const vatAmount = subtotal * (Number(vatRate) / 100);
  const total = subtotal + vatAmount;

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

  const addFromPriceBook = (item: any) => {
    const lineItem: LineItem = {
      id: crypto.randomUUID(),
      description: item.name,
      quantity: 1,
      unit: item.unit,
      unitPrice: Number(item.sell_price),
      total: Number(item.sell_price),
    };
    setLineItems([...lineItems, lineItem]);
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
        type: 'labour',
      })),
      ...lineItems.map((item) => ({
        ...item,
        type: 'material',
      })),
    ];

    await createQuoteMutation.mutateAsync({
      quote_number: quoteNumber || `Q-${new Date().getFullYear()}-001`,
      client,
      client_address: clientAddress || null,
      client_email: clientEmail || null,
      client_phone: clientPhone || null,
      job_title: jobTitle || null,
      description,
      value: total,
      status: sendImmediately ? 'Sent' : 'Draft',
      sent_date: sendImmediately ? new Date().toISOString().split('T')[0] : null,
      valid_until: validUntil.toISOString().split('T')[0],
      job_id: null,
      created_by: 'Admin',
      line_items: allLineItems,
      notes,
    } as any);

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
    setNotes('');
    setLineItems([]);
    setLabourItems([]);
    setItemQuantityInputs({});
    setLabourHoursInputs({});
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
            disabled={createQuoteMutation.isPending || !canProceed()}
            fullWidth
            size="lg"
          >
            Save draft
          </SecondaryButton>
          <PrimaryButton
            onClick={() => handleSubmit(true)}
            disabled={createQuoteMutation.isPending || !canProceed()}
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
                  autoComplete="off"
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
                    autoComplete="off"
                  />
                </Field>
                <Field label="Client phone">
                  <Input
                    type="tel"
                    placeholder="+44 7700 900000"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    className={inputClass}
                    autoComplete="off"
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
                  autoComplete="off"
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
                  <Select value={validityDays} onValueChange={setValidityDays}>
                    <SelectTrigger className={selectTriggerClass}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className={selectContentClass}>
                      <SelectItem value="14">14 days</SelectItem>
                      <SelectItem value="30">30 days</SelectItem>
                      <SelectItem value="60">60 days</SelectItem>
                      <SelectItem value="90">90 days</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="VAT rate">
                  <Select value={vatRate} onValueChange={setVatRate}>
                    <SelectTrigger className={selectTriggerClass}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className={selectContentClass}>
                      <SelectItem value="0">0% (Exempt)</SelectItem>
                      <SelectItem value="5">5% (Reduced)</SelectItem>
                      <SelectItem value="20">20% (Standard)</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
              </FormGrid>
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
                            className={`${inputClass} w-20 h-10 text-center`}
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
                    className="group relative bg-[hsl(0_0%_9%)] border border-white/[0.06] rounded-xl p-3 text-center hover:border-elec-yellow/40 hover:bg-[hsl(0_0%_11%)] active:scale-[0.98] transition-all touch-manipulation"
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
                  autoComplete="off"
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
                            className={`${inputClass} w-20 h-10 text-center`}
                          />
                          <span className="text-[12px] text-white">{item.unit}</span>
                          <span className="text-[12px] text-white">
                            × £{item.unitPrice.toFixed(2)}
                          </span>
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

            {priceBook.length > 0 && (
              <FormCard eyebrow="Quick add from price book">
                <div className="grid grid-cols-2 gap-2">
                  {priceBook.slice(0, 6).map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => addFromPriceBook(item)}
                      className="group relative bg-[hsl(0_0%_9%)] border border-white/[0.06] rounded-xl p-3 text-center hover:border-elec-yellow/40 hover:bg-[hsl(0_0%_11%)] active:scale-[0.98] transition-all touch-manipulation"
                    >
                      <Plus className="h-4 w-4 mx-auto text-elec-yellow mb-1" />
                      <p className="text-[12.5px] font-medium text-white truncate">{item.name}</p>
                      <p className="text-[11px] text-elec-yellow font-medium">
                        £{Number(item.sell_price).toFixed(2)}
                      </p>
                    </button>
                  ))}
                </div>
              </FormCard>
            )}

            <FormCard eyebrow="Custom material">
              <Field label="Description">
                <Input
                  placeholder="Item description"
                  value={newItem.description}
                  onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                  className={inputClass}
                  autoComplete="off"
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
                  <Select
                    value={newItem.unit}
                    onValueChange={(v) => setNewItem({ ...newItem, unit: v })}
                  >
                    <SelectTrigger className={selectTriggerClass}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className={selectContentClass}>
                      <SelectItem value="each">each</SelectItem>
                      <SelectItem value="m">m</SelectItem>
                      <SelectItem value="m²">m²</SelectItem>
                      <SelectItem value="hour">hour</SelectItem>
                      <SelectItem value="day">day</SelectItem>
                      <SelectItem value="job">job</SelectItem>
                    </SelectContent>
                  </Select>
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
                <div className="flex justify-between">
                  <span className="text-[12px] text-white">VAT ({vatRate}%)</span>
                  <span className="text-[12px] text-white tabular-nums">
                    £{vatAmount.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-white/[0.06]">
                  <span className="text-[14px] font-semibold text-white">Total</span>
                  <span className="text-[22px] font-semibold text-elec-yellow tabular-nums">
                    £{total.toFixed(2)}
                  </span>
                </div>
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
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl px-4 py-3 text-center">
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
      <SheetContent side="bottom" className="h-[95vh] p-0 overflow-hidden">
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
                  <Eyebrow>New quote</Eyebrow>
                  <div className="mt-1 text-[18px] font-semibold text-white leading-tight truncate">
                    {quoteNumber ?? 'Draft quote'}
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
    </Sheet>
  );
}
