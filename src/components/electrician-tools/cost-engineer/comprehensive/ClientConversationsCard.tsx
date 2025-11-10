import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MessageSquare } from "lucide-react";

interface ClientConversationsCardProps {
  conversations: any;
}

const ClientConversationsCard = ({ conversations }: ClientConversationsCardProps) => {
  return (
    <Card className="border-elec-yellow/20">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-elec-yellow" />
          Client Conversations
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {/* Opening Script */}
          {conversations.opening && (
            <AccordionItem value="opening">
              <AccordionTrigger className="hover:no-underline">
                <span className="font-medium">Opening Pitch</span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="p-3 rounded-lg bg-background/50 border border-border/30">
                  <p className="text-sm italic leading-relaxed whitespace-pre-line">
                    {conversations.opening}
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
          )}

          {/* Too Expensive Objection */}
          {conversations.tooExpensive && (
            <AccordionItem value="too-expensive">
              <AccordionTrigger className="hover:no-underline">
                <span className="font-medium">"That seems high" Objection</span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="p-3 rounded-lg bg-background/50 border border-border/30">
                  <p className="text-sm italic leading-relaxed whitespace-pre-line">
                    {conversations.tooExpensive}
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
          )}

          {/* Discount Request */}
          {conversations.discountRequest && (
            <AccordionItem value="discount">
              <AccordionTrigger className="hover:no-underline">
                <span className="font-medium">"Can you do cheaper?" Negotiation</span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="p-3 rounded-lg bg-background/50 border border-border/30">
                  <p className="text-sm italic leading-relaxed whitespace-pre-line">
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
