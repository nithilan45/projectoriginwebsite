/* ============================================
   GENESIS INTERACTIVE LEARNING SYSTEM
   JavaScript for Quizzes, Activities & More
   ============================================ */

// State Management
let totalPoints = parseInt(localStorage.getItem('genesisPoints') || '0');
let lessonProgress = JSON.parse(localStorage.getItem('genesisProgress') || '{}');
let currentLessonId = document.body.dataset.lessonId || '1-1';

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeInteractives();
    updatePointsDisplay();
    initializeProgressBar();
});

// ============================================
// POINTS SYSTEM
// ============================================

function updatePointsDisplay() {
    const display = document.getElementById('points-display');
    if (display) {
        display.querySelector('.points-value').textContent = totalPoints;
    }
}

function awardPoints(amount, message) {
    totalPoints += amount;
    localStorage.setItem('genesisPoints', totalPoints.toString());
    updatePointsDisplay();
    
    // Show points popup
    showPointsPopup(amount, message);
}

function showPointsPopup(amount, message) {
    const popup = document.createElement('div');
    popup.className = 'points-earned';
    popup.innerHTML = `+${amount} points! ${message || ''}`;
    document.body.appendChild(popup);
    
    setTimeout(() => popup.remove(), 1500);
}

// ============================================
// PROGRESS BAR
// ============================================

function initializeProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.className = 'lesson-progress-bar';
    progressBar.id = 'lesson-progress-bar';
    document.body.appendChild(progressBar);
    
    // Update on scroll
    window.addEventListener('scroll', updateProgressBar);
    updateProgressBar();
}

function updateProgressBar() {
    const progressBar = document.getElementById('lesson-progress-bar');
    if (!progressBar) return;
    
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    
    progressBar.style.width = `${Math.min(progress, 100)}%`;
}

// ============================================
// QUIZ SYSTEM
// ============================================

function initializeInteractives() {
    // Initialize all quizzes
    document.querySelectorAll('.quiz-container').forEach(initializeQuiz);
    
    // Initialize all activities with model responses
    document.querySelectorAll('.interactive-activity').forEach(initializeActivity);
    
    // Initialize scenarios
    document.querySelectorAll('.scenario-container').forEach(initializeScenario);
    
    // Initialize fill-in-the-blank
    document.querySelectorAll('.fill-blank-container').forEach(initializeFillBlank);
    
    // Initialize matching exercises
    document.querySelectorAll('.matching-container').forEach(initializeMatching);
}

function initializeQuiz(quizContainer) {
    const options = quizContainer.querySelectorAll('.quiz-option');
    const checkBtn = quizContainer.querySelector('.quiz-check-btn');
    const feedback = quizContainer.querySelector('.quiz-feedback');
    const correctAnswer = quizContainer.dataset.correct;
    const explanation = quizContainer.dataset.explanation;
    
    let selectedOption = null;
    let answered = false;
    
    options.forEach(option => {
        option.addEventListener('click', () => {
            if (answered) return;
            
            // Deselect previous
            options.forEach(o => o.classList.remove('selected'));
            
            // Select current
            option.classList.add('selected');
            selectedOption = option.dataset.option;
            
            // Enable check button
            if (checkBtn) checkBtn.disabled = false;
        });
    });
    
    if (checkBtn) {
        checkBtn.addEventListener('click', () => {
            if (!selectedOption || answered) return;
            
            answered = true;
            const isCorrect = selectedOption === correctAnswer;
            
            // Mark correct/incorrect
            options.forEach(option => {
                if (option.dataset.option === correctAnswer) {
                    option.classList.add('correct');
                } else if (option.classList.contains('selected')) {
                    option.classList.add('incorrect');
                }
            });
            
            // Show feedback
            if (feedback) {
                feedback.classList.add('show', isCorrect ? 'correct' : 'incorrect');
                feedback.innerHTML = isCorrect 
                    ? `<strong>✓ Correct!</strong> ${explanation || ''}`
                    : `<strong>✗ Not quite.</strong> The correct answer is <strong>${correctAnswer}</strong>. ${explanation || ''}`;
            }
            
            // Award points
            if (isCorrect) {
                awardPoints(10, 'Quiz correct!');
            }
            
            // Update button
            checkBtn.textContent = isCorrect ? '✓ Correct!' : 'Review Answer';
            checkBtn.disabled = true;
            
            // Update progress dot if exists
            const progressDot = quizContainer.querySelector('.quiz-progress-dot.active');
            if (progressDot) {
                progressDot.classList.remove('active');
                progressDot.classList.add(isCorrect ? 'completed' : 'wrong');
            }
        });
    }
}

