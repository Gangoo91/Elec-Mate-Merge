
import GlobalChat from "@/components/chat/GlobalChat";
import { motion } from "framer-motion";

const ChatPage = () => {
  return (
    <motion.div 
      className="animate-fade-in min-h-[calc(100vh-64px)]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="h-full">
        <div className="bg-black min-h-[calc(100vh-64px)]">
          <GlobalChat />
        </div>
      </div>
    </motion.div>
  );
};

export default ChatPage;
