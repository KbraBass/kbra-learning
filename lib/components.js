/**
 * Components.js - Reusable UI components for Kbra Learning Platform
 * Provides consistent UI elements across all modules
 */

const Components = (function() {

    /**
     * Create standard page header
     */
    function createHeader(config) {
        const {
            title = 'Título',
            subtitle = '',
            icon = '📚',
            backLink = '../index.html',
            showBack = true
        } = config;

        return `
            <div class="header">
                <h1>${icon} ${title} ${icon}</h1>
                ${subtitle ? `<p class="subtitle">${subtitle}</p>` : ''}
                ${showBack ? `<a href="${backLink}" class="back-button">🏠 Volver al Inicio</a>` : ''}
            </div>
        `;
    }

    /**
     * Create tab navigation system
     */
    function createTabs(tabs) {
        let html = '<div class="tabs">';
        
        tabs.forEach((tab, index) => {
            const activeClass = index === 0 ? 'active' : '';
            html += `
                <button class="tab-button ${activeClass}" onclick="showTab('${tab.id}')">
                    ${tab.label}
                </button>
            `;
        });
        
        html += '</div>';
        return html;
    }

    /**
     * Create tab content wrapper
     */
    function createTabContent(tabId, content, isActive = false) {
        const activeClass = isActive ? 'active' : '';
        return `
            <div class="content">
                <div class="tab-content ${activeClass}" id="${tabId}">
                    ${content}
                </div>
            </div>
        `;
    }

    /**
     * Create score display widget
     */
    function createScoreDisplay(score = 0, level = 'Principiante') {
        return `
            <div class="score-container">
                <span class="score-display">Puntos: <span id="score">${score}</span></span>
                <span class="score-display">Nivel: <span id="level">${level}</span></span>
            </div>
        `;
    }

    /**
     * Create input section for calculations
     */
    function createInputSection(config) {
        const {
            title = 'Calculadora',
            inputs = [],
            buttonText = 'Calcular',
            buttonAction = '',
            resultId = 'result',
            theme = 'default'
        } = config;

        let html = `<div class="input-section theme-${theme}">`;
        html += `<h2>${title}</h2>`;
        
        inputs.forEach(input => {
            html += `
                <div class="input-group">
                    <label for="${input.id}">${input.label}</label>
                    <input 
                        type="${input.type || 'number'}" 
                        id="${input.id}" 
                        placeholder="${input.placeholder || ''}"
                        min="${input.min !== undefined ? input.min : ''}"
                        max="${input.max !== undefined ? input.max : ''}"
                    >
                </div>
            `;
        });

        html += `
            <button class="calc-button" onclick="${buttonAction}">
                ${buttonText}
            </button>
            <div class="result" id="${resultId}">
                ${config.initialMessage || '¡Listo para calcular!'}
            </div>
        `;

        html += '</div>';
        return html;
    }

    /**
     * Create visual demonstration area
     */
    function createVisualDemo(demoId, title = '') {
        return `
            <div class="visual-demo-container">
                ${title ? `<h3>${title}</h3>` : ''}
                <div class="visual-demo" id="${demoId}"></div>
            </div>
        `;
    }

    /**
     * Create explanation box
     */
    function createExplanation(content, type = 'info') {
        const icons = {
            info: 'ℹ️',
            tip: '💡',
            warning: '⚠️',
            success: '✅'
        };

        return `
            <div class="explanation explanation-${type}">
                <span class="explanation-icon">${icons[type] || icons.info}</span>
                <div class="explanation-content">${content}</div>
            </div>
        `;
    }

    /**
     * Create fun facts section
     */
    function createFunFacts(facts, title = '💡 Datos Curiosos') {
        let html = `<div class="fun-facts">`;
        html += `<h3>${title}</h3><ul>`;
        
        facts.forEach(fact => {
            html += `<li>${fact}</li>`;
        });
        
        html += '</ul></div>';
        return html;
    }

    /**
     * Create practice/quiz question
     */
    function createQuestion(config) {
        const {
            questionId = 'question',
            answerId = 'answer',
            resultId = 'practice-result',
            checkFunction = 'checkAnswer()',
            nextFunction = 'generateQuestion()',
            questionText = '¿Cuánto es...?',
            buttonText = '✅ Comprobar'
        } = config;

        return `
            <div class="practice-area">
                <h2 id="${questionId}">${questionText}</h2>
                <div class="input-group">
                    <input 
                        type="number" 
                        id="${answerId}" 
                        placeholder="Tu respuesta..."
                        class="practice-input"
                    >
                </div>
                <button class="calc-button" id="check-button" onclick="${checkFunction}">
                    ${buttonText}
                </button>
                <button class="calc-button" onclick="${nextFunction}">
                    🔄 Nueva Pregunta
                </button>
                <div class="result" id="${resultId}">
                    ¡Escribe tu respuesta!
                </div>
            </div>
        `;
    }

    /**
     * Create number visualization blocks
     */
    function createNumberBlocks(count, icon = '🔵', maxDisplay = 40) {
        if (count > maxDisplay) {
            return `<p class="number-too-large">Número demasiado grande para visualizar (${count})</p>`;
        }

        let html = '<div class="number-group">';
        for (let i = 0; i < count; i++) {
            html += `<div class="item-block">${icon}</div>`;
        }
        html += '</div>';
        return html;
    }

    /**
     * Create progress bar
     */
    function createProgressBar(current, total, label = '') {
        const percentage = Math.round((current / total) * 100);
        
        return `
            <div class="progress-container">
                ${label ? `<div class="progress-label">${label}</div>` : ''}
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${percentage}%">
                        ${percentage}%
                    </div>
                </div>
                <div class="progress-text">${current} / ${total}</div>
            </div>
        `;
    }

    /**
     * Create achievement badge
     */
    function createAchievementBadge(achievement) {
        const lockedClass = achievement.unlocked ? '' : 'locked';
        
        return `
            <div class="achievement-badge ${lockedClass}">
                <div class="achievement-icon">${achievement.icon}</div>
                <div class="achievement-name">${achievement.name}</div>
                <div class="achievement-desc">${achievement.description}</div>
                ${achievement.unlocked && achievement.unlockedDate ? 
                    `<div class="achievement-date">${new Date(achievement.unlockedDate).toLocaleDateString()}</div>` 
                    : ''}
            </div>
        `;
    }

    /**
     * Create stats card
     */
    function createStatsCard(stats) {
        return `
            <div class="stats-card">
                <div class="stat-item">
                    <span class="stat-icon">⭐</span>
                    <span class="stat-value">${stats.totalPoints || 0}</span>
                    <span class="stat-label">Puntos</span>
                </div>
                <div class="stat-item">
                    <span class="stat-icon">🏆</span>
                    <span class="stat-value">${stats.achievementsCount || 0}</span>
                    <span class="stat-label">Logros</span>
                </div>
                <div class="stat-item">
                    <span class="stat-icon">📚</span>
                    <span class="stat-value">${stats.completedModules || 0}</span>
                    <span class="stat-label">Completados</span>
                </div>
                <div class="stat-item">
                    <span class="stat-icon">🔥</span>
                    <span class="stat-value">${stats.streak || 0}</span>
                    <span class="stat-label">Días</span>
                </div>
            </div>
        `;
    }

    /**
     * Create module card for navigation
     */
    function createModuleCard(module) {
        const completedClass = module.completed ? 'completed' : '';
        const completedBadge = module.completed ? '<div class="completed-badge">✓</div>' : '';
        
        return `
            <div class="game-card ${completedClass}" data-module="${module.id}">
                ${completedBadge}
                <div class="game-icon">${module.icon}</div>
                <h2 class="game-title">${module.title}</h2>
                <p class="game-description">${module.description}</p>
                ${module.bestScore ? `<div class="module-score">Mejor: ${module.bestScore} pts</div>` : ''}
                <a href="${module.link}" class="game-link">¡Jugar Ahora!</a>
            </div>
        `;
    }

    /**
     * Create category section
     */
    function createCategorySection(config) {
        const {
            title = 'Categoría',
            icon = '📚',
            modules = [],
            sectionClass = ''
        } = config;

        let html = `
            <div class="category-section ${sectionClass}">
                <h2 class="category-title">
                    <span class="category-icon">${icon}</span>
                    ${title}
                    <span class="category-icon">${icon}</span>
                </h2>
                <div class="games-grid">
        `;

        modules.forEach(module => {
            html += createModuleCard(module);
        });

        html += '</div></div>';
        return html;
    }

    /**
     * Show tab function (JavaScript)
     */
    function getShowTabFunction() {
        return `
        function showTab(tabName) {
            const tabs = document.querySelectorAll('.tab-content');
            tabs.forEach(tab => tab.classList.remove('active'));
            
            const buttons = document.querySelectorAll('.tab-button');
            buttons.forEach(button => button.classList.remove('active'));
            
            document.getElementById(tabName).classList.add('active');
            event.target.classList.add('active');
        }
        `;
    }

    /**
     * Enter key handler for inputs
     */
    function getEnterKeyHandler() {
        return `
        document.addEventListener('DOMContentLoaded', function() {
            const inputs = document.querySelectorAll('input[type="number"], input[type="text"]');
            inputs.forEach(input => {
                input.addEventListener('keypress', function(e) {
                    if (e.key === 'Enter') {
                        const button = this.closest('.input-section, .practice-area')?.querySelector('button');
                        if (button && !button.disabled) {
                            button.click();
                        }
                    }
                });
            });
        });
        `;
    }

    /**
     * Create loading spinner
     */
    function createLoadingSpinner(message = 'Cargando...') {
        return `
            <div class="loading-spinner">
                <div class="spinner"></div>
                <p>${message}</p>
            </div>
        `;
    }

    /**
     * Create modal/dialog
     */
    function createModal(config) {
        const {
            id = 'modal',
            title = 'Modal',
            content = '',
            buttons = []
        } = config;

        let buttonsHtml = '';
        buttons.forEach(btn => {
            buttonsHtml += `<button class="modal-button ${btn.class || ''}" onclick="${btn.action}">${btn.label}</button>`;
        });

        return `
            <div class="modal" id="${id}" style="display: none;">
                <div class="modal-overlay" onclick="closeModal('${id}')"></div>
                <div class="modal-content">
                    <div class="modal-header">
                        <h2>${title}</h2>
                        <button class="modal-close" onclick="closeModal('${id}')">×</button>
                    </div>
                    <div class="modal-body">
                        ${content}
                    </div>
                    ${buttonsHtml ? `<div class="modal-footer">${buttonsHtml}</div>` : ''}
                </div>
            </div>
        `;
    }

    /**
     * Modal control functions
     */
    function getModalFunctions() {
        return `
        function openModal(modalId) {
            document.getElementById(modalId).style.display = 'flex';
        }
        
        function closeModal(modalId) {
            document.getElementById(modalId).style.display = 'none';
        }
        `;
    }

    // Public API
    return {
        createHeader,
        createTabs,
        createTabContent,
        createScoreDisplay,
        createInputSection,
        createVisualDemo,
        createExplanation,
        createFunFacts,
        createQuestion,
        createNumberBlocks,
        createProgressBar,
        createAchievementBadge,
        createStatsCard,
        createModuleCard,
        createCategorySection,
        createLoadingSpinner,
        createModal,
        // Helper functions as strings to inject
        getShowTabFunction,
        getEnterKeyHandler,
        getModalFunctions
    };
})();
