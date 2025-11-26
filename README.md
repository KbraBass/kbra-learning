# 🎓 Kbra Learning Platform

A gamified learning platform built with simple HTML, CSS, and JavaScript for GitHub Pages. Perfect for family learning with interactive lessons, quizzes, and achievements!

## 🌟 Features

- **Interactive Lessons**: 6 engaging lessons covering various subjects
  - 🔢 Basic Math (Addition & Subtraction)
  - ✖️ Multiplication Tables
  - 🌍 World Capitals
  - 🔬 Basic Science
  - 📚 English Grammar
  - ⏰ Telling Time

- **Gamification Elements**:
  - ⭐ Points system - Earn points based on quiz performance
  - 🏆 Achievements - Unlock 6 different achievements
  - 📊 Progress tracking - See completed lessons at a glance
  - 💾 Local storage - Progress persists across sessions

- **Quiz System**:
  - 5 questions per lesson
  - Immediate feedback on answers
  - Color-coded correct/incorrect responses
  - Performance-based point rewards

- **Responsive Design**:
  - Beautiful gradient UI
  - Works on desktop and mobile devices
  - Smooth animations and transitions
  - Bottom navigation for easy access

## 🚀 Getting Started

### View Online
Visit the live site at: `https://kbrabass.github.io/kbra-learning/`

### Run Locally
1. Clone the repository:
   ```bash
   git clone https://github.com/KbraBass/kbra-learning.git
   cd kbra-learning
   ```

2. Open `index.html` in your web browser, or start a local server:
   ```bash
   # Using Python 3
   python3 -m http.server 8080
   
   # Using Node.js
   npx http-server -p 8080
   ```

3. Navigate to `http://localhost:8080` in your browser

## 📖 How to Use

1. **Start Learning**: Click "Start Learning" on the welcome screen
2. **Choose a Lesson**: Select any lesson card to begin a quiz
3. **Answer Questions**: Click on your answer choice
4. **Earn Points**: Complete quizzes to earn points based on your score
5. **Unlock Achievements**: Meet achievement criteria to unlock badges
6. **Track Progress**: View your stats in the header and completed lessons

## 🎯 Achievements

- 🎯 **First Steps** - Complete your first lesson
- ⭐ **Star Student** - Earn 100 points
- 🏆 **Champion** - Complete 3 lessons
- 🎓 **Scholar** - Complete all lessons
- 💯 **Perfectionist** - Score 100% on any quiz
- 🔥 **On Fire** - Earn 250 points

## 🛠️ Technical Details

- **Pure Frontend**: No backend or build process required
- **Technologies**: HTML5, CSS3, Vanilla JavaScript
- **Storage**: Browser localStorage for progress persistence
- **Hosting**: GitHub Pages compatible
- **No Dependencies**: No external libraries needed

## 📁 File Structure

```
kbra-learning/
├── index.html      # Main HTML structure
├── styles.css      # All styling and animations
├── app.js          # Application logic and data
├── LICENSE         # MIT License
└── README.md       # This file
```

## 🎨 Customization

### Adding New Lessons

Edit `app.js` and add a new lesson object to the `lessons` array:

```javascript
{
    id: 7,
    icon: '📝',
    title: 'Your Lesson Title',
    description: 'Lesson description',
    difficulty: 'Easy|Medium|Hard',
    points: 50,
    questions: [
        {
            question: 'Your question?',
            options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
            correct: 0  // Index of correct answer (0-3)
        }
        // Add more questions...
    ]
}
```

### Adding New Achievements

Add to the `achievements` array in `app.js`:

```javascript
{
    id: 7,
    icon: '🌟',
    name: 'Achievement Name',
    description: 'How to unlock this achievement',
    condition: (progress) => {
        // Return true when achievement should be unlocked
        return progress.totalPoints >= 500;
    }
}
```

## 📱 Browser Compatibility

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

This is a personal family learning platform, but suggestions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Propose new lessons or quiz questions

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍👩‍👧‍👦 Made For

Built with ❤️ for family learning and education
