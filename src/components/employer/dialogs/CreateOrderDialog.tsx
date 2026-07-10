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
import { Plus, Trash2, Truck, Store } from 'lucide-react';
import {
  useCreateMaterialOrder,
  useNextOrderNumber,
  useSuppliers,
  usePriceBook,
} from '@/hooks/useFinance';
import { useJobs } from '@/hooks/useJobs';
import { useOptionalVoiceFormContext } from '@/contexts/VoiceFormContext';
import type { PriceBookItem, MaterialOrder } from '@/services/financeService';
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
  sku: string | null;
  unit: string | null;
  qty: number;
  price: number; // buy/cost price
}

type DeliveryMode = 'Deliver to site' | 'Collection';

// Sensible default "required by": 2 working days out — one fewer decision.
const defaultExpectedDate = (): string => {
  const d = new Date();
  let added = 0;
  while (added < 2) {
    d.setDate(d.getDate() + 1);
    const day = d.getDay();
    if (day !== 0 && day !== 6) added++;
  }
  return d.toISOString().split('T')[0];
};

interface CreateOrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  prefillSupplier?: string;
  prefillItem?: string;
  /** Called after a PO is created; `send` is true when the owner chose "Save & send". */
  onCreated?: (order: MaterialOrder, send: boolean) => void;
}

