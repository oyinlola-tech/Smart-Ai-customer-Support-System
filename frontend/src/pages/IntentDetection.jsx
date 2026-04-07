import { useState } from 'react';
import api from '../services/api';
import InputField from '../components/InputField.jsx';
import ResponseCard from '../components/ResponseCard.jsx';
import Loader from '../components/Loader.jsx';
import Alert from '../components/Alert.jsx';

const IntentDetection = () => {
  const [message, setMessage] = useState('');
  const [intent, setIntent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const detectIntent = async () => {
    if (!message.trim()) return;
    setError('');
    setIsLoading(true);
    setIntent('');

    try {
      const { data } = await api.post('/ai/intent', { message });
      setIntent(data.intent || 'general_support');
    } catch (err) {
      setError('Unable to detect intent.');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">Intent</p>
        <h2 className="text-3xl font-serif">Detect Customer Intent</h2>
      </div>
      {error && <Alert message={error} />}
      <InputField
        label="Customer message"
        value={message}
        onChange={setMessage}
        placeholder="Paste a customer message"
      />
      <div className="flex items-center gap-4">
        <button
          onClick={detectIntent}
          className="px-6 py-3 rounded-xl bg-[var(--accent)] text-white font-semibold shadow-soft hover:opacity-90"
        >
          Detect intent
        </button>
        {isLoading && <Loader label="Analyzing intent" />}
      </div>
      {intent && <Alert type="success" message="Intent detected." />}
      {intent && <ResponseCard title="Detected Intent" content={intent} />}
    </div>
  );
};

export default IntentDetection;
