/**
 * ELE-1471 — turning a booking-portal booking into a project.
 *
 * When a customer books a slot, `public-booking` creates the calendar event,
 * the customer, a task and a notification — but nothing that starts a job. The
 * electrician got a notification pointing at the calendar and no way to act on
 * it, so a booking could land and quietly go nowhere ("I booked a slot but not
 * sure where it goes after that?").
 *
 * The booking is deliberately NOT auto-converted: a test or speculative booking
 * would become a real project someone then has to delete. Instead the
 * notification carries enough detail to pre-fill the new-project sheet, and the
 * electrician decides.
 */

/** Marks a Projects-page visit as "open the create sheet, pre-filled". */
export const BOOKING_PROJECT_PARAM = 'fromBooking';

export interface BookingNotificationMetadata {
  customer_id?: string | null;
  event_id?: string | null;
  client_name?: string | null;
  job_description?: string | null;
  /** ISO date, YYYY-MM-DD — the booked day. */
  date?: string | null;
  start_time?: string | null;
  location?: string | null;
}

export const BOOKING_NOTIFICATION_TYPE = 'booking_received';

export const isBookingNotification = (type?: string | null): boolean =>
  type === BOOKING_NOTIFICATION_TYPE;

/**
 * A project title the electrician will recognise in a list. The job description
 * is what they actually care about; the client name is the fallback when the
 * customer left the description blank.
 */
export const bookingProjectTitle = (meta: BookingNotificationMetadata): string => {
  const job = meta.job_description?.trim();
  const client = meta.client_name?.trim();
  const title = job || (client ? `Booking — ${client}` : 'Booking');
  // Keep it to something that reads on a phone-width card.
  return title.length > 120 ? `${title.slice(0, 117)}…` : title;
};

/**
 * Deep link to the Projects page with the create sheet pre-filled. Values are
 * carried in the query string rather than router state so the link survives a
 * push notification, a hard refresh, or being opened in a new tab.
 */
export const bookingProjectUrl = (meta: BookingNotificationMetadata): string => {
  const params = new URLSearchParams();
  params.set(BOOKING_PROJECT_PARAM, '1');
  params.set('title', bookingProjectTitle(meta));

  const description = meta.job_description?.trim();
  if (description) params.set('description', description);
  if (meta.customer_id) params.set('customerId', meta.customer_id);
  // The booked day becomes the due date — the job is expected on the day the
  // customer chose, which is the whole point of them picking a slot.
  if (meta.date) params.set('dueDate', meta.date);
  if (meta.location?.trim()) params.set('location', meta.location.trim());

  return `/electrician/projects?${params.toString()}`;
};
