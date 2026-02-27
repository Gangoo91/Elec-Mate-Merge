import { InvoiceSettings } from '@/types/invoice';
import {
  Calendar as CalendarIcon,
  CreditCard,
  FileText,
  Receipt,
  Building,
  Hash,
  SortAsc,
  LayoutList,
  LayoutGrid,
  BadgePercent,
  Percent,
  PoundSterling,
  Settings,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
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

export const InvoiceSettingsStep = ({
  settings,
  notes,
  onUpdateSettings,
  onUpdateNotes,
}: InvoiceSettingsStepProps) => {
  // Clean inline input style for seamless look
  const inputClassName =
    'w-full h-8 bg-transparent border-0 outline-none text-[16px] font-medium text-white placeholder:text-white caret-elec-yellow';

  const darkStyle: React.CSSProperties = {
    colorScheme: 'dark',
  };

  return (
    <div className="space-y-5 text-left">
      {/* Display Mode Section */}
      <div>
        <p className="text-[13px] font-medium text-white uppercase tracking-wider mb-3">
          Invoice Display
        </p>
        <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] overflow-hidden">
          {/* Summary View Toggle */}
          <div className="flex items-center gap-3 p-4">
            <div className="w-11 h-11 rounded-xl bg-elec-yellow flex items-center justify-center flex-shrink-0">
              {settings?.showSummaryView ? (
                <LayoutGrid className="h-5 w-5 text-black" />
              ) : (
                <LayoutList className="h-5 w-5 text-black" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[14px] font-medium text-white">Summary View</p>
              <p className="text-[12px] text-white">
                {settings?.showSummaryView
                  ? 'Shows Labour & Materials totals only'
                  : 'Shows itemised breakdown'}
              </p>
            </div>
            <Switch
              checked={settings?.showSummaryView || false}
              onCheckedChange={(checked) => onUpdateSettings({ showSummaryView: checked })}
              className="data-[state=checked]:bg-elec-yellow"
            />
          </div>
        </div>
        <p className="text-[11px] text-white mt-2 px-1">
          Summary view is cleaner for customers - full breakdown is still synced to your accounting
          software
        </p>
      </div>

      {/* VAT Settings Section */}
      <div>
        <p className="text-[13px] font-medium text-white uppercase tracking-wider mb-3">
          VAT Settings
        </p>
        <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] overflow-hidden divide-y divide-white/[0.06]">
          {/* VAT Toggle Row */}
          <div className="flex items-center gap-3 p-4">
            <div className="w-11 h-11 rounded-xl bg-elec-yellow flex items-center justify-center flex-shrink-0">
              <Receipt className="h-5 w-5 text-black" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[14px] font-medium text-white">VAT Registered</p>
              <p className="text-[12px] text-white">Add VAT to this invoice</p>
            </div>
            <Switch
              checked={settings?.vatRegistered || false}
              onCheckedChange={(checked) => onUpdateSettings({ vatRegistered: checked })}
              className="data-[state=checked]:bg-elec-yellow"
            />
          </div>

          {/* VAT Rate - Only shown if VAT registered */}
          {settings?.vatRegistered && (
            <div className="flex items-center gap-3 p-4">
              <div className="w-11 h-11 rounded-xl bg-white/[0.05] flex items-center justify-center flex-shrink-0">
                <Hash className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1 min-w-0 text-left">
                <label className="text-[12px] text-white block mb-0.5">VAT Rate (%)</label>
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
                  className={inputClassName}
                  placeholder="20"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Deductions & Discounts Section */}
      <div>
        <p className="text-[13px] font-medium text-white uppercase tracking-wider px-1 mb-2 flex items-center gap-2">
          <BadgePercent className="h-3.5 w-3.5" />
          Deductions & Discounts
        </p>
        <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] overflow-hidden divide-y divide-white/[0.06]">
          {/* Enable Toggle */}
          <div className="flex items-center gap-3 p-3.5">
            <div
              className={cn(
                'w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors',
                settings?.discountEnabled ? 'bg-elec-yellow' : 'bg-white/[0.1]'
              )}
            >
              <BadgePercent className="h-5 w-5 text-black" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[15px] font-medium text-white">Apply Deduction/Discount</p>
              <p className="text-[13px] text-white">CIS, OAP discount, etc.</p>
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
              className="data-[state=checked]:bg-elec-yellow"
            />
          </div>

          {settings?.discountEnabled && (
            <>
              {/* Quick CIS Presets */}
              <div className="p-3.5">
                <label className="text-[12px] text-white block mb-2">Quick Presets</label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      onUpdateSettings({
                        discountEnabled: true,
                        discountType: 'percentage',
                        discountValue: 20,
                        discountLabel: 'CIS Deduction (20%)',
                      })
                    }
                    className="px-4 py-2.5 rounded-xl text-[13px] font-medium bg-white/[0.03] text-white border border-white/[0.08] touch-manipulation active:scale-[0.97] transition-all"
                  >
                    CIS 20%
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      onUpdateSettings({
                        discountEnabled: true,
                        discountType: 'percentage',
                        discountValue: 30,
                        discountLabel: 'CIS Deduction (30%)',
                      })
                    }
                    className="px-4 py-2.5 rounded-xl text-[13px] font-medium bg-white/[0.03] text-white border border-white/[0.08] touch-manipulation active:scale-[0.97] transition-all"
                  >
                    CIS 30%
                  </button>
                </div>
              </div>

              {/* Type Picker */}
              <div className="p-3.5">
                <label className="text-[12px] text-white block mb-2">Type</label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => onUpdateSettings({ discountType: 'percentage' })}
                    className={cn(
                      'flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-medium transition-all touch-manipulation active:scale-[0.97]',
                      (settings?.discountType || 'percentage') === 'percentage'
                        ? 'bg-elec-yellow text-black'
                        : 'bg-white/[0.03] text-white border border-white/[0.08]'
                    )}
                  >
                    <Percent className="h-4 w-4" />
                    Percentage
                  </button>
                  <button
                    type="button"
                    onClick={() => onUpdateSettings({ discountType: 'fixed' })}
                    className={cn(
                      'flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-medium transition-all touch-manipulation active:scale-[0.97]',
                      settings?.discountType === 'fixed'
                        ? 'bg-elec-yellow text-black'
                        : 'bg-white/[0.03] text-white border border-white/[0.08]'
                    )}
                  >
                    <PoundSterling className="h-4 w-4" />
                    Fixed Amount
                  </button>
                </div>
              </div>

              {/* Value Input */}
              <div className="flex items-center gap-3 p-3.5">
                <div className="w-10 h-10 rounded-xl bg-elec-yellow flex items-center justify-center flex-shrink-0">
                  {(settings?.discountType || 'percentage') === 'percentage' ? (
                    <Percent className="h-5 w-5 text-black" />
                  ) : (
                    <PoundSterling className="h-5 w-5 text-black" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <label className="text-[12px] text-white block">
                    {(settings?.discountType || 'percentage') === 'percentage'
                      ? 'Percentage (%)'
                      : 'Amount (£)'}
                  </label>
                  <input
                    type="text"
                    inputMode="decimal"
                    style={darkStyle}
                    placeholder={
                      (settings?.discountType || 'percentage') === 'percentage' ? '20' : '150.00'
                    }
                    className="h-9 px-0 border-0 bg-transparent text-[15px] font-medium text-white placeholder:text-white focus-visible:ring-0 focus-visible:ring-offset-0 outline-none max-w-[120px]"
                    value={settings?.discountValue || ''}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === '' || /^\d*\.?\d*$/.test(value)) {
                        onUpdateSettings({
                          discountValue: value === '' ? 0 : parseFloat(value) || 0,
                        });
                      }
                    }}
                  />
                </div>
              </div>

              {/* Label Input */}
              <div className="flex items-center gap-3 p-3.5">
                <div className="w-10 h-10 rounded-xl bg-elec-yellow flex items-center justify-center flex-shrink-0">
                  <Settings className="h-5 w-5 text-black" />
                </div>
                <div className="flex-1 min-w-0">
                  <label className="text-[12px] text-white block">Label (shown on PDF)</label>
                  <input
                    type="text"
                    style={darkStyle}
                    placeholder="e.g. CIS Deduction (20%)"
                    className="h-9 w-full px-0 border-0 bg-transparent text-[15px] font-medium text-white placeholder:text-white focus-visible:ring-0 focus-visible:ring-offset-0 outline-none"
                    value={settings?.discountLabel || ''}
                    onChange={(e) => onUpdateSettings({ discountLabel: e.target.value })}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Payment Terms Section */}
      <div>
        <p className="text-[13px] font-medium text-white uppercase tracking-wider mb-3">
          Payment Terms
        </p>
        <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] overflow-hidden divide-y divide-white/[0.06]">
          {/* Payment Terms Select */}
          <div className="flex items-center gap-3 p-4">
            <div className="w-11 h-11 rounded-xl bg-elec-yellow flex items-center justify-center flex-shrink-0">
              <CalendarIcon className="h-5 w-5 text-black" />
            </div>
            <div className="flex-1 min-w-0 text-left">
              <label className="text-[12px] text-white block mb-0.5">Payment Terms</label>
              <Select
                value={settings?.paymentTerms || '30 days'}
                onValueChange={(value) => {
                  // Auto-calculate due date based on payment terms
                  const today = new Date();
                  let newDueDate: Date;

                  switch (value) {
                    case 'Due on receipt':
                      newDueDate = today;
                      break;
                    case '7 days':
                      newDueDate = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
                      break;
                    case '14 days':
                      newDueDate = new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000);
                      break;
                    case '30 days':
                      newDueDate = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
                      break;
                    case '60 days':
                      newDueDate = new Date(today.getTime() + 60 * 24 * 60 * 60 * 1000);
                      break;
                    case '90 days':
                      newDueDate = new Date(today.getTime() + 90 * 24 * 60 * 60 * 1000);
                      break;
                    default:
                      newDueDate = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
                  }

                  onUpdateSettings({ paymentTerms: value, dueDate: newDueDate });
                }}
              >
                <SelectTrigger className="h-8 border-0 bg-transparent p-0 text-[16px] font-medium text-white focus:ring-0 [&>svg]:text-white">
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
          </div>

          {/* Due Date Picker */}
          <div className="flex items-center gap-3 p-4">
            <div className="w-11 h-11 rounded-xl bg-white/[0.05] flex items-center justify-center flex-shrink-0">
              <CalendarIcon className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1 min-w-0 text-left">
              <label className="text-[12px] text-white block mb-0.5">Due Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    className={cn(
                      'h-8 p-0 justify-start text-[16px] font-medium hover:bg-transparent',
                      settings?.dueDate ? 'text-white' : 'text-white'
                    )}
                  >
                    {settings?.dueDate
                      ? format(new Date(settings.dueDate), 'PPP')
                      : 'Select due date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto p-0 bg-elec-gray border-white/[0.1]"
                  align="start"
                >
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
        </div>
      </div>

      {/* Bank Details Section */}
      <div>
        <p className="text-[13px] font-medium text-white uppercase tracking-wider mb-3">
          Bank Details
        </p>
        <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] overflow-hidden divide-y divide-white/[0.06]">
          {/* Bank Name */}
          <div className="flex items-center gap-3 p-4">
            <div className="w-11 h-11 rounded-xl bg-elec-yellow flex items-center justify-center flex-shrink-0">
              <Building className="h-5 w-5 text-black" />
            </div>
            <div className="flex-1 min-w-0 text-left">
              <label className="text-[12px] text-white block mb-0.5">Bank Name</label>
              <input
                style={darkStyle}
                value={settings?.bankDetails?.bankName || ''}
                onChange={(e) =>
                  onUpdateSettings({
                    bankDetails: {
                      bankName: e.target.value,
                      accountName: settings?.bankDetails?.accountName || '',
                      accountNumber: settings?.bankDetails?.accountNumber || '',
                      sortCode: settings?.bankDetails?.sortCode || '',
                    },
                  })
                }
                placeholder="e.g., Barclays, HSBC, Lloyds"
                className={inputClassName}
              />
            </div>
          </div>

          {/* Account Name */}
          <div className="flex items-center gap-3 p-4">
            <div className="w-11 h-11 rounded-xl bg-white/[0.05] flex items-center justify-center flex-shrink-0">
              <CreditCard className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1 min-w-0 text-left">
              <label className="text-[12px] text-white block mb-0.5">Account Name</label>
              <input
                style={darkStyle}
                value={settings?.bankDetails?.accountName || ''}
                onChange={(e) =>
                  onUpdateSettings({
                    bankDetails: {
                      bankName: settings?.bankDetails?.bankName || '',
                      accountName: e.target.value,
                      accountNumber: settings?.bankDetails?.accountNumber || '',
                      sortCode: settings?.bankDetails?.sortCode || '',
                    },
                  })
                }
                placeholder="e.g., Smith Electrical Ltd"
                className={inputClassName}
              />
            </div>
          </div>

          {/* Account Number */}
          <div className="flex items-center gap-3 p-4">
            <div className="w-11 h-11 rounded-xl bg-white/[0.05] flex items-center justify-center flex-shrink-0">
              <Hash className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1 min-w-0 text-left">
              <label className="text-[12px] text-white block mb-0.5">Account Number</label>
              <input
                style={darkStyle}
                value={settings?.bankDetails?.accountNumber || ''}
                onChange={(e) => {
                  const numericValue = e.target.value.replace(/\D/g, '').slice(0, 8);
                  onUpdateSettings({
                    bankDetails: {
                      bankName: settings?.bankDetails?.bankName || '',
                      accountName: settings?.bankDetails?.accountName || '',
                      accountNumber: numericValue,
                      sortCode: settings?.bankDetails?.sortCode || '',
                    },
                  });
                }}
                inputMode="numeric"
                placeholder="12345678"
                className={inputClassName}
              />
            </div>
          </div>

          {/* Sort Code */}
          <div className="flex items-center gap-3 p-4">
            <div className="w-11 h-11 rounded-xl bg-white/[0.05] flex items-center justify-center flex-shrink-0">
              <SortAsc className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1 min-w-0 text-left">
              <label className="text-[12px] text-white block mb-0.5">Sort Code</label>
              <input
                style={darkStyle}
                value={settings?.bankDetails?.sortCode || ''}
                onChange={(e) => {
                  let formattedValue = e.target.value.replace(/\D/g, '');
                  if (formattedValue.length > 6) formattedValue = formattedValue.slice(0, 6);
                  if (formattedValue.length > 4)
                    formattedValue = `${formattedValue.slice(0, 2)}-${formattedValue.slice(2, 4)}-${formattedValue.slice(4)}`;
                  else if (formattedValue.length > 2)
                    formattedValue = `${formattedValue.slice(0, 2)}-${formattedValue.slice(2)}`;

                  onUpdateSettings({
                    bankDetails: {
                      bankName: settings?.bankDetails?.bankName || '',
                      accountName: settings?.bankDetails?.accountName || '',
                      accountNumber: settings?.bankDetails?.accountNumber || '',
                      sortCode: formattedValue,
                    },
                  });
                }}
                inputMode="numeric"
                placeholder="12-34-56"
                className={inputClassName}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Invoice Notes Section */}
      <div>
        <p className="text-[13px] font-medium text-white uppercase tracking-wider mb-3">
          Invoice Notes
        </p>
        <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] overflow-hidden">
          <div className="flex items-start gap-3 p-4">
            <div className="w-11 h-11 rounded-xl bg-elec-yellow flex items-center justify-center flex-shrink-0">
              <FileText className="h-5 w-5 text-black" />
            </div>
            <div className="flex-1 min-w-0 text-left">
              <label className="text-[12px] text-white block mb-0.5">Notes (Optional)</label>
              <textarea
                style={darkStyle}
                value={notes || ''}
                onChange={(e) => onUpdateNotes(e.target.value)}
                placeholder="e.g., Thank you for your business. Please ensure payment is made within the agreed terms."
                className={cn(inputClassName, 'min-h-[100px] resize-none')}
                rows={4}
              />
            </div>
          </div>
        </div>
        <p className="text-[11px] text-white mt-2 px-1">
          These notes will appear at the bottom of your invoice
        </p>
      </div>
    </div>
  );
};
