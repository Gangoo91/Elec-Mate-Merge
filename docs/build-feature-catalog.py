#!/usr/bin/env python3
"""
Build a designed, investor/partner-facing Product Feature Catalogue (HTML) from
docs/FEATURE-CATALOG.md.

- Parses the markdown source (the single source of truth for features).
- Strips internal columns (route paths, status flags) and the internal
  "Cross-cutting notes (audit findings)" appendix.
- Reframes each hub to lead with the outcome and adds a "by the numbers" layer.
- Applies a small set of targeted copy fixes (see FIXES).
- Emits docs/feature-catalog.html using the navy/gold design system, reusing the
  logo + QR assets embedded in docs/marketing-feature-sheet.html.

Render to PDF (Chrome headless):
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
    --headless --disable-gpu --no-pdf-header-footer \
    --print-to-pdf="$HOME/Desktop/Elec-Mate-Feature-Catalog-v2.pdf" \
    "file://$PWD/docs/feature-catalog.html"
"""
import re, html as ihtml, os, sys

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, "FEATURE-CATALOG.md")
MARKETING = os.path.join(HERE, "marketing-feature-sheet.html")
OUT = os.path.join(HERE, "feature-catalog.html")

# ---------------------------------------------------------------- assets
def load_assets():
    """Pull the logo (large) and QR (small) base64 PNGs from the marketing sheet."""
    txt = open(MARKETING).read()
    uris = re.findall(r'data:image/[^"]+', txt)
    uniq = []
    for u in uris:
        if u[:60] not in [x[:60] for x in uniq]:
            uniq.append(u)
    uniq.sort(key=len, reverse=True)
    logo = uniq[0] if uniq else ""
    qr = uniq[1] if len(uniq) > 1 else ""
    return logo, qr

# ---------------------------------------------------------------- copy fixes
FIXES = [
    # Soften the "around a minute" RAMS claim (real countdown is up to ~3 min).
    (r"in around a minute", "in minutes"),
    (r"in about a minute", "in minutes"),
    (r"in around a minute\.", "in minutes."),
    # Reword the AI Tooling intro so removing its route doesn't break the sentence.
    (r"The hub lives at `[^`]+` and presents the tools", "The tools are presented"),
]

def apply_fixes(text):
    for pat, repl in FIXES:
        text = re.sub(pat, repl, text)
    return text

# Drop rows whose feature name flags an internal stub / not-a-real-feature.
DROP_ROWS = [
    "Business Admin",          # explicit "coming soon" stub
]

# Reframed, outcome-first ledes for each top-level hub (keyed by section number).
LEDES = {
    "1": "The daily launchpad. Everything that needs attention — money owed, lapsing certificates, today's jobs — is surfaced in one personalised home, so a busy tradesperson acts in seconds rather than hunting through menus.",
    "2": "One mobile-first workspace for a UK electrical apprentice's entire qualification: college plan, evidence portfolio, off-the-job hours, AM2 and EPA practice, and an AI tutor that knows exactly where they are in their course. Voice input, auto-fill and photo capture throughout, so logging evidence takes seconds.",
    "3": "The qualified electrician's complete working surface — from winning the job to certifying it and getting paid. The largest area in the platform; the eight connected sub-sections below run the whole working day, mobile-first and offline-safe.",
    "4": "An always-available in-app assistant that answers BS 7671 questions in real time, with every cited regulation tappable to its full text. “ChatGPT for electrical”, engineered for one hand on a busy site.",
    "5": "A command centre for electrical contractors and firms: run the team, win and deliver jobs, keep the books, stay on top of health & safety, and generate professional documents in seconds — around forty live sections wired to real data in one mobile dashboard.",
    "6": "A complete further-education delivery, assessment and quality-assurance platform for the training providers Elec-Mate partners with — and the provider half of a live, two-way link into each apprentice's own app. It runs the tutor's day, the IQA's quality role and the provider's Ofsted burden on real, live learner data.",
    "7": "A full learning platform that takes someone from their first day as an apprentice through to chartered-level CPD and every safety ticket a UK site demands — wrapped in streaks, XP and a leaderboard that bring electricians back five minutes at a time.",
    "8": "A genuinely private mental-health space built for the realities of the trade: a 30-second mood check, in-the-moment resets, a downloadable personal safety plan and one-tap crisis lines built for construction. Nothing is shared with an employer, sold, or used for advertising.",
    "9": "A professional identity that travels with the electrician, not their employer. The Elec-ID — a verified digital credential, shareable QR profile and live CV — sits at the centre of a full career toolkit: AI CV builder, a daily UK job board, structured pathways with day-rate intelligence and a refer-a-mate loop.",
    "10": "The polished, mobile-first foundation every account sits on: a single sign-in that remembers you with biometrics, role-aware settings, and a billing experience that handles trials, plan changes and cancellations gracefully across web, App Store and Google Play.",
    "11": "One of the largest dedicated content estates in the UK electrical trade — roughly 1,400 indexable pages of technical guides, cost guides, live calculators, free mock exams and comparison pages, every one built mobile-first with full structured data and a conversion path into the 7-day free trial.",
}

# Stat chips per hub opener (label, value) — pulled from real figures in the source.
CHIPS = {
    "2": [("AM2 + EPA", "simulators"), ("OTJ tracking", "20% rule"), ("AI tutor", "Ask Dave")],
    "3": [("Sub-sections", "8"), ("Certificate types", "25+"), ("Calculators", "60+"), ("Site-safety tools", "20+")],
    "5": [("Live sections", "~40"), ("Hubs", "5"), ("No-login surfaces", "magic links")],
    "6": [("Working areas", "~40"), ("Two-way bridge", "live"), ("Ofsted / EIF", "suite")],
    "7": [("Qualification paths", "6"), ("CPD tracks", "14"), ("Safety tickets", "14"), ("Mock-exam engine", "shared")],
    "9": [("Elec-ID", "verified"), ("CV templates", "4"), ("Wallet pass", "Apple / Google")],
    "11": [("Indexable pages", "~1,400"), ("Free calculators", "live"), ("Mock exams", "free")],
}

