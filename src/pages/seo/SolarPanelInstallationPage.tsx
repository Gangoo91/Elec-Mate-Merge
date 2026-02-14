import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  Sun,
  Zap,
  ShieldCheck,
  PoundSterling,
  Calculator,
  FileText,
  AlertTriangle,
  CheckCircle2,
  Cable,
  Activity,
  Brain,
} from 'lucide-react';

export default function SolarPanelInstallationPage() {
  return (
    <GuideTemplate
      title="Solar Panel Installation UK 2026 | Guide & Requirements"
      description="Complete UK guide to domestic solar panel installation. MCS certification, DNO notification (G98/G99), Part P, earthing considerations, inverter types, battery storage, Smart Export Guarantee, costs, payback period, and certificates required."
      datePublished="2025-06-15"
      dateModified="2026-02-14"
      breadcrumbs={[
        { label: 'Guides', href: '/guides' },
        { label: 'Solar Panel Installation', href: '/guides/solar-panel-installation' },
      ]}
      tocItems={[
        { id: 'overview', label: 'Solar PV Overview' },
        { id: 'mcs-certification', label: 'MCS Certification' },
        { id: 'dno-notification', label: 'DNO Notification (G98/G99)' },
        { id: 'part-p-notification', label: 'Part P Notification' },
        { id: 'earthing', label: 'Earthing Considerations' },
        { id: 'inverter-types', label: 'Inverter Types' },
        { id: 'battery-storage', label: 'Battery Storage' },
        { id: 'seg', label: 'Smart Export Guarantee' },
        { id: 'installation-process', label: 'Installation Process' },
        { id: 'certificates', label: 'Certificates Required' },
        { id: 'cost-payback', label: 'Cost & Payback Period' },
        { id: 'how-to', label: 'Step-by-Step Guide' },
        { id: 'faq', label: 'FAQs' },
        { id: 'related', label: 'Related Guides' },
      ]}
      badge="High Value Guide"
      badgeIcon={Sun}
      heroTitle={
        <>
          Solar Panel Installation UK
          <br />
          <span className="text-yellow-400">Guide, Requirements & Costs 2026</span>
        </>
      }
      heroSubtitle="Solar PV is one of the fastest-growing areas of domestic electrical work in the UK. This guide covers everything an electrician needs to know — system sizing, MCS certification, DNO notification, earthing considerations, inverter selection, battery storage, costs, and the certificates required to commission a compliant installation."
      readingTime={20}
      keyTakeaways={[
        'A typical domestic solar PV system is 3-4 kW (8-10 panels), costs £5,000-£8,000 installed, and pays back in 6-10 years through electricity savings and Smart Export Guarantee payments.',
        'MCS certification is essential — without it the homeowner cannot receive Smart Export Guarantee payments, which can amount to several thousand pounds over the system lifetime.',
        'DNO notification is mandatory: G98 (simple notification) for systems up to 3.68 kW single-phase, G99 (formal application) for larger systems.',
        'On PME (TN-C-S) earthing systems, the PV array frame must not be connected to the PME earth — a separate earth electrode or double-insulated equipment is required (BS 7671 Section 712).',
        'Two certificates are required for a domestic solar PV installation: an MCS certificate (covering the renewable energy system) and an Electrical Installation Certificate (EIC) to BS 7671 covering the AC and DC wiring.',
      ]}
      sections={[
        {
          id: 'overview',
          heading: 'Domestic Solar PV — Overview',
          content: (
            <>
              <p>
                A domestic solar photovoltaic (PV) system converts sunlight into electricity using
                semiconductor panels mounted on the roof. The typical UK domestic system is between
                3 kW and 4 kW, consisting of 8 to 10 panels each rated at approximately 400-450 W. A
                south-facing roof at a pitch of 30-40 degrees provides the best energy yield,
                although east-west split arrays are increasingly common and can provide a more even
                generation profile throughout the day.
              </p>
              <p>
                The PV panels generate direct current (DC) electricity, which is converted to
                alternating current (AC) by an inverter. The AC output is connected to the
                property's consumer unit, where it supplies the household loads. Any surplus
                electricity not used by the household is exported to the grid. The system operates
                automatically — generating electricity whenever there is sufficient daylight — and
                requires minimal maintenance beyond occasional panel cleaning and periodic inverter
                checks.
              </p>
              <p>
                For electricians, solar PV installation involves both DC and AC electrical work,
                structural assessment of the roof, compliance with MCS standards, DNO notification,
                and Part P building regulations notification. It is a skilled job that requires
                specific training and, for SEG eligibility, MCS installer certification.
              </p>
            </>
          ),
        },
        {
          id: 'mcs-certification',
          heading: 'MCS Certification Requirements',
          content: (
            <>
              <p>
                The Microgeneration Certification Scheme (MCS) is the quality assurance framework
                for small-scale renewable energy installations in the UK. MCS certification covers
                both the products (panels and inverters must be MCS-listed) and the installers (who
                must be MCS-certified). An MCS-certified installation is eligible for payments under
                the Smart Export Guarantee (SEG), the scheme that pays generators for electricity
                exported to the grid.
              </p>
              <p>
                To become an MCS-certified installer, you must hold a relevant qualification —
                typically the City and Guilds 2399 (Design and Installation of Solar Photovoltaic
                Systems) or equivalent. You must also be registered with a Competent Person Scheme
                for Part P notification, carry adequate public liability insurance, and meet the MCS
                quality management requirements, including documented procedures for system design,
                installation, commissioning, and handover.
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
                <h3 className="font-bold text-white text-lg mb-4">MCS Certification Checklist</h3>
                <ul className="space-y-3 text-white">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Product certification</strong> — All
                      panels and inverters must be MCS-listed products. Check the MCS product
                      directory before specifying equipment.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Installer certification</strong> — The
                      installing company must hold a current MCS certificate for PV installations.
                      Individual operatives must be qualified and competent.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Performance estimate</strong> — An
                      MCS-compliant performance estimate (predicted annual generation in kWh) must
                      be provided to the customer before installation.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Commissioning documentation</strong> —
                      Full commissioning records including test results, system specification,
                      photographs, and the MCS installation certificate.
                    </span>
                  </li>
                </ul>
              </div>
              <p>
                Without MCS certification, the homeowner cannot register the installation for{' '}
                <SEOInternalLink href="/guides/solar-panel-installation#seg">
                  Smart Export Guarantee
                </SEOInternalLink>{' '}
                payments. This is a significant financial consideration — over a 25-year system
                lifetime, SEG payments can amount to several thousand pounds. MCS certification also
                provides consumer protection through the MCS Consumer Code.
              </p>
            </>
          ),
        },
        {
          id: 'dno-notification',
          heading: 'DNO Notification — G98 and G99',
          content: (
            <>
              <p>
                Any electricity-generating installation connected to the public distribution network
                must comply with the relevant Engineering Recommendation published by the Energy
                Networks Association (ENA). For domestic solar PV, this means either G98 or G99,
                depending on the rated output of the system.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 my-6">
                <div className="p-5 rounded-2xl bg-yellow-500/5 border border-yellow-500/20">
                  <h3 className="font-bold text-yellow-400 text-lg mb-3">
                    G98 (Up to 3.68 kW Single Phase)
                  </h3>
                  <p className="text-white text-sm leading-relaxed mb-3">
                    G98 (formerly G83) applies to installations with a rated output up to 16A per
                    phase — approximately 3.68 kW on a single-phase supply. G98 uses a simplified
                    notification process: you notify the Distribution Network Operator (DNO) within
                    28 days of commissioning using the standard G98 form, and connection is
                    permitted automatically provided the installation meets the technical
                    requirements.
                  </p>
                  <p className="text-white text-sm leading-relaxed">
                    No prior approval is needed. The majority of domestic PV installations fall
                    within the G98 threshold.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <h3 className="font-bold text-white text-lg mb-3">
                    G99 (Above 3.68 kW Single Phase)
                  </h3>
                  <p className="text-white text-sm leading-relaxed mb-3">
                    G99 (formerly G59) applies to installations exceeding the G98 threshold. This
                    requires a formal application to the DNO before installation begins. The DNO
                    carries out a network impact assessment to determine whether the local network
                    can accommodate the generation.
                  </p>
                  <p className="text-white text-sm leading-relaxed">
                    The DNO may approve the connection as applied for, approve it with conditions
                    (such as export limitation), or require network reinforcement. G99 applications
                    can take 4-12 weeks.
                  </p>
                </div>
              </div>
              <p>
                For three-phase installations, the G98 limit is approximately 11.04 kW (3.68 kW per
                phase). Systems above this require a G99 application regardless of the number of
                phases.
              </p>
            </>
          ),
        },
        {
          id: 'part-p-notification',
          heading: 'Part P Building Regulations Notification',
          content: (
            <>
              <p>
                Installing a solar PV system involves adding new electrical circuits to the
                property, which is notifiable work under{' '}
                <SEOInternalLink href="/guides/part-p-building-regulations">
                  Part P of the Building Regulations
                </SEOInternalLink>
                . The work must be either self-certified through a Competent Person Scheme (such as
                NICEIC, NAPIT, or ELECSA) or notified to the local authority building control
                department before work commences.
              </p>
              <p>
                Most MCS-certified installers are registered with a Competent Person Scheme,
                allowing them to self-certify the electrical work. A full Electrical Installation
                Certificate (EIC) is required for the new circuits — both the DC side (panels to
                inverter) and the AC side (inverter to consumer unit). A Minor Works Certificate is
                not appropriate because the work involves new circuits.
              </p>
              <p>
                In addition to the electrical notification, the structural aspects of the
                installation may require consideration under the Building Regulations. In most
                cases, solar PV installations on existing domestic roofs are permitted development
                and do not require planning permission, provided the panels do not protrude more
                than 200mm from the roof surface and do not extend above the highest part of the
                roof. However, listed buildings, conservation areas, and certain other designations
                may require planning consent.
              </p>
            </>
          ),
        },
        {
          id: 'earthing',
          heading: 'Earthing Considerations — PME vs TT',
          content: (
            <>
              <p>
                The earthing arrangement of the property is a critical consideration for solar PV
                installations. The majority of UK domestic properties have a TN-C-S (PME) earthing
                system, which creates specific safety considerations for PV arrays.
              </p>
              <p>
                On a PME supply, the combined neutral-earth (PEN) conductor means that if an open
                PEN fault occurs, dangerous voltages can appear on the PME earth terminal. Because
                the PV array frame is typically mounted on the roof and connected via metallic
                mounting rails, any fault on the PME earth could energise the entire array frame
                structure — creating a hazard for anyone on the roof or in contact with the array.
              </p>
              <div className="rounded-2xl bg-orange-500/10 border border-orange-500/20 p-5 my-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-white mb-2">
                      PME Earthing — Critical Safety Point
                    </h4>
                    <p className="text-white text-sm leading-relaxed">
                      On PME (TN-C-S) supplies, BS 7671 Section 712 requires that the PV array frame
                      must not be connected to the PME earth. Options include: installing a separate
                      TT earth electrode for the array frame, using Class II (double-insulated)
                      equipment throughout the DC side so that no earthing of the array frame is
                      required, or a combination of both approaches. The chosen method must be
                      documented on the Electrical Installation Certificate.
                    </p>
                  </div>
                </div>
              </div>
              <p>
                For properties with a TN-S earthing system (earth provided by the cable sheath), the
                open PEN risk does not apply, and the array frame can be earthed to the main
                earthing terminal in the normal way. For properties with an existing TT earthing
                system, the earth electrode arrangements must be checked for adequacy.
              </p>
              <p>
                Always verify the{' '}
                <SEOInternalLink href="/guides/earthing-arrangements">
                  earthing arrangement
                </SEOInternalLink>{' '}
                by inspecting the supply and measuring Ze before designing the PV installation
                earthing scheme.
              </p>
              <SEOAppBridge
                title="Cable Sizing Calculator for Solar PV"
                description="Elec-Mate's cable sizing calculator handles both DC and AC sides of a solar PV installation. Enter the string voltage, current, and cable run length — the calculator applies the correct derating factors, checks voltage drop, and recommends the right cable size for both sides of the system."
                icon={Calculator}
              />
            </>
          ),
        },
        {
          id: 'inverter-types',
          heading: 'Inverter Types — String vs Micro',
          content: (
            <>
              <p>
                The inverter converts DC electricity from the PV panels into AC electricity
                compatible with the household supply and the grid. There are two main types of
                inverter used in domestic installations, each with distinct advantages and
                implications for the electrical design.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 my-6">
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <h3 className="font-bold text-white text-lg mb-3">String Inverter</h3>
                  <p className="text-white text-sm leading-relaxed mb-3">
                    A string inverter is a single central unit, typically mounted near the consumer
                    unit or in a garage. All PV panels are connected in series (a "string") and
                    their combined DC output feeds into the inverter. This is the traditional and
                    most cost-effective approach for simple roof layouts.
                  </p>
                  <p className="text-white text-sm leading-relaxed">
                    <strong className="text-white">Advantages:</strong> Lower cost per kW, simpler
                    wiring, easier access for maintenance.{' '}
                    <strong className="text-white">Disadvantages:</strong> If one panel is shaded,
                    the output of the entire string is reduced. Not suitable for complex roof
                    layouts with multiple orientations. Single point of failure.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-yellow-500/5 border border-yellow-500/20">
                  <h3 className="font-bold text-yellow-400 text-lg mb-3">Microinverters</h3>
                  <p className="text-white text-sm leading-relaxed mb-3">
                    Microinverters are small inverters mounted on the back of each individual panel.
                    Each panel operates independently, converting DC to AC at the panel level. The
                    AC output from all microinverters is then combined and fed to the consumer unit.
                  </p>
                  <p className="text-white text-sm leading-relaxed">
                    <strong className="text-white">Advantages:</strong> Panel-level optimisation
                    means shading on one panel does not affect others. Ideal for complex roofs with
                    multiple orientations or partial shading. No high-voltage DC cabling in the
                    property. <strong className="text-white">Disadvantages:</strong> Higher cost per
                    kW, more components on the roof, maintenance requires roof access.
                  </p>
                </div>
              </div>
              <p>
                A third option is power optimisers combined with a string inverter. Optimisers are
                fitted to each panel (like microinverters) but handle only DC-DC conversion and
                panel-level optimisation. The DC output still feeds into a central string inverter
                for DC-AC conversion. This provides many of the benefits of microinverters with a
                central inverter for easier maintenance and monitoring.
              </p>
              <SEOAppBridge
                title="AI Circuit Designer for Solar PV Systems"
                description="Elec-Mate's AI Circuit Designer helps you plan the complete electrical design for a solar PV installation — string configuration, inverter selection, cable sizing for both DC and AC sides, protection coordination, and earthing arrangements. Get a professional design in minutes."
                icon={Brain}
              />
            </>
          ),
        },
        {
          id: 'battery-storage',
          heading: 'Battery Storage',
          content: (
            <>
              <p>
                Battery storage systems allow homeowners to store surplus solar electricity
                generated during the day for use in the evening and at night. A typical domestic
                battery stores 5-13 kWh of energy and costs £2,500-£6,000 installed. The addition of
                battery storage significantly increases the self-consumption ratio — the proportion
                of generated electricity used on site rather than exported — from typically 30-50%
                (without a battery) to 70-90% (with a battery).
              </p>
              <p>
                For electricians, battery storage adds complexity to the installation. The battery
                system connects between the inverter and the consumer unit (AC-coupled) or between
                the PV array and the inverter (DC-coupled). Hybrid inverters that handle both PV
                input and battery charging/discharging are increasingly popular and simplify the
                wiring.
              </p>
              <p>
                BS 7671:2018+A3:2024 Regulation 530.3.201 is particularly relevant to battery
                storage installations. Because a battery can supply fault current back through the
                consumer unit (bidirectional current flow), the protective devices must be suitable
                for operation in both directions. Standard unidirectional MCBs and RCBOs may not
                clear faults correctly when current flows in the reverse direction. Always check
                with the device manufacturer and the battery system designer that the protective
                devices are rated for bidirectional fault current.
              </p>
              <p>
                Battery storage installations are notifiable under Part P and require appropriate
                certification. The{' '}
                <SEOInternalLink href="/guides/consumer-unit-regulations">
                  consumer unit regulations
                </SEOInternalLink>{' '}
                apply in full, including the Amendment 3 requirements for bidirectional devices.
              </p>
            </>
          ),
        },
        {
          id: 'seg',
          heading: 'Smart Export Guarantee (SEG)',
          content: (
            <>
              <p>
                The Smart Export Guarantee (SEG) replaced the Feed-in Tariff (FiT) in January 2020
                as the mechanism for paying domestic generators for electricity exported to the
                grid. Under the SEG, licensed electricity suppliers with more than 150,000 customers
                must offer at least one SEG tariff that pays a positive rate for exported
                electricity.
              </p>
              <p>
                SEG tariff rates vary between suppliers and change regularly, but as of 2026,
                typical rates range from 4p to 15p per kWh exported, depending on the supplier and
                the tariff structure. Some suppliers offer fixed rates, while others offer variable
                rates that track wholesale electricity prices — these can be significantly higher
                during peak demand periods.
              </p>
              <p>
                To register for the SEG, the installation must be MCS-certified and have a
                generation capacity up to 5 MW (for solar PV, practically all domestic installations
                qualify). A smart meter or export meter is required to measure the electricity
                exported. The homeowner applies to their chosen electricity supplier for a SEG
                tariff — they do not have to use the same supplier for their import tariff.
              </p>
              <p>
                For a typical 4 kW domestic system generating approximately 3,400-3,800 kWh per year
                and exporting approximately 50% (1,700-1,900 kWh), the annual SEG income at current
                rates is approximately £100-£200. Over a 25-year system lifetime, this amounts to
                £2,500-£5,000 — a meaningful contribution to the payback calculation.
              </p>
            </>
          ),
        },
        {
          id: 'installation-process',
          heading: 'Installation Process — Roof Assessment to Commissioning',
          content: (
            <>
              <p>
                A domestic solar PV installation follows a structured process from the initial site
                survey through to commissioning and handover. Each stage involves specific technical
                considerations and documentation requirements.
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
                <h3 className="font-bold text-white text-lg mb-4">Roof Assessment Checklist</h3>
                <ul className="space-y-3 text-white">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Structural suitability</strong> — The roof
                      must be able to support the additional weight of the panels and mounting
                      system (typically 12-15 kg per panel). Most modern roofs can handle this, but
                      older properties or lightweight roof structures may need a structural
                      engineer's assessment.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Orientation and pitch</strong> —
                      South-facing at 30-40 degrees is optimal, but east-west splits and pitches
                      from 15-50 degrees are all viable. North-facing roofs are generally not
                      suitable.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Shading</strong> — Trees, chimneys,
                      neighbouring buildings, and dormer windows can all cause shading. Even partial
                      shading on one panel can significantly reduce string output (unless
                      microinverters or optimisers are used).
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Available area</strong> — Each panel
                      occupies approximately 1.7-2.0 m². A 4 kW system (10 panels) requires
                      approximately 17-20 m² of unobstructed roof area.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Cable route</strong> — Plan the route for
                      DC cables from the roof to the inverter location. Cables must be UV-resistant
                      where exposed, protected from mechanical damage, and routed to minimise length
                      and voltage drop.
                    </span>
                  </li>
                </ul>
              </div>
              <p>
                Commissioning involves testing both the DC and AC sides of the installation. DC
                tests include open-circuit voltage (Voc) and short-circuit current (Isc) for each
                string, insulation resistance, earth continuity, and polarity. AC tests follow the
                standard BS 7671 requirements — earth fault loop impedance, prospective fault
                current, RCD operating times, insulation resistance, and continuity.
              </p>
            </>
          ),
        },
        {
          id: 'certificates',
          heading: 'Certificates Required',
          content: (
            <>
              <p>
                A domestic solar PV installation requires several pieces of documentation to be
                fully compliant:
              </p>
              <div className="grid sm:grid-cols-2 gap-4 my-6">
                <div className="p-5 rounded-2xl bg-yellow-500/5 border border-yellow-500/20">
                  <h3 className="font-bold text-yellow-400 text-lg mb-3">MCS Certificate</h3>
                  <p className="text-white text-sm leading-relaxed">
                    Issued by the MCS-certified installer upon completion. Documents the system
                    specification, performance estimate, and confirms compliance with MCS standards.
                    Required for SEG registration. Uploaded to the MCS database along with
                    commissioning photographs and the performance estimate.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-yellow-500/5 border border-yellow-500/20">
                  <h3 className="font-bold text-yellow-400 text-lg mb-3">
                    Electrical Installation Certificate (EIC)
                  </h3>
                  <p className="text-white text-sm leading-relaxed">
                    Required under BS 7671 for the new electrical circuits. Covers both the DC side
                    (panels to inverter) and the AC side (inverter to consumer unit). Must include
                    full test results, system design details, and confirmation of compliance with
                    Section 712 requirements.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <h3 className="font-bold text-white text-lg mb-3">G98/G99 Notification</h3>
                  <p className="text-white text-sm leading-relaxed">
                    The DNO notification form (G98 for systems up to 3.68 kW single-phase) or
                    application and approval documentation (G99 for larger systems). Must be
                    completed and submitted within the required timeframe.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <h3 className="font-bold text-white text-lg mb-3">Part P Certificate</h3>
                  <p className="text-white text-sm leading-relaxed">
                    Building Regulations compliance certificate issued through the Competent Person
                    Scheme or local authority building control. Confirms the electrical work
                    complies with the Building Regulations.
                  </p>
                </div>
              </div>
              <SEOAppBridge
                title="Solar PV Certificate in Elec-Mate"
                description="Elec-Mate has a dedicated Solar PV Certificate form covering both DC and AC side documentation, string configurations, inverter specifications, and G98/G99 details. Complete everything on site, capture digital signatures, and export a professional PDF — ready for the client, MCS upload, and DNO submission."
                icon={FileText}
              />
            </>
          ),
        },
        {
          id: 'cost-payback',
          heading: 'Cost and Payback Period',
          content: (
            <>
              <p>
                The total cost of a domestic solar PV installation depends on the system size,
                equipment specification, roof complexity, and the installer's pricing. As of 2026,
                typical costs for a standard domestic installation are:
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
                <h3 className="font-bold text-white text-lg mb-4">
                  Typical UK Solar PV Costs (2026)
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.04] border border-white/10">
                    <div>
                      <h4 className="font-bold text-white">3 kW system (8 panels)</h4>
                      <p className="text-white text-sm">
                        Suitable for smaller properties or lower consumption
                      </p>
                    </div>
                    <span className="font-bold text-yellow-400 text-lg">£4,000 - £6,000</span>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-yellow-500/5 border border-yellow-500/20">
                    <div>
                      <h4 className="font-bold text-white">4 kW system (10 panels)</h4>
                      <p className="text-white text-sm">Most common domestic size</p>
                    </div>
                    <span className="font-bold text-yellow-400 text-lg">£5,000 - £8,000</span>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.04] border border-white/10">
                    <div>
                      <h4 className="font-bold text-white">6 kW system (15 panels)</h4>
                      <p className="text-white text-sm">Larger properties or higher consumption</p>
                    </div>
                    <span className="font-bold text-yellow-400 text-lg">£7,000 - £10,000</span>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.04] border border-white/10">
                    <div>
                      <h4 className="font-bold text-white">Battery storage (add-on)</h4>
                      <p className="text-white text-sm">5-13 kWh capacity</p>
                    </div>
                    <span className="font-bold text-yellow-400 text-lg">£2,500 - £6,000</span>
                  </div>
                </div>
              </div>
              <p>
                The payback period depends on electricity prices, self-consumption ratio, and SEG
                income. At current UK electricity prices (approximately 24-28p per kWh), a typical 4
                kW system saves the homeowner £500-£800 per year through reduced electricity bills
                and SEG payments. This gives a payback period of approximately 6-10 years. With a
                system lifetime of 25-30 years, the total financial benefit over the system life is
                substantial.
              </p>
              <p>
                Adding battery storage extends the payback period (due to the additional capital
                cost) but significantly increases the self-consumption ratio and therefore the
                annual savings. With an EV or heat pump, the case for battery storage becomes even
                stronger.
              </p>
              <SEOAppBridge
                title="AI Cost Engineer for Solar PV Quoting"
                description="Elec-Mate's AI Cost Engineer generates accurate quotes for solar PV installations in seconds. Enter the system size, panel type, inverter specification, and installation complexity — get a detailed breakdown of material and labour costs backed by real trade pricing data."
                icon={PoundSterling}
              />
            </>
          ),
        },
      ]}
      howToHeading="How to Install Solar Panels — Step-by-Step"
      howToDescription="A step-by-step overview of the domestic solar PV installation process, from initial survey through to commissioning and handover."
      howToSteps={[
        {
          name: 'Site survey and system design',
          text: 'Visit the property and assess the roof — orientation, pitch, available area, shading, and structural suitability. Check the existing electrical installation: earthing arrangement, consumer unit capacity, supply fuse rating. Design the PV system: panel layout, string configuration, inverter selection, cable routing, and earthing scheme. Prepare the MCS performance estimate.',
        },
        {
          name: 'DNO notification and permissions',
          text: 'Submit the G98 notification (or G99 application for systems above 3.68 kW single-phase) to the Distribution Network Operator. Check whether planning permission is required (conservation area, listed building, etc.). Order equipment: panels, inverter, mounting system, DC and AC cabling, protective devices.',
        },
        {
          name: 'Install the mounting system and panels',
          text: 'Install the roof mounting brackets, fixing through the tiles or slates into the rafters. Fit the mounting rails and attach the panels according to the planned layout. Ensure all fixings are watertight using appropriate flashing and sealant. Connect the panels in the designed string configuration using MC4 connectors.',
        },
        {
          name: 'Install DC and AC cabling',
          text: 'Route the DC cables from the roof to the inverter location using UV-resistant PV cable (H1Z2Z2-K). Install the DC isolator adjacent to the inverter. Mount and connect the inverter. Run the AC cable from the inverter to the consumer unit. Install the AC isolator and appropriate protective device (MCB or RCBO) in the consumer unit.',
        },
        {
          name: 'Commission and test',
          text: 'Carry out DC side tests: open-circuit voltage (Voc) and short-circuit current (Isc) for each string, insulation resistance, earth continuity, and polarity. Carry out AC side tests: earth fault loop impedance, prospective fault current, RCD operating time, insulation resistance, and continuity. Commission the inverter and verify correct grid connection operation. Record all test results.',
        },
        {
          name: 'Certify and hand over',
          text: 'Complete the Electrical Installation Certificate (EIC) covering both DC and AC sides. Submit the DNO notification (G98) or confirm G99 approval. Register the installation on the MCS database. Issue all documentation to the homeowner: MCS certificate, EIC, G98/G99 notification, inverter manual, and the performance estimate. Assist the homeowner with SEG tariff application if required.',
        },
      ]}
      faqs={[
        {
          question: 'How many solar panels do I need for a typical UK home?',
          answer:
            'A typical 3-4 bedroom UK home uses approximately 3,000-4,500 kWh of electricity per year. A 4 kW solar PV system (10 panels at 400 W each) generates approximately 3,400-3,800 kWh per year in a good location, covering most of the annual consumption. However, generation and consumption do not always coincide — solar generation peaks in summer daytime while consumption is often highest in winter evenings. Without battery storage, a typical household self-consumes only 30-50% of the generated electricity, exporting the rest to the grid. The optimal system size depends on the roof area available, the household consumption pattern, whether battery storage is included, and whether there is an EV or heat pump that could absorb daytime generation.',
        },
        {
          question: 'Do solar panels work in the UK with our climate?',
          answer:
            "Yes, solar panels work effectively in the UK climate. PV panels generate electricity from daylight, not direct sunlight — they produce output even on overcast days, although at a reduced level. A south-facing 4 kW system in the south of England generates approximately 3,800 kWh per year, while the same system in Scotland generates approximately 3,200 kWh per year. The UK receives approximately 900-1,200 kWh of solar irradiance per square metre per year, which is sufficient for economically viable PV installations. Germany, which receives similar irradiance levels to the UK, is one of the world's largest solar PV markets. Panel efficiency has also improved significantly — modern panels are approximately 20-22% efficient compared to 14-16% a decade ago, extracting more energy from the available light.",
        },
        {
          question: 'What maintenance do solar panels need?',
          answer:
            "Solar PV systems require very little maintenance. The panels themselves have no moving parts and are designed to last 25-30 years with minimal degradation (typically 0.5-0.7% loss of output per year). Panel cleaning is recommended once or twice a year — rainfall handles most dirt, but bird droppings, tree sap, and lichen can accumulate and reduce output. The inverter is the component most likely to need attention — string inverters typically have a lifespan of 10-15 years and may need replacing once during the system lifetime. Microinverters tend to last longer (20-25 years) as they run at lower power levels. The mounting system, cables, and connectors should be inspected periodically for damage, corrosion, or degradation. A periodic electrical inspection (EICR) of the PV circuits is good practice — Elec-Mate's EICR form covers PV installations.",
        },
        {
          question: 'Can I add solar panels to an existing consumer unit?',
          answer:
            'It depends on the existing consumer unit. You need a spare way for the AC circuit from the inverter, and the consumer unit must have adequate capacity for the additional circuit. The main switch rating, busbar rating, and overall supply capacity must all be checked. If the consumer unit is full, does not have adequate capacity, or is an older unit that does not meet current regulations (metal enclosure, RCD protection), you may need to upgrade or replace it. The maximum demand calculation — including the PV inverter output and the existing loads — must not exceed the supply fuse rating. Elec-Mate includes a maximum demand calculator that factors in solar PV generation and existing loads.',
        },
        {
          question: 'What is the difference between AC-coupled and DC-coupled battery storage?',
          answer:
            'AC-coupled battery systems connect to the AC side of the installation — the battery has its own inverter/charger that connects to the consumer unit alongside the PV inverter. The PV inverter converts DC to AC, and the battery inverter converts AC back to DC for storage, then DC to AC again for discharge. This double conversion introduces small efficiency losses (approximately 5-10%) but allows the battery to be added to an existing PV system without modifying the PV inverter. DC-coupled battery systems connect to the DC side — the battery shares the inverter with the PV array (a hybrid inverter). PV DC power charges the battery directly without the double AC-DC conversion, making it slightly more efficient. However, DC-coupled systems require a compatible hybrid inverter, which means they are usually specified at the time of the original PV installation rather than retrofitted. For new installations, DC-coupled (hybrid inverter) systems are generally preferred for their simplicity and efficiency.',
        },
        {
          question: 'Is solar PV installation notifiable under Part P?',
          answer:
            'Yes. Installing a solar PV system involves adding new circuits to the electrical installation — both DC circuits (from the panels to the inverter) and AC circuits (from the inverter to the consumer unit). This is notifiable work under Part P of the Building Regulations. The work must be either self-certified by an electrician registered with a Competent Person Scheme (NICEIC, NAPIT, ELECSA, or BRE) or notified to the local authority building control department. A full Electrical Installation Certificate (EIC) is required — not a Minor Works Certificate, because new circuits are being installed. Most MCS-certified installers are registered with a Competent Person Scheme, which allows them to self-certify the work and issue the Part P certificate directly.',
        },
      ]}
      relatedPages={[
        {
          href: '/guides/solar-pv-certificate',
          title: 'Solar PV Certificate',
          description:
            'How to complete a solar PV installation certificate to BS 7671 Section 712.',
          icon: FileText,
          category: 'Certification',
        },
        {
          href: '/calculators/cable-sizing',
          title: 'Cable Sizing Calculator',
          description: 'Calculate correct cable sizes for DC and AC solar PV circuits.',
          icon: Calculator,
          category: 'Calculator',
        },
        {
          href: '/calculators/voltage-drop',
          title: 'Voltage Drop Calculator',
          description: 'Verify voltage drop compliance for DC string cables and AC circuits.',
          icon: Activity,
          category: 'Calculator',
        },
        {
          href: '/guides/earthing-arrangements',
          title: 'Earthing Arrangements',
          description: 'TN-S, TN-C-S, and TT earthing — critical for PV installations.',
          icon: Cable,
          category: 'Guide',
        },
        {
          href: '/guides/consumer-unit-regulations',
          title: 'Consumer Unit Regulations',
          description: 'Amendment 3, bidirectional devices, and consumer unit requirements.',
          icon: ShieldCheck,
          category: 'Regulations',
        },
        {
          href: '/guides/ev-charger-installation',
          title: 'EV Charger Installation',
          description: 'Combine solar PV with EV charging for maximum savings.',
          icon: Zap,
          category: 'Guide',
        },
      ]}
      ctaHeading="Design and Certify Solar PV Installations With Confidence"
      ctaSubheading="Solar PV certificates, cable sizing calculator, voltage drop calculator, and AI Circuit Designer — all in Elec-Mate. 7-day free trial, cancel anytime."
    />
  );
}
