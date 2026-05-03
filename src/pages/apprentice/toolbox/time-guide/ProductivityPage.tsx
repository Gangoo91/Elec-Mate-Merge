import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import ProductivityToolsTab from '@/components/apprentice/time-management/ProductivityToolsTab';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  PageFrame,
  PageHero,
  itemVariants,
} from '@/components/college/primitives';

const ProductivityPage = () => {
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
          title="Productivity Tools"
          tone="yellow"
        />
      </motion.div>

      <Card className="border-amber-500/20 bg-white/5">
        <CardContent className="p-4 space-y-4">
          <h2 className="text-lg font-semibold text-white">
            Tools to Boost Your Productivity
          </h2>
          <p className="text-white text-sm leading-relaxed">
            The right tools and techniques can dramatically improve how much
            you get done in the time you have. From apps and planners to
            proven productivity methods, find what works for you.
          </p>

          <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
            <h3 className="text-amber-400 font-semibold text-sm mb-3">
              Productivity Methods
            </h3>
            <ul className="space-y-2">
              {[
                'Pomodoro Technique — 25 min focus, 5 min break',
                'To-do lists — write it down, tick it off',
                'The 2-minute rule — if it takes 2 min, do it now',
                'Batch similar tasks together for efficiency',
                'Digital tools — calendars, reminders, note apps',
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-sm text-white"
                >
                  <CheckCircle className="h-4 w-4 text-amber-400 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      <ProductivityToolsTab />
    </PageFrame>
  );
};

export default ProductivityPage;
