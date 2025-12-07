// Centralized JavaScript for Geometry Modules

const GeometryModule = {
    // Default configuration
    config: {
        moduleId: 'default',
        title: '¡Aprende Formas!',
        subtitle: 'Descubre las formas que nos rodean',
        icon: '🔷',
        tabs: [
            { id: 'glosario', label: 'Glosario' },
            { id: 'simbolos', label: 'Símbolos' },
            { id: 'introduccion', label: 'Introducción' },
            { id: 'teoria', label: 'Teoría' },
            { id: 'entrenamiento', label: 'Entrenamiento' },
            { id: 'examen', label: 'Examen Final' }
        ]
    },

    // State variables
    currentQuestion: null,
    questionAnswered: false,
    examQuestions: [],
    examAnswers: [],
    currentExamQuestion: 0,
    startTime: null,

    // Initialization
    init: function(config) {
        this.config = { ...this.config, ...config };
        this.startTime = Date.now();

        document.addEventListener('DOMContentLoaded', () => {
            this.renderHeader();
            this.renderTabs();
            this.renderScoreDisplay();
            Storage.updateStreak();
            this.generateQuestion();
            this.addEventListeners();
            this.injectModalFunctions();
        });
        
        window.addEventListener('beforeunload', () => {
            const timeSpent = Math.floor((Date.now() - this.startTime) / 1000);
            Storage.addTimeSpent(timeSpent);
        });
    },

    // Rendering functions
    renderHeader: function() {
        document.getElementById('header-container').innerHTML = Components.createHeader({
            title: this.config.title,
            subtitle: this.config.subtitle,
            icon: this.config.icon,
            backLink: '../../index.html'
        });
    },

    renderTabs: function() {
        document.getElementById('tabs-container').innerHTML = Components.createTabs(this.config.tabs, 'GeometryModule.showTab');
    },

    renderScoreDisplay: function() {
        const totalPoints = Storage.getTotalPoints();
        const currentLevel = Storage.getCurrentLevel();
        const scoreContainer = document.getElementById('score-container');
        if(scoreContainer) {
            scoreContainer.innerHTML = Components.createScoreDisplay(totalPoints, currentLevel);
        }
    },

    // UI functions
    showTab: function(tabName) {
        document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
        document.querySelectorAll('.tab-button').forEach(button => button.classList.remove('active'));
        
        const tabEl = document.getElementById(tabName);
        if(tabEl) {
            tabEl.classList.add('active');
        }
        
        const targetButton = Array.from(document.querySelectorAll('.tab-button')).find(button => {
            const tab = this.config.tabs.find(t => t.id === tabName);
            return button.textContent.trim() === (tab ? tab.label : '');
        });
        if (targetButton) {
            targetButton.classList.add('active');
        }
    },
    
    // Event listeners
    addEventListeners: function() {
        document.getElementById('practice-answer')?.addEventListener('keypress', (e) => { if (e.key === 'Enter') this.checkAnswer(); });
        document.querySelectorAll('.btn-shape-info').forEach(button => {
            button.addEventListener('click', (e) => {
                const shapeId = e.target.dataset.shape;
                this.showShapeDetails(shapeId);
            });
        });
    },

    generateQuestion: function() {
        const questions = [
            { question: '¿Cuántos lados tiene un triángulo?', answer: 3 },
            { question: '¿Cuántos lados tiene un cuadrado?', answer: 4 },
            { question: '¿Cuántos vértices tiene un rectángulo?', answer: 4 },
            { question: '¿Cuántos lados tiene un pentágono?', answer: 5 },
            { question: '¿Cuántos lados tiene un hexágono?', answer: 6 },
            { question: '¿Cuántos vértices tiene un triángulo?', answer: 3 },
            { question: '¿Cuántos lados tiene un círculo?', answer: 0 },
            { question: '¿Cuántos vértices tiene un pentágono?', answer: 5 },
            { question: '¿Cuántos vértices tiene un hexágono?', answer: 6 },
            { question: '¿Cuántos vértices tiene un círculo?', answer: 0 },
            { question: '¿Cuántos lados tiene un rombo?', answer: 4 },
            { question: '¿Cuántos lados tiene un trapezoide?', answer: 4 },
            { question: '¿Cuántos lados tiene una estrella de 5 puntas?', answer: 10 },
            { question: '¿Cuántos lados tiene un óvalo?', answer: 0 },
            { question: '¿Cuántos lados tiene un heptágono?', answer: 7 },
            { question: '¿Cuántos lados tiene un octágono?', answer: 8 },
            { question: '¿Cuántos lados tiene un nonágono?', answer: 9 },
            { question: '¿Cuántos lados tiene un decágono?', answer: 10 },
            { question: '¿Cuántos lados tiene un paralelogramo?', answer: 4 },
            { question: '¿Cuántos lados tiene una cometa (kite)?', answer: 4 },
            { question: '¿Cuántos lados rectos tiene un semicírculo?', answer: 1 },
            { question: '¿Cuántos lados curvos tiene un arco?', answer: 1 },
            { question: '¿Cuántos lados tiene una cruz?', answer: 12 },
        ];
        
        this.currentQuestion = questions[Math.floor(Math.random() * questions.length)];
        this.questionAnswered = false;
        
        document.getElementById('practice-question').textContent = this.currentQuestion.question;
        document.getElementById('practice-visual').innerHTML = '';
        document.getElementById('practice-answer').value = '';
        document.getElementById('practice-result').textContent = '¡Escribe tu respuesta!';
        document.getElementById('practice-result').style.background = 'rgba(255, 255, 255, 0.9)';
        
        const checkButton = document.getElementById('check-button');
        if (checkButton) {
            checkButton.disabled = false;
            checkButton.textContent = '✅ Comprobar';
        }
    },

    checkAnswer: function() {
        const userAnswer = parseInt(document.getElementById('practice-answer').value);
        const result = document.getElementById('practice-result');
        
        if (!this.currentQuestion || this.questionAnswered) return;
        
        if (isNaN(userAnswer)) {
            result.textContent = '¡Por favor, escribe un número!';
            result.style.background = 'rgba(255, 107, 107, 0.3)';
            return;
        }
        
        this.questionAnswered = true;
        const checkButton = document.getElementById('check-button');
        if (checkButton) {
            checkButton.disabled = true;
            checkButton.textContent = '✅ Respondido';
        }
        
        if (userAnswer === this.currentQuestion.answer) {
            Gamification.addPoints(10, this.config.moduleId);
            result.innerHTML = `<div class="text-dark">¡Correcto! 🎉<br>La respuesta es <strong>${this.currentQuestion.answer}</strong><br><small>+10 puntos</small></div>`;
            result.style.background = 'rgba(25, 215, 25, 0.38)';
        } else {
            Gamification.subtractPoints(5, this.config.moduleId);
            result.innerHTML = `<div class="text-dark">¡Intenta de nuevo! 😊<br>La respuesta correcta es <strong>${this.currentQuestion.answer}</strong><br><small>-5 puntos</small></div>`;
            result.style.background = 'rgba(255, 50, 70, 0.50)';
        }
        
        this.renderScoreDisplay();
    },

    startExam: function() {
        const allQuestions = [
            { question: '¿Cuántos lados tiene un triángulo?', answer: 3 },
            { question: '¿Cuántos lados tiene un cuadrado?', answer: 4 },
            { question: '¿Cuántos vértices tiene un rectángulo?', answer: 4 },
            { question: '¿Cuántos lados tiene un pentágono?', answer: 5 },
            { question: '¿Cuántos lados tiene un hexágono?', answer: 6 },
            { question: '¿Cuántos vértices tiene un triángulo?', answer: 3 },
            { question: '¿Cuántos lados tiene un círculo?', answer: 0 },
            { question: '¿Cuántos vértices tiene un pentágono?', answer: 5 },
            { question: '¿Cuántos vértices tiene un hexágono?', answer: 6 },
            { question: '¿Cuántos vértices tiene un círculo?', answer: 0 },
            { question: '¿Cuántos vértices tiene un cuadrado?', answer: 4 },
            { question: 'Si un polígono tiene 3 lados, ¿cuántos vértices tiene?', answer: 3 },
            { question: '¿Cuántos lados tiene un rectángulo?', answer: 4 },
            { question: 'Si un polígono tiene 5 lados, ¿cuántos vértices tiene?', answer: 5 },
            { question: 'Si un polígono tiene 6 vértices, ¿cuántos lados tiene?', answer: 6 },
            { question: '¿Cuántas líneas de simetría tiene un cuadrado?', answer: 4 },
            { question: '¿Cuántos lados iguales tiene un cuadrado?', answer: 4 },
            { question: 'En un triángulo, ¿cuántos ángulos hay?', answer: 3 },
            { question: 'En un hexágono, ¿cuántos ángulos hay?', answer: 6 },
            { question: 'Si una forma tiene 4 lados iguales, ¿cuántos vértices tiene?', answer: 4 },
            { question: '¿Cuántos lados tiene un rombo?', answer: 4 },
            { question: '¿Cuántos lados tiene un trapezoide?', answer: 4 },
            { question: '¿Cuántos lados tiene una estrella de 5 puntas?', answer: 10 },
            { question: '¿Cuántos lados tiene un óvalo?', answer: 0 },
            { question: '¿Cuántos lados tiene un heptágono?', answer: 7 },
            { question: '¿Cuántos lados tiene un octágono?', answer: 8 },
            { question: '¿Cuántos lados tiene un nonágono?', answer: 9 },
            { question: '¿Cuántos lados tiene un decágono?', answer: 10 },
            { question: '¿Cuántos lados tiene un paralelogramo?', answer: 4 },
            { question: '¿Cuántos lados tiene una cometa (kite)?', answer: 4 },
            { question: '¿Cuántos lados rectos tiene un semicírculo?', answer: 1 },
            { question: '¿Cuántos lados curvos tiene un arco?', answer: 1 },
            { question: '¿Cuántos lados tiene una cruz?', answer: 12 },
        ];

        this.examQuestions = [...allQuestions].sort(() => Math.random() - 0.5).slice(0, 20);
        this.examAnswers = [];
        this.currentExamQuestion = 0;

        document.getElementById('exam-intro').style.display = 'none';
        document.getElementById('exam-container').style.display = 'block';
        document.getElementById('exam-result').style.display = 'none';
        this.showExamQuestion();
    },
    
    showExamQuestion: function() {
        const examContainer = document.getElementById('exam-question-container');
        if (this.currentExamQuestion >= this.examQuestions.length) {
            this.submitExam();
            return;
        }

        const q = this.examQuestions[this.currentExamQuestion];
        examContainer.innerHTML = `
            <div class="module-exam-area">
                <div class="module-exam-progress">
                    <span>Pregunta ${this.currentExamQuestion + 1} de ${this.examQuestions.length}</span>
                </div>
                <div id="exam-question-container">
                    <h3>${q.question}</h3>
                    <div class="input-group">
                        <input type="number" id="exam-answer" placeholder="Escribe tu respuesta...">
                    </div>
                    <button class="calc-button btn-large" onclick="GeometryModule.nextExamQuestion()">➡️ Siguiente</button>
                </div>
            </div>
        `;
        document.getElementById('exam-answer').focus();
    },

    nextExamQuestion: function() {
        const userAnswer = document.getElementById('exam-answer').value;
        if(userAnswer === '' || isNaN(parseInt(userAnswer))) {
            alert('Por favor, introduce un número.');
            return;
        }
        this.examAnswers[this.currentExamQuestion] = userAnswer;
        this.currentExamQuestion++;
        this.showExamQuestion();
    },

    submitExam: function() {
        let correct = 0;
        this.examQuestions.forEach((q, index) => {
            if (parseInt(this.examAnswers[index]) === q.answer) {
                correct++;
            }
        });

        const score = (correct / this.examQuestions.length) * 100;
        const passed = score >= 70;

        document.getElementById('exam-container').style.display = 'none';
        document.getElementById('exam-result').style.display = 'block';

        document.getElementById('exam-score').textContent = 
            `Puntuación: ${correct}/${this.examQuestions.length} (${score.toFixed(1)}%)`;

        if (passed) {
            document.getElementById('exam-message').innerHTML = `<strong>¡Felicitaciones! 🎉</strong><br>Has aprobado el examen de formas geométricas.`;
            document.getElementById('exam-trophy').innerHTML = `<div style="font-size: 4em; margin: 20px 0;">🏆</div><p><strong>¡Trofeo desbloqueado!</strong><br>"Maestro de las Formas"</p>`;
            Storage.markModuleComplete(this.config.moduleId, score);
            Storage.awardTrophy(this.config.moduleId, 'Maestro de las Formas');
            Gamification.showTrophyToast('🏆 ¡Trofeo Desbloqueado!', 'Maestro de las Formas');
        } else {
            document.getElementById('exam-message').innerHTML = `<strong>Sigue practicando 💪</strong><br>Necesitas 70% o más para aprobar. ¡Casi lo logras!`;
            document.getElementById('exam-trophy').innerHTML = '';
            Storage.updateFinalExam(this.config.moduleId, score, false);
        }

        Gamification.checkAchievements();
    },

    retakeExam: function() {
        document.getElementById('exam-result').style.display = 'none';
        document.getElementById('exam-intro').style.display = 'block';
    },
    
    injectModalFunctions: function() {
        const script = document.createElement('script');
        script.textContent = Components.getModalFunctions();
        document.body.appendChild(script);
    },

    showShapeDetails: function(shapeId) {
        const details = this.shapeDetails[shapeId];
        if (!details) return;

        const content = `
            ${details.properties}
            ${details.useCases}
            ${details.funFacts}
        `;

        const modal = document.getElementById('shape-details-modal');
        if (modal) {
            modal.remove();
        }

        document.body.insertAdjacentHTML('beforeend', Components.createModal({
            id: 'shape-details-modal',
            title: details.title,
            content: content,
        }));

        openModal('shape-details-modal');
    },

    shapeDetails: {
        circle: {
            title: '🔵 Círculo',
            properties: `
                <h4>Propiedades Avanzadas</h4>
                <ul>
                    <li><strong>Radio (r):</strong> Distancia del centro a cualquier punto del borde.</li>
                    <li><strong>Diámetro (d):</strong> Distancia a través del círculo pasando por el centro (d = 2r).</li>
                    <li><strong>Circunferencia (C):):</strong> La longitud del borde (C = 2πr).</li>
                    <li><strong>Área (A):):</strong> El espacio dentro del círculo (A = πr²).</li>
                    <li><strong>Cuerda:</strong> Una línea recta que une dos puntos del borde.</li>
                    <li><strong>Tangente:</strong> Una línea que toca el círculo en un solo punto.</li>
                </ul>
            `,
            useCases: `
                <h4>Casos de Uso</h4>
                <p>Las ruedas de los coches, las monedas, los platos, los CDs y los engranajes de los relojes son todos círculos.</p>
            `,
            funFacts: `
                <h4>Datos Curiosos</h4>
                <ul>
                    <li>El círculo es la forma que encierra la mayor área para un perímetro dado.</li>
                    <li>Pi (π) es un número irracional (~3.14159) que relaciona la circunferencia y el diámetro de un círculo.</li>
                </ul>
            `
        },
        square: {
            title: '🟦 Cuadrado',
            properties: `
                <h4>Propiedades Avanzadas</h4>
                <ul>
                    <li><strong>Lados:</strong> 4 lados iguales.</li>
                    <li><strong>Ángulos:</strong> 4 ángulos rectos (90° cada uno).</li>
                    <li><strong>Perímetro (P):):</strong> P = 4s (donde 's' es la longitud de un lado).</li>
                    <li><strong>Área (A):):</strong> A = s² o A = base × altura.</li>
                    <li><strong>Diagonales:</strong> Iguales en longitud y se bisecan perpendicularmente.</li>
                    <li>Es un tipo especial de rectángulo, rombo y paralelogramo.</li>
                </ul>
            `,
            useCases: `
                <h4>Casos de Uso</h4>
                <p>Presentes en baldosas, ventanas, marcos de fotos y muchos diseños arquitectónicos. Los cuadrados son fundamentales en la geometría euclidiana.</p>
            `,
            funFacts: `
                <h4>Datos Curiosos</h4>
                <ul>
                    <li>El cuadrado es una de las formas más equilibradas y estables visualmente.</li>
                    <li>En el arte y el diseño, los cuadrados suelen representar orden y estabilidad.</li>
                </ul>
            `
        },
        rectangle: {
            title: '📏 Rectángulo',
            properties: `
                <h4>Propiedades Avanzadas</h4>
                <ul>
                    <li><strong>Lados:</strong> 4 lados; los lados opuestos son iguales y paralelos.</li>
                    <li><strong>Ángulos:</strong> 4 ángulos rectos (90° cada uno).</li>
                    <li><strong>Perímetro (P):</strong> P = 2(l + w) (donde 'l' es largo y 'w' es ancho).</li>
                    <li><strong>Área (A):</strong> A = l × w.</li>
                    <li><strong>Diagonales:</strong> Iguales en longitud y se bisecan mutuamente.</li>
                    <li>Es un tipo especial de paralelogramo.</li>
                </ul>
            `,
            useCases: `
                <h4>Casos de Uso</h4>
                <p>La forma más común en edificios, pantallas de televisión, libros, puertas y piscinas. Su estructura rectangular permite un uso eficiente del espacio.</p>
            `,
            funFacts: `
                <h4>Datos Curiosos</h4>
                <ul>
                    <li>Si un rectángulo tiene todos sus lados iguales, se convierte en un cuadrado.</li>
                    <li>El "rectángulo áureo" es un rectángulo con una proporción de lados muy estética, utilizada en el arte y la arquitectura.</li>
                </ul>
            `
        },
        triangle: {
            title: '🔺 Triángulo',
            properties: `
                <h4>Propiedades Avanzadas</h4>
                <ul>
                    <li><strong>Lados:</strong> 3 lados y 3 ángulos.</li>
                    <li><strong>Suma de Ángulos:</strong> La suma de sus ángulos internos siempre es 180°.</li>
                    <li><strong>Perímetro (P):</strong> P = a + b + c (suma de las longitudes de sus lados).</li>
                    <li><strong>Área (A):</strong> A = (base × altura) / 2.</li>
                    <li><strong>Tipos:</strong> Equilátero (3 lados iguales), Isósceles (2 lados iguales), Escaleno (lados diferentes).</li>
                    <li><strong>Tipos por ángulos:</strong> Agudo (todos < 90°), Recto (uno = 90°), Obtuso (uno > 90°).</li>
                </ul>
            `,
            useCases: `
                <h4>Casos de Uso</h4>
                <p>Fundamental en arquitectura (techos, puentes, armazones), ingeniería y trigonometría. Las señales de tráfico suelen ser triangulares para llamar la atención.</p>
            `,
            funFacts: `
                <h4>Datos Curiosos</h4>
                <ul>
                    <li>El triángulo es la forma geométrica más simple con lados rectos.</li>
                    <li>Es la forma más estable y rígida, por eso es crucial en la construcción.</li>
                </ul>
            `
        },
        pentagon: {
            title: '⬟ Pentágono',
            properties: `
                <h4>Propiedades Avanzadas</h4>
                <ul>
                    <li><strong>Lados:</strong> 5 lados y 5 ángulos.</li>
                    <li><strong>Pentágono regular:</strong> Todos sus lados y ángulos son iguales (ángulos internos de 108°).</li>
                    <li><strong>Perímetro (P):</strong> P = 5s (para un pentágono regular).</li>
                    <li><strong>Suma de Ángulos:</strong> La suma de sus ángulos internos es 540°.</li>
                </ul>
            `,
            useCases: `
                <h4>Casos de Uso</h4>
                <p>El Pentágono (edificio de EE.UU.), balones de fútbol (combinados con hexágonos), y en algunas flores y frutos.</p>
            `,
            funFacts: `
                <h4>Datos Curiosos</h4>
                <ul>
                    <li>El pentágono regular está estrechamente relacionado con el número áureo (Phi).</li>
                    <li>La "estrella de cinco puntas" (pentagrama) se forma al dibujar las diagonales de un pentágono regular.</li>
                </ul>
            `
        },
        hexagon: {
            title: '⬡ Hexágono',
            properties: `
                <h4>Propiedades Avanzadas</h4>
                <ul>
                    <li><strong>Lados:</strong> 6 lados y 6 ángulos.</li>
                    <li><strong>Hexágono regular:</strong> Todos sus lados y ángulos son iguales (ángulos internos de 120°).</li>
                    <li><strong>Perímetro (P):</strong> P = 6s (para un hexágono regular).</li>
                    <li><strong>Suma de Ángulos:</strong> La suma de sus ángulos internos es 720°.</li>
                    <li>Puede ser dividido en 6 triángulos equiláteros.</li>
                </ul>
            `,
            useCases: `
                <h4>Casos de Uso</h4>
                <p>Panales de abejas, tuercas y tornillos, copos de nieve y en la estructura de algunos cristales y moléculas.</p>
            `,
            funFacts: `
                <h4>Datos Curiosos</h4>
                <ul>
                    <li>Los hexágonos son la forma más eficiente para empaquetar objetos sin dejar huecos.</li>
                    <li>Esta eficiencia es una razón por la que las abejas los usan para sus panales.</li>
                </ul>
            `
        },
        heptagon: {
            title: 'Heptágono',
            properties: `
                <h4>Propiedades Avanzadas</h4>
                <ul>
                    <li><strong>Lados:</strong> 7 lados y 7 ángulos.</li>
                    <li><strong>Heptágono regular:</strong> Todos sus lados y ángulos son iguales (ángulos internos de aproximadamente 128.57°).</li>
                    <li><strong>Suma de Ángulos:</strong> La suma de sus ángulos internos es 900°.</li>
                </ul>
            `,
            useCases: `
                <h4>Casos de Uso</h4>
                <p>Menos común que otras formas, pero aparece en algunas monedas (como la de 50 peniques del Reino Unido) y en ciertos diseños arquitectónicos o naturales.</p>
            `,
            funFacts: `
                <h4>Datos Curiosos</h4>
                <ul>
                    <li>No se puede construir un heptágono regular perfecto usando solo una regla y un compás (es un problema antiguo).</li>
                    <li>La palabra "hepta" viene del griego y significa "siete".</li>
                </ul>
            `
        },
        octagon: {
            title: 'Octágono',
            properties: `
                <h4>Propiedades Avanzadas</h4>
                <ul>
                    <li><strong>Lados:</strong> 8 lados y 8 ángulos.</li>
                    <li><strong>Octágono regular:</strong> Todos sus lados y ángulos son iguales (ángulos internos de 135°).</li>
                    <li><strong>Suma de Ángulos:</strong> La suma de sus ángulos internos es 1080°.</li>
                </ul>
            `,
            useCases: `
                <h4>Casos de Uso</h4>
                <p>Señal de "STOP", jaulas de artes marciales mixtas, ventanas y algunos diseños de edificios.</p>
            `,
            funFacts: `
                <h4>Datos Curiosos</h4>
                <ul>
                    <li>La palabra "octo" viene del griego y significa "ocho".</li>
                    <li>Es una forma muy reconocida gracias a las señales de tráfico.</li>
                </ul>
            `
        },
        nonagon: {
            title: 'Nonágono',
            properties: `
                <h4>Propiedades Avanzadas</h4>
                <ul>
                    <li><strong>Lados:</strong> 9 lados y 9 ángulos.</li>
                    <li><strong>Nonágono regular:</strong> Todos sus lados y ángulos son iguales (ángulos internos de 140°).</li>
                    <li><strong>Suma de Ángulos:</strong> La suma de sus ángulos internos es 1260°.</li>
                </ul>
            `,
            useCases: `
                <h4>Casos de Uso</h4>
                <p>Se encuentra en la arquitectura de algunos templos y edificios históricos, aunque es menos frecuente que otras formas.</p>
            `,
            funFacts: `
                <h4>Datos Curiosos</h4>
                <ul>
                    <li>También se le conoce como eneágono.</li>
                    <li>La palabra "nona" viene del latín y significa "nueve".</li>
                </ul>
            `
        },
        decagon: {
            title: 'Decágono',
            properties: `
                <h4>Propiedades Avanzadas</h4>
                <ul>
                    <li><strong>Lados:</strong> 10 lados y 10 ángulos.</li>
                    <li><strong>Decágono regular:</strong> Todos sus lados y ángulos son iguales (ángulos internos de 144°).</li>
                    <li><strong>Perímetro (P):</strong> P = 10s (para un decágono regular).</li>
                    <li><strong>Suma de Ángulos:</strong> La suma de sus ángulos internos es 1440°.</li>
                </ul>
            `,
            useCases: `
                <h4>Casos de Uso</h4>
                <p>Algunas monedas, rosetones en ventanas de iglesias, y en el diseño de algunos componentes mecánicos.</p>
            `,
            funFacts: `
                <h4>Datos Curiosos</h4>
                <ul>
                    <li>La palabra "deca" viene del griego y significa "diez".</li>
                    <li>Está relacionado con la construcción de estrellas de diez puntas.</li>
                </ul>
            `
        },
        rhombus: {
            title: '♦️ Rombo',
            properties: `
                <h4>Propiedades Avanzadas</h4>
                <ul>
                    <li><strong>Lados:</strong> 4 lados iguales.</li>
                    <li><strong>Ángulos:</strong> Los ángulos opuestos son iguales. Los ángulos consecutivos suman 180°.</li>
                    <li><strong>Diagonales:</strong> Se bisecan perpendicularmente y son bisectrices de los ángulos.</li>
                    <li>Es un tipo especial de paralelogramo.</li>
                    <li>No todos los rombos son cuadrados, solo si sus ángulos son rectos.</li>
                </ul>
            `,
            useCases: `
                <h4>Casos de Uso</h4>
                <p>Cometas, diseño de joyería, patrones en telas y pisos, y en las cartas de póker.</p>
            `,
            funFacts: `
                <h4>Datos Curiosos</h4>
                <ul>
                    <li>La palabra "rombo" viene del griego y significa "trompo" o "redoble".</li>
                    <li>Tiene dos ejes de simetría que coinciden con sus diagonales.</li>
                </ul>
            `
        },
        parallelogram: {
            title: 'Paralelogramo',
            properties: `
                <h4>Propiedades Avanzadas</h4>
                <ul>
                    <li><strong>Lados:</strong> 4 lados; los lados opuestos son paralelos y de igual longitud.</li>
                    <li><strong>Ángulos:</strong> Los ángulos opuestos son iguales. Los ángulos consecutivos suman 180°.</li>
                    <li><strong>Diagonales:</strong> Se bisecan mutuamente (se cortan por la mitad).</li>
                    <li>Rectángulos, cuadrados y rombos son todos tipos especiales de paralelogramos.</li>
                </ul>
            `,
            useCases: `
                <h4>Casos de Uso</h4>
                <p>Presente en la arquitectura (edificios inclinados), en mesas elevadoras, y en el diseño de algunos muebles y máquinas para permitir el movimiento paralelo.</p>
            `,
            funFacts: `
                <h4>Datos Curiosos</h4>
                <ul>
                    <li>La palabra "paralelogramo" viene del griego "parallelogrammon", que significa "figura de líneas paralelas".</li>
                    <li>Tiene simetría rotacional de orden 2 alrededor de su centro.</li>
                </ul>
            `
        },
        trapezoid: {
            title: 'Trapezoide',
            properties: `
                <h4>Propiedades Avanzadas</h4>
                <ul>
                    <li><strong>Lados:</strong> 4 lados.</li>
                    <li><strong>Lados Paralelos:</strong> Al menos un par de lados opuestos son paralelos (estos son las "bases").</li>
                    <li><strong>Perímetro (P):):</strong> P = suma de las longitudes de sus lados.</li>
                    <li><strong>Área (A):):</strong> A = ((base1 + base2) × altura) / 2.</li>
                </ul>
            `,
            useCases: `
                <h4>Casos de Uso</h4>
                <p>Presente en la arquitectura (ventanas, techos inclinados), en bolsos, faldas, y en la construcción de puentes y rampas.</p>
            `,
            funFacts: `
                <h4>Datos Curiosos</h4>
                <ul>
                    <li>En el Reino Unido, esta forma se conoce como "trapezium", mientras que "trapezoid" es una figura sin lados paralelos.</li>
                    <li>Si los lados no paralelos son iguales, se llama trapezoide isósceles.</li>
                </ul>
            `
        },
        kite: {
            title: 'Cometa',
            properties: `
                <h4>Propiedades Avanzadas</h4>
                <ul>
                    <li><strong>Lados:</strong> 4 lados; tiene dos pares de lados adyacentes de igual longitud.</li>
                    <li><strong>Ángulos:</strong> Un par de ángulos opuestos son iguales.</li>
                    <li><strong>Diagonales:</strong> Las diagonales son perpendiculares entre sí. Una diagonal biseca a la otra.</li>
                    <li>No es un paralelogramo (a menos que sea un rombo).</li>
                </ul>
            `,
            useCases: `
                <h4>Casos de Uso</h4>
                <p>Diseño de cometas (juguetes), en algunos logos, patrones decorativos y en la construcción de alas para ciertas aeronaves.</p>
            `,
            funFacts: `
                <h4>Datos Curiosos</h4>
                <ul>
                    <li>Recibe su nombre del juguete "cometa" (papalote) por su forma característica.</li>
                    <li>Tiene un eje de simetría que es una de sus diagonales.</li>
                </ul>
            `
        },
        ellipse: {
            title: 'Elipse',
            properties: `
                <h4>Propiedades Avanzadas</h4>
                <ul>
                    <li><strong>Ejes:</strong> Tiene un eje mayor y un eje menor.</li>
                    <li><strong>Focos:</strong> La suma de las distancias desde cualquier punto de la elipse a dos puntos fijos (focos) es constante.</li>
                    <li><strong>Excentricidad:</strong> Mide cuán "aplanada" es la elipse (un círculo tiene excentricidad 0).</li>
                    <li>Es una forma curva cerrada y suave.</li>
                </ul>
            `,
            useCases: `
                <h4>Casos de Uso</h4>
                <p>Órbitas planetarias, diseño de lentes, espejos y en la arquitectura de algunos estadios y edificios para crear efectos acústicos.</p>
            `,
            funFacts: `
                <h4>Datos Curiosos</h4>
                <ul>
                    <li>Los planetas orbitan el sol en trayectorias elípticas.</li>
                    <li>Una elipse es una "sección cónica", lo que significa que se forma al cortar un cono con un plano inclinado.</li>
                </ul>
            `
        },
        star: {
            title: '⭐ Estrella',
            properties: `
                <h4>Propiedades Avanzadas</h4>
                <ul>
                    <li>Puede tener cualquier número de puntas (generalmente 5 o más).</li>
                    <li>Las estrellas regulares (como un pentagrama) tienen lados y ángulos iguales.</li>
                    <li>Puede ser formada por líneas rectas o curvas.</li>
                </ul>
            `,
            useCases: `
                <h4>Casos de Uso</h4>
                <p>Banderas, decoraciones navideñas, insignias, y en simbología (por ejemplo, la estrella de mar).</p>
            `,
            funFacts: `
                <h4>Datos Curiosos</h4>
                <ul>
                    <li>La estrella de 5 puntas (pentagrama) es un símbolo antiguo con muchos significados culturales.</li>
                    <li>En geometría, una estrella puede ser un polígono estrellado.</li>
                </ul>
            `
        },
        heart: {
            title: '❤️ Corazón',
            properties: `
                <h4>Propiedades Avanzadas</h4>
                <ul>
                    <li>Es una forma curva simétrica.</li>
                    <li>Aunque no es un polígono ni una forma geométrica "pura" en el sentido estricto, es una figura reconocible universalmente.</li>
                    <li>Puede ser construido a partir de combinaciones de arcos y líneas.</li>
                </ul>
            `,
            useCases: `
                <h4>Casos de Uso</h4>
                <p>Símbolo de amor y afecto, decoraciones, tarjetas, y en diseño gráfico.</p>
            `,
            funFacts: `
                <h4>Datos Curiosos</h4>
                <ul>
                    <li>La forma del corazón que conocemos no se parece exactamente a un corazón humano real.</li>
                    <li>El símbolo del corazón se ha utilizado para representar el amor desde la Edad Media.</li>
                </ul>
            `
        },
        semicircle: {
            title: 'Semicírculo',
            properties: `
                <h4>Propiedades Avanzadas</h4>
                <ul>
                    <li>Es exactamente la mitad de un círculo.</li>
                    <li>Tiene un lado recto (el diámetro) y un lado curvo (la mitad de la circunferencia).</li>
                    <li>Su área es la mitad del área de un círculo (½πr²).</li>
                    <li>Su perímetro es la mitad de la circunferencia más el diámetro (πr + d).</li>
                </ul>
            `,
            useCases: `
                <h4>Casos de Uso</h4>
                <p>Arcos, ventanas de estilo romano, túneles, y en el diseño de algunos puentes.</p>
            `,
            funFacts: `
                <h4>Datos Curiosos</h4>
                <ul>
                    <li>Cualquier triángulo inscrito en un semicírculo con un lado en el diámetro es un triángulo rectángulo.</li>
                    <li>El semicírculo aparece en la famosa "Cúpula de la Roca" en Jerusalén.</li>
                </ul>
            `
        },
        arch: {
            title: 'Arco',
            properties: `
                <h4>Propiedades Avanzadas</h4>
                <ul>
                    <li>Es una porción continua de una curva, a menudo parte de un círculo o elipse.</li>
                    <li>Tiene dos puntos finales (extremos) y una curvatura definida.</li>
                    <li>Puede ser simple (parte de un círculo) o complejo (como los arcos góticos).</li>
                </ul>
            `,
            useCases: `
                <h4>Casos de Uso</h4>
                <p>Arquitectura (puertas, ventanas, puentes), diseño de logotipos, y en la formación natural de rocas.</p>
            `,
            funFacts: `
                <h4>Datos Curiosos</h4>
                <ul>
                    <li>Los arcos son estructuras increíblemente fuertes en la construcción.</li>
                    <li>El arco de Constantino en Roma es un famoso ejemplo de la antigüedad.</li>
                </ul>
            `
        },
        cross: {
            title: '➕ Cruz',
            properties: `
                <h4>Propiedades Avanzadas</h4>
                <ul>
                    <li>Formada por la intersección perpendicular de dos líneas o rectángulos.</li>
                    <li>Puede tener brazos de igual longitud (cruz griega) o de diferentes longitudes (cruz latina).</li>
                    <li>Suele tener 4 o 12 lados (si se cuentan los bordes de los brazos).</li>
                </ul>
            `,
            useCases: `
                <h4>Casos de Uso</h4>
                <p>Símbolos religiosos, señales de primeros auxilios, indicadores de mapa, y en logotipos de muchas organizaciones.</p>
            `,
            funFacts: `
                <h4>Datos Curiosos</h4>
                <ul>
                    <li>La cruz es uno de los símbolos más antiguos y universalmente reconocidos.</li>
                    <li>Existen cientos de variaciones de la forma de la cruz en diferentes culturas y contextos.</li>
                </ul>
            `
        },
        arrowhead: {
            title: 'Punta de Flecha',
            properties: `
                <h4>Propiedades Avanzadas</h4>
                <ul>
                    <li>Forma triangular o en "V" diseñada para indicar dirección.</li>
                    <li>Puede ser simétrica o asimétrica.</li>
                    <li>A menudo se combina con una línea para formar una flecha completa.</li>
                </ul>
            `,
            useCases: `
                <h4>Casos de Uso</h4>
                <p>Señales de tráfico, diagramas, indicadores en mapas, botones de navegación en software, y en el diseño de flechas reales.</p>
            `,
            funFacts: `
                <h4>Datos Curiosos</h4>
                <ul>
                    <li>Las puntas de flecha se han utilizado como herramientas y armas desde la prehistoria.</li>
                    <li>La dirección de lectura en muchos idiomas occidentales se asocia con una flecha apuntando hacia la derecha.</li>
                </ul>
            `
        }
    }
};
