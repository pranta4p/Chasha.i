document.addEventListener("DOMContentLoaded", function () {
    // API Key is now handled on the backend for security
    const API_URL = '/api/chat-ai';

    const chatButton = document.getElementById('chatButton');
    const closeButton = document.getElementById('closeButton');
    const chatWindow = document.getElementById('chatWindow');
    const chatMessages = document.getElementById('chatMessages');
    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendButton');

    if (!chatButton || !chatWindow || !userInput) {
        return;
    }

    function toggleChat() {
        chatWindow.classList.toggle('open');
    }

    function addMessage(text, sender, id = null) {
        const div = document.createElement('div');
        div.classList.add('message');
        div.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
        if (id) div.id = id;
        div.innerText = text;
        chatMessages.appendChild(div);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    async function sendMessage() {
        const text = userInput.value.trim();
        if (!text) return;

        addMessage(text, 'user');
        userInput.value = '';

        const loadingId = 'loading-' + Date.now();
        addMessage('Thinking...', 'bot', loadingId);

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: text }] }]
                })
            });

            const data = await response.json();

            const loadingElement = document.getElementById(loadingId);
            if (loadingElement) loadingElement.remove();

            if (data.error) {
                addMessage("Error: " + data.error.message, 'bot');
            } else {
                const botReply = data.candidates[0].content.parts[0].text;
                addMessage(botReply, 'bot');
            }

        } catch (error) {
            const loadingElement = document.getElementById(loadingId);
            if (loadingElement) loadingElement.remove();
            addMessage("Check internet connection.", 'bot');
        }
    }

    chatButton.addEventListener('click', toggleChat);
    closeButton.addEventListener('click', toggleChat);
    sendButton.addEventListener('click', sendMessage);

    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
});