HUB_EYEBROWS = {
    "1": "HOME", "2": "APPRENTICE", "3": "ELECTRICAL HUB", "4": "AI ASSISTANT",
    "5": "EMPLOYER", "6": "COLLEGE", "7": "STUDY CENTRE", "8": "WELLBEING",
    "9": "CAREER & IDENTITY", "10": "PLATFORM", "11": "PUBLIC & SEO",
}

# ---------------------------------------------------------------- markdown parse
def md_inline(s):
    s = ihtml.escape(s)
    # investor-facing: strip internal route/path artifacts out of prose
    s = re.sub(r"\s*\(Base path:[^)]*\)", "", s)   # "(Base path: `/...`.)"
    s = re.sub(r"`/[^`]*`", "", s)                 # inline backtick routes
    s = s.replace("`", "")                          # de-code any remaining inline code
    s = re.sub(r"\(\s*\)", "", s)                   # empty parens left behind
    s = re.sub(r"\s{2,}", " ", s)                   # collapse double spaces
    s = re.sub(r"\s+([.,;)])", r"\1", s)            # tidy space before punctuation
    s = s.strip()
    s = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", s)
    return s

def split_row(line):
    cells = [c.strip() for c in line.strip().strip("|").split("|")]
    return cells

def parse(md):
    """Return ordered list of (kind, payload) blocks for the body sections."""
    lines = md.split("\n")
    blocks = []
    i = 0
    n = len(lines)
    while i < n:
        line = lines[i]
        st = line.strip()
        if not st:
            i += 1
            continue
        if st.startswith("<!--"):
            i += 1
            continue
        if st == "---":
            i += 1
            continue
        m = re.match(r"^(#{1,4})\s+(.*)$", st)
        if m:
            level = len(m.group(1))
            blocks.append((f"h{level}", m.group(2).strip()))
            i += 1
            continue
        if st.startswith(">"):
            quote = re.sub(r"^>\s?", "", st)
            blocks.append(("quote", quote))
            i += 1
            continue
        if st.startswith("|"):
            tbl = []
            while i < n and lines[i].strip().startswith("|"):
                tbl.append(split_row(lines[i]))
                i += 1
            # drop separator row(s)
            rows = [r for r in tbl if not all(set(c) <= set("-: ") for c in r)]
            if rows:
                blocks.append(("table", rows))
            continue
        # bold-only line acts as a table label
        bm = re.match(r"^\*\*(.+?)\*\*$", st)
        if bm:
            blocks.append(("label", bm.group(1).strip()))
            i += 1
            continue
        blocks.append(("p", st))
        i += 1
    return blocks

# ---------------------------------------------------------------- rendering
def status_marker(cell):
    """Map a source status cell (✅/🟡/⚠️) to a build-status dot, or None."""
    if "✅" in cell or "🟢" in cell:
        return "live"
    if "🟡" in cell:
        return "dev"
    if "⚠" in cell:
        return "live" if "legacy" in cell.lower() else "dev"  # legacy view is real/live
    return None

DOT = {
    "live": '<span class="dot dot-live" title="Live"></span>',
    "dev": '<span class="dot dot-dev" title="In development"></span>',
}

def render_table(rows):
    """Keep name + description; drop the route column; convert status -> a build dot."""
    out = ['<table class="ft"><tbody>']
    body = rows[1:] if len(rows) > 1 else rows
    for r in body:
        if not r:
            continue
        name = r[0]
        if name in DROP_ROWS:
            continue
        desc = r[1] if len(r) > 1 else ""
        desc = apply_fixes(desc)
        dot = DOT.get(status_marker(r[-1]), "") if len(r) > 2 else ""
        out.append(
            f'<tr><td class="ft-name">{dot}{md_inline(name)}</td>'
            f'<td class="ft-desc">{md_inline(desc)}</td></tr>'
        )
    out.append("</tbody></table>")
    return "\n".join(out)

def opener_head(num, eyebrow, title):
    """The shared header furniture: faint section number, eyebrow, title, gold rule."""
    return (
        f'<div class="hub-num">{ihtml.escape(num)}</div>'
        f'<div class="hub-eyebrow">{ihtml.escape(eyebrow)}</div>'
        f'<h2 class="hub-title">{md_inline(title)}</h2>'
        f'<div class="hub-rule"></div>'
    )

def chips_html(chips):
    if not chips:
        return ""
    items = "".join(
        f'<div class="chip"><div class="chip-v">{ihtml.escape(v)}</div>'
        f'<div class="chip-l">{ihtml.escape(l)}</div></div>'
        for (l, v) in chips
    )
    return f'<div class="chips">{items}</div>'

def hub_opener(num, title):
    eyebrow = HUB_EYEBROWS.get(num, "")
    lede = LEDES.get(num, "")
    return (
        f'<section class="hub hub-open">'
        f'{opener_head(num.zfill(2), eyebrow, title.split(". ",1)[-1])}'
        f'<p class="hub-lede">{ihtml.escape(lede)}</p>'
        f'{chips_html(CHIPS.get(num, []))}'
        f'</section>'
    )

