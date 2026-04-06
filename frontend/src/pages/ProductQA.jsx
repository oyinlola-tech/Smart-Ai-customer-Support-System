import { useState } from 'react';
import api from '../services/api';
import InputField from '../components/InputField.jsx';
import ResponseCard from '../components/ResponseCard.jsx';
import Loader from '../components/Loader.jsx';
import Alert from '../components/Alert.jsx';

const ProductQA = () => {
  const [question, setQuestion] = useState('');
  const [productData, setProductData] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const answerQuestion = async () => {
    if (!question.trim() || !productData.trim()) return;
    setError('');
    setIsLoading(true);
    setResponse('');

    try {
      const { data } = await api.post('/ai/product-qa', { question, productData });
      setResponse(data.response || 'No response received.');
    } catch (err) {
      setError('Unable to answer the question.');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">Product Q&A</p>
        <h2 className="text-3xl font-serif">Answer Product Questions</h2>
      </div>
      {error && <Alert message={error} />}
      <InputField
        label="Customer question"
        value={question}
        onChange={setQuestion}
        placeholder="Example: Does the backpack come in black?"
      />
      <InputField
        label="Product data"
        value={productData}
        onChange={setProductData}
        placeholder="Paste product descriptions, pricing, inventory, or specs"
        rows={6}
      />
      <div className="flex items-center gap-4">
        <button
          onClick={answerQuestion}
          className="px-6 py-3 rounded-xl bg-[var(--accent)] text-white font-semibold shadow-soft hover:opacity-90"
        >
          Generate answer
        </button>
        {isLoading && <Loader label="Searching product data" />}
      </div>
      {response && <ResponseCard title="AI Answer" content={response} />}
    </div>
  );
};

export default ProductQA;
