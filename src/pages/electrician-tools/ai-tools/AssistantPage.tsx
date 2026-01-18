import ConversationalSearch from "@/components/electrician-tools/ai-tools/ConversationalSearch";

const AssistantPage = () => {
  return (
    // Use negative margins to break out of Layout padding and fill viewport
    // This creates a true full-screen chat experience
    <div
      className="fixed inset-0 bg-background flex flex-col"
      style={{
        top: 'var(--header-height, 56px)',
        zIndex: 40
      }}
    >
      <ConversationalSearch />
    </div>
  );
};

export default AssistantPage;