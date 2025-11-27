import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MessageSquare } from "lucide-react";

interface ClientConversationsCardProps {
  conversations: any;
}

const ClientConversationsCard = ({ conversations }: ClientConversationsCardProps) => {
  return (
    <Card className="border-0 sm:border border-elec-yellow/20 rounded-none sm:rounded-xl">
      <CardHeader className="px-4 py-4 sm:px-6 sm:py-5">
        <CardTitle className="text-xl sm:text-lg font-bold text-white flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-elec-yellow" />
          Client Conversations
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-5 sm:px-6 sm:pb-6">
        <Accordion type="single" collapsible className="w-full">
          {/* Opening Script */}
          {conversations.opening && (
            <AccordionItem value="opening">
              <AccordionTrigger className="hover:no-underline touch-manipulation min-h-[56px]">
                <span className="font-medium text-white text-base sm:text-sm">💬 Opening Pitch</span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="p-4 sm:p-3 rounded-lg bg-background/50 border border-border/30 text-left">
                  <p className="text-base sm:text-sm text-white/90 italic leading-relaxed whitespace-pre-line">
                    {conversations.opening}
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
          )}

          {/* Too Expensive Objection */}
          {conversations.tooExpensive && (
            <AccordionItem value="too-expensive">
              <AccordionTrigger className="hover:no-underline touch-manipulation min-h-[56px]">
                <span className="font-medium text-white text-base sm:text-sm">💰 "That seems high" Objection</span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="p-4 sm:p-3 rounded-lg bg-background/50 border border-border/30 text-left">
                  <p className="text-base sm:text-sm text-white/90 italic leading-relaxed whitespace-pre-line">
                    {conversations.tooExpensive}
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
          )}

          {/* Discount Request */}
          {conversations.discountRequest && (
            <AccordionItem value="discount">
              <AccordionTrigger className="hover:no-underline touch-manipulation min-h-[56px]">
                <span className="font-medium text-white text-base sm:text-sm">🤝 "Can you do cheaper?" Negotiation</span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="p-4 sm:p-3 rounded-lg bg-background/50 border border-border/30 text-left">
                  <p className="text-base sm:text-sm text-white/90 italic leading-relaxed whitespace-pre-line">
                    {conversations.discountRequest}
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
          )}
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default ClientConversationsCard;
