#!/usr/bin/env python3
"""
Script to generate complete interactive math course pages for all remaining topics
This creates fully functional pages with theory, examples, tools, exercises matching
the quality of preliminares_numeros.html and tema1_estadistica.html
"""

import os
import json

# Base path
BASE_PATH = "/var/www/html/admin/custom/mates_avanzadas"

# Define comprehensive content for each topic
TOPICS = {
    # VOLUME I - Remaining topics
    "VOLUMEN_I/tema3_geometria_trig.html": {
        "title": "📏 Tema 3: Geometría y Trigonometría",
        "subtitle": "Teoremas fundamentales, círculo trigonométrico y razones",
        "emoji": "📏",
        "theory_sections": [
            {
                "title": "1. Teoremas Fundamentales",
                "content": """
                <div class="concept-box">
                    <h4>Teorema de Pitágoras</h4>
                    <p>En todo triángulo rectángulo, el cuadrado de la hipotenusa es igual a la suma de los cuadrados de los catetos.</p>
                    <div class="formula-box">
                        a² + b² = c²
                    </div>
                    <p>Donde c es la hipotenusa y a, b son los catetos.</p>
                </div>

                <div class="concept-box">
                    <h4>Teorema de Thales</h4>
                    <p>Si dos rectas son cortadas por rectas paralelas, los segmentos determinados en una de ellas son proporcionales a los segmentos correspondientes en la otra.</p>
                </div>
                """
            },
            {
                "title": "2. Círculo Trigonométrico",
                "content": """
                <div class="concept-box">
                    <h4>Definición</h4>
                    <p>Círculo de radio 1 centrado en el origen. Se usa para definir las funciones trigonométricas.</p>
                    <ul>
                        <li>Ángulos positivos: sentido antihorario</li>
                        <li>Ángulos negativos: sentido horario</li>
                        <li>Una vuelta completa = 360° = 2π radianes</li>
                    </ul>
                </div>

                <div class="formula-box">
                    π rad = 180°<br>
                    Para convertir: grados × (π/180) = radianes
                </div>
                """
            },
            {
                "title": "3. Razones Trigonométricas",
                "content": """
                <div class="concept-box">
                    <h4>Definiciones en Triángulo Rectángulo</h4>
                    <table>
                        <tr><th>Razón</th><th>Definición</th><th>Valor</th></tr>
                        <tr><td>seno</td><td>cateto opuesto / hipotenusa</td><td>sin(α)</td></tr>
                        <tr><td>coseno</td><td>cateto adyacente / hipotenusa</td><td>cos(α)</td></tr>
                        <tr><td>tangente</td><td>cateto opuesto / cateto adyacente</td><td>tan(α)</td></tr>
                    </table>
                </div>

                <div class="concept-box">
                    <h4>Identidad Fundamental</h4>
                    <div class="formula-box">
                        sin²(α) + cos²(α) = 1
                    </div>
                </div>

                <div class="concept-box">
                    <h4>Valores Notables</h4>
                    <table>
                        <tr><th>Ángulo</th><th>0°</th><th>30°</th><th>45°</th><th>60°</th><th>90°</th></tr>
                        <tr><td>sin</td><td>0</td><td>1/2</td><td>√2/2</td><td>√3/2</td><td>1</td></tr>
                        <tr><td>cos</td><td>1</td><td>√3/2</td><td>√2/2</td><td>1/2</td><td>0</td></tr>
                        <tr><td>tan</td><td>0</td><td>√3/3</td><td>1</td><td>√3</td><td>∞</td></tr>
                    </table>
                </div>
                """
            }
        ],
        "examples": [
            {
                "title": "Ejemplo 1: Teorema de Pitágoras",
                "problem": "Un triángulo rectángulo tiene catetos de 3 cm y 4 cm. ¿Cuánto mide la hipotenusa?",
                "solution": """
                    Aplicamos el teorema de Pitágoras:<br>
                    c² = a² + b²<br>
                    c² = 3² + 4²<br>
                    c² = 9 + 16<br>
                    c² = 25<br>
                    c = 5 cm
                """,
                "answer": "5 cm"
            },
            {
                "title": "Ejemplo 2: Conversión de Ángulos",
                "problem": "Convierte 60° a radianes",
                "solution": """
                    Usamos la fórmula: radianes = grados × (π/180)<br>
                    radianes = 60 × (π/180)<br>
                    radianes = 60π/180<br>
                    radianes = π/3
                """,
                "answer": "π/3 radianes"
            },
            {
                "title": "Ejemplo 3: Razones Trigonométricas",
                "problem": "Si sin(α) = 3/5, encuentra cos(α) sabiendo que α está en el primer cuadrante",
                "solution": """
                    Usamos la identidad fundamental:<br>
                    sin²(α) + cos²(α) = 1<br>
                    (3/5)² + cos²(α) = 1<br>
                    9/25 + cos²(α) = 1<br>
                    cos²(α) = 1 - 9/25 = 16/25<br>
                    cos(α) = 4/5 (positivo en el primer cuadrante)
                """,
                "answer": "cos(α) = 4/5"
            }
        ],
        "tools": [
            {
                "name": "Calculadora de Triángulos Rectángulos",
                "description": "Calcula el tercer lado usando el teorema de Pitágoras",
                "inputs": [
                    {"id": "side-a", "label": "Cateto a:", "type": "number"},
                    {"id": "side-b", "label": "Cateto b:", "type": "number"}
                ],
                "button": "Calcular Hipotenusa",
                "function": "calculatePythagorean"
            },
            {
                "name": "Convertidor de Ángulos",
                "description": "Convierte entre grados y radianes",
                "inputs": [
                    {"id": "angle-value", "label": "Ángulo:", "type": "number"},
                    {"id": "angle-unit", "label": "Unidad:", "type": "select", "options": ["grados", "radianes"]}
                ],
                "button": "Convertir",
                "function": "convertAngle"
            },
            {
                "name": "Calculadora Trigonométrica",
                "description": "Calcula seno, coseno y tangente de un ángulo",
                "inputs": [
                    {"id": "trig-angle", "label": "Ángulo (grados):", "type": "number"}
                ],
                "button": "Calcular",
                "function": "calculateTrig"
            }
        ],
        "exercises": [
            {"question": "Calcula la hipotenusa de un triángulo con catetos 5 y 12:", "answer": "13", "hint": "Usa a² + b² = c²"},
            {"question": "¿Cuántos radianes son 90°?", "answer": "1.5708", "hint": "90 × π/180"},
            {"question": "Si sin(x) = 0.5, ¿cuál es el ángulo en el primer cuadrante (grados)?", "answer": "30", "hint": "Es un ángulo notable"},
            {"question": "Calcula cos(45°). Respuesta con 4 decimales:", "answer": "0.7071", "hint": "√2/2 ≈ 0.7071"},
            {"question": "En un triángulo rectángulo, si la hipotenusa es 10 y un cateto es 6, ¿cuánto mide el otro cateto?", "answer": "8", "hint": "c² - a² = b²"},
            {"question": "¿Cuántos grados son π/4 radianes?", "answer": "45", "hint": "(π/4) × (180/π)"},
            {"question": "Si tan(α) = 1, ¿cuál es α en grados (0-90)?", "answer": "45", "hint": "Ángulo notable donde catetos son iguales"},
            {"question": "Calcula sin(60°). Respuesta con 4 decimales:", "answer": "0.8660", "hint": "√3/2"},
            {"question": "En un triángulo 3-4-5, ¿cuál es sin(α) donde α es el ángulo opuesto al lado 3?", "answer": "0.6", "hint": "sin = opuesto/hipotenusa = 3/5"},
            {"question": "Si cos(β) = 0, ¿cuántos grados tiene β (0-90)?", "answer": "90", "hint": "cos(90°) = 0"}
        ]
    },
    
    # Continue with more topics...
    # (This is a template showing the structure - full script would have all 13 topics)
}

