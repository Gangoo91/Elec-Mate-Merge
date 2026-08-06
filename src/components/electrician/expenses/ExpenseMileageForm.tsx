import { useMemo, useState } from 'react';
import { cn } from '@/lib/utils';
import { inputCn, labelCn, textareaCn } from '@/components/forms/fieldStyles';
import { cardCn, eyebrowCn } from '@/components/shared/surfaceStyles';
import {
  DEFAULT_MILEAGE_RATE,
  HIGHER_BAND_MILEAGE_RATE,
  MILEAGE_BAND_THRESHOLD,
  calculateMileageClaim,
} from '@/types/expense';

interface ExpenseMileageFormProps {
  onSave: (data: {
    miles: number;
    from: string;
    to: string;
    date: string;
    description?: string;
  }) => Promise<void>;
  isSubmitting: boolean;
  /**
   * Business miles already claimed in the current tax year. Decides how much of
   * this journey falls in the 45p band and how much in the 25p one.
   */
  milesClaimedThisTaxYear?: number;
}

export function ExpenseMileageForm({
  onSave,
  isSubmitting,
  milesClaimedThisTaxYear = 0,
}: ExpenseMileageFormProps) {
  const [miles, setMiles] = useState<number | ''>('');
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [description, setDescription] = useState('');

  const claim = useMemo(
    () => calculateMileageClaim(typeof miles === 'number' ? miles : 0, milesClaimedThisTaxYear),
    [miles, milesClaimedThisTaxYear]
  );

  const handleSubmit = async () => {
    if (!miles || !fromLocation.trim() || !toLocation.trim()) return;
    await onSave({
      miles: typeof miles === 'number' ? miles : 0,
      from: fromLocation,
      to: toLocation,
      date,
      description: description || undefined,
    });
  };

  const isValid = !!miles && miles > 0 && !!fromLocation.trim() && !!toLocation.trim();
  const straddlesBands = claim.milesAtLowerRate > 0;
  const remainingAtFullRate = Math.max(0, MILEAGE_BAND_THRESHOLD - milesClaimedThisTaxYear);

  return (
    <div className="space-y-5">
      {/* What it is worth */}
      <div className={cn(cardCn, 'p-4 sm:p-5')}>
        <span className={cn(eyebrowCn, 'block')}>Claim</span>
        <p className="mt-1 text-[30px] font-bold leading-none tracking-tight text-elec-yellow tabular-nums">
          £{claim.amount.toFixed(2)}
        </p>
        {/*
          Both bands are shown when a journey crosses the threshold, because the
          alternative — one figure at one rate — is how the old form quietly
          over-claimed for anyone past 10,000 miles.
        */}
        <p className="mt-2 text-[12px] leading-snug text-white">
          {straddlesBands
            ? `${claim.milesAtFullRate} mi at ${DEFAULT_MILEAGE_RATE * 100}p · ${claim.milesAtLowerRate} mi at ${HIGHER_BAND_MILEAGE_RATE * 100}p`
            : `${DEFAULT_MILEAGE_RATE * 100}p per mile`}
        </p>
      </div>

      <div>
        <label className={labelCn} htmlFor="miles">
          Distance (miles)
        </label>
        <input
          id="miles"
          type="number"
          inputMode="decimal"
          step="0.1"
          min="0"
          placeholder="0"
          value={miles}
          onChange={(e) => setMiles(e.target.value ? parseFloat(e.target.value) : '')}
          className={inputCn}
          autoFocus
        />
      </div>

      <div className="grid grid-cols-2 gap-x-6 gap-y-4">
        <div>
          <label className={labelCn} htmlFor="from">
            From
          </label>
          <input
            id="from"
            placeholder="Starting point"
            value={fromLocation}
            onChange={(e) => setFromLocation(e.target.value)}
            className={inputCn}
          />
        </div>
        <div>
          <label className={labelCn} htmlFor="to">
            To
          </label>
          <input
            id="to"
            placeholder="Destination"
            value={toLocation}
            onChange={(e) => setToLocation(e.target.value)}
            className={inputCn}
          />
        </div>
      </div>

      <div>
        <label className={labelCn} htmlFor="mileage-date">
          Date
        </label>
        <input
          id="mileage-date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className={inputCn}
        />
      </div>

      <div>
        <label className={labelCn} htmlFor="mileage-description">
          Notes
        </label>
        <textarea
          id="mileage-description"
          placeholder="Site visit, supplier run"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={textareaCn}
        />
      </div>

      <p className="text-[12px] leading-snug text-white">
        HMRC allows {DEFAULT_MILEAGE_RATE * 100}p per mile for the first{' '}
        {MILEAGE_BAND_THRESHOLD.toLocaleString('en-GB')} business miles in a tax year, then{' '}
        {HIGHER_BAND_MILEAGE_RATE * 100}p.{' '}
        {milesClaimedThisTaxYear > 0
          ? `You have claimed ${Math.round(milesClaimedThisTaxYear).toLocaleString('en-GB')} miles so far this tax year — ${Math.round(remainingAtFullRate).toLocaleString('en-GB')} left at the higher rate.`
          : 'This is worked out for you.'}
      </p>

      <button
        type="button"
        onClick={handleSubmit}
        disabled={!isValid || isSubmitting}
        className="h-12 w-full rounded-xl bg-elec-yellow text-[15px] font-semibold text-black transition-colors touch-manipulation active:scale-[0.98] disabled:opacity-50"
      >
        {isSubmitting ? 'Saving…' : `Log £${claim.amount.toFixed(2)} mileage`}
      </button>
    </div>
  );
}
