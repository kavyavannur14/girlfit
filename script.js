// Health Assessment Quiz Data
const quizQuestions = [
    {
        question: "How regular is your menstrual cycle?",
        options: [
            { text: "Very regular (21–35 days)", value: 1 },
            { text: "Somewhat irregular (36–45 days)", value: 2 },
            { text: "Very irregular (varies by >45 days)", value: 3 },
            { text: "I rarely get periods", value: 4 }
        ]
    },
    {
        question: "How long does your bleeding last?",
        options: [
            { text: "3–7 days", value: 1 },
            { text: "8–10 days", value: 2 },
            { text: "11–14 days", value: 3 },
            { text: ">14 days", value: 4 }
        ]
    },
    {
        question: "How heavy is your menstrual flow?",
        options: [
            { text: "Light to moderate", value: 1 },
            { text: "Heavy (frequent changes)", value: 2 },
            { text: "Very heavy", value: 3 },
            { text: "Excessive bleeding", value: 4 }
        ]
    },
    {
        question: "Do you experience severe cramps?",
        options: [
            { text: "None or mild", value: 1 },
            { text: "Moderate, with OTC relief", value: 2 },
            { text: "Severe, occasional meds needed", value: 3 },
            { text: "Severe, unrelieved by meds", value: 4 }
        ]
    },
    {
        question: "Have you had unexplained weight changes?",
        options: [
            { text: "No significant changes", value: 1 },
            { text: "Mild fluctuations", value: 2 },
            { text: "Difficulty losing weight", value: 3 },
            { text: "Rapid gain or loss", value: 4 }
        ]
    },
    {
        question: "Do you have persistent acne?",
        options: [
            { text: "Clear skin", value: 1 },
            { text: "Occasional breakouts", value: 2 },
            { text: "Regular acne", value: 3 },
            { text: "Severe acne/skin darkening", value: 4 }
        ]
    },
    {
        question: "Do you notice excess hair growth (hirsutism)?",
        options: [
            { text: "No", value: 1 },
            { text: "Mild increase", value: 2 },
            { text: "Moderate unwanted hair", value: 3 },
            { text: "Significant hair growth issues", value: 4 }
        ]
    },
    {
        question: "Have you experienced scalp hair thinning?",
        options: [
            { text: "No", value: 1 },
            { text: "Mild thinning", value: 2 },
            { text: "Moderate thinning", value: 3 },
            { text: "Severe thinning", value: 4 }
        ]
    },
    {
        question: "Do you have skin darkening (acanthosis nigricans)?",
        options: [
            { text: "No", value: 1 },
            { text: "Slight darkening", value: 2 },
            { text: "Moderate patches", value: 3 },
            { text: "Pronounced dark patches", value: 4 }
        ]
    },
    {
        question: "How often do you experience mood swings?",
        options: [
            { text: "Rarely", value: 1 },
            { text: "Sometimes", value: 2 },
            { text: "Often", value: 3 },
            { text: "Intense, frequent", value: 4 }
        ]
    },
    {
        question: "Do you feel unexplained fatigue?",
        options: [
            { text: "No", value: 1 },
            { text: "Occasional tiredness", value: 2 },
            { text: "Frequent fatigue", value: 3 },
            { text: "Constant exhaustion", value: 4 }
        ]
    },
    {
        question: "How is your sleep quality?",
        options: [
            { text: "Good, restful", value: 1 },
            { text: "Occasional disturbances", value: 2 },
            { text: "Difficulty sleeping", value: 3 },
            { text: "Frequent insomnia", value: 4 }
        ]
    },
    {
        question: "Have you tried conceiving >6 months without success?",
        options: [
            { text: "Not applicable or conceived <6m", value: 1 },
            { text: "Some delay (3–6m)", value: 2 },
            { text: ">6 months difficulty", value: 3 },
            { text: "Diagnosis of infertility", value: 4 }
        ]
    },
    {
        question: "Is there family history of PCOS/diabetes?",
        options: [
            { text: "No", value: 1 },
            { text: "Distant relatives", value: 2 },
            { text: "Close relatives", value: 3 },
            { text: "Multiple family members", value: 4 }
        ]
    },
    {
        question: "Do you experience blood sugar symptoms?",
        options: [
            { text: "No", value: 1 },
            { text: "Occasional thirst/urination", value: 2 },
            { text: "Frequent symptoms", value: 3 },
            { text: "Diagnosed glucose intolerance", value: 4 }
        ]
    }
];

let currentQuestion = 0;
let quizAnswers = [];
let totalScore = 0;

