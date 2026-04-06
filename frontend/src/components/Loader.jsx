const Loader = ({ label = 'Working on it...' }) => {
  return (
    <div className="flex items-center gap-3 text-sm text-[var(--muted)]">
      <span className="h-2 w-2 rounded-full bg-[var(--accent)] animate-pulse" />
      {label}
    </div>
  );
};

export default Loader;
