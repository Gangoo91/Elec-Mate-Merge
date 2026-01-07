import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { IOSStepIndicator } from "@/components/ui/ios-step-indicator";
import {
  Plus,
  Trash2,
  FileText,
  Calculator,
  ChevronLeft,
  ChevronRight,
  Send,
  X
} from "lucide-react";
import { useCreateInvoice, useNextInvoiceNumber, useQuotes } from "@/hooks/useFinance";
import type { Quote } from "@/services/financeService";
import { useOptionalVoiceFormContext } from "@/contexts/VoiceFormContext";

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
  const [client, setClient] = useState("");
  const [project, setProject] = useState("");
  const [paymentTerms, setPaymentTerms] = useState("30");
  const [vatRate, setVatRate] = useState("20");
  const [notes, setNotes] = useState("");
  const [lineItems, setLineItems] = useState<LineItem[]>([]);
  const [selectedQuoteId, setSelectedQuoteId] = useState<string | null>(null);
  // Use strings for inputs to allow empty fields and smooth typing
  const [newItem, setNewItem] = useState({ description: "", quantity: "", unit: "each", unitPrice: "" });
  // Track string values for existing line item quantities
  const [itemQuantityInputs, setItemQuantityInputs] = useState<Record<string, string>>({});

  const { data: invoiceNumber } = useNextInvoiceNumber();
  const { data: quotes = [] } = useQuotes();
  const createInvoiceMutation = useCreateInvoice();

  const approvedQuotes = quotes.filter(q => q.status === "Approved");

  useEffect(() => {
    if (fromQuote) {
      setClient(fromQuote.client);
      setProject(fromQuote.description || "");
      setSelectedQuoteId(fromQuote.id);
      if (Array.isArray(fromQuote.line_items)) {
        setLineItems(fromQuote.line_items.map((item: any) => ({
          id: crypto.randomUUID(),
          description: item.description,
          quantity: item.quantity,
          unit: item.unit,
          unitPrice: item.unitPrice,
          total: item.total
        })));
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
          case 'client': setClient(strValue); break;
          case 'project': setProject(strValue); break;
          case 'paymentTerms': setPaymentTerms(strValue); break;
          case 'vatRate': setVatRate(strValue); break;
          case 'notes': setNotes(strValue); break;
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
            total: (Number(params.quantity) || 1) * (Number(params.price) || 0)
          };
          setLineItems(prev => [...prev, item]);
        }
        if (action === 'next_step') setStep(prev => Math.min(prev + 1, 3));
        if (action === 'previous_step') setStep(prev => Math.max(prev - 1, 1));
      },
      onSubmit: () => handleSubmit(false),
      onCancel: () => { resetForm(); onOpenChange(false); },
      onNextStep: () => setStep(prev => Math.min(prev + 1, 3)),
    });
    
    return () => voiceContext.unregisterForm('create-invoice');
  }, [open, voiceContext]);

  const loadFromQuote = (quoteId: string) => {
    const quote = quotes.find(q => q.id === quoteId);
    if (quote) {
      setClient(quote.client);
      setProject(quote.description || "");
      setSelectedQuoteId(quote.id);
      if (Array.isArray(quote.line_items)) {
        setLineItems(quote.line_items.map((item: any) => ({
          id: crypto.randomUUID(),
          description: item.description,
          quantity: item.quantity,
          unit: item.unit,
          unitPrice: item.unitPrice,
          total: item.total
        })));
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
      total: qty * price
    };
    setLineItems([...lineItems, item]);
    setNewItem({ description: "", quantity: "", unit: "each", unitPrice: "" });
  };

  const removeLineItem = (id: string) => {
    setLineItems(lineItems.filter(item => item.id !== id));
    setItemQuantityInputs(prev => {
      const { [id]: _, ...rest } = prev;
      return rest;
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    setLineItems(lineItems.map(item =>
      item.id === id
        ? { ...item, quantity, total: quantity * item.unitPrice }
        : item
    ));
  };

  const handleSubmit = async (sendImmediately: boolean) => {
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + Number(paymentTerms));

    await createInvoiceMutation.mutateAsync({
      invoice_number: invoiceNumber || `INV-${new Date().getFullYear()}-001`,
      client,
      project,
      amount: total,
      status: sendImmediately ? "Pending" : "Draft",
      due_date: dueDate.toISOString().split('T')[0],
      paid_date: null,
      job_id: null,
      quote_id: selectedQuoteId,
      line_items: lineItems,
      notes
    });

    resetForm();
    onOpenChange(false);
  };

  const resetForm = () => {
    setStep(1);
    setClient("");
    setProject("");
    setPaymentTerms("30");
    setVatRate("20");
    setNotes("");
    setLineItems([]);
    setSelectedQuoteId(null);
    setNewItem({ description: "", quantity: "", unit: "each", unitPrice: "" });
    setItemQuantityInputs({});
  };

  const canProceed = () => {
    switch (step) {
      case 1: return client.trim().length > 0;
      case 2: return lineItems.length > 0;
      case 3: return true;
      default: return false;
    }
  };

  // Step labels for display
  const stepLabels = ["Client", "Items", "Review"];
  const currentStepLabel = stepLabels[step - 1];

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[95vh] p-0 rounded-t-3xl">
        <div className="flex flex-col h-full">
          {/* Native Header with drag indicator */}
          <div className="pt-2 pb-1 flex justify-center">
            <div className="w-10 h-1 rounded-full bg-muted-foreground/30" />
          </div>

          <SheetHeader className="px-4 pb-4 border-b border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-full"
                  onClick={() => onOpenChange(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
                <div>
                  <SheetTitle className="text-lg font-semibold">New Invoice</SheetTitle>
                  <SheetDescription className="text-xs font-mono text-muted-foreground">{invoiceNumber}</SheetDescription>
                </div>
              </div>
              <div className="text-right">
                <span className="text-sm font-medium text-muted-foreground">{currentStepLabel}</span>
                <IOSStepIndicator steps={3} currentStep={step - 1} className="mt-1" />
              </div>
            </div>
          </SheetHeader>

          {/* Content */}
          <ScrollArea className="flex-1 px-4">
            <div className="py-6 pb-48">
            {step === 1 && (
              <div className="space-y-5">
                {/* Create from Quote */}
                {approvedQuotes.length > 0 && (
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2 text-sm font-medium">
                      <FileText className="h-4 w-4" />
                      Create from Approved Quote
                    </Label>
                    <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar -mx-1 px-1">
                      {approvedQuotes.map((quote) => (
                        <Badge
                          key={quote.id}
                          variant={selectedQuoteId === quote.id ? "default" : "outline"}
                          className="shrink-0 cursor-pointer active:scale-95 transition-transform min-h-[44px] flex items-center px-4"
                          onClick={() => loadFromQuote(quote.id)}
                        >
                          {quote.quote_number} - {quote.client}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Client Name <span className="text-destructive">*</span></Label>
                  <Input
                    placeholder="Enter client name"
                    value={client}
                    onChange={(e) => setClient(e.target.value)}
                    className="h-14 text-base"
                    autoComplete="off"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Project / Reference</Label>
                  <Input
                    placeholder="Project name or reference"
                    value={project}
                    onChange={(e) => setProject(e.target.value)}
                    className="h-14 text-base"
                    autoComplete="off"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Payment Terms</Label>
                    <Select value={paymentTerms} onValueChange={setPaymentTerms}>
                      <SelectTrigger className="h-14 text-base">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">Due on Receipt</SelectItem>
                        <SelectItem value="7">Net 7</SelectItem>
                        <SelectItem value="14">Net 14</SelectItem>
                        <SelectItem value="30">Net 30</SelectItem>
                        <SelectItem value="60">Net 60</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">VAT Rate</Label>
                    <Select value={vatRate} onValueChange={setVatRate}>
                      <SelectTrigger className="h-14 text-base">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">0% (Exempt)</SelectItem>
                        <SelectItem value="5">5% (Reduced)</SelectItem>
                        <SelectItem value="20">20% (Standard)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-5">
                {/* Line Items */}
                {lineItems.length > 0 && (
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">Line Items Added</Label>
                    {lineItems.map((item) => (
                      <Card key={item.id} className="bg-elec-gray border-border">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-base truncate">{item.description}</p>
                              <div className="flex items-center gap-3 mt-2">
                                <Input
                                  type="text"
                                  inputMode="decimal"
                                  value={itemQuantityInputs[item.id] ?? String(item.quantity)}
                                  onChange={(e) => setItemQuantityInputs(prev => ({ ...prev, [item.id]: e.target.value }))}
                                  onBlur={(e) => {
                                    const val = Number(e.target.value) || 1;
                                    updateQuantity(item.id, val);
                                    setItemQuantityInputs(prev => ({ ...prev, [item.id]: String(val) }));
                                  }}
                                  className="w-20 h-12 text-base text-center"
                                />
                                <span className="text-sm text-muted-foreground">{item.unit}</span>
                                <span className="text-sm text-muted-foreground">× £{item.unitPrice.toFixed(2)}</span>
                              </div>
                            </div>
                            <div className="text-right shrink-0">
                              <p className="text-lg font-bold text-elec-yellow">£{item.total.toFixed(2)}</p>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-10 w-10 p-0 mt-1"
                                onClick={() => removeLineItem(item.id)}
                              >
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}

                {/* Custom Item */}
                <Card className="bg-muted/30 border-dashed">
                  <CardContent className="p-4 space-y-4">
                    <Label className="text-sm font-medium">Add Line Item</Label>
                    <Input
                      placeholder="Item description"
                      value={newItem.description}
                      onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                      className="h-14 text-base"
                      autoComplete="off"
                    />
                    <div className="grid grid-cols-3 gap-3">
                      <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground">Qty</Label>
                        <Input
                          type="text"
                          inputMode="decimal"
                          placeholder="1"
                          value={newItem.quantity}
                          onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
                          className="h-12 text-base text-center"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground">Unit</Label>
                        <Select
                          value={newItem.unit}
                          onValueChange={(v) => setNewItem({ ...newItem, unit: v })}
                        >
                          <SelectTrigger className="h-12 text-base">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="each">each</SelectItem>
                            <SelectItem value="m">m</SelectItem>
                            <SelectItem value="m²">m²</SelectItem>
                            <SelectItem value="hour">hour</SelectItem>
                            <SelectItem value="day">day</SelectItem>
                            <SelectItem value="job">job</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground">Price £</Label>
                        <Input
                          type="text"
                          inputMode="decimal"
                          placeholder="0"
                          value={newItem.unitPrice}
                          onChange={(e) => setNewItem({ ...newItem, unitPrice: e.target.value })}
                          className="h-12 text-base text-center"
                        />
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full h-12"
                      onClick={addLineItem}
                      disabled={!newItem.description}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Item
                    </Button>
                  </CardContent>
                </Card>

                {lineItems.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-2">
                    Add at least one line item to continue.
                  </p>
                )}
              </div>
            )}

            {step === 3 && (
              <div className="space-y-5">
                {/* Summary */}
                <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-elec-yellow/20">
                  <CardContent className="p-4 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Client</span>
                      <span className="font-medium">{client}</span>
                    </div>
                    {project && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Project</span>
                        <span className="font-medium text-sm">{project}</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Payment Terms</span>
                      <span className="font-medium">
                        {paymentTerms === "0" ? "Due on Receipt" : `Net ${paymentTerms}`}
                      </span>
                    </div>
                    <div className="border-t border-border pt-4 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Subtotal</span>
                        <span className="text-sm">£{subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">VAT ({vatRate}%)</span>
                        <span className="text-sm">£{vatAmount.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-border">
                        <span className="text-lg font-bold">Total Due</span>
                        <span className="text-2xl font-bold text-elec-yellow tabular-nums">£{total.toFixed(2)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Notes */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Notes / Payment Details</Label>
                  <Textarea
                    placeholder="Bank details, payment instructions, etc."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="min-h-[100px] text-base"
                  />
                </div>

                {/* Line Items Preview */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Line Items</Label>
                  <div className="space-y-2">
                    {lineItems.map((item, idx) => (
                      <div key={item.id} className="flex justify-between items-center py-2 px-3 bg-muted/30 rounded-lg">
                        <div className="flex-1 min-w-0">
                          <span className="text-sm text-muted-foreground mr-2">{idx + 1}.</span>
                          <span className="text-sm">{item.description}</span>
                          <span className="text-xs text-muted-foreground ml-2">× {item.quantity}</span>
                        </div>
                        <span className="font-medium shrink-0">£{item.total.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            </div>
          </ScrollArea>

          {/* Fixed Bottom Bar with Totals and Actions */}
          <div className="absolute bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border">
            {/* Totals Row */}
            <div className="px-4 py-3 border-b border-border/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calculator className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Total Due</span>
                </div>
                <span className="text-xl font-bold text-elec-yellow tabular-nums">£{total.toFixed(2)}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="px-4 py-3 pb-safe">
              <div className="flex gap-3 w-full">
                {step > 1 ? (
                  <Button variant="outline" onClick={() => setStep(step - 1)} className="flex-1 h-12">
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Back
                  </Button>
                ) : (
                  <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1 h-12">
                    Cancel
                  </Button>
                )}
                {step < 3 ? (
                  <Button
                    onClick={() => setStep(step + 1)}
                    disabled={!canProceed()}
                    className="flex-1 h-12"
                  >
                    Next
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                ) : (
                  <div className="flex gap-2 flex-1">
                    <Button
                      variant="outline"
                      onClick={() => handleSubmit(false)}
                      disabled={createInvoiceMutation.isPending}
                      className="flex-1 h-12"
                    >
                      Save Draft
                    </Button>
                    <Button
                      onClick={() => handleSubmit(true)}
                      disabled={createInvoiceMutation.isPending}
                      className="flex-1 h-12"
                    >
                      <Send className="h-4 w-4 mr-1" />
                      Send
                    </Button>
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
