#!/bin/bash

# Script to create remaining Volume I topic pages
# Each page will have the same structure with topic-specific content

create_topic_page() {
    local filename="$1"
    local title="$2"
    local icon="$3"
    local prev="$4"
    local next="$5"
    local topic_key="$6"
    
    cat > "$filename" << 'HTML_END'
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TITLE_PLACEHOLDER</title>
    <style>
        * {margin: 0; padding: 0; box-sizing: border-box;}
        body {font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh; color: #333; padding: 20px;}
        .container {max-width: 1200px; margin: 0 auto;}
        .breadcrumb {background: rgba(255, 255, 255, 0.9); padding: 15px 25px; border-radius: 15px; margin-bottom: 20px; display: flex; align-items: center; gap: 10px; flex-wrap: wrap;}
        .breadcrumb a {color: #667eea; text-decoration: none;}
        .header {background: rgba(255, 255, 255, 0.98); border-radius: 25px; padding: 40px; margin-bottom: 30px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2); text-align: center;}
        .header h1 {font-size: 2.8em; color: #667eea; margin-bottom: 15px;}
        .tabs {display: flex; gap: 10px; margin-bottom: 20px; flex-wrap: wrap; background: rgba(255, 255, 255, 0.9); padding: 15px; border-radius: 15px;}
        .tab-button {background: #e0e0e0; border: none; padding: 12px 25px; border-radius: 10px; cursor: pointer; font-size: 1em; font-weight: 600; transition: all 0.3s;}
        .tab-button.active {background: linear-gradient(135deg, #667eea, #764ba2); color: white;}
        .content-section {display: none; background: rgba(255, 255, 255, 0.98); border-radius: 20px; padding: 35px; margin-bottom: 20px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);}
        .content-section.active {display: block; animation: fadeIn 0.4s ease;}
        @keyframes fadeIn {from {opacity: 0; transform: translateY(10px);} to {opacity: 1; transform: translateY(0);}}
        h2 {color: #667eea; font-size: 2em; margin-bottom: 20px;}
        h3 {color: #764ba2; font-size: 1.5em; margin: 25px 0 15px 0;}
        p, li {line-height: 1.8; margin-bottom: 15px;}
        .concept-box {background: #f0f4ff; border-left: 5px solid #667eea; padding: 20px; margin: 20px 0; border-radius: 10px;}
        .formula-box {background: #fff8e1; border: 2px dashed #f59e0b; padding: 20px; margin: 20px 0; border-radius: 10px; text-align: center; font-size: 1.3em; font-weight: bold;}
        .example-box {background: #e8f5e9; border-left: 5px solid #10b981; padding: 20px; margin: 20px 0; border-radius: 10px;}
        .interactive-tool {background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 30px; border-radius: 15px; margin: 25px 0;}
        .input-group {margin: 15px 0;}
        .input-group label {display: block; margin-bottom: 8px; font-weight: 600;}
        .input-group input, .input-group select {padding: 12px; border: none; border-radius: 8px; font-size: 1em; max-width: 400px; width: 100%;}
        .calc-button {background: white; color: #667eea; border: none; padding: 12px 30px; border-radius: 10px; font-size: 1.1em; font-weight: bold; cursor: pointer; margin: 15px 10px 0 0; transition: all 0.3s;}
        .result-box {background: rgba(255, 255, 255, 0.2); padding: 20px; border-radius: 10px; margin-top: 20px; min-height: 60px;}
        .exercise {background: #f8f9fa; padding: 20px; border-radius: 12px; margin: 15px 0; border: 2px solid #e0e0e0;}
        .exercise-input {padding: 10px; border: 2px solid #ddd; border-radius: 8px; font-size: 1em; margin: 10px 10px 10px 0;}
        .check-button {background: #10b981; color: white; border: none; padding: 10px 25px; border-radius: 8px; cursor: pointer; font-weight: bold;}
        .hint-button {background: #f59e0b; color: white; border: none; padding: 10px 25px; border-radius: 8px; cursor: pointer; font-weight: bold; margin-left: 10px;}
        .feedback {margin-top: 15px; padding: 15px; border-radius: 8px; font-weight: bold; display: none;}
        .feedback.correct {background: #d1fae5; color: #065f46; border: 2px solid #10b981; display: block;}
        .feedback.incorrect {background: #fee2e2; color: #991b1b; border: 2px solid #ef4444; display: block;}
        .hint-box {background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin-top: 10px; border-radius: 8px; display: none;}
        .score-panel {background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 20px; border-radius: 15px; margin: 20px 0; display: flex; justify-content: space-around; flex-wrap: wrap;}
        .score-item {text-align: center; padding: 10px;}
        .score-item .score-number {font-size: 2.5em; font-weight: bold;}
        .navigation-buttons {display: flex; justify-content: space-between; margin: 30px 0; gap: 15px; flex-wrap: wrap;}
        .nav-btn {background: rgba(255, 255, 255, 0.95); color: #667eea; padding: 15px 30px; border-radius: 50px; text-decoration: none; font-weight: bold; transition: all 0.3s; box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);}
        ul {margin-left: 25px;}
        canvas {max-width: 100%; background: white; border-radius: 10px; margin: 20px 0;}
    </style>
</head>
<body>
    <div class="container">
        <nav class="breadcrumb">
            <a href="../../index.html">🏠 Inicio</a><span>›</span>
            <a href="../index.html">Mates Avanzadas</a><span>›</span>
            <a href="volume1_index.html">Volumen I</a><span>›</span>
            <span>TOPIC_NAME</span>
        </nav>

        <div class="header">
            <h1>FULL_TITLE</h1>
            <p class="subtitle">SUBTITLE_TEXT</p>
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
            TEORIA_CONTENT
        </div>

        <div class="content-section" id="ejemplos">
            EJEMPLOS_CONTENT
        </div>

        <div class="content-section" id="herramientas">
            HERRAMIENTAS_CONTENT
        </div>

        <div class="content-section" id="practica">
            PRACTICA_CONTENT
        </div>

        <div class="content-section" id="resumen">
            RESUMEN_CONTENT
        </div>

        <div class="navigation-buttons">
            <a href="PREV_PAGE" class="nav-btn">⬅️ Tema Anterior</a>
            <a href="volume1_index.html" class="nav-btn">📚 Índice</a>
            <a href="NEXT_PAGE" class="nav-btn">Siguiente ➡️</a>
        </div>
    </div>

    <script>
        function showTab(tab) {
            document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active'));
            document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
            document.getElementById(tab).classList.add('active');
            event.target.classList.add('active');
        }

        let score = {points: 0, completed: 0, total: 5, correct: 0};

        function updateScore() {
            document.getElementById('points').textContent = score.points;
            document.getElementById('completed').textContent = score.completed;
            document.getElementById('accuracy').textContent = 
                score.completed > 0 ? Math.round((score.correct/score.completed)*100) + '%' : '0%';
            
            const data = JSON.parse(localStorage.getItem('matematicasAvanzadas')) || {puntos:0, ejerciciosCompletados:0, progreso:{volumen1:{}}};
            data.puntos = (data.puntos || 0) + score.points;
            data.ejerciciosCompletados = (data.ejerciciosCompletados || 0) + 1;
            data.progreso.volumen1.TOPIC_KEY_PLACEHOLDER = {completado: score.completed, total: score.total};
            localStorage.setItem('matematicasAvanzadas', JSON.stringify(data));
            score.points = 0;
        }

        function checkExercise(num, correct) {
            const input = document.getElementById('ex'+num);
            const feedback = document.getElementById('feedback'+num);
            if(!input || input.dataset.completed) return;
            const userAnswer = input.value.trim().toLowerCase();
            if(userAnswer === correct.toLowerCase()) {
                feedback.className = 'feedback correct';
                feedback.textContent = '¡Correcto! +10 puntos 🎉';
                score.points += 10; score.completed++; score.correct++;
                input.dataset.completed = 'true'; input.disabled = true;
            } else {
                feedback.className = 'feedback incorrect';
                feedback.textContent = 'Incorrecto. Intenta de nuevo.';
                score.completed++;
            }
            updateScore();
        }

        function showHint(num) {
            const hint = document.getElementById('hint'+num);
            if(hint) hint.style.display = hint.style.display === 'block' ? 'none' : 'block';
        }
    </script>
</body>
</html>
HTML_END

    # Now replace placeholders
    sed -i "s|TITLE_PLACEHOLDER|$title|g" "$filename"
    sed -i "s|FULL_TITLE|$icon $title|g" "$filename"
    sed -i "s|PREV_PAGE|$prev|g" "$filename"
    sed -i "s|NEXT_PAGE|$next|g" "$filename"
    sed -i "s|TOPIC_KEY_PLACEHOLDER|$topic_key|g" "$filename"
}

echo "Creating remaining Volume I topics..."

