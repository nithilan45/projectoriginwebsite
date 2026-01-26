/* ============================================
   GENESIS ADVANCED SIMULATIONS
   Interactive Business Learning System
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    initSliderSimulations();
    initScenarioGames();
    initBuilderExercises();
    initWhatIfComparisons();
    initConstraintPuzzles();
    initTimedDecisions();
    initForecastGames();
    initPatternDrills();
});

/* ============================================
   1. SLIDER SIMULATIONS
   ============================================ */

function initSliderSimulations() {
    document.querySelectorAll('.slider-simulation').forEach(sim => {
        const sliders = sim.querySelectorAll('.slider-input');
        const config = JSON.parse(sim.dataset.config || '{}');
        
        sliders.forEach(slider => {
            slider.addEventListener('input', () => updateSliderEffects(sim, config));
        });
        
        // Initial calculation
        updateSliderEffects(sim, config);
    });
}

function updateSliderEffects(sim, config) {
    const sliders = sim.querySelectorAll('.slider-input');
    const values = {};
    
    sliders.forEach(slider => {
        const name = slider.dataset.name;
        const value = parseFloat(slider.value);
        values[name] = value;
        
        // Update display
        const valueDisplay = sim.querySelector(`[data-value-for="${name}"]`);
        if (valueDisplay) {
            const format = slider.dataset.format || 'number';
            valueDisplay.textContent = formatValue(value, format);
        }
    });
    
    // Calculate effects based on config
    const effects = calculateEffects(values, config);
    
    // Update effect cards
    Object.keys(effects).forEach(effectName => {
        const card = sim.querySelector(`[data-effect="${effectName}"]`);
        if (card) {
            const effect = effects[effectName];
            const valueEl = card.querySelector('.effect-value');
            if (valueEl) {
                valueEl.textContent = formatValue(effect.value, effect.format);
            }
            
            // Update card state
            card.classList.remove('positive', 'negative', 'warning');
            if (effect.value > effect.neutral) card.classList.add('positive');
            else if (effect.value < effect.danger) card.classList.add('negative');
            else if (effect.value < effect.neutral) card.classList.add('warning');
        }
    });
    
    // Check for warnings
    const warningEl = sim.querySelector('.slider-warning');
    if (warningEl && config.warnings) {
        let showWarning = false;
        let warningText = '';
        
        config.warnings.forEach(w => {
            if (eval(w.condition.replace(/\$(\w+)/g, (_, name) => values[name] || 0))) {
                showWarning = true;
                warningText = w.message;
            }
        });
        
        if (showWarning) {
            warningEl.classList.add('show');
            warningEl.querySelector('.slider-warning-text').textContent = warningText;
        } else {
            warningEl.classList.remove('show');
        }
    }
}

function calculateEffects(values, config) {
    const effects = {};
    
    if (config.effects) {
        config.effects.forEach(effect => {
            let value = eval(effect.formula.replace(/\$(\w+)/g, (_, name) => values[name] || 0));
            effects[effect.name] = {
                value: Math.round(value * 100) / 100,
                format: effect.format || 'number',
                neutral: effect.neutral || 0,
                danger: effect.danger || 0
            };
        });
    }
    
    return effects;
}

function formatValue(value, format) {
    switch (format) {
        case 'currency': return '$' + value.toLocaleString();
        case 'percent': return value + '%';
        case 'months': return value + ' mo';
        default: return value.toLocaleString();
    }
}

/* ============================================
   2. SCENARIO GAMES (Multi-step)
   ============================================ */

function initScenarioGames() {
    document.querySelectorAll('.scenario-game').forEach(game => {
        const steps = JSON.parse(game.dataset.steps || '[]');
        let currentStep = 0;
        let choices = [];
        
        game.querySelectorAll('.scenario-choice-card').forEach(card => {
            card.addEventListener('click', () => {
                if (card.classList.contains('disabled')) return;
                
                // Deselect others
                game.querySelectorAll('.scenario-choice-card').forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');
                
                // Store choice
                choices[currentStep] = card.dataset.choice;
                
                // Show result after short delay
                setTimeout(() => {
                    showScenarioResult(game, steps[currentStep], card.dataset.choice);
                }, 300);
            });
        });
        
        // Next button
        const nextBtn = game.querySelector('.scenario-next-btn');
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentStep++;
                if (currentStep < steps.length) {
                    loadScenarioStep(game, steps[currentStep], currentStep);
                    updateScenarioProgress(game, currentStep, steps.length);
                } else {
                    showScenarioSummary(game, choices, steps);
                }
            });
        }
    });
}

