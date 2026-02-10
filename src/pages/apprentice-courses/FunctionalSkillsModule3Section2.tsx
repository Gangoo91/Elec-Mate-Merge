import { ArrowLeft, ArrowRight, Table, Calculator, FileSpreadsheet, BarChart3, PoundSterling, Filter, Copy, Wrench } from "lucide-react";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import useSEO from "@/hooks/useSEO";

const FunctionalSkillsModule3Section2 = () => {
  useSEO(
    "Section 2: Spreadsheets & Calculations - Digital Skills for Electricians",
    "Master spreadsheet skills for electrical work including cable calculations, material takeoffs, job costing, essential formulae, charts, sorting, filtering, and practical projects."
  );

  const quizQuestions = [
    {
      id: 1,
      question: "Which Excel formula would you use to add up the total cost of all materials in cells B2 to B50?",
      options: [
        "=ADD(B2:B50)",
        "=SUM(B2:B50)",
        "=TOTAL(B2:B50)",
        "=COUNT(B2:B50)"
      ],
      correctAnswer: 1,
      explanation: "=SUM(B2:B50) adds together all values in the range from cell B2 to B50. SUM is the most commonly used spreadsheet formula and is essential for calculating totals in material lists, invoices, and cable schedules. COUNT counts the number of entries rather than adding their values."
    },
    {
      id: 2,
      question: "You need to calculate the voltage drop across a cable. The formula is Vd = (mV/A/m × Ib × L) / 1000. In a spreadsheet where mV/A/m is in cell B2, Ib is in C2, and L is in D2, which formula is correct?",
      options: [
        "=(B2+C2+D2)/1000",
        "=(B2*C2*D2)/1000",
        "=B2/C2/D2*1000",
        "=SUM(B2,C2,D2)/1000"
      ],
      correctAnswer: 1,
      explanation: "The voltage drop formula multiplies the three values together and divides by 1000. In spreadsheet notation, the asterisk (*) represents multiplication. =(B2*C2*D2)/1000 correctly implements the formula Vd = (mV/A/m × Ib × L) / 1000."
    },
    {
      id: 3,
      question: "What does the IF function do in a spreadsheet?",
      options: [
        "Inserts a new row if the spreadsheet is full",
        "Returns one value if a condition is true and another if it is false",
        "Converts text to numbers automatically",
        "Imports data from another file"
      ],
      correctAnswer: 1,
      explanation: "The IF function tests a condition and returns different values depending on whether it is true or false. For example, =IF(B2>230, \"FAIL\", \"PASS\") would check if a voltage drop exceeds 230V and display either FAIL or PASS accordingly. This is invaluable for automating compliance checks in electrical spreadsheets."
    },
    {
      id: 4,
      question: "When building a material takeoff spreadsheet, what should you include for each item?",
      options: [
        "Just the item name and total cost",
        "Item description, quantity, unit, unit cost, and total cost",
        "Only the manufacturer's catalogue number",
        "The item name and the supplier's phone number"
      ],
      correctAnswer: 1,
      explanation: "A comprehensive material takeoff includes the item description, quantity needed, unit of measurement (metres, each, box), unit cost, and calculated total cost (quantity × unit cost). This level of detail enables accurate costing, easy comparison between suppliers, and clear records for invoicing."
    },
    {
      id: 5,
      question: "Which chart type is best for showing the breakdown of costs across different categories in a job?",
      options: [
        "Line chart",
        "Scatter plot",
        "Pie chart",
        "Histogram"
      ],
      correctAnswer: 2,
      explanation: "A pie chart is ideal for showing the proportional breakdown of costs across categories (materials, labour, overheads, profit). Each slice represents a percentage of the total, making it easy to see at a glance where the money is being spent. Line charts are better for showing trends over time."
    },
    {
      id: 6,
      question: "What is the purpose of freezing the top row in a spreadsheet?",
      options: [
        "It prevents anyone from editing the spreadsheet",
        "It keeps the header row visible while scrolling through data below",
        "It locks the spreadsheet with a password",
        "It makes the spreadsheet read-only"
      ],
      correctAnswer: 1,
      explanation: "Freezing the top row keeps your column headers (e.g. 'Circuit Ref', 'Cable Size', 'Length', 'Voltage Drop') visible as you scroll down through long lists of data. Without frozen headers, you quickly lose track of which column contains which data, leading to errors."
    },
    {
      id: 7,
      question: "You have a spreadsheet of 200 circuits. How would you quickly find all circuits using 6mm² cable?",
      options: [
        "Scroll through manually and look at each row",
        "Delete all rows that are not 6mm²",
        "Use the Filter function on the cable size column",
        "Print it out and highlight with a pen"
      ],
      correctAnswer: 2,
      explanation: "The Filter function allows you to show only rows matching your criteria — in this case, all circuits with a cable size of 6mm². Filters are non-destructive (they hide rows temporarily rather than deleting them) and can be removed to show all data again. This is far faster and more reliable than manual searching."
    },
    {
      id: 8,
      question: "What is the AVERAGE function used for in electrical calculations?",
      options: [
        "Finding the middle value in a sorted list",
        "Calculating the arithmetic mean of a range of values",
        "Counting how many values are above a threshold",
        "Finding the most common value in a range"
      ],
      correctAnswer: 1,
      explanation: "The AVERAGE function calculates the arithmetic mean — the sum of all values divided by the count of values. In electrical work, this is useful for calculating average power consumption, mean test results across multiple readings, or typical material costs when comparing suppliers. Note: the middle of a sorted list is the MEDIAN, not the AVERAGE."
    }
  ];

  return (
    <div className="pb-24 bg-elec-dark min-h-screen">
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 bg-elec-dark/95 backdrop-blur-sm border-b border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3">
          <Link to="/study-centre/apprentice/functional-skills/module3" className="p-2 -ml-2 touch-manipulation">
            <ArrowLeft className="w-5 h-5 text-white/60" />
          </Link>
          <div>
            <p className="text-[11px] font-semibold text-green-400 uppercase tracking-wider">Module 3 • Section 2</p>
            <h1 className="text-base font-bold text-white">Spreadsheets & Calculations</h1>
          </div>
        </div>
      </div>

      {/* Hero with green gradient */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-elec-dark via-neutral-900 to-elec-dark" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-green-600/10 via-transparent to-transparent" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-8 text-center">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="relative inline-flex mb-4">
              <div className="absolute inset-0 bg-green-500/30 rounded-2xl blur-xl animate-pulse" />
              <div className="relative p-4 rounded-2xl bg-gradient-to-br from-green-500 via-green-600 to-emerald-600 shadow-2xl shadow-green-500/25">
                <Table className="h-8 w-8 text-white" />
              </div>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Spreadsheets & Calculations</h2>
            <p className="text-sm text-white/50 max-w-lg mx-auto">
              Harness the power of spreadsheets for cable sizing, material takeoffs, job costing, and data analysis — essential digital skills that set professional electricians apart.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6 mt-6">

        {/* Section 01 — Spreadsheet Fundamentals */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">01</span>
            <h3 className="text-lg font-bold text-white">Spreadsheet Fundamentals</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              Spreadsheets are one of the most powerful tools available to electricians. Whether you use Microsoft Excel, Google Sheets (free and browser-based), or LibreOffice Calc (free and offline), the core concepts are identical. A spreadsheet allows you to organise data in rows and columns, perform calculations automatically, and create charts to visualise information.
            </p>
            <p>
              <strong className="text-white">Understanding the Interface</strong> — A spreadsheet is made up of cells arranged in rows (numbered 1, 2, 3...) and columns (lettered A, B, C...). Each cell has a unique address combining its column letter and row number — for example, B5 is the cell in column B, row 5. The active cell is highlighted with a border, and its address is shown in the Name Box at the top left.
            </p>
            <p>
              <strong className="text-white">Entering Data</strong> — Click on a cell and start typing to enter data. Press Enter to move down to the next row, or Tab to move right to the next column. Data can be text (labels, descriptions), numbers (quantities, measurements, costs), or dates. Spreadsheets automatically recognise the type of data you enter and format it accordingly. If a number appears left-aligned, the spreadsheet may be treating it as text — check the cell formatting.
            </p>
            <p>
              <strong className="text-white">Basic Formatting</strong> — Good formatting makes spreadsheets easier to read and reduces errors. Key formatting techniques include: bold headers in the top row, currency formatting for monetary values (select cells → Format → Currency), number formatting to control decimal places (useful for showing measurements to 2 decimal places), and cell borders to visually separate sections. Use background colours sparingly to highlight important rows or columns — for example, shading the total row in green.
            </p>
            <p>
              <strong className="text-white">Cell References</strong> — This is the fundamental concept that makes spreadsheets powerful. Instead of typing a number into a formula, you reference the cell containing that number. For example, if cell A2 contains a cable length of 25 and cell B2 contains a cost per metre of £3.50, the formula =A2*B2 in cell C2 will calculate the total cost as £87.50. If you later change the length in A2 to 30, cell C2 automatically updates to £105.00. This is why spreadsheets are far superior to calculators for electrical work — change one input and all dependent calculations update instantly.
            </p>
            <p>
              <strong className="text-white">Workbooks and Sheets</strong> — A single spreadsheet file (called a workbook) can contain multiple sheets, shown as tabs at the bottom of the screen. Use separate sheets within the same workbook for related data — for example, one sheet for cable calculations, another for material costs, and a third for the summary. You can reference cells across sheets using the format: =Sheet2!B5.
            </p>
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">Key Point</p>
              <p className="text-sm text-white/80">
                The golden rule of spreadsheets: never type the same number in two places. Enter each value once and reference it everywhere else. This eliminates inconsistencies and means updating one value automatically updates all related calculations.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Section 02 — Cable Calculation Spreadsheets */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">02</span>
            <h3 className="text-lg font-bold text-white">Cable Calculation Spreadsheets</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              Cable sizing is one of the most critical calculations in electrical installation work, and spreadsheets are the ideal tool for performing these calculations consistently and accurately. By building a cable calculation spreadsheet, you create a reusable tool that speeds up design work and provides an auditable record of your calculations.
            </p>
            <p>
              <strong className="text-white">Setting Up the Structure</strong> — Create columns for: Circuit Reference, Design Current (Ib), Protective Device Rating (In), Cable Type, Installation Method, Correction Factors (Ca, Cg, Ci, Cf), Tabulated Current (It), Selected Cable Size, Actual Current Rating (Iz), Voltage Drop (mV/A/m), Cable Length, Calculated Voltage Drop, and Pass/Fail status. Each row represents one circuit.
            </p>
            <p>
              <strong className="text-white">Correction Factor Calculations</strong> — The required current-carrying capacity is calculated as It = Ib / (Ca × Cg × Ci × Cf). In your spreadsheet, if Ib is in cell B2 and the correction factors are in cells E2, F2, G2, and H2, the formula would be: <code className="text-green-400 bg-green-500/10 px-1.5 py-0.5 rounded text-xs">=B2/(E2*F2*G2*H2)</code>. This automatically recalculates whenever you change any correction factor, making it easy to explore "what-if" scenarios.
            </p>
            <p>
              <strong className="text-white">Voltage Drop Calculation</strong> — The voltage drop formula Vd = (mV/A/m × Ib × L) / 1000 translates directly into a spreadsheet formula. If mV/A/m is in cell J2, Ib is in B2, and cable length is in K2: <code className="text-green-400 bg-green-500/10 px-1.5 py-0.5 rounded text-xs">=(J2*B2*K2)/1000</code>. You can then add a compliance check column using an IF formula: <code className="text-green-400 bg-green-500/10 px-1.5 py-0.5 rounded text-xs">=IF(L2&lt;=11.5,"PASS","FAIL")</code> for a 5% limit on a 230V supply (11.5V).
            </p>
            <p>
              <strong className="text-white">Lookup Tables</strong> — Use the VLOOKUP or INDEX/MATCH functions to automatically retrieve cable data from reference tables. Create a separate sheet containing the cable rating tables from BS 7671 Appendix 4 (Table 4D1A onwards). Then, in your calculation sheet, use a lookup formula to find the appropriate current rating based on cable size and installation method. This eliminates the need to manually look up values in the regulation book for every circuit.
            </p>
            <p>
              <strong className="text-white">Conditional Formatting for Quick Compliance Checks</strong> — Apply conditional formatting to the Pass/Fail column so that "PASS" cells turn green and "FAIL" cells turn red. This provides an instant visual summary of your design — any red cells immediately flag circuits that need attention. You can also apply conditional formatting to highlight voltage drops approaching the limit (e.g. amber for drops between 9V and 11.5V).
            </p>
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">Key Point</p>
              <p className="text-sm text-white/80">
                Once you build a cable calculation spreadsheet, save it as a template. For each new job, copy the template and fill in the project-specific values. Over time, you will build a library of templates that cover most common installation scenarios, dramatically speeding up your design process.
              </p>
            </div>
          </div>
        </motion.div>

        {/* InlineCheck after Section 02 */}
        <InlineCheck
          question="In a spreadsheet, the formula =B2/(E2*F2*G2*H2) calculates which electrical value?"
          options={[
            "Total cable cost including labour",
            "The required tabulated current-carrying capacity (It) after applying correction factors",
            "The voltage drop across the cable",
            "The earth fault loop impedance"
          ]}
          correctIndex={1}
          explanation="The formula divides the design current (Ib in B2) by the product of all correction factors (Ca, Cg, Ci, Cf in E2-H2) to calculate the minimum tabulated current-carrying capacity (It) needed. This is the fundamental cable sizing calculation from BS 7671: It = Ib / (Ca × Cg × Ci × Cf)."
        />

        {/* Section 03 — Material Lists & Takeoffs */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">03</span>
            <h3 className="text-lg font-bold text-white">Material Lists & Takeoffs</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              A material takeoff (MTO) is a detailed list of all materials required for an electrical installation. Creating accurate material takeoffs is essential for quotation accuracy, ordering efficiency, and profitability. A well-structured spreadsheet is the best tool for this task, allowing you to calculate costs, compare suppliers, and generate purchase orders.
            </p>
            <p>
              <strong className="text-white">Essential Columns for a Material Takeoff:</strong>
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Item Number</strong> — Sequential reference for each line item (1, 2, 3...)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Category</strong> — Grouping (e.g. Cable, Containment, Accessories, Distribution, Lighting)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Description</strong> — Full description including size, type, and colour</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Manufacturer / Part No.</strong> — For exact ordering and avoiding substitution errors</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Unit</strong> — Metres, each, box, reel, etc.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Quantity</strong> — Amount required (always add a waste factor, typically 5-10%)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Unit Cost (£)</strong> — Price per unit from your supplier</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Total Cost (£)</strong> — Calculated as =Quantity × Unit Cost</span>
              </li>
            </ul>
            <p>
              <strong className="text-white">Adding a Waste Factor</strong> — Professional material takeoffs always include a waste percentage. Cable is rarely used with zero offcuts, and accessories can be damaged during installation. A common approach is to add a "Waste %" column and calculate the order quantity as: <code className="text-green-400 bg-green-500/10 px-1.5 py-0.5 rounded text-xs">=Quantity*(1+WastePercent/100)</code>. Typical waste factors are 5% for cable, 10% for containment (due to cutting), and 2-3% for accessories.
            </p>
            <p>
              <strong className="text-white">Supplier Comparison</strong> — Create additional columns for prices from different suppliers. Use the MIN function to highlight the cheapest option: <code className="text-green-400 bg-green-500/10 px-1.5 py-0.5 rounded text-xs">=MIN(F2,G2,H2)</code> returns the lowest price across three suppliers. Conditional formatting can automatically highlight the cheapest option in green for each line item.
            </p>
            <p>
              <strong className="text-white">Subtotals by Category</strong> — Use the SUMIF function to calculate subtotals for each category: <code className="text-green-400 bg-green-500/10 px-1.5 py-0.5 rounded text-xs">=SUMIF(B:B,"Cable",H:H)</code> sums all costs in column H where column B contains "Cable." This gives you a clear breakdown: total cable cost, total containment cost, total accessory cost, etc. — essential information for quotation preparation and cost management.
            </p>
            <p>
              <strong className="text-white">Linking to the Job Costing Sheet</strong> — Your material takeoff total should feed directly into your job costing spreadsheet (covered in Section 04). Use cell references across sheets to ensure that any changes to material quantities or prices automatically update the overall job cost.
            </p>
          </div>
        </motion.div>

        {/* Section 04 — Job Costing Templates */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">04</span>
            <h3 className="text-lg font-bold text-white">Job Costing Templates</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              Accurate job costing is the difference between a profitable electrical business and one that struggles. A job costing spreadsheet brings together material costs, labour costs, overheads, and profit margin into a single document that forms the basis of your quotation. Getting this right is a critical business skill.
            </p>
            <p>
              <strong className="text-white">Structure of a Job Costing Spreadsheet:</strong>
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Materials Section</strong> — Links to your material takeoff total. This should pull the figure directly from your MTO sheet using a cell reference like =MTO!H100 (assuming H100 contains the grand total).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Labour Section</strong> — List each task with estimated hours and the hourly rate. For example: First fix (16 hours × £35/hr = £560), Second fix (12 hours × £35/hr = £420), Testing & commissioning (4 hours × £40/hr = £160). Use =Hours*Rate to calculate each line.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Subcontractor Costs</strong> — If you need specialist subcontractors (e.g. for fire alarm commissioning or data cabling), include their quoted costs here.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Direct Costs</strong> — Hire charges for specialist tools, skip hire, parking permits, certification fees, and other project-specific expenses.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Overheads</strong> — A percentage to cover your business running costs: van, insurance, tools, phone, accounting, CPD training. Typically calculated as a percentage of labour costs (commonly 15-25%).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Profit Margin</strong> — Applied as a percentage of the subtotal. Typical profit margins for domestic electrical work range from 10-20%. The formula is: <code className="text-green-400 bg-green-500/10 px-1.5 py-0.5 rounded text-xs">=Subtotal*ProfitPercent/100</code></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">VAT</strong> — If you are VAT registered, add 20%: <code className="text-green-400 bg-green-500/10 px-1.5 py-0.5 rounded text-xs">=Subtotal*0.2</code>. Note: some domestic work qualifies for a reduced VAT rate of 5% for energy-saving installations.</span>
              </li>
            </ul>
            <p>
              <strong className="text-white">Tracking Actual vs. Estimated Costs</strong> — After completing a job, add columns for actual costs alongside your estimates. This comparison reveals whether you are consistently over- or under-estimating, allowing you to refine your quoting for future work. Use a formula like <code className="text-green-400 bg-green-500/10 px-1.5 py-0.5 rounded text-xs">=(Actual-Estimated)/Estimated*100</code> to calculate the percentage variance for each cost category.
            </p>
            <p>
              <strong className="text-white">Profitability Analysis</strong> — At the bottom of your job costing sheet, include summary calculations: total revenue (the amount the client pays), total costs (materials + labour + overheads + direct costs), gross profit (revenue minus costs), and profit margin percentage. Over time, this data helps you understand which types of jobs are most profitable and where you might be losing money.
            </p>
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">Key Point</p>
              <p className="text-sm text-white/80">
                A job costing spreadsheet is not just for quotations — it is a learning tool. By comparing estimated and actual costs on every job, you develop increasingly accurate estimating skills. Many successful electrical contractors attribute their profitability directly to disciplined job costing.
              </p>
            </div>
          </div>
        </motion.div>

        {/* InlineCheck after Section 04 */}
        <InlineCheck
          question="Your material takeoff totals £2,400. Labour is estimated at £1,800. Overheads are 20% of labour. With a 15% profit margin on the subtotal (before VAT), what is the approximate subtotal before VAT?"
          options={[
            "£4,200.00",
            "£4,560.00",
            "£5,244.00",
            "£5,520.00"
          ]}
          correctIndex={2}
          explanation="Materials (£2,400) + Labour (£1,800) + Overheads (20% of £1,800 = £360) = £4,560 subtotal before profit. Adding 15% profit: £4,560 × 1.15 = £5,244.00. A spreadsheet calculates this instantly, and changing any input automatically updates the final figure."
        />

        {/* Section 05 — Essential Formulae */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">05</span>
            <h3 className="text-lg font-bold text-white">Essential Formulae</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              Mastering a core set of spreadsheet formulae transforms you from a basic user into a power user. Here are the formulae every electrician should know, with practical examples relevant to electrical work:
            </p>
            <p>
              <strong className="text-white">SUM — Adding Values</strong>
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><code className="text-green-400 bg-green-500/10 px-1.5 py-0.5 rounded text-xs">=SUM(B2:B50)</code> — Adds all values from B2 to B50. Use for totalling material costs, circuit loads, or cable lengths.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><code className="text-green-400 bg-green-500/10 px-1.5 py-0.5 rounded text-xs">=SUM(B2,D2,F2)</code> — Adds specific individual cells. Useful for summing non-adjacent values.</span>
              </li>
            </ul>
            <p>
              <strong className="text-white">AVERAGE — Finding the Mean</strong>
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><code className="text-green-400 bg-green-500/10 px-1.5 py-0.5 rounded text-xs">=AVERAGE(C2:C20)</code> — Calculates the mean of a range. Use for average power readings, mean insulation resistance values across circuits, or typical job durations for estimating.</span>
              </li>
            </ul>
            <p>
              <strong className="text-white">MAX and MIN — Finding Extremes</strong>
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><code className="text-green-400 bg-green-500/10 px-1.5 py-0.5 rounded text-xs">=MAX(D2:D100)</code> — Returns the largest value. Use to find the highest voltage drop, maximum load, or most expensive material item.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><code className="text-green-400 bg-green-500/10 px-1.5 py-0.5 rounded text-xs">=MIN(D2:D100)</code> — Returns the smallest value. Use to find the lowest insulation resistance reading (which determines the overall result).</span>
              </li>
            </ul>
            <p>
              <strong className="text-white">IF — Conditional Logic</strong>
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><code className="text-green-400 bg-green-500/10 px-1.5 py-0.5 rounded text-xs">=IF(L2&lt;=11.5,"PASS","FAIL")</code> — Checks if voltage drop is within the 5% limit for a 230V supply.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><code className="text-green-400 bg-green-500/10 px-1.5 py-0.5 rounded text-xs">=IF(B2&gt;=1,"Satisfactory","Unsatisfactory")</code> — Checks if insulation resistance meets the minimum 1 MOhm requirement.</span>
              </li>
            </ul>
            <p>
              <strong className="text-white">SUMIF — Conditional Summing</strong>
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><code className="text-green-400 bg-green-500/10 px-1.5 py-0.5 rounded text-xs">=SUMIF(A:A,"Lighting",D:D)</code> — Sums all values in column D where column A contains "Lighting." Perfect for calculating total load by circuit type.</span>
              </li>
            </ul>
            <p>
              <strong className="text-white">VLOOKUP — Looking Up Values</strong>
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><code className="text-green-400 bg-green-500/10 px-1.5 py-0.5 rounded text-xs">=VLOOKUP(B2,RatingTable,3,FALSE)</code> — Looks up a value in the first column of a table and returns a value from the specified column. Use for looking up cable ratings, correction factors, or material prices from reference tables.</span>
              </li>
            </ul>
            <p>
              <strong className="text-white">ROUND — Controlling Decimal Places</strong>
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><code className="text-green-400 bg-green-500/10 px-1.5 py-0.5 rounded text-xs">=ROUND(B2*C2,2)</code> — Rounds the result to 2 decimal places. Essential for financial calculations where you need exact pence values, and for presenting test results to appropriate precision.</span>
              </li>
            </ul>
            <p>
              <strong className="text-white">COUNTIF — Counting Occurrences</strong>
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><code className="text-green-400 bg-green-500/10 px-1.5 py-0.5 rounded text-xs">=COUNTIF(M:M,"FAIL")</code> — Counts how many circuits fail the voltage drop check. Useful for summary statistics: "3 of 42 circuits require redesign."</span>
              </li>
            </ul>
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">Key Point</p>
              <p className="text-sm text-white/80">
                Start with SUM, AVERAGE, and IF — these three formulae cover the vast majority of electrical calculation needs. As you become more comfortable, add VLOOKUP, SUMIF, and COUNTIF to your repertoire. Practice by recreating your most common manual calculations in a spreadsheet.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Section 06 — Charts & Data Visualisation */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">06</span>
            <h3 className="text-lg font-bold text-white">Charts & Data Visualisation</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              Charts transform raw numbers into visual stories. A well-chosen chart can communicate information at a glance that would take minutes to extract from a table of numbers. For electricians, charts are valuable for presentations to clients, reporting to project managers, analysing business performance, and identifying trends in test data.
            </p>
            <p>
              <strong className="text-white">Choosing the Right Chart Type:</strong>
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Pie Chart</strong> — Shows proportions of a whole. Ideal for: cost breakdown by category (materials 45%, labour 35%, overheads 10%, profit 10%), or distribution of circuit types in an installation (lighting 30%, power 40%, specialist 20%, spare 10%).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Bar Chart</strong> — Compares values across categories. Ideal for: comparing material costs from different suppliers, showing the number of circuits by type in a distribution board, or comparing estimated vs. actual hours on a job.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Line Chart</strong> — Shows trends over time. Ideal for: tracking monthly revenue or costs, monitoring energy consumption patterns, or showing the progression of a project's expenditure against budget.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Stacked Bar Chart</strong> — Shows composition within categories. Ideal for: showing the breakdown of time spent on different activities across multiple jobs, or the material, labour, and overhead components of several project costs side by side.</span>
              </li>
            </ul>
            <p>
              <strong className="text-white">Creating a Chart</strong> — Select the data you want to chart (including headers), then insert a chart from the menu. In Excel, go to Insert → Chart. In Google Sheets, go to Insert → Chart. The software will suggest a chart type, but you can change it. Always add: a descriptive title, axis labels (with units), a legend if there are multiple data series, and data labels if the chart needs precise values to be readable.
            </p>
            <p>
              <strong className="text-white">Practical Example: Monthly Revenue Chart</strong> — Create a spreadsheet tracking monthly invoiced amounts. Columns: Month, Domestic Work, Commercial Work, Maintenance Contracts, Total. A stacked bar chart showing the breakdown by work type for each month reveals seasonal patterns — perhaps domestic work peaks in autumn (pre-winter rewires) while commercial work is steadier year-round. This insight helps with planning, staffing, and marketing.
            </p>
            <p>
              <strong className="text-white">Practical Example: Cost Breakdown Pie Chart</strong> — After completing a job, create a pie chart showing where the money went. If materials consumed 55% of the budget but you estimated 45%, the chart makes this discrepancy immediately obvious. Share these insights with your team or use them to improve future estimates.
            </p>
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">Key Point</p>
              <p className="text-sm text-white/80">
                A chart included in a quotation or report looks professional and helps clients understand your pricing. A simple pie chart showing the cost breakdown (materials, labour, overheads, profit) builds trust by demonstrating transparency. Always label charts clearly — they should be understandable without additional explanation.
              </p>
            </div>
          </div>
        </motion.div>

        {/* InlineCheck after Section 06 */}
        <InlineCheck
          question="You want to find the lowest insulation resistance reading from 30 test results in cells D2:D31. Which formula do you use?"
          options={[
            "=AVERAGE(D2:D31)",
            "=SUM(D2:D31)",
            "=MIN(D2:D31)",
            "=COUNTIF(D2:D31,\"<1\")"
          ]}
          correctIndex={2}
          explanation="=MIN(D2:D31) returns the smallest value in the range — the lowest insulation resistance reading. In electrical testing, the lowest reading determines the overall result, so finding the minimum is critical. AVERAGE would give the mean, SUM the total, and COUNTIF would count readings below 1 MOhm."
        />

        {/* Section 07 — Sorting & Filtering */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">07</span>
            <h3 className="text-lg font-bold text-white">Sorting & Filtering</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              As your spreadsheets grow larger — containing dozens of circuits, hundreds of material lines, or months of financial data — the ability to sort and filter becomes essential. These features help you find specific information quickly, organise data logically, and analyse subsets of your data without modifying the original.
            </p>
            <p>
              <strong className="text-white">Sorting Data</strong> — Sorting rearranges your data based on the values in one or more columns. Select your data range, then use the Sort option (Data → Sort in most applications). Common sorting needs for electricians include:
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span>Sort a material list by cost (highest to lowest) to identify the most expensive items that might benefit from supplier negotiation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span>Sort circuits by voltage drop (highest first) to identify those closest to the limit</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span>Sort invoices by date to create a chronological record for tax purposes</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span>Sort clients alphabetically for quick reference</span>
              </li>
            </ul>
            <p>
              <strong className="text-white">Multi-Level Sorting</strong> — You can sort by multiple criteria. For example, sort first by Category (to group all cable items together, all accessories together, etc.) and then by Cost within each category. In Excel, use Data → Sort → Add Level to add additional sort criteria.
            </p>
            <p>
              <strong className="text-white">Filtering Data</strong> — Filters temporarily hide rows that do not match your criteria, without deleting them. To enable filters, select your header row and click Data → Filter (or Ctrl+Shift+L in Excel). Drop-down arrows appear on each column header. Click an arrow to select which values to display.
            </p>
            <p>
              <strong className="text-white">Practical Filtering Examples:</strong>
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span>Filter a circuit schedule to show only circuits with "FAIL" status — instantly see which circuits need redesigning</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span>Filter a material list to show only "Cable" items — useful for placing a cable-only order with a supplier</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span>Filter invoices to show only unpaid items — quick view of outstanding debts</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span>Filter by date range to see all work completed in a specific quarter for VAT returns</span>
              </li>
            </ul>
            <p>
              <strong className="text-white">Custom Filters</strong> — Beyond simple selection, you can create custom filters with conditions: "Greater than," "Less than," "Contains," "Between." For example, filter to show all materials costing more than £100, or all circuits with a voltage drop between 9V and 11.5V (approaching the limit but not yet failing).
            </p>
            <p>
              <strong className="text-white">Important: Freezing Panes</strong> — When working with large spreadsheets, freeze the top row (containing your headers) so it stays visible as you scroll down. In Excel: View → Freeze Panes → Freeze Top Row. In Google Sheets: View → Freeze → 1 Row. Without frozen headers, you quickly lose track of which column is which.
            </p>
          </div>
        </motion.div>

        {/* Section 08 — Practical Spreadsheet Projects */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">08</span>
            <h3 className="text-lg font-bold text-white">Practical Spreadsheet Projects</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              The best way to learn spreadsheets is by building something useful. Here are practical projects that will develop your skills while creating tools you will actually use in your electrical career. Start with Project 1 and work through them in order, as each builds on skills from the previous one.
            </p>
            <p>
              <strong className="text-white">Project 1: Personal Budget Tracker</strong> — Create a spreadsheet tracking your monthly income and expenses. Columns: Date, Description, Category (Income, Van Costs, Tools, Insurance, Training, etc.), Amount In, Amount Out, Running Balance. Use SUM for monthly totals, SUMIF for category totals, and a pie chart for the expense breakdown. Skills practised: data entry, basic formulae, formatting, and charts.
            </p>
            <p>
              <strong className="text-white">Project 2: Tool Inventory Register</strong> — List all your electrical tools and test equipment. Columns: Tool Name, Manufacturer, Serial Number, Purchase Date, Purchase Price, Calibration Due Date, PAT Test Due Date, Location, Condition. Use conditional formatting to highlight calibration dates within 30 days (amber) or overdue (red). Add a formula: <code className="text-green-400 bg-green-500/10 px-1.5 py-0.5 rounded text-xs">=IF(F2-TODAY()&lt;30,"DUE SOON",IF(F2&lt;TODAY(),"OVERDUE","OK"))</code>. Skills practised: dates, IF formulae, conditional formatting.
            </p>
            <p>
              <strong className="text-white">Project 3: Cable Sizing Calculator</strong> — Build the cable calculation spreadsheet described in Section 02. Start with 5 circuits and expand from there. Include correction factors, voltage drop calculations, and pass/fail checks. Add a reference sheet with cable rating tables from BS 7671. Use VLOOKUP to automatically retrieve current ratings. Skills practised: complex formulae, cell references, VLOOKUP, multiple sheets.
            </p>
            <p>
              <strong className="text-white">Project 4: Job Quotation Generator</strong> — Combine the material takeoff and job costing templates from Sections 03 and 04 into a single workbook. Sheet 1: Material Takeoff. Sheet 2: Labour Estimate. Sheet 3: Job Cost Summary (pulling totals from sheets 1 and 2, adding overheads and profit). Sheet 4: Client Quotation (a presentable summary suitable for sending to the client). Skills practised: multi-sheet workbooks, cross-sheet references, professional formatting.
            </p>
            <p>
              <strong className="text-white">Project 5: Annual Business Dashboard</strong> — Create a workbook that tracks your business performance over a year. Sheet 1: Monthly revenue and expenses. Sheet 2: Job log (date, client, job type, quoted amount, actual cost, profit). Sheet 3: Dashboard with charts — monthly revenue trend (line chart), revenue by job type (pie chart), estimated vs. actual costs (bar chart), and running profit margin. Skills practised: advanced formulae, multiple chart types, data analysis.
            </p>
            <p>
              <strong className="text-white">Tips for All Projects:</strong>
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span>Start simple and add complexity gradually — a working basic spreadsheet is better than a broken complex one</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span>Use clear headers and consistent formatting from the start</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span>Save your work frequently (Ctrl+S) and keep backups</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span>Test your formulae with known values to verify they calculate correctly before relying on them</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span>Protect finished templates (Review → Protect Sheet) to prevent accidental formula deletion</span>
              </li>
            </ul>
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">Key Point</p>
              <p className="text-sm text-white/80">
                Do not try to build the perfect spreadsheet on your first attempt. Start with the basics, use it on a real job, note what is missing or awkward, and improve it. Each iteration makes the tool more useful. The best spreadsheets evolve over months and years of practical use.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Quiz */}
        <Quiz questions={quizQuestions} title="Spreadsheets & Calculations Quiz" />

        {/* Nav footer */}
        <div className="flex items-center justify-between pt-6 border-t border-white/10">
          <Link
            to="/study-centre/apprentice/functional-skills/module3/section1"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 transition-colors touch-manipulation"
          >
            <ArrowLeft className="w-4 h-4" />
            Computer Basics
          </Link>
          <Link
            to="/study-centre/apprentice/functional-skills/module3/section3"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white bg-green-500 hover:bg-green-600 transition-colors touch-manipulation shadow-lg shadow-green-500/25"
          >
            Documentation & Apps
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FunctionalSkillsModule3Section2;
