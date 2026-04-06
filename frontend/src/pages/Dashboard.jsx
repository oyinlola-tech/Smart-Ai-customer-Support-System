import { Link } from 'react-router-dom';

const cards = [
  {
    title: 'AI Chat Support',
    description: 'Handle real-time customer support conversations.',
    to: '/chat'
  },
  {
    title: 'Sales Reply Generator',
    description: 'Create persuasive sales replies quickly.',
    to: '/sales-reply'
  },
  {
    title: 'Intent Detection',
    description: 'Instantly classify customer intent.',
    to: '/intent'
  },
  {
    title: 'Product Q&A',
    description: 'Answer product questions with your data.',
    to: '/product-qa'
  },
  {
    title: 'Summarization',
    description: 'Summarize conversations for quick handoff.',
    to: '/summarize'
  }
];

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">Overview</p>
        <h2 className="text-3xl font-serif">AI Customer Support Workspace</h2>
        <p className="text-[var(--muted)] max-w-2xl mt-2">
          Choose a feature to assist your customers, generate sales responses, or summarize ongoing conversations.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.title}
            to={card.to}
            className="group bg-white/90 border border-white/70 rounded-2xl p-6 shadow-soft transition hover:-translate-y-1"
          >
            <h3 className="text-lg font-semibold">{card.title}</h3>
            <p className="text-sm text-[var(--muted)] mt-2">{card.description}</p>
            <span className="inline-block mt-4 text-sm text-[var(--accent-2)] font-semibold">
              Open feature -&gt;
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
