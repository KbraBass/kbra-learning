# 🏗️ Architecture Visual Guide

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    🏠 Main Landing Page                      │
│                      (index.html)                            │
│                                                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│  │ Original │  │ Original │  │  📚 New  │  │  Stats   │  │
│  │  Quizzes │  │ Features │  │ Modules  │  │ & Badges │  │
│  └──────────┘  └──────────┘  └────┬─────┘  └──────────┘  │
└────────────────────────────────────┼──────────────────────┘
                                     │
                                     ▼
         ┌───────────────────────────────────────────────┐
         │         🎓 Modules Hub (modules/index.html)   │
         │                                                │
         │  Shows all categories with progress tracking  │
         └─┬──────────────┬────────────┬─────────────┬──┘
           │              │            │             │
           ▼              ▼            ▼             ▼
    ┌──────────┐  ┌──────────┐  ┌───────────┐  ┌──────────┐
    │🔢 Basic  │  │🔷 Geometry│  │🎯 Numbers│  │⏰ Time  │
    │  Math    │  │           │  │          │  │ Concepts │
    └────┬─────┘  └────┬──────┘  └────┬─────┘  └────┬─────┘
         │             │              │             │
         └─────────────┴──────────────┴─────────────┘
                           │
                           ▼
              ┌─────────────────────────┐
              │  Category Landing Page  │
              │   (e.g., basic-math/)   │
              │                         │
              │  Shows module cards     │
              │  Category progress bar  │
              └────────┬────────────────┘
                       │
                       ▼
              ┌─────────────────────────┐
              │   Individual Module      │
              │   (e.g., suma.html)      │
              │                          │
              │  • Uses shared libs      │
              │  • Uses shared CSS       │
              │  • Saves to localStorage │
              └──────────────────────────┘
```

## Data Flow Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                         User Interaction                         │
└────────────────────────────┬─────────────────────────────────────┘
                             │
                             ▼
         ┌───────────────────────────────────────┐
         │         Module Logic (HTML)           │
         │  • Handles user input                 │
         │  • Validates answers                  │
         │  • Renders UI                         │
         └──┬──────────────────┬─────────────────┘
            │                  │
            ▼                  ▼
    ┌───────────────┐  ┌──────────────────┐
    │ Components.js │  │  Gamification.js │
    │               │  │                  │
    │ • UI helpers  │  │ • Points         │
    │ • Templates   │  │ • Achievements   │
    │ • Generators  │  │ • Levels         │
    └───────────────┘  └────────┬─────────┘
                                │
                                ▼
                      ┌─────────────────┐
                      │   Storage.js    │
                      │                 │
                      │ • Save data     │
                      │ • Load data     │
                      │ • Persistence   │
                      └────────┬────────┘
                               │
                               ▼
                     ┌──────────────────┐
                     │   localStorage   │
                     │  (Browser API)   │
                     │                  │
                     │  All user data   │
                     │  persisted here  │
                     └──────────────────┘
```

## File Dependency Map

```
Individual Module (e.g., suma.html)
│
├─ Depends on CSS
│  ├─ ../../css/core.css         ← Base styles, variables, layout
│  └─ ../../css/components.css   ← Cards, buttons, toasts
│
├─ Depends on JavaScript
│  ├─ ../../lib/storage.js       ← localStorage management
│  ├─ ../../lib/gamification.js  ← Points, achievements, levels
│  └─ ../../lib/components.js    ← UI component generators
│
└─ Module-specific
   ├─ <style> (minimal overrides)
   └─ <script> (module logic only)
```

## Component Hierarchy

