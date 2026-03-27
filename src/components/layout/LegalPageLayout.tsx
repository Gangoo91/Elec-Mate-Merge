import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Zap, ArrowLeft } from 'lucide-react';

interface LegalPageLayoutProps {
  children: React.ReactNode;
}

const LegalPageLayout = ({ children }: LegalPageLayoutProps) => {
  return (
    <div className="bg-black text-white min-h-screen">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 w-full px-4 pb-3 sm:pb-4 pt-[max(12px,env(safe-area-inset-top,12px))] border-b border-white/10 bg-black/95 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group touch-manipulation">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-yellow-400 flex items-center justify-center transition-transform group-hover:scale-105">
              <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-black" />
            </div>
            <span className="text-lg sm:text-xl font-bold">
              Elec-<span className="text-yellow-400">Mate</span>
            </span>
          </Link>
          <Link to="/">
            <Button
              variant="ghost"
              size="sm"
              className="h-9 px-3 border-white/20 text-white hover:bg-white/5 touch-manipulation active:scale-95"
            >
              <ArrowLeft className="h-4 w-4 mr-1.5" />
              <span className="hidden sm:inline">Back</span>
            </Button>
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12 pb-[env(safe-area-inset-bottom,20px)]">
        {children}
      </main>
    </div>
  );
};

export default LegalPageLayout;
