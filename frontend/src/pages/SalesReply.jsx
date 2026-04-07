import { useState } from 'react';
import api from '../services/api';
import InputField from '../components/InputField.jsx';
import ResponseCard from '../components/ResponseCard.jsx';
import Loader from '../components/Loader.jsx';
import Alert from '../components/Alert.jsx';

const SalesReply = () => {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const generateReply = async () => {
    if (!message.trim()) return;
    setError('');
    setIsLoading(true);
    setResponse('');

    try {
      const { data } = await api.post('/ai/sales-reply', { message });
      setResponse(data.response || 'No response received.');
    } catch (err) {
      setError('Unable to generate sales reply.');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">Sales Reply</p>
        <h2 className="text-3xl font-serif">Generate a Sales Reply</h2>
      </div>
      {error && <Alert message={error} />}
      <InputField
        label="Customer message"
        value={message}
        onChange={setMessage}
        placeholder="Enter the customer's request or question"
      />
      <div className="flex items-center gap-4">
        <button
          onClick={generateReply}
          className="px-6 py-3 rounded-xl bg-[var(--accent)] text-white font-semibold shadow-soft hover:opacity-90"
        >
          Generate reply
        </button>
        {isLoading && <Loader label="Crafting a response" />}
      </div>
      {response && <Alert type="success" message="Sales reply generated." />}
      {response && <ResponseCard title="AI Sales Reply" content={response} />}
    </div>
  );
};

export default SalesReply;
