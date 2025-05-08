
import { useState } from "react";
import { useApprenticeChat } from "@/hooks/chat/useApprenticeChat";
import ChatHeader from "@/components/chat/ChatHeader";
import ChatSearchBar from "@/components/chat/ChatSearchBar";
import ChatMessageFeed from "@/components/chat/ChatMessageFeed";
import ChatComposer from "@/components/chat/ChatComposer";

const ApprenticeChat = () => {
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const {
    messages,
    isLoading,
    handleUpvote,
    handlePostMessage,
    handlePostComment,
    handleEditMessage,
    handleDeleteMessage,
    profile
  } = useApprenticeChat();

  const handleOpenComposer = () => setIsComposerOpen(true);
  const handleCloseComposer = () => setIsComposerOpen(false);

  const handleSubmitPost = (content: string) => {
    handlePostMessage(content);
    setIsComposerOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-black overflow-y-auto">
      <div className="bg-black">
        <ChatHeader 
          title="Apprentice Chat" 
          onNewPost={handleOpenComposer}
        />
        
        <ChatSearchBar />
      </div>
      
      <div className="flex-1">
        <ChatMessageFeed
          messages={messages}
          isLoading={isLoading}
          currentUserId={profile?.id}
          onUpvote={handleUpvote}
          onPostComment={handlePostComment}
          onEditMessage={handleEditMessage}
          onDeleteMessage={handleDeleteMessage}
        />
      </div>
      
      <ChatComposer 
        onSubmit={handleSubmitPost} 
        onCancel={handleCloseComposer}
        isVisible={isComposerOpen} 
      />
    </div>
  );
};

export default ApprenticeChat;
