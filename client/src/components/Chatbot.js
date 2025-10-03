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
            background: 'var(--primary-color)',
            color: '#000',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0, 204, 51, 0.4)',
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
        <div className="chatbot" style={{
          position: 'fixed',
          bottom: '90px',
          right: '20px',
          width: '350px',
          height: '450px',
          borderRadius: '12px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 1000,
          background: 'var(--card-bg)',
          border: '1px solid var(--border-color)'
        }}>
          <div className="chatbot-header" style={{
            padding: '12px 16px',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: 'var(--header-bg)',
            borderRadius: '12px 12px 0 0'
          }}>
            <h4 style={{ margin: 0, color: 'var(--primary-color)' }}>Chat Assistant</h4>
            <button
              onClick={() => setIsOpen(false)}
              style={{ background: 'none', border: 'none', color: 'var(--text-color)', cursor: 'pointer' }}
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="chatbot-messages" style={{
            flex: 1,
            overflowY: 'auto',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.sender}`} style={{
                maxWidth: '80%',
                padding: '10px 14px',
                borderRadius: '12px',
                alignSelf: message.sender === 'user' ? 'flex-end' : 'flex-start',
                background: message.sender === 'user' ? 'var(--primary-color)' : 'var(--card-bg)',
                border: message.sender === 'bot' ? '1px solid var(--border-color)' : 'none',
                color: message.sender === 'user' ? '#000' : 'var(--text-color)'
              }}>
                <div dangerouslySetInnerHTML={{ __html: message.text }} />
              </div>
            ))}
          </div>
          
          <div className="chatbot-input" style={{
            padding: '12px',
            borderTop: '1px solid var(--border-color)',
            background: 'var(--card-bg)',
            borderRadius: '0 0 12px 12px'
          }}>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                style={{ 
                  flex: 1, 
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: '1px solid var(--border-color)',
                  background: 'rgba(0,0,0,0.2)',
                  color: 'var(--text-color)'
                }}
              />
              <button
                onClick={handleSendMessage}
                style={{
                  background: 'var(--primary-color)',
                  border: 'none',
                  borderRadius: '8px',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <Send size={18} color="#000" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
