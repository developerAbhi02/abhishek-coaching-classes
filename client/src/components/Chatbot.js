import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! I'm here to help you with information about <span style='color: #ff8c00'>Abhishek Coaching Classes</span>. How can I assist you?", sender: 'bot' }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const faqResponses = {
    'courses': 'We offer Lakshya 90 (CBSE Class 10), Sankalp (Navodaya Prep), MIT30 (Spoken English), and MIB 1.0 (Biology NCERT). Visit our Courses page for detailed information.',
    'fees': 'Course fees vary: Lakshya 90 (₹6,000), Sankalp (₹8,000-₹15,000), MIT30 (₹1,499), MIB 1.0 (₹499/month or ₹4,000 one-time). Mock tests are ₹300/month.',
    'timing': 'All classes are scheduled between 4 PM to 9 PM. Specific slots are allocated by the admin.',
    'location': 'Please contact us at +91 9876543210 for our exact location.',
    'admission': 'You can fill out the admission form on our website. We will contact you within 24-48 hours.',
    'mock test': 'Mock tests are optional and cost ₹300 per month. They are conducted offline at our coaching center.'
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage = { text: inputMessage, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);

    // Simple keyword matching for responses
    const message = inputMessage.toLowerCase();
    let response = "Thank you for your question. For more detailed information, please contact us at +91 9876543210 or fill out our admission form.";

    for (const [keyword, reply] of Object.entries(faqResponses)) {
      if (message.includes(keyword)) {
        response = reply;
        break;
      }
    }

    setTimeout(() => {
      setMessages(prev => [...prev, { text: response, sender: 'bot' }]);
    }, 1000);

    setInputMessage('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'var(--color-primary)',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(34,197,94,0.4)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <MessageCircle size={24} />
        </button>
      )}

      {isOpen && (
        <div className="chatbot">
          <div className="chatbot-header">
            <h4>Chat Assistant</h4>
            <button
              onClick={() => setIsOpen(false)}
              style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="chatbot-messages">
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.sender}`}>
                {message.text}
              </div>
            ))}
          </div>
          
          <div className="chatbot-input">
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                style={{ flex: 1 }}
              />
              <button
                onClick={handleSendMessage}
                style={{
                  background: 'var(--color-primary)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  width: '35px',
                  height: '35px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
