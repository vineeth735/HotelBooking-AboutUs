// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const nav = document.querySelector('nav');

mobileMenuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
});

// Testimonial Slider
const testimonials = document.querySelectorAll('.testimonial');
const prevBtn = document.querySelector('.slider-prev');
const nextBtn = document.querySelector('.slider-next');
let currentTestimonial = 0;

function showTestimonial(index) {
    testimonials.forEach(testimonial => testimonial.classList.remove('active'));
    testimonials[index].classList.add('active');
}

function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
}

function prevTestimonial() {
    currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
    showTestimonial(currentTestimonial);
}

nextBtn.addEventListener('click', nextTestimonial);
prevBtn.addEventListener('click', prevTestimonial);

// Auto-rotate testimonials (optional)
let testimonialInterval = setInterval(nextTestimonial, 5000);

// Pause auto-rotation when hovering over slider
const slider = document.querySelector('.testimonial-slider');
slider.addEventListener('mouseenter', () => {
    clearInterval(testimonialInterval);
});

slider.addEventListener('mouseleave', () => {
    testimonialInterval = setInterval(nextTestimonial, 5000);
});

// Update copyright year automatically
document.getElementById('year').textContent = new Date().getFullYear();

// Chat functionality
document.addEventListener('DOMContentLoaded', function() {
    const chatButton = document.getElementById('chatButton');
    const chatBox = document.getElementById('chatBox');
    const closeChat = document.getElementById('closeChat');
    const sendMessage = document.getElementById('sendMessage');
    const userInput = document.getElementById('userInput');
    const chatMessages = document.getElementById('chatMessages');

    // Simple responses for the chatbot
    const responses = {
        'hello': 'Hello! How can I assist you with your travel plans today?',
        'hi': 'Hi there! Looking to plan your next luxury vacation?',
        'booking': 'I can help you with booking. Would you like to explore our destinations or speak with a travel advisor?',
        'price': 'Our luxury travel experiences are customized to your preferences. Would you like to speak with a travel advisor about pricing?',
        'destinations': 'We offer exclusive experiences worldwide. Popular destinations include Bali, Maldives, Switzerland, and African safaris. Where would you like to go?',
        'help': 'I can help you with booking, destination information, or connect you with a travel advisor. What would you like to know?',
        'default': 'Thank you for your message. Would you like to speak with one of our travel advisors for more detailed information?'
    };

    // Toggle chat box
    chatButton.addEventListener('click', () => {
        chatBox.classList.add('active');
    });

    closeChat.addEventListener('click', () => {
        chatBox.classList.remove('active');
    });

    // Send message function
    function sendChatMessage() {
        const message = userInput.value.trim();
        if (message === '') return;

        // Add user message
        addMessage(message, 'user');
        userInput.value = '';

        // Get bot response
        setTimeout(() => {
            const response = getBotResponse(message.toLowerCase());
            addMessage(response, 'bot');
        }, 500);
    }

    // Add message to chat
    function addMessage(message, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', sender);
        messageDiv.textContent = message;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Get bot response
    function getBotResponse(message) {
        // Check for keywords in the message
        for (let key in responses) {
            if (message.includes(key)) {
                return responses[key];
            }
        }
        return responses.default;
    }

    // Send message on button click
    sendMessage.addEventListener('click', sendChatMessage);

    // Send message on Enter key
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendChatMessage();
        }
    });
});
