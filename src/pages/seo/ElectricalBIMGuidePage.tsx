import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  Building,
  CheckCircle2,
  Zap,
  Calculator,
  FileText,
  ShieldCheck,
  Brain,
  ClipboardCheck,
  Layers,
  Target,
  Users,
  Database,
} from 'lucide-react';

export default function ElectricalBIMGuidePage() {
  return (
    <GuideTemplate
      title="Electrical BIM Guide | Building Information Modelling"
      description="Guide to Building Information Modelling (BIM) for electrical engineers and electricians. Covers what BIM is, LOD levels, Revit MEP for electrical, clash detection, asset data requirements, PAS 1192, ISO 19650, and how BIM affects electrical design and installation on modern construction projects."
      datePublished="2025-10-01"
      dateModified="2026-02-13"
      breadcrumbs={[
        { label: 'Guides', href: '/guides' },
        { label: 'BIM Guide', href: '/guides/electrical-bim-guide' },
      ]}
      tocItems={[
        { id: 'what-is-bim', label: 'What Is BIM?' },
        { id: 'lod-levels', label: 'LOD Levels Explained' },
        { id: 'revit-mep', label: 'Revit MEP for Electrical' },
        { id: 'clash-detection', label: 'Clash Detection' },
        { id: 'asset-data', label: 'Asset Data & COBie' },
        { id: 'standards', label: 'PAS 1192 & ISO 19650' },
        { id: 'practical-impact', label: 'Impact on Electricians' },
        { id: 'getting-started', label: 'Getting Started With BIM' },
        { id: 'faq', label: 'FAQs' },
        { id: 'related', label: 'Related Guides' },
      ]}
      badge="Technical Guide"
      badgeIcon={Building}
      heroTitle={
        <>
          Electrical BIM Guide
          <br />
          <span className="text-yellow-400">Building Information Modelling</span>
        </>
      }
      heroSubtitle="Building Information Modelling is transforming how electrical installations are designed, coordinated, and handed over. Whether you are an electrical designer working in Revit MEP, a project manager dealing with BIM requirements, or an electrician on a BIM-mandated project, this guide explains what BIM means for the electrical trade."
      readingTime={12}
      keyTakeaways={[
        'BIM is not just 3D modelling — it is a process for creating and managing digital information about a building throughout its lifecycle. The 3D model is just one part of BIM; the data attached to each component (manufacturer, rating, maintenance schedule) is equally important.',
        'LOD (Level of Development) defines how much detail each model element contains at each project stage. LOD 100 is a conceptual placeholder; LOD 200 is approximate geometry; LOD 300 is accurate geometry for construction; LOD 350 includes coordination with other trades; LOD 400 is fabrication-ready.',
        'Clash detection is one of the most valuable BIM processes for electrical work. Running the electrical model against the structural, mechanical, and architectural models before construction begins identifies conflicts (cable trays through beams, containment clashing with ductwork) that would otherwise be discovered on site.',
        'ISO 19650 (replacing PAS 1192) is the international standard for managing information over the whole lifecycle of a built asset using BIM. It defines roles, processes, and information exchanges for BIM projects. UK government projects require BIM Level 2 (now called "BIM according to ISO 19650") as a minimum.',
        'Even if you are not using BIM software yourself, understanding BIM terminology and processes is increasingly essential. Electrical contractors on BIM projects are expected to provide model data, asset information, and coordinate their installation with the federated model.',
      ]}
      sections={[
        {
          id: 'what-is-bim',
          heading: 'What Is BIM?',
          content: (
            <>
              <p>
                Building Information Modelling (BIM) is a digital process for creating, managing,
                and sharing information about a building throughout its entire lifecycle — from
                design and construction through to operation, maintenance, and eventually
                demolition.
              </p>
              <p>
                The most visible output of BIM is a 3D model of the building, but BIM is much more
                than 3D. Every element in a BIM model carries data — a distribution board in the
                model is not just a box in 3D space; it also contains information about the
                manufacturer, model number, rating, number of ways, dimensions, weight, installation
                date, warranty period, maintenance schedule, and any other data the project
                requires. This combination of geometry and data is what makes BIM powerful.
              </p>
              <div className="space-y-4 mt-4">
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Layers className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">BIM Dimensions</h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    BIM extends beyond 3D geometry into additional "dimensions":{' '}
                    <strong className="text-white">3D</strong> is the spatial model,{' '}
                    <strong className="text-white">4D</strong> adds time (construction sequencing
                    and programming), <strong className="text-white">5D</strong> adds cost (quantity
                    extraction and cost estimation), <strong className="text-white">6D</strong> adds
                    sustainability (energy analysis and environmental impact), and{' '}
                    <strong className="text-white">7D</strong> adds facility management (operation
                    and maintenance data). Not every project uses all dimensions, but the model
                    serves as a single source of truth for all building information.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">Federated Model</h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    Each design discipline (architecture, structure, mechanical, electrical,
                    plumbing) creates its own model. These individual models are combined into a
                    "federated model" for coordination and clash detection. The electrical model
                    contains all cable trays, containment, distribution boards, luminaires, socket
                    outlets, and other electrical equipment. It must coordinate spatially and
                    informationally with the models from every other discipline.
                  </p>
                </div>
              </div>
            </>
          ),
        },
        {
          id: 'lod-levels',
          heading: 'LOD Levels Explained',
          content: (
            <>
              <p>
                Level of Development (LOD) describes the reliability and detail of information
                contained in a model element at a specific stage of the project. LOD is not just
                about visual detail — it also describes how much the data attached to the element
                can be relied upon.
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
                <h3 className="font-bold text-white text-lg mb-4">
                  LOD Levels for Electrical Elements
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.04] border border-white/10">
                    <div>
                      <h4 className="font-bold text-white">LOD 100 — Conceptual</h4>
                      <p className="text-white text-sm">
                        A symbol or placeholder indicating an electrical element exists
                      </p>
                    </div>
                    <span className="font-bold text-white text-sm">RIBA Stage 2</span>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.04] border border-white/10">
                    <div>
                      <h4 className="font-bold text-white">LOD 200 — Approximate Geometry</h4>
                      <p className="text-white text-sm">
                        Approximate size and location, generic components
                      </p>
                    </div>
                    <span className="font-bold text-white text-sm">RIBA Stage 3</span>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.04] border border-white/10">
                    <div>
                      <h4 className="font-bold text-white">LOD 300 — Accurate Geometry</h4>
                      <p className="text-white text-sm">
                        Accurate size, shape, and location for construction
                      </p>
                    </div>
                    <span className="font-bold text-white text-sm">RIBA Stage 4</span>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-yellow-500/5 border border-yellow-500/20">
                    <div>
                      <h4 className="font-bold text-white">LOD 350 — Coordination</h4>
                      <p className="text-white text-sm">
                        Interfaces with other systems modelled, clash-free
                      </p>
                    </div>
                    <span className="font-bold text-white text-sm">RIBA Stage 4</span>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.04] border border-white/10">
                    <div>
                      <h4 className="font-bold text-white">LOD 400 — Fabrication</h4>
                      <p className="text-white text-sm">
                        Fabrication-ready detail, exact product specifications
                      </p>
                    </div>
                    <span className="font-bold text-white text-sm">RIBA Stage 5</span>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.04] border border-white/10">
                    <div>
                      <h4 className="font-bold text-white">LOD 500 — As-Built</h4>
                      <p className="text-white text-sm">
                        Verified as-built model for facility management
                      </p>
                    </div>
                    <span className="font-bold text-white text-sm">RIBA Stage 6-7</span>
                  </div>
                </div>
              </div>
              <p>
                For electrical design, LOD 300-350 is the typical delivery requirement for
                construction-stage models. This means every distribution board, cable tray,
                containment run, luminaire, socket outlet, and major piece of electrical equipment
                must be accurately positioned in 3D space and carry the required data attributes.
              </p>
            </>
          ),
        },
        {
          id: 'revit-mep',
          heading: 'Revit MEP for Electrical',
          content: (
            <>
              <p>
                Autodesk Revit is the dominant BIM authoring platform in the UK for MEP (Mechanical,
                Electrical, Plumbing) design. Revit MEP provides specific tools for electrical
                design, including circuit modelling, panel schedules, cable tray and conduit
                routing, and lighting fixture placement.
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
                <h3 className="font-bold text-white text-lg mb-4">Revit Electrical Capabilities</h3>
                <ul className="space-y-3 text-white">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Electrical circuits</strong> — Create
                      circuits connecting devices to panels with automatic load calculations.
                      Circuit schedules are generated directly from the model and update when
                      devices are added or removed.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Panel schedules</strong> — Automatically
                      generated from the circuit model. Show circuit numbers, loads, protective
                      device ratings, and cable sizes. Can be placed on drawing sheets and exported.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Cable tray and conduit</strong> — Route
                      cable trays and conduit in 3D with automatic fittings (bends, tees, crosses).
                      Support height and routing preferences can be set to follow project standards.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Lighting analysis</strong> — Basic
                      lighting calculations using IES photometric data. While not as detailed as
                      specialist lighting software (Dialux, Relux), it provides a first-pass check
                      of illuminance levels directly within the BIM model.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Families and parameters</strong> —
                      Electrical equipment is modelled using "families" (Revit's term for parametric
                      component templates). Manufacturer-specific families can include accurate
                      geometry and data parameters matching the actual product being installed.
                    </span>
                  </li>
                </ul>
              </div>
              <p>
                It is worth noting that Revit's electrical tools have limitations for UK electrical
                design. BS 7671-specific calculations (cable sizing with derating factors, Zs
                calculations, prospective fault current) are not built into Revit and must be done
                in separate tools. This is where complementary applications like{' '}
                <SEOInternalLink href="/calculators/cable-sizing">
                  cable sizing calculators
                </SEOInternalLink>{' '}
                and circuit design tools remain essential.
              </p>
              <SEOAppBridge
                title="AI Circuit Designer for BIM Projects"
                description="While Revit handles the 3D model, Elec-Mate's AI Circuit Designer handles the BS 7671 calculations. Enter circuit parameters and get cable sizing, voltage drop, fault current, and RCD selection — all validated against the current regulations."
                icon={Brain}
              />
            </>
          ),
        },
        {
          id: 'clash-detection',
          heading: 'Clash Detection',
          content: (
            <>
              <p>
                Clash detection is arguably the single most valuable BIM process for M&E
                installation. It identifies physical conflicts between model elements from different
                disciplines before construction begins — finding problems on screen rather than on
                site, where they are 10-100 times more expensive to resolve.
              </p>
              <p>
                Navisworks (Autodesk) and Solibri are the most commonly used clash detection tools.
                They import the federated model (all disciplines combined) and run automated checks
                to identify clashes — two objects occupying the same space.
              </p>
              <div className="space-y-4 mt-4">
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">Hard Clashes</h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    Two solid objects physically intersecting — a cable tray running through a
                    structural beam, a distribution board placed where a door opens, or electrical
                    containment clashing with ductwork. These are real conflicts that must be
                    resolved before construction. The resolution is agreed in coordination meetings
                    and recorded in the model.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">
                      Soft Clashes (Clearance Violations)
                    </h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    Two objects that do not physically intersect but are too close together — a
                    cable tray within the required maintenance clearance of an air handling unit, or
                    a distribution board without the required working space in front of it. Soft
                    clashes are defined by setting clearance zones around equipment and checking for
                    violations.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">Workflow Clashes</h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    Conflicts in the construction sequence — for example, electrical containment
                    that must be installed before a ceiling grid, but the programme shows the
                    ceiling being installed first. These are identified by combining the 3D model
                    (BIM) with the construction programme (4D).
                  </p>
                </div>
              </div>
              <p className="mt-4">
                For electrical contractors, clash detection means that cable tray routes,
                containment runs, and equipment positions are agreed and conflict-free before the
                first piece of containment is installed on site. This dramatically reduces on-site
                rework, delays, and coordination disputes.
              </p>
            </>
          ),
        },
        {
          id: 'asset-data',
          heading: 'Asset Data and COBie',
          content: (
            <>
              <p>
                One of the key outputs of a BIM project is structured asset data — the information
                about every installed component that is needed for operation and maintenance of the
                building. This data is delivered in a structured format, most commonly COBie
                (Construction Operations Building Information Exchange).
              </p>
              <p>
                COBie is a spreadsheet-based data format (though it can be delivered in other
                formats including IFC) that captures key information about every maintainable asset
                in the building. For electrical installations, this includes:
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
                <h3 className="font-bold text-white text-lg mb-4">
                  Typical COBie Data for Electrical Assets
                </h3>
                <ul className="space-y-3 text-white">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Component identity</strong> — Unique asset
                      tag, type, description, serial number, barcode, model number.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Location</strong> — Building, floor,
                      room/space, exact position within the space.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Manufacturer data</strong> — Manufacturer
                      name, model, product URL, warranty start and expiry dates.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Technical data</strong> — Voltage rating,
                      current rating, IP rating, number of ways, circuit designation, protective
                      device type and rating.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Maintenance requirements</strong> —
                      Inspection frequency, test requirements, replacement intervals, spare parts
                      references.
                    </span>
                  </li>
                </ul>
              </div>
              <p>
                For electrical contractors, providing this data is increasingly a contractual
                requirement. The data must be populated progressively during construction and
                verified at handover. This means recording serial numbers, warranty information, and
                technical data for every significant piece of electrical equipment as it is
                installed.
              </p>
            </>
          ),
        },
        {
          id: 'standards',
          heading: 'PAS 1192 and ISO 19650',
          content: (
            <>
              <p>
                The UK was one of the first countries to develop a formal BIM framework through the
                PAS 1192 series of publicly available specifications. These have now been largely
                superseded by the international ISO 19650 series, which was based on the UK
                approach.
              </p>
              <div className="space-y-4 mt-4">
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Database className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">ISO 19650 Parts 1 & 2</h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    ISO 19650-1 establishes the concepts and principles for information management
                    using BIM. ISO 19650-2 covers the delivery phase (design and construction).
                    Together, they define the processes for appointing parties, establishing
                    information requirements, creating information models, and exchanging
                    information at defined stages. UK Annex (BS EN ISO 19650-2 UK National Annex)
                    provides UK-specific guidance.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Database className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">BIM Execution Plan (BEP)</h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    Every BIM project requires a BIM Execution Plan — a document that defines how
                    BIM will be implemented on the project. It specifies the software to be used,
                    the model standards, the LOD requirements at each stage, the clash detection
                    process, the file naming convention, the common data environment (CDE), and the
                    roles and responsibilities for model management. The electrical subcontractor
                    must contribute to the BEP and comply with its requirements.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Database className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">Common Data Environment (CDE)</h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    All project information is managed through a CDE — a shared digital platform
                    where all parties upload, review, approve, and share information. Models,
                    drawings, documents, and data are all stored in the CDE with version control,
                    approval workflows, and access permissions. Common CDE platforms include
                    Autodesk Construction Cloud, Viewpoint, Aconex, and BIM 360.
                  </p>
                </div>
              </div>
              <p className="mt-4">
                Since 2016, all centrally procured UK government construction projects require BIM
                (originally "BIM Level 2," now termed "information management according to ISO
                19650"). This mandate has driven BIM adoption across the construction industry,
                including electrical contracting. Many private sector clients now also require BIM
                as standard.
              </p>
            </>
          ),
        },
        {
          id: 'practical-impact',
          heading: 'Impact on Electricians',
          content: (
            <>
              <p>
                Even if you never open Revit or Navisworks, BIM is increasingly affecting how
                electricians work on site. Here is what it means in practice.
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
                <ul className="space-y-3 text-white">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Installation from models</strong> —
                      Instead of working from 2D drawings, site teams increasingly use tablets with
                      the 3D BIM model to view the installation layout. Cable tray routes, equipment
                      positions, and containment runs can be viewed in 3D on site, reducing
                      interpretation errors.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Pre-agreed coordination</strong> — On BIM
                      projects, the positions of cable trays, containment, and equipment are agreed
                      in advance through clash detection. There should be fewer surprises on site —
                      you should not be trying to fit containment into spaces already occupied by
                      ductwork.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Data capture</strong> — Electricians may
                      be required to record serial numbers, photograph installations, and populate
                      asset data sheets for every significant item installed. This data feeds into
                      the as-built BIM model and the COBie handover data.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Digital O&M manuals</strong> — Traditional
                      paper O&M (operation and maintenance) manuals are being replaced by digital
                      O&M data linked to the BIM model. Test{' '}
                      <SEOInternalLink href="/guides/eic-certificate">certificates</SEOInternalLink>
                      , commissioning records, and maintenance schedules are linked directly to the
                      relevant equipment in the model.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Offsite fabrication</strong> — BIM enables
                      offsite prefabrication of containment, wiring looms, and distribution
                      assemblies. The model provides exact dimensions for manufacturing, reducing
                      on-site labour and waste.
                    </span>
                  </li>
                </ul>
              </div>
              <SEOAppBridge
                title="Digital Certificates for BIM Handovers"
                description="Elec-Mate's digital certificates integrate seamlessly with BIM handover requirements. EIC, EICR, and commissioning records are stored in the cloud and can be linked to asset data in the BIM model, simplifying the O&M handover process."
                icon={FileText}
              />
            </>
          ),
        },
        {
          id: 'getting-started',
          heading: 'Getting Started With BIM',
          content: (
            <>
              <p>
                For electrical contractors looking to develop BIM capability, the journey does not
                start with buying software. It starts with understanding the processes and building
                the skills to contribute to BIM projects.
              </p>
              <div className="space-y-3 mt-4">
                <div className="flex gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
                  <span className="w-8 h-8 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center font-bold text-yellow-400 text-sm flex-shrink-0">
                    1
                  </span>
                  <div>
                    <h4 className="font-bold text-white mb-1">Learn the Language</h4>
                    <p className="text-white text-sm leading-relaxed">
                      Understand BIM terminology — LOD, CDE, IFC, COBie, BEP, EIR, federated model,
                      clash detection. This allows you to participate meaningfully in BIM
                      coordination meetings and understand contract requirements. Free online
                      resources from the BIM Task Group and buildingSMART are excellent starting
                      points.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
                  <span className="w-8 h-8 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center font-bold text-yellow-400 text-sm flex-shrink-0">
                    2
                  </span>
                  <div>
                    <h4 className="font-bold text-white mb-1">
                      View Models Before You Create Them
                    </h4>
                    <p className="text-white text-sm leading-relaxed">
                      Free BIM viewers (Autodesk Viewer, BIM Vision, Solibri Anywhere) allow you to
                      open and navigate BIM models without purchasing modelling software. Start by
                      viewing models on projects you are already working on — understanding how to
                      navigate and extract information from a model is a valuable skill in itself.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
                  <span className="w-8 h-8 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center font-bold text-yellow-400 text-sm flex-shrink-0">
                    3
                  </span>
                  <div>
                    <h4 className="font-bold text-white mb-1">Invest in Training</h4>
                    <p className="text-white text-sm leading-relaxed">
                      If your business is moving toward BIM, invest in Revit MEP training for your
                      design team. Many{' '}
                      <SEOInternalLink href="/guides/cpd-for-electricians">
                        CPD courses
                      </SEOInternalLink>{' '}
                      now include BIM modules. Autodesk also offer certification programmes for
                      Revit MEP that demonstrate competence to clients.
                    </p>
                  </div>
                </div>
              </div>
            </>
          ),
        },
      ]}
      faqs={[
        {
          question: 'Do all construction projects require BIM?',
          answer:
            'No. BIM is mandated on centrally procured UK government projects (since 2016), but it is not a legal requirement for private sector projects or smaller works. However, many private sector clients, particularly large developers and infrastructure companies, now specify BIM as a contract requirement. The trend is clearly toward wider adoption — understanding BIM is increasingly important even for smaller electrical contractors who may be subcontracting on BIM-mandated projects.',
        },
        {
          question: 'Do I need Revit to work on BIM projects?',
          answer:
            'Not necessarily. If you are a site electrician, you do not need Revit — you need the ability to view and navigate a BIM model on a tablet or laptop using a free viewer (Autodesk Viewer, BIM Vision, etc.). If you are an electrical designer or estimator, you will likely need Revit MEP or an equivalent BIM authoring tool to create and contribute to the project model. Some electrical contractors outsource their BIM modelling to specialist BIM consultancies while keeping the BS 7671 design work in-house.',
        },
        {
          question: 'What is the difference between BIM Level 1 and BIM Level 2?',
          answer:
            'BIM Level 1 uses 2D and 3D CAD with a common data environment for sharing. BIM Level 2 (now called "information management according to ISO 19650") requires each discipline to create a 3D BIM model with structured data, share models through a CDE, and coordinate using clash detection in a federated model. BIM Level 2 is the minimum required for UK government projects. BIM Level 3 (not yet mandated) envisions a single shared model that all disciplines work in simultaneously, with integrated data management throughout the building lifecycle.',
        },
        {
          question: 'What is COBie and why does it matter for electricians?',
          answer:
            'COBie (Construction Operations Building Information Exchange) is a structured data format for delivering asset information to the building owner at handover. For electricians, this means providing manufacturer details, serial numbers, ratings, warranty information, test results, and maintenance schedules for every significant piece of electrical equipment. On BIM projects, this data is a contractual deliverable — failure to provide it can delay practical completion and final payment. Using digital tools that capture this data during installation (rather than compiling it retrospectively at handover) saves significant time.',
        },
        {
          question: 'How does clash detection benefit electrical contractors?',
          answer:
            'Clash detection identifies physical conflicts between the electrical model and other disciplines (structure, mechanical, architecture) before construction begins. This means cable tray routes are confirmed as buildable, distribution board positions have adequate clearance, and containment does not clash with ductwork or structural elements. Without clash detection, these conflicts are discovered on site — requiring rework, delays, and additional costs that typically fall on the subcontractor. On a well-coordinated BIM project, the electrical installation should proceed with minimal surprises.',
        },
      ]}
      relatedPages={[
        {
          href: '/guides/eic-certificate',
          title: 'EIC Certificate',
          description: 'Electrical Installation Certificate guide.',
          icon: FileText,
          category: 'Certification',
        },
        {
          href: '/calculators/cable-sizing',
          title: 'Cable Sizing Calculator',
          description: 'BS 7671 cable sizing for BIM projects.',
          icon: Calculator,
          category: 'Calculator',
        },
        {
          href: '/guides/cpd-for-electricians',
          title: 'CPD for Electricians',
          description: 'Continuing professional development options.',
          icon: ClipboardCheck,
          category: 'Career',
        },
        {
          href: '/guides/bs7671-eighteenth-edition',
          title: 'BS 7671 Guide',
          description: 'Full guide to the 18th Edition Wiring Regulations.',
          icon: ShieldCheck,
          category: 'Regulation',
        },
        {
          href: '/guides/testing-sequence',
          title: 'Testing Sequence Guide',
          description: 'The correct order of electrical tests.',
          icon: Zap,
          category: 'Guide',
        },
        {
          href: '/guides/electrical-qualifications-pathway',
          title: 'Electrical Qualifications Pathway',
          description: 'Career progression and qualifications map.',
          icon: Users,
          category: 'Career',
        },
      ]}
      ctaHeading="Digital Tools for Modern Electrical Projects"
      ctaSubheading="Elec-Mate provides BS 7671 calculations, digital certificates, AI circuit design, and cloud storage — complementing BIM workflows with electrical-specific tools. 7-day free trial, cancel anytime."
    />
  );
}