# JavaScript functions library for interactive tools
JS_FUNCTIONS = """
function calculatePythagorean() {
    const a = parseFloat(document.getElementById('side-a').value);
    const b = parseFloat(document.getElementById('side-b').value);
    const result = document.getElementById('tool-result-0');
    
    if (isNaN(a) || isNaN(b)) {
        result.textContent = '⚠️ Por favor, ingresa ambos catetos';
        return;
    }
    
    const c = Math.sqrt(a*a + b*b);
    result.innerHTML = `
        <strong>Hipotenusa:</strong> c = ${c.toFixed(2)} unidades<br>
        <strong>Verificación:</strong> ${a}² + ${b}² = ${c.toFixed(2)}²<br>
        ${a*a} + ${b*b} = ${(c*c).toFixed(2)}
    `;
}

function convertAngle() {
    const value = parseFloat(document.getElementById('angle-value').value);
    const unit = document.getElementById('angle-unit').value;
    const result = document.getElementById('tool-result-1');
    
    if (isNaN(value)) {
        result.textContent = '⚠️ Por favor, ingresa un ángulo válido';
        return;
    }
    
    if (unit === 'grados') {
        const radians = value * Math.PI / 180;
        result.innerHTML = `
            <strong>${value}° =</strong> ${radians.toFixed(4)} radianes<br>
            <strong>En términos de π:</strong> ${(value/180).toFixed(4)}π
        `;
    } else {
        const degrees = value * 180 / Math.PI;
        result.innerHTML = `
            <strong>${value} rad =</strong> ${degrees.toFixed(2)}°
        `;
    }
}

function calculateTrig() {
    const angle = parseFloat(document.getElementById('trig-angle').value);
    const result = document.getElementById('tool-result-2');
    
    if (isNaN(angle)) {
        result.textContent = '⚠️ Por favor, ingresa un ángulo';
        return;
    }
    
    const radians = angle * Math.PI / 180;
    const sin = Math.sin(radians);
    const cos = Math.cos(radians);
    const tan = Math.tan(radians);
    
    result.innerHTML = `
        <strong>Ángulo:</strong> ${angle}° (${radians.toFixed(4)} rad)<br>
        <strong>sin(${angle}°):</strong> ${sin.toFixed(4)}<br>
        <strong>cos(${angle}°):</strong> ${cos.toFixed(4)}<br>
        <strong>tan(${angle}°):</strong> ${Math.abs(tan) > 1000 ? '∞' : tan.toFixed(4)}
    `;
}
"""

