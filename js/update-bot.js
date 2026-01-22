class UpdateBot {
    constructor() {
        this.clickCount = 0;
        this.isActive = false;
        this.isUnlocked = false;
        this.init();
    }

    init() {
        // Add click listener to profile picture
        const profileImg = document.querySelector('.bordered-photo img');
        if (profileImg) {
            profileImg.style.cursor = 'pointer';
            profileImg.addEventListener('click', (e) => this.handleProfileClick(e));
        }

        // Create chatbot elements (hidden initially)
        this.createChatbot();
    }

    handleProfileClick(e) {
        e.preventDefault();
        this.clickCount++;

        if (this.clickCount === 6 && !this.isUnlocked) {
            this.showPasswordPrompt();
        } else if (this.clickCount < 6) {
            this.showClickFeedback();
        }
    }

    showClickFeedback() {
        const remaining = 6 - this.clickCount;
        const feedback = document.createElement('div');
        feedback.className = 'click-feedback';
        feedback.textContent = `${remaining} more clicks to unlock assistant`;
        feedback.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #87CEEB;
            color: white;
            padding: 10px 15px;
            border-radius: 5px;
            z-index: 10000;
            animation: fadeInOut 2s ease;
        `;
        document.body.appendChild(feedback);
        setTimeout(() => feedback.remove(), 2000);
    }

    showPasswordPrompt() {
        const modal = document.createElement('div');
        modal.className = 'password-modal';
        modal.innerHTML = `
            <div class="password-content">
                <h3>🔐 Enter Access Code</h3>
                <input type="password" id="bot-password" placeholder="Enter keyword">
                <button id="submit-password">Submit</button>
                <button id="cancel-password">Cancel</button>
            </div>
        `;
        document.body.appendChild(modal);

        document.getElementById('submit-password').addEventListener('click', () => {
            const password = document.getElementById('bot-password').value;
            if (password === 'maht') {
                this.isUnlocked = true;
                this.activateBot();
                modal.remove();
            } else {
                document.getElementById('bot-password').style.borderColor = 'red';
                document.getElementById('bot-password').placeholder = 'Incorrect. Try again.';
            }
        });

        document.getElementById('cancel-password').addEventListener('click', () => {
            modal.remove();
            this.clickCount = 0;
        });
    }

    createChatbot() {
        const chatbot = document.createElement('div');
        chatbot.className = 'update-bot';
        chatbot.innerHTML = `
            <div class="bot-header">
                <span>🤖 Update Assistant</span>
                <button class="bot-close">×</button>
            </div>
            <div class="bot-messages"></div>
            <div class="bot-input-area">
                <input type="text" placeholder="Ask me how to update your website..." class="bot-input">
                <button class="bot-send">Send</button>
            </div>
        `;
        document.body.appendChild(chatbot);

        // Event listeners
        chatbot.querySelector('.bot-close').addEventListener('click', () => this.toggleBot());
        chatbot.querySelector('.bot-send').addEventListener('click', () => this.sendMessage());
        chatbot.querySelector('.bot-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });
    }

    activateBot() {
        this.isActive = true;
        const bot = document.querySelector('.update-bot');
        bot.style.display = 'block';
        this.addBotMessage('Hello! I\'m your website update assistant. I can help you with:\n\n• Adding new publications\n• Updating course information\n• Modifying research content\n• Adding conference details\n• Updating CV\n\nWhat would you like to update today?');
    }

    toggleBot() {
        const bot = document.querySelector('.update-bot');
        bot.style.display = bot.style.display === 'none' ? 'block' : 'none';
    }

    sendMessage() {
        const input = document.querySelector('.bot-input');
        const message = input.value.trim();
        if (!message) return;

        this.addUserMessage(message);
        input.value = '';

        // Process the message and provide relevant guidance
        const response = this.generateResponse(message);
        setTimeout(() => this.addBotMessage(response), 500);
    }

    generateResponse(message) {
        const lowerMessage = message.toLowerCase();

        if (lowerMessage.includes('publication') || lowerMessage.includes('paper')) {
            return `To add a new publication:\n\n1. Open \`publications.html\`\n2. Find the appropriate section (Journal Articles, Conference Papers, etc.)\n3. Add a new \`<li>\` item with the publication details\n4. Format: "Authors. Title. Journal, Year. DOI/URL"\n5. Save and commit to GitHub\n\nNeed help with the specific format?`;
        }

        if (lowerMessage.includes('course') || lowerMessage.includes('teaching')) {
            return `To update course information:\n\n1. Open \`teaching.html\`\n2. Find the current/past course sections\n3. Update course codes, titles, or descriptions\n4. For new courses, copy existing format\n5. Update semester/academic year\n6. Save and commit to GitHub\n\nWhich course do you want to update?`;
        }

        if (lowerMessage.includes('research') || lowerMessage.includes('interest')) {
            return `To update research information:\n\n1. Open \`research.html\`\n2. Edit the research description\n3. Update research areas or interests\n4. Add new projects or collaborations\n5. Save and commit to GitHub\n\nWhat specific research content needs updating?`;
        }

        if (lowerMessage.includes('conference') || lowerMessage.includes('workshop')) {
            return `To add conference information:\n\n1. Open \`conference.html\`\n2. Add new conference details\n3. Include: title, date, location, role\n4. Add links to presentations if available\n5. Save and commit to GitHub\n\nNeed the conference format template?`;
        }

        if (lowerMessage.includes('cv') || lowerMessage.includes('resume')) {
            return `To update your CV:\n\n1. Replace \`cv.pdf\` with the new version\n2. Ensure filename stays \`cv.pdf\`\n3. Test the link on the main page\n4. Commit the new PDF to GitHub\n\nMake sure the PDF is optimized for web viewing!`;
        }

        if (lowerMessage.includes('github') || lowerMessage.includes('commit') || lowerMessage.includes('push')) {
            return `To commit changes to GitHub:\n\n1. Open terminal in project directory\n2. Run: \`git add .\`\n3. Run: \`git commit -m "Your descriptive message"\`\n4. Run: \`git push origin main\`\n\nYour changes will be live in a few minutes!`;
        }

        return `I can help you update:\n\n• 📄 Publications\n• 📚 Courses & Teaching\n• 🔬 Research content\n• 🎤 Conferences\n• 📋 CV\n• 🚀 GitHub deployment\n\nPlease specify what you'd like to update, or ask "how to add [content]" for specific guidance.`;
    }

    addBotMessage(message) {
        const messagesContainer = document.querySelector('.bot-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = 'bot-message';
        messageDiv.innerHTML = message.replace(/\n/g, '<br>');
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    addUserMessage(message) {
        const messagesContainer = document.querySelector('.bot-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = 'user-message';
        messageDiv.textContent = message;
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
}

// Initialize the bot when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new UpdateBot();
});
