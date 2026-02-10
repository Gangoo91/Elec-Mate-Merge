import { ArrowLeft, ArrowRight, BarChart3, AlertTriangle } from "lucide-react";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import useSEO from "@/hooks/useSEO";

const FunctionalSkillsModule1Section4 = () => {
  useSEO(
    "Section 4: Data & Statistics - Mathematics for Electricians",
    "Interpret data, charts and statistics used in electrical testing, energy monitoring and project management on construction sites."
  );

  const quizQuestions = [
    {
      id: 1,
      question:
        "Five insulation resistance readings are: 200, 250, 300, 350 and 400 MΩ. What is the mean?",
      options: ["250 MΩ", "300 MΩ", "350 MΩ", "275 MΩ"],
      correctAnswer: 1,
      explanation:
        "Mean = sum ÷ count = (200 + 250 + 300 + 350 + 400) ÷ 5 = 1,500 ÷ 5 = 300 MΩ. The mean gives a useful average for comparing test results over time.",
    },
    {
      id: 2,
      question:
        "An energy monitoring bar chart shows the following daily consumption: Mon 42 kWh, Tue 55 kWh, Wed 38 kWh, Thu 61 kWh, Fri 54 kWh. What is the range?",
      options: ["23 kWh", "19 kWh", "50 kWh", "61 kWh"],
      correctAnswer: 0,
      explanation:
        "Range = highest value − lowest value = 61 − 38 = 23 kWh. A large range suggests significant variation in energy use across the week.",
    },
    {
      id: 3,
      question:
        "Seven R1+R2 readings (in Ω) are: 0.28, 0.31, 0.29, 0.35, 0.30, 0.29, 0.32. What is the median?",
      options: ["0.29 Ω", "0.30 Ω", "0.31 Ω", "0.32 Ω"],
      correctAnswer: 1,
      explanation:
        "Arrange in order: 0.28, 0.29, 0.29, 0.30, 0.31, 0.32, 0.35. With 7 values, the median is the 4th value = 0.30 Ω. The median is less affected by the outlier (0.35) than the mean.",
    },
    {
      id: 4,
      question:
        "A pie chart shows the causes of electrical incidents on a construction site: Cable damage 35%, Overloads 25%, Earth faults 20%, Other 20%. If there were 80 incidents total, how many were caused by cable damage?",
      options: ["35", "28", "25", "40"],
      correctAnswer: 1,
      explanation:
        "35% of 80 = 0.35 × 80 = 28 incidents. Pie charts show proportions and are useful for identifying the most common causes to target for improvement.",
    },
    {
      id: 5,
      question:
        "An electricity meter reads 34,560 kWh on 1st March and 35,840 kWh on 1st April. How many kWh were consumed in March?",
      options: ["1,280 kWh", "1,180 kWh", "70,400 kWh", "1,380 kWh"],
      correctAnswer: 0,
      explanation:
        "Consumption = final reading − initial reading = 35,840 − 34,560 = 1,280 kWh. Always subtract the earlier reading from the later one.",
    },
    {
      id: 6,
      question:
        "A line graph shows a circuit's voltage over 24 hours. The maximum voltage was 242 V (at 3 AM) and the minimum was 218 V (at 6 PM). What is the voltage variation?",
      options: ["24 V", "460 V", "230 V", "12 V"],
      correctAnswer: 0,
      explanation:
        "Voltage variation = maximum − minimum = 242 − 218 = 24 V. This exceeds the permitted +10%/−6% tolerance band (207 V to 253 V), so while within limits, the variation is significant.",
    },
    {
      id: 7,
      question:
        "Ten RCD trip time readings (in ms) are: 18, 22, 19, 21, 25, 20, 18, 23, 19, 20. What is the mode?",
      options: ["20 ms", "18 ms and 19 ms", "18 ms, 19 ms and 20 ms", "21 ms"],
      correctAnswer: 2,
      explanation:
        "Count each value: 18 appears twice, 19 appears twice, 20 appears twice, all others once. There are three modes (18, 19 and 20 ms) — this is called trimodal data.",
    },
    {
      id: 8,
      question:
        "A data table shows quarterly energy costs: Q1 £3,250, Q2 £2,980, Q3 £2,760, Q4 £3,410. What is the total annual energy cost and which quarter had the lowest spend?",
      options: [
        "£12,400 — Q3",
        "£12,400 — Q2",
        "£12,000 — Q3",
        "£12,400 — Q1",
      ],
      correctAnswer: 0,
      explanation:
        "Total = £3,250 + £2,980 + £2,760 + £3,410 = £12,400. The lowest quarterly spend was Q3 at £2,760 — likely due to longer daylight hours reducing lighting and heating demand.",
    },
  ];

  return (
    <div className="pb-24 bg-elec-dark min-h-screen">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-elec-dark/95 backdrop-blur-sm border-b border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3">
          <Link
            to="/study-centre/apprentice/functional-skills/module1"
            className="p-2 -ml-2 touch-manipulation"
          >
            <ArrowLeft className="w-5 h-5 text-white/60" />
          </Link>
          <div>
            <p className="text-[11px] font-semibold text-green-400 uppercase tracking-wider">
              Module 1 &bull; Section 4
            </p>
            <h1 className="text-base font-bold text-white">
              Data &amp; Statistics
            </h1>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-elec-dark via-neutral-900 to-elec-dark" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-green-600/10 via-transparent to-transparent" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="relative inline-flex mb-4">
              <div className="absolute inset-0 bg-green-500/30 rounded-2xl blur-xl animate-pulse" />
              <div className="relative p-4 rounded-2xl bg-gradient-to-br from-green-500 via-green-600 to-emerald-600 shadow-2xl shadow-green-500/25">
                <BarChart3 className="h-8 w-8 text-white" />
              </div>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
              Data &amp; Statistics
            </h2>
            <p className="text-sm text-white/50 max-w-lg mx-auto">
              Learn to collect, organise, interpret and present data
              &mdash; essential skills for electrical testing, energy
              monitoring, project reporting and quality assurance.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6 mt-6">
        {/* Section 01 — Bar Charts & Pictograms */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">
              01
            </span>
            <h3 className="text-lg font-bold text-white">
              Bar Charts &amp; Pictograms
            </h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              <strong className="text-white">Bar charts</strong> are one of
              the most common ways to display data visually. In electrical
              work, you will encounter them in energy audit reports, fault
              analysis summaries, and material usage tracking. A bar chart
              uses rectangular bars of different heights (or lengths) to
              represent values.
            </p>
            <p>
              <strong className="text-white">Key features of a bar chart:</strong>
            </p>
            <ul className="space-y-2 pl-1">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">Axes:</strong> The horizontal
                  axis (x-axis) shows the categories being compared (e.g.
                  days of the week, circuit numbers, fault types). The
                  vertical axis (y-axis) shows the measured quantity (e.g.
                  kWh, number of faults, cost in pounds).
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">Scale:</strong> The y-axis
                  must start at zero and use even intervals (e.g. 0, 10, 20,
                  30). If the scale does not start at zero, the chart can be
                  misleading.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">Labels:</strong> Both axes
                  must have clear labels including units. A title should
                  describe what the chart shows.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">Gaps:</strong> Standard bar
                  charts have gaps between bars (unlike histograms which have
                  no gaps). The gaps show that the categories are discrete.
                </span>
              </li>
            </ul>

            <p>
              <strong className="text-white">
                Example &mdash; Weekly energy consumption:
              </strong>{" "}
              A site energy audit records the following daily kWh usage:
              Monday 145, Tuesday 162, Wednesday 138, Thursday 170, Friday
              155, Saturday 85, Sunday 40. Plotting these as a bar chart
              immediately reveals that Thursday has the highest consumption
              and Sunday the lowest. The site manager can use this information
              to investigate why Thursday&apos;s usage was high (perhaps
              additional plant was running) and why weekend usage is lower.
            </p>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">
                Reading Bar Charts on Site
              </p>
              <p className="text-sm text-white/80">
                When reading a bar chart, always check the y-axis scale first.
                A chart showing energy use from 100 kWh to 110 kWh might look
                dramatically different from one showing 0 to 200 kWh, even
                though the actual variation is small. Misleading scales are a
                common trap in energy reports and marketing materials.
              </p>
            </div>

            <p>
              <strong className="text-white">Grouped bar charts</strong> show
              multiple data sets side by side. For example, comparing this
              year&apos;s energy consumption with last year&apos;s for each
              month. Each month has two bars (one for each year) in different
              colours. This makes trends and improvements easy to spot.
            </p>

            <p>
              <strong className="text-white">Pictograms</strong> use small
              pictures or symbols instead of bars. Each picture represents a
              fixed quantity (e.g. one lightbulb icon = 10 luminaires
              installed). While less precise than bar charts, pictograms are
              useful for quick visual communication in safety briefings and
              toolbox talks.
            </p>
          </div>
        </motion.div>

        {/* Section 02 — Pie Charts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">
              02
            </span>
            <h3 className="text-lg font-bold text-white">
              Pie Charts
            </h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              A <strong className="text-white">pie chart</strong> is a circle
              divided into segments (slices) that represent the proportion of
              each category to the whole. The entire circle represents 100%
              (or 360&deg;). Pie charts are best used when you want to show
              how a total is divided among a small number of categories.
            </p>

            <p>
              <strong className="text-white">
                Calculating pie chart angles:
              </strong>{" "}
              To convert a percentage to degrees, multiply by 3.6 (since
              360 &divide; 100 = 3.6). For example, if cable damage accounts
              for 35% of all faults: 35 &times; 3.6 = 126&deg; of the pie.
            </p>

            <p>
              <strong className="text-white">
                Example &mdash; Energy usage breakdown:
              </strong>{" "}
              A commercial building&apos;s energy audit shows the following
              breakdown: Lighting 40%, HVAC (heating, ventilation, air
              conditioning) 30%, IT equipment 15%, Other 15%.
            </p>
            <ul className="space-y-2 pl-1">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  Lighting: 40% &times; 3.6 = 144&deg;
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  HVAC: 30% &times; 3.6 = 108&deg;
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  IT: 15% &times; 3.6 = 54&deg;
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  Other: 15% &times; 3.6 = 54&deg;
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  Check: 144 + 108 + 54 + 54 = 360&deg; (correct)
                </span>
              </li>
            </ul>

            <p>
              This immediately shows that lighting is the biggest energy
              consumer, so upgrading to LED luminaires would deliver the
              greatest savings.
            </p>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">
                When to Use Pie Charts
              </p>
              <p className="text-sm text-white/80">
                Pie charts work best with 2&ndash;6 categories. With more
                than 6 slices, the chart becomes hard to read and a bar chart
                or table would be more appropriate. Also, pie charts can only
                show one data set at a time &mdash; you cannot compare two
                years on the same pie chart.
              </p>
            </div>

            <p>
              <strong className="text-white">
                Converting from pie chart to actual values:
              </strong>{" "}
              If the total annual energy bill is &pound;24,000 and the pie
              chart shows lighting at 40%, the lighting cost = 40% &times;
              &pound;24,000 = &pound;9,600. If an LED upgrade could reduce
              lighting energy by 60%, the saving = 60% &times; &pound;9,600 =
              &pound;5,760 per year. This kind of calculation is essential for
              preparing energy-saving proposals.
            </p>

            <p>
              <strong className="text-white">
                Fault type analysis:
              </strong>{" "}
              Health and safety teams often present accident data as pie
              charts. For electrical contractors, this might show: Slips/trips
              30%, Cable strikes 25%, Electric shock 15%, Falls from height
              15%, Other 15%. Understanding these proportions helps target
              safety training where it is most needed.
            </p>
          </div>
        </motion.div>

        {/* InlineCheck 1 — After Section 02 */}
        <InlineCheck
          id="fs-m1s4-check1"
          question="A pie chart shows that 45% of a building's energy is used for lighting. The total annual energy cost is £18,000. What is the lighting energy cost?"
          options={[
            "£4,500",
            "£8,100",
            "£9,000",
            "£810",
          ]}
          correctIndex={1}
          explanation="45% × £18,000 = 0.45 × £18,000 = £8,100. This figure helps justify investment in energy-efficient lighting upgrades."
        />

        {/* Section 03 — Line Graphs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">
              03
            </span>
            <h3 className="text-lg font-bold text-white">
              Line Graphs
            </h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              <strong className="text-white">Line graphs</strong> show how a
              quantity changes over time. Data points are plotted and
              connected with straight lines, revealing trends, patterns and
              anomalies. In electrical work, line graphs are widely used for
              voltage monitoring, current demand profiles and temperature
              logging.
            </p>

            <p>
              <strong className="text-white">Key features:</strong>
            </p>
            <ul className="space-y-2 pl-1">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">X-axis:</strong> Usually
                  represents time (hours, days, months).
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">Y-axis:</strong> The
                  measured quantity (voltage, current, temperature, energy).
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">Trend:</strong> An upward
                  slope means the quantity is increasing; a downward slope
                  means it is decreasing. A flat line means it is constant.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">Anomalies:</strong> Sudden
                  spikes or dips indicate unusual events that need
                  investigation.
                </span>
              </li>
            </ul>

            <p>
              <strong className="text-white">
                Example &mdash; 24-hour voltage profile:
              </strong>{" "}
              A power quality logger records the supply voltage every 15
              minutes over 24 hours. The line graph typically shows:
            </p>
            <ul className="space-y-2 pl-1">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">Night (midnight to 6 AM):</strong>{" "}
                  Voltage tends to be higher (235&ndash;245&thinsp;V) because
                  demand on the network is low.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">Morning peak (7&ndash;9 AM):</strong>{" "}
                  Voltage drops as domestic and commercial loads switch on
                  simultaneously.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">Evening peak (5&ndash;8 PM):</strong>{" "}
                  The lowest voltages (218&ndash;225&thinsp;V) often occur
                  during the evening cooking/heating peak.
                </span>
              </li>
            </ul>

            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-yellow-400 mb-1">
                    Reading Between Data Points
                  </p>
                  <p className="text-sm text-white/80">
                    Line graphs connect data points with straight lines, but
                    the actual value between two points may not follow a
                    straight path. This is called{" "}
                    <em>interpolation</em> and should be used with caution.
                    Only make predictions between measured points (never
                    beyond the data range) and note that the true curve may
                    differ from the straight line shown.
                  </p>
                </div>
              </div>
            </div>

            <p>
              <strong className="text-white">
                Multiple line graphs:
              </strong>{" "}
              You can plot several lines on the same graph to compare
              different data sets. For example, comparing energy consumption
              across three months (each as a separate coloured line) on the
              same time axis reveals seasonal trends and helps predict future
              demand.
            </p>

            <p>
              <strong className="text-white">
                Current demand profile:
              </strong>{" "}
              A current transformer logger records the maximum demand current
              over each 30-minute period. The resulting line graph shows the
              &ldquo;demand profile&rdquo; of the building. This is used to
              check whether the installed supply capacity is adequate and
              whether power factor correction is needed.
            </p>
          </div>
        </motion.div>

        {/* Section 04 — Tables & Tally Charts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">
              04
            </span>
            <h3 className="text-lg font-bold text-white">
              Tables &amp; Tally Charts
            </h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              Before data can be plotted on a chart, it must be organised.{" "}
              <strong className="text-white">Data tables</strong> and{" "}
              <strong className="text-white">tally charts</strong> are the
              foundation of data organisation. As an electrician, you will
              use tables constantly &mdash; test result schedules, material
              lists, cable sizing tables and BS 7671 reference tables.
            </p>

            <p>
              <strong className="text-white">
                The Schedule of Test Results:
              </strong>{" "}
              This is the most important data table an electrician produces.
              It records the results of every electrical test carried out
              during initial verification or periodic inspection. Columns
              include:
            </p>
            <ul className="space-y-2 pl-1">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  Circuit number and description
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  Type of wiring, reference method and cable size
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  Protective device type and rating
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  R1+R2, R2, Insulation Resistance, Zs, RCD trip time
                </span>
              </li>
            </ul>

            <p>
              <strong className="text-white">
                Tally charts:
              </strong>{" "}
              A tally chart is a quick method of recording data as it is
              collected. For each occurrence, you make a mark (&ldquo;tally
              mark&rdquo;). Every fifth mark is drawn across the previous
              four, making groups of five that are easy to count. This is
              useful during a site audit when counting the number of each
              type of accessory installed.
            </p>

            <p>
              <strong className="text-white">
                Example &mdash; Accessory audit tally:
              </strong>{" "}
              Walking through a floor of an office, you count: double sockets
              (|||| |||| |||| ||| = 18), single sockets (|||| || = 7),
              fused connection units (|||| = 5), data outlets (|||| |||| =
              10). Total accessories = 18 + 7 + 5 + 10 = 40.
            </p>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">
                BS 7671 Reference Tables
              </p>
              <p className="text-sm text-white/80">
                The Wiring Regulations contain hundreds of data tables.
                Learning to read them correctly is essential. Always check
                the table heading, column headers and any footnotes. For
                example, Table 4D5A gives current ratings for flat twin &amp;
                earth cables but the values depend on the installation
                method &mdash; reading the wrong column could lead to an
                undersized cable.
              </p>
            </div>

            <p>
              <strong className="text-white">
                Frequency tables:
              </strong>{" "}
              A frequency table groups data into classes and records how
              many values fall into each class. For example, grouping 100
              insulation resistance readings into ranges: 0&ndash;99
              M&Omega; (3 readings), 100&ndash;199 M&Omega; (12),
              200&ndash;299 M&Omega; (35), 300&ndash;399 M&Omega; (38),
              400+ M&Omega; (12). This shows that most readings fall in the
              200&ndash;399 M&Omega; range &mdash; a healthy installation.
            </p>
          </div>
        </motion.div>

        {/* InlineCheck 2 — After Section 04 */}
        <InlineCheck
          id="fs-m1s4-check2"
          question="During a site audit, you tally the following accessories: 24 double sockets, 8 single sockets, 6 fused spurs and 12 light switches. What is the total number of accessories?"
          options={[
            "40",
            "44",
            "50",
            "48",
          ]}
          correctIndex={2}
          explanation="Total = 24 + 8 + 6 + 12 = 50 accessories. A tally chart makes counting on site quick and accurate, reducing the chance of miscounting."
        />

        {/* Section 05 — Mean, Median & Mode */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">
              05
            </span>
            <h3 className="text-lg font-bold text-white">
              Mean, Median &amp; Mode
            </h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              The three <strong className="text-white">measures of central tendency</strong>{" "}
              describe the &ldquo;typical&rdquo; or &ldquo;average&rdquo;
              value in a data set. Each has different strengths:
            </p>
            <ul className="space-y-2 pl-1">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">Mean</strong> (arithmetic
                  average): Add up all the values and divide by the count.
                  The mean uses every value in the data set, so it is affected
                  by extreme values (outliers).
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">Median</strong> (middle
                  value): Arrange all values in order and find the middle
                  one. If there is an even number of values, the median is
                  the mean of the two middle values. The median is not
                  affected by outliers.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">Mode</strong> (most frequent
                  value): The value that appears most often. There can be
                  more than one mode (bimodal, trimodal) or no mode if all
                  values are different.
                </span>
              </li>
            </ul>

            <p>
              <strong className="text-white">
                Example &mdash; R1+R2 test results:
              </strong>{" "}
              Six circuits on the same ring have R1+R2 readings of: 0.32,
              0.35, 0.33, 0.31, 0.98, 0.34 &Omega;.
            </p>
            <ul className="space-y-2 pl-1">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">Mean:</strong> (0.32 + 0.35
                  + 0.33 + 0.31 + 0.98 + 0.34) &divide; 6 = 2.63 &divide; 6
                  = 0.44&thinsp;&Omega;. The outlier (0.98) has pulled the
                  mean upward significantly.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">Median:</strong> Ordered:
                  0.31, 0.32, 0.33, 0.34, 0.35, 0.98. Middle two values =
                  0.33 and 0.34. Median = (0.33 + 0.34) &divide; 2 =
                  0.335&thinsp;&Omega;. This better represents the
                  &ldquo;typical&rdquo; reading.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">Mode:</strong> No value
                  repeats, so there is no mode for this data set.
                </span>
              </li>
            </ul>

            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-yellow-400 mb-1">
                    Spotting Outliers
                  </p>
                  <p className="text-sm text-white/80">
                    The reading of 0.98&thinsp;&Omega; is significantly higher
                    than the others. This is an <em>outlier</em> and
                    suggests a possible fault &mdash; perhaps a loose
                    connection, high-resistance joint or incorrect conductor
                    cross-section on that circuit. When you spot an outlier
                    in test results, always investigate the cause rather than
                    simply averaging it away.
                  </p>
                </div>
              </div>
            </div>

            <p>
              <strong className="text-white">
                Which average to use?
              </strong>{" "}
              Use the <strong className="text-white">mean</strong> when the
              data is evenly spread with no extreme values. Use the{" "}
              <strong className="text-white">median</strong> when outliers are
              present (it gives a more representative middle ground). Use the{" "}
              <strong className="text-white">mode</strong> when you need to
              know the most common value &mdash; for example, the most
              frequently specified cable size on a project.
            </p>
          </div>
        </motion.div>

        {/* Section 06 — Range & Spread */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">
              06
            </span>
            <h3 className="text-lg font-bold text-white">
              Range &amp; Spread
            </h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              While averages tell you about the centre of your data, the{" "}
              <strong className="text-white">range</strong> tells you about
              how spread out it is. The range is simply the difference
              between the highest and lowest values:
            </p>
            <p className="text-center text-lg font-bold text-green-400 py-2">
              Range = Maximum &minus; Minimum
            </p>

            <p>
              <strong className="text-white">
                Example &mdash; Voltage variation:
              </strong>{" "}
              You monitor the supply voltage over a week and record:
              Maximum = 248&thinsp;V, Minimum = 221&thinsp;V. Range = 248
              &minus; 221 = 27&thinsp;V. The nominal voltage is 230&thinsp;V
              with a tolerance of +10% (253&thinsp;V) / &minus;6%
              (216.2&thinsp;V). Both readings are within tolerance, but the
              27&thinsp;V range suggests significant variation that could
              affect sensitive equipment.
            </p>

            <p>
              <strong className="text-white">
                Why range matters in testing:
              </strong>
            </p>
            <ul className="space-y-2 pl-1">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">
                    Consistent test results:
                  </strong>{" "}
                  If you test 10 circuits on a distribution board and the
                  R1+R2 values range from 0.30&thinsp;&Omega; to
                  0.35&thinsp;&Omega; (range = 0.05&thinsp;&Omega;), the
                  installation is consistent and well-constructed.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">
                    Inconsistent results:
                  </strong>{" "}
                  If the range is 0.30&thinsp;&Omega; to 1.20&thinsp;&Omega;
                  (range = 0.90&thinsp;&Omega;), some circuits have
                  significantly higher resistance and need investigation.
                </span>
              </li>
            </ul>

            <p>
              <strong className="text-white">
                Limitations of range:
              </strong>{" "}
              The range only uses two values (the extremes), so it can be
              misleading if there is a single outlier. If 99 out of 100
              readings are between 0.30 and 0.35&thinsp;&Omega; but one is
              0.98&thinsp;&Omega;, the range would be 0.68&thinsp;&Omega;
              &mdash; giving the impression of much more spread than actually
              exists.
            </p>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">
                Interquartile Range (IQR)
              </p>
              <p className="text-sm text-white/80">
                A more robust measure of spread is the{" "}
                <strong className="text-white">interquartile range</strong>{" "}
                (IQR), which ignores the top and bottom 25% of values.
                Arrange all values in order. Q1 is the median of the lower
                half, Q3 is the median of the upper half. IQR = Q3 &minus;
                Q1. This is less affected by outliers and gives a better
                picture of the typical spread.
              </p>
            </div>

            <p>
              <strong className="text-white">
                Comparing data sets using range:
              </strong>{" "}
              If Building A has energy consumption ranging from 120 to 180
              kWh/day (range = 60) and Building B ranges from 140 to 160
              kWh/day (range = 20), Building B has more consistent energy use.
              Building A&apos;s wider range suggests variable occupancy or
              poorly controlled systems.
            </p>

            <p>
              <strong className="text-white">
                Standard deviation:
              </strong>{" "}
              While beyond the scope of this course, you may encounter
              standard deviation in technical reports. It measures the
              average distance of each data point from the mean. A small
              standard deviation means values are clustered tightly around
              the mean; a large standard deviation means they are widely
              spread. Software tools calculate this automatically.
            </p>
          </div>
        </motion.div>

        {/* InlineCheck 3 — After Section 06 */}
        <InlineCheck
          id="fs-m1s4-check3"
          question="Eight Zs readings (in Ω) are: 0.85, 0.92, 0.88, 0.90, 0.87, 0.91, 0.86, 0.89. What is the range?"
          options={[
            "0.92 Ω",
            "0.85 Ω",
            "0.07 Ω",
            "0.89 Ω",
          ]}
          correctIndex={2}
          explanation="Range = Maximum − Minimum = 0.92 − 0.85 = 0.07 Ω. This small range indicates consistent test results across the circuits — a sign of good workmanship."
        />

        {/* Section 07 — Interpreting Test Results */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">
              07
            </span>
            <h3 className="text-lg font-bold text-white">
              Interpreting Test Results
            </h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              Electrical testing generates large amounts of numerical data.
              Being able to interpret this data &mdash; spotting trends,
              identifying failures and comparing against acceptance criteria
              &mdash; is an essential skill for producing accurate test
              certificates and identifying potential hazards.
            </p>

            <p>
              <strong className="text-white">
                Insulation resistance results:
              </strong>{" "}
              BS 7671 requires a minimum insulation resistance of
              1&thinsp;M&Omega; for most circuits (tested at 500&thinsp;V
              d.c.). In practice, healthy circuits typically read
              200&thinsp;M&Omega; or more. If you see a pattern of
              declining insulation resistance values over successive periodic
              inspections (e.g. 350, 250, 180, 90 M&Omega;), this trend
              indicates deteriorating insulation that will eventually fail.
            </p>

            <p>
              <strong className="text-white">
                Earth fault loop impedance (Zs):
              </strong>{" "}
              Compare each measured Zs value against the maximum permitted
              value from BS 7671 Table 41.3 (for Type B MCBs) or Table 41.4
              (for Type C MCBs). For a 32&thinsp;A Type B MCB, maximum Zs =
              1.37&thinsp;&Omega;. If your reading is 1.35&thinsp;&Omega;,
              it technically passes but leaves very little margin. Factor in
              instrument accuracy (&plusmn;2% typically) and temperature
              variation to decide if the result is truly compliant.
            </p>

            <ul className="space-y-2 pl-1">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">Rule of thumb:</strong> Many
                  electricians apply an 80% rule &mdash; the measured Zs
                  should not exceed 80% of the maximum permitted value. For
                  a 32&thinsp;A Type B MCB: 1.37 &times; 0.80 =
                  1.10&thinsp;&Omega;. If your reading exceeds 1.10, it may
                  fail under worst-case conditions.
                </span>
              </li>
            </ul>

            <p>
              <strong className="text-white">
                RCD trip time analysis:
              </strong>{" "}
              A 30&thinsp;mA RCD must trip within 300&thinsp;ms at its rated
              residual current (I&Delta;n) and within 40&thinsp;ms at
              5 &times; I&Delta;n (150&thinsp;mA). Record the actual trip
              times and check they meet the requirements. If an RCD
              consistently trips at 280&thinsp;ms (close to the 300&thinsp;ms
              limit), it may fail under slightly different conditions.
            </p>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">
                Trend Analysis Over Time
              </p>
              <p className="text-sm text-white/80">
                By comparing test results from different inspection years, you
                can spot degradation trends. If a circuit&apos;s Zs was
                0.85&thinsp;&Omega; five years ago, 0.95&thinsp;&Omega; three
                years ago, and 1.10&thinsp;&Omega; now, the increasing trend
                suggests deteriorating connections or corroding conductors.
                Plot these on a line graph to make the trend visible to the
                client.
              </p>
            </div>

            <p>
              <strong className="text-white">
                Presenting results to clients:
              </strong>{" "}
              When discussing test results with building managers or
              homeowners, use simple language and visual aids. A table of
              numbers means little to a non-technical person, but a bar chart
              showing &ldquo;circuits that pass&rdquo; vs &ldquo;circuits
              that need attention&rdquo; communicates the message clearly.
            </p>
          </div>
        </motion.div>

        {/* Section 08 — Presenting Data Effectively */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">
              08
            </span>
            <h3 className="text-lg font-bold text-white">
              Presenting Data Effectively
            </h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              Collecting and analysing data is only useful if you can
              communicate your findings clearly. Whether you are writing a
              condition report, preparing an energy audit proposal or
              delivering a toolbox talk, presenting data effectively makes
              your work more professional and impactful.
            </p>

            <p>
              <strong className="text-white">
                Choosing the right chart type:
              </strong>
            </p>
            <ul className="space-y-2 pl-1">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">Bar chart:</strong> Comparing
                  discrete categories (circuit faults by type, energy use by
                  day, materials by cost).
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">Pie chart:</strong> Showing
                  parts of a whole (energy breakdown by end use, fault causes
                  as percentages).
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">Line graph:</strong> Showing
                  trends over time (voltage profile, energy consumption over
                  months, insulation resistance over years).
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">Table:</strong> When exact
                  values are needed (test results, material quantities, cable
                  sizing data).
                </span>
              </li>
            </ul>

            <p>
              <strong className="text-white">
                Best practices for presenting data:
              </strong>
            </p>
            <ul className="space-y-2 pl-1">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">Title:</strong> Every chart
                  or table must have a clear, descriptive title.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">Labels:</strong> Axes,
                  columns and rows must be clearly labelled with units.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">Scale:</strong> Start the
                  y-axis at zero unless there is a good reason not to. State
                  the scale clearly.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">Source:</strong> State where
                  the data came from (e.g. &ldquo;energy data from smart
                  meter readings, January&ndash;December 2025&rdquo;).
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  <strong className="text-white">Key/legend:</strong> If using
                  colours or patterns, include a key explaining what each
                  represents.
                </span>
              </li>
            </ul>

            <p>
              <strong className="text-white">
                Example &mdash; Energy audit report:
              </strong>{" "}
              You have been asked to prepare a summary of energy use for a
              small commercial building. Your report could include:
            </p>
            <ul className="space-y-2 pl-1">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  A <strong className="text-white">table</strong> showing
                  monthly kWh consumption and cost for the past 12 months.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  A <strong className="text-white">line graph</strong>{" "}
                  plotting monthly kWh over the year, clearly showing
                  seasonal peaks.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  A <strong className="text-white">pie chart</strong>{" "}
                  breaking down energy use by end use (lighting, HVAC, power).
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  A <strong className="text-white">bar chart</strong>{" "}
                  comparing this year&apos;s usage with last year&apos;s by
                  quarter.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">&bull;</span>
                <span>
                  A <strong className="text-white">summary paragraph</strong>{" "}
                  stating the mean monthly consumption, the range, the total
                  annual cost and recommendations.
                </span>
              </li>
            </ul>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">
                Key Takeaway
              </p>
              <p className="text-sm text-white/80">
                Data skills are not just for the exam &mdash; they are
                everyday professional competencies. Whether you are filling
                in a Schedule of Test Results, preparing an energy saving
                proposal, or explaining test findings to a client,
                understanding how to collect, organise, analyse and present
                data will set you apart as a thorough, professional
                electrician. Always choose the chart type that best
                communicates your message, label everything clearly, and
                double-check your calculations.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Quiz */}
        <Quiz
          questions={quizQuestions}
          title="Data & Statistics Quiz"
        />

        {/* Navigation Footer */}
        <div className="flex items-center justify-between pt-6 border-t border-white/10">
          <Link
            to="/study-centre/apprentice/functional-skills/module1/section3"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 transition-colors touch-manipulation"
          >
            <ArrowLeft className="w-4 h-4" />
            Algebra &amp; Formulae
          </Link>
          <Link
            to="/study-centre/apprentice/functional-skills/module2"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white bg-green-500 hover:bg-green-600 transition-colors touch-manipulation shadow-lg shadow-green-500/25"
          >
            Module 2
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FunctionalSkillsModule1Section4;
