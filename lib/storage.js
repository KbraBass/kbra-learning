/**
 * Storage.js - Centralized localStorage management for Kbra Learning Platform
 * Handles all data persistence with a consistent API
 */

const Storage = (function() {
    const STORAGE_KEY = 'kbra-learning';
    const VERSION = '2.0.0';
    const EXPIRATION_DAYS = 7; // Data expires after 7 days of inactivity

    // Default data structure
    const defaultData = {
        version: VERSION,
        user: {
            totalPoints: 0,
            currentLevel: 'Principiante',
            createdAt: new Date().toISOString(),
            lastVisit: new Date().toISOString(),
            expirationDate: getExpirationDate()
        },
        achievements: [],
        trophies: [], // New: Per-lesson trophies
        modules: {},
        stats: {
            totalModulesCompleted: 0,
            totalTimeSpent: 0,
            streak: 0,
            lastStreakDate: null,
            perfectScores: 0, // Track perfect scores for achievements
            finalTestsPassed: 0 // Track final tests passed
        }
    };

    /**
     * Calculate expiration date (7 days from now)
     */
    function getExpirationDate() {
        const date = new Date();
        date.setDate(date.getDate() + EXPIRATION_DAYS);
        return date.toISOString();
    }

    /**
     * Check if data has expired
     */
    function isExpired(expirationDate) {
        if (!expirationDate) {
            console.warn('Storage: expirationDate is null/undefined, treating as not expired');
            return false;
        }
        return new Date() > new Date(expirationDate);
    }

    /**
     * Initialize or get existing data
     */
    function init() {
        const data = localStorage.getItem(STORAGE_KEY);
        if (!data) {
            const newData = { ...defaultData };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
            return newData;
        }
        try {
            const parsed = JSON.parse(data);
            
            // Check if data has expired
            if (isExpired(parsed.user.expirationDate)) {
                console.log(`Storage data expired on ${parsed.user.expirationDate}. Resetting to default.`);
                localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData));
                return defaultData;
            }
            
            // Update last visit and extend expiration
            parsed.user.lastVisit = new Date().toISOString();
            parsed.user.expirationDate = getExpirationDate();
            
            // Migrate old data structure to new version if needed
            if (!parsed.trophies) {
                parsed.trophies = [];
            }
            if (!parsed.stats.perfectScores) {
                parsed.stats.perfectScores = 0;
            }
            if (!parsed.stats.finalTestsPassed) {
                parsed.stats.finalTestsPassed = 0;
            }
            parsed.version = VERSION;
            
            localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
            return parsed;
        } catch (e) {
            console.error('Error parsing storage data:', e);
            return defaultData;
        }
    }

    /**
     * Get all user progress data
     */
    function getUserProgress() {
        return init();
    }

    /**
     * Save complete progress data
     */
    function saveProgress(data) {
        try {
            data.user.lastVisit = new Date().toISOString();
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
            return true;
        } catch (e) {
            console.error('Error saving progress:', e);
            return false;
        }
    }

    /**
     * Get specific module data
     */
    function getModuleData(moduleId) {
        const data = getUserProgress();
        return data.modules[moduleId] || null;
    }

    /**
     * Save or update module-specific data
     */
    function saveModuleData(moduleId, moduleData) {
        const data = getUserProgress();
        
        // Create module entry if it doesn't exist
        if (!data.modules[moduleId]) {
            data.modules[moduleId] = {
                completed: false,
                score: 0,
                bestScore: 0,
                attempts: 0,
                firstAttempt: new Date().toISOString(),
                lastAttempt: new Date().toISOString(),
                timeSpent: 0,
                finalTestScore: 0,
                finalTestPassed: false,
                finalTestAttempts: 0
            };
        }

        // Update module data
        data.modules[moduleId] = {
            ...data.modules[moduleId],
            ...moduleData,
            lastAttempt: new Date().toISOString()
        };

        // Update best score if applicable
        if (moduleData.score && moduleData.score > data.modules[moduleId].bestScore) {
            data.modules[moduleId].bestScore = moduleData.score;
        }

        return saveProgress(data);
    }

    /**
     * Save final test results
     */
    function saveFinalTestResults(moduleId, score, totalQuestions, passed) {
        const data = getUserProgress();
        
        if (!data.modules[moduleId]) {
            data.modules[moduleId] = {
                completed: false,
                score: 0,
                bestScore: 0,
                attempts: 0,
                firstAttempt: new Date().toISOString(),
                lastAttempt: new Date().toISOString(),
                timeSpent: 0,
                finalTestScore: 0,
                finalTestPassed: false,
                finalTestAttempts: 0
            };
        }

        data.modules[moduleId].finalTestScore = score;
        data.modules[moduleId].finalTestAttempts++;
        
        if (passed && !data.modules[moduleId].finalTestPassed) {
            data.modules[moduleId].finalTestPassed = true;
            data.stats.finalTestsPassed++;
            
            // Mark module as completed if final test passed
            if (!data.modules[moduleId].completed) {
                data.modules[moduleId].completed = true;
                data.stats.totalModulesCompleted++;
            }
        }

        if (score === totalQuestions) {
            data.stats.perfectScores++;
        }

        return saveProgress(data);
    }

    /**
     * Mark module as completed
     */
    function markModuleCompleted(moduleId, score = 0) {
        const data = getUserProgress();
        
        const wasCompleted = data.modules[moduleId]?.completed || false;
        
        saveModuleData(moduleId, {
            completed: true,
            score: score
        });

        // Update stats if this is a new completion
        if (!wasCompleted) {
            data.stats.totalModulesCompleted++;
            saveProgress(data);
        }

        return true;
    }

    /**
     * Get total points across all modules
     */
    function getTotalPoints() {
        const data = getUserProgress();
        return data.user.totalPoints;
    }

    /**
     * Update total points
     */
    function updateTotalPoints(points) {
        const data = getUserProgress();
        data.user.totalPoints = Math.max(0, points);
        
        // Update level based on points
        if (data.user.totalPoints >= 500) {
            data.user.currentLevel = 'Experto';
        } else if (data.user.totalPoints >= 200) {
            data.user.currentLevel = 'Intermedio';
        } else {
            data.user.currentLevel = 'Principiante';
        }
        
        return saveProgress(data);
    }

    /**
     * Add points to total
     */
    function addPoints(amount) {
        const currentPoints = getTotalPoints();
        return updateTotalPoints(currentPoints + amount);
    }

    /**
     * Subtract points from total
     */
    function subtractPoints(amount) {
        const currentPoints = getTotalPoints();
        return updateTotalPoints(currentPoints - amount);
    }

    /**
     * Get current level
     */
    function getCurrentLevel() {
        const data = getUserProgress();
        return data.user.currentLevel;
    }

    /**
     * Get all unlocked achievements
     */
    function getAchievements() {
        const data = getUserProgress();
        return data.achievements;
    }

    /**
     * Unlock an achievement
     */
    function unlockAchievement(achievementId) {
        const data = getUserProgress();
        
        // Check if already unlocked
        const exists = data.achievements.find(a => a.id === achievementId);
        if (exists) {
            return false;
        }

        data.achievements.push({
            id: achievementId,
            unlocked: true,
            date: new Date().toISOString()
        });

        saveProgress(data);
        return true;
    }

    /**
     * Check if achievement is unlocked
     */
    function isAchievementUnlocked(achievementId) {
        const data = getUserProgress();
        return data.achievements.some(a => a.id === achievementId);
    }

    /**
     * Get all completed lessons/modules
     */
    function getCompletedLessons() {
        const data = getUserProgress();
        return Object.keys(data.modules).filter(id => data.modules[id].completed);
    }

    /**
     * Get completion count
     */
    function getCompletionCount() {
        const data = getUserProgress();
        return data.stats.totalModulesCompleted;
    }

    /**
     * Update streak
     */
    function updateStreak() {
        const data = getUserProgress();
        const today = new Date().toISOString().split('T')[0];
        const lastDate = data.stats.lastStreakDate;

        if (!lastDate) {
            // First time
            data.stats.streak = 1;
            data.stats.lastStreakDate = today;
        } else {
            const lastDay = new Date(lastDate);
            const currentDay = new Date(today);
            const diffDays = Math.floor((currentDay - lastDay) / (1000 * 60 * 60 * 24));

            if (diffDays === 1) {
                // Consecutive day
                data.stats.streak++;
                data.stats.lastStreakDate = today;
            } else if (diffDays === 0) {
                // Same day, no change
            } else {
                // Streak broken
                data.stats.streak = 1;
                data.stats.lastStreakDate = today;
            }
        }

        saveProgress(data);
        return data.stats.streak;
    }

    /**
     * Get current streak
     */
    function getStreak() {
        const data = getUserProgress();
        return data.stats.streak;
    }

    /**
     * Add time spent
     */
    function addTimeSpent(seconds) {
        const data = getUserProgress();
        data.stats.totalTimeSpent += seconds;
        saveProgress(data);
    }

    /**
     * Get total time spent
     */
    function getTotalTimeSpent() {
        const data = getUserProgress();
        return data.stats.totalTimeSpent;
    }

    /**
     * Get statistics
     */
    function getStats() {
        const data = getUserProgress();
        return {
            totalPoints: data.user.totalPoints,
            level: data.user.currentLevel,
            completedModules: data.stats.totalModulesCompleted,
            achievementsCount: data.achievements.length,
            streak: data.stats.streak,
            totalTimeSpent: data.stats.totalTimeSpent
        };
    }

    /**
     * Reset all progress
     */
    function resetProgress() {
        const confirmed = confirm('¿Estás seguro de que quieres reiniciar todo tu progreso? Esta acción no se puede deshacer.');
        if (confirmed) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData));
            return true;
        }
        return false;
    }

    /**
     * Export data as JSON
     */
    function exportData() {
        const data = getUserProgress();
        return JSON.stringify(data, null, 2);
    }

    /**
     * Import data from JSON
     */
    function importData(jsonString) {
        try {
            const data = JSON.parse(jsonString);
            if (data.version && data.user && data.modules) {
                saveProgress(data);
                return true;
            }
            return false;
        } catch (e) {
            console.error('Error importing data:', e);
            return false;
        }
    }

    /**
     * Award a trophy for a specific lesson
     */
    function awardTrophy(trophyId, lessonId) {
        const data = getUserProgress();
        
        // Check if trophy already awarded
        const exists = data.trophies.find(t => t.id === trophyId);
        if (exists) {
            return false;
        }

        data.trophies.push({
            id: trophyId,
            lessonId: lessonId,
            awarded: true,
            date: new Date().toISOString()
        });

        saveProgress(data);
        return true;
    }

    /**
     * Get all trophies
     */
    function getTrophies() {
        const data = getUserProgress();
        return data.trophies || [];
    }

    /**
     * Get trophies for a specific lesson
     */
    function getLessonTrophies(lessonId) {
        const data = getUserProgress();
        return (data.trophies || []).filter(t => t.lessonId === lessonId);
    }

    /**
     * Check if trophy is awarded
     */
    function isTrophyAwarded(trophyId) {
        const data = getUserProgress();
        return (data.trophies || []).some(t => t.id === trophyId);
    }

    /**
     * Get final test data for a module
     */
    function getFinalTestData(moduleId) {
        const data = getUserProgress();
        const module = data.modules[moduleId];
        if (!module) return null;
        
        return {
            score: module.finalTestScore || 0,
            passed: module.finalTestPassed || false,
            attempts: module.finalTestAttempts || 0
        };
    }

    // Initialize on load
    init();

    // Public API
    return {
        getUserProgress,
        saveProgress,
        getModuleData,
        saveModuleData,
        saveFinalTestResults,
        markModuleCompleted,
        getTotalPoints,
        updateTotalPoints,
        addPoints,
        subtractPoints,
        getCurrentLevel,
        getAchievements,
        unlockAchievement,
        isAchievementUnlocked,
        getCompletedLessons,
        getCompletionCount,
        updateStreak,
        getStreak,
        addTimeSpent,
        getTotalTimeSpent,
        getStats,
        resetProgress,
        exportData,
        importData,
        awardTrophy,
        getTrophies,
        getLessonTrophies,
        isTrophyAwarded,
        getFinalTestData
    };
})();
