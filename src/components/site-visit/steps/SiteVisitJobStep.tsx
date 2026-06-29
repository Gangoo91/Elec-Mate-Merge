import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, User, Check, Clock, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { PlacesAutocomplete } from '@/components/ui/PlacesAutocomplete';
import { useCustomers, type Customer } from '@/hooks/inspection/useCustomers';
import { useSiteVisitStorage } from '@/hooks/useSiteVisitStorage';
import { SaveCustomerPrompt } from '@/components/electrician/shared/SaveCustomerPrompt';
import type { SiteVisit, PropertyType } from '@/types/siteVisit';

interface PreviousVisitResult {
  id: string;
  propertyAddress: string;
  status: string;
  updatedAt: string;
}

interface SiteVisitJobStepProps {
  visit: SiteVisit;
  onUpdateClient: (
    updates: Partial<
      Pick<SiteVisit, 'customerId' | 'customerName' | 'customerEmail' | 'customerPhone'>
    >
  ) => void;
  onUpdateProperty: (
    updates: Partial<
      Pick<
        SiteVisit,
        'propertyAddress' | 'propertyPostcode' | 'propertyType' | 'accessNotes' | 'scheduledAt'
      >
    >
  ) => void;
}

const PROPERTY_TYPES: { value: PropertyType; label: string }[] = [
  { value: 'residential', label: 'Residential' },
  { value: 'commercial', label: 'Commercial' },
  { value: 'industrial', label: 'Industrial' },
];

const inputClass =
  'h-11 touch-manipulation rounded-xl border-white/[0.12] bg-[hsl(0_0%_9%)] text-base text-white placeholder:text-white/40 focus:border-elec-yellow/50 focus:ring-elec-yellow/20';

