const ResponseCard = ({ title, content }) => {
  return (
    <div className="bg-white/90 border border-white/70 rounded-2xl p-6 shadow-soft animate-fadeUp">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-[var(--muted)] whitespace-pre-line">{content}</p>
    </div>
  );
};

export default ResponseCard;
