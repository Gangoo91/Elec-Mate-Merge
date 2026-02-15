import { SmartBackButton } from '@/components/ui/smart-back-button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import MistakeCategoriesTab from '@/components/apprentice/learning-mistakes/MistakeCategoriesTab';

const CategoriesPage = () => {
  return (
    <div className="animate-fade-in max-w-2xl mx-auto px-4 pb-20 space-y-6 text-left">
      <div className="flex items-center gap-3">
        <SmartBackButton />
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Mistake Categories
        </h1>
      </div>

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
    </div>
  );
};

export default CategoriesPage;
