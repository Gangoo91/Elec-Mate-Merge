import { Card, CardContent } from '@/components/ui/card';
import { HelpCircle } from 'lucide-react';

export const KNXInlineCheck1 = () => {
  return (
    <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <HelpCircle className="h-5 w-5 text-elec-yellow flex-shrink-0" />
          <div>
            <p className="text-foreground font-medium">Inline Check:</p>
            <p className="text-foreground text-sm">
              👉 Why is KNX considered vendor-neutral?
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const KNXInlineCheck2 = () => {
  return (
    <Card className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/30">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <HelpCircle className="h-5 w-5 text-elec-yellow flex-shrink-0" />
          <div>
            <p className="text-foreground font-medium">Inline Check:</p>
            <p className="text-foreground text-sm">
              👉 How many devices can typically be supported on a KNX line?
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const KNXInlineCheck3 = () => {
  return (
    <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <HelpCircle className="h-5 w-5 text-elec-yellow flex-shrink-0" />
          <div>
            <p className="text-foreground font-medium">Inline Check:</p>
            <p className="text-foreground text-sm">
              👉 What type of KNX device is used to link two lines together?
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const KNXInlineCheck4 = () => {
  return (
    <Card className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/30">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <HelpCircle className="h-5 w-5 text-elec-yellow flex-shrink-0" />
          <div>
            <p className="text-foreground font-medium">Inline Check:</p>
            <p className="text-foreground text-sm">
              👉 Why are loops not allowed in KNX topology?
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};