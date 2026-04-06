import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Chat from './pages/Chat.jsx';
import SalesReply from './pages/SalesReply.jsx';
import IntentDetection from './pages/IntentDetection.jsx';
import ProductQA from './pages/ProductQA.jsx';
import Summarization from './pages/Summarization.jsx';

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/sales-reply" element={<SalesReply />} />
        <Route path="/intent" element={<IntentDetection />} />
        <Route path="/product-qa" element={<ProductQA />} />
        <Route path="/summarize" element={<Summarization />} />
      </Routes>
    </Layout>
  );
};

export default App;
