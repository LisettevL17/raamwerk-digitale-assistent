#!/usr/bin/env python3
"""
Watches content/ for changes and reruns build.py automatically.
Run: python3 scripts/watch.py
"""

import os
import time
import subprocess
import sys

WATCH_DIR = os.path.join(os.path.dirname(__file__), '..', 'content')
BUILD_SCRIPT = os.path.join(os.path.dirname(__file__), 'build.py')


def snapshot(directory):
    state = {}
    for root, _, files in os.walk(directory):
        for f in files:
            path = os.path.join(root, f)
            state[path] = os.path.getmtime(path)
    return state


def rebuild():
    result = subprocess.run([sys.executable, BUILD_SCRIPT], capture_output=True, text=True)
    if result.returncode == 0:
        print(f'[{time.strftime("%H:%M:%S")}] Gebouwd: {result.stdout.strip()}')
    else:
        print(f'[{time.strftime("%H:%M:%S")}] Fout:\n{result.stderr.strip()}')


print(f'Watching content/ voor wijzigingen... (stop met Ctrl+C)\n')
rebuild()

last = snapshot(WATCH_DIR)

while True:
    time.sleep(1)
    current = snapshot(WATCH_DIR)
    if current != last:
        changed = [os.path.relpath(p) for p in current if current.get(p) != last.get(p)]
        print(f'Gewijzigd: {", ".join(changed)}')
        rebuild()
        last = current
