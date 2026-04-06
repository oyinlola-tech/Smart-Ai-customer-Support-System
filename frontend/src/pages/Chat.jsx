import { useState } from 'react';
import api from '../services/api';
import ChatBox from '../components/ChatBox.jsx';
import InputField from '../components/InputField.jsx';
import Loader from '../components/Loader.jsx';
import Alert from '../components/Alert.jsx';

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const sendMessage = async () => {
    if (!message.trim()) return;
    setError('');
    const timestamp = new Date().toLocaleTimeString();
    const newMessages = [...messages, { role: 'user', content: message, timestamp }];
    setMessages(newMessages);
    setMessage('');
    setIsLoading(true);

    try {
      const { data } = await api.post('/ai/support', { message });
      const reply = data.response || 'No response received.';
      setMessages([
        ...newMessages,
        { role: 'assistant', content: reply, timestamp: new Date().toLocaleTimeString() }
      ]);
    } catch (err) {
      setError('Unable to reach the AI service. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">AI Chat</p>
        <h2 className="text-3xl font-serif">Customer Support Chat</h2>
      </div>
      {error && <Alert message={error} />}
      <ChatBox messages={messages} isLoading={isLoading} />
      <div className="grid gap-4">
        <InputField
          label="Customer message"
          value={message}
          onChange={setMessage}
          placeholder="Type the customer message..."
          rows={3}
        />
        <div className="flex items-center gap-4">
          <button
            onClick={sendMessage}
            className="px-6 py-3 rounded-xl bg-[var(--accent)] text-white font-semibold shadow-soft hover:opacity-90"
          >
            Send to AI
          </button>
          {isLoading && <Loader label="Generating response" />}
        </div>
      </div>
    </div>
  );
};

export default Chat;
