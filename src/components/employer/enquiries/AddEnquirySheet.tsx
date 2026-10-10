/**
 * Add an enquiry by hand (ELE-2094): a phone call, a referral, someone who
 * stopped the van. It goes into the same Enquiries list as everything else.
 */
import { useState } from 'react';
import { toast } from 'sonner';
import { FormSheet } from '@/components/forms/FormSheet';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Field,
  PrimaryButton,
  SecondaryButton,
  inputClass,
  textareaClass,
} from '@/components/employer/editorial';
import { JOB_TYPES, OFFERABLE_JOBS } from '@/hooks/useEnquiries';
import { useAddDoorEnquiry } from '@/hooks/useFrontDoor';
import { cn } from '@/lib/utils';

const EMPTY = {
  name: '',
  phone: '',
  email: '',
  address: '',
  postcode: '',
  job_type: '',
  details: '',
};

const COMMON = [
  'eicr',
  'consumer_unit',
  'ev_charger',
  'fault',
  'sockets_lighting',
  'rewire',
] as const;

export function AddEnquirySheet({
  open,
  onOpenChange,
  onAdded,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdded: (id: string) => void;
}) {
  const add = useAddDoorEnquiry();
  const [f, setF] = useState({ ...EMPTY });
  const set = (k: keyof typeof EMPTY) => (v: string) => setF((p) => ({ ...p, [k]: v }));

  const submit = async () => {
    if (!f.name.trim() && !f.phone.trim() && !f.email.trim()) {
      toast.error('Add a name, phone or email');
      return;
    }
    try {
      const id = await add.mutateAsync({
        ...f,
        name: f.name.trim() || f.phone.trim() || f.email.trim(),
      });
      toast.success('Enquiry added');
      setF({ ...EMPTY });
      onOpenChange(false);
      onAdded(id);
    } catch (e) {
      toast.error('Could not add it', { description: (e as Error).message });
    }
  };

  const chip = (on: boolean) =>
    cn(
      'h-11 rounded-full border px-4 text-[14px] touch-manipulation',
      on
        ? 'border-elec-yellow bg-elec-yellow font-semibold text-black'
        : 'border-white/[0.12] bg-white/[0.06] font-medium text-white'
    );

  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      title="Add enquiry"
      description="A phone call, a referral or anyone who got in touch another way."
      width="wide"
      bodyClassName="pt-1"
      footer={
        <div className="flex gap-2">
          <SecondaryButton onClick={() => onOpenChange(false)} className="flex-1 lg:flex-none">
            Cancel
          </SecondaryButton>
          <PrimaryButton onClick={submit} disabled={add.isPending} className="flex-1">
            {add.isPending ? 'Adding' : 'Add enquiry'}
          </PrimaryButton>
        </div>
      }
    >
      <div className="grid gap-6 lg:grid-cols-2 lg:gap-10">
        <div className="space-y-4">
          <h3 className="text-[15px] font-semibold text-white">Who got in touch</h3>
          <Field label="Name">
            <Input
              className={inputClass}
              value={f.name}
              onChange={(e) => set('name')(e.target.value)}
            />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Phone">
              <Input
                className={inputClass}
                type="tel"
                inputMode="tel"
                value={f.phone}
                onChange={(e) => set('phone')(e.target.value)}
              />
            </Field>
            <Field label="Email">
              <Input
                className={inputClass}
                type="email"
                inputMode="email"
                value={f.email}
                onChange={(e) => set('email')(e.target.value)}
              />
            </Field>
          </div>
          <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_9rem]">
            <Field label="Address">
              <Input
                className={inputClass}
                value={f.address}
                onChange={(e) => set('address')(e.target.value)}
              />
            </Field>
            <Field label="Postcode">
              <Input
                className={inputClass}
                value={f.postcode}
                autoCapitalize="characters"
                onChange={(e) => set('postcode')(e.target.value)}
              />
            </Field>
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="text-[15px] font-semibold text-white">The job</h3>
          <div className="flex flex-wrap gap-2">
            {COMMON.map((k) => (
              <button
                key={k}
                type="button"
                onClick={() => set('job_type')(f.job_type === JOB_TYPES[k] ? '' : JOB_TYPES[k])}
                className={chip(f.job_type === JOB_TYPES[k])}
              >
                {JOB_TYPES[k]}
              </button>
            ))}
          </div>
          <Field label="Or type the job">
            <Input
              className={inputClass}
              value={f.job_type}
              list="enquiry-job-types"
              onChange={(e) => set('job_type')(e.target.value)}
            />
            <datalist id="enquiry-job-types">
              {OFFERABLE_JOBS.map((k) => (
                <option key={k} value={JOB_TYPES[k]} />
              ))}
            </datalist>
          </Field>
          <Field label="What they said">
            <Textarea
              className={textareaClass}
              rows={5}
              value={f.details}
              onChange={(e) => set('details')(e.target.value)}
            />
          </Field>
        </div>
      </div>
    </FormSheet>
  );
}

export default AddEnquirySheet;
