/**
 * Online bookings waiting for the office (ELE-2079). A customer's booking
 * lands in the diary as a tentative job with the person the scheduling
 * logic picked holding the slot; here the office accepts it (books that
 * person through the diary's dispatch path and emails the customer their
 * confirmation and the evening-before reminder), moves it, or declines it.
 */
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Loader2, Phone, Mail } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { FormSheet } from '@/components/forms/FormSheet';
import {
  buttonPrimaryCn,
  buttonSecondaryCn,
  chipBase,
  chipOff,
  chipOn,
  inputCn,
  labelCn,
  textareaCn,
} from '@/components/forms/fieldStyles';
import {
  panel,
  PanelTitle,
  Rows,
  Row,
  StatusPill,
  KeyValue,
} from '@/components/employer/pageParts/PageParts';
import {
  useOnlineBookings,
  useDecideOnlineBooking,
  halfWord,
  type OnlineBooking,
} from '@/hooks/useSmartScheduling';
import {
  dispatchErrorMessage,
  type DispatchBoard,
  type DispatchJob,
} from '@/hooks/useDispatchBoard';
import {
  clashesFor,
  fmtDay,
  niceFirstName,
  todayYmd,
} from '@/components/employer/diary/dispatchModel';

interface Props {
  firm: string | undefined;
  board: DispatchBoard;
  jobsById: Map<string, DispatchJob>;
}

const SOURCE: Record<string, string> = {
  quote_page: 'Quote page',
  website: 'Website',
  google: 'Google profile',
  link: 'Booking link',
};

