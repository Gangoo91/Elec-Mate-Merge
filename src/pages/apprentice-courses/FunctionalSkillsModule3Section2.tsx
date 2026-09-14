/**
 * Functional Skills · Module 3 · Section 2 — Spreadsheets & calculations
 *
 * CONVERTED (13 Sep) from the 2024 dialect to the StudyPage reading kit.
 * DENSITY PASS (13 Sep): this was the worst ordering record in the course —
 * seven of eight sections taught with no worked example after them. This pass:
 *
 *  - Merged the 13 ConceptBlocks down to 8 (one per section), folding
 *    "Lookup tables" and "Keep the units" into the block before them rather
 *    than leaving that material stranded with nothing worked after it.
 *  - Added five new WorkedExample blocks and four new TryIt blocks so every
 *    section runs explain → show → do. Section 01 previously had neither —
 *    it now carries the absolute-vs-relative reference example ($B$2 vs B2,
 *    one version breaking on copy-down and one working), the single most
 *    common beginner error, which the page barely touched before.
 *  - Fixed a genuine logic bug in the Project 2 nested-IF example, in both
 *    the ConceptBlock bullet and the new worked example that builds it: the
 *    old formula tested "due soon" (F2-TODAY()<30) before "overdue", but a
 *    negative day-count is always less than 30, so an overdue tool matched
 *    DUE SOON first and IF never reached OVERDUE. Corrected to test OVERDUE
 *    first — a spreadsheet logic error, not a BS 7671 fact.
 *  - Quiz bank, all three InlineChecks (ids unchanged), the corrected job-
 *    costing wording, and the VAT/voltage-drop figures below are untouched.
 *
 * Accuracy corrections carried in from the audit (13 Sep, unchanged):
 *  - Job costing InlineCheck. "Subtotal" meant two different numbers on the
 *    page (materials+labour+overheads vs the post-profit figure). Fixed by
 *    asking for "the net price you quote, before VAT" (£5,244) instead —
 *    "subtotal" keeps its one meaning (£4,560) throughout. Do not revert it.
 *  - VAT on energy-saving materials (heat pumps, solar PV): zero-rated (0%)
 *    UK-wide until 31 March 2027, then reverts to the existing 5% reduced
 *    rate. "5%" would be wrong as today's rate.
 *  - Voltage drop: BS 7671 Appendix 4 §6.4 gives 3% for lighting and 5% for
 *    other uses as RECOMMENDED maxima, deemed-to-satisfy via Reg 525.202 —
 *    never "maximum permitted", and lighting is never collapsed into the
 *    general 5% figure.
 *  - Waste factors, overhead percentages (15-25% of labour) and profit
 *    margins (10-20%) are commercial norms a business sets for itself, not
 *    standards — hedged as typical starting points throughout.
 *  - "Table 4D1A onwards" was already in the old page, citing BS 7671
 *    Appendix 4. No new BS 7671 table numbers have been added.
 *
 * Excel, Google Sheets and LibreOffice Calc are named neutrally — none
 * competes with certification or circuit-design software.
 *
 * Deliberately NOT using <RegsCallout> anywhere on this page: it renders its
 * `clause` prop as quoted regulation text, and this page paraphrases
 * throughout.
 */

