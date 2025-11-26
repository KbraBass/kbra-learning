# ✅ Module Conversion Checklist

Use this checklist for each module you convert to ensure consistency and completeness.

---

## 📋 Module: _________________

**Original File**: `custom/____________.html`  
**New Location**: `modules/_______/____________.html`  
**Date Started**: ___________  
**Date Completed**: ___________

---

## Pre-Conversion

- [ ] Read through original file completely
- [ ] Identify all tabs/sections
- [ ] Note unique features or special functions
- [ ] Check for any external dependencies
- [ ] Decide on MODULE_ID (should match filename)

---

## File Setup

- [ ] Create new file in correct modules/ subdirectory
- [ ] Copy template structure from existing converted module
- [ ] Link shared CSS files:
  - [ ] `../../css/core.css`
  - [ ] `../../css/components.css`
- [ ] Link shared JS files:
  - [ ] `../../lib/storage.js`
  - [ ] `../../lib/gamification.js`
  - [ ] `../../lib/components.js`

---

## HTML Structure

- [ ] Update `<title>` tag
- [ ] Define MODULE_ID constant in JavaScript
- [ ] Create header container: `<div id="header-container"></div>`
- [ ] Create tabs container: `<div id="tabs-container"></div>`
- [ ] Create content section: `<div class="content">`

---

## Header & Navigation

- [ ] Use `Components.createHeader()` with:
  - [ ] Appropriate title
  - [ ] Descriptive subtitle
  - [ ] Correct icon/emoji
  - [ ] Back link to category or main hub
- [ ] Define tab array with IDs and labels
- [ ] Render tabs using `Components.createTabs()`
- [ ] Implement `showTab()` function (use template)

---

## Content Migration

### Tab 1: Basic/Introduction
- [ ] Copy content from original
- [ ] Convert input sections to use shared classes
- [ ] Use `Components.createInputSection()` if applicable
- [ ] Preserve all explanations
- [ ] Keep fun facts (use `Components.createFunFacts()` if formatted)
- [ ] Test all interactive elements

### Tab 2: Advanced/Second Section
- [ ] Copy content from original
- [ ] Convert styling to shared classes
- [ ] Implement any special visualizations
- [ ] Preserve step-by-step explanations
- [ ] Test functionality

### Tab 3: Practice
- [ ] Create score display container
- [ ] Render score using `Components.createScoreDisplay()`
- [ ] Implement question generation
- [ ] Implement answer checking
- [ ] Add gamification integration (see below)

---

## JavaScript Functions

### Core Functions
- [ ] `init()` - Initialize module
  - [ ] Render header
  - [ ] Render tabs
  - [ ] Load saved progress from Storage
  - [ ] Generate first question (if applicable)
- [ ] `showTab(tabName)` - Tab switching
- [ ] Main calculation/operation functions
- [ ] Visual demonstration functions
- [ ] Question generation (if practice section)
- [ ] Answer validation

### Function Updates
- [ ] Remove any duplicate utility functions
- [ ] Use Components.js functions where applicable
- [ ] Simplify where possible using shared code
- [ ] Ensure all IDs are unique within the module

---

## Gamification Integration

### Points System
- [ ] Award points on correct answers:
  ```javascript
  Gamification.addPoints(10, MODULE_ID);
  ```
- [ ] Deduct points on errors:
  ```javascript
  Gamification.subtractPoints(5, MODULE_ID);
  ```
- [ ] Update score display after point changes:
  ```javascript
  updateScoreDisplay();
  ```

### Progress Tracking
- [ ] Load module data on init:
  ```javascript
  const moduleData = Storage.getModuleData(MODULE_ID);
  ```
- [ ] Save module data periodically:
  ```javascript
  Storage.saveModuleData(MODULE_ID, { score: score });
  ```
- [ ] Mark as complete when appropriate:
  ```javascript
  Gamification.recordCompletion(MODULE_ID, finalScore);
  ```
- [ ] Update daily streak:
  ```javascript
  Storage.updateStreak();
  ```

### Time Tracking
- [ ] Track start time:
  ```javascript
  let startTime = Date.now();
  ```
- [ ] Save time on page unload:
  ```javascript
  window.addEventListener('beforeunload', function() {
      const timeSpent = Math.floor((Date.now() - startTime) / 1000);
      Storage.addTimeSpent(timeSpent);
  });
  ```

---

## Styling

### CSS Classes
- [ ] Use `.container` for main wrapper
- [ ] Use `.header` for header section
- [ ] Use `.tabs` for tab navigation
- [ ] Use `.tab-button` for tab buttons
- [ ] Use `.content` for content wrapper
- [ ] Use `.tab-content` for tab panels
- [ ] Use `.input-section` for calculator sections
- [ ] Use `.input-group` for form fields
- [ ] Use `.calc-button` for action buttons
- [ ] Use `.result` for result displays
- [ ] Use `.explanation` for info boxes
- [ ] Use `.fun-facts` for tip sections
- [ ] Use `.practice-area` for practice sections

