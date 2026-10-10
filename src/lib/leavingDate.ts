/** Leaving-date helpers for the archive paths (ELE-2075, gap 3C #30). */
import { format } from 'date-fns';

export const todayIso = () => format(new Date(), 'yyyy-MM-dd');

/** The real last day: on or before today (archiving stops access now). */
export const leavingDateValid = (v: string) => !!v && v <= todayIso() && v >= '1990-01-01';
