
import GlobalChat from "@/components/chat/GlobalChat";
import { Card } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";

const ChatPage = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="animate-fade-in min-h-[calc(100vh-64px)]">
      <Card className={`border-none ${isMobile ? 'rounded-none' : ''} bg-elec-gray overflow-hidden shadow-md h-full`}>
        <GlobalChat />
      </Card>
    </div>
  );
};

export default ChatPage;
