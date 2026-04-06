const InputField = ({ label, value, onChange, placeholder, rows = 4 }) => {
  return (
    <label className="flex flex-col gap-2 text-sm font-medium text-[var(--muted)]">
      {label}
      <textarea
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="rounded-xl border border-white/70 bg-white/90 px-4 py-3 text-[var(--ink)] shadow-soft focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
      />
    </label>
  );
};

export default InputField;
