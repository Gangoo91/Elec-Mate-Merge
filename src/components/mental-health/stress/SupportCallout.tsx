
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PhoneCall } from "lucide-react";
import { toast } from "sonner";

const SupportCallout = () => {
  const handleCallSupport = () => {
    toast.info("Calling this number will connect you with a trained mental health professional");
    // Function to handle the actual call is already attached to the anchor tag
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardContent className="p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-medium mb-1">Need immediate support?</h3>
          <p className="text-sm text-muted-foreground">Talk to someone who understands workplace stress</p>
        </div>
        <a href="tel:116123" onClick={handleCallSupport}>
          <Button className="bg-elec-yellow hover:bg-elec-yellow/90 text-black flex items-center gap-2">
            <PhoneCall className="h-4 w-4" />
            Call Samaritans: 116 123
          </Button>
        </a>
      </CardContent>
    </Card>
  );
};

export default SupportCallout;
