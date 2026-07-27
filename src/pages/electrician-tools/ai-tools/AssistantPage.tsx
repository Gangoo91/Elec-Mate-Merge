import ConversationalSearch from '@/components/electrician-tools/ai-tools/ConversationalSearch';

const AssistantPage = () => {
  return (
    // Height comes from `.h-app-shell` (index.css) rather than an inline 100vh
    // calc: on mobile browsers 100vh is the LARGE viewport, so with the URL bar
    // showing, the message input was pushed below the visible area. The utility
    // uses 100dvh where supported and keeps 100vh as the fallback.
    <div className="h-app-shell bg-background flex flex-col -mx-3 sm:-mx-4 md:-mx-6 lg:-mx-8 -mt-1 sm:-mt-3 md:-mt-6 -mb-4">
      <ConversationalSearch />
    </div>
  );
};

export default AssistantPage;