// Enhanced Chatbot responses database
const chatbotResponses = {
    // PCOD/PCOS related
    "what is pcod": {
        response: "PCOD (Polycystic Ovary Syndrome) is a common hormonal disorder affecting 1 in 10 women of reproductive age. 🌸\n\n🔸 **What happens:** Your ovaries produce excess male hormones (androgens)\n🔸 **Key features:** Multiple small cysts on ovaries, irregular periods, hormonal imbalance\n🔸 **Impact:** Affects fertility, metabolism, and appearance\n🔸 **Good news:** Very manageable with proper lifestyle and medical care!\n\nWould you like to know about symptoms or management tips?",
        keywords: ["pcod", "pcos", "polycystic ovary", "what is pcod", "tell me about pcod"]
    },
    
    "pcod symptoms": {
        response: "Common PCOD symptoms include: 🩺\n\n**Menstrual Issues:**\n🔸 Irregular or missed periods\n🔸 Heavy or light bleeding\n\n**Physical Changes:**\n🔸 Weight gain (especially around waist)\n🔸 Excess hair growth (face, chest, back)\n🔸 Male-pattern baldness or hair thinning\n🔸 Severe acne and oily skin\n🔸 Dark skin patches (neck, armpits)\n\n**Other Symptoms:**\n🔸 Mood changes and depression\n🔸 Difficulty getting pregnant\n🔸 Sleep problems\n\nRemember: You don't need ALL symptoms for PCOD diagnosis! 💕",
        keywords: ["pcod symptoms", "pcos symptoms", "signs of pcod", "symptoms"]
    },

    "late period causes": {
        response: "Several factors can cause late periods: 🗓️\n\n**Common Causes:**\n🔸 Stress (physical or emotional)\n🔸 Significant weight changes\n🔸 Excessive exercise or sudden lifestyle changes\n🔸 Hormonal imbalances (PCOD, thyroid issues)\n🔸 Certain medications\n🔸 Illness or travel\n\n**When to worry:**\n🚨 Missing periods for 3+ months\n🚨 Sudden changes in your normal cycle\n🚨 Severe pain or other symptoms\n\n**What helps:**\n✨ Stress management\n✨ Balanced diet and regular exercise\n✨ Adequate sleep\n✨ Tracking your cycle\n\nWant tips for cycle regulation? 😊",
        keywords: ["late period", "missed period", "irregular period", "period delay", "menstrual delay"]
    },

    "menstrual pain relief": {
        response: "Here are effective ways to manage menstrual pain: 💚\n\n**Immediate Relief:**\n🔥 Heat therapy (heating pad, warm bath)\n💊 Anti-inflammatory medicines (ibuprofen, with doctor's advice)\n🤲 Gentle abdominal massage\n🧘‍♀️ Deep breathing and relaxation\n\n**Physical Methods:**\n🚶‍♀️ Light exercise (walking, yoga)\n🤸‍♀️ Stretching and gentle movements\n💧 Stay well hydrated\n\n**Long-term Strategies:**\n🥗 Anti-inflammatory diet\n😴 Regular sleep schedule\n🏃‍♀️ Regular exercise routine\n🧘‍♀️ Stress management\n\n**See a doctor if:**\n🚨 Pain is severe and disrupts daily life\n🚨 Pain suddenly worsens\n🚨 Bleeding is very heavy\n\nYou deserve comfort during your period! 🤗",
        keywords: ["period pain", "menstrual pain", "cramps", "menstrual cramps", "pain relief"]
    },

    "when to see doctor": {
        response: "Please consult a healthcare provider if you experience: 🏥\n\n**Urgent Signs:**\n🚨 No periods for 3+ months (not pregnant)\n🚨 Sudden severe pelvic pain\n🚨 Heavy bleeding (changing pad/tampon every hour)\n🚨 Bleeding between periods\n🚨 Periods lasting longer than 7 days\n\n**PCOD-related:**\n⚠️ Multiple PCOD symptoms together\n⚠️ Difficulty losing weight despite efforts\n⚠️ Excessive hair growth or hair loss\n⚠️ Persistent acne after teenage years\n\n**General Health:**\n💙 Mood changes affecting daily life\n💙 Fertility concerns after 6+ months trying\n💙 Family history of PCOD/diabetes\n\n**Remember:** Early consultation leads to better outcomes! Don't hesitate to seek help. Your health matters! 💕",
        keywords: ["when to see doctor", "doctor visit", "medical help", "consult doctor", "see gynecologist"]
    },

    "emergency": {
        response: "🆘 **EMERGENCY RESOURCES** 🆘\n\n**Medical Emergency:**\n🚨 **108** - Ambulance Services\n🚨 **102** - Medical Emergency\n\n**Women's Support:**\n💬 **181** - Women Helpline\n💬 **1091** - Women in Distress\n\n**Health Support:**\n🏥 **104** - National Health Helpline\n🧠 **14416** - Mental Health Support\n\n**When to call emergency:**\n⚡ Severe abdominal pain\n⚡ Heavy bleeding with dizziness\n⚡ Signs of infection (fever, foul smell)\n⚡ Thoughts of self-harm\n\n**Your safety is the priority!** If you're in immediate danger or having severe symptoms, please call emergency services right away! 💕\n\nIs this a medical emergency right now?",
        keywords: ["emergency", "help", "urgent", "emergency numbers", "crisis"]
    },

    "diet for pcod": {
        response: "PCOD-friendly nutrition guide: 🥗\n\n**Best Foods:**\n🥬 Leafy greens (spinach, kale)\n🐟 Lean proteins (fish, chicken, legumes)\n🥑 Healthy fats (avocado, nuts, olive oil)\n🍓 Low-glycemic fruits (berries, apples)\n🌾 Whole grains (quinoa, brown rice)\n\n**Foods to Limit:**\n❌ Processed and sugary foods\n❌ Refined carbs (white bread, pasta)\n❌ Fried and fast foods\n❌ Excessive dairy (if sensitive)\n\n**PCOD-Specific Tips:**\n✨ Eat smaller, frequent meals\n✨ Focus on fiber-rich foods\n✨ Include anti-inflammatory spices (turmeric, cinnamon)\n✨ Stay hydrated (8-10 glasses water daily)\n\n**Sample meal idea:**\nBreakfast: Oats with berries and nuts\nLunch: Grilled chicken salad with olive oil\nSnack: Apple with almond butter\nDinner: Quinoa with roasted vegetables\n\nWant specific meal plans? 😊",
        keywords: ["diet", "food", "nutrition", "pcod diet", "what to eat", "meal plan"]
    },

    "exercise for pcod": {
        response: "Best exercises for PCOD management: 💪\n\n**Cardio (30 mins, 5x/week):**\n🏃‍♀️ Brisk walking or jogging\n🚴‍♀️ Cycling\n🏊‍♀️ Swimming\n💃 Dancing\n🥾 Hiking\n\n**Strength Training (2-3x/week):**\n🏋️‍♀️ Weight lifting\n🤸‍♀️ Bodyweight exercises\n🏋️‍♀️ Resistance band workouts\n\n**Stress-Relief Exercises:**\n🧘‍♀️ Yoga (especially beneficial!)\n🧘‍♀️ Pilates\n🌸 Tai Chi\n🫁 Deep breathing exercises\n\n**PCOD Benefits:**\n✨ Improves insulin sensitivity\n✨ Helps with weight management\n✨ Reduces stress hormones\n✨ Regulates menstrual cycles\n✨ Boosts mood and energy\n\n**Tips:**\n🎯 Start slow and gradually increase\n🎯 Find activities you enjoy\n🎯 Consistency over intensity\n🎯 Listen to your body\n\nRemember: Even 20-30 minutes daily makes a difference! 🌟",
        keywords: ["exercise", "workout", "fitness", "physical activity", "yoga", "gym"]
    },

    "pregnancy with pcod": {
        response: "Yes, pregnancy is absolutely possible with PCOD! 🤱✨\n\n**Good News:**\n💚 Many women with PCOD have healthy pregnancies\n💚 Proper management significantly improves chances\n💚 PCOD symptoms often improve during pregnancy\n\n**Before Trying to Conceive:**\n📋 Consult with gynecologist\n📋 Get hormone levels checked\n📋 Achieve healthy weight if needed\n📋 Start folic acid supplements\n📋 Optimize diet and exercise\n\n**Treatment Options:**\n💊 Ovulation-inducing medications\n💊 Metformin (if insulin resistant)\n🏥 Fertility treatments if needed\n🩺 Regular monitoring\n\n**Lifestyle Support:**\n🥗 Maintain PCOD-friendly diet\n🏃‍♀️ Regular exercise\n😴 Adequate sleep\n🧘‍♀️ Stress management\n\n**During Pregnancy:**\n👶 Regular prenatal care\n👶 Monitor for gestational diabetes\n👶 Healthy weight gain\n\n**Timeline:** Most women conceive within 6-12 months with proper treatment. Don't lose hope! 💕\n\nAre you currently trying to conceive?",
        keywords: ["pregnancy", "conceive", "fertility", "pregnant", "trying to conceive", "infertility"]
    },

    "stress and periods": {
        response: "Stress significantly impacts your menstrual cycle: 😰➡️🩸\n\n**How Stress Affects Periods:**\n🧠 Disrupts hormone production (especially cortisol)\n⏰ Can delay or skip periods\n📈 Makes PMS symptoms worse\n🔄 Affects ovulation timing\n🩸 Changes flow intensity\n\n**Types of Stress That Affect Cycles:**\n😔 Emotional stress (work, relationships)\n🏃‍♀️ Physical stress (excessive exercise, illness)\n🍽️ Nutritional stress (restrictive dieting)\n😴 Sleep deprivation\n🔄 Major life changes\n\n**Stress Management for Better Cycles:**\n🧘‍♀️ **Meditation & mindfulness** (10 mins daily)\n🏃‍♀️ **Regular exercise** (not excessive)\n😴 **Quality sleep** (7-9 hours)\n📱 **Limit social media** before bed\n🤝 **Talk to friends/family**\n📔 **Journaling** thoughts and feelings\n🎨 **Creative hobbies**\n🌿 **Nature time**\n\n**Quick Stress-Relief Techniques:**\n🫁 Deep breathing (4-7-8 technique)\n🤲 Progressive muscle relaxation\n🎵 Listen to calming music\n🛁 Warm bath with Epsom salts\n\n**When to Seek Help:**\n🚨 Stress feels overwhelming\n🚨 Affecting daily functioning\n🚨 Periods remain irregular after 2-3 months\n\nYour mental health directly impacts your physical health! 💙",
        keywords: ["stress", "anxiety", "mood", "mental health", "emotional", "worried", "depression"]
    }
};

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Start Assessment Function
function startAssessment() {
    currentQuestion = 0;
    quizAnswers = [];
    totalScore = 0;
    document.getElementById('quizContainer').classList.add('active');
    document.getElementById('results').classList.remove('show');
    showQuestion();
}