def render_body(blocks):
    html_parts = []
    # Skip everything before the first hub, everything from "Cross-cutting notes"
    # onward, and special-case sections 12 (Admin) and 13 (WhatsApp Mate).
    skip = True            # nothing renders until the first hub opener
    suppress_intro = False # drop the source's original top-level hub intro paragraph
    i = 0
    n = len(blocks)
    while i < n:
        kind, payload = blocks[i]
        if kind == "h2":
            num_m = re.match(r"^(\d+)\.", payload)
            title_l = payload.lower()
            suppress_intro = False
            if title_l.startswith("cross-cutting") or title_l.startswith("stats"):
                skip = True
            elif num_m and num_m.group(1) == "12":
                skip = True                      # internal admin dump -> compact ops panel
                html_parts.append(OPS_PANEL)
            elif num_m and num_m.group(1) == "13":
                skip = True
                html_parts.append(MATE_NOTE)
            elif (num_m.group(1) if num_m else "") in LEDES:
                skip = False
                suppress_intro = True            # the reframed lede replaces the source intro
                html_parts.append(hub_opener(num_m.group(1), payload))
            else:
                skip = True                      # "how the app is organised" etc. (hand-built)
            i += 1
            continue
        if skip:
            i += 1
            continue
        # sub-section header: weld it to its table, and keep small sub-sections
        # (<=4 rows) intact so a lone row never strands on an otherwise-empty page.
        if kind in ("h3", "h4", "label"):
            suppress_intro = False
            cls = "sec3" if kind == "h3" else "sec4"
            tag = "h3" if kind == "h3" else "h4"
            header = f'<{tag} class="{cls}">{md_inline(payload)}</{tag}>'
            if i + 1 < n and blocks[i + 1][0] == "table" and len(blocks[i + 1][1]) - 1 <= 4:
                html_parts.append(f'<div class="keep">{header}{render_table(blocks[i + 1][1])}</div>')
                i += 2
                continue
            html_parts.append(header)
            i += 1
            continue
        if suppress_intro and kind in ("p", "quote"):
            i += 1
            continue
        if kind == "p":
            html_parts.append(f'<p class="lede">{md_inline(apply_fixes(payload))}</p>')
        elif kind == "quote":
            html_parts.append(f'<div class="callout">{md_inline(apply_fixes(payload))}</div>')
        elif kind == "table":
            html_parts.append(render_table(payload))
        i += 1
    return "\n".join(html_parts)

# ---------------------------------------------------------------- custom blocks
HUB_MAP_ROWS = [
    ("Dashboard", "Everyone", "Personalised home: status, alerts, quick actions, certificate tracking"),
    ("Apprentice Hub", "Apprentices", "Learning, portfolio & off-the-job hours, AM2 / EPA simulators, AI study mentor"),
    ("Electrical Hub", "Qualified electricians", "The working surface: jobs, certificates, business, materials, calculators, AI tooling, safety"),
    ("Elec-AI", "Everyone", "The in-app AI assistant — one chat, grounded in BS 7671"),
    ("Employer Hub", "Employers / contractors", "Workforce, compliance, RAMS, briefings, incidents"),
    ("College Hub", "Tutors / IQA / providers", "Lesson planning, learners, marking, OTJ, Ofsted compliance, reporting"),
    ("Study Centre", "Everyone", "Qualification pathways, CPD, safety tickets and personal development"),
    ("Wellbeing", "Everyone", "Private mental-health hub: mood, coping tools, crisis support, peer support"),
    ("Career & Identity", "Everyone", "Elec-ID verified credential, CV builder, job board, career pathways"),
    ("Settings & Account", "Everyone", "Profile, Elec-ID, billing, preferences, privacy"),
    ("Public site & SEO", "Prospects", "Marketing site, free guides, calculators and mock exams"),
]

def hub_map():
    rows = "".join(
        f'<tr><td class="hm-hub">{ihtml.escape(h)}</td>'
        f'<td class="hm-who">{ihtml.escape(w)}</td>'
        f'<td class="hm-cov">{ihtml.escape(c)}</td></tr>'
        for (h, w, c) in HUB_MAP_ROWS
    )
    return (
        '<section class="hub" id="map"><div class="hub-open">'
        + opener_head("00", "ORIENTATION", "How the platform is organised")
        + '<p class="hub-lede">Elec-Mate supports a UK electrician across their whole working life — from apprentice '
        'training and exam prep, through certification, quoting and running a business, to professional upskilling, '
        'career identity and wellbeing. The catalogue is organised the way the app itself is: by the hubs an '
        'electrician sees in the sidebar.</p></div>'
        '<table class="hm"><thead><tr><th>Hub</th><th>Who it’s for</th><th>What it covers</th></tr></thead>'
        f'<tbody>{rows}</tbody></table>'
        '<div class="callout"><strong>Two AI surfaces, one brand.</strong> <em>Elec-AI</em> is the in-app assistant '
        '(one chat, in the sidebar). <em>WhatsApp Mate</em> is the same assistant delivered over WhatsApp from '
        'Elec-Mate’s own server — a separate channel, covered at the end. Treat them as two delivery channels '
        'for one assistant, not duplicate features.</div>'
        '</section>'
    )

