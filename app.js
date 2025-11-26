// Data Models
const lessons = [
    {
        id: 1,
        icon: '🔢',
        title: 'Basic Math',
        description: 'Learn addition and subtraction with fun exercises',
        difficulty: 'Easy',
        points: 50,
        questions: [
            {
                question: 'What is 5 + 3?',
                options: ['6', '7', '8', '9'],
                correct: 2
            },
            {
                question: 'What is 10 - 4?',
                options: ['4', '5', '6', '7'],
                correct: 2
            },
            {
                question: 'What is 7 + 2?',
                options: ['8', '9', '10', '11'],
                correct: 1
            },
            {
                question: 'What is 12 - 5?',
                options: ['5', '6', '7', '8'],
                correct: 2
            },
            {
                question: 'What is 3 + 6?',
                options: ['7', '8', '9', '10'],
                correct: 2
            }
        ]
    },
    {
        id: 2,
        icon: '✖️',
        title: 'Multiplication',
        description: 'Master multiplication tables from 1 to 10',
        difficulty: 'Medium',
        points: 75,
        questions: [
            {
                question: 'What is 3 × 4?',
                options: ['10', '11', '12', '13'],
                correct: 2
            },
            {
                question: 'What is 5 × 6?',
                options: ['25', '30', '35', '40'],
                correct: 1
            },
            {
                question: 'What is 7 × 8?',
                options: ['48', '52', '56', '60'],
                correct: 2
            },
            {
                question: 'What is 9 × 3?',
                options: ['24', '27', '30', '33'],
                correct: 1
            },
            {
                question: 'What is 6 × 7?',
                options: ['36', '40', '42', '48'],
                correct: 2
            }
        ]
    },
    {
        id: 3,
        icon: '🌍',
        title: 'World Capitals',
        description: 'Test your knowledge of capital cities around the world',
        difficulty: 'Medium',
        points: 75,
        questions: [
            {
                question: 'What is the capital of France?',
                options: ['London', 'Paris', 'Berlin', 'Madrid'],
                correct: 1
            },
            {
                question: 'What is the capital of Japan?',
                options: ['Seoul', 'Beijing', 'Tokyo', 'Bangkok'],
                correct: 2
            },
            {
                question: 'What is the capital of Australia?',
                options: ['Sydney', 'Canberra', 'Melbourne', 'Brisbane'],
                correct: 1
            },
            {
                question: 'What is the capital of Brazil?',
                options: ['Rio de Janeiro', 'São Paulo', 'Brasília', 'Salvador'],
                correct: 2
            },
            {
                question: 'What is the capital of Canada?',
                options: ['Toronto', 'Ottawa', 'Vancouver', 'Montreal'],
                correct: 1
            }
        ]
    },
    {
        id: 4,
        icon: '🔬',
        title: 'Basic Science',
        description: 'Explore fundamental concepts in science',
        difficulty: 'Easy',
        points: 50,
        questions: [
            {
                question: 'What is the largest planet in our solar system?',
                options: ['Mars', 'Jupiter', 'Saturn', 'Neptune'],
                correct: 1
            },
            {
                question: 'What gas do plants produce during photosynthesis?',
                options: ['Carbon Dioxide', 'Nitrogen', 'Oxygen', 'Hydrogen'],
                correct: 2
            },
            {
                question: 'How many bones does an adult human have?',
                options: ['186', '206', '226', '246'],
                correct: 1
            },
            {
                question: 'What is the chemical symbol for water?',
                options: ['O2', 'H2O', 'CO2', 'H2'],
                correct: 1
            },
            {
                question: 'What is the speed of light approximately?',
                options: ['300,000 km/s', '150,000 km/s', '500,000 km/s', '1,000,000 km/s'],
                correct: 0
            }
        ]
    },
    {
        id: 5,
        icon: '📚',
        title: 'English Grammar',
        description: 'Improve your grammar and language skills',
        difficulty: 'Medium',
        points: 75,
        questions: [
            {
                question: 'Which word is a noun?',
                options: ['Run', 'Quickly', 'Beautiful', 'Book'],
                correct: 3
            },
            {
                question: 'What is the past tense of "go"?',
                options: ['Goed', 'Went', 'Gone', 'Going'],
                correct: 1
            },
            {
                question: 'Which sentence is correct?',
                options: ['She don\'t like pizza', 'She doesn\'t likes pizza', 'She doesn\'t like pizza', 'She not like pizza'],
                correct: 2
            },
            {
                question: 'What is a synonym for "happy"?',
                options: ['Sad', 'Joyful', 'Angry', 'Tired'],
                correct: 1
            },
            {
                question: 'Which is a proper noun?',
                options: ['city', 'country', 'London', 'building'],
                correct: 2
            }
        ]
    },
    {
        id: 6,
        icon: '⏰',
        title: 'Telling Time',
        description: 'Learn to read clocks and understand time',
        difficulty: 'Easy',
        points: 50,
        questions: [
            {
                question: 'How many minutes are in one hour?',
                options: ['30', '45', '60', '90'],
                correct: 2
            },
            {
                question: 'What time is "half past 3"?',
                options: ['3:15', '3:30', '3:45', '4:00'],
                correct: 1
            },
            {
                question: 'How many hours are in a day?',
                options: ['12', '20', '24', '30'],
                correct: 2
            },
            {
                question: 'What is "quarter to 5" in digital time?',
                options: ['4:15', '4:30', '4:45', '5:15'],
                correct: 2
            },
            {
                question: 'How many seconds are in one minute?',
                options: ['30', '50', '60', '100'],
                correct: 2
            }
        ]
    }
];

