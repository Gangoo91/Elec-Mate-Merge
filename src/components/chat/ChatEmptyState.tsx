
const ChatEmptyState = () => {
  return (
    <div className="text-center py-10 bg-[#2c2c2c] rounded-lg border border-elec-yellow/20">
      <h3 className="text-lg font-medium mb-2 text-white">No messages yet</h3>
      <p className="text-gray-400">
        Be the first to start a discussion!
      </p>
    </div>
  );
};

export default ChatEmptyState;
