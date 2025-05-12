
import GlobalChat from "@/components/chat/GlobalChat";
import { Card } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";

const ChatPage = () => {
  const isMobile = useIsMobile();
  
  return (
    <motion.div 
      className="animate-fade-in min-h-[calc(100vh-64px)]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto p-4 max-w-7xl">
        <Card className={`border-none ${isMobile ? 'rounded-none shadow-none' : 'rounded-xl shadow-lg'} 
          bg-gradient-to-b from-elec-dark to-black overflow-hidden`}>
          <GlobalChat />
        </Card>
      </div>
    </motion.div>
  );
};

export default ChatPage;
