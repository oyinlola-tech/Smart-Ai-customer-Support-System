import { useState } from 'react';
import api from '../services/api';
import InputField from '../components/InputField.jsx';
import ResponseCard from '../components/ResponseCard.jsx';
import Loader from '../components/Loader.jsx';
import Alert from '../components/Alert.jsx';

const Summarization = () => {
  const [conversation, setConversation] = useState('');
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const summarize = async () => {
    if (!conversation.trim()) return;
    setError('');
    setIsLoading(true);
    setSummary('');

    try {
      const { data } = await api.post('/ai/summarize', { conversation });
      setSummary(data.summary || 'No summary received.');
    } catch (err) {
      setError('Unable to summarize conversation.');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">Summarization</p>
        <h2 className="text-3xl font-serif">Summarize Conversations</h2>
      </div>
      {error && <Alert message={error} />}
      <InputField
        label="Conversation"
        value={conversation}
        onChange={setConversation}
        placeholder="Paste the full conversation transcript"
        rows={8}
      />
      <div className="flex items-center gap-4">
        <button
          onClick={summarize}
          className="px-6 py-3 rounded-xl bg-[var(--accent)] text-white font-semibold shadow-soft hover:opacity-90"
        >
          Summarize
        </button>
        {isLoading && <Loader label="Summarizing" />}
      </div>
      {summary && <ResponseCard title="Summary" content={summary} />}
    </div>
  );
};

export default Summarization;
