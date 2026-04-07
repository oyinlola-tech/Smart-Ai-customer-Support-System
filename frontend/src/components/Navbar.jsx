import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/', label: 'Dashboard' },
  { to: '/chat', label: 'Chat' },
  { to: '/sales-reply', label: 'Sales' },
  { to: '/intent', label: 'Intent' },
  { to: '/product-qa', label: 'Product' },
  { to: '/summarize', label: 'Summary' }
];

const Navbar = () => {
  return (
    <header className="md:hidden px-6 py-4 border-b border-white/40 glass">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-[var(--muted)]">Smart AI</p>
          <h1 className="text-xl font-serif">Support Desk</h1>
        </div>
        <NavLink
          to="/"
          className="px-3 py-2 rounded-lg bg-[var(--accent)] text-white text-sm"
        >
          Dashboard
        </NavLink>
      </div>
      <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              'px-3 py-2 rounded-full text-xs font-semibold whitespace-nowrap ' +
              (isActive ? 'bg-[var(--accent)] text-white' : 'bg-white/70 text-[var(--ink)]')
            }
          >
            {item.label}
          </NavLink>
        ))}
      </div>
    </header>
  );
};

export default Navbar;
