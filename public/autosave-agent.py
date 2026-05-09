#!/usr/bin/env python3
"""
Autosave Agent — saves conversation to local registry + categorizes + indexes.

Usage:
  agent.py save --topic "..." --summary "..." [--category X] [--tags a,b,c] [--links url1,url2]
  agent.py recent [--limit 10]
  agent.py categories
  agent.py stats

Registry layout:
  ~/.autosave/registry.json          — index of all saves with metadata
  ~/.autosave/conversations/<id>.md  — full content per save
"""
import json, os, sys, argparse, hashlib, datetime
from pathlib import Path

ROOT = Path.home() / '.autosave'
REGISTRY = ROOT / 'registry.json'
CONV_DIR = ROOT / 'conversations'

CATEGORIES = {
    'client':    {'emoji': '🧑', 'he': 'לקוח / פרויקט'},
    'lead':      {'emoji': '💼', 'he': 'ליד / מכירות'},
    'tool':      {'emoji': '🛠️', 'he': 'פיתוח כלי / סקיל'},
    'knowledge': {'emoji': '🧠', 'he': 'ידע / לימוד'},
    'task':      {'emoji': '📋', 'he': 'משימה אישית'},
    'debug':     {'emoji': '🐛', 'he': 'תיקון / debug'},
    'idea':      {'emoji': '💭', 'he': 'רעיון / סיעור מוחות'},
    'content':   {'emoji': '✍️', 'he': 'תוכן / פוסט / סרטון'},
    'meta':      {'emoji': '🌀', 'he': 'מטא - על הסוכנים עצמם'},
    'other':     {'emoji': '📌', 'he': 'אחר'},
}


def load_registry():
    if REGISTRY.exists():
        return json.loads(REGISTRY.read_text(encoding='utf-8'))
    return {'version': 1, 'created': datetime.datetime.now().isoformat(), 'saves': []}


def save_registry(reg):
    ROOT.mkdir(exist_ok=True)
    REGISTRY.write_text(json.dumps(reg, ensure_ascii=False, indent=2), encoding='utf-8')


def make_id(topic, ts):
    h = hashlib.sha256(f'{topic}{ts}'.encode()).hexdigest()[:8]
    return f'{ts[:10]}-{h}'


def cmd_save(args):
    reg = load_registry()
    now = datetime.datetime.now().isoformat()
    sid = make_id(args.topic, now)

    entry = {
        'id': sid,
        'ts': now,
        'topic': args.topic,
        'category': args.category or 'other',
        'tags': [t.strip() for t in (args.tags or '').split(',') if t.strip()],
        'links': [l.strip() for l in (args.links or '').split(',') if l.strip()],
        'summary_preview': args.summary[:200],
    }
    reg['saves'].insert(0, entry)
    save_registry(reg)

    # Save full content
    CONV_DIR.mkdir(exist_ok=True)
    md = f"""# {args.topic}

**מזהה:** {sid}
**תאריך:** {now}
**קטגוריה:** {CATEGORIES.get(entry['category'], CATEGORIES['other'])['he']} {CATEGORIES.get(entry['category'], CATEGORIES['other'])['emoji']}
**תגיות:** {', '.join(entry['tags']) if entry['tags'] else '-'}

## סיכום מפורט
{args.summary}

## נקודות חשובות
{args.key_points or '-'}

## קישורים וקבצים
{chr(10).join('- ' + l for l in entry['links']) if entry['links'] else '-'}

## פרומפטים שעבדו
{args.prompts or '-'}
"""
    (CONV_DIR / f'{sid}.md').write_text(md, encoding='utf-8')

    print(json.dumps({'ok': True, 'id': sid, 'saved_to': str(CONV_DIR / f'{sid}.md')}, ensure_ascii=False))


def cmd_recent(args):
    reg = load_registry()
    saves = reg['saves'][:args.limit]
    if args.json:
        print(json.dumps(saves, ensure_ascii=False, indent=2))
        return
    print(f"\n📚 {len(saves)} שיחות אחרונות מתוך {len(reg['saves'])} סה\"כ:\n")
    for s in saves:
        cat = CATEGORIES.get(s['category'], CATEGORIES['other'])
        date = s['ts'][:10]
        print(f"  {cat['emoji']} {date} | {s['topic'][:60]}")
        if s.get('tags'):
            print(f"     תגיות: {', '.join(s['tags'])}")


def cmd_categories(args):
    reg = load_registry()
    counts = {}
    for s in reg['saves']:
        counts[s.get('category', 'other')] = counts.get(s.get('category', 'other'), 0) + 1
    print("\n📊 התפלגות קטגוריות:\n")
    for cat, info in CATEGORIES.items():
        c = counts.get(cat, 0)
        if c > 0:
            print(f"  {info['emoji']} {info['he']:25} {c}")


def cmd_stats(args):
    reg = load_registry()
    saves = reg['saves']
    n = len(saves)
    if n == 0:
        print("📭 הסוכן עוד לא שמר שום שיחה.")
        return
    first = saves[-1]['ts'][:10]
    last = saves[0]['ts'][:10]
    print(f"""
📊 סטטיסטיקה של autosave:
   סה"כ שיחות: {n}
   ראשונה: {first}
   אחרונה: {last}
   קטגוריות פעילות: {len(set(s.get('category', 'other') for s in saves))}
   תגיות ייחודיות: {len(set(t for s in saves for t in s.get('tags', [])))}
   קבצי .md: {len(list(CONV_DIR.glob('*.md'))) if CONV_DIR.exists() else 0}
""")


def cmd_search(args):
    reg = load_registry()
    q = args.query.lower()
    matches = []
    for s in reg['saves']:
        # Search in topic, tags, summary preview
        haystack = ' '.join([
            s.get('topic', ''),
            ' '.join(s.get('tags', [])),
            s.get('summary_preview', ''),
            s.get('category', ''),
        ]).lower()
        if q in haystack:
            matches.append(s)

    if not matches:
        print(f"🔍 לא נמצאו תוצאות עבור '{args.query}'")
        return

    print(f"\n🔍 {len(matches)} תוצאות עבור '{args.query}':\n")
    for s in matches[:args.limit]:
        cat = CATEGORIES.get(s['category'], CATEGORIES['other'])
        print(f"  {cat['emoji']} {s['ts'][:10]} | {s['topic'][:60]}")
        print(f"     ID: {s['id']}")
        if s.get('summary_preview'):
            print(f"     {s['summary_preview'][:100]}...")
        print()


def main():
    p = argparse.ArgumentParser()
    sub = p.add_subparsers(dest='cmd', required=True)

    s = sub.add_parser('save')
    s.add_argument('--topic', required=True)
    s.add_argument('--summary', required=True)
    s.add_argument('--category', choices=list(CATEGORIES.keys()))
    s.add_argument('--tags', help='comma-separated')
    s.add_argument('--links', help='comma-separated URLs')
    s.add_argument('--key-points', dest='key_points')
    s.add_argument('--prompts')

    r = sub.add_parser('recent')
    r.add_argument('--limit', type=int, default=10)
    r.add_argument('--json', action='store_true')

    sub.add_parser('categories')
    sub.add_parser('stats')

    sr = sub.add_parser('search')
    sr.add_argument('query')
    sr.add_argument('--limit', type=int, default=10)

    args = p.parse_args()
    {'save': cmd_save, 'recent': cmd_recent, 'categories': cmd_categories, 'stats': cmd_stats, 'search': cmd_search}[args.cmd](args)


if __name__ == '__main__':
    main()
