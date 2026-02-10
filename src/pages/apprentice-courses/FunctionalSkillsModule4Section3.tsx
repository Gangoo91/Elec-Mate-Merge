import { ArrowLeft, ArrowRight, PoundSterling, FileText, Calculator, TrendingUp, BookOpen, ClipboardList } from "lucide-react";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import useSEO from "@/hooks/useSEO";

const FunctionalSkillsModule4Section3 = () => {
  useSEO(
    "Section 3: Costing & Quoting - Practical Mathematics Applications",
    "Learn material takeoffs, labour rate calculations, markup vs margin, VAT, professional quoting, day rates vs fixed price, variations and pricing strategy for electrical work."
  );

  const quizQuestions = [
    {
      id: 1,
      question:
        "A job requires \u00A3800 of materials. You want a 25% markup. What do you charge for materials?",
      options: ["\u00A3900", "\u00A31,000", "\u00A31,067", "\u00A31,200"],
      correctAnswer: 1,
      explanation:
        "Markup is calculated on cost price. 25% markup on \u00A3800 = \u00A3800 \u00D7 1.25 = \u00A31,000. The \u00A3200 difference is your gross profit on materials.",
    },
    {
      id: 2,
      question:
        "Your overheads are \u00A32,000/month. You work 20 days/month, 8 hours/day. You want to earn \u00A32,400/month net. What is your minimum hourly rate (before profit)?",
      options: ["\u00A315.00/hr", "\u00A322.50/hr", "\u00A327.50/hr", "\u00A330.00/hr"],
      correctAnswer: 2,
      explanation:
        "Total needed = \u00A32,400 (earnings) + \u00A32,000 (overheads) = \u00A34,400/month. Hours = 20 \u00D7 8 = 160. Rate = \u00A34,400 / 160 = \u00A327.50/hr. This covers your costs and desired earnings but includes no profit margin.",
    },
    {
      id: 3,
      question:
        "A quote totals \u00A32,500 net. You need to add VAT at 20%. What is the gross (VAT-inclusive) price?",
      options: ["\u00A32,750", "\u00A33,000", "\u00A33,125", "\u00A32,600"],
      correctAnswer: 1,
      explanation:
        "VAT at 20% = \u00A32,500 \u00D7 0.20 = \u00A3500. Gross price = \u00A32,500 + \u00A3500 = \u00A33,000. Alternatively, \u00A32,500 \u00D7 1.20 = \u00A33,000.",
    },
    {
      id: 4,
      question:
        "A job has a total selling price of \u00A31,200. The cost of materials and labour is \u00A3960. What is the profit margin?",
      options: ["20%", "25%", "15%", "30%"],
      correctAnswer: 0,
      explanation:
        "Margin = (Selling Price \u2013 Cost) / Selling Price \u00D7 100 = (1200 \u2013 960) / 1200 \u00D7 100 = 240 / 1200 \u00D7 100 = 20%. Note: the markup is 240/960 = 25%, which is different from the 20% margin.",
    },
    {
      id: 5,
      question:
        "You quote \u00A34,500 fixed price for a rewire. During the job you discover the consumer unit needs upgrading, adding \u00A3450 in materials and 4 hours labour at \u00A340/hr. What should you do?",
      options: [
        "Absorb the cost \u2014 it was a fixed price",
        "Issue a written variation order and get it signed before proceeding",
        "Add it to the final invoice without telling the customer",
        "Refuse to do the extra work",
      ],
      correctAnswer: 1,
      explanation:
        "Any work outside the original scope should be covered by a written variation order, agreed and signed by the customer before you start the additional work. This protects both parties. The variation would be \u00A3450 + (4 \u00D7 \u00A340) = \u00A3610 plus any markup.",
    },
    {
      id: 6,
      question:
        "You are quoting for 12 twin sockets, 6 LED downlights, and a consumer unit upgrade. How would you structure the material takeoff?",
      options: [
        "Estimate a total and add 10%",
        "List each item, quantity, unit cost, and total cost in a spreadsheet",
        "Ask the customer what they want to pay",
        "Copy prices from last year\u2019s job",
      ],
      correctAnswer: 1,
      explanation:
        "A proper material takeoff lists every item individually with quantity, unit cost and extended total. This ensures accuracy, makes it easy to check for errors, and provides a clear record if quantities change during the job.",
    },
    {
      id: 7,
      question:
        "What is the key difference between markup and margin?",
      options: [
        "They are the same thing",
        "Markup is on cost, margin is on selling price",
        "Markup is on selling price, margin is on cost",
        "Margin includes VAT, markup does not",
      ],
      correctAnswer: 1,
      explanation:
        "Markup is calculated as a percentage of the cost price. Margin is calculated as a percentage of the selling price. A 25% markup on \u00A3100 cost gives \u00A3125 selling price, but the margin is only 20% (\u00A325/\u00A3125). This distinction matters for profitability analysis.",
    },
    {
      id: 8,
      question:
        "A customer wants a VAT-inclusive price of \u00A33,600 for a job. What is the net (ex-VAT) amount you should put on your invoice?",
      options: ["\u00A32,880", "\u00A33,000", "\u00A33,120", "\u00A33,600"],
      correctAnswer: 1,
      explanation:
        "To find the net amount from a VAT-inclusive figure, divide by 1.20. Net = \u00A33,600 / 1.20 = \u00A33,000. The VAT element is \u00A33,600 \u2013 \u00A33,000 = \u00A3600.",
    },
  ];

  return (
    <div className="pb-24 bg-elec-dark min-h-screen">
      {/* Sticky header */}
      <div className="sticky top-0 z-10 bg-elec-dark/95 backdrop-blur-sm border-b border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3">
          <Link
            to="/study-centre/apprentice/functional-skills/module4"
            className="p-2 -ml-2 touch-manipulation"
          >
            <ArrowLeft className="w-5 h-5 text-white/60" />
          </Link>
          <div>
            <p className="text-[11px] font-semibold text-green-400 uppercase tracking-wider">
              Module 4 &bull; Section 3
            </p>
            <h1 className="text-base font-bold text-white">Costing &amp; Quoting</h1>
          </div>
        </div>
      </div>

      {/* Hero section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-elec-dark via-neutral-900 to-elec-dark" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-green-600/10 via-transparent to-transparent" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-8 text-center">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="relative inline-flex mb-4">
              <div className="absolute inset-0 bg-green-500/30 rounded-2xl blur-xl animate-pulse" />
              <div className="relative p-4 rounded-2xl bg-gradient-to-br from-green-500 via-green-600 to-emerald-600 shadow-2xl shadow-green-500/25">
                <PoundSterling className="h-8 w-8 text-white" />
              </div>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
              Costing &amp; Quoting
            </h2>
            <p className="text-sm text-white/50 max-w-lg mx-auto">
              Learn the mathematics of running an electrical business &mdash; from material takeoffs
              and labour rates to margins, VAT and professional quoting.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content cards */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6 mt-6">

        {/* ── 01 Material Takeoffs ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">01</span>
            <h3 className="text-lg font-bold text-white">Material Takeoffs</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              A material takeoff (MTO) is a detailed list of every material item needed for a job,
              with quantities and costs. Getting this right is the foundation of accurate quoting.
              Underestimate and you lose money; overestimate and you lose the job.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="font-medium text-green-400 mb-2">How to Do a Material Takeoff from Drawings</h4>
              <ul className="space-y-2 text-sm text-white/80">
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>Start with the distribution board &mdash; list every MCB, RCBO, busbar and enclosure</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>Measure cable routes on drawings using the scale &mdash; add 10% for waste and deviation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>Count every accessory: sockets, switches, lights, FCUs, spurs, etc.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>List containment: conduit lengths, trunking, cable clips, fixings, back boxes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>Include consumables: tape, glands, grommets, labels, screws, rawlplugs</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>Add test equipment consumables if applicable (test leads, batteries)</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="font-medium text-green-400 mb-2">Worked Example &mdash; Bathroom Refurbishment</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span className="text-white/80">Shower isolator switch</span>
                  <span className="text-green-400">1 &times; &pound;8.50 = &pound;8.50</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span className="text-white/80">45A DP switch (shower)</span>
                  <span className="text-green-400">1 &times; &pound;12.00 = &pound;12.00</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span className="text-white/80">10.0mm&sup2; T&amp;E cable (15m)</span>
                  <span className="text-green-400">1 &times; &pound;52.50 = &pound;52.50</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span className="text-white/80">IP65 downlights</span>
                  <span className="text-green-400">4 &times; &pound;14.00 = &pound;56.00</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span className="text-white/80">1.5mm&sup2; T&amp;E cable (25m)</span>
                  <span className="text-green-400">1 &times; &pound;18.75 = &pound;18.75</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span className="text-white/80">Fan isolator switch</span>
                  <span className="text-green-400">1 &times; &pound;9.50 = &pound;9.50</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span className="text-white/80">Sundries (clips, fixings, connectors)</span>
                  <span className="text-green-400">1 &times; &pound;15.00 = &pound;15.00</span>
                </div>
                <div className="flex justify-between pt-2 font-medium">
                  <span className="text-white">Total materials</span>
                  <span className="text-green-400 text-base">&pound;172.25</span>
                </div>
              </div>
            </div>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">Key Point</p>
              <p className="text-sm text-white/80">
                Always add a contingency of 5&ndash;10% for waste, breakages and unforeseen items.
                A &pound;172 material list becomes approximately &pound;190 with 10% contingency. This
                small buffer prevents you from going back to the wholesaler mid-job.
              </p>
            </div>
          </div>
        </motion.div>

        {/* ── 02 Labour Rate Calculations ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">02</span>
            <h3 className="text-lg font-bold text-white">Labour Rate Calculations</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              Your hourly rate must cover more than just the money you want in your pocket. It needs
              to account for all business overheads, non-billable time, holidays, and your desired
              net income. Getting this calculation wrong means you work at a loss.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="font-medium text-green-400 mb-3">Calculating Your True Hourly Rate</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span className="text-white/80">Desired annual salary</span>
                  <span className="text-green-400">&pound;35,000</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span className="text-white/80">Vehicle costs (fuel, insurance, maintenance)</span>
                  <span className="text-green-400">&pound;6,000</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span className="text-white/80">Tools and equipment</span>
                  <span className="text-green-400">&pound;2,000</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span className="text-white/80">Insurance (public liability, PI)</span>
                  <span className="text-green-400">&pound;1,500</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span className="text-white/80">Accounting, software, phone</span>
                  <span className="text-green-400">&pound;2,500</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span className="text-white/80">Training and certification</span>
                  <span className="text-green-400">&pound;1,000</span>
                </div>
                <div className="flex justify-between pt-2 font-medium border-t border-white/10 mt-1">
                  <span className="text-white">Total annual costs</span>
                  <span className="text-green-400 text-base">&pound;48,000</span>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="font-medium text-green-400 mb-2">Converting to an Hourly Rate</h4>
              <ul className="space-y-1 text-sm text-white/80">
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>Working weeks per year: 52 &minus; 5 (holiday) &minus; 1 (sick) = 46 weeks</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>Billable days per week: 4.5 (half day for admin, quoting, travel)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>Billable hours per day: 7 (allowing for travel, setup, breaks)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>Total billable hours: 46 &times; 4.5 &times; 7 = 1,449 hours</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>Minimum hourly rate: &pound;48,000 / 1,449 = <strong className="text-white">&pound;33.13/hr</strong></span>
                </li>
              </ul>
            </div>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">Key Point</p>
              <p className="text-sm text-white/80">
                This &pound;33.13/hr is your <em>break-even</em> rate with zero profit. You then need
                to add a profit margin on top (typically 15&ndash;25%) to build the business, cover
                unexpected costs, and invest in growth. At 20% profit margin, you would charge approximately &pound;41.50/hr.
              </p>
            </div>
          </div>
        </motion.div>

        {/* InlineCheck after section 02 */}
        <InlineCheck
          id="cost-check-1"
          question="Your monthly overheads are \u00A32,200 and you want to take home \u00A32,800/month. You work 21 billable days at 7 hours. What is your break-even hourly rate?"
          options={[
            "\u00A319.05/hr",
            "\u00A324.49/hr",
            "\u00A334.01/hr",
            "\u00A340.00/hr",
          ]}
          correctIndex={2}
          explanation="Total needed = \u00A32,800 + \u00A32,200 = \u00A35,000/month. Billable hours = 21 \u00D7 7 = 147. Rate = \u00A35,000 / 147 = \u00A334.01/hr. This is before any profit margin."
        />

        {/* ── 03 Markup vs Margin ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">03</span>
            <h3 className="text-lg font-bold text-white">Markup vs Margin</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              These two terms are often confused, but they mean very different things. Understanding
              the distinction is essential for pricing your work correctly and maintaining profitability.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
                <h4 className="font-medium text-green-400 mb-2 text-center">Markup</h4>
                <p className="text-sm text-white/80 text-center mb-2">Percentage added to <strong className="text-white">cost price</strong></p>
                <div className="bg-white/5 rounded-lg p-2 text-center">
                  <p className="text-green-400 font-mono text-sm">Selling = Cost &times; (1 + markup%)</p>
                </div>
              </div>
              <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
                <h4 className="font-medium text-green-400 mb-2 text-center">Margin</h4>
                <p className="text-sm text-white/80 text-center mb-2">Profit as percentage of <strong className="text-white">selling price</strong></p>
                <div className="bg-white/5 rounded-lg p-2 text-center">
                  <p className="text-green-400 font-mono text-sm">Margin = Profit / Selling &times; 100</p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="font-medium text-green-400 mb-2">Worked Example &mdash; The Difference Matters</h4>
              <p className="text-sm text-white/80 mb-2">
                Materials cost &pound;400. You apply a 20% markup. What is the selling price and what
                is the actual margin?
              </p>
              <ul className="space-y-1 text-sm text-white/80">
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>20% markup: &pound;400 &times; 1.20 = &pound;480 selling price</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>Profit: &pound;480 &minus; &pound;400 = &pound;80</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>Margin: &pound;80 / &pound;480 &times; 100 = <strong className="text-white">16.67%</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>A 20% markup only gives a 16.67% margin &mdash; not 20%!</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="font-medium text-green-400 mb-2">Common Conversions</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span className="text-white/80">20% markup</span>
                  <span className="text-green-400">= 16.67% margin</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span className="text-white/80">25% markup</span>
                  <span className="text-green-400">= 20% margin</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span className="text-white/80">33.3% markup</span>
                  <span className="text-green-400">= 25% margin</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span className="text-white/80">50% markup</span>
                  <span className="text-green-400">= 33.3% margin</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80">100% markup</span>
                  <span className="text-green-400">= 50% margin</span>
                </div>
              </div>
            </div>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">Key Point</p>
              <p className="text-sm text-white/80">
                If you want a 20% profit margin on a &pound;1,000 cost, you need to sell at &pound;1,250
                (which is a 25% markup). Many electricians lose money because they apply a 20% markup
                thinking it gives a 20% margin &mdash; it does not.
              </p>
            </div>
          </div>
        </motion.div>

        {/* ── 04 VAT Calculations ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">04</span>
            <h3 className="text-lg font-bold text-white">VAT Calculations</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              Value Added Tax (VAT) is currently charged at 20% in the UK. If you are VAT registered
              (required once turnover exceeds &pound;90,000), you must charge VAT on your invoices
              and submit quarterly returns to HMRC. The maths is straightforward but errors are common.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
                <h4 className="font-medium text-green-400 mb-2 text-sm">Adding VAT</h4>
                <p className="text-green-400 font-mono text-center text-sm mb-1">Gross = Net &times; 1.20</p>
                <p className="text-xs text-white/60 text-center">&pound;1,000 net = &pound;1,200 gross</p>
              </div>
              <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
                <h4 className="font-medium text-green-400 mb-2 text-sm">Removing VAT</h4>
                <p className="text-green-400 font-mono text-center text-sm mb-1">Net = Gross / 1.20</p>
                <p className="text-xs text-white/60 text-center">&pound;1,200 gross = &pound;1,000 net</p>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="font-medium text-green-400 mb-2">Worked Example &mdash; Invoice Calculation</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span className="text-white/80">Materials (net)</span>
                  <span className="text-green-400">&pound;850.00</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span className="text-white/80">Labour: 16 hours &times; &pound;45/hr</span>
                  <span className="text-green-400">&pound;720.00</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-1 font-medium">
                  <span className="text-white">Subtotal (net)</span>
                  <span className="text-green-400">&pound;1,570.00</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span className="text-white/80">VAT at 20%</span>
                  <span className="text-green-400">&pound;314.00</span>
                </div>
                <div className="flex justify-between pt-1 font-bold">
                  <span className="text-white">Total (gross)</span>
                  <span className="text-green-400 text-base">&pound;1,884.00</span>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="font-medium text-green-400 mb-2">Reduced Rate VAT (5%)</h4>
              <p className="text-sm text-white/80">
                Some energy-saving installations qualify for the reduced 5% VAT rate instead of 20%.
                This includes solar panels, heat pumps, and insulation when installed in qualifying
                residential properties. Always check HMRC guidance for current eligibility criteria &mdash;
                charging the wrong rate can result in penalties.
              </p>
            </div>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">Key Point</p>
              <p className="text-sm text-white/80">
                VAT is not your money &mdash; it belongs to HMRC. Set aside 20% of every invoice
                payment into a separate account so you are never caught short on your quarterly return.
                A common mistake is spending VAT receipts as if they were income.
              </p>
            </div>
          </div>
        </motion.div>

        {/* InlineCheck after section 04 */}
        <InlineCheck
          id="cost-check-2"
          question="A customer asks for the VAT-inclusive price. Your net quote is \u00A32,750. What is the gross price including 20% VAT?"
          options={[
            "\u00A32,950",
            "\u00A33,000",
            "\u00A33,300",
            "\u00A33,437.50",
          ]}
          correctIndex={2}
          explanation="Gross = Net \u00D7 1.20 = \u00A32,750 \u00D7 1.20 = \u00A33,300. The VAT element is \u00A3550."
        />

        {/* ── 05 Creating Professional Quotes ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">05</span>
            <h3 className="text-lg font-bold text-white">Creating Professional Quotes</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              A professional quote protects you legally and helps win work. It should be clear,
              detailed, and leave no room for misunderstanding. Always put your quotes in writing.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="font-medium text-green-400 mb-3">Quote Template Structure</h4>
              <div className="space-y-3">
                <div className="border-b border-white/10 pb-2">
                  <p className="text-white font-medium text-sm">Header</p>
                  <p className="text-xs text-white/60">Your business name, address, phone, email, registration numbers (NICEIC/NAPIT), VAT number</p>
                </div>
                <div className="border-b border-white/10 pb-2">
                  <p className="text-white font-medium text-sm">Customer Details</p>
                  <p className="text-xs text-white/60">Name, property address, contact details</p>
                </div>
                <div className="border-b border-white/10 pb-2">
                  <p className="text-white font-medium text-sm">Scope of Works</p>
                  <p className="text-xs text-white/60">Detailed description of all work to be carried out &mdash; be specific</p>
                </div>
                <div className="border-b border-white/10 pb-2">
                  <p className="text-white font-medium text-sm">Price Breakdown</p>
                  <p className="text-xs text-white/60">Materials, labour, any sub-contract costs, subtotal, VAT, total</p>
                </div>
                <div className="border-b border-white/10 pb-2">
                  <p className="text-white font-medium text-sm">Exclusions</p>
                  <p className="text-xs text-white/60">Clearly state what is NOT included (making good, decorating, etc.)</p>
                </div>
                <div className="border-b border-white/10 pb-2">
                  <p className="text-white font-medium text-sm">Terms</p>
                  <p className="text-xs text-white/60">Payment terms, validity period, cancellation policy</p>
                </div>
                <div>
                  <p className="text-white font-medium text-sm">Warranty</p>
                  <p className="text-xs text-white/60">Workmanship guarantee period (typically 12 months)</p>
                </div>
              </div>
            </div>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">Key Point</p>
              <p className="text-sm text-white/80">
                A quote is legally binding once accepted &mdash; you cannot increase the price unless the
                scope changes. An estimate, by contrast, is an approximation and can change. Use the
                correct term and make sure your customer understands which they are receiving.
              </p>
            </div>
          </div>
        </motion.div>

        {/* ── 06 Day Rates vs Fixed Price ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">06</span>
            <h3 className="text-lg font-bold text-white">Day Rates vs Fixed Price</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              Choosing between day rate and fixed price depends on the nature of the job. Each has
              advantages and risks. As an electrician, understanding when to use each model is
              crucial for protecting your profitability.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <h4 className="font-medium text-green-400 mb-2">Day Rate</h4>
                <ul className="space-y-1 text-sm text-white/80">
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-0.5">&bull;</span>
                    <span>Best for: fault finding, maintenance, uncertain scope</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-0.5">&bull;</span>
                    <span>Advantage: no risk of underquoting</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-0.5">&bull;</span>
                    <span>Disadvantage: customer has open-ended cost exposure</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-0.5">&bull;</span>
                    <span>Typical UK rates: &pound;250&ndash;&pound;400/day (2024&ndash;2025)</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <h4 className="font-medium text-green-400 mb-2">Fixed Price</h4>
                <ul className="space-y-1 text-sm text-white/80">
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-0.5">&bull;</span>
                    <span>Best for: new installations, rewires, defined scope</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-0.5">&bull;</span>
                    <span>Advantage: customer knows exact cost upfront</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-0.5">&bull;</span>
                    <span>Disadvantage: you absorb cost overruns</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-0.5">&bull;</span>
                    <span>More competitive &mdash; customers prefer certainty</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="font-medium text-green-400 mb-2">Worked Example &mdash; Comparing Approaches</h4>
              <p className="text-sm text-white/80 mb-2">
                Full house rewire. You estimate 5 days of work.
              </p>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span className="text-white/80">Day rate: 5 days &times; &pound;300/day</span>
                  <span className="text-green-400">&pound;1,500 + materials</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80">Fixed price (with 10% contingency)</span>
                  <span className="text-green-400">&pound;4,200 all-in</span>
                </div>
              </div>
              <p className="text-xs text-white/60 mt-2">
                If the job takes 4 days, fixed price earns you more. If it takes 7 days, day rate
                protects you. Experience helps you estimate accurately.
              </p>
            </div>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">Key Point</p>
              <p className="text-sm text-white/80">
                As your experience grows, fixed pricing becomes more profitable because you complete
                work faster than your quoted time. This is the reward for becoming more skilled and
                efficient &mdash; your effective hourly rate increases with experience.
              </p>
            </div>
          </div>
        </motion.div>

        {/* InlineCheck after section 06 */}
        <InlineCheck
          id="cost-check-3"
          question="You quote \u00A33,500 fixed price for a job you estimate at 4 days. Materials cost \u00A31,200. If you complete it in 3 days, what is your effective daily labour rate?"
          options={[
            "\u00A3575/day",
            "\u00A3766.67/day",
            "\u00A3875/day",
            "\u00A31,166.67/day",
          ]}
          correctIndex={1}
          explanation="Labour income = \u00A33,500 \u2013 \u00A31,200 materials = \u00A32,300. Over 3 days = \u00A32,300 / 3 = \u00A3766.67/day. This is significantly more than the \u00A3575/day you would have earned if it took 4 days (\u00A32,300 / 4). Efficiency rewards you on fixed-price work."
        />

        {/* ── 07 Managing Variations ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">07</span>
            <h3 className="text-lg font-bold text-white">Managing Variations</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              Variations (also called change orders) occur when the customer requests additional work,
              or when unforeseen conditions require changes to the original scope. How you handle
              variations can make or break the profitability of a fixed-price job.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="font-medium text-green-400 mb-2">The Variation Process</h4>
              <ul className="space-y-2 text-sm text-white/80">
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span><strong className="text-white">Identify:</strong> Recognise that work is outside the original scope</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span><strong className="text-white">Document:</strong> Write a clear description of the additional work</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span><strong className="text-white">Price:</strong> Calculate the additional cost (materials + labour + markup)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span><strong className="text-white">Agree:</strong> Get the customer to sign the variation order before starting</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span><strong className="text-white">Invoice:</strong> Add the variation to the final invoice as a separate line item</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="font-medium text-green-400 mb-2">Worked Example</h4>
              <p className="text-sm text-white/80 mb-2">
                During a rewire, you discover the consumer unit back box is corroded and needs
                replacing. This was not visible during the survey.
              </p>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span className="text-white/80">New metal enclosure</span>
                  <span className="text-green-400">&pound;85.00</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span className="text-white/80">Additional labour (2 hours &times; &pound;45)</span>
                  <span className="text-green-400">&pound;90.00</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span className="text-white/80">Materials markup (25%)</span>
                  <span className="text-green-400">&pound;21.25</span>
                </div>
                <div className="flex justify-between pt-1 font-medium">
                  <span className="text-white">Variation total (net)</span>
                  <span className="text-green-400">&pound;196.25</span>
                </div>
              </div>
            </div>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">Key Point</p>
              <p className="text-sm text-white/80">
                Never do additional work without a signed variation order. Verbal agreements lead to
                disputes. If the customer refuses to pay for necessary additional work, document that
                you advised them and let them decide. Protect yourself in writing every time.
              </p>
            </div>
          </div>
        </motion.div>

        {/* ── 08 Pricing Strategy ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">08</span>
            <h3 className="text-lg font-bold text-white">Pricing Strategy</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              Pricing is not just about covering costs &mdash; it is about positioning your business.
              Competing purely on price leads to a race to the bottom. Instead, focus on the value
              you provide: quality workmanship, reliability, proper certification, and guarantees.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="font-medium text-green-400 mb-2">Complete Job Costing Formula</h4>
              <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-3 text-center mb-3">
                <p className="text-green-400 font-mono text-sm">
                  Selling Price = (Materials + Labour + Overheads) &times; (1 + Profit Margin)
                </p>
              </div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span className="text-white/80">Materials (with markup)</span>
                  <span className="text-green-400">&pound;950</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span className="text-white/80">Labour (3 days &times; &pound;300)</span>
                  <span className="text-green-400">&pound;900</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span className="text-white/80">Overheads allocation</span>
                  <span className="text-green-400">&pound;150</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-1 font-medium">
                  <span className="text-white">Total cost</span>
                  <span className="text-green-400">&pound;2,000</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span className="text-white/80">Profit margin (20%)</span>
                  <span className="text-green-400">&pound;500</span>
                </div>
                <div className="flex justify-between pt-1 font-bold">
                  <span className="text-white">Selling price (net)</span>
                  <span className="text-green-400 text-base">&pound;2,500</span>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="font-medium text-white mb-2 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-green-400" />
                Key Takeaways
              </h4>
              <ul className="space-y-2 text-sm text-white/80">
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>Always do a detailed material takeoff &mdash; never guess at quantities</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>Calculate your true hourly rate including ALL overheads, not just your desired wage</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>Understand the difference between markup (on cost) and margin (on selling price)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>Set aside VAT separately &mdash; it is not your income</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>Put all quotes in writing with clear scope, exclusions, and payment terms</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>Never do variation work without a written, signed agreement</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">&bull;</span>
                  <span>Price for value, not just cost &mdash; quality workmanship commands premium rates</span>
                </li>
              </ul>
            </div>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">Key Point</p>
              <p className="text-sm text-white/80">
                The electricians who earn the most are not necessarily the cheapest. They are the ones
                who provide excellent communication, turn up on time, produce clean work, and make the
                customer feel confident. Your pricing should reflect the full value of your service,
                not just the time on site.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Quiz */}
        <Quiz questions={quizQuestions} title="Costing & Quoting Quiz" />

        {/* Navigation */}
        <div className="flex items-center justify-between pt-6 border-t border-white/10">
          <Link
            to="/study-centre/apprentice/functional-skills/module4/section2"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 transition-colors touch-manipulation"
          >
            <ArrowLeft className="w-4 h-4" />
            Cable Sizing &amp; Selection
          </Link>
          <Link
            to="/study-centre/apprentice/functional-skills/module4/section4"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white bg-green-500 hover:bg-green-600 transition-colors touch-manipulation shadow-lg shadow-green-500/25"
          >
            Geometry &amp; Spatial Skills
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FunctionalSkillsModule4Section3;