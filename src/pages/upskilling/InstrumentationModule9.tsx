import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import InstrumentationMockExam from '@/components/upskilling/InstrumentationMockExam';
import useSEO from '@/hooks/useSEO';

// Module 9 IS the mock exam — it renders the timed quiz directly. No separate
// route exists, so the course "Mock exam" tile points here.
export default function InstrumentationModule9() {
  const navigate = useNavigate();
  useSEO({
    title: 'Instrumentation Mock Exam | Module 9 | Elec-Mate',
    description: 'Timed mock examination covering every module of the instrumentation upskilling course.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <button
          onClick={() => navigate('../instrumentation-course')}
          className="inline-flex items-center gap-2 h-10 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-4"
        >
          <ArrowLeft className="h-4 w-4" /> Instrumentation
        </button>
        <InstrumentationMockExam />
      </div>
    </div>
  );
}
