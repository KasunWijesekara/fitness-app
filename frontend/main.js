// No need to wait for the entire DOM content to load
document.getElementById('mcp_chat-container').classList.add('mcp_chat-closed');

function updateScroll() {
  var element = document.getElementById("mcp_chat-messages");
  element.scrollTop = element.scrollHeight; // Scrolls to the bottom
}

document.getElementById('mcp_chat-send-button').addEventListener('click', function() {
  var message = document.getElementById('mcp_chat-input').value;
  if (message) {
    sendMessage(message);
    document.getElementById('mcp_chat-input').value = ''; // Clear the input after sending
  }
});

function sendMessage(message) {
  // Display the user's message
  var messagesContainer = document.getElementById('mcp_chat-messages');
  var userMessageDiv = document.createElement('div');
  userMessageDiv.textContent = message;
  userMessageDiv.className = 'mcp_user-message'; // Update class if needed
  messagesContainer.appendChild(userMessageDiv);

  // Display typing indicator
  showTypingIndicator();

  // Send the message to the Flask backend
  fetch('https://0d16-112-134-219-253.ngrok-free.app/frontend/chatbot/message', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message: message }),
  })
  .then(response => response.json())
  .then(data => {
    setTimeout(() => {
      displayBotMessage(data.response);
    }, 1000);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}

function showTypingIndicator() {
  document.getElementById('mcp_typing-indicator').style.display = 'flex';
  updateScroll(); // Now this function exists and will be called correctly
}

function hideTypingIndicator() {
  document.getElementById('mcp_typing-indicator').style.display = 'none';
}

function displayBotMessage(message) {
  // Hide typing indicator
  hideTypingIndicator();

var messagesContainer = document.getElementById('mcp_chat-messages');
var botMessageDiv = document.createElement('div');

message = message.replace(/\n/g, "<br/>"); // Replace newline characters with <br/> tags
botMessageDiv.innerHTML = message; // Use innerHTML instead of textContent to render the HTML tags

botMessageDiv.className = 'mcp_bot-message'; // Update class if needed
messagesContainer.appendChild(botMessageDiv);

  // Scroll to the bottom of the messages container
  messagesContainer.scrollTop = messagesContainer.scrollHeight;

  // Scroll to the bottom of the messages container
  updateScroll();
}

function addMessageToChat(message, isUserMessage) {
  var messagesContainer = document.getElementById('mcp_chat-messages');
  var messageDiv = document.createElement('div');
  messageDiv.textContent = message;
  messageDiv.className = isUserMessage ? 'mcp_user-message' : 'mcp_bot-message'; // Update class if needed
  messagesContainer.appendChild(messageDiv);

  // Wait for the message to be rendered before scrolling
  setTimeout(updateScroll, 0);
}

document.getElementById('mcp_chat-input').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    document.getElementById('mcp_chat-send-button').click();
  }
});

// Ensure the chat box is minimized on page load
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('mcp_chat-container').classList.add('mcp_chat-closed');
});

// JavaScript to toggle chat box visibility
document.getElementById('mcp_chat-toggle').addEventListener('click', function() {
  var chatContainer = document.getElementById('mcp_chat-container');
  var chatToggleButton = document.getElementById('mcp_chat-toggle');
  chatContainer.classList.toggle('mcp_chat-closed');
  chatToggleButton.classList.toggle('chat-open'); // Update class if needed
});

document.getElementById('mcp_chat-close-button').addEventListener('click', function() {
  var chatContainer = document.getElementById('mcp_chat-container');
  var chatToggleButton = document.getElementById('mcp_chat-toggle');

  // Add the 'mcp_chat-closed' class to hide the chat container
  chatContainer.classList.add('mcp_chat-closed');

  // Remove the 'chat-open' class to show the toggle button
  chatToggleButton.classList.remove('chat-open'); // Update class if needed
});

let welcomeMessageShown = false;

document.getElementById('mcp_chat-toggle').addEventListener('click', function() {
  if (!welcomeMessageShown) {
    displayBotMessage('Hello welcome to fitness world, how can I help you?');
    welcomeMessageShown = true;
  }

  // Add a delay before showing the messages
  setTimeout(function() {
    document.getElementById('mcp_chat-messages').style.opacity = 1;
  }, 200);
});