/**
 * ELE-1994: "What we bid for", set once. Matching tenders then arrive on the
 * Tenders page, on Overview and in a Monday digest.
 */
import { useEffect, useRef, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { FormSheet } from '@/components/forms/FormSheet';
import { toast } from '@/hooks/use-toast';
import {
  FormCard,
  Field,
  OptionTile,
  PrimaryButton,
  SecondaryButton,
  inputClass,
} from '@/components/employer/editorial';
import {
  TENDER_REGIONS,
  TENDER_WORK_TYPES,
  useSaveTenderCriteria,
  type TenderCriteria,
} from '@/hooks/useTenderMatches';

const RADII = [10, 25, 50, 100];
const VALUE_BANDS: { label: string; min: number; max: number }[] = [
  { label: 'Any size', min: 0, max: 0 },
  { label: 'Up to £50k', min: 0, max: 50_000 },
  { label: '£10k to £250k', min: 10_000, max: 250_000 },
  { label: '£50k to £1m', min: 50_000, max: 1_000_000 },
  { label: '£250k and up', min: 250_000, max: 0 },
];
const ACCREDITATIONS = [
  'NICEIC',
  'NAPIT',
  'ELECSA',
  'CHAS',
  'Constructionline',
  'SafeContractor',
  'SMAS',
  'ISO 9001',
];

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initial?: TenderCriteria | null;
}

export function TenderCriteriaSheet({ open, onOpenChange, initial }: Props) {
  const save = useSaveTenderCriteria();
  const [postcode, setPostcode] = useState('');
  const [radius, setRadius] = useState(25);
  const [regions, setRegions] = useState<string[]>([]);
  const [types, setTypes] = useState<string[]>(['electrical']);
  const [band, setBand] = useState(0);
  const [accs, setAccs] = useState<string[]>([]);
  const [alerts, setAlerts] = useState(true);

  // Fill the form when the sheet opens (or when the saved criteria first
  // arrive), never on a background refetch while someone is typing.
  const filledFor = useRef<string | null>(null);
  useEffect(() => {
    if (!open) {
      filledFor.current = null;
      return;
    }
    const key = initial ? 'saved' : 'empty';
    if (filledFor.current === key || filledFor.current === 'saved') return;
    filledFor.current = key;
    setPostcode(initial?.base_postcode ?? '');
    setRadius(initial?.search_radius_miles ?? 25);
    setRegions(initial?.regions ?? []);
    setTypes(initial?.categories?.length ? initial.categories : ['electrical']);
    const i = VALUE_BANDS.findIndex(
      (b) => b.min === Number(initial?.min_value ?? 0) && b.max === Number(initial?.max_value ?? 0)
    );
    setBand(i >= 0 ? i : 0);
    setAccs(initial?.accreditations ?? []);
    setAlerts(initial ? (initial.email_alerts ?? true) || (initial.push_alerts ?? true) : true);
  }, [open, initial]);

  const toggle = (list: string[], v: string) =>
    list.includes(v) ? list.filter((x) => x !== v) : [...list, v];

  const pickType = (k: string) => {
    if (k === 'electrical') return setTypes(['electrical']);
    const next = toggle(
      types.filter((t) => t !== 'electrical'),
      k
    );
    setTypes(next.length ? next : ['electrical']);
  };

  const onSave = async () => {
    try {
      await save.mutateAsync({
        base_postcode: postcode.trim() || null,
        search_radius_miles: radius,
        regions,
        categories: types,
        min_value: VALUE_BANDS[band].min,
        max_value: VALUE_BANDS[band].max,
        accreditations: accs,
        email_alerts: alerts,
        push_alerts: alerts,
      });
      toast({ title: 'Saved', description: 'Matching tenders now show on Tenders and Overview.' });
      onOpenChange(false);
    } catch (e) {
      toast({
        title: 'Not saved',
        description: e instanceof Error ? e.message : 'Try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      width="wide"
      title="What we bid for"
      description="Set this once. New public tenders that fit arrive on this page, on Overview and in a Monday round-up."
      footer={
        <div className="flex gap-2">
          <SecondaryButton onClick={() => onOpenChange(false)} fullWidth>
            Cancel
          </SecondaryButton>
          <PrimaryButton onClick={onSave} disabled={save.isPending} fullWidth>
            {save.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            Save
          </PrimaryButton>
        </div>
      }
      bodyClassName="grid gap-4 lg:grid-cols-2 lg:items-start"
    >
      <div className="space-y-4">
        <FormCard eyebrow="Where">
          <Field
            label="Base postcode"
            hint="Tenders within the distance below. Leave it blank to go by region only, or leave both blank for anywhere in the UK."
          >
            <Input
              value={postcode}
              onChange={(e) => setPostcode(e.target.value.toUpperCase())}
              placeholder="e.g. M1 2AB"
              className={inputClass}
              autoCapitalize="characters"
            />
          </Field>
          <div className="grid grid-cols-4 gap-2">
            {RADII.map((r) => (
              <OptionTile
                key={r}
                selected={radius === r}
                onClick={() => setRadius(r)}
                label={`${r} mi`}
              />
            ))}
          </div>
          <Field label="Also any tender in these regions">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {TENDER_REGIONS.map((r) => (
                <OptionTile
                  key={r.key}
                  selected={regions.includes(r.key)}
                  onClick={() => setRegions(toggle(regions, r.key))}
                  label={r.label}
                />
              ))}
            </div>
          </Field>
        </FormCard>
      </div>

      <div className="space-y-4">
        <FormCard eyebrow="Work">
          <div className="grid grid-cols-2 gap-2">
            {TENDER_WORK_TYPES.map((t) => (
              <OptionTile
                key={t.key}
                selected={types.includes(t.key)}
                onClick={() => pickType(t.key)}
                label={t.label}
              />
            ))}
          </div>
        </FormCard>

        <FormCard eyebrow="Contract size">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {VALUE_BANDS.map((b, i) => (
              <OptionTile
                key={b.label}
                selected={band === i}
                onClick={() => setBand(i)}
                label={b.label}
              />
            ))}
          </div>
          <p className="text-[12px] text-white">
            Most notices don't publish a value. Those always show so you can judge them.
          </p>
        </FormCard>

        <FormCard eyebrow="Accreditations you hold">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {ACCREDITATIONS.map((a) => (
              <OptionTile
                key={a}
                selected={accs.includes(a)}
                onClick={() => setAccs(toggle(accs, a))}
                label={a}
              />
            ))}
          </div>
          <p className="text-[12px] text-white">
            Used to fill the pre-qualification answers on a bid.
          </p>
        </FormCard>

        <FormCard eyebrow="Monday round-up">
          <label className="flex items-center justify-between gap-3 min-h-[44px] touch-manipulation">
            <span className="text-[13.5px] text-white">
              Tell me when new matches arrive (notification and push)
            </span>
            <Switch checked={alerts} onCheckedChange={setAlerts} />
          </label>
        </FormCard>
      </div>
    </FormSheet>
  );
}