const achievements = [
    {
        id: 1,
        icon: '🎯',
        name: 'First Steps',
        description: 'Complete your first lesson',
        condition: (progress) => progress.completedLessons.length >= 1
    },
    {
        id: 2,
        icon: '⭐',
        name: 'Star Student',
        description: 'Earn 100 points',
        condition: (progress) => progress.totalPoints >= 100
    },
    {
        id: 3,
        icon: '🏆',
        name: 'Champion',
        description: 'Complete 3 lessons',
        condition: (progress) => progress.completedLessons.length >= 3
    },
    {
        id: 4,
        icon: '🎓',
        name: 'Scholar',
        description: 'Complete all lessons',
        condition: (progress) => progress.completedLessons.length >= lessons.length
    },
    {
        id: 5,
        icon: '💯',
        name: 'Perfectionist',
        description: 'Score 100% on any quiz',
        condition: (progress) => progress.perfectScores > 0
    },
    {
        id: 6,
        icon: '🔥',
        name: 'On Fire',
        description: 'Earn 250 points',
        condition: (progress) => progress.totalPoints >= 250
    }
];

// State Management
let currentLesson = null;
let currentQuestionIndex = 0;
let currentScore = 0;
let userAnswers = [];

// Local Storage Functions
function loadProgress() {
    const savedProgress = localStorage.getItem('kbraLearningProgress');
    if (savedProgress) {
        return JSON.parse(savedProgress);
    }
    return {
        totalPoints: 0,
        completedLessons: [],
        unlockedAchievements: [],
        perfectScores: 0
    };
}

function saveProgress(progress) {
    localStorage.setItem('kbraLearningProgress', JSON.stringify(progress));
    updateStatsDisplay();
}

function updateStatsDisplay() {
    const progress = loadProgress();
    document.getElementById('total-points').textContent = progress.totalPoints;
    document.getElementById('achievements-count').textContent = progress.unlockedAchievements.length;
    document.getElementById('completed-lessons').textContent = progress.completedLessons.length;
}

// Section Navigation
function showSection(sectionName) {
    // Hide all sections
    document.getElementById('welcome-section').style.display = 'none';
    document.getElementById('modules-hub-section').style.display = 'none';
    document.getElementById('lessons-section').style.display = 'none';
    document.getElementById('quiz-section').style.display = 'none';
    document.getElementById('achievements-section').style.display = 'none';
    document.getElementById('results-section').style.display = 'none';

    // Update nav buttons
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));

    // Show requested section
    switch(sectionName) {
        case 'modules':
            document.getElementById('modules-hub-section').style.display = 'block';
            loadModulesStats();
            document.querySelectorAll('.nav-btn')[0].classList.add('active');
            break;
        case 'lessons':
            document.getElementById('lessons-section').style.display = 'block';
            renderLessons();
            document.querySelectorAll('.nav-btn')[1].classList.add('active');
            break;
        case 'achievements':
            document.getElementById('achievements-section').style.display = 'block';
            renderAchievements();
            document.querySelectorAll('.nav-btn')[2].classList.add('active');
            break;
    }
}

