import { NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'Dashboard' },
  { to: '/chat', label: 'AI Chat' },
  { to: '/sales-reply', label: 'Sales Reply' },
  { to: '/intent', label: 'Intent Detection' },
  { to: '/product-qa', label: 'Product Q&A' },
  { to: '/summarize', label: 'Summarization' }
];

const Sidebar = () => {
  return (
    <aside className="hidden md:flex md:flex-col w-64 px-6 py-8 border-r border-white/40 glass">
      <div className="mb-10">
        <p className="text-xs uppercase tracking-[0.35em] text-[var(--muted)]">Smart AI</p>
        <h1 className="text-2xl font-serif">Support Desk</h1>
      </div>
      <nav className="flex flex-col gap-3">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `px-4 py-2 rounded-xl transition ${
                isActive
                  ? 'bg-[var(--accent)] text-white shadow-soft'
                  : 'text-[var(--ink)] hover:bg-white/70'
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
