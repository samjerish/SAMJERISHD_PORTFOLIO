import os
import re

src_dir = 'src'

font_replacements = [
    (r"font-family:\s*(?:'Oswald'|Oswald),\s*(?:'Anton'|Anton),\s*Impact,\s*(?:'Space Grotesk'|Space Grotesk),\s*sans-serif;", "font-family: var(--font-heading);"),
    (r"font-family:\s*(?:'Oswald'|Oswald),\s*(?:'Anton'|Anton),\s*Impact,\s*sans-serif;", "font-family: var(--font-heading);"),
    (r"font-family:\s*'Space Grotesk',\s*sans-serif;", "font-family: var(--font-heading);"),
    (r"font-family:\s*'Great Vibes',\s*cursive;", "font-family: var(--font-heading);"),
    (r"font-family:\s*'Caveat',\s*cursive;", "font-family: var(--font-heading);"),
    (r"font-family:\s*'Times New Roman',\s*Times,\s*serif;", "font-family: var(--font-heading);"),
    (r"font-family:\s*monospace;", "font-family: var(--font-mono);"),
    (r"font-family:\s*system-ui,\s*-apple-system,\s*sans-serif;", "font-family: var(--font-primary);"),
    (r"font-family:\s*var\(--font-family\);", "font-family: var(--font-primary);"),
]

for root, _, files in os.walk(src_dir):
    for file in files:
        if file.endswith('.css'):
            path = os.path.join(root, file)
            with open(path, 'r') as f:
                content = f.read()
            
            new_content = content
            for pattern, replacement in font_replacements:
                new_content = re.sub(pattern, replacement, new_content, flags=re.IGNORECASE)
            
            if new_content != content:
                with open(path, 'w') as f:
                    f.write(new_content)
                print(f"Updated {path}")
