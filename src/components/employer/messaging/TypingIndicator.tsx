export function TypingIndicator() {
  return (
    <div className="flex justify-start mb-3">
      <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl rounded-bl-md px-4 py-3">
        <div className="flex gap-1">
          <span className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.3s]" />
          <span className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.15s]" />
          <span className="w-2 h-2 bg-white rounded-full animate-bounce" />
        </div>
      </div>
    </div>
  );
}
