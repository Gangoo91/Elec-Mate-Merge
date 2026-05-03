import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import TimeManagementTab from '@/components/apprentice/study-tips/TimeManagementTab';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  PageFrame,
  PageHero,
  itemVariants,
} from '@/components/college/primitives';

const StudyTimePage = () => {
  const navigate = useNavigate();
  return (
    <PageFrame className="px-4 sm:px-6 lg:px-8">
      <motion.div variants={itemVariants}>
        <Button
          variant="ghost"
          onClick={() => navigate('/apprentice/toolbox/study-tips')}
          className="text-white hover:text-white hover:bg-white/[0.05] active:bg-white/[0.08] -ml-2 h-11 touch-manipulation"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back
        </Button>
      </motion.div>

      <motion.div variants={itemVariants}>
        <PageHero
          eyebrow="Apprentice · Study"
          title="Study Time Management"
          tone="yellow"
        />
      </motion.div>

      <Card className="border-purple-500/20 bg-white/5">
        <CardContent className="p-4 space-y-4">
          <h2 className="text-lg font-semibold text-white">
            Finding Time to Study
          </h2>
          <p className="text-white text-sm leading-relaxed">
            Balancing a full-time apprenticeship with study can feel
            overwhelming. Between early starts, long days on site, and college
            commitments, finding time to revise is a real challenge. These
            strategies will help you make the most of the time you have.
          </p>

          <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
            <h3 className="text-purple-400 font-semibold text-sm mb-3">
              Key Strategies
            </h3>
            <ul className="space-y-2">
              {[
                'Use commute time for audio learning or flashcards',
                'Study in 25-minute focused blocks (Pomodoro technique)',
                'Create a weekly study schedule and stick to it',
                'Prioritise quality over quantity — 30 min focused beats 2 hrs distracted',
                'Use dead time on site (waiting for deliveries, etc.)',
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-sm text-white"
                >
                  <CheckCircle className="h-4 w-4 text-purple-400 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      <TimeManagementTab />
    </PageFrame>
  );
};

export default StudyTimePage;