// Show current question
function showQuestion() {
    const question = quizQuestions[currentQuestion];
    const container = document.getElementById('questionContainer');
    
    container.innerHTML = `
        <div class="question">
            <h4>Question ${currentQuestion + 1} of ${quizQuestions.length}</h4>
            <h4>${question.question}</h4>
            <div class="options">
                ${question.options.map((option, index) => `
                    <label class="option">
                        <input type="radio" name="question${currentQuestion}" value="${option.value}" onchange="selectAnswer(${option.value})">
                        <span>${option.text}</span>
                    </label>
                `).join('')}
            </div>
        </div>
    `;

    // Update progress bar
    const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;
    document.getElementById('progressBar').style.width = progress + '%';

    // Update button visibility
    document.getElementById('prevBtn').style.display = currentQuestion > 0 ? 'block' : 'none';
    document.getElementById('nextBtn').textContent = currentQuestion === quizQuestions.length - 1 ? 'See Results' : 'Next';
}

// Select answer
function selectAnswer(value) {
    quizAnswers[currentQuestion] = value;
}

// Next question
function nextQuestion() {
    if (!quizAnswers[currentQuestion]) {
        alert('Please select an answer before continuing!');
        return;
    }

    if (currentQuestion < quizQuestions.length - 1) {
        currentQuestion++;
        showQuestion();
    } else {
        showResults();
    }
}

