import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ElecIdTab from '@/components/settings/ElecIdTab';
import { useIsMobile } from '@/hooks/use-mobile';

const ElecIdPage = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  return (
    <div className="bg-background min-h-screen">
      {/* Header - Not sticky on mobile for native app feel */}
      <header className={`${isMobile ? '' : 'sticky top-0 z-50'} w-full border-b border-border/50 bg-background`}>
        <div className="max-w-6xl mx-auto px-4 lg:px-8">
          <div className="flex h-14 items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="h-11 w-11 rounded-xl touch-manipulation active:scale-95"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-lg font-semibold">My Elec-ID</h1>
          </div>
        </div>
      </header>

      {/* Content - Edge to edge on mobile, wider on desktop */}
      <main className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-8 py-3 sm:py-4">
        <ElecIdTab />
      </main>
    </div>
  );
};

export default ElecIdPage;
