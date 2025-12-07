// Centralized JavaScript for Basic Math Modules

const BasicMathModule = {
    // Default configuration
    config: {
        moduleId: 'default',
        operation: '+',
        operationName: 'Suma',
        icon: '➕',
        title: '¡Aprende a Sumar!',
        subtitle: 'Descubre la diversión de juntar números',
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
    score: 0,
    currentQuestion: null,
    questionAnswered: false,
    startTime: null,
    examQuestions: [],
    currentExamQuestion: 0,
    examAnswers: [],

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
            this.loadExamData();
            this.addEventListeners();
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
        document.getElementById('tabs-container').innerHTML = Components.createTabs(this.config.tabs, 'BasicMathModule.showTab');
    },

    renderScoreDisplay: function() {
        const totalPoints = Storage.getTotalPoints();
        const currentLevel = Storage.getCurrentLevel();
        const scoreContainer = document.getElementById('score-container');
        if (scoreContainer) {
            scoreContainer.innerHTML = Components.createScoreDisplay(totalPoints, currentLevel);
        }
    },

    // UI functions
    showTab: function(tabName) {
        const tabs = document.querySelectorAll('.tab-content');
        tabs.forEach(tab => tab.classList.remove('active'));
        
        const buttons = document.querySelectorAll('.tab-button');
        buttons.forEach(button => button.classList.remove('active'));
        
        const tabEl = document.getElementById(tabName);
        if (tabEl) {
            tabEl.classList.add('active');
        }
        
        const targetButton = Array.from(buttons).find(button => {
            const label = this.getTabLabel(tabName);
            return button.textContent.trim() === label;
        });
        if (targetButton) {
            targetButton.classList.add('active');
        }
    },

    getTabLabel: function(tabId) {
        const tab = this.config.tabs.find(t => t.id === tabId);
        return tab ? tab.label : '';
    },

    // Event listeners
    addEventListeners: function() {
        // This needs to be generalized if the IDs are not always the same
        document.getElementById('num1')?.addEventListener('keypress', (e) => { if (e.key === 'Enter') this.calculate(); });
        document.getElementById('num2')?.addEventListener('keypress', (e) => { if (e.key === 'Enter') this.calculate(); });
        document.getElementById('carry1')?.addEventListener('keypress', (e) => { if (e.key === 'Enter') this.calculateWithCarry(); });
        document.getElementById('carry2')?.addEventListener('keypress', (e) => { if (e.key === 'Enter') this.calculateWithCarry(); });
        document.getElementById('practice-answer')?.addEventListener('keypress', (e) => { if (e.key === 'Enter') this.checkAnswer(); });
        document.getElementById('exam-answer')?.addEventListener('keypress', (e) => { if (e.key === 'Enter') this.submitExamAnswer(); });
    },

    // Calculation functions
    calculate: function() {
        const num1 = parseInt(document.getElementById('num1').value);
        const num2 = parseInt(document.getElementById('num2').value);
        const result = document.getElementById('calc-result');
        const visualDiv = document.getElementById('visual-calc');

        if (isNaN(num1) || isNaN(num2) || num1 < 0 || num2 < 0) {
            result.textContent = '¡Por favor, escribe números válidos!';
            result.style.background = 'rgba(255, 107, 107, 0.3)';
            if(visualDiv) visualDiv.innerHTML = '';
            return;
        }

        if (this.config.operation === '-' && num2 > num1) {
            result.innerHTML = `<div>⚠️ El sustraendo (${num2}) es mayor que el minuendo (${num1})<br>El resultado sería negativo: ${num1 - num2}</div>`;
            result.style.background = 'rgba(255, 193, 7, 0.3)';
            if(visualDiv) visualDiv.innerHTML = '';
            return;
        }

        const answer = this.performOperation(num1, num2);

        result.innerHTML = `<div>${num1} ${this.config.operation} ${num2} = ${answer} 🎉<br><small class="text-small-hint">¡Calculado!</small></div>`;
        result.style.background = 'rgba(78, 205, 196, 0.3)';

        if (visualDiv) {
            if (num1 <= 20 && num2 <= 20) {
                if (this.config.operation === '+') {
                    visualDiv.innerHTML = Components.createAdditionBlocks(num1, num2);
                } else if (this.config.operation === '-') {
                    visualDiv.innerHTML = this.createSubtractionBlocks(num1, num2, answer);
                }
            } else {
                visualDiv.innerHTML = '<p class="text-center text-gray">Los números son muy grandes para mostrar visualmente, ¡pero el resultado es correcto!</p>';
            }
        }
    },
    
    calculateWithCarry: function() {
        if (this.config.operation === '+') {
            this.calculateWithCarry_addition();
        } else if (this.config.operation === '-') {
            this.calculateWithBorrow_subtraction();
        }
    },

    calculateWithCarry_addition: function() {
        const num1 = parseInt(document.getElementById('carry1').value);
        const num2 = parseInt(document.getElementById('carry2').value);
        const result = document.getElementById('carry-result');
        const explanation = document.getElementById('carry-explanation');

        if (isNaN(num1) || isNaN(num2) || num1 < 0 || num2 < 0) {
            result.textContent = '¡Por favor, escribe números válidos!';
            result.style.background = 'rgba(255, 107, 107, 0.3)';
            explanation.innerHTML = '<h3>📝 Explicación paso a paso:</h3><p>Escribe dos números para ver la explicación.</p>';
            return;
        }

        const sum = num1 + num2;
        result.innerHTML = `<div>${num1} + ${num2} = ${sum} 🎉</div>`;
        result.style.background = 'rgba(78, 205, 196, 0.3)';

        const units1 = num1 % 10;
        const tens1 = Math.floor(num1 / 10);
        const units2 = num2 % 10;
        const tens2 = Math.floor(num2 / 10);
        const unitsSum = units1 + units2;
        const carry = Math.floor(unitsSum / 10);
        const unitsFinal = unitsSum % 10;
        const tensSum = tens1 + tens2 + carry;
        
        let explanationHTML = '<h3>📝 Explicación paso a paso:</h3><ol>';
        explanationHTML += `<li><strong>Separamos en unidades y decenas:</strong><br>${num1} = ${tens1} decenas + ${units1} unidades<br>${num2} = ${tens2} decenas + ${units2} unidades</li>`;
        explanationHTML += `<li><strong>Sumamos las unidades:</strong> ${units1} + ${units2} = ${unitsSum}${carry > 0 ? ` (llevamos ${carry})` : ''}</li>`;
        explanationHTML += `<li><strong>Sumamos las decenas:</strong> ${tens1} + ${tens2}${carry > 0 ? ` + ${carry} (que llevamos)` : ''} = ${tensSum}</li>`;
        explanationHTML += `<li><strong>Resultado final:</strong> ${tensSum} decenas + ${unitsFinal} unidades = ${sum}</li></ol>`;
        
        explanation.innerHTML = explanationHTML;
    },

    calculateWithBorrow_subtraction: function() {
        const num1 = parseInt(document.getElementById('borrow1').value);
        const num2 = parseInt(document.getElementById('borrow2').value);
        const result = document.getElementById('borrow-result');
        const explanation = document.getElementById('borrow-explanation');
        
        if (isNaN(num1) || isNaN(num2) || num1 < 0 || num2 < 0) {
            result.textContent = '¡Por favor, escribe números válidos!';
            result.style.background = 'rgba(255, 107, 107, 0.3)';
            explanation.innerHTML = '<h3>📝 Explicación paso a paso:</h3><p>Escribe dos números para ver la explicación.</p>';
            return;
        }
        
        const diff = num1 - num2;
        
        result.innerHTML = `<div>${num1} - ${num2} = ${diff} 🎉</div>`;
        result.style.background = 'rgba(78, 205, 196, 0.3)';
        
        const units1 = num1 % 10;
        const tens1 = Math.floor(num1 / 10);
        const units2 = num2 % 10;
        const tens2 = Math.floor(num2 / 10);
        
        let explanationHTML = '<h3>📝 Explicación paso a paso:</h3><ol>';
        explanationHTML += `<li><strong>Separamos en unidades y decenas:</strong><br>${num1} = ${tens1} decenas + ${units1} unidades<br>${num2} = ${tens2} decenas + ${units2} unidades</li>`;
        
        if (units1 < units2) {
            explanationHTML += `<li><strong>Pedimos prestado:</strong> Como ${units1} < ${units2}, pedimos prestado 1 decena (10 unidades)<br>Ahora tenemos ${units1 + 10} unidades y ${tens1 - 1} decenas</li>`;
            explanationHTML += `<li><strong>Restamos las unidades:</strong> ${units1 + 10} - ${units2} = ${units1 + 10 - units2}</li>`;
            explanationHTML += `<li><strong>Restamos las decenas:</strong> ${tens1 - 1} - ${tens2} = ${tens1 - 1 - tens2}</li>`;
        } else {
            explanationHTML += `<li><strong>Restamos las unidades:</strong> ${units1} - ${units2} = ${units1 - units2}</li>`;
            explanationHTML += `<li><strong>Restamos las decenas:</strong> ${tens1} - ${tens2} = ${tens1 - tens2}</li>`;
        }
        
        explanationHTML += `<li><strong>Resultado final:</strong> ${diff}</li></ol>`;
        
        explanation.innerHTML = explanationHTML;
    },

    createSubtractionBlocks: function(total, remove, remaining) {
        let html = '<div class="visual-demo" style="padding: 1rem; text-align: center;">';
        html += '<p><strong>Visual:</strong> Empezamos con ' + total + ', quitamos ' + remove + '</p>';
        html += '<div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 0.5rem; margin: 1rem 0;">';
        
        for (let i = 0; i < total; i++) {
            const removed = i < remove ? ' removed' : '';
            html += '<div class="item-block' + removed + '" style="width: 40px; height: 40px; background: ' + (i < remove ? '#ccc' : 'var(--color-primary)') + '; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">' + (i + 1) + '</div>';
        }
        
        html += '</div>';
        html += '<p><strong>Quedan:</strong> ' + remaining + ' elementos</p>';
        html += '</div>';
        return html;
    },

    performOperation: function(a, b) {
        switch (this.config.operation) {
            case '+': return a + b;
            case '-': return a - b;
            case '*': return a * b;
            case '/': return a / b;
            default: return NaN;
        }
    },

    // Training functions
    generateQuestion: function() {
        const difficulty = Math.random();
        let num1, num2;

        if (this.config.operation === '+') {
            if (difficulty < 0.4) {
                num1 = Math.floor(Math.random() * 9) + 1;
                num2 = Math.floor(Math.random() * 9) + 1;
            } else if (difficulty < 0.7) {
                num1 = Math.floor(Math.random() * 40) + 10;
                num2 = Math.floor(Math.random() * 40) + 10;
            } else {
                num1 = Math.floor(Math.random() * 49) + 50;
                num2 = Math.floor(Math.random() * 49) + 50;
            }
        } else if (this.config.operation === '-') {
            if (difficulty < 0.4) {
                num1 = Math.floor(Math.random() * 9) + 2;
                num2 = Math.floor(Math.random() * (num1 - 1)) + 1;
            } else if (difficulty < 0.7) {
                num1 = Math.floor(Math.random() * 40) + 20;
                num2 = Math.floor(Math.random() * (num1 - 10)) + 5;
            } else {
                num1 = Math.floor(Math.random() * 49) + 51;
                num2 = Math.floor(Math.random() * (num1 - 20)) + 10;
            }
        } else if (this.config.operation === '*') {
            if (difficulty < 0.4) {
                num1 = Math.floor(Math.random() * 9) + 1;
                num2 = Math.floor(Math.random() * 9) + 1;
            } else if (difficulty < 0.7) {
                num1 = Math.floor(Math.random() * 10) + 2; // e.g., 2-11
                num2 = Math.floor(Math.random() * 10) + 2; // e.g., 2-11
            } else {
                num1 = Math.floor(Math.random() * 15) + 5; // e.g., 5-19
                num2 = Math.floor(Math.random() * 15) + 5; // e.g., 5-19
            }
        } else if (this.config.operation === '/') {
            if (difficulty < 0.4) {
                num2 = Math.floor(Math.random() * 8) + 2; // Divisor (2-9)
                num1 = num2 * (Math.floor(Math.random() * 8) + 2); // Dividend is a multiple of divisor
            } else if (difficulty < 0.7) {
                num2 = Math.floor(Math.random() * 10) + 3; // Divisor (3-12)
                num1 = num2 * (Math.floor(Math.random() * 10) + 3);
            } else {
                num2 = Math.floor(Math.random() * 15) + 5; // Divisor (5-19)
                num1 = num2 * (Math.floor(Math.random() * 15) + 5);
            }
        }
            
        this.currentQuestion = {
            num1: num1,
            num2: num2,
            answer: this.performOperation(num1, num2)
        };
            
        document.getElementById('practice-question').textContent = `¿Cuánto es ${num1} ${this.config.operation} ${num2}?`;
        document.getElementById('practice-answer').value = '';
        document.getElementById('practice-result').textContent = '¡Escribe tu respuesta!';
        document.getElementById('practice-result').style.background = 'rgba(255, 255, 255, 0.9)';
        this.questionAnswered = false;
            
        const checkButton = document.getElementById('check-button');
        checkButton.disabled = false;
        checkButton.textContent = '✅ Comprobar';
    },

    checkAnswer: function() {
        if (!this.currentQuestion || this.questionAnswered) return;
        
        const userAnswer = parseInt(document.getElementById('practice-answer').value);
        const result = document.getElementById('practice-result');

        if (isNaN(userAnswer)) {
            result.textContent = '¡Por favor, escribe un número!';
            result.style.background = 'rgba(255, 107, 107, 0.3)';
            return;
        }
            
        this.questionAnswered = true;
        const checkButton = document.getElementById('check-button');
        checkButton.disabled = true;
        checkButton.textContent = '✅ Respondido';
            
        if (userAnswer === this.currentQuestion.answer) {
            Gamification.addPoints(10, this.config.moduleId);
            result.innerHTML = `<div class="text-dark">¡Correcto! 🎉<br>${this.currentQuestion.num1} ${this.config.operation} ${this.currentQuestion.num2} = ${this.currentQuestion.answer}<br><small>+10 puntos (Total: ${Storage.getTotalPoints()})</small></div>`;
            result.style.background = 'rgba(25, 215, 25, 0.38)';
        } else {
            Gamification.subtractPoints(5, this.config.moduleId);
            result.innerHTML = `<div class="text-dark">Incorrecto 😔<br>${this.currentQuestion.num1} ${this.config.operation} ${this.currentQuestion.num2} = ${this.currentQuestion.answer}<br>Tu respuesta: ${userAnswer}<br><small>-5 puntos (Total: ${Storage.getTotalPoints()})</small></div>`;
            result.style.background = 'rgba(255, 50, 70, 0.50)';
        }
            
        this.renderScoreDisplay();
    },

    // Exam functions
    loadExamData: function() {
        const testData = Storage.getFinalTestData(this.config.moduleId);
        if (testData) {
            document.getElementById('exam-attempts').textContent = testData.attempts || 0;
            if (testData.passed) {
                document.getElementById('exam-best-score').textContent = `${testData.score} / 20 (${Math.round((testData.score / 20) * 100)}%)`;
            }
        }
    },

    startFinalExam: function() {
        this.examQuestions = [];
        for (let i = 0; i < 20; i++) {
            let num1, num2;
            const difficulty = Math.random(); // Difficulty for each question

            if (this.config.operation === '+') {
                if (difficulty < 0.4) {
                    num1 = Math.floor(Math.random() * 9) + 1;
                    num2 = Math.floor(Math.random() * 9) + 1;
                } else if (difficulty < 0.7) {
                    num1 = Math.floor(Math.random() * 40) + 10;
                    num2 = Math.floor(Math.random() * 40) + 10;
                } else {
                    num1 = Math.floor(Math.random() * 49) + 50;
                    num2 = Math.floor(Math.random() * 49) + 50;
                }
            } else if (this.config.operation === '-') {
                if (difficulty < 0.4) {
                    num1 = Math.floor(Math.random() * 9) + 2;
                    num2 = Math.floor(Math.random() * (num1 - 1)) + 1;
                } else if (difficulty < 0.7) {
                    num1 = Math.floor(Math.random() * 40) + 20;
                    num2 = Math.floor(Math.random() * (num1 - 10)) + 5;
                } else {
                    num1 = Math.floor(Math.random() * 49) + 51;
                    num2 = Math.floor(Math.random() * (num1 - 20)) + 10;
                }
            } else if (this.config.operation === '*') {
                if (difficulty < 0.4) {
                    num1 = Math.floor(Math.random() * 9) + 1;
                    num2 = Math.floor(Math.random() * 9) + 1;
                } else if (difficulty < 0.7) {
                    num1 = Math.floor(Math.random() * 10) + 2; // e.g., 2-11
                    num2 = Math.floor(Math.random() * 10) + 2; // e.g., 2-11
                } else {
                    num1 = Math.floor(Math.random() * 15) + 5; // e.g., 5-19
                    num2 = Math.floor(Math.random() * 15) + 5; // e.g., 5-19
                }
            } else if (this.config.operation === '/') {
                if (difficulty < 0.4) {
                    num2 = Math.floor(Math.random() * 8) + 2; // Divisor (2-9)
                    num1 = num2 * (Math.floor(Math.random() * 8) + 2); // Dividend is a multiple of divisor
                } else if (difficulty < 0.7) {
                    num2 = Math.floor(Math.random() * 10) + 3; // Divisor (3-12)
                    num1 = num2 * (Math.floor(Math.random() * 10) + 3);
                } else {
                    num2 = Math.floor(Math.random() * 15) + 5; // Divisor (5-19)
                    num1 = num2 * (Math.floor(Math.random() * 15) + 5);
                }
            }
            this.examQuestions.push({ num1, num2, answer: this.performOperation(num1, num2) });
        }
            
        this.currentExamQuestion = 0;
        this.examAnswers = [];
            
        document.getElementById('exam-intro').classList.add('hidden');
        document.getElementById('exam-area').classList.remove('hidden');
        document.getElementById('exam-results').classList.add('hidden');
            
        this.showExamQuestion();
    },

    showExamQuestion: function() {
        const q = this.examQuestions[this.currentExamQuestion];
        document.getElementById('current-q').textContent = this.currentExamQuestion + 1;
        document.getElementById('total-q').textContent = this.examQuestions.length;
        document.getElementById('exam-question').textContent = `¿Cuánto es ${q.num1} ${this.config.operation} ${q.num2}?`;
        document.getElementById('exam-answer').value = '';
        document.getElementById('exam-answer').focus();
    },

    submitExamAnswer: function() {
        const userAnswer = parseInt(document.getElementById('exam-answer').value);
        if (isNaN(userAnswer)) {
            alert('Por favor, escribe un número válido');
            return;
        }
            
        this.examAnswers.push(userAnswer);
        this.currentExamQuestion++;
            
        if (this.currentExamQuestion < this.examQuestions.length) {
            this.showExamQuestion();
        } else {
            this.showExamResults();
        }
    },

    showExamResults: function() {
        let correct = 0;
        for (let i = 0; i < this.examQuestions.length; i++) {
            if (this.examAnswers[i] === this.examQuestions[i].answer) {
                correct++;
            }
        }
            
        const percentage = Math.round((correct / this.examQuestions.length) * 100);
        const passed = percentage >= 70;
            
        document.getElementById('exam-area').classList.add('hidden');
        document.getElementById('exam-results').classList.remove('hidden');
            
        document.getElementById('correct-answers').textContent = correct;
        document.getElementById('incorrect-answers').textContent = this.examQuestions.length - correct;
        document.getElementById('final-percentage').textContent = `${percentage}%`;
            
        const feedbackDiv = document.getElementById('exam-feedback');
        if (passed) {
            feedbackDiv.innerHTML = `<div class="module-success-message"><h4>🎉 ¡Felicidades! Has aprobado el examen</h4><p>Has completado exitosamente el módulo de ${this.config.operationName} con una calificación de ${percentage}%.</p><p><strong>¡Has ganado el trofeo de "Maestro de la ${this.config.operationName}"!</strong> 🏆</p></div>`;
            Storage.saveFinalTestResults(this.config.moduleId, correct, this.examQuestions.length, true);
            const trophyId = `${this.config.moduleId}-completado`;
            Storage.awardTrophy(trophyId, this.config.moduleId);
            Gamification.showTrophyToast(trophyId);
            Gamification.checkAchievements();
        } else {
            feedbackDiv.innerHTML = `<div class="module-error-message"><h4>😔 No has aprobado esta vez</h4><p>Obtuviste ${percentage}% pero necesitas al menos 70% para aprobar.</p><p><strong>¡No te rindas!</strong> Repasa la teoría y practica más en la sección de Entrenamiento.</p><p>Respuestas correctas necesarias: ${Math.ceil(this.examQuestions.length * 0.7)} de ${this.examQuestions.length}</p></div>`;
            Storage.saveFinalTestResults(this.config.moduleId, correct, this.examQuestions.length, false);
        }
            
        this.loadExamData();
    },

    retryExam: function() {
        document.getElementById('exam-results').classList.add('hidden');
        document.getElementById('exam-intro').classList.remove('hidden');
    }
};