// Previous question
function previousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion();
    }
}

// Show results
function showResults() {
    const totalScore = quizAnswers.reduce((sum, answer) => sum + answer, 0);
    const maxScore = quizQuestions.length * 4; // Max value is 4 for each question
    const percentage = (totalScore / maxScore) * 100;

    let scoreClass, scoreEmoji, recommendation;

    if (percentage <= 30) {
        scoreClass = 'score-good';
        scoreEmoji = '🌟 Excellent!';
        recommendation = `
            <h4>Great News! 🎉</h4>
            <p>Your assessment indicates low risk for PCOD-related issues. Keep maintaining your healthy lifestyle!</p>
            <ul style="text-align: left; margin: 1rem 0;">
                <li>Continue regular exercise routine</li>
                <li>Maintain balanced diet</li>
                <li>Keep tracking your menstrual cycle</li>
                <li>Annual health check-ups recommended</li>
            </ul>
        `;
    } else if (percentage <= 60) {
        scoreClass = 'score-moderate';
        scoreEmoji = '⚠️ Moderate Risk';
        recommendation = `
            <h4>Attention Needed 💛</h4>
            <p>Your assessment shows some risk factors. Consider lifestyle changes and monitor symptoms closely.</p>
            <ul style="text-align: left; margin: 1rem 0;">
                <li>Focus on stress management</li>
                <li>Improve diet with whole foods</li>
                <li>Increase physical activity</li>
                <li>Consider consulting a healthcare provider</li>
            </ul>
        `;
    } else {
        scoreClass = 'score-needs-care';
        scoreEmoji = '🚨 Needs Care';
        recommendation = `
            <h4>Please Consult a Doctor 🏥</h4>
            <p>Your assessment indicates higher risk. We strongly recommend seeing a healthcare professional for proper evaluation.</p>
            <ul style="text-align: left; margin: 1rem 0;">
                <li>Schedule appointment with gynecologist</li>
                <li>Get hormone level tests done</li>
                <li>Start making immediate lifestyle changes</li>
                <li>Monitor symptoms daily</li>
            </ul>
        `;
    }

    document.getElementById('healthScore').innerHTML = `<span class="${scoreClass}">${scoreEmoji}</span>`;
    document.getElementById('recommendations').innerHTML = recommendation;

    document.getElementById('quizContainer').classList.remove('active');
    document.getElementById('results').classList.add('show');
}

