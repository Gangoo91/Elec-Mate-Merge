/**
 * LeaderboardPage — Full leaderboard with stats, rankings, and achievements.
 */

import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { StudyLeaderboard } from '@/components/study-centre/StudyLeaderboard';
import { StudyStatsDashboard } from '@/components/study-centre/StudyStatsDashboard';
import useSEO from '@/hooks/useSEO';

export default function LeaderboardPage() {
  const navigate = useNavigate();

  useSEO({
    title: 'Leaderboard | Study Centre | Elec-Mate',
    description: 'See how you rank against other learners on Elec-Mate.',
  });

  return (
    <div className="-mt-3 sm:-mt-4 md:-mt-6 bg-background pb-24">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/[0.06]">
          <div className="px-4 py-2">
            <div className="flex items-center gap-3 h-11">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/study-centre')}
                className="text-white hover:text-white hover:bg-white/10 rounded-xl h-11 w-11 touch-manipulation active:scale-[0.98]"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-base font-semibold text-white">Leaderboard</h1>
            </div>
          </div>
        </div>

        <div className="px-4 py-4 space-y-5">
          {/* Your Stats */}
          <StudyStatsDashboard />

          {/* Leaderboard */}
          <StudyLeaderboard />
        </div>
      </div>
    </div>
  );
}
