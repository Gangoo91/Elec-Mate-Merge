import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import MistakeCategoriesTab from '@/components/apprentice/learning-mistakes/MistakeCategoriesTab';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  PageFrame,
  PageHero,
  itemVariants,
} from '@/components/college/primitives';

const CategoriesPage = () => {
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
          title="Mistake Categories"
          tone="yellow"
        />
      </motion.div>

      <Card className="border-orange-500/20 bg-white/5">
        <CardContent className="p-4 space-y-4">
          <h2 className="text-lg font-semibold text-white">
            Common Mistakes in the Electrical Trade
          </h2>
          <p className="text-white text-sm leading-relaxed">
            Understanding the types of mistakes that commonly occur helps you
            recognise and avoid them. From technical errors to communication
            breakdowns, every category of mistake has patterns you can learn
            to spot early.
          </p>

          <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
            <h3 className="text-orange-400 font-semibold text-sm mb-3">
              Categories Covered
            </h3>
            <ul className="space-y-2">
              {[
                'Technical mistakes — wiring errors, calculation mistakes',
                'Safety mistakes — shortcuts, PPE failures, isolation errors',
                'Communication mistakes — misunderstood instructions',
                'Professional mistakes — timekeeping, attitude, appearance',
                'Study mistakes — poor preparation, wrong techniques',
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-sm text-white"
                >
                  <CheckCircle className="h-4 w-4 text-orange-400 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      <MistakeCategoriesTab />
    </PageFrame>
  );
};

export default CategoriesPage;
