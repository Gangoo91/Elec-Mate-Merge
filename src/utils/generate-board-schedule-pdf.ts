/**
 * Shared shape of a board schedule, used by the page, the payload builder and
 * the certificate importer.
 *
 * ⚠️ This file used to ALSO generate both PDFs client-side with jsPDF. Both
 * generators are gone: the CU door label and the A4 schedule are now PDFMonkey
 * templates rendered by `generate-cu-door-label-pdf` and
 * `generate-board-schedule-pdf`, fed by one payload builder
 * (`board-schedule-payload.ts`).
 *
 * The jsPDF door label was removed because it could not carry the company's
 * branding, drifted from the A4 layout it was supposed to match, and rendered
 * a raw value straight into the document with no guard — an object reaching it
 * printed "[object Object]" across every row. Do not reintroduce a client-side
 * layout as a second source of truth; if offline capture is needed, queue the
 * render and retry.
 */

export interface BoardCircuit {
  id: string;
  circuitNumber: string;
  description: string;
  rating: string;
  type: string; // MCB, RCBO, Fuse, etc.
  cableSize?: string;
  zs?: string;
  rcdRating?: string;
  /**
   * 'L1' | 'L2' | 'L3' on a three-phase board — a WAY carries all three, so
   * way 1 has an L1, L2 and L3 row, way 2 likewise, and so on. Absent on
   * single-phase boards, where every conductor is brown (L1) and labelling
   * each row would be noise. BS 7671 Table 51: L1 brown, L2 black, L3 grey.
   */
  phase?: string;
}

export interface BoardScheduleData {
  boardRef: string;
  location: string;
  mainSwitchRating: string;
  rcdDetails: string;
  circuits: BoardCircuit[];
  companyName?: string;
  notes?: string;
  /**
   * Board-level detail an electrician expects on a schedule. All optional and
   * all already recorded per board on an EICR (`distributionBoards[]`), so
   * they populate for free when a schedule is imported from a certificate:
   *   boardMake  ← make      totalWays ← totalWays
   *   spd        ← spdT1/T2/T3 + spdOperationalStatus
   */
  boardMake?: string;
  totalWays?: string;
  spd?: string;
  /** Upstream board this one is fed from — matters on sub-mains. */
  fedFrom?: string;

  /*
   * Client and site. Needed for three separate reasons, not just decoration:
   *   • `reports.client_name` and `installation_address` are populated from
   *     these, so a saved schedule is findable in the certificate library.
   *   • `clientEmail` prefills the send dialog — a document you email needs
   *     to know who it goes to.
   *   • The A4 document names who it was prepared for. A schedule with no
   *     client and no address is not a handover document, it is a printout.
   * All optional: the CU door label ignores every one of them.
   */
  clientName?: string;
  clientEmail?: string;
  installationAddress?: string;
  /** ISO yyyy-mm-dd. Drives `reports.inspection_date`. */
  scheduleDate?: string;
}
