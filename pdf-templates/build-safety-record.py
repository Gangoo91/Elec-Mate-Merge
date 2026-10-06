"""Inline the embedded fonts into the Safety Record template.

The source (safety-record.src.html) stays readable; the fonts (~220 KB of
base64 woff2, shared with the Calculation Report) are copied in at build.
Run:  python3 pdf-templates/build-safety-record.py
"""
import re, pathlib
here = pathlib.Path(__file__).parent
fonts = '\n'.join(re.findall(r"@font-face\s*\{[^}]*\}", (here / 'calculation-report.html').read_text()))
src = (here / 'safety-record.src.html').read_text()
assert '/*FONTS*/' in src
(here / 'safety-record.html').write_text(src.replace('/*FONTS*/', fonts))
print('built safety-record.html', len(src) + len(fonts), 'bytes')
