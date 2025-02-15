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

function displayBotMessage(data) {
    const newMessageDiv = document.createElement('div');
    newMessageDiv.textContent = data.message;
    newMessageDiv.classList.add('message', 'bot-message');
    chatWindow.appendChild(newMessageDiv);
}

async function sendMessage() {

    //Store user input
    const message = userMessage.value;
    displayUserMessage(message);
    userMessage.value = '';

    //Send user input to Gemini API
    try {
        const response = await fetch('http://localhost:8080/chat', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: message })
        });

        const data = await response.json();
        displayBotMessage(data);

    } catch (error) {
        console.log("Error:", error)
    }
}

sendBtn.addEventListener("click", sendMessage);
