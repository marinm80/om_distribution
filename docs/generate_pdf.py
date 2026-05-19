"""
Generate OM_DISTRIBUTION_GUIDE.pdf from OM_DISTRIBUTION_GUIDE.md
Run: py generate_pdf.py
"""

import re
from pathlib import Path
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import mm
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_RIGHT
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    HRFlowable, Preformatted, KeepTogether
)
from reportlab.platypus.flowables import Flowable

# ── Palette ─────────────────────────────────────────────────────────────────
DARK    = colors.HexColor('#1a1a1a')
TEAL    = colors.HexColor('#009664')
LIGHT   = colors.HexColor('#f5f5f5')
BORDER  = colors.HexColor('#d0d0d0')
MUTED   = colors.HexColor('#666666')
WHITE   = colors.white
CODE_BG = colors.HexColor('#f0f0f0')

PAGE_W, PAGE_H = A4
MARGIN = 20 * mm

# ── Custom cover header flowable ─────────────────────────────────────────────
class CoverHeader(Flowable):
    def __init__(self, title, subtitle, version):
        Flowable.__init__(self)
        self.title    = title
        self.subtitle = subtitle
        self.version  = version
        self.width    = PAGE_W - 2 * MARGIN
        self.height   = 55 * mm

    def draw(self):
        c = self.canv
        w, h = self.width, self.height

        # Dark background
        c.setFillColor(DARK)
        c.roundRect(0, 0, w, h, 6, fill=1, stroke=0)

        # Teal accent bar (left edge)
        c.setFillColor(TEAL)
        c.roundRect(0, 0, 5, h, 3, fill=1, stroke=0)

        # Title
        c.setFillColor(WHITE)
        c.setFont('Helvetica-Bold', 22)
        c.drawString(18, h - 22, self.title)

        # Subtitle
        c.setFillColor(colors.HexColor('#cccccc'))
        c.setFont('Helvetica', 11)
        c.drawString(18, h - 38, self.subtitle)

        # Version pill
        c.setFillColor(TEAL)
        pill_text = self.version
        c.setFont('Helvetica-Bold', 9)
        text_w = c.stringWidth(pill_text, 'Helvetica-Bold', 9)
        px = w - text_w - 24
        py = h - 30
        c.roundRect(px - 6, py - 4, text_w + 14, 16, 4, fill=1, stroke=0)
        c.setFillColor(WHITE)
        c.drawString(px + 1, py + 1, pill_text)


# ── Styles ───────────────────────────────────────────────────────────────────
def build_styles():
    base = getSampleStyleSheet()

    s = {}

    s['body'] = ParagraphStyle('body',
        fontName='Helvetica', fontSize=9.5, leading=15,
        textColor=DARK, spaceAfter=6)

    s['h1'] = ParagraphStyle('h1',
        fontName='Helvetica-Bold', fontSize=16, leading=22,
        textColor=DARK, spaceBefore=18, spaceAfter=6,
        borderPad=(0, 0, 4, 0))

    s['h2'] = ParagraphStyle('h2',
        fontName='Helvetica-Bold', fontSize=12, leading=17,
        textColor=TEAL, spaceBefore=14, spaceAfter=4)

    s['h3'] = ParagraphStyle('h3',
        fontName='Helvetica-Bold', fontSize=10.5, leading=15,
        textColor=DARK, spaceBefore=10, spaceAfter=3)

    s['bullet'] = ParagraphStyle('bullet',
        fontName='Helvetica', fontSize=9.5, leading=15,
        textColor=DARK, leftIndent=14, bulletIndent=4,
        spaceAfter=2)

    s['code_inline'] = ParagraphStyle('code_inline',
        fontName='Courier', fontSize=8.5, leading=13,
        textColor=colors.HexColor('#c0392b'))

    s['footer'] = ParagraphStyle('footer',
        fontName='Helvetica', fontSize=8, textColor=MUTED,
        alignment=TA_CENTER)

    return s