function showScenarioResult(game, step, choice) {
    const resultEl = game.querySelector('.scenario-result');
    const result = step.outcomes[choice];
    
    if (resultEl && result) {
        resultEl.querySelector('.result-immediate .result-text').textContent = result.immediate;
        resultEl.querySelector('.result-delayed .result-text').textContent = result.delayed;
        resultEl.classList.add('show');
        
        // Disable choices
        game.querySelectorAll('.scenario-choice-card').forEach(c => c.classList.add('disabled'));
    }
}

function loadScenarioStep(game, step, index) {
    const promptEl = game.querySelector('.scenario-prompt');
    const choicesEl = game.querySelector('.scenario-choices-grid');
    const resultEl = game.querySelector('.scenario-result');
    
    if (promptEl) promptEl.textContent = step.prompt;
    
    if (choicesEl && step.choices) {
        choicesEl.innerHTML = step.choices.map((choice, i) => `
            <div class="scenario-choice-card" data-choice="${choice.id}">
                <div class="choice-title">
                    <span class="choice-letter">${String.fromCharCode(65 + i)}</span>
                    <span>${choice.title}</span>
                </div>
                <p class="choice-description">${choice.description}</p>
            </div>
        `).join('');
        
        // Re-attach listeners
        choicesEl.querySelectorAll('.scenario-choice-card').forEach(card => {
            card.addEventListener('click', () => {
                choicesEl.querySelectorAll('.scenario-choice-card').forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');
            });
        });
    }
    
    if (resultEl) resultEl.classList.remove('show');
}

function updateScenarioProgress(game, current, total) {
    const dots = game.querySelectorAll('.scenario-step-dot');
    dots.forEach((dot, i) => {
        dot.classList.remove('active', 'completed');
        if (i < current) dot.classList.add('completed');
        if (i === current) dot.classList.add('active');
    });
}

/* ============================================
   3. BUILDER EXERCISES (Drag & Drop)
   ============================================ */

function initBuilderExercises() {
    document.querySelectorAll('.builder-exercise').forEach(builder => {
        const palette = builder.querySelector('.palette-items');
        const canvas = builder.querySelector('.canvas-dropzones');
        const config = JSON.parse(builder.dataset.config || '{}');
        
        // Make palette items draggable
        palette.querySelectorAll('.palette-item').forEach(item => {
            item.draggable = true;
            
            item.addEventListener('dragstart', e => {
                e.dataTransfer.setData('text/plain', item.dataset.id);
                item.classList.add('dragging');
            });
            
            item.addEventListener('dragend', () => {
                item.classList.remove('dragging');
            });
        });
        
        // Make dropzones accept drops
        canvas.querySelectorAll('.dropzone').forEach(zone => {
            zone.addEventListener('dragover', e => {
                e.preventDefault();
                zone.classList.add('drag-over');
            });
            
            zone.addEventListener('dragleave', () => {
                zone.classList.remove('drag-over');
            });
            
            zone.addEventListener('drop', e => {
                e.preventDefault();
                zone.classList.remove('drag-over');
                
                const itemId = e.dataTransfer.getData('text/plain');
                const item = palette.querySelector(`[data-id="${itemId}"]`);
                
                if (item && !item.classList.contains('used')) {
                    addToDropzone(zone, item, itemId, builder);
                    item.classList.add('used');
                    checkBuilderComplete(builder, config);
                }
            });
        });
    });
}

