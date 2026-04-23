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
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { IOSStepIndicator } from '@/components/ui/ios-step-indicator';
import {
  Plus,
  Trash2,
  FileText,
  Calculator,
  ChevronLeft,
  ChevronRight,
  Send,
  X,
} from 'lucide-react';
import { useCreateInvoice, useNextInvoiceNumber, useQuotes } from '@/hooks/useFinance';
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
  selectTriggerClass,
  selectContentClass,
  textareaClass,
  fieldLabelClass,
  Eyebrow,
} from '@/components/employer/editorial';

interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  total: number;
}

interface CreateInvoiceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  fromQuote?: Quote;
}

export function CreateInvoiceDialog({ open, onOpenChange, fromQuote }: CreateInvoiceDialogProps) {
  const [step, setStep] = useState(1);
  const [client, setClient] = useState('');
  const [project, setProject] = useState('');
  const [paymentTerms, setPaymentTerms] = useState('30');
  const [vatRate, setVatRate] = useState('20');
  const [notes, setNotes] = useState('');
  const [lineItems, setLineItems] = useState<LineItem[]>([]);
  const [selectedQuoteId, setSelectedQuoteId] = useState<string | null>(null);
  const [newItem, setNewItem] = useState({
    description: '',
    quantity: '',
    unit: 'each',
    unitPrice: '',
  });
  const [itemQuantityInputs, setItemQuantityInputs] = useState<Record<string, string>>({});

  const { data: invoiceNumber } = useNextInvoiceNumber();
  const { data: quotes = [] } = useQuotes();
  const createInvoiceMutation = useCreateInvoice();

  const approvedQuotes = quotes.filter((q) => q.status === 'Approved');

  useEffect(() => {
    if (fromQuote) {
      setClient(fromQuote.client);
      setProject(fromQuote.description || '');
      setSelectedQuoteId(fromQuote.id);
      if (Array.isArray(fromQuote.line_items)) {
        setLineItems(
          fromQuote.line_items.map((item: any) => ({
            id: crypto.randomUUID(),
            description: item.description,
            quantity: item.quantity,
            unit: item.unit,
            unitPrice: item.unitPrice,
            total: item.total,
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
      setProject(quote.description || '');
      setSelectedQuoteId(quote.id);
      if (Array.isArray(quote.line_items)) {
        setLineItems(
          quote.line_items.map((item: any) => ({
            id: crypto.randomUUID(),
            description: item.description,
            quantity: item.quantity,
            unit: item.unit,
            unitPrice: item.unitPrice,
            total: item.total,
          }))
        );
      }
    }
  };

  const subtotal = lineItems.reduce((sum, item) => sum + item.total, 0);
  const vatAmount = subtotal * (Number(vatRate) / 100);
  const total = subtotal + vatAmount;

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

    await createInvoiceMutation.mutateAsync({
      invoice_number: invoiceNumber || `INV-${new Date().getFullYear()}-001`,
      client,
      project,
      amount: total,
      status: sendImmediately ? 'Pending' : 'Draft',
      due_date: dueDate.toISOString().split('T')[0],
      paid_date: null,
      job_id: null,
      quote_id: selectedQuoteId,
      line_items: lineItems,
      notes,
    });

    resetForm();
    onOpenChange(false);
  };

  const resetForm = () => {
    setStep(1);
    setClient('');
    setProject('');
    setPaymentTerms('30');
    setVatRate('20');
    setNotes('');
    setLineItems([]);
    setSelectedQuoteId(null);
    setNewItem({ description: '', quantity: '', unit: 'each', unitPrice: '' });
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
      <SheetContent side="bottom" className="h-[95vh] p-0 rounded-t-3xl bg-[hsl(0_0%_8%)] border-white/[0.08]">
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
                    {invoiceNumber}
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
          <ScrollArea className="flex-1 px-4">
            <div className="py-6 pb-48">
              {step === 1 && (
                <div className="space-y-4">
                  {approvedQuotes.length > 0 && (
                    <div className="space-y-2">
                      <label className={cn(fieldLabelClass, 'flex items-center gap-2')}>
                        <FileText className="h-4 w-4" />
                        Create from Approved Quote
                      </label>
                      <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar -mx-1 px-1">
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

                  <FormCard eyebrow="Client details">
                    <Field label="Client name" required>
                      <Input
                        placeholder="Enter client name"
                        value={client}
                        onChange={(e) => setClient(e.target.value)}
                        className={inputClass}
                        autoComplete="off"
                      />
                    </Field>
                    <Field label="Project / reference">
                      <Input
                        placeholder="Project name or reference"
                        value={project}
                        onChange={(e) => setProject(e.target.value)}
                        className={inputClass}
                        autoComplete="off"
                      />
                    </Field>
                    <FormGrid cols={2}>
                      <Field label="Payment terms">
                        <Select value={paymentTerms} onValueChange={setPaymentTerms}>
                          <SelectTrigger className={selectTriggerClass}>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className={selectContentClass}>
                            <SelectItem value="0">Due on Receipt</SelectItem>
                            <SelectItem value="7">Net 7</SelectItem>
                            <SelectItem value="14">Net 14</SelectItem>
                            <SelectItem value="30">Net 30</SelectItem>
                            <SelectItem value="60">Net 60</SelectItem>
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
              )}

              {step === 2 && (
                <div className="space-y-4">
                  {lineItems.length > 0 && (
                    <FormCard eyebrow="Line items added">
                      <div className="space-y-2">
                        {lineItems.map((item) => (
                          <div
                            key={item.id}
                            className="rounded-xl bg-[hsl(0_0%_10%)] border border-white/[0.08] p-4"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-[13px] text-white truncate">
                                  {item.description}
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
                                    className={cn(inputClass, 'w-20 h-10 text-center')}
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
                      autoComplete="off"
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
                          className={cn(inputClass, 'text-center')}
                        />
                      </Field>
                    </div>
                    <SecondaryButton onClick={addLineItem} disabled={!newItem.description} fullWidth>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Item
                    </SecondaryButton>
                  </div>

                  {lineItems.length === 0 && (
                    <p className="text-[12.5px] text-white text-center py-2">
                      Add at least one line item to continue.
                    </p>
                  )}
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <div className="rounded-2xl bg-elec-yellow/10 border border-elec-yellow/30 p-4 space-y-4">
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
                      <div className="flex justify-between">
                        <span className="text-[12.5px] text-white">VAT ({vatRate}%)</span>
                        <span className="text-[12.5px] text-white tabular-nums">
                          £{vatAmount.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-white/[0.1]">
                        <span className="text-lg font-bold text-white">Total Due</span>
                        <span className="text-2xl font-bold text-elec-yellow tabular-nums">
                          £{total.toFixed(2)}
                        </span>
                      </div>
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

                  <FormCard eyebrow="Line items">
                    <div className="space-y-2">
                      {lineItems.map((item, idx) => (
                        <div
                          key={item.id}
                          className="flex justify-between items-center py-2 px-3 bg-[hsl(0_0%_10%)] border border-white/[0.06] rounded-xl"
                        >
                          <div className="flex-1 min-w-0">
                            <span className="text-[12.5px] text-white mr-2">{idx + 1}.</span>
                            <span className="text-[12.5px] text-white">{item.description}</span>
                            <span className="text-[11px] text-white ml-2">
                              × {item.quantity}
                            </span>
                          </div>
                          <span className="font-medium text-white shrink-0 tabular-nums">
                            £{item.total.toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </FormCard>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Fixed Bottom Bar with Totals and Actions */}
          <div className="absolute bottom-0 left-0 right-0 bg-[hsl(0_0%_8%)] border-t border-white/[0.06]">
            <div className="px-4 py-3 border-b border-white/[0.06]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calculator className="h-4 w-4 text-white" />
                  <span className="text-[12.5px] text-white">Total Due</span>
                </div>
                <span className="text-xl font-bold text-elec-yellow tabular-nums">
                  £{total.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="px-4 py-3 pb-safe">
              <div className="flex gap-3 w-full">
                {step > 1 ? (
                  <SecondaryButton onClick={() => setStep(step - 1)} fullWidth>
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Back
                  </SecondaryButton>
                ) : (
                  <SecondaryButton onClick={() => onOpenChange(false)} fullWidth>
                    Cancel
                  </SecondaryButton>
                )}
                {step < 3 ? (
                  <PrimaryButton
                    onClick={() => setStep(step + 1)}
                    disabled={!canProceed()}
                    fullWidth
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
                    >
                      Save Draft
                    </SecondaryButton>
                    <PrimaryButton
                      onClick={() => handleSubmit(true)}
                      disabled={createInvoiceMutation.isPending}
                      fullWidth
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
