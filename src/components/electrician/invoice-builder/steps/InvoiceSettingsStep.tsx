import { InvoiceSettings } from '@/types/invoice';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface InvoiceSettingsStepProps {
  settings?: InvoiceSettings;
  notes?: string;
  onUpdateSettings: (settings: Partial<InvoiceSettings>) => void;
  onUpdateNotes: (notes: string) => void;
}

const inputClass =
  'w-full h-11 px-3 rounded-lg text-[15px] text-white bg-white/[0.06] border border-white/[0.12] focus:border-elec-yellow focus:ring-2 focus:ring-elec-yellow/20 outline-none touch-manipulation placeholder:text-white';

const labelClass = 'text-[11px] text-white uppercase tracking-wider block mb-1.5 truncate';

export const InvoiceSettingsStep = ({
  settings,
  notes,
  onUpdateSettings,
  onUpdateNotes,
}: InvoiceSettingsStepProps) => {
  const darkStyle: React.CSSProperties = { colorScheme: 'dark' };

  const updateBankField = (field: string, value: string) => {
    onUpdateSettings({
      bankDetails: {
        bankName: settings?.bankDetails?.bankName || '',
        accountName: settings?.bankDetails?.accountName || '',
        accountNumber: settings?.bankDetails?.accountNumber || '',
        sortCode: settings?.bankDetails?.sortCode || '',
        [field]: value,
      },
    });
  };

  return (
    <div className="space-y-6 text-left">

      {/* Invoice Display */}
      <div className="flex items-center justify-between py-3 border-b border-white/[0.12]">
        <div>
          <p className="text-[14px] font-medium text-white">Summary View</p>
          <p className="text-[12px] text-white mt-0.5">
            {settings?.showSummaryView ? 'Labour & Materials totals only' : 'Itemised breakdown'}
          </p>
        </div>
        <Switch
          checked={settings?.showSummaryView || false}
          onCheckedChange={(checked) => onUpdateSettings({ showSummaryView: checked })}
          className="data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow"
        />
      </div>

      {/* VAT */}
      <div className="h-[2px] w-full rounded-full bg-gradient-to-r from-elec-yellow/30 to-elec-yellow/5" />
      <div>
        <div className="flex items-center justify-between py-3 border-b border-white/[0.12]">
          <div>
            <p className="text-[14px] font-medium text-white">VAT Registered</p>
            <p className="text-[12px] text-white mt-0.5">Add VAT to this invoice</p>
          </div>
          <Switch
            checked={settings?.vatRegistered || false}
            onCheckedChange={(checked) => onUpdateSettings({ vatRegistered: checked })}
            className="data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow"
          />
        </div>
        {settings?.vatRegistered && (
          <div className="pt-3">
            <label className={labelClass}>VAT Rate (%)</label>
            <input
              type="text"
              inputMode="decimal"
              style={darkStyle}
              value={settings?.vatRate ?? 20}
              onChange={(e) => {
                const value = e.target.value;
                if (value === '' || /^\d*\.?\d*$/.test(value)) {
                  onUpdateSettings({ vatRate: value === '' ? 20 : parseFloat(value) || 20 });
                }
              }}
              className={inputClass}
              placeholder="20"
            />
          </div>
        )}
      </div>

      {/* Deductions & Discounts */}
      <div className="h-[2px] w-full rounded-full bg-gradient-to-r from-elec-yellow/30 to-elec-yellow/5" />
      <div>
        <div className="flex items-center justify-between py-3 border-b border-white/[0.12]">
          <div>
            <p className="text-[14px] font-medium text-white">Deduction / Discount</p>
            <p className="text-[12px] text-white mt-0.5">CIS, OAP discount, etc.</p>
          </div>
          <Switch
            checked={settings?.discountEnabled || false}
            onCheckedChange={(checked) => {
              if (!checked) {
                onUpdateSettings({ discountEnabled: false, discountValue: 0, discountLabel: '' });
              } else {
                onUpdateSettings({ discountEnabled: true });
              }
            }}
            className="data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow"
          />
        </div>

        {settings?.discountEnabled && (
          <div className="pt-4 space-y-4">
            {/* CIS Presets */}
            <div>
              <label className={labelClass}>Quick Presets</label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() =>
                    onUpdateSettings({ discountEnabled: true, discountType: 'percentage', discountValue: 20, discountLabel: 'CIS Deduction (20%)' })
                  }
                  className="px-4 h-11 rounded-lg text-[13px] font-medium bg-white/[0.08] text-white border border-white/[0.12] touch-manipulation active:scale-[0.97]"
                >
                  CIS 20%
                </button>
                <button
                  type="button"
                  onClick={() =>
                    onUpdateSettings({ discountEnabled: true, discountType: 'percentage', discountValue: 30, discountLabel: 'CIS Deduction (30%)' })
                  }
                  className="px-4 h-11 rounded-lg text-[13px] font-medium bg-white/[0.08] text-white border border-white/[0.12] touch-manipulation active:scale-[0.97]"
                >
                  CIS 30%
                </button>
              </div>
            </div>

            {/* Type */}
            <div>
              <label className={labelClass}>Type</label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => onUpdateSettings({ discountType: 'percentage' })}
                  className={cn(
                    'px-4 h-11 rounded-lg text-[13px] font-medium transition-all touch-manipulation active:scale-[0.97]',
                    (settings?.discountType || 'percentage') === 'percentage'
                      ? 'bg-elec-yellow/20 text-elec-yellow border border-elec-yellow/40'
                      : 'bg-white/[0.08] text-white border border-white/[0.12]'
                  )}
                >
                  Percentage
                </button>
                <button
                  type="button"
                  onClick={() => onUpdateSettings({ discountType: 'fixed' })}
                  className={cn(
                    'px-4 h-11 rounded-lg text-[13px] font-medium transition-all touch-manipulation active:scale-[0.97]',
                    settings?.discountType === 'fixed'
                      ? 'bg-elec-yellow/20 text-elec-yellow border border-elec-yellow/40'
                      : 'bg-white/[0.08] text-white border border-white/[0.12]'
                  )}
                >
                  Fixed Amount
                </button>
              </div>
            </div>

            {/* Value + Label side by side */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>
                  {(settings?.discountType || 'percentage') === 'percentage' ? 'Percentage (%)' : 'Amount (£)'}
                </label>
                <input
                  type="text"
                  inputMode="decimal"
                  style={darkStyle}
                  placeholder={(settings?.discountType || 'percentage') === 'percentage' ? '20' : '150.00'}
                  className={inputClass}
                  value={settings?.discountValue || ''}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === '' || /^\d*\.?\d*$/.test(value)) {
                      onUpdateSettings({ discountValue: value === '' ? 0 : parseFloat(value) || 0 });
                    }
                  }}
                />
              </div>
              <div>
                <label className={labelClass}>Label (on PDF)</label>
                <input
                  type="text"
                  style={darkStyle}
                  placeholder="e.g. CIS Deduction"
                  className={inputClass}
                  value={settings?.discountLabel || ''}
                  onChange={(e) => onUpdateSettings({ discountLabel: e.target.value })}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Payment Terms */}
      <div className="h-[2px] w-full rounded-full bg-gradient-to-r from-elec-yellow/30 to-elec-yellow/5" />
      <div className="space-y-3">
        <div>
          <label className={labelClass}>Payment Terms</label>
          <Select
            value={settings?.paymentTerms || '30 days'}
            onValueChange={(value) => {
              const today = new Date();
              let newDueDate: Date;
              switch (value) {
                case 'Due on receipt': newDueDate = today; break;
                case '7 days': newDueDate = new Date(today.getTime() + 7 * 86400000); break;
                case '14 days': newDueDate = new Date(today.getTime() + 14 * 86400000); break;
                case '30 days': newDueDate = new Date(today.getTime() + 30 * 86400000); break;
                case '60 days': newDueDate = new Date(today.getTime() + 60 * 86400000); break;
                case '90 days': newDueDate = new Date(today.getTime() + 90 * 86400000); break;
                default: newDueDate = new Date(today.getTime() + 30 * 86400000);
              }
              onUpdateSettings({ paymentTerms: value, dueDate: newDueDate });
            }}
          >
            <SelectTrigger className={cn(inputClass, 'pr-8 [&>svg]:text-white')}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-elec-gray border-white/[0.1]">
              <SelectItem value="Due on receipt">Due on receipt</SelectItem>
              <SelectItem value="7 days">7 days</SelectItem>
              <SelectItem value="14 days">14 days</SelectItem>
              <SelectItem value="30 days">30 days (Standard)</SelectItem>
              <SelectItem value="60 days">60 days</SelectItem>
              <SelectItem value="90 days">90 days</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className={labelClass}>Due Date</label>
          <Popover>
            <PopoverTrigger asChild>
              <button className={cn(inputClass, 'text-left flex items-center')}>
                {settings?.dueDate ? format(new Date(settings.dueDate), 'PPP') : 'Select due date'}
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-elec-gray border-white/[0.1]" align="start">
              <Calendar
                mode="single"
                selected={settings?.dueDate ? new Date(settings.dueDate) : undefined}
                onSelect={(date) => date && onUpdateSettings({ dueDate: date })}
                initialFocus
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Bank Details — 2x2 grid */}
      <div className="h-[2px] w-full rounded-full bg-gradient-to-r from-elec-yellow/30 to-elec-yellow/5" />
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>Bank Name</label>
            <input
              style={darkStyle}
              value={settings?.bankDetails?.bankName || ''}
              onChange={(e) => updateBankField('bankName', e.target.value)}
              placeholder="e.g. Barclays"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Account Name</label>
            <input
              style={darkStyle}
              value={settings?.bankDetails?.accountName || ''}
              onChange={(e) => updateBankField('accountName', e.target.value)}
              placeholder="e.g. Smith Electrical"
              className={inputClass}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>Account Number</label>
            <input
              style={darkStyle}
              value={settings?.bankDetails?.accountNumber || ''}
              onChange={(e) => updateBankField('accountNumber', e.target.value.replace(/\D/g, '').slice(0, 8))}
              inputMode="numeric"
              placeholder="12345678"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Sort Code</label>
            <input
              style={darkStyle}
              value={settings?.bankDetails?.sortCode || ''}
              onChange={(e) => {
                let v = e.target.value.replace(/\D/g, '');
                if (v.length > 6) v = v.slice(0, 6);
                if (v.length > 4) v = `${v.slice(0, 2)}-${v.slice(2, 4)}-${v.slice(4)}`;
                else if (v.length > 2) v = `${v.slice(0, 2)}-${v.slice(2)}`;
                updateBankField('sortCode', v);
              }}
              inputMode="numeric"
              placeholder="12-34-56"
              className={inputClass}
            />
          </div>
        </div>
      </div>

      {/* Notes */}
      <div className="h-[2px] w-full rounded-full bg-gradient-to-r from-elec-yellow/30 to-elec-yellow/5" />
      <div>
        <label className={labelClass}>Invoice Notes (Optional)</label>
        <textarea
          style={darkStyle}
          value={notes || ''}
          onChange={(e) => onUpdateNotes(e.target.value)}
          placeholder="e.g. Thank you for your business."
          className={cn(inputClass, 'min-h-[100px] resize-none py-3')}
          rows={4}
        />
        <p className="text-[11px] text-white mt-1.5">Appears at the bottom of your invoice</p>
      </div>
    </div>
  );
};