function addToDropzone(zone, item, itemId, builder) {
    zone.classList.add('filled');
    
    const droppedHTML = `
        <div class="dropped-item" data-id="${itemId}">
            <span>${item.textContent}</span>
            <button class="remove-btn">×</button>
        </div>
    `;
    
    // Check if zone accepts multiple
    const existingContent = zone.querySelector('.dropped-item');
    if (existingContent && !zone.dataset.multiple) {
        // Replace existing
        const oldId = existingContent.dataset.id;
        const oldItem = builder.querySelector(`.palette-item[data-id="${oldId}"]`);
        if (oldItem) oldItem.classList.remove('used');
        existingContent.remove();
    }
    
    zone.insertAdjacentHTML('beforeend', droppedHTML);
    
    // Remove button handler
    zone.querySelector('.dropped-item:last-child .remove-btn').addEventListener('click', function() {
        const droppedItem = this.parentElement;
        const id = droppedItem.dataset.id;
        const paletteItem = builder.querySelector(`.palette-item[data-id="${id}"]`);
        if (paletteItem) paletteItem.classList.remove('used');
        droppedItem.remove();
        
        if (!zone.querySelector('.dropped-item')) {
            zone.classList.remove('filled');
        }
        
        // Re-check completion
        const config = JSON.parse(builder.dataset.config || '{}');
        checkBuilderComplete(builder, config);
    });
}

function checkBuilderComplete(builder, config) {
    const zones = builder.querySelectorAll('.dropzone');
    const feedbackEl = builder.querySelector('.builder-feedback');
    
    let filledCount = 0;
    let correctCount = 0;
    const selections = {};
    
    zones.forEach(zone => {
        const dropped = zone.querySelector('.dropped-item');
        if (dropped) {
            filledCount++;
            selections[zone.dataset.zone] = dropped.dataset.id;
            
            // Check if correct (if config specifies)
            if (config.correct && config.correct[zone.dataset.zone] === dropped.dataset.id) {
                correctCount++;
            }
        }
    });
    
    if (filledCount === zones.length && feedbackEl) {
        feedbackEl.classList.add('show');
        
        // Generate feedback
        let feedback = '';
        if (config.feedback) {
            feedback = typeof config.feedback === 'function' 
                ? config.feedback(selections) 
                : evaluateFeedback(selections, config);
        }
        
        if (feedback.type === 'success') {
            feedbackEl.classList.remove('warning');
            feedbackEl.classList.add('success');
        } else {
            feedbackEl.classList.remove('success');
            feedbackEl.classList.add('warning');
        }
        
        feedbackEl.querySelector('.feedback-title').innerHTML = feedback.title;
        feedbackEl.querySelector('.feedback-text').textContent = feedback.text;
    } else if (feedbackEl) {
        feedbackEl.classList.remove('show');
    }
}

function evaluateFeedback(selections, config) {
    // Default feedback logic
    const inefficiencies = [];
    
    if (config.rules) {
        config.rules.forEach(rule => {
            if (!rule.check(selections)) {
                inefficiencies.push(rule.message);
            }
        });
    }
    
    if (inefficiencies.length === 0) {
        return {
            type: 'success',
            title: '✅ Solid Build!',
            text: config.successMessage || 'Your configuration looks efficient and well-balanced.'
        };
    } else {
        return {
            type: 'warning',
            title: '⚠️ Potential Issues',
            text: inefficiencies.join(' ')
        };
    }
}

/* ============================================
   4. WHAT-IF COMPARISONS
   ============================================ */

function initWhatIfComparisons() {
    document.querySelectorAll('.whatif-comparison').forEach(comp => {
        const toggles = comp.querySelectorAll('.toggle-option');
        const paths = comp.querySelectorAll('.whatif-path');
        
        toggles.forEach(toggle => {
            toggle.addEventListener('click', () => {
                // Update toggle state
                toggles.forEach(t => t.classList.remove('active'));
                toggle.classList.add('active');
                
                // Update paths
                const selected = toggle.dataset.path;
                paths.forEach(path => {
                    path.classList.toggle('active', path.classList.contains(`path-${selected}`));
                });
            });
        });
    });
}

/* ============================================
   5. CONSTRAINT PUZZLES
   ============================================ */

function initConstraintPuzzles() {
    document.querySelectorAll('.constraint-puzzle').forEach(puzzle => {
        const budget = parseFloat(puzzle.dataset.budget) || 100;
        const goal = puzzle.dataset.goal || 'maximize';
        let spent = 0;
        let score = 0;
        
        const options = puzzle.querySelectorAll('.puzzle-option');
        
        options.forEach(option => {
            option.addEventListener('click', () => {
                const cost = parseFloat(option.dataset.cost) || 0;
                const impact = parseFloat(option.dataset.impact) || 0;
                
                if (option.classList.contains('selected')) {
                    // Deselect
                    option.classList.remove('selected');
                    spent -= cost;
                    score -= impact;
                } else {
                    // Check if can afford
                    if (spent + cost <= budget) {
                        option.classList.add('selected');
                        spent += cost;
                        score += impact;
                    } else {
                        // Show can't afford feedback
                        option.classList.add('shake');
                        setTimeout(() => option.classList.remove('shake'), 300);
                    }
                }
                
                updatePuzzleBudget(puzzle, budget, spent);
                updatePuzzleScore(puzzle, score, goal);
            });
        });
    });
}