OPS_PANEL = (
    '<section class="hub"><div class="hub-open">'
    + opener_head("12", "PLATFORM OPERATIONS", "Run end-to-end from one console")
    + '<p class="hub-lede">Behind the product sits a purpose-built, mobile-first operations console — no spreadsheets '
    'or stitched-together third-party dashboards. Everything from live revenue and subscription health to identity '
    'verification, lifecycle campaigns, the AI assistant fleet and the BS 7671 knowledge base is controlled in one '
    'place, role-gated to admins with a full audit trail of privileged actions.</p></div>'
    '<div class="opsgrid">'
    + "".join(
        f'<div class="opstile"><div class="opst">{t}</div><div class="opsd">{d}</div></div>'
        for (t, d) in [
            ("Revenue &amp; billing", "Live MRR across card and App Store, subscription reconciliation, failed-payment dunning, promo codes."),
            ("Growth &amp; lifecycle", "Trial-conversion command centre, win-back, abandoned-checkout recovery, apprentice and college/B2B outreach."),
            ("Identity verification", "Review queues for Elec-ID profiles and uploaded credentials, with machine-extracted fields and confidence scoring."),
            ("Moderation", "Vacancy approval, community-pricing review, conversation moderation, announcements and feature flags."),
            ("AI assistant fleet", "Read-only health monitor of every provisioned Mate agent — tool-call volume, reliability, token spend — plus guided provisioning."),
            ("Knowledge base", "Ingest a new BS 7671 edition from PDF and activate it without a code change — so a regs amendment can be brought live centrally."),
            ("Analytics &amp; health", "Sign-ups, DAU, conversion funnel, revenue forecast, live system-health checks and CSV data export."),
            ("Founder onboarding", "A dedicated flow for the lifetime founder-pricing programme — invite, claim and activation."),
        ]
    )
    + '</div></section>'
)

MATE_NOTE = (
    '<section class="hub"><div class="hub-open">'
    + opener_head("13", "WHATSAPP MATE", "The assistant, delivered over WhatsApp")
    + '<p class="hub-lede">WhatsApp Mate is Elec-Mate’s conversational agent running on its own server, talking to '
    'electricians over WhatsApp rather than as a screen inside the app. It is the same “Mate” personality as '
    'the in-app assistant, delivered through messaging, with its own scoped business tools — invoicing, tasks, '
    'analytics and regulation help — per user. When marketing the app, <strong>Elec-AI</strong> is the in-app '
    'assistant; <strong>WhatsApp Mate</strong> is the messaging service activated separately. Two delivery channels '
    'for one assistant brand.</p></div>'
    '</section>'
)

# ---------------------------------------------------------------- investor narrative
STATUS_KEY = (
    '<div class="statuskey">'
    '<span class="skey"><span class="dot dot-live"></span>Live in production</span>'
    '<span class="skey"><span class="dot dot-dev"></span>In development</span>'
    '<span class="skey-note">Status shown against every feature in the catalogue.</span>'
    '</div>'
)

WHY_PAGE = (
    '<section class="hub"><div class="hub-open">'
    + opener_head("", "WHY THIS MATTERS", "The operating system for the electrical industry.")
    + '<p class="hub-lede">Elec-Mate is one platform spanning the entire working life of a UK electrician — and the '
    'institutions around them. It is not a tool; it is the system of record the trade runs on.</p></div>'
    '<div class="why3">'
    '<div class="whycol"><div class="whycol-h">What we do</div><ul>'
    '<li>Train apprentices</li><li>Support colleges</li><li>Run electrical businesses</li>'
    '<li>Verify competence</li><li>Manage compliance</li><li>Create workforce intelligence</li></ul></div>'
    '<div class="whycol"><div class="whycol-h">Who uses it</div><ul>'
    '<li>Apprentices</li><li>Electricians</li><li>Employers</li><li>Colleges</li></ul></div>'
    '<div class="whycol whycol-accent"><div class="whycol-h">Why it matters</div>'
    '<p>One identity.<br>One learning record.<br>One compliance record.<br>One career record.</p>'
    '<div class="whycol-foot">All four, captured once, for life.</div></div>'
    '</div>'
    '<div class="buildbar">'
    '<div class="bb-stat"><div class="bb-n">96%</div><div class="bb-t">live in production</div></div>'
    '<div class="bb-stat"><div class="bb-n">0%</div><div class="bb-t">vaporware</div></div>'
    '<div class="bb-stat"><div class="bb-n">iOS · Android · Web</div><div class="bb-t">shipped &amp; in users’ hands</div></div>'
    '<div class="bb-say">Launched January 2026. This catalogue documents working product, not a roadmap.</div>'
    '</div>'
    + STATUS_KEY
    + '</section>'
)

ELECID_SPOTLIGHT = (
    '<section class="hub"><div class="hub-open">'
    + opener_head("", "THE IDENTITY LAYER", "Elec-ID — the glue that holds it together.")
    + '<p class="hub-lede">A portable, verified professional identity that proves who an electrician is and what they '
    'are qualified to do — in seconds. It travels with the worker, not the employer. Issued free to every signup, '
    'built as they train, and read by employers, colleges, insurers and wholesalers. The day the trade requires one, '
    'Elec-Mate becomes infrastructure.</p></div>'
    '<div class="opsgrid">'
    + "".join(
        f'<div class="opstile"><div class="opst">{t}</div><div class="opsd">{d}</div></div>'
        for (t, d) in [
            ("What it holds", "Verified qualifications, ECS card, work history and skills — documents read and verified automatically, with live expiry tracking."),
            ("How it’s proven", "One scannable QR, an Apple/Google wallet pass and a public verify link confirm a real, in-date, qualified electrician — no agency, no phone calls."),
            ("Why it compounds", "Electricians build it; employers update it as they train staff. The verified record stays with the worker — a captured supply side for a hiring marketplace."),
            ("Where it connects", "Feeds certificates, quotes and CVs; surfaces in the Apprentice, Employer and College hubs. Full feature detail in §09, Career &amp; identity."),
        ]
    )
    + '</div>'
    '<div class="resultband">LinkedIn for the trade — but verified, compliance-grade, and owned by the worker.</div>'
    '</section>'
)

