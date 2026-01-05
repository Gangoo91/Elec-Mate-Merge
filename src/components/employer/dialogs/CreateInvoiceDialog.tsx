import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Plus, 
  Trash2, 
  FileText,
  Calculator,
  ChevronLeft,
  ChevronRight,
  Send
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
  const [newItem, setNewItem] = useState({ description: "", quantity: 1, unit: "each", unitPrice: 0 });

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
    const item: LineItem = {
      id: crypto.randomUUID(),
      description: newItem.description,
      quantity: newItem.quantity,
      unit: newItem.unit,
      unitPrice: newItem.unitPrice,
      total: newItem.quantity * newItem.unitPrice
    };
    setLineItems([...lineItems, item]);
    setNewItem({ description: "", quantity: 1, unit: "each", unitPrice: 0 });
  };

  const removeLineItem = (id: string) => {
    setLineItems(lineItems.filter(item => item.id !== id));
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
  };

  const canProceed = () => {
    switch (step) {
      case 1: return client.trim().length > 0;
      case 2: return lineItems.length > 0;
      case 3: return true;
      default: return false;
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[95vh] p-0">
        <div className="flex flex-col h-full">
          {/* Header */}
          <SheetHeader className="px-4 py-3 border-b border-border">
            <div className="flex items-center justify-between">
              <div>
                <SheetTitle className="text-lg">New Invoice</SheetTitle>
                <SheetDescription className="text-xs">{invoiceNumber}</SheetDescription>
              </div>
              <div className="flex gap-1">
                {[1, 2, 3].map((s) => (
                  <div 
                    key={s} 
                    className={`w-8 h-1 rounded-full ${s <= step ? 'bg-elec-yellow' : 'bg-muted'}`} 
                  />
                ))}
              </div>
            </div>
          </SheetHeader>

          {/* Content */}
          <ScrollArea className="flex-1 px-4 py-4">
            {step === 1 && (
              <div className="space-y-4">
                {/* Create from Quote */}
                {approvedQuotes.length > 0 && (
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Create from Approved Quote
                    </Label>
                    <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
                      {approvedQuotes.map((quote) => (
                        <Badge
                          key={quote.id}
                          variant={selectedQuoteId === quote.id ? "default" : "outline"}
                          className="shrink-0 cursor-pointer touch-feedback"
                          onClick={() => loadFromQuote(quote.id)}
                        >
                          {quote.quote_number} - {quote.client}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label>Client Name *</Label>
                  <Input
                    placeholder="Enter client name"
                    value={client}
                    onChange={(e) => setClient(e.target.value)}
                    className="text-base"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Project / Reference</Label>
                  <Input
                    placeholder="Project name or reference"
                    value={project}
                    onChange={(e) => setProject(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Payment Terms</Label>
                    <Select value={paymentTerms} onValueChange={setPaymentTerms}>
                      <SelectTrigger>
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
                    <Label>VAT Rate</Label>
                    <Select value={vatRate} onValueChange={setVatRate}>
                      <SelectTrigger>
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
              <div className="space-y-4">
                {/* Line Items */}
                {lineItems.length > 0 && (
                  <div className="space-y-2">
                    {lineItems.map((item) => (
                      <Card key={item.id} className="bg-elec-gray">
                        <CardContent className="p-3">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-sm truncate">{item.description}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <Input
                                  type="number"
                                  value={item.quantity}
                                  onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                                  className="w-16 h-8 text-sm"
                                  min={1}
                                />
                                <span className="text-xs text-muted-foreground">{item.unit}</span>
                                <span className="text-xs text-muted-foreground">× £{item.unitPrice.toFixed(2)}</span>
                              </div>
                            </div>
                            <div className="text-right shrink-0">
                              <p className="font-bold text-elec-yellow">£{item.total.toFixed(2)}</p>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-6 w-6 p-0 mt-1"
                                onClick={() => removeLineItem(item.id)}
                              >
                                <Trash2 className="h-3 w-3 text-destructive" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}

                {/* Custom Item */}
                <Card className="bg-muted/30">
                  <CardContent className="p-3 space-y-3">
                    <Label className="text-sm">Add Line Item</Label>
                    <Input
                      placeholder="Description"
                      value={newItem.description}
                      onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                    />
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <Label className="text-xs">Qty</Label>
                        <Input
                          type="number"
                          value={newItem.quantity}
                          onChange={(e) => setNewItem({ ...newItem, quantity: Number(e.target.value) })}
                          min={1}
                        />
                      </div>
                      <div>
                        <Label className="text-xs">Unit</Label>
                        <Select 
                          value={newItem.unit} 
                          onValueChange={(v) => setNewItem({ ...newItem, unit: v })}
                        >
                          <SelectTrigger>
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
                      <div>
                        <Label className="text-xs">Price</Label>
                        <Input
                          type="number"
                          value={newItem.unitPrice}
                          onChange={(e) => setNewItem({ ...newItem, unitPrice: Number(e.target.value) })}
                          min={0}
                          step={0.01}
                        />
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={addLineItem}
                      disabled={!newItem.description}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Item
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                {/* Summary */}
                <Card className="bg-elec-gray">
                  <CardContent className="p-4 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Client</span>
                      <span className="font-medium">{client}</span>
                    </div>
                    {project && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Project</span>
                        <span className="font-medium">{project}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Payment Terms</span>
                      <span className="font-medium">
                        {paymentTerms === "0" ? "Due on Receipt" : `Net ${paymentTerms}`}
                      </span>
                    </div>
                    <div className="border-t border-border pt-3 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span>£{subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">VAT ({vatRate}%)</span>
                        <span>£{vatAmount.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-lg font-bold pt-2 border-t border-border">
                        <span>Total Due</span>
                        <span className="text-elec-yellow">£{total.toFixed(2)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Notes */}
                <div className="space-y-2">
                  <Label>Notes / Payment Details</Label>
                  <Textarea
                    placeholder="Bank details, payment instructions, etc."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="min-h-[80px]"
                  />
                </div>

                {/* Line Items Preview */}
                <div className="space-y-2">
                  <Label>Line Items</Label>
                  {lineItems.map((item, idx) => (
                    <div key={item.id} className="flex justify-between text-sm py-1 border-b border-border/50">
                      <span className="text-muted-foreground">{idx + 1}. {item.description}</span>
                      <span>£{item.total.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </ScrollArea>

          {/* Totals Bar */}
          <div className="px-4 py-2 border-t border-border bg-muted/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calculator className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Total Due</span>
              </div>
              <span className="text-xl font-bold text-elec-yellow">£{total.toFixed(2)}</span>
            </div>
          </div>

          {/* Footer */}
          <SheetFooter className="px-4 py-3 border-t border-border pb-safe">
            <div className="flex gap-2 w-full">
              {step > 1 && (
                <Button variant="outline" onClick={() => setStep(step - 1)} className="flex-1">
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Back
                </Button>
              )}
              {step < 3 ? (
                <Button 
                  onClick={() => setStep(step + 1)} 
                  disabled={!canProceed()}
                  className="flex-1"
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              ) : (
                <>
                  <Button 
                    variant="outline"
                    onClick={() => handleSubmit(false)} 
                    disabled={createInvoiceMutation.isPending}
                    className="flex-1"
                  >
                    Save Draft
                  </Button>
                  <Button 
                    onClick={() => handleSubmit(true)} 
                    disabled={createInvoiceMutation.isPending}
                    className="flex-1"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Send Invoice
                  </Button>
                </>
              )}
            </div>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
}
