import { eyebrowCn } from './calendarStyles';

/**
 * A row of a detail list: an eyebrow label, the value.
 *
 * Shared by the event sheet and the settings sheet so the two read as one
 * product. One colour per kind of fact on the label — that is the whole
 * splash; no icons, no discs (Andrew, 20 Sep: "no emojis/icons"). Values
 * stay full white.
 */
export const IconRow = ({
  tone = '#FFFFFF',
  label,
  children,
}: {
  tone?: string;
  label: string;
  children: React.ReactNode;
}) => (
  <div className="border-t border-white/[0.10] px-4 py-3.5 sm:px-5">
    <p className={eyebrowCn} style={{ color: tone }}>
      {label}
    </p>
    <div className="mt-1 text-[14px] leading-snug text-white">{children}</div>
  </div>
);

/** The row colours, so a fact looks the same wherever it appears. */
export const ROW_TONE = {
  where: '#38BDF8',
  customer: '#A78BFA',
  crew: '#2DD4BF',
  description: '#FFFFFF',
  notes: '#FB923C',
  reminder: '#FB923C',
  sync: '#4285F4',
  told: '#4ADE80',
  phone: '#38BDF8',
  view: '#A78BFA',
  hours: '#FB923C',
  days: '#2DD4BF',
  capacity: '#FACC15',
} as const;
