interface ToolboxHeaderProps {
  title: string;
  linkPath: string;
  linkText: string;
}

const ToolboxHeader = ({ title, linkPath, linkText }: ToolboxHeaderProps) => {
  void linkPath;
  void linkText;
  return (
    <div className="space-y-1">
      <h1 className="text-[24px] sm:text-[28px] font-bold tracking-tight text-white leading-tight">
        {title}
      </h1>
    </div>
  );
};

export default ToolboxHeader;