```
Module Page Structure
│
├── Header (Components.createHeader)
│   ├── Title
│   ├── Subtitle
│   └── Back Button
│
├── Tabs (Components.createTabs)
│   └── Tab Buttons
│
├── Content Section
│   │
│   ├── Tab 1: Basic
│   │   ├── Input Section (Components.createInputSection)
│   │   │   ├── Input Fields
│   │   │   ├── Button
│   │   │   └── Result Display
│   │   ├── Visual Demo (Components.createVisualDemo)
│   │   ├── Explanation (Components.createExplanation)
│   │   └── Fun Facts (Components.createFunFacts)
│   │
│   ├── Tab 2: Advanced
│   │   └── Similar structure
│   │
│   └── Tab 3: Practice
│       ├── Score Display (Components.createScoreDisplay)
│       ├── Question (Components.createQuestion)
│       └── Tips (Components.createFunFacts)
│
└── Toast Notifications (auto-generated)
    ├── Achievement Unlocked
    ├── Level Up
    └── Module Completed
```

## localStorage Data Structure

```javascript
localStorage['kbra-learning'] = {
  version: "1.0.0",
  
  user: {
    totalPoints: 150,           // Global points
    currentLevel: "Intermedio", // Current level
    createdAt: "2025-11-26",
    lastVisit: "2025-11-26"
  },
  
  achievements: [
    {
      id: "first-steps",
      unlocked: true,
      date: "2025-11-26T10:30:00Z"
    },
    {
      id: "star-student",
      unlocked: true,
      date: "2025-11-26T11:45:00Z"
    }
  ],
  
  modules: {
    "suma": {
      completed: true,
      score: 150,
      bestScore: 150,
      attempts: 10,
      firstAttempt: "2025-11-26T10:00:00Z",
      lastAttempt: "2025-11-26T11:30:00Z",
      timeSpent: 1800  // seconds
    },
    "resta": {
      completed: false,
      score: 45,
      bestScore: 60,
      attempts: 3,
      // ...
    }
  },
  
  stats: {
    totalModulesCompleted: 1,
    totalTimeSpent: 1800,
    streak: 1,
    lastStreakDate: "2025-11-26",
    perfectScores: 0
  }
}
```

## Points Flow Diagram

```
User Action
    │
    ▼
┌────────────────┐
│ Correct Answer │ → +10 points
└────────┬───────┘
         │
         ├→ Gamification.addPoints(10, moduleId)
         │      │
         │      ├→ Storage.addPoints(10)
         │      │      │
         │      │      └→ Updates totalPoints in localStorage
         │      │
         │      ├→ Check if level changes
         │      │      │
         │      │      └→ Show level-up toast if needed
         │      │
         │      └→ Gamification.checkAchievements()
         │             │
         │             └→ Check all conditions
         │                    │
         │                    └→ Unlock & show new achievements
         │
         └→ Update UI displays
                │
                └→ Show success feedback
```

## Achievement Checking Flow

```
Gamification.checkAchievements()
    │
    ├→ Get current stats from Storage
    │   ├── totalPoints
    │   ├── completedModules
    │   ├── completedList (array of module IDs)
    │   ├── streak
    │   └── perfectScores
    │
    ├→ Loop through all achievement definitions
    │   │
    │   └→ For each achievement:
    │       │
    │       ├→ Is it already unlocked?
    │       │   ├─ Yes → Skip
    │       │   └─ No  → Continue
    │       │
    │       ├→ Check condition(stats)
    │       │   │
    │       │   └→ Does condition return true?
    │       │       ├─ Yes → Unlock achievement
    │       │       │         │
    │       │       │         ├→ Storage.unlockAchievement(id)
    │       │       │         │      │
    │       │       │         │      └→ Add to achievements array
    │       │       │         │
    │       │       │         └→ Show achievement toast
    │       │       │
    │       │       └─ No  → Continue to next
    │       │
    │       └→ Next achievement
    │
    └→ Return newly unlocked achievements
```

## CSS Variable System

