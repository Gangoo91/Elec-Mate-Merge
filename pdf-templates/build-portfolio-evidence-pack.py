"""Inline the embedded fonts into the Portfolio evidence pack template (ELE-1881).

Source: portfolio-evidence-pack.src.html (readable). Inter and IBM Plex Mono
(base64 woff2, shared with the Calculation Report) are copied in at build;
Sora is not used. Upload the built file as the PDFMonkey template body.
Run:  python3 pdf-templates/build-portfolio-evidence-pack.py
"""
import re, pathlib
here = pathlib.Path(__file__).parent
faces = re.findall(r"@font-face\s*\{[^}]*\}", (here / 'calculation-report.html').read_text())
fonts = '\n'.join(f for f in faces if "'Sora'" not in f)
src = (here / 'portfolio-evidence-pack.src.html').read_text()
assert '/*FONTS*/' in src
(here / 'portfolio-evidence-pack.html').write_text(src.replace('/*FONTS*/', fonts))
print('built portfolio-evidence-pack.html', len(src) + len(fonts), 'bytes')
