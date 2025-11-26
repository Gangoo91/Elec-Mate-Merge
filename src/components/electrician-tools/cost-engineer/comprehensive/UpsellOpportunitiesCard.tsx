import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Flame, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface UpsellOpportunitiesCardProps {
  upsells: any[];
}

const UpsellOpportunitiesCard = ({ upsells }: UpsellOpportunitiesCardProps) => {
  const totalPotential = upsells.reduce((sum, u) => sum + (u.price || 0), 0);

  return (
    <Card className="border-0 sm:border border-elec-yellow/20 rounded-none sm:rounded-xl">
      <CardHeader className="px-4 py-4 sm:px-6 sm:py-5">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl sm:text-lg font-bold text-white flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-elec-yellow" />
            Upsell Opportunities
          </CardTitle>
          <Badge className="bg-green-500/20 text-green-500 border-green-500/30">
            +£{totalPotential.toFixed(0)} potential
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="px-4 pb-5 sm:px-6 sm:pb-6">
        <Accordion type="single" collapsible className="w-full">
          {upsells.map((upsell, idx) => (
            <AccordionItem key={idx} value={`upsell-${idx}`}>
              <AccordionTrigger className="hover:no-underline touch-manipulation min-h-[72px] py-3">
                <div className="flex flex-col items-start gap-2 flex-1 text-left w-full pr-2">
                  <div className="flex items-start gap-2 w-full">
                    {upsell.isHot && <Flame className="h-4 w-4 text-orange-500 flex-shrink-0 mt-0.5" />}
                    <span className="font-medium text-white text-base leading-snug flex-1">
                      {upsell.opportunity}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs px-2 py-0.5">
                      +£{upsell.price}
                    </Badge>
                    <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs px-2 py-0.5">
                      {upsell.winRate}% win rate
                    </Badge>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3 pt-2 text-left">
                  <div className="text-base text-white">
                    <span className="font-medium text-amber-400">Timing:</span> {upsell.timing}
                  </div>
                  <div className="p-4 rounded-lg bg-accent/30 border border-border/30">
                    <div className="text-base font-medium text-white mb-2 flex items-center gap-2">
                      <span>💬</span>
                      <span>Conversation Script:</span>
                    </div>
                    <p className="text-base text-white leading-relaxed">{upsell.script}</p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default UpsellOpportunitiesCard;
