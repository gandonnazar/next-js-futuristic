// Video Duration Selector Script
// Video model duration configurations with credit costs
const videoModelDurations = {
    'pixverse-v5': [
        { duration: 5, label: 'Short', time: '5s', credits: 200 },
        { duration: 8, label: 'Medium', time: '8s', credits: 320 }
    ],
    'kling-master-v2': [
        { duration: 5, label: 'Short', time: '5s', credits: 320 },
        { duration: 10, label: 'Long', time: '10s', credits: 640 }
    ],
    'kling-2.5-turbo-pro': [
        { duration: 5, label: 'Short', time: '5s', credits: 90 },
        { duration: 10, label: 'Long', time: '10s', credits: 180 }
    ],
    'minimax-helios-2': [
        { duration: 6, label: 'Short', time: '6s', credits: 68 },
        { duration: 10, label: 'Long', time: '10s', credits: 112 }
    ],
    'sora-2': [
        { duration: 4, label: 'Short', time: '4s', credits: 100 },
        { duration: 8, label: 'Medium', time: '8s', credits: 200 },
        { duration: 12, label: 'Long', time: '12s', credits: 300 }
    ],
    'sora-2-pro': [
        { duration: 4, label: 'Short', time: '4s', credits: 300 },
        { duration: 8, label: 'Medium', time: '8s', credits: 600 },
        { duration: 12, label: 'Long', time: '12s', credits: 900 }
    ],
    'sora-2-pro-max': [
        { duration: 4, label: 'Short', time: '4s', credits: 500 },
        { duration: 8, label: 'Medium', time: '8s', credits: 1000 },
        { duration: 12, label: 'Long', time: '12s', credits: 1500 }
    ],
    'veo-3.1': [
        { duration: 4, label: 'Short', time: '4s', credits: 450 },
        { duration: 8, label: 'Medium', time: '8s', credits: 900 }
    ],
    'veo-3.1-fast': [
        { duration: 4, label: 'Short', time: '4s', credits: 225 },
        { duration: 8, label: 'Medium', time: '8s', credits: 450 }
    ]
};

let currentVideoModel = 'pixverse-v5'; // Default model
let currentVideoDuration = null;

// Duration icons
const durationIcons = {
    'Short': '⚡',
    'Medium': '⏱️',
    'Long': '⏳'
};

// Initialize video page duration selector
function initializeVideoDurationSelector() {
    const videoPage = document.getElementById('video-page');
    if (!videoPage) return;

    // Update durations when model is selected
    const videoModelCards = videoPage.querySelectorAll('.model-card:not(.disabled)');
    videoModelCards.forEach(card => {
        card.addEventListener('click', function() {
            const modelId = this.dataset.model;
            if (videoModelDurations[modelId]) {
                currentVideoModel = modelId;
                updateVideoDurationOptions();
            }
        });
    });

    // Initialize with default model
    updateVideoDurationOptions();
}

// Update duration options based on selected model
function updateVideoDurationOptions() {
    const durationSelector = document.getElementById('duration-selector');
    if (!durationSelector) return;

    const durations = videoModelDurations[currentVideoModel];
    if (!durations) return;

    // Clear existing options
    durationSelector.innerHTML = '';

    // Create dropdown options
    durations.forEach((option, index) => {
        const optionElement = document.createElement('option');
        optionElement.value = option.duration;
        optionElement.dataset.credits = option.credits;
        
        // Format: "⚡ Short - 4s (100 credits)"
        const icon = durationIcons[option.label] || '⏱️';
        const formattedCredits = option.credits.toLocaleString();
        optionElement.textContent = `${icon} ${option.label} - ${option.time} (${formattedCredits} credits)`;
        
        // Select first option by default
        if (index === 0) {
            optionElement.selected = true;
            currentVideoDuration = option;
        }
        
        durationSelector.appendChild(optionElement);
    });

    // Add change event listener to dropdown
    durationSelector.onchange = function() {
        const selectedOption = this.options[this.selectedIndex];
        const selectedDuration = durations.find(d => d.duration == selectedOption.value);
        
        if (selectedDuration) {
            currentVideoDuration = selectedDuration;
            updateRenderButtonCredits();
        }
    };

    // Update render button with initial selection
    updateRenderButtonCredits();
}

// Update render button with current credit cost
function updateRenderButtonCredits() {
    const videoPage = document.getElementById('video-page');
    if (!videoPage) return;

    const generateBtn = videoPage.querySelector('#generate-btn .btn-text');
    if (!generateBtn || !currentVideoDuration) return;

    // Format credits with commas for thousands
    const formattedCredits = currentVideoDuration.credits.toLocaleString();
    
    generateBtn.innerHTML = `🚀 Render <span style="color: #ff4444; font-size: 0.85em; margin-left: 5px;">-${formattedCredits}</span>`;
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initializeVideoDurationSelector();
});

// Also initialize when navigating to video page
window.addEventListener('hashchange', function() {
    if (location.hash === '#video') {
        setTimeout(initializeVideoDurationSelector, 100);
    }
});
