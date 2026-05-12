#!/usr/bin/env python3
"""
Reads content/ and generates js/data.js.
Run: python3 scripts/build.py
"""

import json
import os
import re
import glob
import yaml

CONTENT_DIR = os.path.join(os.path.dirname(__file__), '..', 'content')
OUTPUT_FILE = os.path.join(os.path.dirname(__file__), '..', 'js', 'data.js')


def parse_md(path):
    with open(path, encoding='utf-8') as f:
        text = f.read()

    match = re.match(r'^---\n(.*?)\n---\n(.*)', text, re.DOTALL)
    if not match:
        raise ValueError(f'No frontmatter found in {path}')

    frontmatter = yaml.safe_load(match.group(1))
    body_text = match.group(2).strip()
    body_items = [p.strip() for p in body_text.split('\n\n') if p.strip()]
    frontmatter['body'] = body_items
    return frontmatter


def md_to_html(text):
    html = []
    for para in text.strip().split('\n\n'):
        para = para.strip()
        if not para:
            continue
        para = re.sub(r'\*\*(.+?)\*\*', r'<strong>\1</strong>', para)
        para = para.replace('\n', '<br/>')
        html.append(f'<p>{para}</p>')
    return ''.join(html)


def parse_domain_md(path):
    with open(path, encoding='utf-8') as f:
        text = f.read()

    match = re.match(r'^---\n(.*?)\n---\n(.*)', text, re.DOTALL)
    if not match:
        raise ValueError(f'No frontmatter found in {path}')

    frontmatter = yaml.safe_load(match.group(1))
    sections = match.group(2).split('\n---\n')
    frontmatter['wat'] = md_to_html(sections[0]) if len(sections) > 0 else ''
    frontmatter['waarom'] = md_to_html(sections[1]) if len(sections) > 1 else ''
    frontmatter.setdefault('sources', [])
    return frontmatter


def load_yaml(path):
    with open(path, encoding='utf-8') as f:
        return yaml.safe_load(f)


def js_value(v):
    return json.dumps(v, ensure_ascii=False)


def render_rings(rings):
    lines = ['const RINGS = [']
    for r in rings:
        lines.append('  {')
        lines.append(f'    id: {js_value(r["id"])},')
        lines.append(f'    label: {js_value(r["label"])},')
        lines.append(f'    short: {js_value(r["short"])},')
        lines.append(f'    description: {js_value(r["description"])},')
        lines.append(f'    color: {js_value(r["color"])},')
        lines.append(f'    fg: {js_value(r["fg"])},')
        lines.append('  },')
    lines.append('];')
    return '\n'.join(lines)


def render_domains(domains):
    lines = ['const DOMAINS = [']
    for d in domains:
        lines.append('  {')
        lines.append(f'    id: {js_value(d["id"])}, nr: {d["nr"]}, ring: {js_value(d["ring"])},')
        lines.append(f'    title: {js_value(d["title"])},')
        lines.append(f'    short: {js_value(d["short"])},')
        lines.append(f'    wat: {js_value(d["wat"])},')
        lines.append(f'    waarom: {js_value(d["waarom"])},')
        lines.append(f'    sources: {js_value(d["sources"])},')
        lines.append(f'    practices: {js_value(d.get("practices", []))},')
        lines.append(f'    samenhang: {js_value(d.get("samenhang", []))},')
        lines.append('  },')
    lines.append('];')
    return '\n'.join(lines)


def render_practices(practices):
    lines = ['const PRACTICES = [']
    for p in practices:
        lines.append('  {')
        lines.append(f'    id: {js_value(p["id"])}, title: {js_value(p["title"])},')
        lines.append(f'    summary: {js_value(p["summary"])},')
        lines.append(f'    domains: {js_value(p["domains"])}, phases: {js_value(p["phases"])}, levels: {js_value(p["levels"])},')
        lines.append(f'    body: {js_value(p["body"])},')
        lines.append(f'    sources: {js_value(p["sources"])},')
        lines.append('  },')
    lines.append('];')
    return '\n'.join(lines)


def resolve_sources(sources, bronnen_by_id):
    resolved = []
    for s in sources:
        if isinstance(s, str) and s in bronnen_by_id:
            resolved.append(bronnen_by_id[s])
        else:
            resolved.append(s)
    return resolved


def main():
    rings = load_yaml(os.path.join(CONTENT_DIR, 'rings.yaml'))
    meta = load_yaml(os.path.join(CONTENT_DIR, 'filters.yaml'))
    home = load_yaml(os.path.join(CONTENT_DIR, 'home.yaml'))
    over = load_yaml(os.path.join(CONTENT_DIR, 'context_raamwerk.yaml'))
    bronnen = load_yaml(os.path.join(CONTENT_DIR, 'bronnen.yaml'))
    bronnen_by_id = {b['id']: b for b in bronnen}

    domain_files = glob.glob(os.path.join(CONTENT_DIR, 'domains', '*.md'))
    domains = sorted([parse_domain_md(f) for f in domain_files], key=lambda d: d['nr'])
    for d in domains:
        d['sources'] = resolve_sources(d.get('sources', []), bronnen_by_id)

    practice_files = sorted(glob.glob(os.path.join(CONTENT_DIR, 'practices', '*.md')))
    practices = [parse_md(f) for f in practice_files]
    for p in practices:
        p['sources'] = resolve_sources(p.get('sources', []), bronnen_by_id)

    output = '\n\n'.join([
        '// Raamwerk Digitale Assistenten — gegenereerd door scripts/build.py',
        render_rings(rings),
        render_domains(domains),
        f'const PHASES  = {js_value(meta["phases"])};',
        f'const LEVELS  = {js_value(meta["levels"])};',
        render_practices(practices),
        f'const HOME = {js_value(home)};',
        f'const OVER = {js_value(over)};',
        'window.RAAMWERK = { RINGS, DOMAINS, PHASES, LEVELS, PRACTICES, HOME, OVER };',
    ])

    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        f.write(output + '\n')

    print(f'Written {OUTPUT_FILE} ({len(practices)} practices, {len(domains)} domains)')


if __name__ == '__main__':
    main()