export function OnlineBookingsPanel({ firm, board, jobsById }: Props) {
  const { data: bookings = [] } = useOnlineBookings(firm);
  const [params, setParams] = useSearchParams();
  const [openId, setOpenId] = useState<string | null>(null);
  const [doneId, setDoneId] = useState<string | null>(null);

  // The bell opens /employer?section=diary&booking=<id>. A booking still to
  // accept opens its decide sheet; one already confirmed, declined or
  // released (deposit not paid) opens a read-only summary.
  const fromLink = params.get('booking');
  const linkedIsOpen = !!fromLink && bookings.some((b) => b.id === fromLink);
  const { data: allBookings = [], isFetched: allFetched } = useOnlineBookings(firm, {
    includeDone: true,
    enabled: !!fromLink && !linkedIsOpen,
  });
  useEffect(() => {
    if (!fromLink) return;
    if (linkedIsOpen) {
      setOpenId(fromLink);
      return;
    }
    if (!allFetched) return;
    if (allBookings.some((b) => b.id === fromLink)) {
      setDoneId(fromLink);
    } else {
      toast('That online booking is no longer in the diary');
      params.delete('booking');
      setParams(params, { replace: true });
    }
    // params/setParams are stable enough here; re-run only when the data changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromLink, linkedIsOpen, allFetched, allBookings]);

  const close = () => {
    setOpenId(null);
    setDoneId(null);
    if (params.get('booking')) {
      params.delete('booking');
      setParams(params, { replace: true });
    }
  };

  const open = bookings.find((b) => b.id === openId) ?? null;
  const done = allBookings.find((b) => b.id === doneId) ?? null;
  if (bookings.length === 0) {
    return done ? <BookingDoneSheet booking={done} onClose={close} /> : null;
  }

  return (
    <section data-help="diary.bookings">
      <PanelTitle title="Online bookings to accept" meta={`${bookings.length} waiting`} />
      <div className={panel}>
        <Rows>
          {bookings.map((b) => (
            <Row
              key={b.id}
              title={b.customer}
              detail={`${b.type} · ${fmtDay(b.day, { weekday: 'short', day: 'numeric', month: 'short' })}, ${halfWord(b.half)}${b.postcode ? ` · ${b.postcode}` : ''}`}
              wrapDetail
              meta={
                b.suggested
                  ? `${niceFirstName(b.suggested.name)} holds the slot`
                  : 'Nobody holds the slot yet'
              }
              status={
                b.deposit ? (
                  b.deposit.paid ? (
                    <StatusPill tone="green">Deposit paid</StatusPill>
                  ) : (
                    <StatusPill>Deposit not paid</StatusPill>
                  )
                ) : (
                  <StatusPill tone="volt">To accept</StatusPill>
                )
              }
              onClick={() => setOpenId(b.id)}
            />
          ))}
        </Rows>
      </div>
      {open && <DecideSheet booking={open} board={board} jobsById={jobsById} onClose={close} />}
      {done && <BookingDoneSheet booking={done} onClose={close} />}
    </section>
  );
}

const DONE_TEXT: Record<OnlineBooking['status'], string> = {
  tentative: 'Waiting for you to accept it.',
  confirmed: 'Confirmed and in the diary.',
  declined: 'Declined. The diary entry was removed and any unpaid deposit invoice cancelled.',
  cancelled:
    'Released: the deposit was not paid in time, so the slot is free again and the deposit invoice was cancelled.',
};

/** A booking already decided, opened from its bell. */
function BookingDoneSheet({ booking, onClose }: { booking: OnlineBooking; onClose: () => void }) {
  const navigate = useNavigate();
  const canOpenJob = booking.status === 'confirmed' && !!booking.job_id;
  return (
    <FormSheet
      open
      onOpenChange={(o) => !o && onClose()}
      eyebrow={`Online booking · ref ${booking.reference}`}
      title={`${booking.type} for ${booking.customer}`}
      description={DONE_TEXT[booking.status]}
      width="wide"
      footer={
        <div className={cn('grid gap-2', canOpenJob ? 'grid-cols-2' : 'grid-cols-1')}>
          <button type="button" className={buttonSecondaryCn} onClick={onClose}>
            Close
          </button>
          {canOpenJob && (
            <button
              type="button"
              className={buttonPrimaryCn}
              onClick={() => navigate(`/employer?section=jobs&job=${booking.job_id}`)}
            >
              Open the job
            </button>
          )}
        </div>
      }
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <section className="min-w-0 space-y-3">
          <h3 className="text-[15px] font-semibold text-white">The visit</h3>
          <div className={cn(panel, 'divide-y divide-white/[0.07]')}>
            <KeyValue
              label="Status"
              value={
                booking.status === 'confirmed'
                  ? 'Confirmed'
                  : booking.status === 'declined'
                    ? 'Declined'
                    : booking.status === 'cancelled'
                      ? 'Released'
                      : 'To accept'
              }
            />
            <KeyValue
              label="When"
              value={`${fmtDay(booking.day, { weekday: 'long', day: 'numeric', month: 'long' })}, ${halfWord(booking.half)}`}
            />
            {booking.suggested && (
              <KeyValue
                label="Who"
                value={niceFirstName(booking.suggested.name) || booking.suggested.name}
              />
            )}
            {booking.deposit && (
              <KeyValue
                label="Deposit"
                value={`${booking.deposit.pounds != null ? `£${Number(booking.deposit.pounds).toFixed(2)} ` : ''}${booking.deposit.paid ? 'paid' : 'not paid'}`}
              />
            )}
          </div>
        </section>
        <section className="min-w-0 space-y-3">
          <h3 className="text-[15px] font-semibold text-white">The customer</h3>
          <div className={cn(panel, 'divide-y divide-white/[0.07]')}>
            <KeyValue label="Name" value={booking.customer} />
            {booking.phone && <KeyValue label="Phone" value={booking.phone} />}
            {booking.email && <KeyValue label="Email" value={booking.email} />}
            {(booking.address || booking.postcode) && (
              <InfoRow
                label="Address"
                value={[booking.address, booking.postcode].filter(Boolean).join(', ')}
              />
            )}
          </div>
        </section>
      </div>
    </FormSheet>
  );
}

function DecideSheet({
  booking,
  board,
  jobsById,
  onClose,
}: {
  booking: OnlineBooking;
  board: DispatchBoard;
  jobsById: Map<string, DispatchJob>;
  onClose: () => void;
}) {
  const decide = useDecideOnlineBooking();
  const [employeeId, setEmployeeId] = useState<string | null>(
    booking.suggested?.employee_id ?? null
  );
  const [day, setDay] = useState(booking.day);
  const [half, setHalf] = useState<'am' | 'pm' | 'day'>(booking.half);
  const [declining, setDeclining] = useState(false);
  const [reason, setReason] = useState('');
  const halves: Array<'am' | 'pm' | 'day'> = booking.half === 'day' ? ['day'] : ['am', 'pm'];

  const people = useMemo(
    () => board.people.filter((p) => !/apprentice/i.test(`${p.team_role ?? ''} ${p.role ?? ''}`)),
    [board.people]
  );
  const hours = booking.minutes / 60;
  const clashes = useMemo(
    () =>
      employeeId
        ? clashesFor(board, jobsById, employeeId, day, day, {
            ignoreJobId: booking.job_id ?? undefined,
            hours,
          })
        : [],
    [board, jobsById, employeeId, day, booking.job_id, hours]
  );
  const moved = day !== booking.day || half !== booking.half;
  const changedPerson = employeeId !== (booking.suggested?.employee_id ?? null);

  const accept = async () => {
    try {
      const r = await decide.mutateAsync({
        bookingId: booking.id,
        action: 'accept',
        employeeId,
        day,
        half,
      });
      const who = niceFirstName(board.people.find((p) => p.id === employeeId)?.name) || 'They';
      toast.success(`${booking.type} for ${booking.customer} confirmed`, {
        description: `${who} is booked and gets a push.${
          booking.email
            ? r.emailed
              ? ' The customer has their confirmation, with a reminder the evening before.'
              : ' The confirmation email did not go: send it from the job (Tell the customer).'
            : ' No customer email, so tell them by phone.'
        }`,
        duration: 8000,
      });
      onClose();
    } catch (e) {
      toast.error(dispatchErrorMessage(e));
    }
  };

  const decline = async () => {
    try {
      await decide.mutateAsync({ bookingId: booking.id, action: 'decline', reason });
      toast.success('Booking declined', {
        description: booking.phone
          ? `Let ${booking.customer} know: ${booking.phone}.`
          : booking.email
            ? `Let ${booking.customer} know: ${booking.email}.`
            : undefined,
        duration: 8000,
      });
      onClose();
    } catch (e) {
      toast.error(dispatchErrorMessage(e));
    }
  };

  return (
    <FormSheet
      open
      onOpenChange={(o) => !o && onClose()}
      eyebrow={`Online booking · ref ${booking.reference}`}
      title={`${booking.type} for ${booking.customer}`}
      description={`Asked for ${fmtDay(booking.day, { weekday: 'long', day: 'numeric', month: 'long' })}, ${halfWord(booking.half)}. Accepting books the person and emails the customer.`}
      width="wide"
      footer={
        declining ? (
          <div className="grid grid-cols-2 gap-2">
            <button type="button" className={buttonSecondaryCn} onClick={() => setDeclining(false)}>
              Back
            </button>
            <button
              type="button"
              className={buttonPrimaryCn}
              disabled={decide.isPending}
              onClick={decline}
            >
              {decide.isPending ? (
                <Loader2 className="mx-auto h-4 w-4 animate-spin" />
              ) : (
                'Decline booking'
              )}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            <button type="button" className={buttonSecondaryCn} onClick={() => setDeclining(true)}>
              Decline
            </button>
            <button
              type="button"
              className={buttonPrimaryCn}
              disabled={decide.isPending || !employeeId}
              onClick={accept}
            >
              {decide.isPending ? (
                <Loader2 className="mx-auto h-4 w-4 animate-spin" />
              ) : moved || changedPerson ? (
                'Accept with changes'
              ) : (
                'Accept'
              )}
            </button>
          </div>
        )
      }
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <section className="min-w-0 space-y-3">
          <h3 className="text-[15px] font-semibold text-white">The customer</h3>
          <div className={cn(panel, 'divide-y divide-white/[0.07]')}>
            <KeyValue label="Name" value={booking.customer} />
            <KeyValue label="Came from" value={SOURCE[booking.source] ?? 'Booking link'} />
            {(booking.address || booking.postcode) && (
              <InfoRow
                label="Address"
                value={[booking.address, booking.postcode].filter(Boolean).join(', ')}
              />
            )}
            {booking.notes && <InfoRow label="They said" value={booking.notes} />}
            {booking.deposit && (
              <KeyValue
                label="Deposit"
                value={`${booking.deposit.pounds != null ? `£${Number(booking.deposit.pounds).toFixed(2)} ` : ''}${booking.deposit.paid ? 'paid' : 'not paid yet'}`}
              />
            )}
          </div>
          <div className="grid grid-cols-2 gap-2">
            {booking.phone ? (
              <a
                href={`tel:${booking.phone.replace(/[^\d+]/g, '')}`}
                className={cn(buttonSecondaryCn, 'inline-flex items-center justify-center gap-1.5')}
              >
                <Phone className="h-4 w-4" /> Call
              </a>
            ) : (
              <span />
            )}
            {booking.email ? (
              <a
                href={`mailto:${booking.email}`}
                className={cn(buttonSecondaryCn, 'inline-flex items-center justify-center gap-1.5')}
              >
                <Mail className="h-4 w-4" /> Email
              </a>
            ) : (
              <span />
            )}
          </div>
        </section>

        {declining ? (
          <section className="min-w-0 space-y-3">
            <h3 className="text-[15px] font-semibold text-white">Decline</h3>
            <p className="text-[13px] text-white">
              The diary entry is removed. Nothing is sent automatically: call or email them.
              {booking.deposit?.paid
                ? ' They paid a deposit, so refund it from your card payments.'
                : booking.deposit
                  ? ' The unpaid deposit invoice is cancelled, so it can no longer be paid.'
                  : ''}
            </p>
            <label className={labelCn} htmlFor="ob-reason">
              Reason, for your records (optional)
            </label>
            <textarea
              id="ob-reason"
              className={textareaCn}
              rows={3}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </section>
        ) : (
          <section className="min-w-0 space-y-4">
            <h3 className="text-[15px] font-semibold text-white">Who and when</h3>
            <div>
              <span className={labelCn}>Who goes</span>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {people.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setEmployeeId(p.id)}
                    className={cn(
                      chipBase,
                      'px-3 truncate',
                      employeeId === p.id ? chipOn : chipOff
                    )}
                  >
                    {niceFirstName(p.name) || p.name}
                    {booking.suggested?.employee_id === p.id ? ' (picked)' : ''}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelCn} htmlFor="ob-day">
                  Day
                </label>
                <input
                  id="ob-day"
                  type="date"
                  min={todayYmd()}
                  value={day}
                  onChange={(e) => e.target.value && setDay(e.target.value)}
                  className={inputCn}
                />
              </div>
              <div>
                <span className={labelCn}>Time</span>
                <div
                  className={cn('grid gap-2', halves.length === 2 ? 'grid-cols-2' : 'grid-cols-1')}
                >
                  {halves.map((h) => (
                    <button
                      key={h}
                      type="button"
                      onClick={() => setHalf(h)}
                      className={cn(chipBase, half === h ? chipOn : chipOff)}
                    >
                      {h === 'am' ? 'Morning' : h === 'pm' ? 'Afternoon' : 'All day'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            {clashes.length > 0 && (
              <p className="text-[13px] font-medium text-orange-300">
                Clashes: {clashes.join(' · ')}
              </p>
            )}
            {changedPerson && (
              <p className="text-[13px] text-white">
                The scheduling logic picked{' '}
                {booking.suggested ? niceFirstName(booking.suggested.name) : 'nobody'} for the
                credentials and travel. The job sheet still warns if your pick lacks something.
              </p>
            )}
          </section>
        )}
      </div>
    </FormSheet>
  );
}

/** A label over a value that may run to several lines (address, notes). */
function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="px-4 py-2.5 sm:px-5">
      <p className="text-[13px] text-white">{label}</p>
      <p className="mt-0.5 break-words text-[15px] font-medium leading-snug text-white">{value}</p>
    </div>
  );
}
