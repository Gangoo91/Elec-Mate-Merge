
import GlobalChat from "@/components/chat/GlobalChat";
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
      <div className="h-full">
        <div className="bg-black min-h-[calc(100vh-64px)] overflow-hidden">
          <GlobalChat />
        </div>
      </div>
    </motion.div>
  );
};

export default ChatPage;
