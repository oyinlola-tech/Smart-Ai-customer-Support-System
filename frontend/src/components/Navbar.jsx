import { NavLink } from 'react-router-dom';

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
    </header>
  );
};

export default Navbar;
