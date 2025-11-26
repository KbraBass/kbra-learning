/**
 * Gamification.js - Unified scoring, achievements, and progress system
 * Handles all gamification elements for the Kbra Learning Platform
 */

const Gamification = (function() {
    
    // Achievement definitions
    const achievementDefinitions = [
        {
            id: 'first-steps',
            icon: '🎯',
            name: 'Primeros Pasos',
            description: 'Completa tu primera lección',
            condition: (stats) => stats.completedModules >= 1
        },
        {
            id: 'star-student',
            icon: '⭐',
            name: 'Estudiante Estrella',
            description: 'Gana 100 puntos',
            condition: (stats) => stats.totalPoints >= 100
        },
        {
            id: 'champion',
            icon: '🏆',
            name: 'Campeón',
            description: 'Completa 5 lecciones',
            condition: (stats) => stats.completedModules >= 5
        },
        {
            id: 'scholar',
            icon: '🎓',
            name: 'Erudito',
            description: 'Completa 15 lecciones',
            condition: (stats) => stats.completedModules >= 15
        },
        {
            id: 'perfectionist',
            icon: '💯',
            name: 'Perfeccionista',
            description: 'Obtén 100% en cualquier cuestionario',
            condition: (stats) => stats.perfectScores >= 1
        },
        {
            id: 'on-fire',
            icon: '🔥',
            name: '¡En Llamas!',
            description: 'Gana 500 puntos',
            condition: (stats) => stats.totalPoints >= 500
        },
        {
            id: 'math-master',
            icon: '📚',
            name: 'Maestro de Matemáticas',
            description: 'Completa todos los módulos de matemáticas básicas',
            condition: (stats) => {
                const mathModules = ['suma', 'resta', 'multiplicacion', 'division'];
                return mathModules.every(m => stats.completedList.includes(m));
            }
        },
        {
            id: 'geometry-guru',
            icon: '🔷',
            name: 'Gurú de Geometría',
            description: 'Completa todos los módulos de geometría',
            condition: (stats) => {
                const geoModules = ['formas', 'angulos', 'perimetro-area'];
                return geoModules.every(m => stats.completedList.includes(m));
            }
        },
        {
            id: 'time-traveler',
            icon: '⏰',
            name: 'Viajero del Tiempo',
            description: 'Completa todos los conceptos de tiempo',
            condition: (stats) => {
                const timeModules = ['reloj', 'calendario', 'estaciones'];
                return timeModules.every(m => stats.completedList.includes(m));
            }
        },
        {
            id: 'advanced-learner',
            icon: '🧮',
            name: 'Aprendiz Avanzado',
            description: 'Explora matemáticas avanzadas',
            condition: (stats) => {
                return stats.completedList.some(m => m.includes('advanced-math'));
            }
        },
        {
            id: 'streak-3',
            icon: '🌟',
            name: 'Racha de 3 Días',
            description: 'Aprende durante 3 días consecutivos',
            condition: (stats) => stats.streak >= 3
        },
        {
            id: 'streak-7',
            icon: '💫',
            name: 'Racha de 7 Días',
            description: 'Aprende durante 7 días consecutivos',
            condition: (stats) => stats.streak >= 7
        },
        {
            id: 'streak-30',
            icon: '✨',
            name: 'Racha de 30 Días',
            description: '¡Un mes de aprendizaje continuo!',
            condition: (stats) => stats.streak >= 30
        }
    ];

    /**
     * Add points and check for level up
     */
    function addPoints(amount, moduleId = null) {
        const oldPoints = Storage.getTotalPoints();
        const oldLevel = Storage.getCurrentLevel();
        
        Storage.addPoints(amount);
        
        const newPoints = Storage.getTotalPoints();
        const newLevel = Storage.getCurrentLevel();

        // Check if level changed
        if (oldLevel !== newLevel) {
            showLevelUpToast(newLevel);
        }

        // Update module if provided
        if (moduleId) {
            const moduleData = Storage.getModuleData(moduleId) || {};
            Storage.saveModuleData(moduleId, {
                score: (moduleData.score || 0) + amount,
                attempts: (moduleData.attempts || 0) + 1
            });
        }

        // Check achievements
        checkAchievements();

        return newPoints;
    }

    /**
     * Subtract points (never go below 0)
     */
    function subtractPoints(amount, moduleId = null) {
        const oldPoints = Storage.getTotalPoints();
        const oldLevel = Storage.getCurrentLevel();
        
        Storage.subtractPoints(amount);
        
        const newPoints = Storage.getTotalPoints();
        const newLevel = Storage.getCurrentLevel();

        // Check if level changed (downgrade)
        if (oldLevel !== newLevel) {
            // Silently handle level changes on point loss
        }

        // Update module if provided
        if (moduleId) {
            const moduleData = Storage.getModuleData(moduleId) || {};
            Storage.saveModuleData(moduleId, {
                score: Math.max(0, (moduleData.score || 0) - amount),
                attempts: (moduleData.attempts || 0) + 1
            });
        }

        return newPoints;
    }

    /**
     * Get current level information
     */
    function getCurrentLevel() {
        const level = Storage.getCurrentLevel();
        const points = Storage.getTotalPoints();
        
        let nextLevel = null;
        let pointsToNext = 0;

        if (level === 'Principiante') {
            nextLevel = 'Intermedio';
            pointsToNext = 200 - points;
        } else if (level === 'Intermedio') {
            nextLevel = 'Experto';
            pointsToNext = 500 - points;
        }

        return {
            current: level,
            next: nextLevel,
            pointsToNext: Math.max(0, pointsToNext),
            totalPoints: points
        };
    }

    /**
     * Record module completion
     */
    function recordCompletion(moduleId, score = 0) {
        Storage.markModuleCompleted(moduleId, score);
        Storage.updateStreak();
        checkAchievements();
        
        // Show completion toast
        showCompletionToast(moduleId);
    }

    /**
     * Record perfect score
     */
    function recordPerfectScore(moduleId) {
        const data = Storage.getUserProgress();
        if (!data.stats.perfectScores) {
            data.stats.perfectScores = 1;
        } else {
            data.stats.perfectScores++;
        }
        Storage.saveProgress(data);
        checkAchievements();
    }

    /**
     * Check and unlock achievements
     */
    function checkAchievements() {
        const stats = Storage.getStats();
        stats.completedList = Storage.getCompletedLessons();
        
        // Check perfect scores
        const data = Storage.getUserProgress();
        stats.perfectScores = data.stats.perfectScores || 0;

        const newAchievements = [];

        achievementDefinitions.forEach(achievement => {
            if (!Storage.isAchievementUnlocked(achievement.id)) {
                if (achievement.condition(stats)) {
                    const unlocked = Storage.unlockAchievement(achievement.id);
                    if (unlocked) {
                        newAchievements.push(achievement);
                    }
                }
            }
        });

        // Show achievement toasts
        newAchievements.forEach((achievement, index) => {
            setTimeout(() => {
                showAchievementToast(achievement);
            }, index * 500);
        });

        return newAchievements;
    }

    /**
     * Get all achievement definitions with unlock status
     */
    function getAllAchievements() {
        return achievementDefinitions.map(achievement => {
            const unlocked = Storage.isAchievementUnlocked(achievement.id);
            const unlockedData = Storage.getAchievements().find(a => a.id === achievement.id);
            
            return {
                ...achievement,
                unlocked: unlocked,
                unlockedDate: unlockedData?.date || null
            };
        });
    }

    /**
     * Get unlocked achievements count
     */
    function getUnlockedCount() {
        return Storage.getAchievements().length;
    }

    /**
     * Get streak information
     */
    function getStreak() {
        return Storage.getStreak();
    }

    /**
     * Update daily streak
     */
    function updateStreak() {
        return Storage.updateStreak();
    }

    /**
     * Show achievement unlocked toast
     */
    function showAchievementToast(achievement) {
        // Create toast element
        const toast = document.createElement('div');
        toast.className = 'achievement-toast';
        toast.innerHTML = `
            <div class="achievement-toast-content">
                <div class="achievement-toast-icon">${achievement.icon}</div>
                <div class="achievement-toast-text">
                    <div class="achievement-toast-title">¡Logro Desbloqueado!</div>
                    <div class="achievement-toast-name">${achievement.name}</div>
                    <div class="achievement-toast-desc">${achievement.description}</div>
                </div>
            </div>
        `;

        document.body.appendChild(toast);

        // Animate in
        setTimeout(() => {
            toast.classList.add('show');
        }, 100);

        // Remove after 5 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 5000);
    }

    /**
     * Show level up toast
     */
    function showLevelUpToast(newLevel) {
        const toast = document.createElement('div');
        toast.className = 'level-up-toast';
        
        let icon = '⭐';
        if (newLevel === 'Intermedio') icon = '🌟';
        if (newLevel === 'Experto') icon = '💫';

        toast.innerHTML = `
            <div class="level-up-toast-content">
                <div class="level-up-toast-icon">${icon}</div>
                <div class="level-up-toast-text">
                    <div class="level-up-toast-title">¡Nivel Subido!</div>
                    <div class="level-up-toast-level">Ahora eres ${newLevel}</div>
                </div>
            </div>
        `;

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('show');
        }, 100);

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 4000);
    }

    /**
     * Show completion toast
     */
    function showCompletionToast(moduleId) {
        const toast = document.createElement('div');
        toast.className = 'completion-toast';
        toast.innerHTML = `
            <div class="completion-toast-content">
                <div class="completion-toast-icon">🎉</div>
                <div class="completion-toast-text">¡Módulo Completado!</div>
            </div>
        `;

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('show');
        }, 100);

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 3000);
    }

    /**
     * Calculate module score based on correct/incorrect answers
     */
    function calculateScore(correct, total, timeBonus = 0) {
        const basePoints = correct * 10;
        const perfectBonus = (correct === total) ? 25 : 0;
        return basePoints + perfectBonus + timeBonus;
    }

    /**
     * Get progress percentage for a category
     */
    function getCategoryProgress(moduleIds) {
        const completedList = Storage.getCompletedLessons();
        const completed = moduleIds.filter(id => completedList.includes(id)).length;
        return {
            completed: completed,
            total: moduleIds.length,
            percentage: Math.round((completed / moduleIds.length) * 100)
        };
    }

    // Public API
    return {
        addPoints,
        subtractPoints,
        getCurrentLevel,
        recordCompletion,
        recordPerfectScore,
        checkAchievements,
        getAllAchievements,
        getUnlockedCount,
        getStreak,
        updateStreak,
        showAchievementToast,
        showLevelUpToast,
        showCompletionToast,
        calculateScore,
        getCategoryProgress,
        achievementDefinitions
    };
})();
