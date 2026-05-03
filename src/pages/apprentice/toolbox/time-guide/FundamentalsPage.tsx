import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import TimeManagementFundamentalsTab from '@/components/apprentice/time-management/TimeManagementFundamentalsTab';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  PageFrame,
  PageHero,
  itemVariants,
} from '@/components/college/primitives';

const FundamentalsPage = () => {
  const navigate = useNavigate();
  return (
    <PageFrame className="px-4 sm:px-6 lg:px-8">
      <motion.div variants={itemVariants}>
        <Button
          variant="ghost"
          onClick={() => navigate('/apprentice/toolbox/time-management')}
          className="text-white hover:text-white hover:bg-white/[0.05] active:bg-white/[0.08] -ml-2 h-11 touch-manipulation"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back
        </Button>
      </motion.div>

      <motion.div variants={itemVariants}>
        <PageHero
          eyebrow="Apprentice · Time"
          title="Time Fundamentals"
          tone="yellow"
        />
      </motion.div>

      <Card className="border-blue-500/20 bg-white/5">
        <CardContent className="p-4 space-y-4">
          <h2 className="text-lg font-semibold text-white">
            Mastering Your Time
          </h2>
          <p className="text-white text-sm leading-relaxed">
            As an apprentice electrician, you are juggling work on site, college
            days, study time, and personal life. Good time management is not
            about working harder — it is about working smarter and protecting
            your wellbeing.
          </p>

          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <h3 className="text-blue-400 font-semibold text-sm mb-3">
              Core Principles
            </h3>
            <ul className="space-y-2">
              {[
                'Plan your week — do not leave it to chance',
                'Prioritise tasks using urgency and importance',
                'Break large tasks into smaller, manageable steps',
                'Build buffer time for unexpected delays',
                'Protect your rest and recovery time',
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-sm text-white"
                >
                  <CheckCircle className="h-4 w-4 text-blue-400 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      <TimeManagementFundamentalsTab />
    </PageFrame>
  );
};

export default FundamentalsPage;