// Restart assessment
function restartAssessment() {
    document.getElementById('results').classList.remove('show');
    startAssessment();
}

// Enhanced Chatbot Functions
function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (message === '') return;

    // Add user message
    addMessage(message, 'user');
    input.value = '';

    // Show typing indicator
    showTypingIndicator();

    // Generate bot response after delay
    setTimeout(() => {
        hideTypingIndicator();
        const response = generateBotResponse(message);
        addMessage(response, 'bot');
    }, Math.random() * 1000 + 1500); // Random delay between 1.5-2.5 seconds
}

function sendQuickReply(message) {
    document.getElementById('chatInput').value = message;
    sendMessage();
}

function addMessage(text, sender) {
    const messagesContainer = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    
    const avatar = sender === 'user' ? '👤' : '🤖';
    const avatarClass = sender === 'user' ? 'user-avatar' : 'bot-avatar';
    
    messageDiv.innerHTML = `
        <div class="message-avatar ${avatarClass}">${avatar}</div>
        <div class="message-content">${text}</div>
    `;
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function generateBotResponse(userMessage) {
    const message = userMessage.toLowerCase().trim();
    
    // Check for matches in the comprehensive response database
    for (const [key, data] of Object.entries(chatbotResponses)) {
        // Check if any keyword matches
        if (data.keywords) {
            for (const keyword of data.keywords) {
                if (message.includes(keyword.toLowerCase())) {
                    return data.response;
                }
            }
        }
        
        // Also check the main key
        if (message.includes(key)) {
            return data.response;
        }
    }
    
    // Greeting responses
    if (message.includes('hello') || message.includes('hi') || message.includes('hey') || message.includes('good morning') || message.includes('good evening')) {
        return "Hello there! 👋 I'm your personal women's health assistant. I'm here to help with questions about PCOD, menstrual health, nutrition, exercise, and general wellness. What would you like to know about today? 🌸";
    }
    
    // Thank you responses
    if (message.includes('thank') || message.includes('thanks')) {
        return "You're so welcome! 💕 I'm always here whenever you have health questions. Remember, taking care of your health is the best gift you can give yourself! Is there anything else I can help you with? 🌸";
    }
    
    // General health keywords
    if (message.includes('health') || message.includes('wellness') || message.includes('yes')) {
        return "I'm here to help you with your health concerns! 💚 I can provide information about:\n\n🔸 PCOD/PCOS symptoms and management\n🔸 Menstrual health and cycle irregularities\n🔸 Nutrition and diet tips\n🔸 Exercise recommendations\n🔸 When to consult a doctor\n🔸 Emergency resources\n\nWhat specific health topic would you like to explore? You can also use the quick reply buttons below! 😊";
    }
    
    // Weight-related queries
    if (message.includes('weight') || message.includes('lose weight') || message.includes('weight gain')) {
        return "Weight management with PCOD can be challenging, but it's definitely achievable! 💪\n\n**Why PCOD affects weight:**\n🔸 Insulin resistance makes weight loss harder\n🔸 Hormonal imbalances affect metabolism\n🔸 Increased appetite and cravings\n\n**Effective strategies:**\n✨ Focus on whole, unprocessed foods\n✨ Regular meals to stabilize blood sugar\n✨ Combine cardio with strength training\n✨ Be patient - PCOD weight loss takes time\n✨ Consider consulting a nutritionist\n\nWould you like specific diet or exercise tips? 🥗🏃‍♀️";
    }
    
    // Hair-related queries
    if (message.includes('hair') || message.includes('hair loss') || message.includes('hair fall') || message.includes('hirsutism')) {
        return "Hair changes are common with PCOD due to hormonal imbalances: 💇‍♀️\n\n**Hair Loss (Male Pattern):**\n🔸 Caused by excess androgens\n🔸 Usually at crown and temples\n🔸 Can be managed with proper treatment\n\n**Excess Hair Growth:**\n🔸 Unwanted hair on face, chest, back\n🔸 Also due to high androgen levels\n\n**Management Options:**\n✨ Hormonal treatments (consult doctor)\n✨ Anti-androgen medications\n✨ Laser hair removal for excess hair\n✨ Proper nutrition (biotin, iron, protein)\n✨ Gentle hair care routine\n\n**Natural support:**\n🌿 Spearmint tea may help reduce androgens\n🌿 Saw palmetto supplements (with doctor approval)\n\nConsult a dermatologist for personalized treatment! 💕";
    }
    
    // Acne-related queries
    if (message.includes('acne') || message.includes('pimples') || message.includes('skin')) {
        return "PCOD-related acne is very common and treatable! 🌟\n\n**Why PCOD causes acne:**\n🔸 Excess androgens increase oil production\n🔸 Hormonal fluctuations\n🔸 Insulin resistance affects skin\n\n**Skincare routine:**\n🧴 Gentle, non-comedogenic cleanser\n🧴 Salicylic acid or niacinamide products\n🧴 Moisturizer (yes, even for oily skin!)\n🧴 Daily sunscreen\n\n**Lifestyle support:**\n✨ Anti-inflammatory diet\n✨ Reduce dairy and high-glycemic foods\n✨ Stay hydrated\n✨ Manage stress\n✨ Change pillowcases regularly\n\n**Medical options:**\n💊 Hormonal birth control\n💊 Anti-androgen medications\n💊 Topical retinoids\n\n**Avoid:**\n❌ Over-washing or harsh scrubbing\n❌ Picking at acne\n❌ Too many products at once\n\nConsult a dermatologist for severe acne! 💕";
    }
    // Medicine/supplement queries
    if (message.includes('medicine') || message.includes('medication') || message.includes('supplements') || message.includes('treatment')) {
        return "Here's information about PCOD treatments and supplements: 💊\n\n**Common Medical Treatments:**\n🔸 **Birth Control Pills** - Regulate hormones and periods\n🔸 **Metformin** - Helps with insulin resistance\n🔸 **Anti-androgens** - Reduce male hormone effects\n🔸 **Fertility medications** - Help with ovulation\n\n**Helpful Supplements:**\n🌿 **Inositol** - Improves insulin sensitivity\n🌿 **Vitamin D** - Many with PCOD are deficient\n🌿 **Omega-3** - Reduces inflammation\n🌿 **Chromium** - Helps with blood sugar\n🌿 **Spearmint tea** - May reduce androgens\n\n**Important:**\n⚠️ Always consult your doctor before starting any medication\n⚠️ Supplements can interact with other medicines\n⚠️ Regular monitoring is essential\n⚠️ Lifestyle changes are equally important\n\nWould you like information about natural remedies or specific treatments?";
    }

    // Lifestyle queries
    if (message.includes('lifestyle') || message.includes('home remedies') || message.includes('natural') || message.includes('home treatment')) {
        return "Natural and lifestyle approaches for PCOD management: 🌿\n\n**Dietary Changes:**\n🥗 Low glycemic index foods\n🥗 Anti-inflammatory foods (turmeric, berries)\n🥗 Healthy fats (avocado, nuts, olive oil)\n🥗 Lean proteins and fiber-rich foods\n🥗 Limit processed foods and sugar\n\n**Physical Activity:**\n🏃‍♀️ 150 minutes moderate exercise weekly\n🏃‍♀️ Strength training 2-3 times per week\n🏃‍♀️ Yoga for stress relief\n🏃‍♀️ Daily walking or swimming\n\n**Natural Remedies:**\n🌿 Cinnamon (helps with insulin sensitivity)\n🌿 Green tea (antioxidants)\n🌿 Fenugreek seeds (hormone balance)\n🌿 Coconut oil (healthy fats)\n🌿 Apple cider vinegar (blood sugar)\n\n**Stress Management:**\n🧘‍♀️ Meditation and mindfulness\n🧘‍♀️ Adequate sleep (7-9 hours)\n🧘‍♀️ Journaling\n🧘‍♀️ Spending time in nature\n\n**Remember:** Natural approaches work best alongside medical treatment! 💕";
    }

    // Period-related queries
    if (message.includes('period') || message.includes('menstrual') || message.includes('bleeding') || message.includes('cycle')) {
        return "Let me help you with period-related concerns: 🩸\n\n**Normal Menstrual Cycle:**\n🔸 21-35 days between periods\n🔸 Bleeding lasts 3-7 days\n🔸 Flow changes throughout cycle\n🔸 Some cramping is normal\n\n**When to Worry:**\n🚨 No periods for 3+ months\n🚨 Extremely heavy bleeding\n🚨 Severe pain that disrupts life\n🚨 Bleeding between periods\n🚨 Periods lasting longer than 7 days\n\n**PCOD Impact on Periods:**\n⚠️ Often irregular or missed\n⚠️ May be very light or very heavy\n⚠️ Unpredictable timing\n⚠️ Associated with other symptoms\n\n**Managing Irregular Periods:**\n✨ Track your cycle with an app\n✨ Maintain healthy weight\n✨ Manage stress levels\n✨ Consider hormonal treatment\n✨ Regular exercise routine\n\nWould you like specific tips for period pain or cycle tracking? 💚";
    }

    // Emergency or urgent queries
    if (message.includes('emergency') || message.includes('urgent') || message.includes('severe pain') || message.includes('heavy bleeding')) {
        return "🆘 **EMERGENCY RESOURCES** 🆘\n\n**Medical Emergency:**\n🚨 **108** - Ambulance Services\n🚨 **102** - Medical Emergency\n\n**Women's Support:**\n💬 **181** - Women Helpline\n💬 **1091** - Women in Distress\n\n**Health Support:**\n🏥 **104** - National Health Helpline\n🧠 **14416** - Mental Health Support\n\n**When to call emergency:**\n⚡ Severe abdominal pain\n⚡ Heavy bleeding with dizziness\n⚡ Signs of infection (fever, foul smell)\n⚡ Thoughts of self-harm\n\n**Your safety is the priority!** If you're in immediate danger or having severe symptoms, please call emergency services right away! 💕\n\nIs this a medical emergency right now?";
    }

    // Doctor consultation queries
    if (message.includes('doctor') || message.includes('gynecologist') || message.includes('consultation') || message.includes('appointment')) {
        return "Great question! Here's when and how to see a doctor: 👩‍⚕️\n\n**When to Consult:**\n🔸 Irregular periods for 3+ months\n🔸 Multiple PCOD symptoms\n🔸 Difficulty conceiving\n🔸 Severe period pain\n🔸 Unusual discharge or bleeding\n🔸 Mood changes affecting daily life\n\n**What to Expect:**\n📋 Medical history questions\n📋 Physical examination\n📋 Blood tests (hormones, glucose)\n📋 Ultrasound if needed\n📋 Discussion of treatment options\n\n**How to Prepare:**\n✅ Track your symptoms for 2-3 months\n✅ List all medications/supplements\n✅ Note family medical history\n✅ Write down questions to ask\n✅ Bring a trusted friend if needed\n\n**Finding the Right Doctor:**\n🏥 Gynecologist for PCOD/periods\n🏥 Endocrinologist for hormones\n🏥 Dermatologist for skin issues\n\n**Remember:** You deserve respectful, thorough care! Don't hesitate to seek a second opinion if needed. 💕";
    }

    // Default response for unrecognized queries
    return "I understand you're looking for health information! 🌸 While I didn't catch the specific topic you're asking about, I'm here to help with:\n\n🔸 **PCOD/PCOS** - symptoms, management, lifestyle tips\n🔸 **Menstrual Health** - irregular periods, pain relief\n🔸 **Nutrition & Exercise** - diet plans, workout routines\n🔸 **Fertility & Pregnancy** - conception, family planning\n🔸 **Skin & Hair Issues** - acne, hair loss, treatments\n🔸 **Mental Health** - stress, mood, sleep problems\n🔸 **When to See a Doctor** - warning signs, preparation\n\nCould you rephrase your question or try one of the quick reply buttons below? I'm here to provide helpful, personalized health information! 💚\n\nYou can also ask things like:\n• \"What are PCOD symptoms?\"\n• \"How to manage period pain?\"\n• \"Diet tips for PCOD\"\n• \"When should I see a doctor?\"\n• \"Help with irregular periods\"";
}

function showTypingIndicator() {
    document.getElementById('typingIndicator').style.display = 'flex';
    const messagesContainer = document.getElementById('chatMessages');
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function hideTypingIndicator() {
    document.getElementById('typingIndicator').style.display = 'none';
}

function handleEnter(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

// Enhanced smooth scrolling for navigation
document.addEventListener('DOMContentLoaded', function() {
    // Initialize chatbot
    document.getElementById('typingIndicator').style.display = 'none';
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Mobile menu toggle
    const mobileMenu = document.querySelector('.mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    // Auto-resize chat input
    const chatInput = document.getElementById('chatInput');
    if (chatInput) {
        chatInput.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        });
    }

    // Add animation to feature cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all feature cards
    document.querySelectorAll('.feature-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    setTimeout(() => {
        addMessage("Welcome to GirLFit! 🌸 I'm here to help you with any questions about PCOD, periods, nutrition, or general women's health. Feel free to ask me anything or use the quick reply buttons below! 💕", 'bot');
    }, 1000);
});


function exportChatHistory() {
    const messages = document.querySelectorAll('.message');
    let chatHistory = 'GirLFit Chat History\n\n';
    
    messages.forEach(message => {
        const sender = message.classList.contains('user') ? 'You' : 'AI Assistant';
        const content = message.querySelector('.message-content').textContent;
        chatHistory += `${sender}: ${content}\n\n`;
    });
    
    const blob = new Blob([chatHistory], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'girlfit-chat-history.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// FOR quiz result analysis
function getDetailedAnalysis(answers) {
    const analysis = {
        menstrualHealth: 0,
        hormonalSymptoms: 0,
        metabolicIssues: 0,
        reproductiveHealth: 0
    };

   
    analysis.menstrualHealth = (answers[0] + answers[1] + answers[2] + answers[3]) / 4;
    analysis.hormonalSymptoms = (answers[4] + answers[5] + answers[6] + answers[7] + answers[8]) / 5;
    analysis.metabolicIssues = (answers[9] + answers[10] + answers[11] + answers[14]) / 4;
    analysis.reproductiveHealth = (answers[12] + answers[13]) / 2;

    return analysis;
}

function generatePersonalizedRecommendations(analysis) {
    let recommendations = [];

    if (analysis.menstrualHealth > 2.5) {
        recommendations.push("Focus on menstrual health tracking and cycle regulation");
    }
    
    if (analysis.hormonalSymptoms > 2.5) {
        recommendations.push("Consider consulting an endocrinologist for hormonal evaluation");
    }
    
    if (analysis.metabolicIssues > 2.5) {
        recommendations.push("Prioritize metabolic health with diet and exercise");
    }
    
    if (analysis.reproductiveHealth > 2.5) {
        recommendations.push("Discuss fertility concerns with a gynecologist");
    }

    return recommendations;
}

// Add keyboard shortcuts
document.addEventListener('keydown', function(event) {
    // Ctrl+Enter to send message
    if (event.ctrlKey && event.key === 'Enter') {
        sendMessage();
    }
    
    if (event.key === 'Escape') {
        document.getElementById('chatInput').value = '';
    }
});

// Performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimized scroll handling
const handleScroll = debounce(() => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}, 10);

window.addEventListener('scroll', handleScroll);

// Add loading states
function showLoading(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.classList.add('loading');
    }
}

function hideLoading(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.classList.remove('loading');
    }
}

