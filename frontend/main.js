// No need to wait for the entire DOM content to load
document.getElementById('chat-container').classList.add('chat-closed');

function updateScroll() {
  var messagesContainer = document.getElementById('chat-messages');
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

document.getElementById('chat-send-button').addEventListener('click', function() {
  var message = document.getElementById('chat-input').value;
  if (message) {
    sendMessage(message);
    document.getElementById('chat-input').value = ''; // Clear the input after sending
  }
});

function sendMessage(message) {
  // Display the user's message
  var messagesContainer = document.getElementById('chat-messages');
  var userMessageDiv = document.createElement('div');
  userMessageDiv.textContent = message;
  userMessageDiv.className = 'user-message';
  messagesContainer.appendChild(userMessageDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;

  // Display typing indicator
  showTypingIndicator();


  // Send the message to the Flask backend
  fetch('http://127.0.0.1:5000/chatbot/message', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message: message }),
  })
  .then(response => response.json())
  .then(data => {
    // console.log(data);  // add this line
    setTimeout(() => {
      displayBotMessage(data.response);
    }, 1000);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}

function showTypingIndicator() {
  // Create the bot message div if it doesn't exist
  var typingIndicator = document.getElementById('typing-indicator');
  if (!typingIndicator) {
    typingIndicator = document.createElement('div');
    typingIndicator.id = 'typing-indicator';
    typingIndicator.className = 'bot-message typing-indicator';
    typingIndicator.innerHTML = '<div class="dot"></div><div class="dot"></div><div class="dot"></div>';
    document.getElementById('chat-messages').appendChild(typingIndicator);
  }
  
  // Show the typing indicator
  typingIndicator.style.display = 'flex';
  updateScroll(); // Make sure to scroll to the typing indicator
}

function hideTypingIndicator() {
  document.getElementById('typing-indicator').style.display = 'none';
}


function displayBotMessage(message) {
  // Hide typing indicator
  hideTypingIndicator();
  var messagesContainer = document.getElementById('chat-messages');
  var botMessageDiv = document.createElement('div');
  botMessageDiv.textContent = message;
  botMessageDiv.className = 'bot-message';
  messagesContainer.appendChild(botMessageDiv);

  // Scroll to the bottom of the messages container
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

document.getElementById('chat-input').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
      document.getElementById('chat-send-button').click();
  }
});

// Ensure the chat box is minimized on page load
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('chat-container').classList.add('chat-closed');
});

// JavaScript to toggle chat box visibility
document.getElementById('chat-toggle').addEventListener('click', function() {
  var chatContainer = document.getElementById('chat-container');
  var chatToggleButton = document.getElementById('chat-toggle');
  chatContainer.classList.toggle('chat-closed');
  chatToggleButton.classList.toggle('chat-open'); // Add class to hide the toggle button when chat is open
});

document.getElementById('chat-close-button').addEventListener('click', function() {
  var chatContainer = document.getElementById('chat-container');
  var chatToggleButton = document.getElementById('chat-toggle');

  // Add the 'chat-closed' class to hide the chat container
  chatContainer.classList.add('chat-closed');

  // Remove the 'chat-open' class to show the toggle button
  chatToggleButton.classList.remove('chat-open');
});

let welcomeMessageShown = false;

document.getElementById('chat-toggle').addEventListener('click', function() {
  if (!welcomeMessageShown) {
    displayBotMessage('Hello wellcome to fitness world, how can i help you?');
    welcomeMessageShown = true;
  }

  // Add a delay before showing the messages
  setTimeout(function() {
    document.getElementById('chat-messages').style.opacity = 1;
  }, 200);
});