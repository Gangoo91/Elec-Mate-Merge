import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import RecoveryStrategiesTab from '@/components/apprentice/learning-mistakes/RecoveryStrategiesTab';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  PageFrame,
  PageHero,
  itemVariants,
} from '@/components/college/primitives';

const RecoveryPage = () => {
  const navigate = useNavigate();
  return (
    <PageFrame className="px-4 sm:px-6 lg:px-8">
      <motion.div variants={itemVariants}>
        <Button
          variant="ghost"
          onClick={() => navigate('/apprentice/toolbox/learning-from-mistakes')}
          className="text-white hover:text-white hover:bg-white/[0.05] active:bg-white/[0.08] -ml-2 h-11 touch-manipulation"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back
        </Button>
      </motion.div>

      <motion.div variants={itemVariants}>
        <PageHero
          eyebrow="Apprentice · Resilience"
          title="Recovery Strategies"
          tone="yellow"
        />
      </motion.div>

      <Card className="border-blue-500/20 bg-white/5">
        <CardContent className="p-4 space-y-4">
          <h2 className="text-lg font-semibold text-white">
            How to Recover From a Mistake
          </h2>
          <p className="text-white text-sm leading-relaxed">
            Everyone makes mistakes — what matters is how you respond. These
            recovery strategies will help you handle mistakes professionally,
            learn from them effectively, and come back stronger. The best
            electricians are not the ones who never make mistakes — they are
            the ones who recover well.
          </p>

          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <h3 className="text-blue-400 font-semibold text-sm mb-3">
              Key Recovery Steps
            </h3>
            <ul className="space-y-2">
              {[
                'Own the mistake immediately — do not hide it',
                'Assess the impact and make it safe',
                'Report it to the right person',
                'Identify what went wrong and why',
                'Put a plan in place to prevent it happening again',
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

      <RecoveryStrategiesTab />
    </PageFrame>
  );
};

export default RecoveryPage;