DATA_GRAPH = (
    '<section class="hub"><div class="hub-open">'
    + opener_head("", "THE DATA ASSET", "The Elec-Mate Data Graph.")
    + '<p class="hub-lede">The subscriptions are the engine that accumulates the data. Every hub writes to a single, '
    'compounding record of the UK electrical workforce — captured by the product, owned by no incumbent. Today it is '
    'an option; at scale it is the asset the whole industry pays to read.</p></div>'
    '<div class="opsgrid opsgrid-3">'
    + "".join(
        f'<div class="opstile"><div class="opst">{t}</div><div class="opsd">{d}</div></div>'
        for (t, d) in [
            ("Learning data", "Courses, streaks, mock-exam scores and CPD across every apprentice and electrician."),
            ("Qualification data", "ECS cards, City &amp; Guilds / NVQ, 18th Edition — verified and expiry-tracked."),
            ("Compliance data", "RAMS, permits, COSHH, safe-isolation and safety scores, per job and per firm."),
            ("Certification data", "Every BS 7671 and industry certificate — to what standard, by whom, when."),
            ("Pricing data", "Live community job pricing by postcode, plus metal and materials prices."),
            ("Business data", "Quotes, invoices, jobs and cash flow flowing through the platform."),
            ("Workforce data", "Off-the-job hours, EPA readiness, attendance and progression across the pipeline."),
            ("Identity data", "Elec-ID — who each electrician is, linking all of the above to one record."),
        ]
    )
    + '</div>'
    '<div class="resultband">A live view of the UK’s electrical workforce — competence, compliance and capacity in one graph.</div>'
    '</section>'
)

def _flow(steps):
    out = []
    for k, (lbl, sub) in enumerate(steps):
        out.append(
            f'<div class="fstep"><div class="fnum">{k+1}</div>'
            f'<div class="ftext"><div class="flbl">{lbl}</div><div class="fsub">{sub}</div></div></div>'
        )
        if k < len(steps) - 1:
            out.append('<div class="farrow">↓</div>')
    return "".join(out)

NETWORK_EFFECTS = (
    '<section class="hub"><div class="hub-open">'
    + opener_head("", "THE FLYWHEEL", "Every cohort makes the platform stronger.")
    + '<p class="hub-lede">Elec-Mate is not a linear SaaS. Each side of the market pulls in the next, and every stage of '
    'a career is a new paying relationship — apprentice, electrician, employer. The identity layer makes the loop '
    'self-reinforcing, with supply and demand captured at near-zero marginal cost.</p></div>'
    '<div class="flow">'
    + _flow([
        ("An apprentice joins", "Free, through their college — on day one of training."),
        ("The college adopts", "Tutor, assessor and ILP tools run on the platform; one B2B deal brings a whole cohort."),
        ("They qualify — and start paying", "On qualification, apprentices auto-convert to paying electricians — the core ARPU."),
        ("Electricians join directly too", "Qualified sparks adopt the full working surface — certs, business, AI — in their own right."),
        ("Employers join", "To run jobs, oversee teams and hire — bringing the demand side."),
        ("Elec-ID grows", "Every user builds a verified identity that employers, colleges and insurers trust."),
        ("Job opportunities rise — pulling in more apprentices", "Verified supply meets hiring demand; the loop tightens and acquisition cost falls."),
    ])
    + '</div>'
    '<div class="resultband">One identity. One platform. One person paying across a career — apprentice → electrician → employer. Every stage feeds the next.</div>'
    '</section>'
)

MOAT_PAGE = (
    '<section class="hub"><div class="hub-open">'
    + opener_head("", "DEFENSIBILITY", "Why Elec-Mate is hard to replicate.")
    + '<p class="hub-lede">No single advantage is unbeatable; together they compound into a category-defining position '
    'a new entrant would take years to assemble. Each layer makes the next more valuable.</p></div>'
    '<div class="opsgrid opsgrid-3">'
    + "".join(
        f'<div class="opstile"><div class="opst">{t}</div><div class="opsd">{d}</div></div>'
        for (t, d) in [
            ("Product", "337 documented capabilities, 96% live in production — a depth no point solution matches."),
            ("Data", "Competency, compliance and workforce data captured by the product, owned by no incumbent."),
            ("Distribution", "Apprentices, colleges and employers — the supply and demand sides, captured at source."),
            ("Identity", "Elec-ID: the verified record the trade plugs into, owned by the worker for life."),
            ("Content", "~1,400 indexable pages compounding free distribution into the trade, forever."),
            ("AI", "A BS 7671-grounded knowledge base — every answer cited, not generic. Costly to rebuild."),
        ]
    )
    + '</div>'
    '<div class="resultband">Product × data × distribution × identity × content × AI — the dots competitors can’t connect.</div>'
    '</section>'
)

# ---------------------------------------------------------------- contents
TOC = [
    ("00", "How the platform is organised"),
    ("01", "Dashboard"),
    ("02", "Apprentice Hub"),
    ("03", "Electrical Hub"),
    ("04", "Elec-AI"),
    ("05", "Employer Hub"),
    ("06", "College Hub"),
    ("07", "Study Centre"),
    ("08", "Wellbeing"),
    ("09", "Career & professional identity"),
    ("10", "Account, settings & platform"),
    ("11", "Public website & SEO"),
    ("12", "Platform operations"),
    ("13", "WhatsApp Mate"),
]

FRONT_TOC = [
    ("·", "Why this matters"),
    ("·", "Elec-ID — the identity layer"),
    ("·", "The data graph"),
    ("·", "Network effects"),
]
BACK_TOC = [("·", "The moat — why we’re hard to replicate")]

def _toc_rows(items):
    return "".join(
        f'<div class="toc-row"><span class="toc-n">{ihtml.escape(n)}</span>'
        f'<span class="toc-t">{ihtml.escape(t)}</span></div>'
        for (n, t) in items
    )