export function CreateOrderDialog({
  open,
  onOpenChange,
  prefillSupplier,
  prefillItem,
  onCreated,
}: CreateOrderDialogProps) {
  const [supplierId, setSupplierId] = useState(prefillSupplier || '');
  const [jobId, setJobId] = useState<string | null>(null);
  const [notes, setNotes] = useState('');
  const [items, setItems] = useState<OrderItem[]>([]);
  const [newItem, setNewItem] = useState({ name: prefillItem || '', qty: 1, price: 0 });
  const [deliveryMode, setDeliveryMode] = useState<DeliveryMode>('Deliver to site');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [expectedDate, setExpectedDate] = useState(defaultExpectedDate);
  const [vatRate, setVatRate] = useState(20);

  const { data: orderNumber } = useNextOrderNumber();
  const { data: suppliers = [] } = useSuppliers();
  const { data: priceBook = [] } = usePriceBook();
  const { data: jobs = [] } = useJobs();
  const createOrderMutation = useCreateMaterialOrder();

  const activeJobs = jobs.filter((j) => j.status === 'Active');
  const subtotal = items.reduce((sum, item) => sum + item.qty * item.price, 0);
  const vatAmount = subtotal * (vatRate / 100);
  const total = subtotal + vatAmount;

  const voiceContext = useOptionalVoiceFormContext();

  // Deliver-to-site defaults to the linked job's site address.
  useEffect(() => {
    if (deliveryMode !== 'Deliver to site' || !jobId) return;
    const job = jobs.find((j) => j.id === jobId);
    if (job?.location && !deliveryAddress.trim()) setDeliveryAddress(job.location);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jobId, deliveryMode]);

  useEffect(() => {
    if (!open || !voiceContext) return;

    voiceContext.registerForm({
      formId: 'create-order',
      formName: 'Raise Purchase Order',
      fields: [
        { name: 'supplier', label: 'Supplier', type: 'text', required: true },
        { name: 'job', label: 'Linked Job', type: 'text' },
        { name: 'notes', label: 'Notes', type: 'text' },
      ],
      actions: ['add_item'],
      onFillField: (field, value) => {
        const strValue = String(value);
        switch (field) {
          case 'supplier': {
            const sup = suppliers.find((s) =>
              s.name.toLowerCase().includes(strValue.toLowerCase())
            );
            if (sup) setSupplierId(sup.id);
            break;
          }
          case 'job': {
            const job = activeJobs.find((j) =>
              j.title.toLowerCase().includes(strValue.toLowerCase())
            );
            if (job) setJobId(job.id);
            break;
          }
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
              sku: null,
              unit: null,
              qty: Number(params.qty) || 1,
              price: Number(params.price) || 0,
            },
          ]);
        }
      },
      onSubmit: () => handleSubmit(false),
      onCancel: () => {
        resetForm();
        onOpenChange(false);
      },
    });

    return () => voiceContext.unregisterForm('create-order');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, voiceContext, suppliers, activeJobs]);

  const addItem = () => {
    if (!newItem.name) return;
    setItems([
      ...items,
      {
        id: crypto.randomUUID(),
        name: newItem.name,
        sku: null,
        unit: null,
        qty: newItem.qty,
        price: newItem.price,
      },
    ]);
    setNewItem({ name: '', qty: 1, price: 0 });
  };

  const addFromPriceBook = (pbItem: PriceBookItem) => {
    setItems([
      ...items,
      {
        id: crypto.randomUUID(),
        name: pbItem.name,
        sku: pbItem.sku ?? null,
        unit: pbItem.unit ?? null,
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

  const handleSubmit = async (send = false) => {
    if (!supplierId || items.length === 0) return;

    const created = await createOrderMutation.mutateAsync({
      order_number: orderNumber || `PO-${new Date().getFullYear()}-0001`,
      supplier_id: supplierId,
      job_id: jobId,
      items: items.map((i) => ({
        name: i.name,
        sku: i.sku,
        unit: i.unit,
        qty: i.qty,
        unit_cost: i.price,
        received_qty: 0,
      })),
      subtotal,
      vat_rate: vatRate,
      vat_amount: vatAmount,
      total,
      status: 'Draft',
      delivery_mode: deliveryMode,
      delivery_address: deliveryMode === 'Deliver to site' ? deliveryAddress || null : null,
      order_date: new Date().toISOString().split('T')[0],
      expected_date: expectedDate || null,
      delivery_date: null,
      ordered_by: 'Admin',
      sent_at: null,
      sent_to_email: null,
      confirmed_at: null,
      pdf_url: null,
      notes: notes || null,
    });

    resetForm();
    onOpenChange(false);
    if (created) onCreated?.(created, send);
  };

  const resetForm = () => {
    setSupplierId('');
    setJobId(null);
    setNotes('');
    setItems([]);
    setNewItem({ name: '', qty: 1, price: 0 });
    setDeliveryMode('Deliver to site');
    setDeliveryAddress('');
    setExpectedDate(defaultExpectedDate());
    setVatRate(20);
  };

  const selectedSupplier = suppliers.find((s) => s.id === supplierId);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[95vh] p-0 overflow-hidden">
        <SheetShell
          eyebrow="Purchase order"
          title="Raise a purchase order"
          description={orderNumber ? `${orderNumber} · Draft` : 'Draft'}
          footer={
            selectedSupplier?.email ? (
              <>
                <SecondaryButton
                  onClick={() => handleSubmit(false)}
                  disabled={!supplierId || items.length === 0 || createOrderMutation.isPending}
                  fullWidth
                >
                  Save draft
                </SecondaryButton>
                <PrimaryButton
                  onClick={() => handleSubmit(true)}
                  disabled={!supplierId || items.length === 0 || createOrderMutation.isPending}
                  fullWidth
                >
                  {createOrderMutation.isPending ? 'Saving…' : `Save & send · £${total.toFixed(2)}`}
                </PrimaryButton>
              </>
            ) : (
              <>
                <SecondaryButton onClick={() => onOpenChange(false)} fullWidth>
                  Cancel
                </SecondaryButton>
                <PrimaryButton
                  onClick={() => handleSubmit(false)}
                  disabled={!supplierId || items.length === 0 || createOrderMutation.isPending}
                  fullWidth
                >
                  {createOrderMutation.isPending ? 'Saving…' : `Save draft · £${total.toFixed(2)}`}
                </PrimaryButton>
              </>
            )
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
              {jobId && (
                <p className="mt-1.5 text-[11px] text-elec-yellow/80">
                  Cost is committed against this job the moment you send it.
                </p>
              )}
            </Field>
          </FormCard>

          <FormCard eyebrow="Delivery">
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setDeliveryMode('Deliver to site')}
                className={`h-11 rounded-xl border text-[13px] font-medium inline-flex items-center justify-center gap-2 touch-manipulation transition-colors ${
                  deliveryMode === 'Deliver to site'
                    ? 'border-elec-yellow/50 bg-elec-yellow/10 text-white'
                    : 'border-white/[0.1] bg-white/[0.04] text-white/70'
                }`}
              >
                <Truck className="h-4 w-4" /> Deliver to site
              </button>
              <button
                type="button"
                onClick={() => setDeliveryMode('Collection')}
                className={`h-11 rounded-xl border text-[13px] font-medium inline-flex items-center justify-center gap-2 touch-manipulation transition-colors ${
                  deliveryMode === 'Collection'
                    ? 'border-elec-yellow/50 bg-elec-yellow/10 text-white'
                    : 'border-white/[0.1] bg-white/[0.04] text-white/70'
                }`}
              >
                <Store className="h-4 w-4" /> Collection
              </button>
            </div>
            {deliveryMode === 'Deliver to site' && (
              <Field label="Delivery address">
                <Textarea
                  placeholder="Where should it be delivered?"
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  className={`${textareaClass} min-h-[64px]`}
                />
              </Field>
            )}
            <Field label="Expected date" hint="When you need it — powers delivery tracking.">
              <Input
                type="date"
                value={expectedDate}
                onChange={(e) => setExpectedDate(e.target.value)}
                className={inputClass}
              />
            </Field>
          </FormCard>

          {items.length > 0 && (
            <FormCard eyebrow="Line items">
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
                          {item.unit ? ` / ${item.unit}` : ''}
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
              <Field label="Unit cost (£)">
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

          <div className="space-y-1.5 px-1 pt-2">
            <div className="flex items-center justify-between text-[13px] text-white/70">
              <span>Subtotal</span>
              <span className="tabular-nums">£{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between text-[13px] text-white/70">
              <span className="inline-flex items-center gap-2">
                VAT
                <select
                  value={vatRate}
                  onChange={(e) => setVatRate(Number(e.target.value))}
                  className="h-7 rounded-lg bg-white/[0.05] border border-white/[0.1] text-white text-[12px] px-1.5 touch-manipulation"
                >
                  <option value={20}>20%</option>
                  <option value={5}>5%</option>
                  <option value={0}>0%</option>
                </select>
              </span>
              <span className="tabular-nums">£{vatAmount.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between pt-1.5 border-t border-white/[0.08]">
              <span className="text-[11px] text-white uppercase tracking-[0.14em] font-medium">
                PO total
              </span>
              <span className="text-[22px] font-semibold text-elec-yellow tabular-nums">
                £{total.toFixed(2)}
              </span>
            </div>
          </div>
        </SheetShell>
      </SheetContent>
    </Sheet>
  );
}
