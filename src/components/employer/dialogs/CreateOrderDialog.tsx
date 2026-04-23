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
import { Plus, Trash2 } from 'lucide-react';
import {
  useCreateMaterialOrder,
  useNextOrderNumber,
  useSuppliers,
  usePriceBook,
} from '@/hooks/useFinance';
import { useJobs } from '@/hooks/useJobs';
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

interface OrderItem {
  id: string;
  name: string;
  qty: number;
  price: number;
}

interface CreateOrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  prefillSupplier?: string;
  prefillItem?: string;
}

export function CreateOrderDialog({
  open,
  onOpenChange,
  prefillSupplier,
  prefillItem,
}: CreateOrderDialogProps) {
  const [supplierId, setSupplierId] = useState(prefillSupplier || '');
  const [jobId, setJobId] = useState<string | null>(null);
  const [notes, setNotes] = useState('');
  const [items, setItems] = useState<OrderItem[]>([]);
  const [newItem, setNewItem] = useState({ name: prefillItem || '', qty: 1, price: 0 });

  const { data: orderNumber } = useNextOrderNumber();
  const { data: suppliers = [] } = useSuppliers();
  const { data: priceBook = [] } = usePriceBook();
  const { data: jobs = [] } = useJobs();
  const createOrderMutation = useCreateMaterialOrder();

  const activeJobs = jobs.filter((j) => j.status === 'Active');
  const total = items.reduce((sum, item) => sum + item.qty * item.price, 0);

  const voiceContext = useOptionalVoiceFormContext();

  useEffect(() => {
    if (!open || !voiceContext) return;

    voiceContext.registerForm({
      formId: 'create-order',
      formName: 'Create Order',
      fields: [
        { name: 'supplier', label: 'Supplier', type: 'text', required: true },
        { name: 'job', label: 'Linked Job', type: 'text' },
        { name: 'notes', label: 'Notes', type: 'text' },
      ],
      actions: ['add_item'],
      onFillField: (field, value) => {
        const strValue = String(value);
        switch (field) {
          case 'supplier':
            const sup = suppliers.find((s) =>
              s.name.toLowerCase().includes(strValue.toLowerCase())
            );
            if (sup) setSupplierId(sup.id);
            break;
          case 'job':
            const job = activeJobs.find((j) =>
              j.title.toLowerCase().includes(strValue.toLowerCase())
            );
            if (job) setJobId(job.id);
            break;
          case 'notes':
            setNotes(strValue);
            break;
        }
      },
      onAction: (action, params) => {
        if (action === 'add_item' && params) {
          setItems((prev) => [
            ...prev,
            {
              id: crypto.randomUUID(),
              name: String(params.name || 'Item'),
              qty: Number(params.qty) || 1,
              price: Number(params.price) || 0,
            },
          ]);
        }
      },
      onSubmit: handleSubmit,
      onCancel: () => {
        resetForm();
        onOpenChange(false);
      },
    });

    return () => voiceContext.unregisterForm('create-order');
  }, [open, voiceContext, suppliers, activeJobs]);

  const addItem = () => {
    if (!newItem.name) return;
    setItems([
      ...items,
      {
        id: crypto.randomUUID(),
        name: newItem.name,
        qty: newItem.qty,
        price: newItem.price,
      },
    ]);
    setNewItem({ name: '', qty: 1, price: 0 });
  };

  const addFromPriceBook = (pbItem: any) => {
    setItems([
      ...items,
      {
        id: crypto.randomUUID(),
        name: pbItem.name,
        qty: 1,
        price: Number(pbItem.buy_price),
      },
    ]);
  };

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const updateItemQty = (id: string, qty: number) => {
    setItems(items.map((item) => (item.id === id ? { ...item, qty } : item)));
  };

  const handleSubmit = async () => {
    if (!supplierId || items.length === 0) return;

    await createOrderMutation.mutateAsync({
      order_number: orderNumber || `ORD-${new Date().getFullYear()}-001`,
      supplier_id: supplierId,
      job_id: jobId,
      items: items,
      total,
      status: 'Processing',
      order_date: new Date().toISOString().split('T')[0],
      delivery_date: null,
      ordered_by: 'Admin',
      notes: notes || null,
    });

    resetForm();
    onOpenChange(false);
  };

  const resetForm = () => {
    setSupplierId('');
    setJobId(null);
    setNotes('');
    setItems([]);
    setNewItem({ name: '', qty: 1, price: 0 });
  };

  const selectedSupplier = suppliers.find((s) => s.id === supplierId);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[95vh] p-0 overflow-hidden">
        <SheetShell
          eyebrow="New order"
          title="Place materials order"
          description={orderNumber ? `${orderNumber} · Draft` : 'Draft'}
          footer={
            <>
              <SecondaryButton onClick={() => onOpenChange(false)} fullWidth>
                Cancel
              </SecondaryButton>
              <PrimaryButton
                onClick={handleSubmit}
                disabled={!supplierId || items.length === 0 || createOrderMutation.isPending}
                fullWidth
              >
                Place order · £{total.toFixed(2)}
              </PrimaryButton>
            </>
          }
        >
          <FormCard eyebrow="Supplier & job">
            <Field label="Supplier" required>
              <Select value={supplierId} onValueChange={setSupplierId}>
                <SelectTrigger className={selectTriggerClass}>
                  <SelectValue placeholder="Select supplier" />
                </SelectTrigger>
                <SelectContent className={selectContentClass}>
                  {suppliers.map((supplier) => (
                    <SelectItem key={supplier.id} value={supplier.id}>
                      {supplier.name}
                      {supplier.discount_percent > 0 && (
                        <span className="text-emerald-400 ml-2">
                          ({supplier.discount_percent}% off)
                        </span>
                      )}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedSupplier && (
                <p className="mt-1.5 text-[11px] text-white">
                  {selectedSupplier.delivery_days === 0
                    ? 'Same day delivery'
                    : `${selectedSupplier.delivery_days} day delivery`}
                </p>
              )}
            </Field>
            <Field label="Link to job (optional)">
              <Select
                value={jobId || 'none'}
                onValueChange={(v) => setJobId(v === 'none' ? null : v)}
              >
                <SelectTrigger className={selectTriggerClass}>
                  <SelectValue placeholder="Select job (optional)" />
                </SelectTrigger>
                <SelectContent className={selectContentClass}>
                  <SelectItem value="none">No job linked</SelectItem>
                  {activeJobs.map((job) => (
                    <SelectItem key={job.id} value={job.id}>
                      {job.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          </FormCard>

          {items.length > 0 && (
            <FormCard eyebrow="Order items">
              <div className="space-y-2">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-3 bg-[hsl(0_0%_9%)] border border-white/[0.06] rounded-xl px-3 py-2.5"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-medium text-white truncate">{item.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Input
                          type="number"
                          value={item.qty}
                          onChange={(e) => updateItemQty(item.id, Number(e.target.value))}
                          className={`${inputClass} w-16 h-8`}
                          min={1}
                        />
                        <span className="text-[11px] text-white">
                          × £{item.price.toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-[13px] font-semibold text-white">
                        £{(item.qty * item.price).toFixed(2)}
                      </p>
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="mt-1 h-7 w-7 inline-flex items-center justify-center rounded-full bg-white/[0.04] border border-white/[0.08] text-red-400 hover:bg-red-500/15 transition-colors"
                        aria-label="Remove item"
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
              <div className="flex gap-2 overflow-x-auto pb-1 hide-scrollbar">
                {priceBook.slice(0, 8).map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => addFromPriceBook(item)}
                    className="shrink-0 inline-flex items-center gap-1.5 h-8 px-3 rounded-full bg-white/[0.04] border border-white/[0.1] text-[12px] text-white hover:bg-elec-yellow/10 hover:border-elec-yellow/40 transition-colors touch-manipulation"
                  >
                    <Plus className="h-3 w-3" />
                    {item.name}
                  </button>
                ))}
              </div>
            </FormCard>
          )}

          <FormCard eyebrow="Add custom item">
            <Field label="Item name">
              <Input
                placeholder="Item name"
                value={newItem.name}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                className={inputClass}
              />
            </Field>
            <FormGrid cols={2}>
              <Field label="Quantity">
                <Input
                  type="number"
                  value={newItem.qty}
                  onChange={(e) => setNewItem({ ...newItem, qty: Number(e.target.value) })}
                  min={1}
                  className={inputClass}
                />
              </Field>
              <Field label="Unit price (£)">
                <Input
                  type="number"
                  value={newItem.price}
                  onChange={(e) => setNewItem({ ...newItem, price: Number(e.target.value) })}
                  min={0}
                  step={0.01}
                  className={inputClass}
                />
              </Field>
            </FormGrid>
            <SecondaryButton onClick={addItem} disabled={!newItem.name} fullWidth>
              <Plus className="h-4 w-4 mr-1.5" />
              Add item
            </SecondaryButton>
          </FormCard>

          <FormCard eyebrow="Notes">
            <Field label="Delivery instructions / special requests">
              <Textarea
                placeholder="Delivery instructions, special requests, etc."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className={`${textareaClass} min-h-[80px]`}
              />
            </Field>
          </FormCard>

          <div className="flex items-center justify-between px-1 pt-2">
            <span className="text-[11px] text-white uppercase tracking-[0.14em] font-medium">
              Order total
            </span>
            <span className="text-[22px] font-semibold text-elec-yellow tabular-nums">
              £{total.toFixed(2)}
            </span>
          </div>
        </SheetShell>
      </SheetContent>
    </Sheet>
  );
}
