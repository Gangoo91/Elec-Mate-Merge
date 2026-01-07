import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { 
  Plus, 
  Trash2, 
  Package, 
  User,
  FileCheck,
  ChevronLeft,
  ChevronRight,
  Send,
  CheckCircle2,
  Clock,
  Sparkles,
  Loader2
} from "lucide-react";
import { useCreateQuote, useNextQuoteNumber, usePriceBook } from "@/hooks/useFinance";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useOptionalVoiceFormContext } from "@/contexts/VoiceFormContext";

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

const STEPS = [
  { id: 1, title: "Client", icon: User },
  { id: 2, title: "Labour", icon: Clock },
  { id: 3, title: "Materials", icon: Package },
  { id: 4, title: "Review", icon: FileCheck },
];

const LABOUR_PRESETS = [
  { description: "1st Fix Electrician", hourlyRate: 45 },
  { description: "2nd Fix Electrician", hourlyRate: 45 },
  { description: "Apprentice", hourlyRate: 18 },
  { description: "Qualified Electrician", hourlyRate: 45 },
];

export function CreateQuoteDialog({ open, onOpenChange, prefillClient, prefillAmount }: CreateQuoteDialogProps) {
  const [step, setStep] = useState(1);
  const [client, setClient] = useState(prefillClient || "");
  const [clientAddress, setClientAddress] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [description, setDescription] = useState("");
  const [validityDays, setValidityDays] = useState("30");
  const [vatRate, setVatRate] = useState("20");
  const [notes, setNotes] = useState("");
  const [lineItems, setLineItems] = useState<LineItem[]>([]);
  const [labourItems, setLabourItems] = useState<LabourItem[]>([]);
  const [newItem, setNewItem] = useState({ description: "", quantity: "", unit: "each", unitPrice: "" });
  const [newLabour, setNewLabour] = useState({ description: "", hours: "", hourlyRate: "" });
  
  // String state for quantity/price inputs to allow empty values
  const [itemQuantityInputs, setItemQuantityInputs] = useState<Record<string, string>>({});
  const [labourHoursInputs, setLabourHoursInputs] = useState<Record<string, string>>({});
  const [isExpandingDescription, setIsExpandingDescription] = useState(false);

  const { data: quoteNumber } = useNextQuoteNumber();
  const { data: priceBook = [] } = usePriceBook();
  const createQuoteMutation = useCreateQuote();

  // AI expand description
  const handleExpandDescription = async () => {
    if (!description.trim()) return;
    
    setIsExpandingDescription(true);
    try {
      const { data, error } = await supabase.functions.invoke('expand-description', {
        body: { description: description.trim() }
      });
      
      if (error) throw error;
      
      if (data?.expandedDescription) {
        setDescription(data.expandedDescription);
        toast.success("Description expanded");
      }
    } catch (err: any) {
      console.error("Error expanding description:", err);
      toast.error(err.message || "Failed to expand description");
    } finally {
      setIsExpandingDescription(false);
    }
  };

  useEffect(() => {
    if (prefillClient) setClient(prefillClient);
    if (prefillAmount) {
      setLineItems([{
        id: crypto.randomUUID(),
        description: "Works as discussed",
        quantity: 1,
        unit: "job",
        unitPrice: prefillAmount,
        total: prefillAmount
      }]);
    }
  }, [prefillClient, prefillAmount]);

  // Voice form registration
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
      actions: ['add_labour_item', 'add_material_item', 'add_from_preset', 'next_step', 'previous_step'],
      onFillField: (field, value) => {
        const strValue = String(value);
        switch (field) {
          case 'client': setClient(strValue); break;
          case 'clientAddress': setClientAddress(strValue); break;
          case 'clientEmail': setClientEmail(strValue); break;
          case 'clientPhone': setClientPhone(strValue); break;
          case 'jobTitle': setJobTitle(strValue); break;
          case 'description': setDescription(strValue); break;
          case 'validityDays': setValidityDays(strValue); break;
          case 'vatRate': setVatRate(strValue); break;
          case 'notes': setNotes(strValue); break;
        }
      },
      onAction: (action, params) => {
        if (action === 'add_labour_item' && params) {
          const item: LabourItem = {
            id: crypto.randomUUID(),
            description: String(params.description || 'Labour'),
            hours: Number(params.hours) || 8,
            hourlyRate: Number(params.rate) || 45,
            total: (Number(params.hours) || 8) * (Number(params.rate) || 45)
          };
          setLabourItems(prev => [...prev, item]);
        }
        if (action === 'add_material_item' && params) {
          const item: LineItem = {
            id: crypto.randomUUID(),
            description: String(params.description || 'Material'),
            quantity: Number(params.quantity) || 1,
            unit: String(params.unit || 'each'),
            unitPrice: Number(params.price) || 0,
            total: (Number(params.quantity) || 1) * (Number(params.price) || 0)
          };
          setLineItems(prev => [...prev, item]);
        }
        if (action === 'add_from_preset' && params?.preset) {
          const preset = LABOUR_PRESETS.find(p => 
            p.description.toLowerCase().includes(String(params.preset).toLowerCase())
          );
          if (preset) addLabourFromPreset(preset);
        }
        if (action === 'next_step') setStep(prev => Math.min(prev + 1, 4));
        if (action === 'previous_step') setStep(prev => Math.max(prev - 1, 1));
      },
      onSubmit: () => handleSubmit(false),
      onCancel: () => { resetForm(); onOpenChange(false); },
      onNextStep: () => setStep(prev => Math.min(prev + 1, 4)),
    });
    
    return () => voiceContext.unregisterForm('create-quote');
  }, [open, voiceContext]);

  const labourTotal = labourItems.reduce((sum, item) => sum + item.total, 0);
  const materialsTotal = lineItems.reduce((sum, item) => sum + item.total, 0);
  const subtotal = labourTotal + materialsTotal;
  const vatAmount = subtotal * (Number(vatRate) / 100);
  const total = subtotal + vatAmount;

  // Labour functions
  const addLabourItem = () => {
    if (!newLabour.description) return;
    const hours = Number(newLabour.hours) || 1;
    const rate = Number(newLabour.hourlyRate) || 0;
    const item: LabourItem = {
      id: crypto.randomUUID(),
      description: newLabour.description,
      hours,
      hourlyRate: rate,
      total: hours * rate
    };
    setLabourItems([...labourItems, item]);
    setNewLabour({ description: "", hours: "", hourlyRate: "" });
  };

  const addLabourFromPreset = (preset: typeof LABOUR_PRESETS[0]) => {
    const item: LabourItem = {
      id: crypto.randomUUID(),
      description: preset.description,
      hours: 8,
      hourlyRate: preset.hourlyRate,
      total: 8 * preset.hourlyRate
    };
    setLabourItems([...labourItems, item]);
  };

  const removeLabourItem = (id: string) => {
    setLabourItems(labourItems.filter(item => item.id !== id));
    setLabourHoursInputs(prev => {
      const { [id]: _, ...rest } = prev;
      return rest;
    });
  };

  const updateLabourHours = (id: string, hours: number) => {
    setLabourItems(labourItems.map(item => 
      item.id === id 
        ? { ...item, hours, total: hours * item.hourlyRate }
        : item
    ));
  };

  // Materials functions
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

  const addFromPriceBook = (item: any) => {
    const lineItem: LineItem = {
      id: crypto.randomUUID(),
      description: item.name,
      quantity: 1,
      unit: item.unit,
      unitPrice: Number(item.sell_price),
      total: Number(item.sell_price)
    };
    setLineItems([...lineItems, lineItem]);
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
    const validUntil = new Date();
    validUntil.setDate(validUntil.getDate() + Number(validityDays));

    // Combine labour and materials into line_items for storage
    const allLineItems = [
      ...labourItems.map(item => ({
        id: item.id,
        description: item.description,
        quantity: item.hours,
        unit: "hour",
        unitPrice: item.hourlyRate,
        total: item.total,
        type: "labour"
      })),
      ...lineItems.map(item => ({
        ...item,
        type: "material"
      }))
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
      status: sendImmediately ? "Sent" : "Draft",
      sent_date: sendImmediately ? new Date().toISOString().split('T')[0] : null,
      valid_until: validUntil.toISOString().split('T')[0],
      job_id: null,
      created_by: "Admin",
      line_items: allLineItems,
      notes
    } as any);

    resetForm();
    onOpenChange(false);
  };

  const resetForm = () => {
    setStep(1);
    setClient("");
    setClientAddress("");
    setClientEmail("");
    setClientPhone("");
    setJobTitle("");
    setDescription("");
    setValidityDays("30");
    setVatRate("20");
    setNotes("");
    setLineItems([]);
    setLabourItems([]);
    setItemQuantityInputs({});
    setLabourHoursInputs({});
    setNewItem({ description: "", quantity: "", unit: "each", unitPrice: "" });
    setNewLabour({ description: "", hours: "", hourlyRate: "" });
  };

  const canProceed = () => {
    switch (step) {
      case 1: return client.trim().length > 0;
      case 2: return true; // Labour is optional
      case 3: return true; // Materials are optional if labour exists
      case 4: return labourItems.length > 0 || lineItems.length > 0; // Need at least one item
      default: return false;
    }
  };

  // Progress Indicator Component
  const ProgressIndicator = () => (
    <div className="flex items-center justify-center px-4 py-4">
      {STEPS.map((s, index) => {
        const isComplete = step > s.id;
        const isActive = step === s.id;
        const IconComponent = s.icon;

        return (
          <div key={s.id} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200",
                  isComplete && "bg-success text-success-foreground",
                  isActive && "bg-elec-yellow text-elec-yellow-foreground ring-4 ring-elec-yellow/20",
                  !isComplete && !isActive && "bg-muted text-muted-foreground"
                )}
              >
                {isComplete ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : (
                  <IconComponent className="h-4 w-4" />
                )}
              </div>
              <span
                className={cn(
                  "text-xs mt-1.5 font-medium transition-colors",
                  isActive && "text-elec-yellow",
                  isComplete && "text-success",
                  !isActive && !isComplete && "text-muted-foreground"
                )}
              >
                {s.title}
              </span>
            </div>
            {index < STEPS.length - 1 && (
              <div
                className={cn(
                  "w-6 sm:w-10 h-1 mx-1 rounded-full transition-colors",
                  step > s.id ? "bg-success" : "bg-muted"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );

  // Navigation Buttons Component
  const NavigationButtons = () => (
    <div className="flex gap-3 mt-6 pt-4 border-t border-border">
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
      
      {step < 4 ? (
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
            disabled={createQuoteMutation.isPending || !canProceed()}
            className="flex-1 h-12"
          >
            Save Draft
          </Button>
          <Button 
            onClick={() => handleSubmit(true)}
            disabled={createQuoteMutation.isPending || !canProceed()}
            className="flex-1 h-12"
          >
            <Send className="h-4 w-4 mr-1" />
            Send
          </Button>
        </div>
      )}
    </div>
  );

  // Render step content inline to prevent focus loss
  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-5">
            <div className="space-y-2">
              <Label className="text-sm font-medium">
                Client Name <span className="text-destructive">*</span>
              </Label>
              <Input
                placeholder="Enter client name"
                value={client}
                onChange={(e) => setClient(e.target.value)}
                className="h-14 text-base"
                autoComplete="off"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm font-medium">Client Address</Label>
              <Textarea
                placeholder="123 High Street&#10;London&#10;SW1A 1AA"
                value={clientAddress}
                onChange={(e) => setClientAddress(e.target.value)}
                className="min-h-[80px] text-base"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm font-medium">Client Email</Label>
              <Input
                type="email"
                placeholder="client@example.com"
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                className="h-14 text-base"
                autoComplete="off"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm font-medium">Client Phone</Label>
              <Input
                type="tel"
                placeholder="+44 7700 900000"
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                className="h-14 text-base"
                autoComplete="off"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm font-medium">
                Job Title <span className="text-destructive">*</span>
              </Label>
              <Input
                placeholder="e.g. Kitchen Rewire, Consumer Unit Upgrade"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                className="h-14 text-base"
                autoComplete="off"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Project Description</Label>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleExpandDescription}
                  disabled={!description.trim() || isExpandingDescription}
                  className="h-8 text-xs gap-1"
                >
                  {isExpandingDescription ? (
                    <Loader2 className="h-3 w-3 animate-spin" />
                  ) : (
                    <Sparkles className="h-3 w-3" />
                  )}
                  AI Expand
                </Button>
              </div>
              <Textarea
                placeholder="Brief description of the work (e.g. 'rewire kitchen')"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-[120px] text-base"
              />
            </div>
            
            <div className="space-y-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:space-y-0">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Valid For</Label>
                <Select value={validityDays} onValueChange={setValidityDays}>
                  <SelectTrigger className="h-14 text-base">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="14">14 days</SelectItem>
                    <SelectItem value="30">30 days</SelectItem>
                    <SelectItem value="60">60 days</SelectItem>
                    <SelectItem value="90">90 days</SelectItem>
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
        );

      case 2:
        return (
          <div className="space-y-5">
            {/* Labour Items */}
            {labourItems.length > 0 && (
              <div className="space-y-3">
                <Label className="text-sm font-medium">Labour Added</Label>
                {labourItems.map((item) => (
                  <Card key={item.id} className="bg-elec-gray border-border">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-base truncate">{item.description}</p>
                          <div className="flex items-center gap-3 mt-2">
                            <Input
                              type="text"
                              inputMode="decimal"
                              value={labourHoursInputs[item.id] ?? String(item.hours)}
                              onChange={(e) => setLabourHoursInputs(prev => ({ ...prev, [item.id]: e.target.value }))}
                              onBlur={(e) => {
                                const val = Number(e.target.value) || 1;
                                updateLabourHours(item.id, val);
                                setLabourHoursInputs(prev => ({ ...prev, [item.id]: String(val) }));
                              }}
                              className="w-20 h-12 text-base text-center"
                            />
                            <span className="text-sm text-muted-foreground">hrs</span>
                            <span className="text-sm text-muted-foreground">× £{item.hourlyRate.toFixed(2)}/hr</span>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-lg font-bold text-elec-yellow">£{item.total.toFixed(2)}</p>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-10 w-10 p-0 mt-1"
                            onClick={() => removeLabourItem(item.id)}
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

            {/* Quick Add Presets */}
            <div className="space-y-3">
              <Label className="text-sm font-medium flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Quick Add Labour
              </Label>
              <div className="grid grid-cols-2 gap-2">
                {LABOUR_PRESETS.map((preset) => (
                  <Card 
                    key={preset.description}
                    className="cursor-pointer hover:border-elec-yellow/50 active:scale-[0.98] transition-all touch-feedback"
                    onClick={() => addLabourFromPreset(preset)}
                  >
                    <CardContent className="p-3 text-center">
                      <Plus className="h-4 w-4 mx-auto text-elec-yellow mb-1" />
                      <p className="text-sm font-medium truncate">{preset.description}</p>
                      <p className="text-xs text-elec-yellow font-medium">£{preset.hourlyRate}/hr</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Custom Labour */}
            <Card className="bg-muted/30 border-dashed">
              <CardContent className="p-4 space-y-4">
                <Label className="text-sm font-medium">Add Custom Labour</Label>
                <div className="space-y-2">
                  <Input
                    placeholder="Labour description (e.g. Site Supervisor)"
                    value={newLabour.description}
                    onChange={(e) => setNewLabour({ ...newLabour, description: e.target.value })}
                    className="h-14 text-base"
                    autoComplete="off"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">Hours</Label>
                    <Input
                      type="text"
                      inputMode="decimal"
                      placeholder="8"
                      value={newLabour.hours}
                      onChange={(e) => setNewLabour({ ...newLabour, hours: e.target.value })}
                      className="h-12 text-base text-center"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">Rate £/hr</Label>
                    <Input
                      type="text"
                      inputMode="decimal"
                      placeholder="45"
                      value={newLabour.hourlyRate}
                      onChange={(e) => setNewLabour({ ...newLabour, hourlyRate: e.target.value })}
                      className="h-12 text-base text-center"
                    />
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full h-12"
                  onClick={addLabourItem}
                  disabled={!newLabour.description}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Labour
                </Button>
              </CardContent>
            </Card>

            {labourItems.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-2">
                No labour added yet. You can skip this step if not needed.
              </p>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-5">
            {/* Line Items */}
            {lineItems.length > 0 && (
              <div className="space-y-3">
                <Label className="text-sm font-medium">Materials Added</Label>
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

            {/* Add from Price Book */}
            {priceBook.length > 0 && (
              <div className="space-y-3">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  Quick Add from Price Book
                </Label>
                <div className="grid grid-cols-2 gap-2">
                  {priceBook.slice(0, 6).map((item) => (
                    <Card 
                      key={item.id}
                      className="cursor-pointer hover:border-elec-yellow/50 active:scale-[0.98] transition-all touch-feedback"
                      onClick={() => addFromPriceBook(item)}
                    >
                      <CardContent className="p-3 text-center">
                        <Plus className="h-4 w-4 mx-auto text-elec-yellow mb-1" />
                        <p className="text-sm font-medium truncate">{item.name}</p>
                        <p className="text-xs text-elec-yellow font-medium">£{Number(item.sell_price).toFixed(2)}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Custom Item */}
            <Card className="bg-muted/30 border-dashed">
              <CardContent className="p-4 space-y-4">
                <Label className="text-sm font-medium">Add Custom Material</Label>
                <div className="space-y-2">
                  <Input
                    placeholder="Item description"
                    value={newItem.description}
                    onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                    className="h-14 text-base"
                    autoComplete="off"
                  />
                </div>
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
                  Add Material
                </Button>
              </CardContent>
            </Card>

            {lineItems.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-2">
                No materials added yet. You can skip this step if not needed.
              </p>
            )}
          </div>
        );

      case 4:
        return (
          <div className="space-y-5">
            {/* Summary Card */}
            <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-elec-yellow/20">
              <CardContent className="p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Client</span>
                  <span className="font-medium">{client}</span>
                </div>
                {clientEmail && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Email</span>
                    <span className="font-medium text-sm">{clientEmail}</span>
                  </div>
                )}
                <div className="border-t border-border pt-4 space-y-2">
                  {labourTotal > 0 && (
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Labour ({labourItems.length} item{labourItems.length !== 1 ? 's' : ''})</span>
                      <span className="text-sm">£{labourTotal.toFixed(2)}</span>
                    </div>
                  )}
                  {materialsTotal > 0 && (
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Materials ({lineItems.length} item{lineItems.length !== 1 ? 's' : ''})</span>
                      <span className="text-sm">£{materialsTotal.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between pt-2 border-t border-border/50">
                    <span className="text-sm text-muted-foreground">Subtotal</span>
                    <span className="text-sm">£{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">VAT ({vatRate}%)</span>
                    <span className="text-sm">£{vatAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-border">
                    <span className="text-lg font-bold">Total</span>
                    <span className="text-2xl font-bold text-elec-yellow">£{total.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notes */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Notes / Terms</Label>
              <Textarea
                placeholder="Payment terms, conditions, special instructions..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="min-h-[100px] text-base"
              />
            </div>

            {/* Labour Items Preview */}
            {labourItems.length > 0 && (
              <div className="space-y-3">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Labour
                </Label>
                <div className="space-y-2">
                  {labourItems.map((item, idx) => (
                    <div key={item.id} className="flex justify-between items-center py-2 px-3 bg-muted/30 rounded-lg">
                      <div className="flex-1 min-w-0">
                        <span className="text-sm text-muted-foreground mr-2">{idx + 1}.</span>
                        <span className="text-sm">{item.description}</span>
                        <span className="text-xs text-muted-foreground ml-2">× {item.hours} hrs</span>
                      </div>
                      <span className="font-medium shrink-0">£{item.total.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Materials Preview */}
            {lineItems.length > 0 && (
              <div className="space-y-3">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  Materials
                </Label>
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
            )}

            {labourItems.length === 0 && lineItems.length === 0 && (
              <Card className="bg-warning/10 border-warning/20">
                <CardContent className="p-4 text-center">
                  <p className="text-sm text-warning">
                    Please add at least one labour or material item before saving.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        );

      default:
        return null;
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
                <SheetTitle className="text-lg">New Quote</SheetTitle>
                <SheetDescription className="text-xs font-mono">{quoteNumber}</SheetDescription>
              </div>
            </div>
          </SheetHeader>

          {/* Progress Indicator */}
          <ProgressIndicator />

          {/* Content */}
          <ScrollArea className="flex-1 px-4">
            <div className="pb-8">
              {renderStepContent()}
              <NavigationButtons />
            </div>
          </ScrollArea>

          {/* Totals Bar */}
          <div className="px-4 py-3 border-t border-border bg-gradient-to-r from-primary/5 to-primary/10">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-muted-foreground block">Quote Total</span>
                <span className="text-sm text-muted-foreground">
                  {labourItems.length + lineItems.length} item{(labourItems.length + lineItems.length) !== 1 ? 's' : ''}
                </span>
              </div>
              <span className="text-2xl font-bold text-elec-yellow">£{total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