import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { HubPage, HubBody, HubMasthead } from '@/components/hub/HubPrimitives';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import {
  StudyPage,
  ReadingProgress,
  TLDR,
  ConceptBlock,
  CommonMistake,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  Prerequisites,
  Scenario,
  ContentEyebrow,
  SectionRule,
  WorkedExample,
  TryIt,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Spreadsheets & Calculations - Functional Skills Module 3.2';
const DESCRIPTION =
  'Functional Skills maths for electricians: building cable calculation spreadsheets, material takeoffs, job costing templates, essential formulae, charts and sorting/filtering — turning an equation into a cell reference.';

const codeCn = 'rounded bg-white/10 px-1.5 py-0.5 font-mono text-[12px] text-white';

const quizQuestions = [
  {
    id: 1,
    question:
      'Which Excel formula would you use to add up the total cost of all materials in cells B2 to B50?',
    options: ['=ADD(B2:B50)', '=SUM(B2:B50)', '=TOTAL(B2:B50)', '=COUNT(B2:B50)'],
    correctAnswer: 1,
    explanation:
      '=SUM(B2:B50) adds together all values in the range from cell B2 to B50. SUM is the most commonly used spreadsheet formula and is essential for calculating totals in material lists, invoices and cable schedules. COUNT counts the number of entries rather than adding their values.',
  },
  {
    id: 2,
    question:
      'You need to calculate the voltage drop across a cable. The formula is Vd = (mV/A/m × Ib × L) / 1000. In a spreadsheet where mV/A/m is in cell B2, Ib is in C2, and L is in D2, which formula is correct?',
    options: ['=B2/C2/D2*1000', '=(B2+C2+D2)/1000', '=(B2*C2*D2)/1000', '=SUM(B2,C2,D2)/1000'],
    correctAnswer: 2,
    explanation:
      'The voltage drop formula multiplies the three values together and divides by 1000. In spreadsheet notation the asterisk (*) is multiplication. =(B2*C2*D2)/1000 correctly implements Vd = (mV/A/m × Ib × L) / 1000 — each cell reference stands in for one term of the equation, in the same order.',
  },
  {
    id: 3,
    question: 'What does the IF function do in a spreadsheet?',
    options: [
      'Combines the text from two or more cells into one cell',
      'Counts how many cells in a range contain numeric values',
      'Looks up a value in a table and returns a matching result',
      'Returns one value if a condition is true and another if it is false',
    ],
    correctAnswer: 3,
    explanation:
      'The IF function tests a condition and returns different values depending on whether it is true or false. For example, =IF(B2<=11.5,"PASS","FAIL") would check a calculated voltage drop against a recommended maximum and display PASS or FAIL accordingly. This is invaluable for automating compliance checks in electrical spreadsheets.',
  },
  {
    id: 4,
    question:
      'When building a material takeoff spreadsheet, what should you include for each item?',
    options: [
      'Item description, quantity, unit, unit cost, and total cost',
      'Item description and total cost only, to keep the sheet simple',
      'Just the supplier name and an overall lump-sum price',
      'Quantity and unit cost, with totals worked out separately by hand',
    ],
    correctAnswer: 0,
    explanation:
      'A comprehensive material takeoff includes the item description, quantity needed, unit of measurement (metres, each, box), unit cost, and calculated total cost (quantity × unit cost). This level of detail enables accurate costing, easy comparison between suppliers, and clear records for invoicing.',
  },
  {
    id: 5,
    question:
      'Which chart type is best for showing the breakdown of costs across different categories in a job?',
    options: ['Scatter plot', 'Pie chart', 'Histogram', 'Line chart'],
    correctAnswer: 1,
    explanation:
      'A pie chart is ideal for showing the proportional breakdown of costs across categories (materials, labour, overheads, profit). Each slice represents a share of the total, making it easy to see at a glance where the money is being spent. Line charts are better for showing trends over time.',
  },
  {
    id: 6,
    question: 'What is the purpose of freezing the top row in a spreadsheet?',
    options: [
      'It prevents anyone from editing the values in the top row',
      'It automatically sorts the data into alphabetical order',
      'It keeps the header row visible while scrolling through data below',
      'It locks the formulae in that row so they cannot be deleted',
    ],
    correctAnswer: 2,
    explanation:
      "Freezing the top row keeps your column headers (e.g. 'Circuit Ref', 'Cable Size', 'Length', 'Voltage Drop') visible as you scroll down through long lists of data. Without frozen headers, you quickly lose track of which column contains which data, leading to errors.",
  },
  {
    id: 7,
    question:
      'You have a spreadsheet of 200 circuits. How would you quickly find all circuits using 6mm² cable?',
    options: [
      'Scroll through manually and look at each row',
      'Delete all rows that are not 6mm²',
      'Print it out and highlight with a pen',
      'Use the Filter function on the cable size column',
    ],
    correctAnswer: 3,
    explanation:
      'The Filter function allows you to show only rows matching your criteria — in this case, all circuits with a cable size of 6mm². Filters are non-destructive (they hide rows temporarily rather than deleting them) and can be removed to show all data again. This is far faster and more reliable than manual searching.',
  },
  {
    id: 8,
    question: 'What is the AVERAGE function used for in electrical calculations?',
    options: [
      'Calculating the arithmetic mean of a range of values',
      'Counting how many values are above a threshold',
      'Finding the middle value in a sorted list',
      'Finding the most common value in a range',
    ],
    correctAnswer: 0,
    explanation:
      'The AVERAGE function calculates the arithmetic mean — the sum of all values divided by the count of values. In electrical work this is useful for average power consumption, mean test results across multiple readings, or typical material costs when comparing suppliers. The middle of a sorted list is the MEDIAN, not the AVERAGE — a different function entirely.',
  },
];

const FunctionalSkillsModule3Section2 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 3 · Section 2"
        title="Spreadsheets & calculations"
        backTo="/study-centre/apprentice/functional-skills/module3"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        {/* Wider than the 64rem default, to match the rest of the course — this
            section carries formulae and column layouts that read badly when
            they wrap. */}
        <StudyPage measure="74rem" wide="94rem">
          <p className="text-[13px] leading-relaxed text-white">
            A spreadsheet is the only tool in your kit that turns one measurement into every other
            number that depends on it. Change a cable length and the voltage drop, the material cost
            and the client quotation update themselves — nothing gets re-typed, and nothing gets
            forgotten. This section is about building that habit: not learning software for its own
            sake, but taking the equations and lists you already use on paper and turning them into
            something that calculates itself.
          </p>

          <LearningOutcomes
            outcomes={[
              'Set up a spreadsheet with correct cell references, including absolute references, so a single change updates every calculation that depends on it.',
              'Translate an electrical formula — cable sizing, voltage drop, job costing — directly into a spreadsheet formula, term by term.',
              'Build a material takeoff and a job costing sheet with the columns that a real quotation needs.',
              'Use SUM, AVERAGE, MAX, MIN, IF, SUMIF, VLOOKUP, ROUND and COUNTIF, and know which one answers which question.',
              'Choose the right chart for a set of data, and say what the wrong chart would hide.',
              'Sort and filter a large spreadsheet to find what you need, without disturbing the data underneath it.',
            ]}
          />

          <Prerequisites
            items={[
              {
                term: 'Module 3, Section 1',
                gist: 'This section assumes you can open a spreadsheet, find your way around a file system, and are comfortable typing on a keyboard. If any of that is shaky, start there.',
              },
              {
                term: 'Module 1 — percentages and ratios',
                gist: 'Waste factors, overheads, profit margins and VAT are all percentages of something. You do not need to be fast at them, but the arithmetic itself should not be new.',
              },
            ]}
          />

          <TLDR
            points={[
              'The golden rule of spreadsheets: never type the same number in two places. Enter a value once and reference the cell everywhere else.',
              'A relative reference (B2) shifts when a formula is copied; an absolute reference ($B$2) stays locked to one cell. Use $B$2 for any single fixed value — a rate, a VAT percentage — that every row must reference identically.',
              'A regulation-book formula and a spreadsheet formula are the same thing written two ways. Vd = (mV/A/m × Ib × L) / 1000 is =(B2*C2*D2)/1000 — the cell references stand in for the terms, in the same order.',
              'BS 7671 Appendix 4 section 6.4 gives RECOMMENDED maximum voltage drops — 3% for lighting, 5% for other uses — as a deemed-to-satisfy route via Regulation 525.202. They are not a permitted ceiling, and lighting is not the same figure as everything else.',
              'A material takeoff needs description, quantity, unit, unit cost and total cost for every line — nothing less does the job.',
              'A job costing sheet has a clear order: materials + labour + overheads = subtotal; subtotal + profit = the net price you quote; net price + VAT = what the client pays.',
              'Waste allowances, overhead percentages and profit margins are commercial norms a business sets for itself, not fixed rules — treat any figure you meet as a typical starting point.',
              'Certain energy-saving materials are zero-rated for VAT across the UK until 31 March 2027, when the rate reverts to the existing reduced rate of 5%. It is not currently 5%.',
              'SUM, AVERAGE, IF, SUMIF, VLOOKUP, ROUND and COUNTIF cover almost everything an electrician needs from a spreadsheet — learn what each one answers, not just its syntax.',
              'Sorting rearranges your data; filtering hides rows temporarily. Neither one deletes anything, which is exactly why they are safe to experiment with.',
            ]}
          />

          <SectionRule />

          {/* ── 01 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>01 · Spreadsheet fundamentals</ContentEyebrow>

          <ConceptBlock
            title="Cell addresses, and the reference that makes it all work"
            plainEnglish="A cell address is just a grid reference — column letter, then row number. B5 is column B, row 5. Everything else in this section builds on that one idea, plus one more: point a formula at the cell instead of typing the number."
          >
            <p>
              Whether you use Microsoft Excel, Google Sheets (free and browser-based) or LibreOffice
              Calc (free and offline), the underlying concept is identical: data sits in cells
              arranged in rows (numbered 1, 2, 3&hellip;) and columns (lettered A, B, C&hellip;).
              The active cell is highlighted with a border, and its address shows in the Name Box at
              the top left. Click a cell and start typing to enter data; press Enter to move down,
              Tab to move right.
            </p>
            <p>
              A single file — a <strong className="text-white">workbook</strong> — can hold several
              sheets, shown as tabs along the bottom. Keep related data on separate sheets within
              one workbook rather than in separate files: one sheet for cable calculations, one for
              material costs, one for the summary. Reference a cell on another sheet with{' '}
              <code className={codeCn}>=Sheet2!B5</code>.
            </p>
            <p>
              Now the idea that makes a spreadsheet worth more than a calculator. Instead of typing
              a number into a formula, you point the formula at the cell that holds it. If A2 holds
              a cable length of 25 m and B2 holds a cost of £3.50 per metre, the formula{' '}
              <code className={codeCn}>=A2*B2</code> in C2 returns £87.50. Change A2 to 30 and C2
              recalculates to £105.00 without you touching it. Every calculation later in this
              section rests on that one idea: reference the cell, never retype the number. Basic
              formatting supports this rather than decorating it — bold headers, currency formatting
              on money columns, a consistent number of decimal places on measurements — used
              sparingly.
            </p>
          </ConceptBlock>

          <WorkedExample
            question="A single VAT rate of 0.20 sits once in cell B2. Column A holds the net price for each of six invoice rows. You write =A2*(1+B2) in C2 to get the gross price, then copy it down to C3, C4, C5, C6. What happens, and how do you fix it?"
            steps={[
              {
                calc: 'C2 = A2*(1+B2)',
                note: "Correct for row 2 — A2 is that row's net price, B2 is the VAT rate.",
              },
              {
                calc: 'Copy down to C3 → becomes A3*(1+B3)',
                note: "A spreadsheet shifts every reference by the same number of rows when you copy a formula down. A3 is exactly what you want — row 3's own net price. B3 is not: the VAT rate was only ever typed into B2, so B3 is empty and the formula returns the wrong figure.",
              },
              {
                calc: 'Fix: lock the VAT cell with $ signs → C2 = A2*(1+$B$2)',
                note: 'This is an absolute reference. The dollar signs tell the spreadsheet never to shift that reference, in either direction, when the formula is copied.',
              },
              {
                calc: 'Copy down again → C3 becomes A3*(1+$B$2), C4 becomes A4*(1+$B$2)…',
                note: 'A3, A4, A5 still shift — each row correctly uses its own net price. $B$2 never moves, because it is fixed to the one cell where the VAT rate actually lives.',
              },
            ]}
            answer="=A2*(1+$B$2), copied down the column. Without the $ signs the formula is silently wrong from row 3 onwards; with them it is correct for every row you copy it to."
            watchOut="A reference with no $ is relative and moves with the copy. $B$2 freezes both the column and the row; B$2 or $B2 freezes only one of them, which matters in some layouts. $B$2 is the safe default any time a formula points at a single fixed value that lives in one cell and is used everywhere."
          />

          <TryIt
            question="A single labour rate of £32.50/hr sits once in cell B2. Column A holds hours worked for each of twelve job rows. Write the formula for row 2's labour cost in C2, then say what would go wrong if you copied it down without the $ signs, and how you would prevent it."
            steps={[
              {
                calc: 'Without $ signs: C2 = A2*B2, copied to C3 = A3*B3',
                note: 'B3 is empty — the rate was only ever entered in B2 — so every row from 3 onwards returns the wrong cost.',
              },
              {
                calc: 'With the fix: C2 = A2*$B$2',
                note: '$B$2 stays locked to the one cell holding the rate.',
              },
              {
                calc: 'Copied down: C3 = A3*$B$2, C4 = A4*$B$2…',
                note: 'A2, A3, A4 shift with each row; $B$2 never does.',
              },
            ]}
            answer="=A2*$B$2, copied down all twelve rows. A2 shifts to A3, A4… — each row's own hours — while $B$2 always points back at the single cell the rate was typed into once."
          />

          <CommonMistake
            title="Typing the same number in two places"
            whatHappens="You calculate a total by hand, then type the result straight into another cell instead of building a formula that points at the original figures. Weeks later a material price changes, you update it in one place, and the total silently goes stale because nothing was actually connected to it."
            doInstead="Every value that is derived from another value should be a formula referencing that cell, not a typed-in number. If you can trace a figure back to a calculation on paper, it belongs in a formula, not as a constant."
          />

          <SectionRule />

          {/* ── 02 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>02 · Cable calculation spreadsheets</ContentEyebrow>

          <ConceptBlock
            title="One row per circuit, one column per term"
            onSite="A cable calculation spreadsheet is not a shortcut around understanding the maths — it is the maths, written so it can be checked and reused. If you cannot explain what each column does by hand, do not trust the spreadsheet to do it for you."
          >
            <p>
              Set up columns for: Circuit Reference, Design Current (Ib), Protective Device Rating
              (In), Cable Type, Installation Method, Correction Factors (Ca, Cg, Ci, Cf), Tabulated
              Current (It), Selected Cable Size, Actual Current-Carrying Capacity (Iz), Voltage Drop
              mV/A/m, Cable Length, Calculated Voltage Drop, and a Pass/Fail column. One row per
              circuit, and the spreadsheet becomes a working schedule you can hand over as part of
              the record.
            </p>
            <p>
              Use VLOOKUP or INDEX/MATCH to pull cable data automatically from a reference sheet
              built from the cable rating tables in BS 7671 Appendix 4 (Table 4D1A onwards). Set it
              up once, and every circuit on the sheet looks up its own current rating rather than
              you checking the book line by line. Conditional formatting then turns the Pass/Fail
              column into something you can read at a glance — green for PASS, red for FAIL — and
              can be layered further: colour a voltage drop cell amber as it approaches its
              recommended maximum (for example, above 9 V on a general circuit checked against 11.5
              V), so a marginal result stands out before it actually fails.
            </p>
          </ConceptBlock>

          <WorkedExample
            question="The required current-carrying capacity is It = Ib / (Ca × Cg × Ci × Cf). Ib is in cell B2 and the four correction factors are in E2, F2, G2 and H2. Build the spreadsheet formula term by term."
            steps={[
              {
                calc: 'Ib → B2',
                note: 'The design current is a single number in a single cell — nothing to combine yet.',
              },
              {
                calc: 'Ca × Cg × Ci × Cf → E2*F2*G2*H2',
                note: 'Four correction factors multiplied together. In a formula, * is multiplication — there is no separate symbol for "times" as there might be on paper.',
              },
              {
                calc: 'Division goes around the product → B2/(E2*F2*G2*H2)',
                note: 'The brackets matter. Without them, =B2/E2*F2*G2*H2 divides by E2 only and then multiplies by the rest — a different, wrong answer.',
              },
            ]}
            answer="=B2/(E2*F2*G2*H2) — Ib divided by the product of all four correction factors."
            watchOut="Every operator in the equation has to appear in the formula. It is easy to get the brackets wrong and have the spreadsheet compute something plausible-looking but incorrect. Test the formula against a calculation you have already done by hand before trusting it on new circuits."
          />

          <WorkedExample
            question="Vd = (mV/A/m × Ib × L) / 1000. mV/A/m is in J2, Ib is in B2, and cable length in metres is in K2. Build the spreadsheet formula, then check it for a 32 A ring final circuit where J2 = 2.8, B2 = 32, K2 = 18."
            steps={[
              {
                calc: 'mV/A/m × Ib × L → J2*B2*K2',
                note: 'Three terms multiplied together, in the same order they appear in the equation. Order does not change the answer here, but keeping it matches the formula makes the spreadsheet easier to check against the regulation.',
              },
              {
                calc: 'Divide by 1000 → (J2*B2*K2)/1000',
                note: 'The equation divides by 1000 to convert millivolts into volts. Leave this off and every result is a thousand times too large.',
              },
              {
                calc: 'J2*B2*K2 = 2.8 × 32 × 18 = 1,612.8',
                note: 'The spreadsheet does this arithmetic instantly; the point of the worked example is knowing what it is doing, not doing it yourself.',
              },
              {
                calc: '1,612.8 / 1000 = 1.6128',
                note: 'Rounds sensibly to 1.61 V for a schedule.',
              },
            ]}
            answer="=(J2*B2*K2)/1000, giving a voltage drop of approximately 1.61 V for this circuit — comfortably below the recommended maximum for a general-use circuit on a 230 V supply, which is 5%, or about 11.5 V (Appendix 4 section 6.4, deemed-to-satisfy via Regulation 525.202)."
            watchOut="That 11.5 V figure is the recommended maximum for circuits generally — it is not the figure for lighting. Lighting circuits use the lower 3% recommendation, about 6.9 V on a 230 V supply, because the flicker and dimming effects of voltage drop are more noticeable on lighting loads. Applying the general 5% figure to a lighting circuit understates the problem."
          />

          <TryIt
            question="Apply the same pattern to a different circuit. mV/A/m is in J5, Ib is in B5, and length in K5. The circuit is a lighting circuit. Write the formula, then say what figure you would check the result against."
            steps={[
              {
                calc: 'Formula: =(J5*B5*K5)/1000',
                note: 'Same structure as before — only the row number changes.',
              },
              {
                calc: 'This is a lighting circuit',
                note: 'The recommended maximum is 3%, not 5%, because it is lighting.',
              },
              {
                calc: '3% of 230 V ≈ 6.9 V',
                note: 'The figure to check the calculated result against — not 11.5 V.',
              },
            ]}
            answer="=(J5*B5*K5)/1000, checked against roughly 6.9 V — the recommended maximum for a lighting circuit, not the 11.5 V figure that applies to circuits generally. Building a single IF column that only ever compares against 11.5 V will silently pass lighting circuits that should have failed."
          />

          <SectionRule />

          <InlineCheck
            id="m3s2-cable-calc"
            question="In a spreadsheet, the formula =B2/(E2*F2*G2*H2) calculates which electrical value?"
            options={[
              'Total cable cost including labour',
              'The required tabulated current-carrying capacity (It) after applying correction factors',
              'The voltage drop across the cable',
              'The earth fault loop impedance',
            ]}
            correctIndex={1}
            explanation="The formula divides the design current (Ib in B2) by the product of all correction factors (Ca, Cg, Ci, Cf in E2-H2), giving the minimum tabulated current-carrying capacity (It) the cable needs: It = Ib / (Ca × Cg × Ci × Cf). Notice this is exactly the same working from Section 02's first worked example, with the cells named."
          />

          <SectionRule />

          {/* ── 03 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>03 · Material lists & takeoffs</ContentEyebrow>

          <ConceptBlock title="The columns a material takeoff actually needs">
            <p>
              A material takeoff (MTO) is a detailed list of everything an installation needs. Build
              it with these columns: Item Number, Category (Cable, Containment, Accessories,
              Distribution, Lighting), Description (including size, type and colour), Manufacturer /
              Part No., Unit (metres, each, box, reel), Quantity, Unit Cost, and Total Cost —
              calculated as <code className={codeCn}>=Quantity*UnitCost</code>, never typed by hand.
            </p>
            <p>
              Add a column per supplier and use MIN to flag the cheapest:{' '}
              <code className={codeCn}>=MIN(F2,G2,H2)</code> returns the lowest of three quoted
              prices. Then use SUMIF to roll totals up by category —{' '}
              <code className={codeCn}>=SUMIF(B:B,"Cable",H:H)</code> sums the total-cost column
              wherever the category column reads "Cable" — giving you a cable total, a containment
              total, an accessory total, without a separate calculation. That breakdown then feeds
              straight into the job costing sheet in Section 04, by reference rather than by
              retyping.
            </p>
          </ConceptBlock>

          <WorkedExample
            question="Row 2 of a takeoff is 85 m of 2.5mm² twin and earth at £0.62/m. Build the total-cost formula, then add a 5% waste allowance so the quantity you actually order accounts for offcuts. Quantity is in B2, unit cost in C2, waste % in E2."
            steps={[
              {
                calc: 'Total cost = Quantity × Unit cost → D2 = B2*C2',
                note: 'The price of exactly what was measured: 85 × £0.62 = £52.70.',
              },
              {
                calc: 'Order quantity = Quantity × (1 + Waste% / 100) → F2 = B2*(1+E2/100)',
                note: 'A 5% allowance is a typical starting point for cable — a figure a business learns from its own scrap rate, not a fixed rule.',
              },
              {
                calc: '85 × (1 + 5/100) = 85 × 1.05 = 89.25',
                note: 'Round up to a sensible order quantity for the reel size available — 90 m.',
              },
            ]}
            answer="D2 = B2*C2 = £52.70 (the priced cost of the metreage as measured) and F2 = B2*(1+E2/100) = 89.25 m ≈ 90 m (what you actually order). Two different questions, two different formulas — both start from the same B2, but they answer 'what does this cost' and 'how much do I buy' separately."
            watchOut="Waste allowances vary by material and by how a job is actually running — a first fix in an open loft loses far less cable than one threaded through dot-and-dab partitions. Treat any percentage you are given as a sensible starting point to adjust, not a number to apply everywhere unchanged."
          />

          <TryIt
            question="Row 5 is 40 m of 25mm galvanised conduit at £1.85/m, with a typical containment waste allowance of 10%. Quantity is in B5, unit cost in C5, waste % in E5. Build both formulas."
            steps={[
              {
                calc: 'D5 = B5*C5 = 40 × £1.85 = £74.00',
                note: 'The priced cost of the length as measured.',
              },
              {
                calc: 'F5 = B5*(1+E5/100) = 40 × 1.10 = 44',
                note: 'The quantity to actually order, allowance included.',
              },
            ]}
            answer="D5 = B5*C5 = £74.00; F5 = B5*(1+E5/100) = 44 m. Same two formulas as the cable example — only the unit cost and the waste percentage change."
          />

          <Scenario
            title="The reel that ran eight metres short"
            situation="You quote a rewire using the exact metreage measured off the drawing, with no allowance added, because the drawing 'should be accurate'. On site, two runs need re-pulling after a snag, and a third is longer than drawn because the actual route avoids a soil pipe. You are eight metres short with the last circuit still to wire."
            whatToDo="Order the shortfall as an emergency top-up, at whatever price and delivery time the supplier can manage that day — usually worse than your original quote. Then add a waste allowance to the takeoff template so the next job does not repeat this."
            whyItMatters="A takeoff built from drawing measurements with nothing added is describing a perfect installation that does not exist. The allowance is not padding the price — it is acknowledging that cable gets re-pulled, corners get cut differently to the drawing, and offcuts are real. Skipping it does not save the client money; it just moves the cost to a worse time and a worse price."
          />

          <WorkedExample
            question="Your takeoff has 40 lines, each tagged with a category in column B (Cable, Containment, Accessories, Distribution, Lighting) and a total cost in column H. Build a formula that gives the cable total without a separate calculation."
            steps={[
              { calc: 'What to match on → column B reads "Cable"', note: 'The category column.' },
              { calc: 'What to sum → column H', note: 'The total-cost column.' },
              {
                calc: 'Combine → =SUMIF(B:B,"Cable",H:H)',
                note: 'Sums H wherever B matches "Cable", ignoring every other row.',
              },
            ]}
            answer='=SUMIF(B:B,"Cable",H:H). Copy the same formula with "Containment", "Accessories" and so on swapped in, and you have a category breakdown that updates itself the moment a new line is added to the takeoff.'
            watchOut='SUMIF needs the category text to match exactly — "Cables" and "Cable" in the same column produce two separate totals instead of one. Keep a fixed list of category names in the header row and pick from it, rather than typing a category freehand on every line.'
          />

          <SectionRule />

          {/* ── 04 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>04 · Job costing templates</ContentEyebrow>

          <ConceptBlock
            title="The order the figures go in"
            onSite="A job costing sheet is not a pile of numbers in a box — it is a sequence, and every stage has a name. Confuse the names and you can end up quoting the wrong figure without a single arithmetic error."
          >
            <p>
              Build the sheet in this order: Materials (pulled by reference from your takeoff total
              — for example <code className={codeCn}>=MTO!H100</code>), Labour (hours × rate, per
              task), Subcontractor costs, Direct costs (hire, skip, parking, certificate fees). Add
              those together and that total — materials + labour + overheads — is the{' '}
              <strong className="text-white">subtotal</strong>. Apply profit to the subtotal, and
              the result is the net price you quote. VAT, if applicable, is applied last, on top of
              the net price.
            </p>
            <ul className="mt-2 space-y-1.5">
              <li>
                <strong className="text-white">Overheads</strong> cover running the business — van,
                insurance, tools, phone, accounting, CPD — usually calculated as a percentage of
                labour. A commonly used starting point is around 15-25% of labour, but this is a
                figure each business works out for itself from its own costs, not a published rate.
              </li>
              <li>
                <strong className="text-white">Profit margin</strong> is applied to the subtotal:{' '}
                <code className={codeCn}>=Subtotal*ProfitPercent/100</code>. A commonly used range
                for domestic work is around 10-20%, again a commercial choice rather than a rule.
              </li>
              <li>
                <strong className="text-white">VAT</strong>, where you are VAT registered, is
                usually 20%: <code className={codeCn}>=NetPrice*0.2</code>. Certain energy-saving
                materials — heat pumps, solar PV, and similar installations — are currently{' '}
                <strong className="text-white">zero-rated (0%)</strong> across the UK until 31 March
                2027, after which the rate reverts to the existing reduced rate of 5%. Do not quote
                5% as today's rate for that category — it is currently zero.
              </li>
            </ul>
          </ConceptBlock>

          <WorkedExample
            question="A job: materials £3,200 (from the takeoff), labour 30 hours at £70/hr, overheads at 18% of labour, profit margin 12%, standard-rated for VAT. Build the sheet stage by stage through to the figure the client actually pays."
            steps={[
              {
                calc: 'Materials = £3,200',
                note: 'Pulled by reference from the material takeoff total.',
              },
              { calc: 'Labour = 30 × £70 = £2,100', note: 'Hours multiplied by rate.' },
              { calc: 'Overheads = 18% of £2,100 = £378', note: '=Labour*0.18' },
              {
                calc: 'Subtotal = £3,200 + £2,100 + £378 = £5,678',
                note: 'Materials + labour + overheads. This is the subtotal — not yet the quote.',
              },
              { calc: 'Profit = 12% of £5,678 = £681.36', note: '=Subtotal*0.12' },
              {
                calc: 'Net price = £5,678 + £681.36 = £6,359.36',
                note: 'Subtotal plus profit — the figure you quote, before VAT.',
              },
              {
                calc: 'VAT = 20% of £6,359.36 = £1,271.87',
                note: '=NetPrice*0.2, standard-rated.',
              },
              {
                calc: 'Total to the client = £6,359.36 + £1,271.87 = £7,631.23',
                note: 'Net price plus VAT — the figure that actually appears on the invoice.',
              },
            ]}
            answer="£6,359.36 is the net price you quote, before VAT. £7,631.23 is the total the client actually pays once VAT is added. £5,678 is neither of those — it is the subtotal, and it sits £1,953.23 below the invoice total."
            watchOut="Losing track of which figure is the subtotal, which is the net price and which is the VAT-inclusive total is the single most common costing mistake. Label every stage of the sheet by name — Subtotal, Profit, Net price, VAT, Total — and only ever quote or invoice the row explicitly labelled for that purpose."
          />

          <TryIt
            question="A different job: materials £1,850, labour 22 hours at £65/hr, overheads at 20% of labour, profit margin 15%, standard-rated for VAT. Work through to the total the client pays."
            steps={[
              { calc: 'Labour = 22 × £65 = £1,430', note: 'Hours multiplied by rate.' },
              { calc: 'Overheads = 20% of £1,430 = £286', note: '=Labour*0.2' },
              {
                calc: 'Subtotal = £1,850 + £1,430 + £286 = £3,566',
                note: 'Materials + labour + overheads.',
              },
              { calc: 'Profit = 15% of £3,566 = £534.90', note: '=Subtotal*0.15' },
              {
                calc: 'Net price = £3,566 + £534.90 = £4,100.90',
                note: 'The figure you quote, before VAT.',
              },
              { calc: 'VAT = 20% of £4,100.90 = £820.18', note: '=NetPrice*0.2' },
              {
                calc: 'Total = £4,100.90 + £820.18 = £4,921.08',
                note: 'What the client actually pays.',
              },
            ]}
            answer="Net price (before VAT) = £4,100.90. Total to the client = £4,921.08. Same six-stage sequence as the worked example, in the same order, with this job's own figures dropped in."
          />

          <CommonMistake
            title="Quoting the subtotal instead of the net price"
            whatHappens="A costing sheet has a row labelled 'Subtotal' near the top and a final total near the bottom, and under pressure at the end of a long day someone reads off the wrong row. The client is quoted a figure with no profit margin built in at all, and the job is worked at cost or a loss."
            doInstead="Label every stage of the sheet by name — Subtotal, Profit, Net price, VAT, Total — and only ever quote the row explicitly labelled as the price to the client. If a sheet has two numbers that could plausibly be 'the total', that sheet needs relabelling before it needs using again."
          />

          <SectionRule />

          <InlineCheck
            id="m3s2-costing"
            question="Your material takeoff totals £2,400. Labour is estimated at £1,800. Overheads are 20% of labour. You then add a 15% profit margin. What is the net price you quote, before VAT?"
            options={['£4,200.00', '£4,560.00', '£5,244.00', '£5,520.00']}
            correctIndex={2}
            explanation="Work it in stages. Subtotal = materials £2,400 + labour £1,800 + overheads (20% of £1,800 = £360) = £4,560. That is the subtotal, and it is what the profit percentage is applied to — not the figure you quote. Then £4,560 × 1.15 = £5,244.00, which is the net price you quote. £4,560 is the subtotal, not the quote — on a real job the two figures can be several hundred pounds apart, so knowing which one you are being asked for matters."
          />

          <SectionRule />

          {/* ── 05 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>05 · Essential formulae</ContentEyebrow>

          <ConceptBlock title="A short list that covers almost everything">
            <p>
              A handful of formulae do the vast majority of what an electrician needs from a
              spreadsheet. Learn what each one answers, not just how to type it:
            </p>
            <ul className="mt-2 space-y-1.5">
              <li>
                <strong className="text-white">SUM</strong> —{' '}
                <code className={codeCn}>=SUM(B2:B50)</code> adds a range. Use it for totalling
                material costs, circuit loads or cable lengths.
              </li>
              <li>
                <strong className="text-white">AVERAGE</strong> —{' '}
                <code className={codeCn}>=AVERAGE(C2:C20)</code> finds the arithmetic mean. Use it
                for average power readings or typical job durations.
              </li>
              <li>
                <strong className="text-white">MAX / MIN</strong> —{' '}
                <code className={codeCn}>=MAX(D2:D100)</code> and{' '}
                <code className={codeCn}>=MIN(D2:D100)</code> return the largest or smallest value.
                The lowest insulation resistance reading in a batch of tests, found with MIN, is the
                one that determines the overall result.
              </li>
              <li>
                <strong className="text-white">SUMIF</strong> —{' '}
                <code className={codeCn}>=SUMIF(A:A,"Lighting",D:D)</code> sums column D wherever
                column A reads "Lighting". Use it to total load, or cost, by category.
              </li>
              <li>
                <strong className="text-white">VLOOKUP</strong> —{' '}
                <code className={codeCn}>=VLOOKUP(B2,RatingTable,3,FALSE)</code> looks a value up in
                a table and returns a related figure — a cable rating, a correction factor, a
                material price.
              </li>
              <li>
                <strong className="text-white">ROUND</strong> —{' '}
                <code className={codeCn}>=ROUND(B2*C2,2)</code> rounds to a set number of decimal
                places, essential for money to the penny and for presenting test results sensibly.
              </li>
              <li>
                <strong className="text-white">COUNTIF</strong> —{' '}
                <code className={codeCn}>=COUNTIF(M:M,"FAIL")</code> counts matching cells — how
                many circuits failed a check, out of how many total.
              </li>
            </ul>
            <p className="mt-3">
              None of this works if the column it operates on mixes units. A formula does not know
              what a number represents — only that it is a number. If an insulation resistance
              column mixes M&Omega; readings with a stray value entered in &Omega;, a comparison
              like <code className={codeCn}>=IF(B2&gt;=1,…)</code> will treat a genuinely low
              reading as a pass. Pick a unit for each column, state it in the header, and never mix
              within a column.
            </p>
          </ConceptBlock>

          <WorkedExample
            question="You have a column of calculated voltage drops (column L) and a column stating whether each circuit is Lighting or another use (column M). Build an IF formula for row 2 that checks each circuit against the correct recommended maximum — 3% (6.9 V) for lighting, 5% (11.5 V) otherwise."
            steps={[
              {
                calc: 'Inner test for a general circuit → IF(L2<=11.5,"PASS","FAIL")',
                note: 'Applies the 5% figure — but only correct when the circuit is not lighting.',
              },
              {
                calc: 'Inner test for a lighting circuit → IF(L2<=6.9,"PASS","FAIL")',
                note: 'Applies the 3% figure, correct only for lighting.',
              },
              {
                calc: 'Choose between them by circuit type → IF(M2="Lighting", …, …)',
                note: 'M2 tells the formula which inner test to use.',
              },
              {
                calc: 'Combine: =IF(M2="Lighting",IF(L2<=6.9,"PASS","FAIL"),IF(L2<=11.5,"PASS","FAIL"))',
                note: 'A single formula that applies the correct recommended maximum depending on what the circuit actually is.',
              },
            ]}
            answer='=IF(M2="Lighting",IF(L2<=6.9,"PASS","FAIL"),IF(L2<=11.5,"PASS","FAIL"))'
            watchOut='A single flat IF(L2<=11.5,"PASS","FAIL") applied to every circuit will pass lighting circuits that are actually over their recommended maximum, because it is checking them against the wrong figure. The formula has to know what kind of circuit it is looking at before it can pick the right number — exactly as you would by hand.'
          />

          <TryIt
            question="Row 3 is another circuit: L3 = 5.2 (calculated voltage drop), M3 = 'Lighting'. Using the same formula pattern as row 2, will this circuit show PASS or FAIL, and why?"
            steps={[
              {
                calc: '=IF(M3="Lighting",IF(L3<=6.9,"PASS","FAIL"),IF(L3<=11.5,"PASS","FAIL"))',
                note: 'Same pattern as row 2, only the row number has changed.',
              },
              {
                calc: 'M3 = "Lighting" → the inner test used is L3<=6.9',
                note: 'The 3% figure applies, because it is a lighting circuit.',
              },
              { calc: 'L3 = 5.2, and 5.2 is not more than 6.9', note: 'The test is true.' },
            ]}
            answer="PASS. The formula picks the 6.9 V inner test because M3 reads 'Lighting', and 5.2 V is under that figure. The same circuit would also show PASS if it were mistakenly checked against 11.5 V instead — which is exactly the kind of error that goes unnoticed until a circuit genuinely over its own recommended maximum is waved through the same way."
          />

          <SectionRule />

          <InlineCheck
            id="m3s2-formulae"
            question="You want to find the lowest insulation resistance reading from 30 test results in cells D2:D31. Which formula do you use?"
            options={['=AVERAGE(D2:D31)', '=SUM(D2:D31)', '=MIN(D2:D31)', '=COUNTIF(D2:D31,"<1")']}
            correctIndex={2}
            explanation="=MIN(D2:D31) returns the smallest value in the range — the lowest insulation resistance reading. In electrical testing, the lowest reading determines the overall result, so finding the minimum is the useful question. AVERAGE would give the mean (which no single circuit necessarily meets), SUM would total values that should never be added together, and COUNTIF would count readings rather than identify the worst one."
          />

          <SectionRule />

          {/* ── 06 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>06 · Charts & data visualisation</ContentEyebrow>

          <ConceptBlock
            title="Choosing the chart the data actually needs"
            plainEnglish="A chart is an argument about what matters in the data. Pick the wrong shape and the argument is wrong even if every number in it is correct."
          >
            <ul className="mt-2 space-y-1.5">
              <li>
                <strong className="text-white">Pie chart</strong> — proportions of a whole. Good for
                a cost breakdown (materials, labour, overheads, profit) or a circuit-type mix across
                an installation.
              </li>
              <li>
                <strong className="text-white">Bar chart</strong> — comparing values across
                categories. Good for supplier prices side by side, or estimated versus actual hours
                on a job.
              </li>
              <li>
                <strong className="text-white">Line chart</strong> — trends over time. Good for
                monthly revenue, or the progression of a project's spend against its budget.
              </li>
              <li>
                <strong className="text-white">Stacked bar chart</strong> — composition within
                categories, compared across several of them at once. Good for the material, labour
                and overhead components of several jobs, side by side.
              </li>
            </ul>
            <p className="mt-3">
              Select the data including its headers, insert a chart, and always add a descriptive
              title, labelled axes with units, a legend where there is more than one data series,
              and data labels if precise values matter. A chart that needs a paragraph of
              explanation underneath it has usually been given the wrong shape.
            </p>
          </ConceptBlock>

          <WorkedExample
            question="A client asks how their £6,200 job breaks down between materials, labour, overheads and profit. Work out the right chart for this, and say what a line chart would hide if you used it instead."
            steps={[
              {
                calc: 'What is being compared? → four categories that together make up one job total',
                note: 'Parts of a whole — the shape a pie chart is built for.',
              },
              {
                calc: 'What would a line chart need? → a series that changes across an ongoing axis, such as time',
                note: 'Four categories that only exist once, adding up to 100%, have nothing to trend against.',
              },
              {
                calc: 'What would a line chart hide? → that these four numbers are parts of the same total, not steps in a sequence',
                note: 'It would draw a shape implying a progression between materials, labour, overheads and profit — a trend that does not exist.',
              },
            ]}
            answer="Pie chart. Four categories that together make up one whole job is exactly the shape a pie chart shows; a line chart would invent a progression between them that isn't there, and would hide the fact that they simply add up to the total."
            watchOut="The test is never which chart looks best — it is whether the chart's shape matches the shape of the data. A bar chart would also work here (comparing four values side by side); a pie chart is the stronger choice specifically because these four categories are known to add up to 100% of something."
          />

          <TryIt
            question="You want to show a client how their quotation breaks down by materials, labour, overheads and profit. Separately, you want to show how your monthly invoiced revenue has moved over the last year. Which chart type fits each, and why?"
            steps={[
              {
                calc: 'Quotation breakdown → parts of one whole',
                note: 'Four categories that together make up 100% of one figure — the shape a pie chart is built for.',
              },
              {
                calc: 'Revenue over the last year → change over time',
                note: 'One value per month, and the point is the trend between them — the shape a line chart is built for.',
              },
              {
                calc: 'Check: would either chart work the other way round?',
                note: 'A pie chart of twelve months of revenue would have twelve thin slices and hide the trend entirely. A line chart of a single quotation has nothing to trend against.',
              },
            ]}
            answer="Pie chart for the quotation breakdown; line chart for revenue over time. The test is not which chart looks more impressive — it is whether the chart's shape matches the shape of the question you are actually asking of the data."
          />

          <CommonMistake
            title="A pie chart with no labels, sent to a client"
            whatHappens="You build a chart quickly to accompany a quotation, and it looks fine on your screen because you already know what each colour means. The client opens it with no context, sees four unlabelled coloured wedges, and has to guess or ask."
            doInstead="Add a title, and label each slice with its category and either its value or its percentage. A chart is meant to save the reader a question, not create one — if it needs you sitting next to them explaining it, it has not done its job."
          />

          <SectionRule />

          {/* ── 07 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>07 · Sorting & filtering</ContentEyebrow>

          <ConceptBlock
            title="Sorting rearranges; filtering hides — neither one deletes"
            onSite="Both of these feel like they might damage your data the first time you use them. Neither does. That is exactly why they are worth using freely rather than avoiding out of caution."
          >
            <p>
              <strong className="text-white">Sorting</strong> rearranges rows by the values in one
              or more columns — cost highest to lowest to spot the items worth negotiating on,
              voltage drop highest first to see which circuits sit closest to their recommended
              maximum, or dates in order for a tax record. Sort by more than one column at once —
              category first, then cost within each category — using the "add level" option most
              applications offer.
            </p>
            <p>
              <strong className="text-white">Filtering</strong> temporarily hides rows that do not
              match a condition, without touching the underlying data. Turn it on (Data &rarr;
              Filter, or Ctrl+Shift+L in Excel) and every column header gains a drop-down for
              choosing which values to show. Use it to isolate circuits marked FAIL, materials in a
              single category for a supplier order, unpaid invoices, or a date range for a VAT
              return. Custom filters add conditions like greater than, less than or between — for
              example, circuits with a voltage drop between 9 V and their recommended maximum, which
              flags results approaching the limit without yet failing it.
            </p>
          </ConceptBlock>

          <WorkedExample
            question="You have a 200-row circuit schedule and need every circuit wired in 6mm² cable, to check them against a change in correction factors. How do you find them without touching the other 194 rows?"
            steps={[
              {
                calc: 'Turn on Filter — Data → Filter, or Ctrl+Shift+L in Excel',
                note: 'Every column header gains a drop-down arrow.',
              },
              {
                calc: 'Open the drop-down on the Cable Size column',
                note: 'Lists every value that appears in that column.',
              },
              {
                calc: 'Untick "Select All", then tick only "6mm²"',
                note: 'The sheet now shows only the matching rows. The other 194 are hidden, not removed.',
              },
              {
                calc: 'When finished, clear the filter (same drop-down → "Clear Filter" or "Select All")',
                note: 'Brings every row straight back.',
              },
            ]}
            answer='Filter the Cable Size column to "6mm²" only. The other 194 rows are hidden, not deleted — clearing the filter afterwards restores the full 200-row schedule with nothing lost.'
            watchOut="Filtering never reorders or deletes anything underneath — it only changes what's currently visible. That is exactly why it's safe to filter and re-filter as many times as a job needs, unlike deleting rows to get the same view."
          />

          <TryIt
            question="The same 200-row schedule needs sorting so it is grouped by circuit type first, and within each type ordered by voltage drop, highest first, so the marginal ones sit together. Set this up."
            steps={[
              {
                calc: 'Select the data range, open the sort dialog — Data → Sort',
                note: 'Include the header row so the sort dialog can name the columns.',
              },
              {
                calc: 'Add the first level: Circuit Type, A→Z',
                note: 'Groups every circuit type together.',
              },
              {
                calc: 'Add a second level ("Add Level"): Voltage Drop, largest to smallest',
                note: 'Orders each group internally, worst first.',
              },
            ]}
            answer="Sort by Circuit Type first, then by Voltage Drop, largest to smallest, as a second level within it. Every circuit type is grouped together, and inside each group the circuits closest to their recommended maximum sit at the top, where you check them first."
          />

          <Scenario
            title="The filter nobody remembered was on"
            situation="You filter a 60-circuit schedule down to show only the FAIL rows so you can plan the redesign work. You fix them, update the results, and hand the schedule to a colleague to check over — without clearing the filter first. They see 4 rows, assume that is the whole job, and sign it off."
            whatToDo="Before sharing or archiving a filtered sheet, clear the filter and confirm the full row count matches what you expect. A filtered view is a working tool for you in the moment, not a document to pass on as if it were the complete dataset."
            whyItMatters="A filter looks, to someone who did not apply it, exactly like a smaller spreadsheet — there is no visual cue that 56 rows are hidden unless you know to look for the gap in the row numbers down the left. The person reading it has no way to know what they are not seeing."
          />

          <SectionRule />

          {/* ── 08 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>08 · Practical spreadsheet projects</ContentEyebrow>

          <ConceptBlock title="Build something you will actually use">
            <p>
              The fastest way to get comfortable with any of this is to build a real tool, not a
              practice exercise. Work through these roughly in order — each one reuses a skill from
              the one before it.
            </p>
            <ul className="mt-2 space-y-1.5">
              <li>
                <strong className="text-white">1. Personal budget tracker.</strong> Date,
                Description, Category, Amount In, Amount Out, Running Balance. SUM for monthly
                totals, SUMIF for category totals, a pie chart for the expense breakdown. Practises
                data entry, basic formulae, formatting and charts.
              </li>
              <li>
                <strong className="text-white">2. Tool inventory register.</strong> Tool Name,
                Manufacturer, Serial Number, Purchase Date, Calibration Due Date, PAT Test Due Date,
                Condition. Conditional formatting flags calibration due within 30 days (amber) or
                overdue (red), driven by a formula like{' '}
                <code className={codeCn}>
                  =IF(F2&lt;TODAY(),"OVERDUE",IF(F2-TODAY()&lt;30,"DUE SOON","OK"))
                </code>
                . Practises dates, nested IF, conditional formatting.
              </li>
              <li>
                <strong className="text-white">3. Cable sizing calculator.</strong> The Section 02
                spreadsheet, built for real: start with five circuits and expand. Include correction
                factors, voltage drop (checked against the correct recommended maximum for each
                circuit type), and pass/fail columns. Add a reference sheet with cable rating data
                and pull it in with VLOOKUP. Practises complex formulae, cell referencing, VLOOKUP,
                multiple sheets.
              </li>
              <li>
                <strong className="text-white">4. Job quotation generator.</strong> One workbook,
                four sheets: Material Takeoff, Labour Estimate, Job Cost Summary (pulling totals
                from the first two, adding overheads and profit), and a Client Quotation sheet
                formatted for sending out. Practises multi-sheet workbooks, cross-sheet references,
                professional formatting.
              </li>
              <li>
                <strong className="text-white">5. Annual business dashboard.</strong> Monthly
                revenue and expenses; a job log (client, job type, quoted amount, actual cost,
                profit); and a dashboard sheet with a revenue trend line chart, a revenue-by-job-
                type pie chart, and an estimated-versus-actual bar chart. Practises advanced
                formulae, multiple chart types, and reading your own business's data honestly.
              </li>
            </ul>
          </ConceptBlock>

          <WorkedExample
            question="Project 2, the tool inventory register: column F holds each tool's Calibration Due Date. Build a formula for row 2 that returns 'OVERDUE' if that date has passed, 'DUE SOON' if it falls within the next 30 days, and 'OK' otherwise."
            steps={[
              {
                calc: 'Days remaining → F2-TODAY()',
                note: 'A negative number once the date has passed.',
              },
              {
                calc: 'Innermost test: is it already overdue? → IF(F2<TODAY(),"OVERDUE","OK")',
                note: 'Checked first, because it has to win over "due soon" once a date has actually passed.',
              },
              {
                calc: 'Wrap that in the "due soon" test → IF(F2-TODAY()<30,"DUE SOON", <the test above>)',
                note: 'Only reached if the tool is not yet overdue.',
              },
              {
                calc: 'Combine → =IF(F2<TODAY(),"OVERDUE",IF(F2-TODAY()<30,"DUE SOON","OK"))',
                note: 'Overdue is tested first; due-soon and OK are only considered once overdue has been ruled out.',
              },
            ]}
            answer='=IF(F2<TODAY(),"OVERDUE",IF(F2-TODAY()<30,"DUE SOON","OK")) — copied down the column, it recalculates every day because TODAY() always returns the current date, so a register left open for months still flags the right tools without anyone updating it by hand.'
            watchOut="Test order matters here. F2-TODAY() is already negative once a date has passed, and a negative number is always less than 30 — so if 'DUE SOON' were tested first, an overdue tool would match that condition and IF would never reach the OVERDUE test at all. Overdue has to be checked first, precisely because it would otherwise get swallowed by the due-soon test."
          />

          <TryIt
            question="Before opening a spreadsheet, sketch on paper what Sheet 3 of the Job Quotation Generator (Project 4) — the Job Cost Summary — needs to pull in from the other two sheets, and in what order the rows should run."
            steps={[
              {
                calc: 'Pull materials total from Sheet 1',
                note: 'By cross-sheet reference, e.g. =MaterialTakeoff!H100 — never retyped.',
              },
              {
                calc: 'Pull labour total from Sheet 2',
                note: 'Same principle — a reference, not a copied figure.',
              },
              {
                calc: 'Add overheads, get the subtotal',
                note: 'Materials + labour + overheads, clearly labelled Subtotal.',
              },
              {
                calc: 'Add profit, get the net price; add VAT if applicable',
                note: 'Clearly labelled Net price and, separately, Total — the two numbers from Section 04.',
              },
            ]}
            answer="Materials (referenced) → Labour (referenced) → Overheads → Subtotal → Profit → Net price → VAT → Total, each row referencing the one before it. Sketching the row order before building the sheet is what prevents the subtotal-versus-quote confusion covered in Section 04."
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Reference the cell, never retype the number. This one habit is most of what makes a spreadsheet worth building.',
              'A relative reference (B2) shifts when copied; an absolute reference ($B$2) stays locked to one cell. Use $B$2 for any single fixed value — a rate, a VAT percentage — that every row must reference identically.',
              'An electrical formula and a spreadsheet formula are the same equation written two ways — match the cell references to the terms, in order, brackets included.',
              'Voltage drop has two recommended maxima, not one: 3% for lighting, 5% for other uses (Appendix 4 §6.4, deemed-to-satisfy via Reg 525.202). Neither is a permitted ceiling.',
              'A material takeoff needs description, quantity, unit, unit cost and total for every line.',
              'A job costing sheet runs: materials + labour + overheads = subtotal; subtotal + profit = the net price you quote; net price + VAT = the client total. Label every row.',
              'Waste allowances, overhead percentages and profit margins are commercial norms a business sets for itself — treat any figure as a starting point, not a rule.',
              'Certain energy-saving materials are zero-rated for VAT until 31 March 2027, then revert to the existing 5% reduced rate — it is not 5% right now.',
              'SUM, AVERAGE, MAX/MIN, IF, SUMIF, VLOOKUP, ROUND and COUNTIF cover almost every calculation an electrician needs.',
              'Choose a chart by the shape of the question — parts of a whole, a trend over time, or a comparison across categories.',
              'Sorting rearranges; filtering hides. Neither deletes data, and a filtered sheet should never be shared or archived without clearing the filter first.',
            ]}
          />

          <FAQ
            items={[
              {
                question: 'Do I need to be good at maths to use spreadsheets well?',
                answer:
                  'You need to understand what a calculation is doing well enough to spot when a formula has got it wrong. The spreadsheet does the arithmetic; you still have to know what answer to expect, which is exactly the maths this section has been building.',
              },
              {
                question:
                  'Excel, Google Sheets or LibreOffice Calc — does it matter which I learn?',
                answer:
                  'Not much. The concepts — cells, references, formulae, sorting, filtering, charts — are the same in all three, and the syntax is nearly identical. Google Sheets is free and works in a browser; LibreOffice Calc is free and works offline; Excel is the one most commercial employers already use. Learn whichever you have access to and the others transfer easily.',
              },
              {
                question: 'Is a 5% waste allowance always correct for cable?',
                answer:
                  'No — it is a commonly used starting point, not a fixed figure. A business refines it from its own experience: a tight first fix in an open loft loses far less cable than threading through solid partitions. Treat any percentage you are given in training as a sensible default to adjust, not a number to apply unchanged forever.',
              },
              {
                question: 'Why does the voltage drop check need to know the circuit type?',
                answer:
                  'Because the recommended maximum itself is different — 3% for lighting, 5% for other uses. A single formula that always checks against 11.5 V will pass a lighting circuit that is actually over its own, lower, recommended maximum. The circuit type has to feed into the check, not just the calculated figure.',
              },
              {
                question:
                  'What is the actual current VAT rate on things like solar panels and heat pumps?',
                answer:
                  "Zero per cent (0%) across the UK, for the relevant energy-saving materials, until 31 March 2027. After that date the rate reverts to the pre-existing reduced rate of 5%. Quoting 5% as today's rate would currently be wrong.",
              },
            ]}
          />

          <SectionRule />

          <Quiz questions={quizQuestions} title="Section 2: Spreadsheets & Calculations Quiz" />

          {/* ── prev / next ─────────────────────────────────────────── */}
          <div className="mt-8 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() =>
                navigate('/study-centre/apprentice/functional-skills/module3/section1')
              }
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-white/[0.12] bg-white/[0.04] px-4 text-sm font-medium text-white touch-manipulation"
            >
              <ChevronLeft className="h-4 w-4" />
              Section 1
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/study-centre/apprentice/functional-skills/module3/section3')
              }
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-elec-yellow/35 bg-elec-yellow/[0.08] px-4 text-sm font-semibold text-white touch-manipulation"
            >
              Section 3
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default FunctionalSkillsModule3Section2;
