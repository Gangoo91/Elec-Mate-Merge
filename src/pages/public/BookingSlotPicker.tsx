/**
 * BookingSlotPicker — public route reached after a quote is accepted
 * (and deposit paid, when one is required). Shows the next 14 days of
 * available slots from the sparky's calendar, with a 10-minute hold while
 * the client confirms. ELE-955.
 *
 * URL pattern: /book/:quoteId
 *
 * No auth — the quote ID is the auth surface (only used after acceptance).
 */
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Calendar, Check, Clock, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';

interface Slot {
  start: string;
  end: string;
}

interface SlotsByDay {
  date: string;
  label: string;
  slots: Slot[];
}

const SLOT_TIME = (iso: string) =>
  new Date(iso).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

const DAY_LABEL = (iso: string) =>
  new Date(iso).toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

export default function BookingSlotPicker() {
  const { quoteId } = useParams<{ quoteId: string }>();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [holdId, setHoldId] = useState<string | null>(null);
  const [holdExpiresAt, setHoldExpiresAt] = useState<string | null>(null);
  const [confirming, setConfirming] = useState(false);
  const [confirmed, setConfirmed] = useState<{ start: string; end: string } | null>(null);

  // Load available slots on mount
  useEffect(() => {
    if (!quoteId) return;
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        const { data, error: fnErr } = await supabase.functions.invoke(
          'marketplace-available-slots',
          { method: 'GET', body: undefined, headers: {}, },
        );
        // The edge fn is GET — we need to call by URL with query param instead
        // since supabase.functions.invoke is POST-by-default. Use fetch directly.
        if (fnErr) throw fnErr;
        if (cancelled) return;
        setSlots(((data as { slots?: Slot[] })?.slots) || []);
      } catch (_err) {
        // Fallback: direct fetch (GET with query string)
        try {
          const url = `${(import.meta.env.VITE_SUPABASE_URL as string) || ''}/functions/v1/marketplace-available-slots?quote_id=${encodeURIComponent(quoteId)}`;
          const res = await fetch(url, {
            headers: { 'Content-Type': 'application/json' },
          });
          const json = await res.json();
          if (!res.ok) throw new Error(json.error || 'Failed to load slots');
          if (!cancelled) setSlots(json.slots || []);
        } catch (e) {
          if (!cancelled) setError((e as Error).message || 'Could not load times');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [quoteId]);

  const slotsByDay = useMemo<SlotsByDay[]>(() => {
    const grouped = new Map<string, Slot[]>();
    for (const s of slots) {
      const dayKey = s.start.slice(0, 10);
      if (!grouped.has(dayKey)) grouped.set(dayKey, []);
      grouped.get(dayKey)!.push(s);
    }
    return Array.from(grouped.entries()).map(([date, list]) => ({
      date,
      label: DAY_LABEL(list[0].start),
      slots: list,
    }));
  }, [slots]);

  const handleSelect = async (slot: Slot) => {
    if (!quoteId) return;
    setSelectedSlot(slot);
    setError(null);
    try {
      const { data, error: fnErr } = await supabase.functions.invoke(
        'marketplace-hold-slot',
        {
          method: 'POST',
          body: { quote_id: quoteId, slot_start: slot.start, slot_end: slot.end },
        }
      );
      if (fnErr) throw fnErr;
      const { hold_id, expires_at } = data as { hold_id: string; expires_at: string };
      setHoldId(hold_id);
      setHoldExpiresAt(expires_at);
    } catch (e) {
      setError((e as Error).message || 'Could not hold this slot. Pick another.');
      setSelectedSlot(null);
    }
  };

  const handleConfirm = async () => {
    if (!holdId) return;
    setConfirming(true);
    setError(null);
    try {
      const { data, error: fnErr } = await supabase.functions.invoke(
        'marketplace-confirm-booking',
        { method: 'POST', body: { hold_id: holdId } }
      );
      if (fnErr) throw fnErr;
      const r = data as { slot_start: string; slot_end: string };
      setConfirmed({ start: r.slot_start, end: r.slot_end });
    } catch (e) {
      setError((e as Error).message || 'Confirmation failed. Try again.');
    } finally {
      setConfirming(false);
    }
  };

  const remainingSeconds = useMemo(() => {
    if (!holdExpiresAt) return 0;
    return Math.max(0, Math.floor((new Date(holdExpiresAt).getTime() - Date.now()) / 1000));
  }, [holdExpiresAt]);
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (!holdExpiresAt || confirmed) return;
    const i = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(i);
  }, [holdExpiresAt, confirmed]);
  void tick;

  if (confirmed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl p-12 max-w-lg w-full text-center shadow-2xl">
          <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="h-10 w-10 text-white stroke-[3]" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-3">You're booked!</h1>
          <p className="text-slate-600 text-lg mb-2">
            {new Date(confirmed.start).toLocaleDateString('en-GB', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
            })}
          </p>
          <p className="text-slate-500">
            {SLOT_TIME(confirmed.start)} – {SLOT_TIME(confirmed.end)}
          </p>
          <p className="text-sm text-slate-500 mt-6">
            A confirmation email is on its way with calendar invite.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Helmet>
        <title>Book your slot · Elec-Mate</title>
      </Helmet>
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-elec-yellow/15 rounded-full mb-4">
            <Calendar className="h-7 w-7 text-elec-yellow" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Pick a time</h1>
          <p className="text-slate-600">
            Choose when works best — your booking will be confirmed instantly.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-slate-400 mx-auto" />
            <p className="text-slate-500 mt-3">Loading available times…</p>
          </div>
        ) : error && !selectedSlot ? (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
            <p className="text-red-700 font-medium">{error}</p>
          </div>
        ) : slotsByDay.length === 0 ? (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-8 text-center">
            <p className="text-amber-900 font-semibold mb-2">No availability in next 14 days</p>
            <p className="text-amber-800 text-sm">
              We'll be in touch shortly to arrange a slot that works for you.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {slotsByDay.map((day) => (
              <div
                key={day.date}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden"
              >
                <div className="px-5 py-4 border-b border-slate-100 bg-slate-50">
                  <h2 className="text-slate-900 font-semibold">{day.label}</h2>
                </div>
                <div className="p-4 grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {day.slots.map((slot) => {
                    const isSelected =
                      selectedSlot?.start === slot.start && selectedSlot?.end === slot.end;
                    return (
                      <button
                        key={slot.start}
                        type="button"
                        onClick={() => handleSelect(slot)}
                        className={cn(
                          'h-12 rounded-xl text-sm font-medium border transition-all',
                          isSelected
                            ? 'bg-elec-yellow text-black border-elec-yellow'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-slate-400'
                        )}
                      >
                        {SLOT_TIME(slot.start)}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedSlot && holdId && !confirmed && (
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-2xl">
            <div className="max-w-2xl mx-auto p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-sm text-slate-500">You picked</p>
                  <p className="font-semibold text-slate-900">
                    {DAY_LABEL(selectedSlot.start)} · {SLOT_TIME(selectedSlot.start)}
                  </p>
                </div>
                {remainingSeconds > 0 && (
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{remainingSeconds}s to confirm</span>
                  </div>
                )}
              </div>
              {error && <p className="text-sm text-red-600 mb-2">{error}</p>}
              <button
                type="button"
                onClick={handleConfirm}
                disabled={confirming || remainingSeconds <= 0}
                className="w-full h-12 bg-elec-yellow text-black font-semibold rounded-xl hover:bg-elec-yellow/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {confirming ? 'Confirming…' : 'Confirm booking'}
              </button>
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mt-8 mx-auto block text-sm text-slate-500 hover:text-slate-700"
        >
          Cancel and go back
        </button>
      </div>
    </div>
  );
}