```
:root {
  /* Colors */
  --color-primary: #667eea          → Purple (main brand)
  --color-secondary: #f093fb        → Pink (accents)
  --color-accent: #4ecdc4           → Teal (success)
  --color-success: #00b894          → Green
  --color-error: #ff6b6b            → Red
  
  /* Gradients */
  --gradient-primary: linear-gradient(135deg, #667eea, #764ba2)
  --gradient-secondary: linear-gradient(135deg, #f093fb, #f5576c)
  --gradient-accent: linear-gradient(135deg, #4ecdc4, #44a08d)
  
  /* Spacing (8px base) */
  --space-xs:  4px    (0.5x)
  --space-sm:  8px    (1x)
  --space-md:  16px   (2x)
  --space-lg:  24px   (3x)
  --space-xl:  32px   (4x)
  --space-2xl: 48px   (6x)
  --space-3xl: 64px   (8x)
  
  /* Typography */
  --text-xs:   0.75rem  (12px)
  --text-sm:   0.875rem (14px)
  --text-base: 1rem     (16px)
  --text-lg:   1.125rem (18px)
  --text-xl:   1.25rem  (20px)
  --text-2xl:  1.5rem   (24px)
  --text-3xl:  2rem     (32px)
  --text-4xl:  2.5rem   (40px)
  --text-5xl:  3rem     (48px)
  
  /* Border Radius */
  --radius-sm:   8px
  --radius-md:   12px
  --radius-lg:   20px
  --radius-xl:   30px
  --radius-full: 9999px
  
  /* Shadows */
  --shadow-sm:  0 2px 4px rgba(0,0,0,0.1)
  --shadow-md:  0 4px 6px rgba(0,0,0,0.1)
  --shadow-lg:  0 10px 30px rgba(0,0,0,0.2)
  --shadow-xl:  0 20px 60px rgba(0,0,0,0.3)
}
```

## Responsive Breakpoints

```
┌─────────────────────────────────────────────────────────┐
│                    < 768px                              │
│                    📱 Mobile                            │
│                                                         │
│  • Single column layout                                │
│  • Stacked cards                                       │
│  • Larger touch targets (44px min)                    │
│  • Simplified visual demos                            │
│  • Bottom navigation                                   │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                768px - 1024px                           │
│                  📱 Tablet                              │
│                                                         │
│  • 2-column layout for cards                          │
│  • Moderate spacing                                    │
│  • Touch-friendly but more dense                      │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                   > 1024px                              │
│                 💻 Desktop                              │
│                                                         │
│  • 3-4 column grid for cards                          │
│  • Full spacing                                        │
│  • Hover effects                                       │
│  • All features visible                                │
└─────────────────────────────────────────────────────────┘
```

## Level Progression

```
                   Principiante
                   (0-199 points)
                         │
                         │ Earn 200 points
                         ▼
                   Intermedio
                   (200-499 points)
                         │
                         │ Earn 500 points
                         ▼
                     Experto
                   (500+ points)
```

## Module Conversion Workflow

```
1. Original File (custom/suma.html)
   │
   │  ← Read and understand structure
   │
   ▼
2. Copy Template (modules/basic-math/suma.html)
   │
   │  ← Use existing suma.html as template
   │
   ▼
3. Update Constants
   │  • MODULE_ID
   │  • Title, icon, descriptions
   │
   ▼
4. Preserve Content
   │  • Copy tab content
   │  • Copy explanations
   │  • Copy fun facts
   │
   ▼
5. Convert Functions
   │  • Use Components.js where possible
   │  • Keep module-specific logic
   │  • Remove duplicate CSS
   │
   ▼
6. Integrate Gamification
   │  • addPoints on success
   │  • subtractPoints on error
   │  • recordCompletion when done
   │
   ▼
7. Test
   │  • All features work
   │  • Points save correctly
   │  • No console errors
   │
   ▼
8. Deploy
   │  • Commit to git
   │  • Push to GitHub Pages
   │
   ▼
9. Update Category Index
   │  • Add module card
   │  • Update progress tracking
```

---

This visual guide complements the written documentation and should help you understand how all the pieces fit together! 🎨