// ============================================
// ACTIVITY WITH MODEL RESPONSE
// ============================================

function initializeActivity(activityContainer) {
    const showModelBtn = activityContainer.querySelector('.show-model-btn');
    const modelResponse = activityContainer.querySelector('.model-response');
    const textarea = activityContainer.querySelector('.activity-input');
    const saveBtn = activityContainer.querySelector('.save-activity-btn');
    
    // Show model response button
    if (showModelBtn && modelResponse) {
        showModelBtn.addEventListener('click', () => {
            modelResponse.classList.toggle('show');
            
            if (modelResponse.classList.contains('show')) {
                showModelBtn.innerHTML = '<span>🔒</span> Hide Model Response';
                awardPoints(5, 'Reviewed model!');
            } else {
                showModelBtn.innerHTML = '<span>💡</span> Show Model Response';
            }
        });
    }
    
    // Save activity response
    if (saveBtn && textarea) {
        // Load saved response
        const activityId = activityContainer.dataset.activityId;
        const saved = localStorage.getItem(`genesis-activity-${activityId}`);
        if (saved) {
            textarea.value = saved;
        }
        
        saveBtn.addEventListener('click', () => {
            if (textarea.value.trim()) {
                localStorage.setItem(`genesis-activity-${activityId}`, textarea.value);
                awardPoints(15, 'Activity saved!');
                saveBtn.innerHTML = '✓ Saved!';
                saveBtn.style.background = '#22c55e';
                setTimeout(() => {
                    saveBtn.innerHTML = '<span>💾</span> Save My Response';
                    saveBtn.style.background = '';
                }, 2000);
            }
        });
    }
}

// ============================================
// SCENARIO/CASE STUDY
// ============================================

function initializeScenario(scenarioContainer) {
    const choices = scenarioContainer.querySelectorAll('.scenario-choice');
    const outcomes = scenarioContainer.querySelectorAll('.scenario-outcome');
    let answered = false;
    
    choices.forEach(choice => {
        choice.addEventListener('click', () => {
            if (answered) return;
            
            answered = true;
            
            // Highlight selected
            choices.forEach(c => c.classList.remove('selected'));
            choice.classList.add('selected');
            
            // Show corresponding outcome
            const outcomeId = choice.dataset.outcome;
            outcomes.forEach(outcome => {
                if (outcome.dataset.outcomeId === outcomeId) {
                    outcome.classList.add('show');
                    
                    // Award points based on outcome quality
                    const outcomeType = outcome.classList.contains('best') ? 'best' 
                        : outcome.classList.contains('good') ? 'good' : 'learning';
                    
                    if (outcomeType === 'best') {
                        awardPoints(20, 'Perfect choice!');
                    } else if (outcomeType === 'good') {
                        awardPoints(10, 'Good thinking!');
                    } else {
                        awardPoints(5, 'Learning moment!');
                    }
                }
            });
        });
    });
}

// ============================================
// FILL IN THE BLANK
// ============================================

function initializeFillBlank(container) {
    const inputs = container.querySelectorAll('.blank-input');
    const checkBtn = container.querySelector('.fill-blank-check-btn');
    
    if (checkBtn) {
        checkBtn.addEventListener('click', () => {
            let allCorrect = true;
            
            inputs.forEach(input => {
                const userAnswer = input.value.trim().toLowerCase();
                const correctAnswer = input.dataset.answer.toLowerCase();
                const alternatives = input.dataset.alternatives ? 
                    input.dataset.alternatives.toLowerCase().split(',') : [];
                
                const isCorrect = userAnswer === correctAnswer || 
                    alternatives.includes(userAnswer);
                
                input.classList.remove('correct', 'incorrect');
                input.classList.add(isCorrect ? 'correct' : 'incorrect');
                
                if (!isCorrect) allCorrect = false;
            });
            
            if (allCorrect) {
                awardPoints(15, 'All blanks correct!');
                checkBtn.innerHTML = '✓ All Correct!';
                checkBtn.disabled = true;
            }
        });
    }
}

// ============================================
// MATCHING EXERCISE
// ============================================

