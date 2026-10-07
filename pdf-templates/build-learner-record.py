"""Inline the embedded fonts into the Learner Record template (ELE-2017).

Source: learner-record.src.html (readable). The fonts (~220 KB of base64
woff2, shared with the Calculation Report) are copied in at build.
Run:  python3 pdf-templates/build-learner-record.py
"""
import re, pathlib
here = pathlib.Path(__file__).parent
fonts = '\n'.join(re.findall(r"@font-face\s*\{[^}]*\}", (here / 'calculation-report.html').read_text()))
src = (here / 'learner-record.src.html').read_text()
assert '/*FONTS*/' in src
(here / 'learner-record.html').write_text(src.replace('/*FONTS*/', fonts))
print('built learner-record.html', len(src) + len(fonts), 'bytes')
