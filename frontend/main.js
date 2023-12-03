// No need to wait for the entire DOM content to load
document.getElementById('mcp_chat-container').classList.add('mcp_chat-closed');

// Set the maximum number of characters allowed
const maxChars = 200;

document.getElementById('mcp_chat-input').addEventListener('input', function() {
  var inputField = document.getElementById('mcp_chat-input');
  var charCounter = document.getElementById('mcp_char-counter');
  var message = inputField.value;

  // Update the character counter
  if (charCounter) {
    charCounter.textContent = message.length + '/' + maxChars;
  }

  // If message exceeds maxChars, truncate it
  if (message.length > maxChars) {
    inputField.value = message.substr(0, maxChars);
  }
});

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

function generateNewSessionId() {
  return uuid.v4();
}

function sendMessage(message) {
  // Limit the message to maxChars just in case
  message = message.substr(0, maxChars);

  // Disable the input box and change its container's color to gray
  var inputField = document.getElementById('mcp_chat-input');
  var inputContainer = document.getElementById('mcp_chat-input-container');
  inputField.disabled = true;
  inputContainer.style.backgroundColor = '#e1e1e1';
  inputField.style.backgroundColor = '#e1e1e1';

  // Display the user's message
  var messagesContainer = document.getElementById('mcp_chat-messages');
  var userMessageDiv = document.createElement('div');
  userMessageDiv.textContent = message;
  userMessageDiv.className = 'mcp_user-message'; // Update class if needed
  messagesContainer.appendChild(userMessageDiv);

  // Get the session ID from local storage
  var sessionId = localStorage.getItem('sessionId');
  if (!sessionId) {
    // Generate a new session ID if one doesn't exist
    sessionId = generateNewSessionId();
    localStorage.setItem('sessionId', sessionId);
  }

  // Display typing indicator
  showTypingIndicator();

  // Send the message to the Flask backend
  fetch('https://web.01api.online/frontend/chatbot/message', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message: message, session_id: sessionId }),
    credentials: 'include', // Include credentials in the request
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

  // Enable the input box and change its container's color back to white
  var inputField = document.getElementById('mcp_chat-input');
  var inputContainer = document.getElementById('mcp_chat-input-container');
  inputField.disabled = false;
  inputField.style.backgroundColor = '#ffffff';
  inputContainer.style.backgroundColor = '#ffffff';

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

document.getElementById('mcp_chat-input').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    document.getElementById('mcp_chat-send-button').click();
  }
});

// Continue from the last function
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('mcp_chat-container').classList.add('mcp_chat-closed');

  // Create the character counter element
  var inputField = document.getElementById('mcp_chat-input');
  var charCounterDiv = document.createElement('div');
  charCounterDiv.id = 'mcp_char-counter';
  charCounterDiv.textContent = '0/' + maxChars;
  inputField.parentNode.insertBefore(charCounterDiv, inputField.nextSibling); // Insert the counter after the input field
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