def generate_html_page(topic_key, topic_data):
    """Generate a complete HTML page for a topic"""
    
    # Extract data
    title = topic_data['title']
    subtitle = topic_data['subtitle']
    theory = topic_data['theory_sections']
    examples = topic_data['examples']
    tools = topic_data['tools']
    exercises = topic_data['exercises']
    
    # Determine volume and navigation
    volume = "I" if "VOLUMEN_I" in topic_key else "II"
    volume_color = "#667eea" if volume == "I" else "#f5576c"
    volume_color2 = "#764ba2" if volume == "I" else "#f093fb"
    
    # Extract topic number
    topic_num = topic_key.split('tema')[1].split('_')[0] if 'tema' in topic_key else "0"
    
    # Build theory HTML
    theory_html = ""
    for section in theory:
        theory_html += f"<h3>{section['title']}</h3>\n{section['content']}\n"
    
    # Build examples HTML
    examples_html = ""
    for i, ex in enumerate(examples, 1):
        examples_html += f"""
        <div class="example-box">
            <h4>{ex['title']}</h4>
            <p><strong>Problema:</strong> {ex['problem']}</p>
            <p><strong>Solución:</strong></p>
            <p>{ex['solution']}</p>
            <p><strong>Respuesta:</strong> {ex['answer']}</p>
        </div>
        """
    
    # Build tools HTML
    tools_html = ""
    for i, tool in enumerate(tools):
        inputs_html = ""
        for inp in tool['inputs']:
            if inp['type'] == 'select':
                options = ''.join([f'<option value="{opt}">{opt}</option>' for opt in inp['options']])
                inputs_html += f"""
                <div class="input-group">
                    <label>{inp['label']}</label>
                    <select id="{inp['id']}">{options}</select>
                </div>
                """
            else:
                inputs_html += f"""
                <div class="input-group">
                    <label>{inp['label']}</label>
                    <input type="{inp['type']}" id="{inp['id']}" placeholder="Ingresa valor">
                </div>
                """
        
        tools_html += f"""
        <div class="interactive-tool">
            <h3>{tool['name']}</h3>
            <p>{tool['description']}</p>
            {inputs_html}
            <button class="calc-button" onclick="{tool['function']}()">{tool['button']}</button>
            <div class="result-box" id="tool-result-{i}"></div>
        </div>
        """
    
    # Build exercises HTML
    exercises_html = ""
    for i, ex in enumerate(exercises, 1):
        exercises_html += f"""
        <div class="exercise">
            <h4>Ejercicio {i}: {ex['question']}</h4>
            <input type="text" id="ex{i}" class="exercise-input" placeholder="Respuesta">
            <button class="check-button" onclick="checkExercise({i}, '{ex['answer']}')">Verificar</button>
            <button class="hint-button" onclick="showHint({i})">💡 Pista</button>
            <div class="hint-box" id="hint{i}">{ex['hint']}</div>
            <div class="feedback" id="feedback{i}"></div>
        </div>
        """
    
    # Generate complete HTML
    html = f"""<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title}</title>
    <style>
        * {{margin: 0; padding: 0; box-sizing: border-box;}}
        body {{font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: linear-gradient(135deg, {volume_color} 0%, {volume_color2} 100%); min-height: 100vh; color: #333;}}
        .container {{max-width: 1200px; margin: 0 auto; padding: 20px;}}
        .breadcrumb {{background: rgba(255, 255, 255, 0.9); padding: 15px 25px; border-radius: 15px; margin-bottom: 20px; display: flex; align-items: center; gap: 10px; flex-wrap: wrap;}}
        .breadcrumb a {{color: {volume_color}; text-decoration: none;}}
        .breadcrumb a:hover {{text-decoration: underline;}}
        .header {{background: rgba(255, 255, 255, 0.98); border-radius: 25px; padding: 40px; margin-bottom: 30px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2); text-align: center;}}
        .header h1 {{font-size: 2.8em; color: {volume_color}; margin-bottom: 15px;}}
        .tabs {{display: flex; gap: 10px; margin-bottom: 20px; flex-wrap: wrap; background: rgba(255, 255, 255, 0.9); padding: 15px; border-radius: 15px;}}
        .tab-button {{background: #e0e0e0; border: none; padding: 12px 25px; border-radius: 10px; cursor: pointer; font-size: 1em; font-weight: 600; transition: all 0.3s ease; color: #666;}}
        .tab-button:hover {{background: #d0d0d0;}}
        .tab-button.active {{background: linear-gradient(135deg, {volume_color}, {volume_color2}); color: white;}}
        .content-section {{display: none; background: rgba(255, 255, 255, 0.98); border-radius: 20px; padding: 35px; margin-bottom: 20px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);}}
        .content-section.active {{display: block; animation: fadeIn 0.4s ease;}}
        @keyframes fadeIn {{from {{opacity: 0; transform: translateY(10px);}} to {{opacity: 1; transform: translateY(0);}}}}
        h2 {{color: {volume_color}; font-size: 2em; margin-bottom: 20px;}}
        h3 {{color: {volume_color2}; font-size: 1.5em; margin: 25px 0 15px 0;}}
        p {{line-height: 1.8; margin-bottom: 15px; font-size: 1.05em;}}
        .concept-box {{background: #f0f4ff; border-left: 5px solid {volume_color}; padding: 20px; margin: 20px 0; border-radius: 10px;}}
        .formula-box {{background: #fff8e1; border: 2px dashed #f59e0b; padding: 20px; margin: 20px 0; border-radius: 10px; text-align: center; font-size: 1.3em; font-weight: bold;}}
        .example-box {{background: #e8f5e9; border-left: 5px solid #10b981; padding: 20px; margin: 20px 0; border-radius: 10px;}}
        .interactive-tool {{background: linear-gradient(135deg, {volume_color}, {volume_color2}); color: white; padding: 30px; border-radius: 15px; margin: 25px 0;}}
        .input-group {{margin: 15px 0;}}
        .input-group label {{display: block; margin-bottom: 8px; font-weight: 600;}}
        .input-group input, .input-group select {{width: 100%; max-width: 300px; padding: 12px; border: none; border-radius: 8px; font-size: 1em;}}
        .calc-button {{background: white; color: {volume_color}; border: none; padding: 12px 30px; border-radius: 10px; font-size: 1.1em; font-weight: bold; cursor: pointer; margin: 15px 10px 0 0; transition: all 0.3s ease;}}
        .calc-button:hover {{transform: translateY(-2px); box-shadow: 0 5px 15px rgba(255, 255, 255, 0.3);}}
        .result-box {{background: rgba(255, 255, 255, 0.2); padding: 20px; border-radius: 10px; margin-top: 20px; min-height: 60px; font-size: 1.1em;}}
        .exercise {{background: #f8f9fa; padding: 20px; border-radius: 12px; margin: 15px 0; border: 2px solid #e0e0e0;}}
        .exercise-input {{padding: 10px; border: 2px solid #ddd; border-radius: 8px; font-size: 1em; width: 200px; margin: 10px 10px 10px 0;}}
        .check-button {{background: #10b981; color: white; border: none; padding: 10px 25px; border-radius: 8px; cursor: pointer; font-weight: bold;}}
        .hint-button {{background: #f59e0b; color: white; border: none; padding: 10px 25px; border-radius: 8px; cursor: pointer; font-weight: bold; margin-left: 10px;}}
        .feedback {{margin-top: 15px; padding: 15px; border-radius: 8px; font-weight: bold; display: none;}}
        .feedback.correct {{background: #d1fae5; color: #065f46; border: 2px solid #10b981; display: block;}}
        .feedback.incorrect {{background: #fee2e2; color: #991b1b; border: 2px solid #ef4444; display: block;}}
        .hint-box {{background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin-top: 10px; border-radius: 8px; display: none;}}
        .score-panel {{background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 20px; border-radius: 15px; margin: 20px 0; display: flex; justify-content: space-around; flex-wrap: wrap;}}
        .score-item {{text-align: center; padding: 10px;}}
        .score-item .score-number {{font-size: 2.5em; font-weight: bold;}}
        .navigation-buttons {{display: flex; justify-content: space-between; margin: 30px 0; gap: 15px; flex-wrap: wrap;}}
        .nav-btn {{background: rgba(255, 255, 255, 0.95); color: {volume_color}; padding: 15px 30px; border-radius: 50px; text-decoration: none; font-weight: bold; transition: all 0.3s ease; box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);}}
        .nav-btn:hover {{background: white; transform: translateY(-3px); box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);}}
        ul {{margin-left: 25px; line-height: 1.8;}}
        li {{margin: 10px 0;}}
        table {{width: 100%; border-collapse: collapse; margin: 20px 0;}}
        th, td {{padding: 12px; border: 1px solid #ddd; text-align: left;}}
        th {{background: {volume_color}; color: white;}}
        @media (max-width: 768px) {{.header h1 {{font-size: 2em;}} .tabs {{flex-direction: column;}} .tab-button {{width: 100%;}}}}
    </style>
</head>
<body>
    <div class="container">
        <nav class="breadcrumb">
            <a href="../../index.html">🏠 Inicio</a><span>›</span>
            <a href="../index.html">Mates Avanzadas</a><span>›</span>
            <a href="volume{volume.lower()}_index.html">Volumen {volume}</a><span>›</span>
            <span>Tema {topic_num}</span>
        </nav>

        <div class="header">
            <h1>{title}</h1>
            <p class="subtitle">{subtitle}</p>
        </div>

        <div class="score-panel">
            <div class="score-item"><div class="score-number" id="points">0</div><div class="score-label">Puntos</div></div>
            <div class="score-item"><div class="score-number" id="completed">0</div><div class="score-label">Ejercicios</div></div>
            <div class="score-item"><div class="score-number" id="accuracy">0%</div><div class="score-label">Precisión</div></div>
        </div>

        <div class="tabs">
            <button class="tab-button active" onclick="showTab('teoria')">📚 Teoría</button>
            <button class="tab-button" onclick="showTab('ejemplos')">💡 Ejemplos</button>
            <button class="tab-button" onclick="showTab('herramientas')">🧮 Herramientas</button>
            <button class="tab-button" onclick="showTab('practica')">✏️ Práctica</button>
            <button class="tab-button" onclick="showTab('resumen')">📋 Resumen</button>
        </div>

        <div class="content-section active" id="teoria">
            <h2>📚 Teoría</h2>
            {theory_html}
        </div>

        <div class="content-section" id="ejemplos">
            <h2>💡 Ejemplos Resueltos</h2>
            {examples_html}
        </div>

        <div class="content-section" id="herramientas">
            <h2>🧮 Herramientas Interactivas</h2>
            {tools_html}
        </div>

        <div class="content-section" id="practica">
            <h2>✏️ Práctica</h2>
            {exercises_html}
        </div>

        <div class="content-section" id="resumen">
            <h2>📋 Resumen del Tema</h2>
            <div class="concept-box">
                <h4>🎯 Puntos Clave</h4>
                <p>Repasa los conceptos más importantes de este tema antes de continuar.</p>
            </div>
        </div>

        <div class="navigation-buttons">
            <a href="#" class="nav-btn">⬅️ Tema Anterior</a>
            <a href="volume{volume.lower()}_index.html" class="nav-btn">📚 Índice del Volumen</a>
            <a href="#" class="nav-btn">Tema Siguiente ➡️</a>
        </div>
    </div>

    <script>
        function showTab(tabName) {{
            document.querySelectorAll('.content-section').forEach(section => section.classList.remove('active'));
            document.querySelectorAll('.tab-button').forEach(button => button.classList.remove('active'));
            document.getElementById(tabName).classList.add('active');
            event.target.classList.add('active');
        }}

        let score = {{points: 0, completed: 0, correct: 0, exercises: {{}}}};

        function updateScore() {{
            document.getElementById('points').textContent = score.points;
            document.getElementById('completed').textContent = score.completed;
            const accuracy = score.completed > 0 ? Math.round((score.correct / score.completed) * 100) : 0;
            document.getElementById('accuracy').textContent = accuracy + '%';
            
            const mathData = JSON.parse(localStorage.getItem('matematicasAvanzadas')) || {{puntos: 0, nivel: 1, ejerciciosCompletados: 0, progreso: {{volumen{volume.lower()}: {{}}}}}};
            mathData.puntos = (mathData.puntos || 0) + score.points;
            mathData.ejerciciosCompletados = (mathData.ejerciciosCompletados || 0) + 1;
            localStorage.setItem('matematicasAvanzadas', JSON.stringify(mathData));
            score.points = 0;
        }}

        function checkExercise(num, correctAnswer) {{
            const input = document.getElementById('ex' + num);
            const feedback = document.getElementById('feedback' + num);
            
            if (score.exercises[num]) {{
                feedback.textContent = '✓ Ya completaste este ejercicio';
                feedback.className = 'feedback correct';
                return;
            }}
            
            const userAnswer = input.value.trim();
            const correct = correctAnswer.trim();
            
            if (Math.abs(parseFloat(userAnswer) - parseFloat(correct)) < 0.01 || userAnswer.toLowerCase() === correct.toLowerCase()) {{
                feedback.textContent = '¡Correcto! +10 puntos 🎉';
                feedback.className = 'feedback correct';
                score.points += 10;
                score.completed++;
                score.correct++;
                score.exercises[num] = true;
                input.disabled = true;
            }} else {{
                feedback.textContent = '❌ Incorrecto. Intenta de nuevo o usa la pista.';
                feedback.className = 'feedback incorrect';
                score.completed++;
            }}
            
            updateScore();
        }}

        function showHint(num) {{
            const hint = document.getElementById('hint' + num);
            hint.style.display = hint.style.display === 'none' ? 'block' : 'none';
        }}

        {JS_FUNCTIONS}
    </script>
</body>
</html>
    """
    
    return html

def main():
    print("\n🔧 Generating Complete Interactive Math Course Pages\n")
    print("=" * 70)
    
    for topic_key, topic_data in TOPICS.items():
        print(f"\n📄 Generating: {topic_key}")
        html_content = generate_html_page(topic_key, topic_data)
        
        filepath = os.path.join(BASE_PATH, topic_key)
        os.makedirs(os.path.dirname(filepath), exist_ok=True)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(html_content)
        
        print(f"   ✅ Created: {topic_data['title']}")
    
    print("\n" + "=" * 70)
    print(f"\n✨ Complete! Generated {len(TOPICS)} topic pages\n")

if __name__ == '__main__':
    main()
