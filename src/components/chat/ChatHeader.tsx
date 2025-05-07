
interface ChatHeaderProps {
  title: string;
  subtitle?: string;
}

const ChatHeader = ({ title, subtitle }: ChatHeaderProps) => {
  return (
    <div className="text-center py-8">
      <h1 className="text-4xl font-bold text-elec-yellow mb-2">{title}</h1>
      {subtitle && (
        <p className="text-xl text-elec-yellow/80 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default ChatHeader;
