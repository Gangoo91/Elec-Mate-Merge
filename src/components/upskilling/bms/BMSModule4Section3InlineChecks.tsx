import { Card, CardContent } from '@/components/ui/card';
import { HelpCircle } from 'lucide-react';

export const InlineCheck1 = () => (
  <Card className="bg-blue-900/20 border-blue-600/40">
    <CardContent className="p-4">
      <div className="flex items-start gap-3">
        <HelpCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
        <div>
          <h4 className="font-semibold text-blue-300 mb-2">Inline Check:</h4>
          <p className="text-foreground">How can access control contribute to energy savings as well as security?</p>
        </div>
      </div>
    </CardContent>
  </Card>
);

export const InlineCheck2 = () => (
  <Card className="bg-green-900/20 border-green-600/40">
    <CardContent className="p-4">
      <div className="flex items-start gap-3">
        <HelpCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
        <div>
          <h4 className="font-semibold text-green-300 mb-2">Inline Check:</h4>
          <p className="text-foreground">What is the difference between a fail-safe and a fail-secure lock?</p>
        </div>
      </div>
    </CardContent>
  </Card>
);

export const InlineCheck3 = () => (
  <Card className="bg-red-900/20 border-red-600/40">
    <CardContent className="p-4">
      <div className="flex items-start gap-3">
        <HelpCircle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
        <div>
          <h4 className="font-semibold text-red-300 mb-2">Inline Check:</h4>
          <p className="text-foreground">Why must access control always integrate with fire alarm systems?</p>
        </div>
      </div>
    </CardContent>
  </Card>
);