function startLearning() {
    showSection('modules');
}
}

function backToLessons() {
    showSection('lessons');
}

// Lessons Rendering
function renderLessons() {
    const lessonsGrid = document.getElementById('lessons-grid');
    const progress = loadProgress();
    
    lessonsGrid.innerHTML = lessons.map(lesson => {
        const isCompleted = progress.completedLessons.includes(lesson.id);
        return `
            <div class="lesson-card ${isCompleted ? 'completed' : ''}" onclick="startLesson(${lesson.id})">
                <span class="lesson-icon">${lesson.icon}</span>
                <div class="lesson-title">${lesson.title}</div>
                <div class="lesson-description">${lesson.description}</div>
                <div class="lesson-meta">
                    <span class="lesson-difficulty">${lesson.difficulty}</span>
                    <span class="lesson-points">⭐ ${lesson.points} pts</span>
                </div>
            </div>
        `;
    }).join('');
}

// Quiz Functions
function startLesson(lessonId) {
    currentLesson = lessons.find(l => l.id === lessonId);
    currentQuestionIndex = 0;
    currentScore = 0;
    userAnswers = [];
    
    document.getElementById('lessons-section').style.display = 'none';
    document.getElementById('quiz-section').style.display = 'block';
    
    document.getElementById('quiz-title').textContent = currentLesson.title;
    document.getElementById('total-questions').textContent = currentLesson.questions.length;
    
    showQuestion();
}

function showQuestion() {
    if (currentQuestionIndex >= currentLesson.questions.length) {
        showResults();
        return;
    }

    const question = currentLesson.questions[currentQuestionIndex];
    document.getElementById('current-question').textContent = currentQuestionIndex + 1;
    document.getElementById('question-text').textContent = question.question;
    
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = question.options.map((option, index) => `
        <button class="option-btn" onclick="selectAnswer(${index})">${option}</button>
    `).join('');
    
    document.getElementById('next-btn').style.display = 'none';
}

function selectAnswer(selectedIndex) {
    const question = currentLesson.questions[currentQuestionIndex];
    const buttons = document.querySelectorAll('.option-btn');
    
    // Disable all buttons
    buttons.forEach(btn => btn.disabled = true);
    
    // Show correct/incorrect
    buttons[selectedIndex].classList.add(selectedIndex === question.correct ? 'correct' : 'incorrect');
    if (selectedIndex !== question.correct) {
        buttons[question.correct].classList.add('correct');
    }
    
    // Track answer
    userAnswers.push({
        questionIndex: currentQuestionIndex,
        selectedIndex: selectedIndex,
        correct: selectedIndex === question.correct
    });
    
    if (selectedIndex === question.correct) {
        currentScore++;
    }
    
    // Show next button
    document.getElementById('next-btn').style.display = 'block';
}

function nextQuestion() {
    currentQuestionIndex++;
    showQuestion();
}

function showResults() {
    document.getElementById('quiz-section').style.display = 'none';
    document.getElementById('results-section').style.display = 'block';
    
    const totalQuestions = currentLesson.questions.length;
    const percentage = (currentScore / totalQuestions) * 100;
    
    document.getElementById('final-score').textContent = currentScore;
    document.getElementById('max-score').textContent = totalQuestions;
    
    let message = '';
    let pointsEarned = 0;
    
    if (percentage === 100) {
        message = 'Perfect! You\'re a superstar! 🌟';
        pointsEarned = currentLesson.points;
    } else if (percentage >= 80) {
        message = 'Great job! You really know your stuff! 🎉';
        pointsEarned = Math.floor(currentLesson.points * 0.8);
    } else if (percentage >= 60) {
        message = 'Good effort! Keep practicing! 💪';
        pointsEarned = Math.floor(currentLesson.points * 0.6);
    } else {
        message = 'Nice try! Practice makes perfect! 📚';
        pointsEarned = Math.floor(currentLesson.points * 0.4);
    }
    
    document.getElementById('result-message').textContent = message;
    document.getElementById('points-earned').textContent = pointsEarned;
    
    // Update progress
    const progress = loadProgress();
    progress.totalPoints += pointsEarned;
    
    if (!progress.completedLessons.includes(currentLesson.id)) {
        progress.completedLessons.push(currentLesson.id);
    }
    
    if (percentage === 100) {
        progress.perfectScores = (progress.perfectScores || 0) + 1;
    }
    
    saveProgress(progress);
    checkAchievements();
}

