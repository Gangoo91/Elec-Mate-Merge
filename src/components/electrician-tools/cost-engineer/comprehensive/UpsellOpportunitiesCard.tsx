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
          <CardTitle className="text-2xl sm:text-xl font-bold text-white flex items-center gap-2">
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
              <AccordionTrigger className="hover:no-underline touch-manipulation min-h-12">
                <div className="flex items-center gap-2 flex-1">
                  {upsell.isHot && <Flame className="h-4 w-4 text-orange-500" />}
                  <span className="font-medium text-white text-base sm:text-sm text-left">{upsell.opportunity}</span>
                  <span className="text-base sm:text-sm text-green-500 ml-auto mr-4">
                    +£{upsell.price} • {upsell.winRate}% win rate
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 pt-2">
                  <div className="text-base sm:text-sm text-white">
                    <span className="font-medium">Timing:</span> {upsell.timing}
                  </div>
                  <div className="p-4 sm:p-3 rounded-lg bg-background/50 border border-border/30">
                    <div className="text-base sm:text-sm font-medium text-white mb-1">
                      💬 Conversation Script:
                    </div>
                    <p className="text-base sm:text-sm text-white italic">{upsell.script}</p>
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