function initializeMatching(container) {
    const leftItems = container.querySelectorAll('.matching-left .matching-item');
    const rightItems = container.querySelectorAll('.matching-right .matching-item');
    
    let selectedLeft = null;
    let matches = {};
    const correctMatches = JSON.parse(container.dataset.matches || '{}');
    
    leftItems.forEach(item => {
        item.addEventListener('click', () => {
            if (item.classList.contains('matched')) return;
            
            leftItems.forEach(i => i.classList.remove('selected'));
            item.classList.add('selected');
            selectedLeft = item.dataset.id;
        });
    });
    
    rightItems.forEach(item => {
        item.addEventListener('click', () => {
            if (!selectedLeft || item.classList.contains('matched')) return;
            
            const rightId = item.dataset.id;
            
            // Check if match is correct
            if (correctMatches[selectedLeft] === rightId) {
                // Correct match!
                const leftItem = container.querySelector(`.matching-left .matching-item[data-id="${selectedLeft}"]`);
                leftItem.classList.remove('selected');
                leftItem.classList.add('matched');
                item.classList.add('matched');
                
                matches[selectedLeft] = rightId;
                awardPoints(5, 'Match found!');
                
                // Check if all matched
                if (Object.keys(matches).length === Object.keys(correctMatches).length) {
                    awardPoints(10, 'All matched!');
                }
            } else {
                // Wrong match - shake
                item.classList.add('shake');
                setTimeout(() => item.classList.remove('shake'), 300);
            }
            
            selectedLeft = null;
            leftItems.forEach(i => i.classList.remove('selected'));
        });
    });
}

// ============================================
// LESSON COMPLETION
// ============================================

function showLessonComplete(pointsEarned, activitiesCompleted) {
    const modal = document.createElement('div');
    modal.className = 'lesson-complete-modal';
    modal.innerHTML = `
        <div class="lesson-complete-content">
            <div class="lesson-complete-icon">🎉</div>
            <h2 class="lesson-complete-title">Lesson Complete!</h2>
            <p class="lesson-complete-subtitle">Great job finishing this lesson. Keep up the momentum!</p>
            <div class="lesson-complete-stats">
                <div class="complete-stat">
                    <span class="complete-stat-value">${pointsEarned}</span>
                    <span class="complete-stat-label">Points Earned</span>
                </div>
                <div class="complete-stat">
                    <span class="complete-stat-value">${activitiesCompleted}</span>
                    <span class="complete-stat-label">Activities Done</span>
                </div>
            </div>
            <div class="lesson-complete-actions">
                <button class="activity-btn activity-btn-secondary" onclick="this.closest('.lesson-complete-modal').remove()">
                    Review Lesson
                </button>
                <a href="${getNextLessonUrl()}" class="activity-btn activity-btn-primary">
                    Next Lesson →
                </a>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('show'), 10);
    
    // Save completion
    lessonProgress[currentLessonId] = {
        completed: true,
        points: pointsEarned,
        timestamp: new Date().toISOString()
    };
    localStorage.setItem('genesisProgress', JSON.stringify(lessonProgress));
}

function getNextLessonUrl() {
    // Map of lesson order
    const lessons = [
        '1-1-entrepreneurial-mindset',
        '1-2-finding-problems',
        '1-3-validating-problems',
        '1-4-understanding-customers',
        '2-1-ideation',
        '2-2-value-proposition',
        '2-3-business-model',
        '2-4-competitive-analysis',
        '3-1-mvp',
        '3-2-no-code-tools',
        '3-3-testing',
        '3-4-first-users',
        '4-1-storytelling',
        '4-2-pitch-deck',
        '4-3-presentation-skills',
        '4-4-launch-strategy'
    ];
    
    const currentIndex = lessons.indexOf(currentLessonId);
    if (currentIndex < lessons.length - 1) {
        return `${lessons[currentIndex + 1]}.html`;
    }
    return '../genesis.html';
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Auto-resize textareas
document.addEventListener('input', function(e) {
    if (e.target.classList.contains('activity-input')) {
        e.target.style.height = 'auto';
        e.target.style.height = e.target.scrollHeight + 'px';
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Press 'M' to toggle model response if focused on activity
    if (e.key === 'm' && e.target.classList.contains('activity-input')) {
        const activity = e.target.closest('.interactive-activity');
        const modelBtn = activity?.querySelector('.show-model-btn');
        if (modelBtn) modelBtn.click();
    }
});

// Export functions for external use
window.GenesisInteractive = {
    awardPoints,
    showLessonComplete,
    updatePointsDisplay
};