# ── Table helper ─────────────────────────────────────────────────────────────
def make_table(rows):
    col_count = max(len(r) for r in rows)
    available = PAGE_W - 2 * MARGIN
    col_w = available / col_count

    data = [[Paragraph(str(cell).strip(), ParagraphStyle('tc',
                fontName='Helvetica', fontSize=8.5, leading=13,
                textColor=DARK))
             for cell in row] for row in rows]

    # Header row styling
    data[0] = [Paragraph(str(cell).strip(), ParagraphStyle('th',
                fontName='Helvetica-Bold', fontSize=8.5, leading=13,
                textColor=WHITE))
               for cell in rows[0]]

    t = Table(data, colWidths=[col_w] * col_count, repeatRows=1)
    t.setStyle(TableStyle([
        ('BACKGROUND',  (0, 0), (-1, 0),  DARK),
        ('BACKGROUND',  (0, 1), (-1, -1), LIGHT),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [WHITE, LIGHT]),
        ('GRID',        (0, 0), (-1, -1), 0.4, BORDER),
        ('LEFTPADDING',  (0, 0), (-1, -1), 8),
        ('RIGHTPADDING', (0, 0), (-1, -1), 8),
        ('TOPPADDING',   (0, 0), (-1, -1), 5),
        ('BOTTOMPADDING',(0, 0), (-1, -1), 5),
        ('VALIGN',      (0, 0), (-1, -1), 'TOP'),
    ]))
    return t


# ── Code block helper ─────────────────────────────────────────────────────────
def make_code_block(code_text):
    available = PAGE_W - 2 * MARGIN

    pre = Preformatted(code_text.rstrip(),
        ParagraphStyle('pre',
            fontName='Courier', fontSize=8, leading=12,
            textColor=colors.HexColor('#2c2c2c'),
            leftIndent=10, rightIndent=10))

    t = Table([[pre]], colWidths=[available])
    t.setStyle(TableStyle([
        ('BACKGROUND',   (0, 0), (-1, -1), CODE_BG),
        ('BOX',          (0, 0), (-1, -1), 0.5, BORDER),
        ('LEFTPADDING',  (0, 0), (-1, -1), 10),
        ('RIGHTPADDING', (0, 0), (-1, -1), 10),
        ('TOPPADDING',   (0, 0), (-1, -1), 8),
        ('BOTTOMPADDING',(0, 0), (-1, -1), 8),
        ('ROUNDEDCORNERS', [4]),
    ]))
    return t


# ── Inline markup ─────────────────────────────────────────────────────────────
def md_inline(text, style):
    """Convert basic inline markdown to reportlab XML."""
    # 1. Extract inline code spans first (protect them from other transforms)
    placeholders = {}
    def stash_code(m):
        key = f'\x00CODE{len(placeholders)}\x00'
        # Escape XML inside code, no further markdown processing
        safe = m.group(1).replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')
        placeholders[key] = f'<font name="Courier" color="#c0392b">{safe}</font>'
        return key
    text = re.sub(r'`([^`]+)`', stash_code, text)

    # 2. Escape remaining XML special chars
    text = text.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')

    # 3. Bold+italic, bold, italic
    text = re.sub(r'\*\*\*(.+?)\*\*\*', r'<b><i>\1</i></b>', text)
    text = re.sub(r'\*\*(.+?)\*\*',     r'<b>\1</b>', text)
    text = re.sub(r'\*(.+?)\*',         r'<i>\1</i>', text)

    # 4. Restore code placeholders
    for key, val in placeholders.items():
        text = text.replace(key, val)

    return Paragraph(text, style)


