#!/usr/bin/env python3
"""
Script to convert Temas 3-6 from linear sections to tabbed interface
"""

import re
import sys

# Tab CSS to insert after .section styles
TAB_CSS = """
        .tabs {
            display: flex;
            gap: 10px;
            margin-bottom: 20px;
            flex-wrap: wrap;
            background: rgba(255, 255, 255, 0.9);
            padding: 15px;
            border-radius: 15px;
        }

        .tab-button {
            background: #e0e0e0;
            border: none;
            padding: 12px 25px;
            border-radius: 10px;
            cursor: pointer;
            font-size: 1em;
            font-weight: 600;
            transition: all 0.3s ease;
            color: #666;
        }

        .tab-button:hover {
            background: #d0d0d0;
        }

        .tab-button.active {
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
        }

        .content-section {
            display: none;
            background: rgba(255, 255, 255, 0.98);
            border-radius: 20px;
            padding: 35px;
            margin-bottom: 20px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            animation: fadeIn 0.4s ease;
        }

        .content-section.active {
            display: block;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }
"""

# Tab buttons HTML to insert after scoreboard
TAB_BUTTONS = """
        <!-- Tabs -->
        <div class="tabs">
            <button class="tab-button active" onclick="showTab('teoria')">📚 Teoría</button>
            <button class="tab-button" onclick="showTab('ejemplos')">💡 Ejemplos</button>
            <button class="tab-button" onclick="showTab('herramientas')">🧮 Herramientas</button>
            <button class="tab-button" onclick="showTab('practica')">✏️ Práctica</button>
            <button class="tab-button" onclick="showTab('resumen')">📋 Resumen</button>
        </div>
"""

# showTab JavaScript function to insert before other functions
SHOW_TAB_FUNCTION = """
        // Tab functionality
        function showTab(tabName) {
            const sections = document.querySelectorAll('.content-section');
            const buttons = document.querySelectorAll('.tab-button');
            
            sections.forEach(section => section.classList.remove('active'));
            buttons.forEach(button => button.classList.remove('active'));
            
            document.getElementById(tabName).classList.add('active');
            event.target.classList.add('active');
        }

"""

def convert_file(filepath):
    print(f"Processing {filepath}...")
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Step 1: Add tab CSS after .section h3 style
    pattern = r'(\.section h3 \{[^}]+\})'
    if re.search(pattern, content):
        content = re.sub(pattern, r'\1' + TAB_CSS, content)
        print("  ✓ Added tab CSS")
    
    # Step 2: Add tab buttons after scoreboard (before first section)
    # Find the closing of score-board and add tabs
    pattern = r'(</div>\s*</div>\s*)\s*<!-- TEORÍA|(\s*<div class="section">)'
    if re.search(r'</div>\s*</div>\s*\n\s*<div class="section">', content):
        content = re.sub(r'(</div>\s*</div>\s*)\n(\s*<div class="section">)', 
                        r'\1\n' + TAB_BUTTONS + r'\n\2', content, count=1)
        print("  ✓ Added tab buttons")
    
    # Step 3: Convert sections to content-sections with IDs
    section_map = {
        r'<div class="section">\s*<h2>📚 Teoría</h2>': '<div class="content-section active" id="teoria">\n            <h2>📚 Teoría</h2>',
        r'<div class="section">\s*<h2>💡 Ejemplos Resueltos</h2>': '<div class="content-section" id="ejemplos">\n            <h2>💡 Ejemplos Resueltos</h2>',
        r'<div class="section">\s*<h2>🛠️ Herramientas Interactivas</h2>': '<div class="content-section" id="herramientas">\n            <h2>🛠️ Herramientas Interactivas</h2>',
        r'<div class="section">\s*<h2>✏️ Ejercicios de Práctica</h2>': '<div class="content-section" id="practica">\n            <h2>✏️ Ejercicios de Práctica</h2>',
        r'<div class="section">\s*<h2>📋 Resumen</h2>': '<div class="content-section" id="resumen">\n            <h2>📋 Resumen</h2>',
    }
    
    for pattern, replacement in section_map.items():
        if re.search(pattern, content):
            content = re.sub(pattern, replacement, content)
            print(f"  ✓ Converted section: {replacement.split('id=')[1].split('"')[1]}")
    
    # Step 4: Add showTab function at beginning of script section
    # Find the first function or start of script
    pattern = r'(<script>\s*)'
    if re.search(pattern, content):
        content = re.sub(pattern, r'\1' + SHOW_TAB_FUNCTION, content)
        print("  ✓ Added showTab() function")
    
    # Write back
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"✅ Completed {filepath}\n")

def main():
    files = [
        '/var/www/html/admin/custom/mates_avanzadas/VOLUMEN_I/tema3_geometria_trig.html',
        '/var/www/html/admin/custom/mates_avanzadas/VOLUMEN_I/tema4_matrices.html',
        '/var/www/html/admin/custom/mates_avanzadas/VOLUMEN_I/tema5_sistemas.html',
        '/var/www/html/admin/custom/mates_avanzadas/VOLUMEN_I/tema6_vectorial_plano.html',
    ]
    
    for filepath in files:
        try:
            convert_file(filepath)
        except Exception as e:
            print(f"❌ Error processing {filepath}: {e}\n")
    
    print("🎉 All files processed!")

if __name__ == '__main__':
    main()