function updatePuzzleBudget(puzzle, budget, spent) {
    const remaining = budget - spent;
    const percent = (spent / budget) * 100;
    
    const remainingEl = puzzle.querySelector('.budget-remaining');
    const fillEl = puzzle.querySelector('.budget-fill');
    
    if (remainingEl) {
        remainingEl.textContent = '$' + remaining.toLocaleString() + ' left';
        remainingEl.classList.toggle('over', remaining < 0);
    }
    
    if (fillEl) {
        fillEl.style.width = Math.min(percent, 100) + '%';
        fillEl.classList.toggle('over', percent > 100);
    }
}

function updatePuzzleScore(puzzle, score, goal) {
    const scoreEl = puzzle.querySelector('.result-score');
    const ratingEl = puzzle.querySelector('.result-rating');
    
    if (scoreEl) {
        scoreEl.textContent = score + ' pts';
    }
    
    if (ratingEl) {
        let rating = '';
        if (score >= 90) rating = '🌟 Excellent optimization!';
        else if (score >= 70) rating = '👍 Good balance';
        else if (score >= 50) rating = '🤔 Room for improvement';
        else rating = '💡 Try different combinations';
        ratingEl.textContent = rating;
    }
}

/* ============================================
   6. TIMED DECISIONS
   ============================================ */

function initTimedDecisions() {
    document.querySelectorAll('.timed-decision').forEach(decision => {
        const timeLimit = parseInt(decision.dataset.time) || 30;
        let timeLeft = timeLimit;
        let timer = null;
        let answered = false;
        
        const timerDisplay = decision.querySelector('.timer-value');
        const choices = decision.querySelectorAll('.timed-choice');
        const resultEl = decision.querySelector('.timed-result');
        const expiredOverlay = decision.querySelector('.time-expired-overlay');
        
        // Start timer when element comes into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !timer && !answered) {
                    startTimer();
                    observer.unobserve(decision);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(decision);
        
        function startTimer() {
            timer = setInterval(() => {
                timeLeft--;
                updateTimerDisplay();
                
                if (timeLeft <= 0) {
                    clearInterval(timer);
                    if (!answered) {
                        timeExpired();
                    }
                }
            }, 1000);
        }
        
        function updateTimerDisplay() {
            if (timerDisplay) {
                timerDisplay.textContent = timeLeft + 's';
                timerDisplay.classList.toggle('urgent', timeLeft <= 10);
            }
        }
        
        function timeExpired() {
            if (expiredOverlay) {
                expiredOverlay.classList.add('show');
            }
            choices.forEach(c => c.classList.add('disabled'));
        }
        
        choices.forEach(choice => {
            choice.addEventListener('click', () => {
                if (answered || choice.classList.contains('disabled')) return;
                
                answered = true;
                clearInterval(timer);
                
                choices.forEach(c => {
                    c.classList.add('disabled');
                    c.classList.remove('selected');
                });
                choice.classList.add('selected');
                
                // Show result
                if (resultEl) {
                    const isCorrect = choice.dataset.correct === 'true';
                    resultEl.querySelector('.result-icon').textContent = isCorrect ? '✅' : '💡';
                    resultEl.querySelector('.result-title').textContent = isCorrect ? 'Good call!' : 'Interesting choice...';
                    resultEl.querySelector('.result-explanation').textContent = choice.dataset.explanation || '';
                    resultEl.classList.add('show');
                }
            });
        });
    });
}

/* ============================================
   7. FORECASTING GAMES
   ============================================ */

