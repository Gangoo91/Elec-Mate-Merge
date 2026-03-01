interface CalendarEventDotProps {
  colour: string;
  className?: string;
}

const CalendarEventDot = ({ colour, className }: CalendarEventDotProps) => (
  <div
    className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${className ?? ''}`}
    style={{ backgroundColor: colour }}
  />
);

export default CalendarEventDot;
