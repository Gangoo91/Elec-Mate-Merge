import { Button } from '@/components/ui/button';

const TestingResources = () => {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
      <div className="space-y-1">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Testing resources
        </span>
        <p className="text-[14px] text-white/85 leading-relaxed">
          These testing procedures are derived from the 18th Edition Wiring Regulations (BS 7671)
          and the Guidance Note 3: Inspection and Testing. Always refer to the latest regulations
          for definitive guidance.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <Button
          variant="outline"
          className="h-11 border-white/15 text-white hover:bg-white/[0.05] touch-manipulation"
        >
          Download full testing guide
        </Button>
        <Button
          variant="outline"
          className="h-11 border-white/15 text-white hover:bg-white/[0.05] touch-manipulation"
        >
          Print checklist PDF
        </Button>
      </div>
    </div>
  );
};

export default TestingResources;
