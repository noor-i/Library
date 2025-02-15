const userMessage = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const chatWindow = document.getElementById('chat-window');

function displayUserMessage(message) {
    //taking userInput, putting it inside chat-window
    const newMessageDiv = document.createElement('div');
    newMessageDiv.textContent = message;
    newMessageDiv.classList.add('message', 'user-message');
    chatWindow.appendChild(newMessageDiv);
}

function displayBotMessage(data, isLoading = false) {
    // Remove existing "Thinking..." message if it exists
    const existingTypingIndicator = document.getElementById("typing-indicator");
    if (existingTypingIndicator) {
        existingTypingIndicator.remove();
    }

    if (isLoading) {
        const loadingMessage = document.createElement('div');
        loadingMessage.classList.add('message', 'bot-message', 'loading');
        loadingMessage.id = "typing-indicator"; 
        chatWindow.appendChild(loadingMessage);
    } else {
        const newMessageDiv = document.createElement('div');
        newMessageDiv.textContent = data.message;
        newMessageDiv.classList.add('message', 'bot-message');
        chatWindow.appendChild(newMessageDiv);
    }
}

async function sendMessage() {

    //Store user input
    const message = userMessage.value;
    displayUserMessage(message);
    userMessage.value = '';

    //Show ... while response is being returned
    displayBotMessage({}, isLoading = true);

    //Send user input to Gemini API
    try {
        const response = await fetch('http://localhost:3000/chat', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: message })
        });

        const data = await response.json();
        displayBotMessage(data, false);

    } catch (error) {
        console.log("Error:", error)
    }
}

sendBtn.addEventListener("click", sendMessage);
