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
