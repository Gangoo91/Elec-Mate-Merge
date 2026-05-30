import { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Eyebrow } from '@/components/apprentice-hub/portfolio/PortfolioPrimitives';

interface AddAssessmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onAddAssessment: (assessment: any) => void;
}

// Common electrical assessments — quick-fill templates.
const REAL_ASSESSMENTS = [
  { title: 'BS 7671 18th Edition Wiring Regulations', unitCode: 'C&G 2382-18', type: 'Written' },
  { title: 'Inspection & Testing of Electrical Installations', unitCode: 'C&G 2391-52', type: 'Practical' },
  { title: 'Initial Verification and Certification', unitCode: 'C&G 2391-10', type: 'Written' },
  { title: 'Safe Isolation of Electrical Circuits', unitCode: 'C&G 2391-50', type: 'Practical' },
  { title: 'Electrical Installation Work (Construction)', unitCode: 'BTEC Unit 1', type: 'Portfolio' },
  { title: 'Electrical Systems Design', unitCode: 'BTEC Unit 5', type: 'Written' },
  { title: 'Motor Control Circuits', unitCode: 'NVQ Unit 3.1', type: 'Practical' },
  { title: 'Emergency Lighting Systems', unitCode: 'C&G 2391-651', type: 'Written' },
  { title: 'Fire Alarm Systems', unitCode: 'C&G 2391-661', type: 'Written' },
  { title: 'Solar PV Installation', unitCode: 'C&G 2399', type: 'Practical' },
  { title: 'PAT Testing', unitCode: 'C&G 2377-22', type: 'Practical' },
  { title: 'Electrical Fault Diagnosis', unitCode: 'C&G 2391-53', type: 'Practical' },
  { title: 'Electrical Installation Design', unitCode: 'C&G 2396', type: 'Written' },
];

const ASSESSMENT_TYPES = [
  { value: 'Written', label: 'Written examination' },
  { value: 'Practical', label: 'Practical assessment' },
  { value: 'Portfolio', label: 'Portfolio assessment' },
  { value: 'Observation', label: 'Workplace observation' },
  { value: 'Oral', label: 'Oral assessment' },
  { value: 'Project', label: 'Project work' },
];

const CUSTOM = '__custom__';

const AddAssessmentDialog = ({ open, onOpenChange, onAddAssessment }: AddAssessmentDialogProps) => {
  const [template, setTemplate] = useState('');
  const [title, setTitle] = useState('');
  const [unitCode, setUnitCode] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  const reset = () => {
    setTemplate('');
    setTitle('');
    setUnitCode('');
    setType('');
    setDescription('');
    setDueDate('');
  };

  const applyTemplate = (t: string) => {
    setTemplate(t);
    if (t === CUSTOM) return;
    const found = REAL_ASSESSMENTS.find((a) => a.title === t);
    if (found) {
      setTitle(found.title);
      setUnitCode(found.unitCode);
      setType(found.type);
    }
  };

  const valid = !!title.trim() && !!type && !!dueDate;

  const handleSubmit = () => {
    if (!valid) return;
    onAddAssessment({
      title: title.trim(),
      unitCode,
      type,
      description,
      dueDate,
    });
    reset();
  };

  return (
    <Sheet
      open={open}
      onOpenChange={(v) => {
        onOpenChange(v);
        if (!v) reset();
      }}
    >
      <SheetContent
        side="bottom"
        className="h-[90vh] sm:h-[84vh] rounded-t-3xl bg-[hsl(0_0%_8%)] border-white/[0.06] p-0"
      >
        <div className="w-12 h-1 bg-white/15 rounded-full mx-auto mt-3 mb-2" />
        <div className="flex flex-col h-full">
          <SheetHeader className="px-4 sm:px-6 pb-4">
            <SheetTitle className="text-left">
              <Eyebrow>New assessment</Eyebrow>
              <h2 className="text-[20px] sm:text-[24px] font-semibold tracking-tight text-white mt-1">
                Track an assessment
              </h2>
            </SheetTitle>
            <SheetDescription className="text-left text-[13px] text-white/70 leading-snug">
              Add an upcoming assessment so its deadline doesn't sneak up on you.
            </SheetDescription>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto px-4 sm:px-6 pb-32 space-y-4">
            <div className="space-y-2">
              <Eyebrow>Quick fill (common assessments)</Eyebrow>
              <Select value={template} onValueChange={applyTemplate}>
                <SelectTrigger className="h-11 touch-manipulation bg-[hsl(0_0%_10%)] border-white/[0.08] text-[13px] text-white">
                  <SelectValue placeholder="Pick a common assessment, or enter your own" />
                </SelectTrigger>
                <SelectContent className="max-h-[300px]">
                  {REAL_ASSESSMENTS.map((a) => (
                    <SelectItem key={a.title} value={a.title}>
                      {a.title} · {a.unitCode}
                    </SelectItem>
                  ))}
                  <SelectItem value={CUSTOM}>Enter my own</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Eyebrow>Assessment title</Eyebrow>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. BS 7671 18th Edition"
                className="h-11 touch-manipulation bg-[hsl(0_0%_10%)] border-white/[0.08] text-[13px] text-white placeholder:text-white/40 focus:border-elec-yellow/40 focus:ring-1 focus:ring-elec-yellow/20"
              />
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div className="space-y-2">
                <Eyebrow>Unit / course code</Eyebrow>
                <Input
                  value={unitCode}
                  onChange={(e) => setUnitCode(e.target.value)}
                  placeholder="e.g. C&G 2382-18"
                  className="h-11 touch-manipulation bg-[hsl(0_0%_10%)] border-white/[0.08] text-[13px] text-white placeholder:text-white/40 focus:border-elec-yellow/40 focus:ring-1 focus:ring-elec-yellow/20"
                />
              </div>
              <div className="space-y-2">
                <Eyebrow>Type</Eyebrow>
                <Select value={type} onValueChange={setType}>
                  <SelectTrigger className="h-11 touch-manipulation bg-[hsl(0_0%_10%)] border-white/[0.08] text-[13px] text-white">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {ASSESSMENT_TYPES.map((t) => (
                      <SelectItem key={t.value} value={t.value}>
                        {t.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Eyebrow>Description (optional)</Eyebrow>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What this assessment covers."
                rows={3}
                className="w-full px-3 py-2.5 rounded-lg bg-[hsl(0_0%_10%)] border border-white/[0.08] text-[13px] text-white placeholder:text-white/40 leading-snug focus:outline-none focus:border-elec-yellow/40 focus:ring-1 focus:ring-elec-yellow/20 touch-manipulation resize-none"
              />
            </div>

            <div className="space-y-2">
              <Eyebrow>Due date</Eyebrow>
              <Input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="h-11 touch-manipulation bg-[hsl(0_0%_10%)] border-white/[0.08] text-[13px] text-white"
              />
            </div>
          </div>

          <div className="px-4 sm:px-6 py-3 border-t border-white/[0.06] bg-[hsl(0_0%_8%)] pb-20 sm:pb-3">
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="h-12 rounded-xl border border-white/[0.08] bg-[hsl(0_0%_10%)] text-white text-[13px] font-semibold hover:bg-white/[0.04]"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={!valid}
                className="h-12 rounded-xl bg-elec-yellow text-black font-semibold text-[14px] hover:bg-elec-yellow/90 disabled:opacity-40"
              >
                Add assessment
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AddAssessmentDialog;