function retryQuiz() {
    startLesson(currentLesson.id);
}

// Achievements
function renderAchievements() {
    const achievementsGrid = document.getElementById('achievements-grid');
    const progress = loadProgress();
    
    achievementsGrid.innerHTML = achievements.map(achievement => {
        const isUnlocked = progress.unlockedAchievements.includes(achievement.id);
        return `
            <div class="achievement-card ${isUnlocked ? 'unlocked' : 'locked'}">
                <span class="achievement-icon">${achievement.icon}</span>
                <div class="achievement-name">${achievement.name}</div>
                <div class="achievement-description">${achievement.description}</div>
            </div>
        `;
    }).join('');
}

function checkAchievements() {
    const progress = loadProgress();
    let newAchievements = [];
    
    achievements.forEach(achievement => {
        if (!progress.unlockedAchievements.includes(achievement.id) && achievement.condition(progress)) {
            progress.unlockedAchievements.push(achievement.id);
            newAchievements.push(achievement);
        }
    });
    
    if (newAchievements.length > 0) {
        saveProgress(progress);
        showAchievementNotification(newAchievements);
    }
}

function showAchievementNotification(achievements) {
    // Simple alert for now - could be enhanced with a custom modal
    achievements.forEach(achievement => {
        setTimeout(() => {
            alert(`🏆 Achievement Unlocked!\n\n${achievement.icon} ${achievement.name}\n${achievement.description}`);
        }, 500);
    });
}

// Reset Progress
function resetProgress() {
    if (confirm('Are you sure you want to reset all your progress? This cannot be undone.')) {
        localStorage.removeItem('kbraLearningProgress');
        updateStatsDisplay();
        showSection('modules');
        alert('Your progress has been reset!');
    }
}

// Load Modules Stats from Shared Storage
function loadModulesStats() {
    try {
        // Access the shared storage system used by modules
        const kbraLearning = localStorage.getItem('kbra-learning');
        if (!kbraLearning) {
            // No data yet - show defaults
            document.getElementById('completed-modules').textContent = '0';
            document.getElementById('module-points').textContent = '0';
            document.getElementById('current-streak').textContent = '0';
            return;
        }

        const data = JSON.parse(kbraLearning);
        
        // Count completed modules (modules with 80%+ progress)
        let completedCount = 0;
        let totalPoints = 0;
        
        const moduleIds = [
            'suma', 'resta', 'multiplicacion', 'division',
            'perimetro-area', 'formas', 'angulos',
            'redondeo', 'composicion-decimal', 'factorizacion-prima',
            'reloj', 'calendario', 'estaciones'
        ];
        
        moduleIds.forEach(moduleId => {
            if (data.modules && data.modules[moduleId]) {
                const moduleData = data.modules[moduleId];
                totalPoints += moduleData.points || 0;
                
                // Check if module is completed (10+ correct answers)
                if (moduleData.exercises && moduleData.exercises.correct >= 10) {
                    completedCount++;
                }
            }
        });
        
        // Update display
        document.getElementById('completed-modules').textContent = completedCount;
        document.getElementById('module-points').textContent = totalPoints;
        document.getElementById('current-streak').textContent = data.streak || 0;
        
    } catch (error) {
        console.error('Error loading modules stats:', error);
        document.getElementById('completed-modules').textContent = '0';
        document.getElementById('module-points').textContent = '0';
        document.getElementById('current-streak').textContent = '0';
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    updateStatsDisplay();
    loadModulesStats();
    
    // Check if this is first visit
    const progress = loadProgress();
    if (progress.totalPoints === 0 && progress.completedLessons.length === 0) {
        document.getElementById('welcome-section').style.display = 'block';
    } else {
        showSection('lessons');
    }
});