function initForecastGames() {
    document.querySelectorAll('.forecast-game').forEach(game => {
        const slider = game.querySelector('.forecast-slider');
        const valueDisplay = game.querySelector('.prediction-value');
        const lockBtn = game.querySelector('.lock-prediction-btn');
        const revealEl = game.querySelector('.forecast-reveal');
        const inputSection = game.querySelector('.forecast-input-section');
        
        const actualValue = parseFloat(game.dataset.actual) || 50;
        const format = game.dataset.format || 'number';
        
        if (slider) {
            slider.addEventListener('input', () => {
                if (valueDisplay) {
                    valueDisplay.textContent = formatValue(parseFloat(slider.value), format);
                }
            });
        }
        
        if (lockBtn) {
            lockBtn.addEventListener('click', () => {
                const prediction = parseFloat(slider.value);
                
                // Lock and reveal
                lockBtn.disabled = true;
                slider.disabled = true;
                
                // Calculate accuracy
                const difference = Math.abs(prediction - actualValue);
                const maxDiff = parseFloat(slider.max) - parseFloat(slider.min);
                const accuracy = Math.max(0, 100 - (difference / maxDiff * 100));
                
                // Update reveal section
                const predictionCard = game.querySelector('.comparison-card.prediction .comparison-value');
                const actualCard = game.querySelector('.comparison-card.actual .comparison-value');
                const accuracyValue = game.querySelector('.accuracy-value');
                const insight = game.querySelector('.accuracy-insight');
                
                if (predictionCard) predictionCard.textContent = formatValue(prediction, format);
                if (actualCard) actualCard.textContent = formatValue(actualValue, format);
                
                if (accuracyValue) {
                    accuracyValue.textContent = Math.round(accuracy) + '% accurate';
                    accuracyValue.classList.remove('excellent', 'good', 'fair', 'poor');
                    if (accuracy >= 90) accuracyValue.classList.add('excellent');
                    else if (accuracy >= 70) accuracyValue.classList.add('good');
                    else if (accuracy >= 50) accuracyValue.classList.add('fair');
                    else accuracyValue.classList.add('poor');
                }
                
                if (insight) {
                    const insightText = game.dataset.insight || getDefaultInsight(accuracy, prediction, actualValue);
                    insight.textContent = insightText;
                }
                
                // Show reveal
                if (inputSection) inputSection.style.display = 'none';
                if (revealEl) revealEl.classList.add('show');
            });
        }
    });
}

function getDefaultInsight(accuracy, prediction, actual) {
    if (accuracy >= 90) return "Excellent judgment! You have strong instincts for this metric.";
    if (prediction > actual) return "You were optimistic. Real-world results often lag expectations—account for this in planning.";
    if (prediction < actual) return "You were conservative. While safer for planning, don't underestimate your potential.";
    return "Close! With more data points, your predictions will sharpen.";
}

/* ============================================
   8. PATTERN RECOGNITION DRILLS
   ============================================ */

function initPatternDrills() {
    document.querySelectorAll('.pattern-drill').forEach(drill => {
        const answers = drill.querySelectorAll('.pattern-answer');
        const scoreEl = drill.querySelector('.score-value');
        let score = 0;
        let answered = false;
        
        answers.forEach(answer => {
            answer.addEventListener('click', () => {
                if (answered) return;
                answered = true;
                
                const isCorrect = answer.dataset.correct === 'true';
                
                answers.forEach(a => {
                    a.classList.add('disabled');
                    if (a.dataset.correct === 'true') {
                        a.classList.add('correct');
                    }
                });
                
                if (!isCorrect) {
                    answer.classList.add('incorrect');
                } else {
                    score++;
                    if (scoreEl) scoreEl.textContent = score;
                    
                    // Award points
                    if (typeof awardPoints === 'function') {
                        awardPoints(10);
                    }
                }
                
                // Show explanation
                const explanation = answer.dataset.explanation || drill.dataset.explanation;
                if (explanation) {
                    const explEl = document.createElement('div');
                    explEl.className = 'pattern-explanation';
                    explEl.style.cssText = 'margin-top: 16px; padding: 16px; background: rgba(255,255,255,0.1); border-radius: 10px; font-size: 0.95rem; line-height: 1.6;';
                    explEl.textContent = explanation;
                    drill.querySelector('.pattern-answers').after(explEl);
                }
            });
        });
    });
}

/* ============================================
   UTILITY EXPORTS
   ============================================ */

window.SimulationUtils = {
    formatValue,
    calculateEffects
};

