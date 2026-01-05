import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Store, Plus } from "lucide-react";
import { useCreateSupplier } from "@/hooks/useFinance";
import { useOptionalVoiceFormContext } from "@/contexts/VoiceFormContext";

interface CreateSupplierDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CATEGORIES = [
  "Wholesaler",
  "Manufacturer",
  "Tool Supplier",
  "PPE Supplier",
  "Cable Specialist",
  "Lighting",
  "Other"
];

export function CreateSupplierDialog({ open, onOpenChange }: CreateSupplierDialogProps) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Wholesaler");
  const [accountNumber, setAccountNumber] = useState("");
  const [creditLimit, setCreditLimit] = useState("");
  const [contactName, setContactName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [deliveryDays, setDeliveryDays] = useState("1");
  const [discountPercent, setDiscountPercent] = useState("0");
  const [notes, setNotes] = useState("");

  const createSupplierMutation = useCreateSupplier();

  const handleSubmit = async () => {
    if (!name.trim()) return;

    await createSupplierMutation.mutateAsync({
      name: name.trim(),
      category,
      account_number: accountNumber || null,
      credit_limit: Number(creditLimit) || 0,
      balance: 0,
      contact_name: contactName || null,
      phone: phone || null,
      email: email || null,
      address: address || null,
      delivery_days: Number(deliveryDays),
      discount_percent: Number(discountPercent),
      notes: notes || null
    });

    resetForm();
    onOpenChange(false);
  };

  const resetForm = () => {
    setName("");
    setCategory("Wholesaler");
    setAccountNumber("");
    setCreditLimit("");
    setContactName("");
    setPhone("");
    setEmail("");
    setAddress("");
    setDeliveryDays("1");
    setDiscountPercent("0");
    setNotes("");
  };

  // Voice form registration
  const voiceContext = useOptionalVoiceFormContext();
  
  useEffect(() => {
    if (!open || !voiceContext) return;
    
    voiceContext.registerForm({
      formId: 'create-supplier',
      formName: 'Create Supplier',
      fields: [
        { name: 'name', label: 'Company Name', type: 'text', required: true },
        { name: 'category', label: 'Category', type: 'text' },
        { name: 'accountNumber', label: 'Account Number', type: 'text' },
        { name: 'creditLimit', label: 'Credit Limit', type: 'text' },
        { name: 'contactName', label: 'Contact Name', type: 'text' },
        { name: 'phone', label: 'Phone', type: 'text' },
        { name: 'email', label: 'Email', type: 'text' },
        { name: 'address', label: 'Address', type: 'text' },
        { name: 'deliveryDays', label: 'Delivery Days', type: 'text' },
        { name: 'discountPercent', label: 'Discount Percent', type: 'text' },
        { name: 'notes', label: 'Notes', type: 'text' },
      ],
      onFillField: (field, value) => {
        const strValue = String(value);
        switch (field) {
          case 'name': setName(strValue); break;
          case 'category': setCategory(strValue); break;
          case 'accountNumber': setAccountNumber(strValue); break;
          case 'creditLimit': setCreditLimit(strValue); break;
          case 'contactName': setContactName(strValue); break;
          case 'phone': setPhone(strValue); break;
          case 'email': setEmail(strValue); break;
          case 'address': setAddress(strValue); break;
          case 'deliveryDays': setDeliveryDays(strValue); break;
          case 'discountPercent': setDiscountPercent(strValue); break;
          case 'notes': setNotes(strValue); break;
        }
      },
      onSubmit: handleSubmit,
      onCancel: () => { resetForm(); onOpenChange(false); },
    });
    
    return () => voiceContext.unregisterForm('create-supplier');
  }, [open, voiceContext]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[90vh] p-0">
        <div className="flex flex-col h-full">
          {/* Header */}
          <SheetHeader className="px-4 py-3 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-elec-yellow/10 flex items-center justify-center">
                <Store className="h-5 w-5 text-elec-yellow" />
              </div>
              <SheetTitle className="text-lg">Add Supplier</SheetTitle>
            </div>
          </SheetHeader>

          {/* Content */}
          <ScrollArea className="flex-1 px-4 py-4">
            <div className="space-y-4">
              {/* Basic Info */}
              <div className="space-y-2">
                <Label>Company Name *</Label>
                <Input
                  placeholder="e.g. CEF, Edmundson"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="text-base"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((cat) => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Account Number</Label>
                  <Input
                    placeholder="Your account #"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                  />
                </div>
              </div>

              {/* Financial */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Credit Limit</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">£</span>
                    <Input
                      type="number"
                      placeholder="0"
                      value={creditLimit}
                      onChange={(e) => setCreditLimit(e.target.value)}
                      className="pl-8"
                      min={0}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Discount %</Label>
                  <div className="relative">
                    <Input
                      type="number"
                      placeholder="0"
                      value={discountPercent}
                      onChange={(e) => setDiscountPercent(e.target.value)}
                      min={0}
                      max={100}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
                  </div>
                </div>
              </div>

              {/* Contact */}
              <div className="space-y-2">
                <Label>Contact Name</Label>
                <Input
                  placeholder="Your rep's name"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Phone</Label>
                  <Input
                    type="tel"
                    placeholder="Phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Address</Label>
                <Textarea
                  placeholder="Branch address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="min-h-[60px]"
                />
              </div>

              <div className="space-y-2">
                <Label>Delivery Days</Label>
                <Select value={deliveryDays} onValueChange={setDeliveryDays}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Same day</SelectItem>
                    <SelectItem value="1">Next day</SelectItem>
                    <SelectItem value="2">2 days</SelectItem>
                    <SelectItem value="3">3 days</SelectItem>
                    <SelectItem value="5">5 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Notes</Label>
                <Textarea
                  placeholder="Any notes about this supplier"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="min-h-[60px]"
                />
              </div>
            </div>
          </ScrollArea>

          {/* Footer */}
          <SheetFooter className="px-4 py-3 border-t border-border pb-safe">
            <Button 
              className="w-full"
              onClick={handleSubmit}
              disabled={!name.trim() || createSupplierMutation.isPending}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Supplier
            </Button>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
}
