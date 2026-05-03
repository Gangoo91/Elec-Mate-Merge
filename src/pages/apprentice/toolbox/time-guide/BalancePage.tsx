import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import WorkLifeBalanceTab from '@/components/apprentice/time-management/WorkLifeBalanceTab';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  PageFrame,
  PageHero,
  itemVariants,
} from '@/components/college/primitives';

const BalancePage = () => {
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
          title="Work-Life Balance"
          tone="yellow"
        />
      </motion.div>

      <Card className="border-purple-500/20 bg-white/5">
        <CardContent className="p-4 space-y-4">
          <h2 className="text-lg font-semibold text-white">
            Balancing Work, Study, and Life
          </h2>
          <p className="text-white text-sm leading-relaxed">
            Your apprenticeship is a 4-year commitment, and you cannot
            sustain it if you burn out. Finding the right balance between
            work demands, study obligations, and personal life is essential
            for your long-term success and wellbeing.
          </p>

          <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
            <h3 className="text-purple-400 font-semibold text-sm mb-3">
              Balance Strategies
            </h3>
            <ul className="space-y-2">
              {[
                'Set boundaries — work stays at work where possible',
                'Protect your weekends for rest and personal time',
                'Stay connected with friends and family',
                'Find hobbies and activities outside of work',
                'Remember: a rested apprentice is a better apprentice',
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

      <WorkLifeBalanceTab />
    </PageFrame>
  );
};

export default BalancePage;
