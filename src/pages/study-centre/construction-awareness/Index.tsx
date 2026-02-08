import { ArrowLeft, HardHat } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import useSEO from '@/hooks/useSEO';

export default function ConstructionAwarenessIndex() {
  useSEO({
    title: 'Construction Site Awareness | Study Centre',
    description: 'Site safety, CSCS preparation, and construction industry essentials.',
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      <header className="sticky top-0 z-10 bg-[#1a1a1a]/95 backdrop-blur-sm px-4 sm:px-6 pt-6 pb-4">
        <Link to="/study-centre">
          <Button
            variant="ghost"
            className="text-muted-foreground hover:text-foreground transition-colors p-0 h-auto touch-manipulation active:scale-[0.98]"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Study Centre
          </Button>
        </Link>
      </header>

      <main className="px-4 sm:px-6 pb-12">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="space-y-1">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground tracking-tight">
              Construction Site Awareness
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Site safety, CSCS preparation, and industry essentials
            </p>
          </div>

          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="p-4 rounded-2xl bg-orange-500/10 border border-orange-500/20 mb-4">
              <HardHat className="h-10 w-10 text-orange-400" />
            </div>
            <h2 className="text-lg font-semibold text-white mb-2">Courses Coming Soon</h2>
            <p className="text-sm text-white/50 max-w-[280px]">
              We're building exciting new courses for this category. Check back soon!
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
