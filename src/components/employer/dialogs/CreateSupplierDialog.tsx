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
import { useCreateSupplier, useUpdateSupplier } from '@/hooks/useFinance';
import type { Supplier } from '@/services/financeService';
import { useOptionalVoiceFormContext } from '@/contexts/VoiceFormContext';
import {
  SheetShell,
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

interface CreateSupplierDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** When provided, the dialog edits this supplier instead of creating a new one. */
  supplier?: Supplier | null;
}

const CATEGORIES = [
  'Wholesaler',
  'Manufacturer',
  'Tool Supplier',
  'PPE Supplier',
  'Cable Specialist',
  'Lighting',
  'Other',
];

export function CreateSupplierDialog({ open, onOpenChange, supplier }: CreateSupplierDialogProps) {
  const isEdit = !!supplier;
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Wholesaler');
  const [accountNumber, setAccountNumber] = useState('');
  const [creditLimit, setCreditLimit] = useState('');
  const [contactName, setContactName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [deliveryDays, setDeliveryDays] = useState('1');
  const [discountPercent, setDiscountPercent] = useState('0');
  const [notes, setNotes] = useState('');

  const createSupplierMutation = useCreateSupplier();
  const updateSupplierMutation = useUpdateSupplier();
  const saving = createSupplierMutation.isPending || updateSupplierMutation.isPending;

  // Prefill when opening in edit mode; reset to blank when opening to create.
  useEffect(() => {
    if (!open) return;
    if (supplier) {
      setName(supplier.name ?? '');
      setCategory(supplier.category || 'Wholesaler');
      setAccountNumber(supplier.account_number ?? '');
      setCreditLimit(supplier.credit_limit ? String(supplier.credit_limit) : '');
      setContactName(supplier.contact_name ?? '');
      setPhone(supplier.phone ?? '');
      setEmail(supplier.email ?? '');
      setAddress(supplier.address ?? '');
      setDeliveryDays(String(supplier.delivery_days ?? 1));
      setDiscountPercent(String(supplier.discount_percent ?? 0));
      setNotes(supplier.notes ?? '');
    } else {
      resetForm();
    }
  }, [open, supplier]);

  const handleSubmit = async () => {
    if (!name.trim()) return;

    const payload = {
      name: name.trim(),
      category,
      account_number: accountNumber || null,
      contact_name: contactName || null,
      phone: phone || null,
      email: email || null,
      address: address || null,
      delivery_days: Number(deliveryDays),
      discount_percent: Number(discountPercent),
      notes: notes || null,
    };

    if (isEdit && supplier) {
      await updateSupplierMutation.mutateAsync({
        id: supplier.id,
        updates: { ...payload, credit_limit: Number(creditLimit) || 0 },
      });
    } else {
      await createSupplierMutation.mutateAsync({
        ...payload,
        credit_limit: Number(creditLimit) || 0,
        balance: 0,
      });
    }

    resetForm();
    onOpenChange(false);
  };

  const resetForm = () => {
    setName('');
    setCategory('Wholesaler');
    setAccountNumber('');
    setCreditLimit('');
    setContactName('');
    setPhone('');
    setEmail('');
    setAddress('');
    setDeliveryDays('1');
    setDiscountPercent('0');
    setNotes('');
  };

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
          case 'name':
            setName(strValue);
            break;
          case 'category':
            setCategory(strValue);
            break;
          case 'accountNumber':
            setAccountNumber(strValue);
            break;
          case 'creditLimit':
            setCreditLimit(strValue);
            break;
          case 'contactName':
            setContactName(strValue);
            break;
          case 'phone':
            setPhone(strValue);
            break;
          case 'email':
            setEmail(strValue);
            break;
          case 'address':
            setAddress(strValue);
            break;
          case 'deliveryDays':
            setDeliveryDays(strValue);
            break;
          case 'discountPercent':
            setDiscountPercent(strValue);
            break;
          case 'notes':
            setNotes(strValue);
            break;
        }
      },
      onSubmit: handleSubmit,
      onCancel: () => {
        resetForm();
        onOpenChange(false);
      },
    });

    return () => voiceContext.unregisterForm('create-supplier');
  }, [open, voiceContext]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[90vh] p-0 overflow-hidden">
        <SheetShell
          eyebrow="Suppliers"
          title={isEdit ? 'Edit supplier' : 'Add supplier'}
          description={
            isEdit
              ? 'Update account number, discount and contact details.'
              : 'Register a new supplier account with contact and delivery details.'
          }
          footer={
            <>
              <SecondaryButton onClick={() => onOpenChange(false)} fullWidth>
                Cancel
              </SecondaryButton>
              <PrimaryButton onClick={handleSubmit} disabled={!name.trim() || saving} fullWidth>
                {saving ? 'Saving…' : isEdit ? 'Save changes' : 'Add supplier'}
              </PrimaryButton>
            </>
          }
        >
          <FormCard eyebrow="Company">
            <Field label="Company name" required>
              <Input
                placeholder="e.g. CEF, Edmundson"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={inputClass}
              />
            </Field>
            <FormGrid cols={2}>
              <Field label="Category">
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className={selectTriggerClass}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className={selectContentClass}>
                    {CATEGORIES.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Account number">
                <Input
                  placeholder="Your account #"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  className={inputClass}
                />
              </Field>
            </FormGrid>
          </FormCard>

          <FormCard eyebrow="Finance">
            <FormGrid cols={2}>
              <Field label="Credit limit (£)">
                <Input
                  type="number"
                  placeholder="0"
                  value={creditLimit}
                  onChange={(e) => setCreditLimit(e.target.value)}
                  min={0}
                  className={inputClass}
                />
              </Field>
              <Field label="Discount %">
                <Input
                  type="number"
                  placeholder="0"
                  value={discountPercent}
                  onChange={(e) => setDiscountPercent(e.target.value)}
                  min={0}
                  max={100}
                  className={inputClass}
                />
              </Field>
            </FormGrid>
          </FormCard>

          <FormCard eyebrow="Contact">
            <Field label="Contact name">
              <Input
                placeholder="Your rep's name"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                className={inputClass}
              />
            </Field>
            <FormGrid cols={2}>
              <Field label="Phone">
                <Input
                  type="tel"
                  placeholder="Phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={inputClass}
                />
              </Field>
              <Field label="Email">
                <Input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputClass}
                />
              </Field>
            </FormGrid>
            <Field label="Address">
              <Textarea
                placeholder="Branch address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className={`${textareaClass} min-h-[70px]`}
              />
            </Field>
          </FormCard>

          <FormCard eyebrow="Delivery">
            <Field label="Delivery days">
              <Select value={deliveryDays} onValueChange={setDeliveryDays}>
                <SelectTrigger className={selectTriggerClass}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className={selectContentClass}>
                  <SelectItem value="0">Same day</SelectItem>
                  <SelectItem value="1">Next day</SelectItem>
                  <SelectItem value="2">2 days</SelectItem>
                  <SelectItem value="3">3 days</SelectItem>
                  <SelectItem value="5">5 days</SelectItem>
                </SelectContent>
              </Select>
            </Field>
          </FormCard>

          <FormCard eyebrow="Notes">
            <Field label="Notes">
              <Textarea
                placeholder="Any notes about this supplier"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className={`${textareaClass} min-h-[70px]`}
              />
            </Field>
          </FormCard>
        </SheetShell>
      </SheetContent>
    </Sheet>
  );
}