def contents():
    return (
        '<section class="contents"><h2 class="contents-h">Contents</h2>'
        '<div class="toc-group">Investor overview</div>'
        + _toc_rows(FRONT_TOC)
        + '<div class="toc-group">The platform</div>'
        + _toc_rows(TOC)
        + '<div class="toc-group">Appendix</div>'
        + _toc_rows(BACK_TOC)
        + '</section>'
    )

# ---------------------------------------------------------------- shell
def build():
    logo, qr = load_assets()
    md = open(SRC).read()
    blocks = parse(md)
    body = render_body(blocks)

    cover = f"""
    <section class="cover">
      <div class="cover-top">
        <div class="logo-tile"><img src="{logo}" alt="Elec-Mate"></div>
        <div class="kicker">ELEC-MATE · PRODUCT</div>
        <div class="rule"></div>
        <h1>Product Feature Catalogue</h1>
        <p class="sub">The operating system for the UK electrical industry — one platform spanning training, certification, business and compliance, from apprentice to employer.</p>
        <div class="statband">
          <div class="stat"><div class="n">4</div><div class="t">audiences, one platform</div></div>
          <div class="stat"><div class="n">1</div><div class="t">identity, for life</div></div>
          <div class="stat"><div class="n">96%</div><div class="t">live in production</div></div>
          <div class="stat"><div class="n">A4:2026</div><div class="t">BS 7671 current</div></div>
        </div>
      </div>
      <div class="cover-foot">
        <span>elec-mate.com</span>
        <span>iOS · Android · Web</span>
      </div>
    </section>
    """

    back = f"""
    <section class="backcover">
      <div class="back-top">
        <div class="logo-tile"><img src="{logo}" alt="Elec-Mate"></div>
        <div class="wmtag">ELEC-MATE</div>
      </div>
      <div class="back-mid">
        <h2>One platform for the whole electrical trade.</h2>
        <p class="bsub">Apprentice to employer, first day on site to running the firm — built mobile-first and grounded in BS 7671.</p>
      </div>
      <div class="back-cta">
        <div class="qr"><img src="{qr}" alt="QR"></div>
        <div class="ctatext">
          <div class="lead">SEE IT LIVE</div>
          <div class="url">elec-mate.com</div>
          <div class="email">info@elec-mate.com</div>
        </div>
      </div>
    </section>
    """

    doc = f"""<!DOCTYPE html><html lang="en-GB"><head><meta charset="utf-8">
<title>Elec-Mate — Product Feature Catalogue</title>
<style>{CSS}</style></head>
<body>
{cover}
{WHY_PAGE}
{ELECID_SPOTLIGHT}
{DATA_GRAPH}
{NETWORK_EFFECTS}
{contents()}
{hub_map()}
{body}
{MOAT_PAGE}
{back}
</body></html>"""
    open(OUT, "w").write(doc)
    print("wrote", OUT, f"({len(doc)//1024} KB)")