function handleChatError(error) {
    console.error('Chat error:', error);
    addMessage("I'm sorry, I encountered an error. Please try again or contact support if the problem persists. 🙏", 'bot');
}

function formatMessage(text) {

    text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    text = text.replace(/\n/g, '<br>');
    return text;
}



function addMessage(text, sender) {
    const messagesContainer = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    
    const avatar = sender === 'user' ? '👤' : '🤖';
    const avatarClass = sender === 'user' ? 'user-avatar' : 'bot-avatar';
    
    messageDiv.innerHTML = `
        <div class="message-avatar ${avatarClass}">${avatar}</div>
        <div class="message-content">${formatMessage(text)}</div>
    `;
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    // Add animation
    messageDiv.style.opacity = '0';
    messageDiv.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        messageDiv.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        messageDiv.style.opacity = '1';
        messageDiv.style.transform = 'translateY(0)';
    }, 50);
}
    


 function toggleTable() {
      const table = document.getElementById('comparisonTable');
      const btn = document.querySelector('.togglle-btn');
      
      if (table.style.display === 'none' || table.style.display === '') {
        table.style.display = 'table';
        btn.textContent = 'Hide Comparison Table';
      } else {
        table.style.display = 'none';
        btn.textContent = 'Show Comparison Table';
      }
}

    // Sleep-related queries
  document.querySelectorAll('.hover-faq').forEach(item => {
    item.addEventListener('mouseenter', () => {
      const answer = item.querySelector('.faq-answer');
      answer.style.opacity = '1';
      answer.style.maxHeight = '200px';
    });

    item.addEventListener('mouseleave', () => {
      const answer = item.querySelector('.faq-answer');
      answer.style.opacity = '0';
      answer.style.maxHeight = '0';
    });
  });



 // For PCOD CASES TRACKER 
 const counters = document.querySelectorAll('.count');
  let triggered = false;

  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
  };

  function animateCount(el, target) {
    let start = 0;
    const isPercent = target < 100;
    const duration = 2000;
    const stepTime = 20;
    const steps = duration / stepTime;
    const increment = target / steps;

    const counter = setInterval(() => {
      start += increment;
      if (start >= target) {
        el.textContent = isPercent ? target.toFixed(2) : Math.floor(target).toLocaleString();
        clearInterval(counter);
      } else {
        el.textContent = isPercent ? start.toFixed(2) : Math.floor(start).toLocaleString();
      }
    }, stepTime);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !triggered) {
        triggered = true;
        counters.forEach(counter => {
          const target = parseFloat(counter.getAttribute('data-target'));
          animateCount(counter, target);
        });
      }
    });
  }, options);

  counters.forEach(counter => {
    observer.observe(counter);
  });