# ── Markdown parser → flowables ───────────────────────────────────────────────
def parse_md(md_text, styles):
    lines  = md_text.splitlines()
    story  = []
    i      = 0
    n      = len(lines)

    # Extract cover info from first lines
    cover_title    = 'OM Distribution'
    cover_subtitle = 'Technical Project Guide'
    cover_version  = 'v2.0.0'

    for line in lines[:5]:
        if line.startswith('# '):
            cover_title = line[2:].strip()
        m = re.search(r'\*\*Version\*\*[:\s]+([\d.]+)', line)
        if m:
            cover_version = 'v' + m.group(1)
        m2 = re.search(r'\*\*(.+?)\*\*\s*\|', line)
        if m2:
            cover_subtitle = m2.group(1)

    story.append(CoverHeader(cover_title, cover_subtitle, cover_version))
    story.append(Spacer(1, 8 * mm))

    skip_cover = True   # skip the first h1 and version line — already in header

    while i < n:
        line = lines[i]

        # Skip first h1 and adjacent version/author line (in cover header)
        if skip_cover:
            if line.startswith('# ') or re.match(r'^\*\*Version\*\*', line) or line.strip() == '---':
                i += 1
                continue
            else:
                skip_cover = False

        # Blank line
        if not line.strip():
            story.append(Spacer(1, 3))
            i += 1
            continue

        # Horizontal rule
        if re.match(r'^---+$', line.strip()):
            story.append(Spacer(1, 2))
            story.append(HRFlowable(width='100%', thickness=0.5, color=BORDER))
            story.append(Spacer(1, 4))
            i += 1
            continue

        # Fenced code block
        if line.startswith('```'):
            i += 1
            code_lines = []
            while i < n and not lines[i].startswith('```'):
                code_lines.append(lines[i])
                i += 1
            i += 1  # closing ```
            story.append(Spacer(1, 2))
            story.append(make_code_block('\n'.join(code_lines)))
            story.append(Spacer(1, 6))
            continue

        # Markdown table
        if '|' in line and i + 1 < n and re.match(r'^\|[\s\-:|]+\|', lines[i + 1]):
            rows = []
            while i < n and '|' in lines[i]:
                cells = [c.strip() for c in lines[i].strip().strip('|').split('|')]
                # Skip separator row
                if not all(re.match(r'^[-:]+$', c.replace(' ', '')) for c in cells):
                    rows.append(cells)
                i += 1
            if rows:
                story.append(Spacer(1, 4))
                story.append(make_table(rows))
                story.append(Spacer(1, 8))
            continue

        # Headings
        m = re.match(r'^(#{1,3})\s+(.+)', line)
        if m:
            level = len(m.group(1))
            text  = m.group(2).strip()
            if level == 1:
                story.append(Spacer(1, 4))
                story.append(md_inline(text, styles['h1']))
                story.append(HRFlowable(width='100%', thickness=1.5, color=TEAL, spaceAfter=4))
            elif level == 2:
                story.append(md_inline(text, styles['h2']))
            else:
                story.append(md_inline(text, styles['h3']))
            i += 1
            continue

        # Bullet list
        if re.match(r'^[-*]\s+', line):
            text = re.sub(r'^[-*]\s+', '', line)
            story.append(md_inline('• ' + text, styles['bullet']))
            i += 1
            continue

        # Numbered list
        if re.match(r'^\d+\.\s+', line):
            text = re.sub(r'^\d+\.\s+', '', line)
            story.append(md_inline('• ' + text, styles['bullet']))
            i += 1
            continue

        # Normal paragraph
        story.append(md_inline(line, styles['body']))
        i += 1

    return story


# ── Page template (header/footer) ────────────────────────────────────────────
def on_page(canvas, doc):
    canvas.saveState()
    w, h = A4

    # Top teal line
    canvas.setStrokeColor(TEAL)
    canvas.setLineWidth(1.5)
    canvas.line(MARGIN, h - 12 * mm, w - MARGIN, h - 12 * mm)

    # Footer
    canvas.setFont('Helvetica', 7.5)
    canvas.setFillColor(MUTED)
    canvas.drawString(MARGIN, 10 * mm, 'OM Distribution — Internal Documentation')
    canvas.drawRightString(w - MARGIN, 10 * mm, f'Page {doc.page}')

    canvas.restoreState()


# ── Main ──────────────────────────────────────────────────────────────────────
def main():
    here    = Path(__file__).parent
    src     = here / 'OM_DISTRIBUTION_GUIDE.md'
    out     = here / 'OM_DISTRIBUTION_GUIDE.pdf'

    md_text = src.read_text(encoding='utf-8')
    styles  = build_styles()

    doc = SimpleDocTemplate(
        str(out),
        pagesize=A4,
        leftMargin=MARGIN, rightMargin=MARGIN,
        topMargin=18 * mm, bottomMargin=18 * mm,
        title='OM Distribution — Technical Guide',
        author='OM Distribution',
    )

    story = parse_md(md_text, styles)
    doc.build(story, onFirstPage=on_page, onLaterPages=on_page)
    print(f'PDF generated: {out}')


if __name__ == '__main__':
    main()
