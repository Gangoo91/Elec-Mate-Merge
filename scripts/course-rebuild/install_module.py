#!/usr/bin/env python3
"""Install a reviewed BMS module: copy drafts, rebuild the module page list, add routes.

    python3 install_module.py <M>
"""
import re, sys, shutil, pathlib, json

REPO = pathlib.Path('/Users/andrewmoore/elec-mate-merge')
DRAFTS = pathlib.Path('/private/tmp/claude-501/-Users-andrewmoore/8214753f-cc20-4ff4-aeef-64a91249062e/scratchpad/bms/drafts')
MODS = {
    1: ('What a BMS is, and the rules around it', 'How a building management system is built, what it controls, why buildings have one, the rules that require it, and where the electrician fits.'),
    2: ('Field devices and signals', 'Points, sensors, actuators, controllers and the wiring between them, through to where the BMS meets the motor starter.'),
    3: ('Controlling heating, ventilation and air conditioning', 'The plant a BMS runs and how it controls it: loops, schedules, demand-based control, overrides and the safeties that must never depend on software.'),
    4: ('Lighting, access, blinds and metering', 'Lighting control and DALI, daylight and presence detection, access and shading interfaces, and the metering Approved Document L expects.'),
    5: ('Networks and protocols', 'How BMS devices talk: BACnet, Modbus, KNX, LonWorks, M-Bus and DALI, gateways, and keeping the network secure.'),
    6: ('Alarms, data and monitoring', 'Alarms that get acted on, trends that find faults, graphics, energy reporting, fire alarm interfaces and safe remote access.'),
    7: ('Design, installation, commissioning and handover', 'From the points schedule to handover: control logic, addressing, software, commissioning, documentation and fault finding.'),
}


def page_meta(f):
    s = f.read_text()
    title = re.search(r'<HubMasthead[^>]*?title="([^"]+)"', s, re.S)
    title = title.group(1) if title else re.search(r"title=\{?['\"]([^'\"]+)", s).group(1)
    intro = re.search(r'<p className="max-w-3xl[^"]*">\s*(.*?)\s*</p>', s, re.S)
    intro = re.sub(r'\s+', ' ', re.sub(r'<[^>]+>', '', intro.group(1))).strip() if intro else ''
    t = re.sub(r'className="[^"]*"', '', s)
    t = re.sub(r'<[^>]+>', ' ', t)
    words = len(re.findall(r"[A-Za-z][A-Za-z'’-]+", t))
    return title.replace('&apos;', "'"), intro, round(words / 200 + 10)


def fmt(mins):
    h, m = divmod(int(5 * round(mins / 5)), 60)
    parts = ([f'{h} hr' + ('s' if h > 1 else '')] if h else []) + ([f'{m} mins'] if m else [])
    return ' '.join(parts) or '0 mins'


def main(M):
    files = sorted(DRAFTS.glob(f'BMSModule{M}Section*.tsx'), key=lambda p: int(re.search(r'Section(\d+)', p.name).group(1)))
    metas = []
    for f in files:
        shutil.copy(f, REPO / 'src/pages/upskilling' / f.name)
        metas.append(page_meta(f))
    total = sum(m[2] for m in metas)

    mp = REPO / f'src/pages/upskilling/BMSModule{M}.tsx'
    s = mp.read_text()
    i = s.index('const sections = [')
    j = s.index('];', i) + 2
    old = s[i:j]
    icons = re.findall(r'icon:\s*(\w+)', old) or ['BookOpen']
    items = []
    for n, (title, intro, _) in enumerate(metas, 1):
        icon = icons[n - 1] if n - 1 < len(icons) else icons[-1]
        desc = intro if len(intro) <= 170 else intro[:167].rsplit(' ', 1)[0] + '…'
        items.append(
            '  {\n'
            f'    id: {n},\n'
            f'    title: {json.dumps(title, ensure_ascii=False)},\n'
            f'    icon: {icon},\n'
            f'    description: {json.dumps(desc, ensure_ascii=False)},\n'
            '  },\n'
        )
    s = s[:i] + 'const sections = [\n' + ''.join(items) + '];' + s[j:]
    mt, md = MODS[M]
    s = re.sub(r'(<ModuleShell[\s\S]*?\btitle=)"[^"]*"', lambda m: m.group(1) + f'"{mt}"', s, count=1)
    s = re.sub(r'(<ModuleShell[\s\S]*?\bdescription=)(?:"[^"]*"|\{[^}]*\})', lambda m: m.group(1) + '"' + md.replace('"', '&quot;') + '"', s, count=1)
    s = re.sub(r'duration="[^"]*"', f'duration="{fmt(total)}"', s, count=1)
    if M < 7:
        s = re.sub(r'nextModuleLabel="[^"]*"', f'nextModuleLabel="{MODS[M + 1][0]}"', s, count=1)
    mp.write_text(s)

    rp = REPO / 'src/routes/upskilling/bmsRoutes.tsx'
    r = rp.read_text()
    for n in range(1, len(files) + 1):
        comp = f'BMSModule{M}Section{n}'
        if f'const {comp} =' not in r:
            prev = f'BMSModule{M}Section{n - 1}'
            decl = (f"const {comp} = lazy(() =>\n  withTimeout(() =>\n    trackImport('{comp}', () => import('@/pages/upskilling/{comp}'))\n  )\n);\n")
            m = re.search(r'const ' + prev + r' = lazy\(\(\) =>[\s\S]*?\n\);\n', r)
            r = r[: m.end()] + decl + r[m.end():]
            route = f'    <Route path="bms-module-{M}-section-{n}" element={{<{comp} />}} />\n'
            k = r.index(f'<Route path="bms-module-{M}-section-{n - 1}"')
            k = r.index('\n', k) + 1
            r = r[:k] + route + r[k:]
            print('added route', comp)
    rp.write_text(r)
    print(f'Module {M}: {len(files)} pages, {fmt(total)}')


if __name__ == '__main__':
    main(int(sys.argv[1]))
