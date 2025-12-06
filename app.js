function init() {
    // Get stats
    const stats = Storage.getStats();
    
    // Render stats card
    const statsContainer = document.getElementById('stats-container');
    if (statsContainer) {
        statsContainer.innerHTML = Components.createStatsCard(stats);
    }

    // Get all achievements
    const achievements = Gamification.getAllAchievements();
    const unlockedAchievements = achievements.filter(a => a.unlocked);
    
    // Show some recent achievements
    const achievementsSection = document.getElementById('achievements-section');
    if (achievementsSection) {
        let achievementsHTML = '<div class="category-section">';
        achievementsHTML += '<h2 class="category-title">🏆 Tus Logros Recientes 🏆</h2>';
        
        if (unlockedAchievements.length > 0) {
            achievementsHTML += '<div class="achievements-grid">';
            unlockedAchievements.slice(0, 6).forEach(achievement => {
                achievementsHTML += Components.createAchievementBadge(achievement);
            });
            achievementsHTML += '</div>';
        } else {
            achievementsHTML += '<p style="text-align: center; color: white; font-size: 1.2em; margin: 20px 0;">¡Completa módulos para desbloquear logros!</p>';
        }
        
        achievementsHTML += '</div>';
        achievementsSection.innerHTML = achievementsHTML;
    }

    // Mark completed modules
    const completedModules = Storage.getCompletedLessons();
    const cards = document.querySelectorAll('.game-card');
    cards.forEach(card => {
        const link = card.querySelector('.game-link');
        if (link) {
            const href = link.getAttribute('href');
            // e.g. modules/basic-math/suma.html -> suma
            const moduleId = href.substring(href.lastIndexOf('/') + 1).replace('.html', '');
            if (moduleId && completedModules.includes(moduleId)) {
                card.classList.add('completed');
            }
        }
    });

    // Render full achievement list
    const allAchievementsContainer = document.getElementById('all-achievements-grid');
    if (allAchievementsContainer) {
        let allAchievementsHTML = '';
        achievements.forEach(achievement => {
            allAchievementsHTML += Components.createAchievementCard(achievement);
        });
        allAchievementsContainer.innerHTML = allAchievementsHTML;
    }
}


document.addEventListener('DOMContentLoaded', init);