CSS = r"""
@page { size:A4; margin:16mm 16mm 16mm; }
@page cover { margin:0; }
@page back { margin:0; }
* { box-sizing:border-box; margin:0; padding:0; }
:root{
  --navy:#0b1f3a; --deep:#081627; --gold:#f4b400; --amber:#b8860b;
  --ink:#1f2733; --muted:#5d6b7d; --line:#e7ecf3; --tint:#f7fafd; --zebra:#fafbfd;
}
html{ -webkit-print-color-adjust:exact; print-color-adjust:exact; }
body{ font-family:-apple-system,"Helvetica Neue","Inter",Arial,sans-serif; color:var(--ink);
  font-size:11px; line-height:1.55; orphans:3; widows:3; }
code{ font-family:"SF Mono",ui-monospace,Menlo,monospace; font-size:.86em; background:var(--tint);
  padding:1px 5px; border-radius:4px; color:var(--amber); }
strong{ color:var(--navy); font-weight:700; }
em{ font-style:normal; font-weight:700; color:var(--navy); }

/* never split these atomic blocks across a page */
.hub-open,.chips,.chip,.callout,tr,thead,.opstile,.toc-row,.keep{ break-inside:avoid; page-break-inside:avoid; }
/* keep headers welded to the content that follows */
.sec3,.sec4,.lede{ break-after:avoid; page-break-after:avoid; }

/* ---------------- COVER ---------------- */
.cover{ page:cover; width:210mm; height:297mm; background:linear-gradient(155deg,#0d2342 0%,var(--deep) 100%);
  color:#fff; display:flex; flex-direction:column; justify-content:center; padding:30mm 24mm; position:relative; }
.cover::after{ content:""; position:absolute; inset:0; background:radial-gradient(120% 60% at 80% 8%,rgba(244,180,0,.10),transparent 60%); }
.cover-top{ position:relative; z-index:1; display:flex; flex-direction:column; align-items:flex-start; }
.logo-tile{ width:92px; height:92px; border-radius:22px; overflow:hidden; box-shadow:0 12px 40px rgba(0,0,0,.5);
  border:1px solid rgba(255,255,255,.12); margin-bottom:34px; }
.logo-tile img{ width:100%; height:100%; object-fit:cover; display:block; }
.kicker{ font-size:12px; letter-spacing:5px; color:var(--gold); font-weight:700; }
.rule{ height:4px; width:60px; background:var(--gold); border-radius:2px; margin:16px 0 26px; }
.cover h1{ font-size:52px; line-height:1.04; font-weight:800; letter-spacing:-1.2px; max-width:13ch; }
.cover .sub{ font-size:15.5px; color:#b3c3d8; margin-top:22px; max-width:48ch; line-height:1.6; }
.statband{ margin-top:50px; display:grid; grid-template-columns:repeat(4,1fr); gap:0; width:100%;
  border:1px solid rgba(255,255,255,.14); border-radius:14px; overflow:hidden; }
.stat{ padding:18px 16px; border-right:1px solid rgba(255,255,255,.12); }
.stat:last-child{ border-right:none; }
.stat .n{ font-size:28px; font-weight:800; color:var(--gold); line-height:1; letter-spacing:-.5px; }
.stat .t{ font-size:10.5px; color:#b3c3d8; margin-top:8px; line-height:1.35; }
.cover-foot{ position:absolute; left:24mm; right:24mm; bottom:18mm; z-index:1; display:flex; justify-content:space-between;
  font-size:10.5px; letter-spacing:1.5px; text-transform:uppercase; color:#6f829c;
  border-top:1px solid rgba(255,255,255,.12); padding-top:13px; }

/* ---------------- CONTENTS ---------------- */
.contents{ page-break-before:always; page-break-after:always; padding-top:4mm; }
.contents-h{ font-size:27px; font-weight:800; color:var(--navy); letter-spacing:-.5px; margin-bottom:6px; }
.contents-sub{ font-size:11px; color:var(--muted); margin-bottom:20px; }
.toc-row{ display:flex; align-items:center; gap:18px; padding:11px 2px; border-bottom:1px solid var(--line); }
.toc-row:hover{ } 
.toc-n{ font-size:12px; font-weight:800; color:var(--gold); width:26px; font-variant-numeric:tabular-nums; }
.toc-t{ font-size:13.5px; color:var(--navy); font-weight:600; letter-spacing:-.1px; }

/* ---------------- HUB OPENER ---------------- */
.hub{ page-break-before:always; }
.hub-open{ position:relative; break-after:avoid; page-break-after:avoid; padding-top:3mm; margin-bottom:6px; }
.hub-num{ position:absolute; top:-4mm; right:0; font-size:96px; font-weight:800; line-height:1;
  color:rgba(11,31,58,.05); letter-spacing:-4px; z-index:0; }
.hub-eyebrow{ position:relative; z-index:1; font-size:10.5px; letter-spacing:3.5px; color:var(--amber); font-weight:700; }
.hub-title{ position:relative; z-index:1; font-size:34px; font-weight:800; color:var(--navy);
  letter-spacing:-.7px; line-height:1.08; margin-top:9px; max-width:20ch; }
.hub-rule{ height:3px; width:50px; background:var(--gold); border-radius:2px; margin-top:16px; }
.hub-lede{ position:relative; z-index:1; font-size:12.5px; color:var(--muted); margin-top:16px; max-width:66ch; line-height:1.62; }

.chips{ display:flex; flex-wrap:wrap; margin-top:20px; border:1px solid var(--line); border-radius:12px; overflow:hidden; }
.chip{ padding:11px 18px; border-right:1px solid var(--line); background:#fff; }
.chip:last-child{ border-right:none; }
.chip-v{ font-size:15px; font-weight:800; color:var(--navy); line-height:1; letter-spacing:-.2px; }
.chip-l{ font-size:8.5px; letter-spacing:1px; text-transform:uppercase; color:var(--muted); margin-top:6px; }

/* ---------------- SUB-SECTION HEADERS ---------------- */
.sec3{ font-size:15px; font-weight:800; color:var(--navy); letter-spacing:-.2px; margin:26px 0 9px;
  padding-bottom:9px; border-bottom:1px solid var(--line); display:flex; align-items:center; gap:9px; }
.sec3::before{ content:""; width:7px; height:7px; background:var(--gold); border-radius:2px; flex:0 0 auto; }
.sec4{ font-size:10px; font-weight:700; letter-spacing:1.7px; text-transform:uppercase; color:var(--amber); margin:18px 0 7px; }
.lede{ font-size:11.5px; color:var(--muted); margin:8px 0 6px; max-width:80ch; line-height:1.6; }
.callout{ background:var(--tint); border-left:3px solid var(--gold); border-radius:0 10px 10px 0;
  padding:13px 17px; font-size:11px; color:var(--ink); line-height:1.6; margin:16px 0; }

/* ---------------- FEATURE TABLES ---------------- */
table.ft{ width:100%; border-collapse:collapse; margin:4px 0 14px; }
table.ft td{ vertical-align:top; padding:9px 12px; border-bottom:1px solid var(--line); }
table.ft tr:nth-child(even){ background:var(--zebra); }
td.ft-name{ width:27%; font-weight:700; color:var(--navy); font-size:11px; padding-right:18px; line-height:1.42; }
td.ft-desc{ width:73%; color:#2c3744; font-size:10.5px; line-height:1.55; }

/* hub map table */
table.hm{ width:100%; border-collapse:collapse; margin:20px 0 6px; border-radius:10px; overflow:hidden; }
table.hm thead th{ background:var(--navy); color:#fff; text-align:left; font-size:9.5px; letter-spacing:.8px;
  text-transform:uppercase; padding:11px 13px; font-weight:700; }
table.hm td{ padding:10px 13px; border-bottom:1px solid var(--line); vertical-align:top; }
table.hm tr:nth-child(even){ background:var(--zebra); }
.hm-hub{ font-weight:800; color:var(--navy); width:20%; }
.hm-who{ color:var(--amber); font-weight:600; width:24%; font-size:10.5px; }
.hm-cov{ color:var(--muted); width:56%; font-size:10.5px; line-height:1.5; }

/* ops grid */
.opsgrid{ display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-top:20px; }
.opsgrid.opsgrid-3{ grid-template-columns:1fr 1fr 1fr; }
.opstile{ border:1px solid var(--line); border-radius:12px; padding:15px 17px; background:#fff;
  border-top:2px solid var(--gold); break-inside:avoid; page-break-inside:avoid; }
.opst{ font-size:13px; font-weight:800; color:var(--navy); margin-bottom:5px; letter-spacing:-.2px; }
.opsd{ font-size:10.5px; color:var(--muted); line-height:1.55; }

/* ---------------- BUILD STATUS DOTS ---------------- */
.dot{ display:inline-block; width:7px; height:7px; border-radius:50%; margin-right:7px; vertical-align:1px; }
.dot-live{ background:#1f9d57; }
.dot-dev{ background:var(--gold); }
.statuskey{ display:flex; align-items:center; gap:20px; margin-top:22px; padding-top:16px;
  border-top:1px solid var(--line); flex-wrap:wrap; }
.skey{ font-size:10.5px; font-weight:700; color:var(--navy); letter-spacing:.2px; }
.skey-note{ font-size:10px; color:var(--muted); margin-left:auto; }

/* ---------------- WHY THIS MATTERS ---------------- */
.why3{ display:grid; grid-template-columns:1fr 1fr 1.1fr; gap:14px; margin-top:24px; }
.whycol{ border:1px solid var(--line); border-radius:12px; padding:18px 18px 16px; background:#fff; break-inside:avoid; }
.whycol-h{ font-size:10px; letter-spacing:1.6px; text-transform:uppercase; color:var(--amber); font-weight:700; margin-bottom:12px; }
.whycol ul{ list-style:none; }
.whycol li{ font-size:12.5px; color:var(--ink); font-weight:600; padding:5px 0; border-bottom:1px solid var(--tint); }
.whycol li:last-child{ border-bottom:none; }
.whycol-accent{ background:linear-gradient(160deg,var(--navy),var(--deep)); border-color:var(--navy); }
.whycol-accent .whycol-h{ color:var(--gold); }
.whycol-accent p{ font-size:15px; font-weight:800; color:#fff; line-height:1.5; letter-spacing:-.2px; }
.whycol-foot{ font-size:11px; color:#aebfd4; margin-top:14px; padding-top:12px; border-top:1px solid rgba(255,255,255,.14); }
.buildbar{ display:grid; grid-template-columns:auto auto auto 1fr; gap:0; align-items:center; margin-top:22px;
  background:linear-gradient(135deg,var(--navy),var(--deep)); border-radius:12px; padding:18px 22px; }
.bb-stat{ padding-right:26px; margin-right:26px; border-right:1px solid rgba(255,255,255,.14); }
.bb-n{ font-size:24px; font-weight:800; color:var(--gold); line-height:1; }
.bb-t{ font-size:9.5px; letter-spacing:.5px; text-transform:uppercase; color:#aebfd4; margin-top:6px; }
.bb-say{ font-size:11px; color:#cdd9e8; line-height:1.5; padding-left:4px; }

/* ---------------- FLYWHEEL ---------------- */
.flow{ margin-top:16px; max-width:62ch; }
.fstep{ display:flex; align-items:center; gap:15px; border:1px solid var(--line); border-radius:11px;
  padding:9px 18px; background:#fff; break-inside:avoid; }
.fnum{ width:28px; height:28px; border-radius:50%; background:var(--navy); color:#fff; font-weight:800;
  font-size:12.5px; display:flex; align-items:center; justify-content:center; flex:0 0 auto; }
.flbl{ font-size:13px; font-weight:800; color:var(--navy); }
.fsub{ font-size:10.5px; color:var(--muted); margin-top:2px; line-height:1.4; }
.farrow{ text-align:center; color:var(--gold); font-size:15px; font-weight:700; line-height:1; padding:2px 0; }

/* ---------------- RESULT BAND ---------------- */
.resultband{ margin-top:16px; background:linear-gradient(120deg,var(--gold),#ffd24d); color:#3a2c00;
  border-radius:12px; padding:16px 22px; font-size:14px; font-weight:800; line-height:1.4; letter-spacing:-.2px;
  break-inside:avoid; }

/* ---------------- CONTENTS GROUPS ---------------- */
.toc-group{ font-size:10px; letter-spacing:2px; text-transform:uppercase; color:var(--amber); font-weight:700;
  margin:20px 0 4px; }

/* ---------------- BACK COVER ---------------- */
.backcover{ page:back; width:210mm; height:297mm; background:linear-gradient(155deg,#0d2342,var(--deep));
  color:#fff; display:flex; flex-direction:column; justify-content:space-between; align-items:center;
  text-align:center; padding:36mm 24mm 28mm; position:relative; }
.backcover::after{ content:""; position:absolute; inset:0; background:radial-gradient(120% 50% at 50% 0%,rgba(244,180,0,.10),transparent 55%); }
.back-top,.back-mid,.back-cta{ position:relative; z-index:1; }
.back-top{ display:flex; flex-direction:column; align-items:center; }
.backcover .logo-tile{ width:104px; height:104px; margin-bottom:18px; }
.wmtag{ font-size:11px; letter-spacing:6px; color:var(--gold); font-weight:700; }
.backcover h2{ font-size:40px; font-weight:800; max-width:15ch; line-height:1.1; letter-spacing:-.7px; }
.bsub{ font-size:14px; color:#b3c3d8; margin:20px auto 0; max-width:42ch; line-height:1.6; }
.back-cta{ width:100%; border-top:1px solid rgba(255,255,255,.12); padding-top:26px; display:flex;
  align-items:center; justify-content:center; gap:28px; }
.back-cta .qr{ background:#fff; padding:11px; border-radius:12px; }
.back-cta .qr img{ width:104px; height:104px; display:block; image-rendering:pixelated; }
.back-cta .ctatext{ text-align:left; }
.back-cta .lead{ font-size:10px; letter-spacing:2.5px; text-transform:uppercase; color:#7d90aa; }
.back-cta .url{ font-size:24px; font-weight:800; margin-top:6px; }
.back-cta .email{ font-size:12.5px; color:#b3c3d8; margin-top:7px; }
"""

if __name__ == "__main__":
    build()
