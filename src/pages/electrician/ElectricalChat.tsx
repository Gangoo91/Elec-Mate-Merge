
import { useElectricalChat } from "@/hooks/chat/useElectricalChat";
import ChatHeader from "@/components/chat/ChatHeader";
import ChatSearchBar from "@/components/chat/ChatSearchBar";
import ChatMessageFeed from "@/components/chat/ChatMessageFeed";
import ChatComposer from "@/components/chat/ChatComposer";

const ElectricalChat = () => {
  const {
    messages,
    isLoading,
    handleUpvote,
    handlePostMessage,
    handlePostComment,
    profile
  } = useElectricalChat();

  return (
    <div className="flex flex-col min-h-screen bg-black">
      <ChatHeader 
        title="Electricians Chat Room" 
        subtitle="Connect with fellow electricians, share experiences, and discuss industry topics." 
      />
      
      <ChatSearchBar />
      
      <ChatMessageFeed
        messages={messages}
        isLoading={isLoading}
        currentUserId={profile?.id}
        onUpvote={handleUpvote}
        onPostComment={handlePostComment}
      />
      
      <div className="sticky bottom-0 w-full bg-black py-4">
        <div className="max-w-3xl mx-auto px-4">
          <ChatComposer onSubmit={handlePostMessage} />
        </div>
      </div>
    </div>
  );
};

export default ElectricalChat;
