import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Car, Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { DEFAULT_MILEAGE_RATE } from '@/types/expense';

interface ExpenseMileageFormProps {
  onSave: (data: {
    miles: number;
    from: string;
    to: string;
    date: string;
    description?: string;
  }) => Promise<void>;
  isSubmitting: boolean;
}

export function ExpenseMileageForm({ onSave, isSubmitting }: ExpenseMileageFormProps) {
  const [miles, setMiles] = useState<number | ''>('');
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [description, setDescription] = useState('');
  const [calculatedAmount, setCalculatedAmount] = useState(0);

  // Calculate amount when miles change
  useEffect(() => {
    const numMiles = typeof miles === 'number' ? miles : 0;
    setCalculatedAmount(Math.round(numMiles * DEFAULT_MILEAGE_RATE * 100) / 100);
  }, [miles]);

  const handleSubmit = async () => {
    if (!miles || !fromLocation || !toLocation) return;

    await onSave({
      miles: typeof miles === 'number' ? miles : 0,
      from: fromLocation,
      to: toLocation,
      date,
      description: description || undefined,
    });
  };

  const isValid = miles && miles > 0 && fromLocation.trim() && toLocation.trim();

  return (
    <div className="space-y-4">
      {/* Amount Preview */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20 rounded-xl p-4 text-center"
      >
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-1">
          <Calculator className="h-4 w-4" />
          <span>Calculated at {DEFAULT_MILEAGE_RATE * 100}p per mile</span>
        </div>
        <p className="text-3xl font-bold text-green-400">
          £{calculatedAmount.toFixed(2)}
        </p>
      </motion.div>

      {/* Miles Input */}
      <div className="space-y-2">
        <Label htmlFor="miles">Distance (miles)</Label>
        <div className="relative">
          <Car className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            id="miles"
            type="number"
            inputMode="decimal"
            step="0.1"
            min="0"
            placeholder="0"
            value={miles}
            onChange={(e) => setMiles(e.target.value ? parseFloat(e.target.value) : '')}
            className="h-14 text-2xl font-semibold pl-12 touch-manipulation"
            autoFocus
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            miles
          </span>
        </div>
      </div>

      {/* From Location */}
      <div className="space-y-2">
        <Label htmlFor="from">From</Label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-green-400" />
          <Input
            id="from"
            placeholder="Starting location"
            value={fromLocation}
            onChange={(e) => setFromLocation(e.target.value)}
            className="h-11 pl-10 touch-manipulation"
          />
        </div>
      </div>

      {/* To Location */}
      <div className="space-y-2">
        <Label htmlFor="to">To</Label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-red-400" />
          <Input
            id="to"
            placeholder="Destination"
            value={toLocation}
            onChange={(e) => setToLocation(e.target.value)}
            className="h-11 pl-10 touch-manipulation"
          />
        </div>
      </div>

      {/* Date */}
      <div className="space-y-2">
        <Label htmlFor="mileage-date">Date</Label>
        <Input
          id="mileage-date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="h-11 touch-manipulation"
        />
      </div>

      {/* Description (optional) */}
      <div className="space-y-2">
        <Label htmlFor="mileage-description">Notes (optional)</Label>
        <Textarea
          id="mileage-description"
          placeholder="e.g. Site visit to customer, supplier run"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="touch-manipulation min-h-[80px]"
        />
      </div>

      {/* HMRC Info */}
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg px-3 py-2">
        <p className="text-xs text-blue-400">
          <strong>HMRC Rate:</strong> 45p per mile for the first 10,000 miles, then 25p per mile.
          This form uses the 45p rate - adjust manually if needed.
        </p>
      </div>

      {/* Submit Button */}
      <Button
        onClick={handleSubmit}
        disabled={!isValid || isSubmitting}
        className="w-full h-12 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation active:scale-[0.98]"
      >
        {isSubmitting ? 'Saving...' : `Log £${calculatedAmount.toFixed(2)} Mileage`}
      </Button>
    </div>
  );
}