/** ISO string → the local `YYYY-MM-DDTHH:mm` a datetime-local input expects. */
const isoToLocalInput = (iso?: string): string => {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

/** datetime-local value (local time) → ISO string for storage. */
const localInputToIso = (value: string): string | undefined => {
  if (!value) return undefined;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? undefined : d.toISOString();
};

/**
 * Step 01 · Job — who it's for and where it is. Merges the old Client +
 * Property steps so a repeat job is two taps: pick the customer (their
 * address pre-fills) and confirm.
 */
export const SiteVisitJobStep = ({
  visit,
  onUpdateClient,
  onUpdateProperty,
}: SiteVisitJobStepProps) => {
  const navigate = useNavigate();
  const { searchPreviousVisits, updateScheduledAt } = useSiteVisitStorage();
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [previousVisits, setPreviousVisits] = useState<PreviousVisitResult[]>([]);
  const searchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { customers, isLoading } = useCustomers({ searchTerm, pageSize: 10 });

  // New client form state
  const [newName, setNewName] = useState(visit.customerName || '');
  const [newEmail, setNewEmail] = useState(visit.customerEmail || '');
  const [newPhone, setNewPhone] = useState(visit.customerPhone || '');
  const [showSavePrompt, setShowSavePrompt] = useState(false);
  const [savePromptDismissed, setSavePromptDismissed] = useState(false);

  // A resumed cloud draft arrives with a name already captured — show it as
  // the editable form rather than an empty search
  const hasExistingClient = Boolean(visit.customerName && !selectedCustomer && !showCreate);
  useEffect(() => {
    if (hasExistingClient) setShowCreate(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelectCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    onUpdateClient({
      customerId: customer.id,
      customerName: customer.name,
      customerEmail: customer.email,
      customerPhone: customer.phone,
    });
    if (customer.address) {
      onUpdateProperty({ propertyAddress: customer.address });
    }
    setSearchTerm('');
  };

  const handleCreateNew = () => {
    setShowCreate(true);
    setSelectedCustomer(null);
    onUpdateClient({
      customerId: undefined,
      customerName: newName,
      customerEmail: newEmail,
      customerPhone: newPhone,
    });
  };

  // Sync inline form back to visit
  useEffect(() => {
    if (showCreate) {
      onUpdateClient({
        customerName: newName,
        customerEmail: newEmail,
        customerPhone: newPhone,
      });
      if (newName.trim() && !savePromptDismissed) {
        setShowSavePrompt(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newName, newEmail, newPhone, showCreate]);

  // Debounced previous-visit lookup on address changes
  useEffect(() => {
    if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
    const query = visit.propertyAddress || '';
    if (query.trim().length < 3) {
      setPreviousVisits([]);
      return;
    }
    searchTimerRef.current = setTimeout(async () => {
      const results = await searchPreviousVisits(query);
      setPreviousVisits(results.filter((r) => r.id !== visit.id));
    }, 300);
    return () => {
      if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
    };
  }, [visit.propertyAddress, visit.id, searchPreviousVisits]);

  const handlePlaceSelect = useCallback(
    (place: { address: string; postcode?: string }) => {
      const updates: Partial<Pick<SiteVisit, 'propertyAddress' | 'propertyPostcode'>> = {
        propertyAddress: place.address,
      };
      if (place.postcode) {
        updates.propertyPostcode = place.postcode.toUpperCase();
      }
      onUpdateProperty(updates);
    },
    [onUpdateProperty]
  );

  return (
    <div className="space-y-7">
      {/* ── 1 · CLIENT ─────────────────────────────────────────── */}
      <section className="space-y-3">
        <div className="flex items-baseline gap-2">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/80">
            1
          </span>
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/80">
            · CLIENT
          </span>
        </div>

        {selectedCustomer && !showCreate && (
          <div className="relative flex items-center gap-3 overflow-hidden rounded-2xl border border-elec-yellow/25 bg-gradient-to-r from-elec-yellow/[0.06] to-transparent p-4">
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/0 via-elec-yellow/80 to-elec-yellow/0"
            />
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-elec-yellow/30 bg-elec-yellow/[0.12]">
              <Check className="h-4 w-4 text-elec-yellow" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[15px] font-medium text-white">{selectedCustomer.name}</p>
              <p className="truncate text-[12px] text-white/65">
                {selectedCustomer.email || selectedCustomer.phone || 'No contact details'}
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSelectedCustomer(null);
                onUpdateClient({
                  customerId: undefined,
                  customerName: '',
                  customerEmail: '',
                  customerPhone: '',
                });
              }}
              className="h-9 rounded-full text-[12px] text-white/65 hover:text-white touch-manipulation"
            >
              Change
            </Button>
          </div>
        )}

        {!selectedCustomer && !showCreate && (
          <div className="space-y-3">
            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                <Input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search name, phone or email"
                  className={cn(inputClass, 'pl-10')}
                  autoCapitalize="off"
                  autoComplete="off"
                  enterKeyHint="search"
                />
              </div>
              <Button
                onClick={handleCreateNew}
                variant="outline"
                className="h-11 touch-manipulation border-dashed border-white/20 text-white hover:border-elec-yellow hover:text-elec-yellow sm:px-5"
              >
                <Plus className="mr-2 h-4 w-4" />
                New client
              </Button>
            </div>
            {searchTerm && (
              <div className="max-h-[300px] space-y-1 overflow-y-auto">
                {isLoading && (
                  <div className="flex items-center justify-center py-4">
                    <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-elec-yellow" />
                  </div>
                )}
                {!isLoading && customers.length === 0 && (
                  <p className="py-4 text-center text-sm text-white/60">
                    No customers found — add them below
                  </p>
                )}
                {customers.map((customer) => (
                  <button
                    key={customer.id}
                    onClick={() => handleSelectCustomer(customer)}
                    className="flex w-full items-center gap-3 rounded-xl p-3 text-left transition-colors touch-manipulation hover:bg-white/[0.04] active:bg-white/[0.06]"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.06]">
                      <User className="h-4 w-4 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-white">{customer.name}</p>
                      <p className="truncate text-xs text-white/60">
                        {customer.email || customer.phone || 'No contact details'}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {showCreate && (
          <div className="space-y-3 rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_12%)] p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-[14px] font-semibold tracking-tight text-white">New client</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setShowCreate(false);
                  setNewName('');
                  setNewEmail('');
                  setNewPhone('');
                }}
                className="h-9 text-xs text-white/65 touch-manipulation"
              >
                Search instead
              </Button>
            </div>
            <div className="space-y-1">
              <label className="text-[11.5px] font-medium text-white/65">Name *</label>
              <Input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Client name"
                className={inputClass}
                autoCapitalize="words"
                autoComplete="name"
                enterKeyHint="next"
              />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1">
                <label className="text-[11.5px] font-medium text-white/65">Phone</label>
                <Input
                  type="tel"
                  inputMode="tel"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  placeholder="07xxx xxxxxx"
                  className={inputClass}
                  autoCapitalize="off"
                  autoComplete="tel"
                  enterKeyHint="next"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11.5px] font-medium text-white/65">Email</label>
                <Input
                  type="email"
                  inputMode="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="client@email.com"
                  className={inputClass}
                  autoCapitalize="off"
                  autoComplete="email"
                  enterKeyHint="done"
                />
              </div>
            </div>
            {showSavePrompt && newName.trim() && !visit.customerId && (
              <SaveCustomerPrompt
                client={{
                  name: newName,
                  email: newEmail || undefined,
                  phone: newPhone || undefined,
                }}
                onSaved={(savedCustomerId) => {
                  setShowSavePrompt(false);
                  onUpdateClient({ customerId: savedCustomerId });
                }}
                onDismiss={() => {
                  setShowSavePrompt(false);
                  setSavePromptDismissed(true);
                }}
              />
            )}
          </div>
        )}
      </section>

      {/* ── 2 · PROPERTY ───────────────────────────────────────── */}
      <section className="space-y-3">
        <div className="flex items-baseline gap-2">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/80">
            2
          </span>
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/80">
            · PROPERTY
          </span>
        </div>

        <div className="space-y-1">
          <label className="text-[11.5px] font-medium text-white/65">Address *</label>
          <PlacesAutocomplete
            value={visit.propertyAddress || ''}
            onChange={(value) => onUpdateProperty({ propertyAddress: value })}
            onPlaceSelect={handlePlaceSelect}
            placeholder="Start typing an address…"
            className={inputClass}
          />

          {previousVisits.length > 0 && (
            <div className="mt-1 overflow-hidden rounded-xl border border-white/10">
              <div className="bg-white/[0.02] px-3 py-1.5">
                <p className="text-[11px] font-medium text-white/70">
                  Previous visits at this address
                </p>
              </div>
              <div className="divide-y divide-white/[0.04]">
                {previousVisits.map((pv) => (
                  <button
                    key={pv.id}
                    // In-app navigation — opening a new tab on mobile silently
                    // abandoned the current draft (audit P1). Cloud sync keeps
                    // this draft safe; resume it from the hub.
                    onClick={() => navigate(`/electrician/site-visit/${pv.id}`)}
                    className="flex min-h-[44px] w-full items-center gap-2 px-3 py-2 text-left touch-manipulation active:bg-white/[0.05]"
                  >
                    <Clock className="h-3.5 w-3.5 flex-shrink-0 text-white/60" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs text-white">{pv.propertyAddress}</p>
                      <p className="text-[11px] text-white/60">
                        {new Date(pv.updatedAt).toLocaleDateString('en-GB')} ·{' '}
                        {pv.status.replace('_', ' ')}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="grid gap-3 sm:grid-cols-[160px_1fr]">
          <div className="space-y-1">
            <label className="text-[11.5px] font-medium text-white/65">Postcode</label>
            <Input
              value={visit.propertyPostcode || ''}
              // Uppercase on blur, not per keystroke — mid-input casing makes
              // the iOS keyboard flicker (audit P1)
              onChange={(e) => onUpdateProperty({ propertyPostcode: e.target.value })}
              onBlur={(e) =>
                onUpdateProperty({ propertyPostcode: e.target.value.toUpperCase().trim() })
              }
              placeholder="AB1 2CD"
              className={cn(inputClass, 'uppercase')}
              maxLength={8}
              autoCapitalize="characters"
              autoComplete="postal-code"
              enterKeyHint="next"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11.5px] font-medium text-white/65">Property type</label>
            <div className="grid grid-cols-3 gap-2">
              {PROPERTY_TYPES.map((pt) => {
                const active = visit.propertyType === pt.value;
                return (
                  <button
                    key={pt.value}
                    type="button"
                    onClick={() => onUpdateProperty({ propertyType: pt.value })}
                    className={cn(
                      'h-11 rounded-xl border text-[13px] font-medium transition-colors touch-manipulation active:scale-[0.98]',
                      active
                        ? 'border-elec-yellow/60 bg-elec-yellow/[0.12] text-elec-yellow'
                        : 'border-white/[0.1] bg-white/[0.04] text-white/75 hover:bg-white/[0.08]'
                    )}
                  >
                    {pt.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[11.5px] font-medium text-white/65">Access notes</label>
          <Textarea
            value={visit.accessNotes || ''}
            onChange={(e) => onUpdateProperty({ accessNotes: e.target.value })}
            placeholder="Gate code, parking, key safe location…"
            className="min-h-[80px] touch-manipulation rounded-xl border-white/[0.12] bg-[hsl(0_0%_9%)] text-base text-white placeholder:text-white/40 focus:border-elec-yellow/50 focus:ring-elec-yellow/20"
            autoCapitalize="sentences"
            spellCheck
            enterKeyHint="done"
          />
        </div>

        {/* Optional booking — when this lands on the calendar. Persisted on its
            own update (the atomic save doesn't carry it); a blank value clears
            it. The row exists once the visit has cloud-synced its first edit. */}
        <div className="space-y-1">
          <label className="text-[11.5px] font-medium text-white/65">
            Scheduled date &amp; time{' '}
            <span className="font-normal text-white/40">(optional)</span>
          </label>
          <Input
            type="datetime-local"
            value={isoToLocalInput(visit.scheduledAt)}
            onChange={(e) => {
              const iso = localInputToIso(e.target.value);
              onUpdateProperty({ scheduledAt: iso });
              if (visit.id) void updateScheduledAt(visit.id, iso ?? null);
            }}
            className={cn(inputClass, 'block w-full')}
          />
          <p className="text-[11px] text-white/45">
            Book this visit to show it on your calendar. Leave blank to skip.
          </p>
        </div>
      </section>
    </div>
  );
};
