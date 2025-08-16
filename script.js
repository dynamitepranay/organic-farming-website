// ==========================================
// ORGANIC FARMING WEBSITE - JAVASCRIPT
// ==========================================

// ==========================================
// QUIZ FUNCTIONALITY
// ==========================================

// Quiz questions and answers
const quizQuestions = [
    {
        question: "What is the primary goal of organic farming?",
        options: [
            "Maximize crop yield using synthetic fertilizers",
            "Maintain soil health and ecological balance",
            "Reduce farming costs through chemical pesticides",
            "Focus solely on profit maximization"
        ],
        correctAnswer: 1
    },
    {
        question: "Which of the following is NOT allowed in organic farming?",
        options: [
            "Compost",
            "Synthetic pesticides",
            "Crop rotation",
            "Green manure"
        ],
        correctAnswer: 1
    },
    {
        question: "What is crop rotation primarily used for?",
        options: [
            "Increasing farm aesthetic appeal",
            "Preventing soil depletion and pest buildup",
            "Making harvesting easier",
            "Reducing water usage"
        ],
        correctAnswer: 1
    },
    {
        question: "What is green manure?",
        options: [
            "Animal waste used as fertilizer",
            "Crops grown specifically to be plowed back into soil",
            "Artificial fertilizer with green coloring",
            "Compost made from kitchen waste"
        ],
        correctAnswer: 1
    },
    {
        question: "Which practice helps control pests naturally in organic farming?",
        options: [
            "Using beneficial insects",
            "Daily pesticide spraying",
            "Genetically modified seeds",
            "Chemical herbicides"
        ],
        correctAnswer: 0
    }
];

// Quiz functionality
function initializeQuiz() {
    const quizForm = document.getElementById('quizForm');
    const resultDiv = document.getElementById('result');
    const scoreDisplay = document.getElementById('scoreDisplay');
    const resultMessage = document.getElementById('resultMessage');

    if (!quizForm) return; // Exit if not on quiz page

    quizForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let score = 0;
        const totalQuestions = quizQuestions.length;
        
        // Check each question
        for (let i = 0; i < totalQuestions; i++) {
            const selectedOption = document.querySelector(`input[name="q${i + 1}"]:checked`);
            if (selectedOption && parseInt(selectedOption.value) === quizQuestions[i].correctAnswer) {
                score++;
            }
        }
        
        // Calculate percentage
        const percentage = Math.round((score / totalQuestions) * 100);
        
        // Display result
        scoreDisplay.textContent = `Your Score: ${score}/${totalQuestions} (${percentage}%)`;
        
        // Set appropriate message
        if (percentage >= 80) {
            resultMessage.innerHTML = "Great job! 🌱 You're an organic farming expert!";
        } else if (percentage >= 60) {
            resultMessage.innerHTML = "Good effort! 🌿 Keep learning about organic farming!";
        } else {
            resultMessage.innerHTML = "Try again! 📚 Visit our Knowledge Hub to learn more!";
        }
        
        // Show result and hide form
        resultDiv.style.display = 'block';
        quizForm.style.display = 'none';
        
        // Scroll to result
        resultDiv.scrollIntoView({ behavior: 'smooth' });
    });
}

// Restart quiz function
function restartQuiz() {
    const quizForm = document.getElementById('quizForm');
    const resultDiv = document.getElementById('result');
    
    if (quizForm && resultDiv) {
        quizForm.reset();
        quizForm.style.display = 'block';
        resultDiv.style.display = 'none';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// ==========================================
// FUN FACTS ROTATION
// ==========================================

const funFacts = [
    "🌱 Organic farms use 45% less energy than conventional farms!",
    "🐝 Organic farming supports 30% more biodiversity including bees and butterflies!",
    "💧 Organic soil can hold up to 30% more water, making crops more drought-resistant!",
    "🥬 Organic vegetables often contain 20-40% more antioxidants!",
    "🌍 India has over 2.5 million organic farmers - the highest in the world!"
];

let currentFactIndex = 0;
let factInterval = null;

// Initialize fun facts rotation
function initializeFunFacts() {
    const factDisplay = document.getElementById('factDisplay');
    
    if (!factDisplay) return; // Exit if not on resources page
    
    // Display first fact
    displayFact(currentFactIndex);
    
    // Start auto-rotation
    startFactRotation();
}

// Display a specific fact
function displayFact(index) {
    const factDisplay = document.getElementById('factDisplay');
    if (!factDisplay) return;
    
    factDisplay.style.opacity = '0';
    
    setTimeout(() => {
        factDisplay.textContent = funFacts[index];
        factDisplay.style.opacity = '1';
    }, 300);
}

// Start automatic fact rotation
function startFactRotation() {
    factInterval = setInterval(() => {
        currentFactIndex = (currentFactIndex + 1) % funFacts.length;
        displayFact(currentFactIndex);
    }, 5000);
}

// Stop fact rotation
function stopFactRotation() {
    if (factInterval) {
        clearInterval(factInterval);
        factInterval = null;
    }
}

// Manual fact navigation
function showNextFact() {
    stopFactRotation();
    currentFactIndex = (currentFactIndex + 1) % funFacts.length;
    displayFact(currentFactIndex);
    startFactRotation();
}

function showPreviousFact() {
    stopFactRotation();
    currentFactIndex = (currentFactIndex - 1 + funFacts.length) % funFacts.length;
    displayFact(currentFactIndex);
    startFactRotation();
}

// ==========================================
// MOBILE MENU TOGGLE
// ==========================================

function initializeMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!hamburger || !navMenu) return;
    
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        // Animate hamburger
        const spans = hamburger.querySelectorAll('span');
        spans.forEach(span => span.classList.toggle('active'));
    });
    
    // Close menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.querySelectorAll('span').forEach(span => span.classList.remove('active'));
        });
    });
}

// ==========================================
// INITIALIZATION
// ==========================================

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeQuiz();
    initializeFunFacts();
    initializeMobileMenu();
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

// Simple fade in animation for elements
function fadeIn(element, duration = 500) {
    element.style.opacity = '0';
    element.style.display = 'block';
    
    let opacity = 0;
    const interval = 10;
    const increment = interval / duration;
    
    const timer = setInterval(() => {
        opacity += increment;
        element.style.opacity = opacity;
        
        if (opacity >= 1) {
            clearInterval(timer);
        }
    }, interval);
}

// Simple fade out animation for elements
function fadeOut(element, duration = 500) {
    let opacity = 1;
    const interval = 10;
    const decrement = interval / duration;
    
    const timer = setInterval(() => {
        opacity -= decrement;
        element.style.opacity = opacity;
        
        if (opacity <= 0) {
            clearInterval(timer);
            element.style.display = 'none';
        }
    }, interval);
}
