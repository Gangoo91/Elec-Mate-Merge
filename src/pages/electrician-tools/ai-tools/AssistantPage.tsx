import ConversationalSearch from '@/components/electrician-tools/ai-tools/ConversationalSearch';

const AssistantPage = () => {
  return (
    <div
      className="bg-background flex flex-col -mx-3 sm:-mx-4 md:-mx-6 lg:-mx-8 -mt-1 sm:-mt-3 md:-mt-6 -mb-4"
      style={{
        height: 'calc(100vh - var(--header-height, 56px))',
      }}
    >
      <ConversationalSearch />
    </div>
  );
};

export default AssistantPage;