### Custom Styling
- [ ] Keep `<style>` block minimal (< 50 lines ideal)
- [ ] Only include module-specific overrides
- [ ] Use CSS variables from core.css
- [ ] Ensure responsive on mobile

---

## Visual Elements

### Number Visualizations
- [ ] Use `Components.createNumberBlocks()` for visual math
- [ ] Keep maximum display reasonable (< 40 items)
- [ ] Show message for numbers too large to visualize

### Demonstrations
- [ ] Preserve all visual teaching aids
- [ ] Use `.visual-demo` container
- [ ] Ensure animations work (popIn, fadeIn, etc.)

---

## Interactivity

### Input Handling
- [ ] Add Enter key support:
  ```javascript
  input.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
          // trigger calculation
      }
  });
  ```
- [ ] Validate inputs before processing
- [ ] Show helpful error messages
- [ ] Clear results between operations

### Button States
- [ ] Disable buttons when appropriate
- [ ] Update button text to reflect state
- [ ] Re-enable after operation completes

---

## Testing

### Functionality Testing
- [ ] All tabs switch correctly
- [ ] Tab buttons highlight active tab
- [ ] All calculations work correctly
- [ ] Visual demos render properly
- [ ] Practice questions generate
- [ ] Answers validate correctly
- [ ] Points are awarded/deducted
- [ ] No JavaScript console errors
- [ ] No CSS warnings

### Data Persistence
- [ ] Open DevTools → Application → localStorage
- [ ] Verify data saves on point changes
- [ ] Reload page and check data persists
- [ ] Verify module completion saves
- [ ] Check achievement unlock conditions

### Browser Testing
- [ ] Chrome/Edge (desktop)
- [ ] Firefox (desktop)
- [ ] Safari (desktop)
- [ ] Mobile browser (iOS or Android)

### Responsive Testing
- [ ] Test at 375px width (mobile)
- [ ] Test at 768px width (tablet)
- [ ] Test at 1200px width (desktop)
- [ ] Check text readability
- [ ] Verify touch targets are large enough
- [ ] Ensure no horizontal scrolling

---

## Integration

### Category Page
- [ ] Add module card to category index.html
- [ ] Update module array with:
  - [ ] Correct id
  - [ ] Icon
  - [ ] Title
  - [ ] Description
  - [ ] Link to file
- [ ] Test navigation from category page

### Modules Hub
- [ ] Verify module shows in appropriate category
- [ ] Check if "Pronto!" placeholder needs removal
- [ ] Ensure completion status displays correctly

---

## Documentation

### Code Comments
- [ ] Add brief comment for MODULE_ID
- [ ] Comment complex functions
- [ ] Explain any non-obvious logic

### Change Notes
- [ ] Note any features changed from original
- [ ] Document any known limitations
- [ ] Record any TODOs for future improvement

---

## Final Checks

### Code Quality
- [ ] Remove commented-out code
- [ ] Remove console.log statements
- [ ] Consistent indentation
- [ ] Meaningful variable names
- [ ] No duplicate IDs in HTML

### User Experience
- [ ] All original features preserved
- [ ] Educational content intact
- [ ] Helpful error messages
- [ ] Clear instructions
- [ ] Smooth animations
- [ ] Fast loading

### Accessibility
- [ ] Semantic HTML structure
- [ ] Proper heading hierarchy
- [ ] Buttons have clear labels
- [ ] Form inputs have labels
- [ ] Color contrast is sufficient

---

## Deployment

- [ ] Git add new file
- [ ] Git commit with clear message:
  ```bash
  git commit -m "feat: convert [module-name] to unified system"
  ```
- [ ] Git push to GitHub
- [ ] Verify deployed on GitHub Pages
- [ ] Test live version

---

## Post-Deployment

- [ ] Test module on live site
- [ ] Check localStorage works in production
- [ ] Verify all links work
- [ ] Share for feedback
- [ ] Note any issues for follow-up

---

## Notes

(Space for any module-specific notes, issues encountered, or improvements made)

```
_________________________________________________________________

_________________________________________________________________

_________________________________________________________________

_________________________________________________________________
```

---

## Completion Sign-Off

**Converted by**: ___________  
**Reviewed by**: ___________  
**Date**: ___________  
**Status**: ⬜ Draft | ⬜ Testing | ⬜ Complete | ⬜ Deployed

---

## Estimated Time

- **Expected**: 20-30 minutes for straightforward modules
- **Actual**: _______ minutes
- **Notes**: _________________________________________________

---

**✅ Congratulations on completing another module!**

Each module converted brings you closer to a fully unified, maintainable platform. Keep going! 🚀
