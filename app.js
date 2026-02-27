import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getDatabase, ref, push, onChildAdded } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js';

// Your Firebase configuration (from the screenshot)
const firebaseConfig = {
  apiKey: "AIzaSyDTbsgC7CROL0dRBvi2uw_qsYLTUHwGJQ0",
  authDomain: "e-n-t-r-o-p-y.firebaseapp.com",
  databaseURL: "https://e-n-t-r-o-p-y-default-rtdb.firebaseio.com",
  projectId: "e-n-t-r-o-p-y",
  storageBucket: "e-n-t-r-o-p-y.firebasestorage.app",
  messagingSenderId: "1064898639366",
  appId: "1:1064898639366:web:cbd61b481086a8037e6987",
  measurementId: "C-MKRELM

Q02B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const messagesRef = ref(database, 'messages');

let currentUser = '';

// DOM elements
const loginScreen = document.getElementById('login-screen');
const chatScreen = document.getElementById('chat-screen');
const usernameInput = document.getElementById('username-input');
const joinBtn = document.getElementById('join-btn');
const messageInput = document.getElementById('message-input');
const sendBtn = document.getElementById('send-btn');
const messagesDiv = document.getElementById('messages');
const currentUserSpan = document.getElementById('current-user');

// Join chat
joinBtn.addEventListener('click', () => {
    const username = usernameInput.value.trim();
    if (username) {
        currentUser = username;
        currentUserSpan.textContent = `Logged in as: ${currentUser}`;
        loginScreen.style.display = 'none';
        chatScreen.style.display = 'flex';
        messageInput.focus();
    }
});

// Send message
function sendMessage() {
    const text = messageInput.value.trim();
    if (text && currentUser) {
        push(messagesRef, {
            user: currentUser,
            text: text,
            timestamp: Date.now()
        });
        messageInput.value = '';
    }
}

sendBtn.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

// Listen for new messages
onChildAdded(messagesRef, (snapshot) => {
    const message = snapshot.val();
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message';
    
    const time = new Date(message.timestamp).toLocaleTimeString();
    
    messageDiv.innerHTML = `
        <div class="message-user">${message.user}</div>
        <div class="message-text">${message.text}</div>
        <div class="message-time">${time}</div>
    `;
    
    messagesDiv.appendChild(messageDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
});
